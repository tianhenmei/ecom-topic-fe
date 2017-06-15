<template>
    <div yh-editor
        @click.stop.prevent="undoSelection">
        {{title}}
        <div class="CompanyPosition style1" @click="addComponets">companyPositionModule style1</div>
        <div class="CompanyPosition style2" @click="addComponets">companyPositionModule style2</div>
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
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import {recoveryData} from '../components/Base/Node.js'
    let components = {}

    export default{
        components:components,
        computed:mapState([
            'host',
            'includes',
            'elements',
            'count'
        ]),
        data(){
            return {
                title:'YH EDITOR PC',
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
            undoSelection(e){
                let target = e.target
                while(target){
                    if(target.attributes['yh-editor']){
                        $('.setting').removeClass('setting')
                        $('.yh-edit-layer').addClass('hide')
                        $('.yh-selection').hide()
                        break
                    }else if(target.attributes['yh-module']){
                        break
                    }
                    target = target.parentNode
                }
            },
            getPageData(){
                let self = this
                $.ajax({
                    type:'post',
                    url:this.host+'editorPC/getPageData',
                    data:{
                        id:'10000',
                        name:'text'
                    },
                    success:function(result){
                        let content = result.content

                        self.loadComponents(content.includes,content.html)
                        self.$store.commit('initData',{
                            includes:content.includes,
                            count:content.count
                        })
                    },
                    error:function(error){
                        console.log(error.message)
                    }
                })
            },
            loadComponents(includes,html){
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
                                self.bindElement(html)
                                self.$refs['yh-toast'].className += ' hide'
                            }
                        })
                    })(includes[i])
                }
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
                    current = {
                        id:id,
                        'yh-module':yhmodule,
                        module:components[yhmodule],
                        props:components[yhmodule].recoveryCtor(children.eq(i),{
                            id:id,
                        })
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
                        self.$store.commit('addElement',{
                            id:'element'+self.count,
                            'yh-module':name,
                            module:CompanyPositionStyle,
                            props:components[name].initCtor({
                                id:'element'+self.count
                            })
                        })
                        self.$store.commit('changeCount')
                    })
                    .catch(function(err) {
                        console.log('Failed to load: '+path, err);
                    });
            },
            saveHTML(e){
                let yh_editor_content = this.$refs['yh-editor-content'].cloneNode(true)
                $(yh_editor_content).find('.yh-edit-layer').remove();
                let content = yh_editor_content.innerHTML
                $.ajax({
                    type:'post',
                    url:this.host+'editorPC/savePage',
                    data:{
                        name:'text',
                        includes:this.includes,
                        count:this.count,
                        content:content
                    },
                    success:function(result){
                        console.log(result.message)
                    },
                    error:function(error){
                        console.log(error.message);
                    }
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