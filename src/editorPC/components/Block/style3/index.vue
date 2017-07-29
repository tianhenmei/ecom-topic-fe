<template>
    <div class="block-style3" 
        :id="props.id" 
        yh-module="Block_style3"
        :ref="props.id"
        :yh-path="path"
        @click.stop="setAll"
        :style="{backgroundColor:props.css.background_background_color.value,
            backgroundImage:setImage,
            backgroundRepeat:props.css.background_background_repeat.value,
            height:props.css.background_min_height.value+(props.css.background_min_height.value == 'auto' ? '' : 'px')}"
        yh-vessel
        >
        <div :id="props.id+'-content'" class="yh-block-content clearfix" 
            :class="{'yh-block-init':!props.elements.length}"
            :style="{
                width:props.css.background_width.value+(props.css.background_width.value == 'auto' ? '' : 'px')}">
            <div v-for="(element,index) in props.elements" 
                :is="element.module" 
                :props="element.props"
                :path="element.path"
                parentmodule="Block_style3"></div>
        </div>
        <!-- yh-edit 组件设置 -->
        <yh-edit-complicated
            ref="yh-edit-complicated"
            :css="props.css"
            :h5css="props.h5css"
            :elem_id="props.id"
            :common="props.common"
            :ignorestatus="props.ignorestatus"
            :ischild="props.ischild"
            :owndata="props.data"
            :path="path"
            :parentmodule="parentmodule"></yh-edit-complicated>
    </div>
</template>
<script>
    import {
        recoveryData,
        getDataID,
        settingBox,
        initSelected,
        updateData,
        setChildData,
        recoveryChildElementsData
    } from '../../Base/Node.js'
    import YHEditComplicated from '../../../edit-components/yh-edit-complicated.vue'
    
    const baseData = {
        id:'',
        ignorestatus:'',  // 是否为类似LIST的子集（如果是则会忽略样式设置） 为'ignorestatus' 时忽略
        ischild:'',
        yh_data_name:'name',  // 当作为子级时放入uplist中的title取值
        path:'',
        parentmodule:'',  // 父级模版
        css:{
            background_width:{
                cn:'宽度',
                en:'background_width',
                value:'auto',
                default:'auto',  // 默认值
                ivalue:document.documentElement.clientWidth / 3,   // 初始值
                type:'number'
            },
            background_height:{
                cn:'高度',
                en:'background_height',
                value:'auto',
                default:'auto',
                ivalue:100,
                type:'number',
            },
            background_min_height:{
                cn:'最小高度',
                en:'background_min_height',
                value:'auto',
                default:'auto',
                ivalue:100,
                type:'none',
                parent:'css'
            },
            background_background_color:{
                cn:'背景颜色',
                en:'background_background_color',
                value:'transparent',
                type:'color'
            },
            background_background_image:{
                cn:'背景图片',
                en:'background_background_image',
                value:'none',
                type:'image',
                mold:'bg'
            },
            background_background_repeat:{
                cn:'背景重复',
                en:'background_background_repeat',
                value:'no-repeat',
                type:'options',
                options:[{
                    cn:'不重复',
                    value:'no-repeat'
                },{
                    cn:'重复',
                    value:'repeat'
                },{
                    cn:'横向重复',
                    value:'repeat-x'
                },{
                    cn:'纵向重复',
                    value:'repeat-y'
                }]
            }
        },
        h5css:{
            background_width:{
                cn:'宽度',
                en:'background_width',
                value:'auto',
                default:'auto',  // 默认值
                ivalue:750,   // 初始值
                type:'none',
                parent:'h5css'
            },
            background_height:{
                cn:'高度',
                en:'background_height',
                value:'auto',
                default:'auto',
                ivalue:100,
                type:'none',
                parent:'h5css'
            },
            background_min_height:{
                cn:'最小高度',
                en:'background_min_height',
                value:0,
                default:0,
                ivalue:0,
                type:'none',
                parent:'h5css'
            },
            background_background_color:{
                cn:'背景颜色',
                en:'background_background_color',
                value:'transparent',
                type:'color',
                parent:'h5css'
            },
            background_background_image_h5:{
                cn:'H5背景图片',
                en:'background_background_image_h5',
                value:'none',
                type:'image',
                mold:'bg',
                parent:'h5css'
            },
            background_background_repeat:{
                cn:'背景重复',
                en:'background_background_repeat',
                value:'no-repeat',
                type:'options',
                parent:'h5css',
                options:[{
                    cn:'不重复',
                    value:'no-repeat'
                },{
                    cn:'重复',
                    value:'repeat'
                },{
                    cn:'横向重复',
                    value:'repeat-x'
                },{
                    cn:'纵向重复',
                    value:'repeat-y'
                }]
            }
        },
        common:{

        },
        attribute:{
            
        },
        elements:[],
        data:{  // 卡片数据
            toH5:{
                cn:'适配移动端',
                en:'toH5',
                value:1,
                type:'checkbox',
                parent:'data'
            },
            toPC:{
                cn:'适配到PC',
                en:'toPC',
                value:1,
                type:'checkbox',
                parent:'data'
            },
            anchorID:{
                cn:'锚点ID',
                en:'anchorID',
                value:'',
                type:'text',
                parent:'data'
            }
        }
    }
    export default {
        props:['props','path','parentmodule'],
        components:{
            'yh-edit-complicated':YHEditComplicated
        },
        data(){
            return {
                
            }
        },
        computed:{
            setImage(){
                let src = this.props.css.background_background_image.value.trim()
                switch(src){
                    case 'none':
                        return src
                    case 'undefined':
                        return 'none'
                    default:
                        return 'url('+src+')'
                }
            }
        },
        mounted(){
            
        },
        methods:{
            resetData(data){
                return updateData(data,baseData)
            },
            setAll(e){
                let id = initSelected(e)
                this.$refs[id].className += ' setting'
                let yh_edit_layer = this.$refs['yh-edit-complicated'].$refs[id+'-yh-edit-layer']
                yh_edit_layer.className = yh_edit_layer.className.replace(/( hide)/g,'')
                settingBox(this.$refs[id],this.props.ischild)
            },
            recoveryModuleData(elem,baseData){
                let data = {},
                    attr = '',
                    current = null,
                    currentChild = null,
                    i = 0,curr = '',
                    childdata = {}
                for(attr in baseData.data){ 
                    
                }
                return {
                    data:data
                }
            }
        },
        initCtor(options,self,components){
            let newID = '',
                i = 0,
                elements = []
            for(i = 0; i < 3; i++){
                newID = 'element'+self.count
                elements.push({
                    id:newID,
                    'yh-module':'Block_style1',
                    module:components['Block_style1'],
                    parentPath:'',
                    path:'props.elements.'+i,
                    parentmodule:'Block_style3',
                    props:components['Block_style1'].initCtor({
                        id:newID,
                        ignorestatus:'',
                        ischild:'ischild'
                    })
                })
                elements[i].props.css.background_width.value = document.documentElement.clientWidth / 3
                self.$store.commit('changeCount')
            }
            let data = Object.assign(
                {},
                JSON.parse(JSON.stringify({
                    ignorestatus:baseData.ignorestatus,
                    ischild:baseData.ischild,
                    yh_data_name:baseData.yh_data_name,
                    nonset:baseData.nonset,
                    css:baseData.css,
                    h5css:baseData.h5css,
                    elements:baseData.elements,
                    attribute:baseData.attribute,
                    data:baseData.data,
                    common:baseData.common
                })),
                options,{
                    elements:elements
                }
            )
            data.data.anchorID.value = options.id
            return data
        },
        setCtor(options,elemData){
            let data = Object.assign(
                {},
                JSON.parse(JSON.stringify({
                    ignorestatus:baseData.ignorestatus,
                    ischild:baseData.ischild,
                    yh_data_name:baseData.yh_data_name,
                    path:path,
                    css:baseData.css,
                    h5css:baseData.h5css,
                    elements:baseData.elements,
                    nonset:baseData.nonset,
                    attribute:baseData.attribute,
                    data:setChildData(elemData,baseData.data),
                    common:baseData.common
                })),
                options
            )
            data.data.anchorID.value = options.id
            return data
        },
        recoveryCtor(elem,options,components){
            let data = Object.assign(
                {},
                recoveryData(elem,baseData),
                this.methods.recoveryModuleData(elem,baseData),
                recoveryChildElementsData(elem,baseData,components,'ignorestatus'),
                {
                    yh_data_name:baseData.yh_data_name,
                    path:path,
                    nonset:baseData.nonset,
                    common:baseData.common
                },
                options
            )
            if(!data.data.anchorID.value){
                data.data.anchorID.value = options.id
            }
            return data
        }
    }
</script>
<style>
    @import './index.css';
    .yh-block-init {
        width:100%;
        height:100px;
        border:1px solid #ccc;
        box-sizing:border-box;
    }
</style>
