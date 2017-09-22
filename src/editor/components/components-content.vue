<template>
    <div components-content>
        <div class="yh-components-content">
            <div class="yh-content-center">
                <div v-for="(page,index) in pages" :class="'page page'+index+getClassname(index)" :style="page.background">
                    <div v-for="element in page.elements"
                        v-if="element"
                        :is="element.module"
                        :props="element.props"
                        :path="element.path"
                        :eindex="index"
                        >
                    </div>
                </div>
                
            </div>
            <div class="yh-page-edit">
                <ul>
                    <li edit="background-color">
                        <input type="color" mold="backgroundColor" />
                    </li>
                    <li edit="background-image">
                        <input type="file" content="src" accept="image/*" mold="backgroundImage" @change="uploadFile" />
                    </li>
                </ul>
            </div>


            <div class="yh-toast" ref="yh-toast">
                <div class="title">正在渲染组件，请稍后……</div>
            </div>
            <!-- 选中框 -->
            <div class="yh-selectTop yh-selection">
                <p class="center"></p>
                <p class="rotate"></p>
                <p></p>
            </div>
            <div class="yh-selectRight yh-selection">
                <p class="center"></p>
                <p></p>
            </div>
            <div class="yh-selectBottom yh-selection">
                <p class="center"></p>
                <p></p>
            </div>
            <div class="yh-selectLeft yh-selection">
                <p class="center"></p>
                <p></p>
            </div>
            <!--<div class="yh-selectOpera yh-selection">
                <span id="delete" @click.stop="removeElement">x</span>
                <span id="complate">√</span>
            </div>-->

            <div id="yh-move-box"></div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import {mapState} from 'vuex'
    import MW from './bus.js'
    import Drag from './drag.js'
    import {
        isObject,
        getQueryString,
        parentHasAttr,
        getParentByAttr,
        getParentHasAttr,
        getChildrenHasAttr,
        getChildrenByClassName,
        getChildrenByAttr,
        getPointValue,
        getPointOuterWidth,
        getPointOuterHeight
    } from '../js/Node.js'
    import YHImage from './yh-image.vue'
    import YHText from './yh-text.vue'
    import YHButton from './yh-button.vue'
    import YHTab from './yh-tab.vue'
    import YHAudio from './yh-audio.vue'

    let components = {
        'yh-text':YHText,
        'yh-image':YHImage,
        'yh-button':YHButton,
        'yh-tab':YHTab,
        'yh-audio':YHAudio
        // 'components-button':YHButton,
        // 'components-form':YHForm,
        // 'components-video':YHVideo
    }
    export default {
        components:components,
        data(){
            return {
                pageInfo:{
                    templateId:'',
                    templateType:'H5',
                    name:'YH EDITOR H5',
                    templateCategory:'测试专题',
                    title:'YH EDITOR H5',
                    createTime:'2017/06/19 15:26',
                    createAuthor:'gaohui',
                    updateTime:'',
                    updateAuthor:'gaohui',
                    html:'text',
                    description:'YH EDITOR H5 TEST',
                    activeTimeStart:'',
                    activeTimeEnd:'',
                    keywords:'',
                    lgID:'',
                    lgH5ID:'',
                    scriptsJson:[],
                    share:{
                        status:false,
                        url:'',
                        title:'',
                        desc:'',
                        pic:''
                    }
                },
                drag:null,
                fontSize:16,
                distance:15,
                title:"It's title",
                pageAnimation:'move',
                eventList:[''],
                moveStatus:false,
                finishLength:0,
                loadStatus:0,
                initStatus:false
            }
        },
        computed:mapState([
            'count',
            'currentPage',
            'pages',
            'elements',
            'includes',
            'connhost'
        ]),
        created(){
            var that = this
            MW.bus.$on('addChild',name => {
                that.addChild(name)
            })
            MW.bus.$on('setClassname',(elemID,classname) => {
                that.setClassname(elemID,classname)
            })
            MW.bus.$on('savePage',() => {
                that.savePage()
            })
            MW.bus.$on('previewPage',() => {
                that.previewPage()
            })
            MW.bus.$on('addPage',(index,callback) => {
                that.addPage(index,callback)
            })
            MW.bus.$on('removePage',(index) => {
                that.removePage(index)
            })
            MW.bus.$on('pageAnimation',(value) => {
                that.pageAnimation = value
            })
            MW.bus.$on('focusSelection',() => {
                that.drag.status = false
            })
            MW.bus.$on('blurSelection',() => {
                that.drag.status = true
            })
            MW.bus.$on('updateContent',(content,styleJSON,elemID) => {
                let index = that.getIndex(elemID,that),
                    elements = that.getElementsData(elemID,that)

                if(!MW.moveStatus){
                    elements[index].props.content = content
                    if(Object.prototype.toString.call(styleJSON) == '[object Object]'){
                        elements[index].props.style = styleJSON
                    }
                }
            })
        },
        mounted(){
            this.getPageData();
            this.init()
        },
        methods:{
            init(){
                // 设置字体大小
                this.initFontSize()
                // 设置拖动事件
                this.initEvent()
            },
            initFontSize(){   // 设置字体大小
                var RC = {
                        w:750,
                        h:1206
                    },
                    portrait =  false,
                    resize = "orientationchange"in window ? window.orientationchange : window.resize,
                    bodyElement = document.documentElement || document.body,
                    GC = {
                        w:300,   //bodyElement.clientWidth,
                        h:482   //bodyElement.clientHeight
                    },
                    rightSize = RC.w / RC.h,
                    currentSize = GC.w / GC.h,
                    lastHTMLSize = 16,
                    html = document.getElementsByTagName("html")[0],
                    center = document.getElementsByClassName('yh-content-center')[0];//;
                if(rightSize > currentSize){  // 长屏
                    lastHTMLSize = 16;
                }else if(rightSize < currentSize){  //宽屏
                    lastHTMLSize = (RC.h / GC.h * GC.w) / RC.w * 16;
                }
                this.fontSize = GC.w / lastHTMLSize;
                html.style.fontSize = this.fontSize +'px';
                this.$store.commit('setFontSize',this.fontSize)
            },
            initEvent(){ 
                let components_content = $('.yh-content-center')
                // 设置拖动事件
                this.drag = new Drag({
                    outer:'.yh-components-content',
                    contain:'.yh-content-center',
                    move_box:'#yh-move-box',
                    elemPath:'.yh-content-center .page div[id]',
                    distance:15,
                    mousedownCallback:this.mousedownCallback,
                    firstMoveCallback:this.hideEditLayer,
                    mouseupCallback:this.mouseupCallback
                })
                
                // components_content.on('mouseenter','.page > div',function(e){
                //     $(this).children('.yh-edit-layer').show();
                // })
                // components_content.on('mouseleave','.page > div',function(e){
                //     $(this).children('.yh-edit-layer').hide();
                // })

                this.initColorEvent()
                this.initSizeChangeEvent()
            },
            removeElement(e){
                var elem = $('.setting'),
                    elemID = elem.attr('id');
                
                var index = this.getIndex(elemID,this)
                this.pages[this.currentPage].elements.splice(index,1)
                // elem.remove();
                $('.yh-selection').hide()
            },
            initColorEvent(){
                let input = $('input[type="color"]')
                let self = this
                for( let i = 0; i < input.length; i++ ){
                    input[i].addEventListener('input',function(event){
                        self.colorChange(self,$(this));
                    },false);
                    input[i].addEventListener('propertychange',function(event){
                        if (event.propertyName.toLowerCase () == "value") {
                            self.colorChange(self,$(this));
                        }
                    },false);
                }
            },
            initSizeChangeEvent(){
                let selectP = $('.yh-selection')
                let body = $('body')
                let move_box = $('#yh-move-box'),
                    contentCenter = $('.yh-content-center')
                let down = false,
                    isMoving = false,
                    elem = null,
                    elemID = '',
                    data = {
                        width:0,
                        height:0,
                        left:0,
                        top:0
                    },
                    last = {
                        width:0,
                        height:0,
                        left:0,
                        top:0,
                        transform
                    },
                    start = { x:0, y:0 },
                    center = { x:0, y:0 },
                    end = { x:0, y:0 },
                    distance = 15,
                    transform = 0,
                    oangle = 0,
                    angle = 0,
                    self = this,
                    type = ''

                selectP.on('mousedown','p',function(e){
                    down = true
                    start.x = e.clientX
                    start.y = e.clientY
                    elem = document.getElementsByClassName('setting')[0]//$('.setting')
                    elemID = elem.getAttribute('id')//elem.attr('id')
                    data.width = getPointOuterWidth(elem)
                    data.height = getPointOuterHeight(elem)
                    data.left = getPointValue(elem,'left') + distance
                    data.top = getPointValue(elem,'top') + distance
                    center.x = data.width / 2 + data.left + contentCenter.offset().left
                    center.y = data.height / 2 + data.top + contentCenter.offset().top

                    transform = getChildrenByAttr(elem,'rotate')[0].style.transform //elem.find('[rotate]').css('transform')
                    // oangle = transform == 'none' ? 0 : eval('self.get'+transform.replace(/[XYZ]/g,''))
                    oangle = (transform == 'none' || transform == '') ? 0 : parseInt(transform.match(/rotate[XYZ]{0,1}\(([0-9]*)deg\)/)[1])

                    let parent = $(this).parent(),
                        isCenter = $(this).hasClass('center')
                    
                    if(getParentHasAttr(elem,'yh-tab-title')){
                        down = false
                        return
                    }
                    if($(this).hasClass('rotate')){
                        type = 'rotate'
                    }else{
                        if(parent.hasClass('yh-selectTop')){
                            if(isCenter){
                                type = 'top'
                            }else{
                                type = 'lt'  // 左上角
                            }
                        }else if(parent.hasClass('yh-selectBottom')){
                            if(isCenter){
                                type = 'bottom'
                            }else{
                                type = 'rb'  // 右下角
                            }
                        }else if(parent.hasClass('yh-selectLeft')){
                            if(isCenter){
                                type = 'left'
                            }else{
                                type = 'lb'  // 左下角
                            }
                        }else if(parent.hasClass('yh-selectRight')){
                            if(isCenter){
                                type = 'right'
                            }else{
                                type = 'rt'  // 右上角
                            }
                        }
                    }
                })
                body.on('mousemove',function(e){
                    if(down){
                        if(!isMoving){
                            isMoving = true
                            move_box.css({
                                'width':data.width+'px',
                                'height':data.height+'px',
                                'left':data.left + 'px',
                                'top':data.top +'px',
                                '-webkit-transform':'rotateZ('+oangle+'deg)',
                                'transform':'rotateZ('+oangle+'deg)',
                                'display':'block'
                            });
                        }
                        MW.moveStatus = true
                        end.x = e.clientX
                        end.y = e.clientY
                        switch(type){
                            case 'top':
                                move_box.css({
                                    'height':(data.height + start.y - end.y)+'px',
                                    'top':(data.top + end.y - start.y) +'px'
                                })
                                break
                            case 'bottom':
                                move_box.css({
                                    'height':(data.height + end.y - start.y)+'px'
                                })
                                break
                            case 'left':
                                move_box.css({
                                    'width':(data.width + start.x - end.x)+'px',
                                    'left':(data.left + end.x - start.x) +'px'
                                })
                                break
                            case 'right':
                                move_box.css({
                                    'width':(data.width + end.x - start.x)+'px',
                                })
                                break
                            case 'lt': // 左上
                                move_box.css({
                                    'width':(data.width + start.x - end.x)+'px',
                                    'height':(data.height + start.y - end.y)+'px',
                                    'left':(data.left + end.x - start.x) +'px',
                                    'top':(data.top + end.y - start.y) +'px'
                                })
                                break
                            case 'rb': // 右下
                                move_box.css({
                                    'width':(data.width + end.x - start.x)+'px',
                                    'height':(data.height + end.y - start.y)+'px'
                                })
                                break;
                            case 'lb': // 左下
                                move_box.css({
                                    'width':(data.width + start.x - end.x)+'px',
                                    'height':(data.height + end.y - start.y)+'px',
                                    'left':(data.left + end.x - start.x) +'px'
                                })
                                break;
                            case 'rt': // 右上
                                move_box.css({
                                    'width':(data.width + end.x - start.x)+'px',
                                    'height':(data.height + start.y - end.y)+'px',
                                    'top':(data.top + end.y - start.y) +'px'
                                })
                                break;
                            case 'rotate':  // 旋转
                                angle = (self.getAngle(center.x,center.y,end.x,end.y) + oangle) % 360
                                
                                move_box.css({
                                    '-webkit-transform':'rotateZ('+angle+'deg)',
                                    'transform':'rotateZ('+angle+'deg)'
                                })
                                break;
                        }
                    }
                })
                body.on('mouseup',function(e){
                    if(down){
                        let elem = document.getElementsByClassName('setting')
                        if(elem.length == 0){
                            move_box.hide()
                            down = false
                            isMoving = false
                            MW.moveStatus = false
                            return
                        }else{
                            elem = elem[0]
                        }
                        let elemID = elem.getAttribute('id'),
                            path = elem.getAttribute('yh-path'),
                            arr = path.split('.').slice(1),
                            i = 0, j = 0,
                            eindex = -1,
                            value = '',
                            status = false,
                            elemData = self.pages
                        last.width = getPointOuterWidth(move_box[0])
                        last.height = getPointOuterHeight(move_box[0])
                        last.left = getPointValue(move_box[0],'left') - distance
                        last.top = getPointValue(move_box[0],'top') - distance
                        last.transform = move_box[0].style.transform
                        
                        for(i = 0; i < arr.length; i++){
                            value = arr[i].trim()
                            if(value){
                                if(/[0-9]/g.test(value)){
                                    value = parseInt(value)
                                    if(status){
                                        eindex = value
                                        status = false
                                    }
                                }else if(value == 'elements'){
                                    status = true
                                }
                                elemData = elemData[value]
                            }
                        }
                        self.$store.commit('setMultipleValue',{
                            ischildset:elemData.ischildset ? elemData.ischildset : '',
                            path:path,
                            list:[{
                                parent:'css',
                                eindex:eindex,
                                stylename:'left',
                                actualValue:self.toRemWithout(last.left),
                                designValue:last.left
                            },{
                                parent:'css',
                                eindex:eindex,
                                stylename:'top',
                                actualValue:self.toRemWithout(last.top),
                                designValue:last.top
                            },{
                                parent:'css',
                                eindex:eindex,
                                stylename:'width',
                                actualValue:self.toRemWithout(last.width),
                                designValue:last.width
                            },{
                                parent:'css',
                                eindex:eindex,
                                stylename:'height',
                                actualValue:self.toRemWithout(last.height),
                                designValue:last.height
                            },{
                                parent:'rotate',
                                eindex:eindex,
                                stylename:'-webkit-transform',
                                actualValue:last.transform
                            },{
                                parent:'rotate',
                                eindex:eindex,
                                stylename:'transform',
                                actualValue:last.transform
                            }]
                        })
                        MW.isMoving = true
                        self.distance = 0
                        self.addSettingBox(move_box[0])
                        self.distance = distance
                    }
                    move_box.hide()
                    down = false
                    isMoving = false
                    MW.moveStatus = false
                })
            },
            /* 
            * 解析matrix矩阵，0°-360°，返回旋转角度 
            * 当a=b||-a=b,0<=deg<=180 
            * 当-a+b=180,180<=deg<=270 
            * 当a+b=180,270<=deg<=360 
            * 
            * 当0<=deg<=180,deg=d; 
            * 当180<deg<=270,deg=180+c; 
            * 当270<deg<=360,deg=360-(c||d); 
            * */  
            getmatrix(a,b,c,d,e,f){  
                var aa = Math.round(180*Math.asin(a)/ Math.PI);  
                var bb = Math.round(180*Math.acos(b)/ Math.PI);  
                var cc = Math.round(180*Math.asin(c)/ Math.PI);  
                var dd = Math.round(180*Math.acos(d)/ Math.PI);  
                var deg=0;  
                if(aa == bb || -aa == bb){  
                    deg = dd;  
                }else if(-aa + bb == 180){  
                    deg = 180 + cc;  
                }else if(aa + bb == 180){  
                    deg = 360 - cc || 360 - dd;  
                }  
                return deg >= 360 ? 0 : deg;  
                //return (aa+','+bb+','+cc+','+dd);  
            },
            getAngle(centerX,centerY,clientX,clientY){
                let x = Math.abs(centerX - clientX ),
                    y = Math.abs(centerY - clientY),
                    z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2)),
                    cos = y / z,
                    radina = Math.acos(cos),//用反三角函数求弧度
                    angle = Math.floor(180/(Math.PI/radina)) //将弧度转换成角度

                if( clientX > centerX && clientY > centerY ){//鼠标在第四象限
                    angle = 180 - angle;
                }
                if( clientX == centerX && clientY > centerY ){//鼠标在y轴负方向上
                    angle = 180;
                }
                if( clientX > centerX && clientY == centerY ){//鼠标在x轴正方向上
                    angle = 90;
                }
                if( clientX < centerX && clientY > centerY ){//鼠标在第三象限
                    angle = 180+angle;
                }
                if( clientX < centerX && clientY == centerY ){//鼠标在x轴负方向
                    angle = 270;
                }
                if( clientX < centerX && clientY < centerY ){//鼠标在第二象限
                    angle = 360 - angle;
                }
                return angle;
            },
            colorChange(that){
                let name = that.attr('mold'),
                    color = that.val()
                
                this.$store.commit('setPageData',{
                    parent:'background',
                    stylename:name,
                    value:color
                })
            },
            fileChange(file){
                let fileData = new FormData(),
                    self = this
                fileData.append('files',file,file.name)
                $.ajax({
                    type:'post',
                    url:self.connhost+'editor/upload',
                    data:fileData,
                    dataType: 'JSON',  
                    cache: false,  
                    processData: false,  
                    contentType: false,
                    success(data){
                        self.$store.commit('setPageData',{
                            parent:'background',
                            stylename:'backgroundImage',
                            value:"url("+self.connhost+data.content.path+")"
                        })
                    },
                    error(error){
                        console.log(error.message);
                    }
                });
            },
            imageChange(data){
                let elem = document.getElementsByClassName('setting')[0],
                    elemID = elem.getAttribute('id'),
                    img = getChildrenByClassName(elem,'yh-image')[0],
                    index = self.getIndex(elemID,self),
                    self = this
                img.src = this.connhost+data.path
                img.onload = function(){
                    // self.settingBox(elem)
                    self.addSettingBox(elem)
                };

                this.pages[this.currentPage].elements[index].props.src = img.src;
                this.pages[this.currentPage].elements[index].props.style.width = this.getRem(data.width);
                this.pages[this.currentPage].elements[index].props.style.height = this.getRem(data.height);
            },
            setBackgroundImage(data,childName){
                let elem = $('.setting'),
                    elemID = elem.attr('id'),
                    child = elem.find('.'+childName)[0],
                    index = this.getIndex(elemID),
                    url = "url("+this.connhost+data.path+")",
                    self = this

                child.style.backgroundImage = url
                child.onload = function(){
                    self.addSettingBox(elem[0])
                }
                
                let elements = this.getElementsData(elemID,this)
                
                elements[index].props.style.backgroundImage = url
                elements[index].props.style.backgroundSize = '100% 100%'
                elements[index].props.style.width = this.getRem(data.width)
                elements[index].props.style.height = this.getRem(data.height)
            },
            getElementsData(elemID,that){
                let elements = null,
                    elem = $('#'+elemID),
                    currentPage = elem.closest('li[page]').length > 0 ? parseInt(elem.closest('li[page]').attr('page')) : that.currentPage
                if(elem.parents('[yh-tab]').length > 0){
                    let tab = elem.parents('[yh-tab]').eq(0),
                        tabID = tab.attr('id'),
                        tabContent = tab.children('[yh-tab-content]').children('.yh-tab-active'),
                        tabIndex = tabContent.index(),
                        elemIndex = that.getIndex(tabID,that),
                        parentData = that.pages[currentPage].elements[elemIndex]
                                     .props.base.tabs[tabIndex].elements
                    
                    elements = parentData
                }else{
                    elements = that.pages[currentPage].elements
                }
                return elements
            },
            getIndex(elemID){
                let index = 0,
                    elements = this.getElementsData(elemID)

                for(let i = 0; i < elements.length; i++){
                    if(elements[i].yh_id == elemID){
                        index = i;
                        break;
                    }
                }
                return index;
            },
            getClassname(index){
                return index == this.currentPage ? '' : ' hide'
            },
            getParentLeft(elem){
                if(parentHasAttr(elem,'yh-tab')){
                    let tab = getParentHasAttr(elem,'yh-tab'),
                        left = this.getPointValue(tab,'left')
                    return left
                }else{
                    return 0
                }
            },
            getParentTop(elem){
                if(parentHasAttr(elem,'yh-tab')){
                    let tab = getParentHasAttr(elem,'yh-tab'),
                        tabTitle = getChildrenHasAttr(tab,'yh-tab-title')[0],
                        top = this.getPointHeight(tabTitle) + this.getPointValue(tab,'top')
                    return top
                }else{
                    return 0
                }
            },
            addSettingBox(elem){
                let top = this.getParentTop(elem)
                this.settingBox(elem,top);
            },
            mousedownCallback(parent,elem){
                this.addSettingBox(elem[0])
                parent.find('.setting').removeClass('setting');
                elem.addClass('setting');
            },
            hideEditLayer(){
                $('.setting > .yh-edit-layer').hide();
            },
            mouseupCallback(elem,move_box,x,y,distance){
                let self = this,
                    xx = this.toRemWithout(x - distance - this.getParentLeft(elem[0])),
                    yy = this.toRemWithout(y - distance - this.getParentTop(elem[0])),
                    elemID = elem[0].getAttribute('id'),
                    path = elem[0].getAttribute('yh-path'),
                    arr = path.split('.').slice(1),
                    i = 0, j = 0,
                    eindex = -1,
                    value = '',
                    status = false,
                    elemData = this.pages  //  this.elements
                        
                if(elem.closest('[yh-tab-title]').length > 0){
                    down = false
                    return
                }
                for(i = 0; i < arr.length; i++){
                    value = arr[i].trim()
                    if(value){
                        if(/[0-9]/g.test(value)){
                            value = parseInt(value)
                            if(status){
                                eindex = value
                                status = false
                            }
                        }else if(value == 'elements'){
                            status = true
                        }
                        elemData = elemData[value]
                    }
                }
                this.$store.commit('setMultipleValue',{
                    ischildset:elemData.ischildset ? elemData.ischildset : '',
                    path:path,
                    list:[{
                        parent:'css',
                        eindex:eindex,
                        stylename:'left',
                        actualValue:xx
                    },{
                        parent:'css',
                        eindex:eindex,
                        stylename:'top',
                        actualValue:yy
                    }]
                })
                
                move_box.css({
                    'display':'none'
                });

                this.addSettingBox(elem[0])
            },
            complexAddElement(elem,name){
                let complex = elem.closest('[yh-tab]'),   // 第一层
                    tabActive = complex.find('[yh-tab-content]').children('.yh-tab-active'),
                    index = tabActive ? tabActive.index() : 0,
                    elemID = 'element'+this.count
                
                this.$store.commit('changeCount')
                this.$store.commit('addComplexElement',{
                    index:index,
                    elemData:{
                        id:elemID,
                        module:components[name],
                        yh_module:name.split('-')[1],
                        props:components[name].initCtor({
                            id:elemID
                        },this,components)
                    }
                })
            },
            addSimpleElement(name){
                let elemID = 'element'+this.count

                this.$store.commit('changeCount')
                if(this.includes.indexOf(name) == -1){
                    this.$store.commit('addIncludes',name)
                }
                this.$store.commit('addElement',{
                    id:elemID,
                    module:components[name],
                    yh_module:name,
                    path:'pages.'+this.currentPage+'.elements.index',
                    props:components[name].initCtor({
                        id:elemID
                    },this,components)
                })
            },
            addChild(name){
                switch(name){
                    case 'yh-slide':
                        this.loadComponentEvent(name,this.addSimpleElement)
                        break
                    case 'yh-tab':  // 复杂元素（可包含普通元素的元素）
                        this.addSimpleElement(name)
                        this.$store.commit('addEventList',name)
                        break
                    default:
                        // 如果当前是普通元素
                        let elem = $('.setting')
                        if(elem.length > 0 && elem.closest('[yh-tab]').length > 0){
                            this.complexAddElement(elem,name)
                        }else{
                            this.addSimpleElement(name)
                        }
                        break
                }
            },
            loadComponentEvent(name,callback){
                import(/* webpackChunkName:name */'../components/'+path+'/index.vue')
                // import(/* webpackChunkName:name */'http://localhost:9000/dist/editorPC/components/'+name+'.js')
                    .then(CompanyPositionStyle => {
                        components[name] = CompanyPositionStyle
                        callback(name)
                    })
                    .catch(function(err) {
                        console.log('Failed to load: '+path, err);
                    });
            },
            setClassname(elemID,classname){
                let elements = this.getElementsData(elemID,this),
                    index = this.getIndex(elemID,this)
                elements[index].props.classname = classname
            },
            // setValue(name,value,designValue,elemID){
            //     let index = this.getIndex(elemID,this),
            //         elements = this.getElementsData(elemID,this)
            //     switch(name){
            //         case 'event-type':
            //             // this.event.style[entype] = value
            //             elements[index].props[name] = value
            //             elements[index].props['entype'] = designValue
            //             break
            //         default:
            //             elements[index].props[name] = value
            //             break
            //     }
            // },
            // drawSmallPage(){
            //     MW.bus.$emit('drawSmallPage')
            // },
            uploadFile(e){
                let that = e.target,
                    file = that.files[0]
                this.fileChange(file,that)
            },









            addPage(index,callback){
                this.pages.splice(index,0,Object.assign({},MW.pageData))
                callback(this.pages[index])
            },
            removePage(index){
                this.pages.splice(index,1)
            },
            recoveryPage(self,elements){
                for(let j = 0; j < elements.length; j++){
                    if(!elements[j].props.rotate){
                        elements[j].props.rotate = {
                            '-webkit-transform':'none',
                            'transform':'none'
                        }
                    }
                    if(!elements[j].props.event){
                        elements[j].props.event = {
                            id:elements[j].yh_id,
                            'entype':'none',
                            'href':''
                        }
                    }
                    if(!elements[j].props.states){
                        elements[j].props.states = []
                    }else{
                        for(let i = 0; i < elements[j].props.states.length; i++){
                            switch(elements[j].props.states[i].type){
                                case 'active':
                                    if(!elements[j].props.states[i]['yh-number']){
                                        elements[j].props.states[i]['yh-number'] = '1'
                                    }
                                    break
                                case 'invalid':
                                    if(!elements[j].props.states[i]['yh-valid-type']){
                                        elements[j].props.states[i]['yh-valid-type'] = 'stylechange'
                                    }
                                    break
                            }
                        }
                    }
                    switch(elements[j].module){
                        case 'image':
                            elements[j].yh_module = YHImage;
                            break
                        case 'text':
                            elements[j].yh_module = YHText;
                            elements[j].props.content = elements[j].props.content.replace(/(\~\|)/g,'"').replace(/[’‘]/g,'\'')
                            break
                        case 'button':
                            elements[j].yh_module = YHButton
                            break
                        case 'form':
                            elements[j].yh_module = YHForm;
                            break
                        case 'audio':
                            elements[j].yh_module = YHAudio;
                            break
                        case 'video':
                            elements[j].yh_module = YHVideo;
                            break
                        case 'tab':
                            elements[j].yh_module = YHTab;
                            for(let p = 0; p < elements[j].props.base.tabs.length; p++){
                                self.recoveryPage(self,elements[j].props.base.tabs[p].elements)
                            }
                            break
                    }
                }
            },
            // templateId
            getPageData(){
                // $.ajax({
                //     type:'post',
                //     url:MW.host+'v3/api/editor/getPageData',
                //     data:{
                //         id:templateID
                //     },
                //     success:function(result){
                let self = this,
                    templateId = getQueryString('templateId'),
                    html = getQueryString('name')
                axios.post(this.connhost+'v3/api/editor/getPageData',{
                    // params:{
                        id:templateId,
                        html:html
                    // }
                },{
                    withCredentials:false     // 如果为true，就不能跨域了，但是如果为false就不能发送cookie
                }).then(response => {
                    let content = response.data.content,
                        i = '',j = ''
                    if(!content.includes){
                        content.includes = []
                    }
                    self.loadComponents(content.includes,content.pages);//content.elements)
                    if(content.pageInfo){
                        for(i in self.pageInfo){
                            if(isObject(self.pageInfo[i])){
                                for(j in self.pageInfo[i]){
                                    self.pageInfo[i][j] = content.pageInfo[i][j] ? content.pageInfo[i][j] : self.pageInfo[i][j]
                                }
                            }else{
                                self.pageInfo[i] = content.pageInfo[i] ? content.pageInfo[i] : self.pageInfo[i]
                            }
                        }
                    }
                    
                    self.$store.commit('initData',{
                        includes:content.includes,
                        count:content.count
                    })
                    // let content = response.data.content
                    // content.json = content.json.replace(/(url\(\")/g,'url\(').replace(/(\"\))/g,')')
                    // var data = JSON.parse(content.json),
                    //     pages = []
                    // self.count = data.count;
                    // self.eventList = data.eventList
                    // if(data.pages){
                    //     for(let i = 0; i < data.pages.length; i++){
                    //         pages.push(JSON.parse(JSON.stringify(data.pages[i])));
                    //         self.recoveryPage(self,pages[i].elements)
                    //     }
                    //     self.$store.commit('init',pages)
                    // }else{
                    //     self.$store.commit('create')
                    // }
                },response => {
                    console.log(response.body.message)
                })
            },
            loadComponents(includes,pages){  // elements
                let path = '',
                    yhmodule = '',
                    i = 0,
                    elemDatas = {},
                    self = this
                this.loadStatus = 0
                this.finishLength = includes.length
                for(i = 0; i < includes.length; i++){
                    yhmodule = includes[i]
                    path = yhmodule.replace('-','/');
                    if(components.hasOwnProperty(yhmodule)){
                        self.loadStatus++
                        if(self.loadStatus == self.finishLength){
                            // self.bindElement(html)
                            elemDatas = self.recoveryPages(pages)
                            self.$store.commit('initData',elemDatas)
                            self.initStatus = true
                            self.$refs['yh-toast'].className += ' hide'
                        }
                    }else{
                        (function(yhmodule){
                            import(/* webpackChunkName:name */'../components/'+path+'/index.vue')
                            .then(ModuleStyle => {
                                components[yhmodule] = ModuleStyle
                                self.loadStatus++
                                if(self.loadStatus == self.finishLength){
                                    // self.bindElement(html)
                                    let elemDatas = self.recoveryPages(pages)
                                    self.$store.commit('initData',elemDatas)
                                    self.initStatus = true
                                    self.$refs['yh-toast'].className += ' hide'
                                }
                            })
                        })(yhmodule)
                    }
                }
                if(includes.length == 0){
                    self.initStatus = true
                    self.$refs['yh-toast'].className += ' hide'
                }
            },
            recoveryPages(pageData,path = ''){  // elements
                let data = [],
                    childElements = [],
                    current = [],
                    i = 0,j = 0,
                    attr = '',
                    attr2 = ''
                for(attr in pageData){
                    switch(attr){
                        case 'pages':
                            data[attr] = []
                            for(i = 0; i < pageData[attr].length; i++){
                                current = pageData[attr][i]
                                data[attr].push({
                                    status:i == 0 ? true : false
                                })
                                for(attr2 in current){
                                    switch(attr2){
                                        case 'elements':
                                            data[attr][i][attr2] = this.recoveryElements(current[attr2])
                                            break
                                        default:
                                            data[attr][i][attr2] = current[attr2]
                                            break
                                    }
                                }
                            }
                            break
                        case 'fontSize':
                        case 'eventList':
                            data[attr] = pageData[attr]
                            break
                        default:
                            this[attr] = pageData[attr]
                            break
                    }
                }
                // for(j = 0; j < current.length; j++){
                //     data[i].elements.push(JSON.parse(JSON.stringify(current[j])))
                //     data[i][j].module = components[data[i][j]['yh-module']]
                //     data[i][j].props = data[i][j].module.methods.resetData(data[i][j].props)
                //     if(!data[i][j].path){
                //         data[i][j].path = (path ? path+'.' : '') + 'elements.' + i
                //     }
                //     if(!data[i][j].props.data.anchorID.value){
                //         data[i][j].props.data.anchorID.value = data[i][j].id
                //     }
                //     childElements = current[j].props.elements
                //     if(childElements && childElements.length > 0){
                //         data[i][j].props.elements = []
                //         data[i][j].props.elements = this.recoveryElements(childElements,data[i][j].path+'.props')
                //     }
                // }
                return data
            },
            recoveryElements(elements,path = ''){
                let i = 0,
                    data = [],
                    childElements = []
                for(i = 0; i < elements.length; i++){
                    data.push(JSON.parse(JSON.stringify(elements[i])))
                    data[i].module = components[data[i]['yh_module']]
                    data[i].props = data[i].module.methods.resetData(data[i].props)
                    if(!data[i].path){
                        data[i].path = (path ? path+'.' : '') + 'elements.' + i
                    }
                    if(!data[i].props.data.anchorID.value){
                        data[i].props.data.anchorID.value = data[i].id
                    }
                    childElements = elements[i].props.elements
                    if(childElements && childElements.length > 0){
                        data[i].props.elements = []
                        data[i].props.elements = this.recoveryElements(childElements,data[i].path+'.props')
                    }
                }
                return data
            },
            getElementsEvent(data,elementsEvent){
                switch(data.eventtype){
                    case 'none':
                        break
                    default:
                        elementsEvent[data.id] = {
                            'entype':data.eventtype,
                            'href':data.href
                        }
                        break
                }
            },
            getElementsState(data,elementsStates,id){
                let states = {},
                    statesStyle = '',
                    classname = '',
                    style = ''
                if(data.length > 0){
                    elementsStates[id] = []
                }
                for(let i = 0; i < data.length; i++){
                    states = JSON.parse(JSON.stringify(data[i]))
                    classname = id+'-states'+i
                    
                    elementsStates[id].push({
                        type:states.type,
                        classname:classname
                    })
                    switch(states.type){
                        case 'active':
                            elementsStates[id][i]['yh-number'] = states['yh-number']
                            break
                        case 'audio':
                            elementsStates[id][i]['status'] = states['status']
                            elementsStates[id][i]['method'] = states['method']
                            elementsStates[id][i]['yh-count'] = states['yh-count']
                            elementsStates[id][i]['yh-number'] = states['yh-number']
                            break
                        case 'invalid':
                            elementsStates[id][i]['yh-valid-start'] = states['yh-valid-start']
                            elementsStates[id][i]['yh-valid-end'] = states['yh-valid-end']
                            elementsStates[id][i]['yh-valid-type'] = states['yh-valid-type']
                            break
                    }
                    if(states['yh-src']){
                        elementsStates[id][i]['yh-src'] = states['yh-src']
                    }else if(states['image']){
                        elementsStates[id][i]['yh-src'] = states['image']
                    }
                    style = '.'+classname+'{'
                    for(let attr in states){
                        switch(attr){
                            case 'type':
                            case 'box-shadow-x':
                            case 'box-shadow-y':
                            case 'box-shadow-blur':
                            case 'box-shadow-color':
                            case 'yh-valid-start':
                            case 'yh-valid-end':
                            case 'yh-valid-type':
                            case 'yh-number':
                            case 'yh-src':
                            case 'image':
                                break
                            case 'background-image':
                                if(states[attr]){
                                    style += attr+':'+states[attr]+'; '
                                }
                                break
                            default:
                                style += attr+':'+states[attr]+'; '
                                break
                        }
                    }
                    style += '}'
                    statesStyle += style
                }
                return statesStyle
            },
            changePageDataSave(elements,elementsStates,elementsEvent){
                let states = null,
                    classname = '',
                    statesStyle = ''
                for(let j = 0; j < elements.length; j++){
                    if(!elements[j]){
                        continue
                    }
                    // elements[j].yh_module = null;
                    if(elements[j].props.classname){
                        elements[j].props.classname = document.getElementById(elements[j].id).className.replace('setting','');
                    }
                    statesStyle += this.getElementsState(elements[j].props.states,elementsStates,elements[j].id)
                    this.getElementsEvent(elements[j].props.event,elementsEvent)
                    
                    switch(elements[j].module){
                        case 'text':
                            elements[j].props.content = elements[j].props.content.replace(/"/g,'~|')
                            break
                        case 'tab':
                            for(let p = 0; p < elements[j].props.base.tabs.length; p++){
                                statesStyle += this.changePageDataSave(elements[j].props.base.tabs[p].elements,elementsStates,elementsEvent)
                            }
                            break
                    }
                }
                return statesStyle
            },
            savePage(){
                var totalElement = $('.yh-content-center').clone()
                totalElement.find('.yh-edit-layer,.yh-remove,.yh-add').remove()
                var elem = totalElement.find('[style]'),
                    count = 0,
                    style = '',
                    name = '',
                    i = 0, j = 0;
                for(i = 0; i < elem.length; i++){
                    name = 'elemStyle'+count;
                    count++;
                    style += '.'+name+'{'+elem.eq(i).attr('style')+'}';
                    elem.eq(i).addClass(name)
                        .removeAttr('style');
                }
                totalElement.children('.page').addClass('hide')
                totalElement.children('.page0').removeClass('hide')
                totalElement.find('[contenteditable]').removeAttr('contenteditable')
                let data = {},
                    elementsStates = {},
                    elementsEvent = {},
                    statesStyle = '',
                    attr = '',
                    attr2 = ''
                for(attr in this.$data){
                    switch(attr){
                        case 'pages':
                            break;
                        case 'drag':
                            break
                        default:
                            data[attr] = this.$data[attr]
                            break
                    }
                }
                data.pages = [];
                for(i = 0; i < this.pages.length; i++){
                    data.pages.push({})
                    for(attr in this.pages[i]){
                        switch(attr){
                            case 'elements':
                                data.pages[i][attr] = []
                                for(j = 0; j < this.pages[i].elements.length; j++){
                                    data.pages[i][attr].push({
                                        ...this.pages[i].elements[j]
                                    })
                                    data.pages[i][attr][j].module = null
                                }
                                break
                            default:
                                data.pages[i][attr] = this.pages[i][attr]
                                break
                        }
                    }
                    statesStyle += this.changePageDataSave(data.pages[i].elements,elementsStates,elementsEvent)
                }
                name = getQueryString('name');
                $.ajax({
                    type:'post',
                    url:this.connhost+'v3/api/editor/save',
                    data:{
                        // id:10002,
                        name:name,
                        includes:this.includes,
                        count:this.count,
                        style:style+statesStyle,
                        elemDatas:JSON.stringify({
                            pageInfo:this.pageInfo,
                            pages:data,
                            includes:this.includes,
                            count:this.count
                        }),
                        html:totalElement.html().replace(/\'/g,'‘'),
                        // json:JSON.stringify(data).replace(/\'/g,'‘').replace(/(url\(\")/g,'url\(').replace(/(\"\))/g,')'),
                        js:JSON.stringify({
                            pageAnimation:this.pageAnimation,
                            eventList:this.eventList,
                            elementsStates:elementsStates,
                            elementsEvent:elementsEvent
                        })// ,
                        // author:'yh'
                    },
                    success(data){
                        console.log(data.message);
                    },
                    error(error){
                        console.log(error.message);
                    }
                });
            },
            previewPage(){

            },
            getRem(value){
                return value / (750 / 16) + 'rem';
            },
            toRem(value){
                return value / this.fontSize + 'rem';
            },
            toRemWithout(value){
                return value / this.fontSize;
            },
            getComputedValue(elem,attribute){
                var value = window.getComputedStyle(elem[0],null).getPropertyValue(attribute);
                return value;
            },
            getPointValue(elem,attribute){
                if(!elem || elem.length == 0){
                    return 0
                }
                var value = window.getComputedStyle(elem,null).getPropertyValue(attribute);
                return parseFloat(parseFloat(value).toFixed(2));
            },
            getPointWidth(elem){
                var value = this.getPointValue(elem,"width"); //window.getComputedStyle(elem[0],null).getPropertyValue("width");
                return value;
            },
            getPointHeight(elem){
                var value = this.getPointValue(elem,"height"); // window.getComputedStyle(elem[0],null).getPropertyValue("height");
                return value;
            },
            getPointOuterWidth(elem){
                var width =  this.getPointValue(elem,"width"), //window.getComputedStyle(elem[0],null).getPropertyValue("width");
                    left = this.getPointValue(elem,"padding-left"),
                    right = this.getPointValue(elem,"padding-right"),
                    value = width + left + right;
                return value;
            },
            getPointOuterHeight(elem){
                var width =  this.getPointValue(elem,"height"),
                    top = this.getPointValue(elem,"padding-top"),
                    bottom = this.getPointValue(elem,"padding-bottom"),
                    value = width + top + bottom;
                return value;
            },
            settingBox(element,parentHeight = 0){   // 选中框
                let checkedboxStyle = {}
                checkedboxStyle.left = this.getPointValue(element,'left')-2 + this.distance
                checkedboxStyle.top = this.getPointValue(element,'top')-2 + this.distance + parentHeight
                checkedboxStyle.width = this.getPointWidth(element)+4+this.getPointValue(element,'border-top-width')+this.getPointValue(element,'border-bottom-width');
                checkedboxStyle.height = this.getPointHeight(element)+4+this.getPointValue(element,'border-top-width')+this.getPointValue(element,'border-bottom-width');
                checkedboxStyle.display = "block"

                let scale = 1
                checkedboxStyle.left -= 2
                checkedboxStyle.top -= 2 * scale
                checkedboxStyle.width += 4
                checkedboxStyle.height += 4 * scale

                let selectParent = ''
                $(selectParent+' .yh-selectTop').css({
                    'width':checkedboxStyle.width+'px',
                    'left':checkedboxStyle.left+'px',
                    'top':checkedboxStyle.top+'px'
                })
                $(selectParent+' .yh-selectBottom').css({
                    'width':checkedboxStyle.width+'px',
                    'left':checkedboxStyle.left+'px',
                    'top':checkedboxStyle.top+checkedboxStyle.height+'px'
                })
                $(selectParent+' .yh-selectLeft').css({
                    'height':checkedboxStyle.height+'px',
                    'left':checkedboxStyle.left+'px',
                    'top':checkedboxStyle.top+'px'
                })
                $(selectParent+' .yh-selectRight').css({
                    'height':checkedboxStyle.height+'px',
                    'left':checkedboxStyle.left+checkedboxStyle.width+'px',
                    'top':checkedboxStyle.top+'px'
                })
                // $(selectParent+' .yh-selectOpera').css({
                //     'left':checkedboxStyle.left+5+'px',
                //     'top':checkedboxStyle.top+5+'px'
                // })
                $(selectParent+' .yh-selection').css('display','block')
            }
        }
    }
</script>
<style>
    @import "./style/components-content.css";
    .yh-toast{
        width:100%;
        height:100%;
        background-color:#000;
        background:rgba(0,0,0,0.5);
        filter:Alpha(opacity=50);
        *zoom:1;
        position:fixed;
        left:0;
        top:0;
        z-index: 9999;
    }
    .yh-toast .title{
        width:100%;
        text-align:center;
        line-height:72px;
        font-size:36px;
        color:#fff;
        position:absolute;
        left:0;
        top:50%;
        -webkit-transform:translate(0,-50%);
        transform:translate(0,-50%);
    }
</style>