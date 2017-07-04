<template>
    <div yh-editor
        @click.stop="undoSelection">
        {{pageInfo.title}}
        <div class="CompanyPosition style1" @click="addComponets">companyPositionModule style1</div>
        <div class="CompanyPosition style2" @click="addComponets">companyPositionModule style2</div>
        <div class="List style1" @click="addComponets">ListModule style1</div>
        <div yh-editor-content ref="yh-editor-content">
            <div v-for="(element,index) in elements" :is="element.module" :props="element.props"></div>
        </div>
        <div id="save" @click="saveHTML">保存</div>
        <div id="preview" @click="previewHTML">预览</div>
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
        <!--添加框-->
        <yh-edit-add-companyposition @addChildData="addChildData"></yh-edit-add-companyposition>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import {recoveryData,undoSelected,
        isObject,
        getNow
    } from '../components/Base/Node.js'
    import YHEditAddCompanyPosition from '../edit-components/yh-edit-add-CompanyPosition.vue'
    let components = {
        'yh-edit-add-companyposition':YHEditAddCompanyPosition
    }

    export default{
        components:components,
        computed:mapState([
            'host',
            'includes',
            'elements',
            'count',
            'selected',
            'childClassify'
        ]),
        data(){
            return {
                pageInfo:{
                    templateId:'10001',
                    templateType:'PC',
                    templateCategory:'测试',
                    createTime:'2017/06/19 15:26',
                    createAuthor:'gaohui',
                    updateTime:'',
                    updateAuthor:'gaohui',
                    html:'text',
                    title:'YH EDITOR PC',
                    description:'YH EDITOR PC TEST',
                    activeTimeStart:'',
                    activeTimeEnd:'',
                    share:{
                        status:false,
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
            addChildData(data){
                let i = 0,
                    elemData = []
                for(i = 0; i < data.length; i++){
                    elemData.push({
                        id:data[i].elemID,
                        'yh-module':this.childClassify,
                        module:components[this.childClassify],
                        props:components[this.childClassify].setCtor({
                            id:data[i].elemID,
                            ignorestatus:'ignorestatus',
                            ischild:'ischild'
                        },data[i])
                    })
                }
                this.$store.commit('addChildData',elemData)
            },
            getPageData(){
                let self = this
                this.$http.get(this.host+'editorPC/getPageData',{
                    id:'10000',
                    name:'text'
                }).then(response => {
                    let content = response.body.content,
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
            },
            recoveryElements(elements){
                let data = [],
                    childElements = []
                for(let i = 0; i < elements.length; i++){
                    data.push(JSON.parse(JSON.stringify(elements[i])))
                    data[i].module = components[data[i]['yh-module']]
                    data[i].props = data[i].module.methods.resetData(data[i].props)
                    
                    childElements = elements[i].props.elements
                    if(childElements && childElements.length > 0){
                        data[i].props.elements = []
                        data[i].props.elements = this.recoveryElements(childElements)
                    }
                }
                return data
            },
            bindElement(html){
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
            },
            addComponets(e){
                let self = this,
                    classname = e.target.className,
                    path = classname.replace(' ','/'),
                    name = classname.replace(' ','_')
                
                if(this.includes.indexOf(name) == -1){
                    this.includes.push(name)
                }
                import(/* webpackChunkName:name */'../components/'+path+'/index.vue')
                // import(/* webpackChunkName:name */'http://localhost:9000/dist/editorPC/components/'+name+'.js')
                    .then(CompanyPositionStyle => {
                        components[name] = CompanyPositionStyle
                        let status = true,
                            ignorestatus = '',
                            ischild = '',
                            length = 0,
                            elem = document.getElementsByClassName('setting')[0],
                            elemID = '',
                            yh_module = ''
                        if(elem){
                            elemID = elem.getAttribute('id')
                            yh_module = elem.getAttribute('yh-module')
                            switch(yh_module){
                                case 'List_style1':
                                    length = this.getChildById(elem,elemID+'-content').children.length
                                    if(length == 0){
                                        status = false
                                        ignorestatus = 'ignorestatus',
                                        ischild = 'ischild'
                                    }
                                    break
                                default:
                                    break
                            }
                        }
                        if(status){
                            self.$store.commit('addElement',{
                                id:'element'+self.count,
                                'yh-module':name,
                                module:CompanyPositionStyle,
                                props:components[name].initCtor({
                                    id:'element'+self.count
                                })
                            })
                        }else{
                            self.$store.commit('addChildElement',{
                                id:'element'+self.count,
                                'yh-module':name,
                                module:CompanyPositionStyle,
                                props:components[name].initCtor({
                                    id:'element'+self.count,
                                    ignorestatus:ignorestatus,
                                    ischild:ischild
                                })
                            })
                        }
                        self.$store.commit('changeCount')
                    })
                    .catch(function(err) {
                        console.log('Failed to load: '+path, err);
                    });
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
            saveHTML(e){
                let yh_editor_content = this.$refs['yh-editor-content'].cloneNode(true),
                    yhEditLayer = yh_editor_content.getElementsByClassName('yh-edit-layer'),
                    yhEditorContent = yh_editor_content.getElementsByClassName('yh-vessel-add'),
                    i = 0
                for(i = 0; i < yhEditLayer.length; i++){
                    yhEditLayer[i].parentNode.removeChild(yhEditLayer[i])
                }
                for(i = 0; i < yhEditorContent.length; i++){
                    yhEditorContent[i].parentNode.removeChild(yhEditorContent[i])
                }
                
                let content = yh_editor_content.innerHTML
                let elemDatas = this.copyElementsData(this.elements)

                this.pageInfo.updateTime = getNow()
                this.$http.post(this.host+'editorPC/savePage',{
                    name:'text',
                    includes:this.includes,
                    count:this.count,
                    elemDatas:JSON.stringify({
                        pageInfo:this.pageInfo,
                        elements:elemDatas,
                        includes:this.includes,
                        count:this.count
                    }),
                    content:content
                },{
                    emulateJSON:true
                }).then(response => {
                    console.log(response.body.message)
                },response =>{
                    console.log(response.body.message)
                })
            },
            previewHTML(e){

            }
        }
    }
</script>
<style>
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
    .yh-selection {display: none; position:absolute; z-index: 999;}
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

</style>