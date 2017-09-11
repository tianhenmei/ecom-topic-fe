<template>
    <div yh-editor
        @click.stop="undoSelection">
        <div class="top clearfix">
            <img class="logo" :src="host+'static/images/logo.png'" />
            <h1 class="title">TOPIC <i>3.0版</i></h1>
            <yh-lib @addComponents="addComponents"></yh-lib>
        </div>    
        <ul class="yh-lib-operate clearfix">
            <li id="save" @click="saveData"><span class="yh-lib-icon"></span>保存</li>
            <li id="publish" @click="publishHTML"><span class="yh-lib-icon"></span>发布</li>
            <li id="preview" @click="previewHTML">
                <a :href="host+'yh/'+pageInfo.html+'/index.html'" target="_blank"><span class="yh-lib-icon"></span>预览</a>
            </li>
            <li id="clear" @click="clearHTML"><span class="yh-lib-icon"></span>清空</li>
            <li id="lookH5"><span class="yh-lib-icon"></span>H5预览</li>
        </ul>
        <div yh-editor-content ref="yh-editor-content">
            <div v-for="(element,index) in elements" v-if="element" :is="element.module"
                :props="element.props"
                :path="element.path"
                @addChildComponent="addChildComponent"></div>
        </div>
        
        <div class="yh-toast" ref="yh-toast">
            <div class="title">正在渲染组件，请稍后……</div>
        </div>
        <!-- 选中框 -->
        <div class="yh-selectTop yh-selection hide">
            <p class="center"></p>
            <p class="rotate"></p>
            <p></p>
        </div>
        <div class="yh-selectRight yh-selection hide">
            <p class="center"></p>
            <p></p>
        </div>
        <div class="yh-selectBottom yh-selection hide">
            <p class="center"></p>
            <p></p>
        </div>
        <div class="yh-selectLeft yh-selection hide">
            <p class="center"></p>
            <p></p>
        </div>
        <!--添加框-->
        <yh-edit-prompt
            id="yh-edit-prompt"
            title="请输入您当前点击的组件要生成几列"
            text="列："
            @setListCol="setListCol"></yh-edit-prompt>
        <yh-edit-add-companyposition @addChildData="addChildData"></yh-edit-add-companyposition>

        <yh-custom v-show="customStatus"></yh-custom>
    </div>
</template>
<script>
    import axios from 'axios'
    import {mapState} from 'vuex'
    import {
        getQueryString,
        recoveryData,
        undoSelected,
        isObject,
        getNow,
        getChildById,
        getParentByAttr,
        getParentsByAttr
    } from '../components/Base/Node.js'
    import YHLib from './yh-lib.vue'
    import YHEditPrompt from '../components-edit/yh-edit-prompt.vue'
    import YHEditAddCompanyPosition from '../components-edit/yh-edit-add-CompanyPosition.vue'
    import YHCustom from './yh-custom.vue'
    // axios.defaults.withCredentials = true
    let components = {
        'yh-lib':YHLib,
        'yh-edit-add-companyposition':YHEditAddCompanyPosition,
        'yh-edit-prompt':YHEditPrompt,
        'yh-custom':YHCustom
    }

    export default {
        components:components,
        computed:mapState([
            'host',
            'connhost',
            'includes',
            'elements',
            'count',
            'selected',
            'triggerId',
            'childClassify',
            'parentmodule',
            'customStatus',
            'ENV_STATUS'
        ]),
        data() {
            return {
                currentChildData:{
                    parentID:'',
                    id:'',
                    'yh-module':'',
                    module:null,
                    parentPath:'',
                    path:'',
                    ignorestatus:'',
                    ischild:''
                },
                pageInfo:{
                    templateId:'10001',
                    templateType:'PC',
                    name:'YH EDITOR PC',
                    templateCategory:'测试专题',
                    title:'YH EDITOR PC',
                    createTime:'2017/06/19 15:26',
                    createAuthor:'gaohui',
                    updateTime:'',
                    updateAuthor:'gaohui',
                    html:'text',
                    description:'YH EDITOR PC TEST',
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
                loadStatus:0,
                finishLength:0,
                initStatus:false,
                selections:[{
                    label:'test1',
                    value:1
                },{
                    label:'test2',
                    value:2
                }]
            }
        },
        mounted(){
            this.getPageData()
            if(!this.ENV_STATUS){
                this.getCustomData()
            }
        },
        methods:{
            recoveryData,
            undoSelected,
            undoSelection(e){
                let target = e.target
                while(target){
                    if(target.attributes['yh-editor']){
                        this.undoSelected()
                        // 取消选择  // selected
                        this.$store.commit('initSelected')
                        break
                    }else if(target.attributes['yh-module']){
                        break
                    }
                    target = target.parentNode
                }
            },
            setListCol(col){
                // let elem = document.getElementById(this.currentChildData.parentID+'-content')
                let width = components[this.currentChildData['yh-module']].width * col
                this.$store.commit('setValue',{
                    parent:'css',
                    eindex: -1,
                    index:-1,
                    ischildset:'',
                    stylename:'width',
                    actualValue:width,
                    designValue:width,
                    path:this.currentChildData.parentPath
                })
                this.setFirstChild()
            },
            addChildData(data){
                let i = 0,
                    elemData = [],
                    elem = document.getElementById(this.triggerId)
                for(i = 0; i < data.length; i++){
                    elemData.push({
                        id:data[i].elemID,
                        'yh-module':this.childClassify,
                        module:components[this.childClassify],
                        parentPath:elem.getAttribute('yh-path'),
                        path:'props.elements.cindex',//'elements.index.props.elements.cindex',
                        parentmodule:this.parentmodule,
                        props:components[this.childClassify].setCtor({
                            id:data[i].elemID,
                            ignorestatus:'ignorestatus',
                            ischild:'ischild'
                        },data[i])
                    })
                }
                this.$store.commit('addChildElement',elemData)
            },
            addChildComponent(data){
                data.module = components[data['yh-module']]
                data.props = components[data['yh-module']].initCtor(
                    data.props
                )
                this.$store.commit('addChildElement',data)
            },
            getCustomData(){
                let self = this
                axios.get(this.connhost+'v3/api/editorPC/getCustomData',{
                    withCredentials:false   // 如果为true，就不能跨域了，但是如果为false就不能发送cookie
                })
                .then(response => {
                    let content = response.data.content
                    
                    self.$store.commit('initCustom',{
                        content:content
                    })
                },response => {
                    console.log(response.body.message)
                })
            },
            getPageData(){
                let self = this,
                    templateId = getQueryString('templateId'),
                    html = getQueryString('name')
                if(!html){
                    self.$refs['yh-toast'].className += ' hide'
                    return
                }
                axios.post(this.connhost+'v3/api/editorPC/getPageData',{
                    // params:{
                        id:templateId,
                        html:html
                    // }
                },{
                    withCredentials:false     // 如果为true，就不能跨域了，但是如果为false就不能发送cookie
                }).then(response => {
                    let content = response.data.content,
                        i = '',j = ''
                    
                    self.loadComponents(content.includes,content.elements)
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
                },response => {
                    console.log(response.body.message)
                })
            },
            loadComponents(includes,elements){
                let path = '',
                    self = this
                this.loadStatus = 0
                this.finishLength = includes.length
                for(let i = 0; i < includes.length; i++){
                    path = includes[i].replace('_','/');
                    (function(yhmodule){
                        import(/* webpackChunkName:name */'../components/'+path+'/index.vue')
                        .then(ModuleStyle => {
                            components[yhmodule] = ModuleStyle
                            self.loadStatus++
                            if(self.loadStatus == self.finishLength){
                                // self.bindElement(html)
                                let elemDatas = self.recoveryElements(elements)
                                self.$store.commit('addElement',elemDatas)
                                self.initStatus = true
                                self.$refs['yh-toast'].className += ' hide'
                            }
                        })
                    })(includes[i])
                }
                if(includes.length == 0){
                    self.initStatus = true
                    self.$refs['yh-toast'].className += ' hide'
                }
            },
            recoveryElements(elements,path = ''){
                let data = [],
                    childElements = []
                for(let i = 0; i < elements.length; i++){
                    data.push(JSON.parse(JSON.stringify(elements[i])))
                    data[i].module = components[data[i]['yh-module']]
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
            /*bindElement(html){
                let children = $(html).children(),
                    elements = [],
                    current = {},
                    child = null,
                    yhmodule = '',
                    path = '',
                    id = '',
                    i = 0
                for(i = 0; i < children.length; i++){
                    if(children[i].getAttribute('id')){
                        child = children.eq(i)
                    }else{
                        child = children.eq(i).find('[id]').eq(0)
                    }
                    id = child.attr('id')
                    yhmodule = child.attr('yh-module')
                    switch(yhmodule){
                        case 'List_style1': //components
                            current = {
                                id:id,
                                'yh-module':yhmodule,
                                module:components[yhmodule],
                                props:components[yhmodule].recoveryCtor(children.eq(i),{
                                    id:id
                                },components)
                            }
                            break
                        default:
                            current = {
                                id:id,
                                'yh-module':yhmodule,
                                module:components[yhmodule],
                                props:components[yhmodule].recoveryCtor(children.eq(i),{
                                    id:id,
                                })
                            }
                            break
                    }
                    elements.push(current)
                }
                this.$store.commit('addElement',elements)
                this.initStatus = true
            },*/
            loadComponentEvent(name,path,coltype,callback){
                import(/* webpackChunkName:name */'../components/'+path+'/index.vue')
                // import(/* webpackChunkName:name */'http://localhost:9000/dist/editorPC/components/'+name+'.js')
                    .then(CompanyPositionStyle => {
                        components[name] = CompanyPositionStyle
                        callback(name,path,coltype)
                    })
                    .catch(function(err) {
                        console.log('Failed to load: '+path, err);
                    });
            },
            loadComponentCallBack(name,path,coltype){
                let status = true,
                    ignorestatus = '',
                    ischild = '',
                    length = 0,
                    elem = document.getElementsByClassName('setting')[0],
                    elemID = '',
                    yh_module = '',
                    newID = '',
                    self = this
                if(elem){
                    elemID = elem.getAttribute('id')
                    yh_module = elem.getAttribute('yh-module')
                    switch(yh_module){
                        case 'List_style1':
                            length = getChildById(elem,elemID+'-content').children.length
                            if(length == 0){
                                status = false
                                ignorestatus = 'ignorestatus',
                                ischild = 'ischild'
                            }
                            break
                        case 'Slider_style1':
                            status = false
                            ignorestatus = 'ignorestatus',
                            ischild = 'ischild'
                            break;
                        case 'Block_style1':
                        case 'Block_style2':
                        case 'Block_style3':
                        case 'Block_style4':
                        case 'Row_style1':
                            status = false
                            ignorestatus = '',
                            ischild = 'ischild'
                            break
                        default:
                            break
                    }
                }
                newID = 'element'+self.count
                self.$store.commit('changeCount')
                if(status){
                    self.$store.commit('addElement',{
                        id:newID,
                        'yh-module':name,
                        module:components[name],
                        path:'elements.index',
                        parentmodule:'',
                        props:components[name].initCtor({
                            id:newID
                        },this,components)
                    })
                }else{  
                    // 给容器组件添加子组件，注：当前被选中的容器不一定就是最外层的容器
                    // elem 为当前被选中的容器，可通过一层层往上查找带有属性 yh-module 的元素找到最外层
                    // 但是由于选中的elem的yh-path就包含父级，所以没必要查找了
                    // let parents = getParentsByAttr(elem,'yh-module'),
                    //     parentPathArr = [],
                    //     parentPath = '',
                    //     i = 0
                    // for(i = parents.length - 1 ; i >= 0; i-- ){
                    //     parentPathArr.push(parents[i].getAttribute('yh-path'))
                    // }
                    // parentPath = parentPathArr.join('.')
                    let parentPath = elem.getAttribute('yh-path')
                    switch(coltype){
                        case 'setListCol':
                            // 给父级添加子级 e.target.getAttribute('setListCol') == 'setListCol'  // coltype
                            let prompt = document.getElementById('yh-edit-prompt')
                            this.currentChildData.parentID = elemID
                            this.currentChildData.id = newID
                            this.currentChildData['yh-module'] = name
                            this.currentChildData.parentPath = parentPath
                            this.currentChildData.path = 'props.elements.cindex'
                            this.currentChildData.parentmodule = yh_module
                            this.currentChildData.ignorestatus = ignorestatus
                            this.currentChildData.ischild = ischild
                            prompt.className = prompt.className.replace(/(hide)/g,'').replace(/(  )/g,' ')
                            break
                        default:
                            this.$store.commit('addChildElement',{
                                id:newID,
                                'yh-module':name,
                                module:components[name],
                                parentPath:parentPath,
                                path:'props.elements.cindex',
                                parentmodule:yh_module,
                                props:components[name].initCtor({
                                    id:newID,
                                    ignorestatus:ignorestatus,
                                    ischild:ischild
                                },this,components)
                            })
                            break;
                    }
                }
            },
            addComponents(e){
                let self = this,
                    target = getParentByAttr(e.target,'yh-module-name'),
                    classname = target.getAttribute('yh-module-name'),
                    path = classname.replace(' ','/'),
                    name = classname.replace(' ','_'),
                    coltype = e.target.getAttribute('setListCol')
                
                if(this.includes.indexOf(name) == -1){
                    this.includes.push(name)
                }
                switch(name){
                    case 'Slider_style1':
                    case 'Block_style2':
                    case 'Block_style3':
                    case 'Block_style4':
                        if(this.includes.indexOf("Block_style1") == -1){
                            this.includes.push("Block_style1")
                        }
                        this.loadComponentEvent('Block_style1','Block/style1','',function(){
                            self.loadComponentEvent(name,path,coltype,self.loadComponentCallBack)
                        })
                        break
                    default:
                        this.loadComponentEvent(name,path,coltype,this.loadComponentCallBack)
                        break
                }
            },
            setFirstChild(){
                // 第一次添加 需设置 data.childmodule.value = name
                let name = this.currentChildData['yh-module']
                this.$store.commit('addChildElement',{
                    id:this.currentChildData.id,
                    'yh-module':name,
                    module:components[name],
                    parentPath:this.currentChildData.parentPath,
                    path:this.currentChildData.path,
                    parentmodule:this.currentChildData.parentmodule,
                    props:components[name].initCtor({
                        id:this.currentChildData.id,
                        ignorestatus:this.currentChildData.ignorestatus,
                        ischild:this.currentChildData.ischild
                    })
                })
            },
            copyElementsData(elements){
                let data = [],
                    childElements = []
                for(let i = 0; i < elements.length; i++){
                    data.push(JSON.parse(JSON.stringify(elements[i])))
                    data[i].module = ''
                    childElements = elements[i].props.elements
                    if(childElements && childElements.length > 0){
                        data[i].props.elements = []
                        data[i].props.elements = this.copyElementsData(childElements)
                    }
                }
                return data
            },
            saveData(e){
                let elemDatas = this.copyElementsData(this.elements),
                    name = getQueryString('name')
                axios.post(this.connhost+'v3/api/editorPC/saveData',{
                    name:name,
                    elemDatas:JSON.stringify({
                        pageInfo:this.pageInfo,
                        elements:elemDatas,
                        includes:this.includes,
                        count:this.count
                    })
                }/*,{
                    emulateJSON:true
                }*/).then(response => {
                    alert(response.data.message)
                    // alert(response.body.message)
                },response =>{
                    console.log(response.body.message)
                })
            },
            publishHTML(e){
                undoSelected()
                let yh_editor_content = this.$refs['yh-editor-content'].cloneNode(true),
                    yhEditLayer = yh_editor_content.getElementsByClassName('yh-edit-layer'),
                    yhEditorContent = yh_editor_content.getElementsByClassName('yh-vessel-add'),
                    i = 0,
                    self = this
                for(i = 0; i < yhEditLayer.length; ){
                    yhEditLayer[i].parentNode.removeChild(yhEditLayer[i])
                }
                for(i = 0; i < yhEditorContent.length; ){
                    yhEditorContent[i].parentNode.removeChild(yhEditorContent[i])
                }
                
                // let content = yh_editor_content.innerHTML
                let elemDatas = this.copyElementsData(this.elements),
                    name = getQueryString('name')

                this.pageInfo.updateTime = getNow()
                this.$refs['yh-toast'].className = this.$refs['yh-toast'].className.replace(/( hide)/g,'')
                this.$refs['yh-toast'].children[0].innerHTML = '正在发布页面，请稍后……'
                axios.post(this.connhost+'v3/api/editorPC/savePage',{
                    name:name,
                    includes:this.includes,
                    count:this.count,
                    elemDatas:JSON.stringify({
                        pageInfo:this.pageInfo,
                        elements:elemDatas,
                        includes:this.includes,
                        count:this.count
                    }),
                    // content:content
                }/*,{
                    emulateJSON:true
                }*/).then(response => {
                    self.$refs['yh-toast'].className += ' hide'
                    alert("发布成功!")
                },response =>{
                    self.$refs['yh-toast'].className += ' hide'
                    alert(response.data.message)
                })
            },
            clearHTML(e){
                this.$store.commit('clearPage')
            },
            previewHTML(e){

            }
        }
    }
</script>
<style lang="scss">
    @import '../../../public/css/init.css';
    @import '../css/index.scss';
    html,body {
        font-size:46.875px;
    }
    /**页面样式**/
    [yh-editor]{
        width:100%;
        padding:77px 0 0 0;
        position:relative;
        overflow:hidden;
    }
    .top{
        width:100%;
        height:56px;
        padding:10px 0 10px 0;
        border-bottom: 1px solid #f1f1f1;
        flex-grow:0;
        position:fixed;
        left:0;
        top:0;
        z-index: 2000;  
        background-color: #fff;
    }
    .top .logo {
        width:56px;
        padding: 0 22px 0 22px;
        float:left;
    }
    .top .title {
        height:56px;
        line-height:56px;
        font-weight:normal;
        color:#02d28f;
        text-align: left;
        font-size: 23px;
        float:left;
        padding: 0 10px 0 0;
        border-right: 1px solid #f1f1f1;
    }
    .yh-lib-operate{
        width: 200px;
        position: fixed;
        right: 20px;
        top: 21px;
        z-index: 2000;
    }
    .yh-lib-operate li {
        position: relative;
        width: 40px;
        height: 50px;
        line-height: 15px;
        text-align: center;
        color: #666;
        white-space: nowrap;
        font-size: 12px;
        float: left;
    }
    .yh-lib-operate a {
        text-decoration:none;
        color:#666;
    }
    .yh-lib-operate a:hover {
        text-decoration:none;
    }
    .yh-lib-operate .yh-lib-icon {
        width: 20px;
        height: 20px;
        margin: 0 10px;
        background: url($host+"static/images/editorPC-icon.png") no-repeat -360px 0;
        background-size: 512px;
        display: block;
    }
    .yh-lib-operate li:nth-of-type(1) .yh-lib-icon {
        background-position: -210px 0;
    }
    .yh-lib-operate li:nth-of-type(2) .yh-lib-icon {
        background-position: -240px 0;
    }
    .yh-lib-operate li:nth-of-type(4) .yh-lib-icon {
        background-position: -270px 0;
    }
    /**组件样式**/
    [yh-module] {
        position:relative;
    }
    .yh-init{
        height:100px;
    }
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

    /*选中框********************************************/
    .yh-selection {/*display: none;*/ position:absolute; z-index: 999;}
    .yh-selection p { 
        width:10px; 
        height:10px;  
        background:#ff0084; 
        position:absolute;
        cursor:ne-resize;
    }
    .yh-selectTop p { 
        left:0; top:0; 
        margin:-5px 0 0 -5px; 
        cursor:nw-resize;
    }
    .yh-selectRight p { left:0; top:0; margin:-5px 0 0 -5px; }
    .yh-selectBottom p { 
        left:100%; 
        top:0; 
        margin:-5px 0 0 -5px; 
        cursor:se-resize;
    }
    .yh-selectLeft p { 
        left:0; top:100%; margin:-5px 0 0 -5px; 
        cursor:sw-resize;
    }

    .yh-selectTop p.center,.yh-selectBottom p.center {
        left:50%;
        top:50%;
        margin:-5px 0 0 -5px;
    }
    .yh-selectTop p.rotate {
        border-radius:10px;
        left:50%;
        top:-24px;
        margin:0 0 0 -5px;
        cursor:pointer;
    }
    .yh-selectTop p.rotate:after {
        width: 2px;
        height: 20px;
        content: "";
        background: #ff0084;
        position: absolute;
        left: 50%;
        top: 0;
        margin: 0 0 0 -1px;
    }
    .yh-selectLeft p.center,.yh-selectRight p.center {
        left:50%;
        top:50%;
        margin:-5px 0 0 -5px;
    }
    .yh-selectLeft p.center {
        cursor:w-resize;
    }
    .yh-selectRight p.center {
        cursor:e-resize;
    }
    .yh-selectTop p.center{
        cursor:n-resize;
    }
    .yh-selectBottom p.center {
        cursor:s-resize;
    }
    .yh-selectTop,.yh-selectBottom {border-top: 2px dashed #ff0084; }
    .yh-selectLeft,.yh-selectRight {border-left: 2px dashed #ff0084; }

    /*被选中时，给父级 yh-module 添加padding值******/
    .yh-module-selected {
        padding:20px;
        box-sizing:border-box;
        border: 1px solid #ff0084;
    }
</style>