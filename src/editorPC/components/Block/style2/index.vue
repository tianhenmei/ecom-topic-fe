<template>
    <div class="block-style2" 
        :class="setLayerClass"
        :id="props.id" 
        yh-module="Block_style2"
        :ref="props.id"
        :yh-path="path"
        @click.stop="setAll"
        :style="setLayerStyle"
        yh-vessel
        >
        <div :id="props.id+'-content'" class="yh-block-content clearfix" 
            :class="{'yh-block-init':!props.elements.length,
            'yh-block-absolute':props.css.content_position.value == 'yh-block-absolute'}"
            :style="{
                width:props.css.background_width.value+(props.css.background_width.value == 'auto' ? '' : 'px'),
                marginLeft:props.css.content_position.value == 'yh-block-absolute' ? props.css.content_margin_left.value+'px': '',
                top:props.css.content_position.value == 'yh-block-absolute' ? props.css.content_top.value+'px': '0px'}">
            <div v-for="(element,index) in props.elements" 
                :is="element.module" 
                :props="element.props"
                :path="element.path"
                parentmodule="Block_style2"></div>
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
                ivalue:document.documentElement.clientWidth / 2,   // 初始值
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
            },
            // 外层定位
            layer_position:{
                en:'layer_position',
                cn:'父级定位',
                value:'',  // yh-block-fixed
                type:'options',
                options:[{
                    cn:'不定位',
                    value:''
                },{
                    cn:'自定义固定定位',
                    value:'yh-block-fixed'
                },{
                    cn:'固定在底部',
                    value:'yh-block-fixed-bottom'
                },{
                    cn:'固定在最左侧',
                    value:'yh-block-fixed-left'
                },{
                    cn:'固定在最右侧',
                    value:'yh-block-fixed-right'
                },{
                    cn:'固定在右下角',
                    value:'yh-block-fixed-bright'
                },{
                    cn:'绝对定位',
                    value:'yh-block-absolute'
                }],
                parent:'css',
                effect:['css.layer_margin_left','css.layer_left','css.layer_top','css.layer_right','css.layer_bottom']
            },
            layer_margin_left:{
                cn:'左',
                en:'layer_margin_left',
                value:0,
                default:0,
                type:'number',
                parent:'css',
                condition:["yh-block-fixed","yh-block-absolute","yh-block-fixed-bottom"],
                status:false
            },
            layer_left:{
                cn:'左',
                en:'layer_left',
                value:0,
                default:0,
                type:'number',
                parent:'css',
                condition:["yh-block-fixed-left"],
                status:false
            },
            layer_top:{
                cn:'上',
                en:'layer_top',
                value:0,
                default:0,
                type:'number',
                parent:'css',
                condition:["yh-block-fixed","yh-block-fixed-left","yh-block-absolute","yh-block-fixed-right"],
                status:false
            },
            layer_right:{
                cn:'右',
                en:'layer_right',
                value:0,
                default:0,
                type:'number',
                parent:'css',
                condition:["yh-block-fixed-right","yh-block-fixed-bright"],
                status:false
            },
            layer_bottom:{
                cn:'下',
                en:'layer_bottom',
                value:0,
                default:0,
                type:'number',
                parent:'css',
                condition:["yh-block-fixed-bottom","yh-block-fixed-bright"],
                status:false
            },
            // 内容定位
            content_position:{
                en:'content_position',
                cn:'内容定位',
                value:'',  // yh-block-absolute
                type:'options',
                options:[{
                    cn:'不定位',
                    value:''
                },{
                    cn:'定位',
                    value:'yh-block-absolute'
                }],
                parent:'css',
                effect:['css.content_margin_left','css.content_top']
            },
            content_margin_left:{
                cn:'左',
                en:'content_margin_left',
                value:0,
                type:'number',
                parent:'css',
                condition:["yh-block-absolute"],
                status:false
            },
            content_top:{
                cn:'上',
                en:'content_top',
                value:0,
                type:'number',
                parent:'css',
                condition:["yh-block-absolute"],
                status:false
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
            background_min_width:{
                cn:'最小宽度',
                en:'background_min_width',
                value:0,
                default:0,
                ivalue:0,
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
            },
            // 外层定位
            layer_position:{
                en:'layer_position',
                cn:'父级定位',
                value:'',  // yh-block-fixed
                type:'options',
                options:[{
                    cn:'不定位',
                    value:''
                },{
                    cn:'自定义固定定位',
                    value:'yh-block-fixed'
                },{
                    cn:'固定在底部',
                    value:'yh-block-fixed-bottom'
                },{
                    cn:'固定在最左侧',
                    value:'yh-block-fixed-left'
                },{
                    cn:'固定在最右侧',
                    value:'yh-block-fixed-right'
                },{
                    cn:'固定在右下角',
                    value:'yh-block-fixed-bright'
                },{
                    cn:'绝对定位',
                    value:'yh-block-absolute'
                }],
                parent:'h5css',
                effect:['h5css.layer_margin_left','h5css.layer_left','h5css.layer_top','h5css.layer_right','h5css.layer_bottom']
            },
            layer_margin_left:{
                cn:'左',
                en:'layer_margin_left',
                value:0,
                default:0,
                type:'number',
                parent:'h5css',
                condition:["yh-block-fixed","yh-block-absolute","yh-block-fixed-bottom"],
                status:false
            },
            layer_left:{
                cn:'左',
                en:'layer_left',
                value:0,
                default:0,
                type:'number',
                parent:'h5css',
                condition:["yh-block-fixed-left"],
                status:false
            },
            layer_top:{
                cn:'上',
                en:'layer_top',
                value:0,
                default:0,
                type:'number',
                parent:'h5css',
                condition:["yh-block-fixed","yh-block-fixed-left","yh-block-absolute","yh-block-fixed-right"],
                status:false
            },
            layer_right:{
                cn:'右',
                en:'layer_right',
                value:0,
                default:0,
                type:'number',
                parent:'h5css',
                condition:["yh-block-fixed-right","yh-block-fixed-bright"],
                status:false
            },
            layer_bottom:{
                cn:'下',
                en:'layer_bottom',
                value:0,
                default:0,
                type:'number',
                parent:'h5css',
                condition:["yh-block-fixed-bottom","yh-block-fixed-bright"],
                status:false
            },
            // 内容定位
            content_position:{
                en:'content_position',
                cn:'内容定位',
                value:'',  // yh-block-absolute
                type:'options',
                options:[{
                    cn:'不定位',
                    value:''
                },{
                    cn:'定位',
                    value:'yh-block-absolute'
                }],
                parent:'h5css',
                effect:['h5css.content_margin_left','h5css.content_top']
            },
            content_margin_left:{
                cn:'左',
                en:'content_margin_left',
                value:0,
                type:'number',
                parent:'h5css',
                condition:["yh-block-absolute"],
                status:false
            },
            content_top:{
                cn:'上',
                en:'content_top',
                value:0,
                type:'number',
                parent:'h5css',
                condition:["yh-block-absolute"],
                status:false
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
            },
            setLayerClass(){
                return this.props.css.layer_position.value
            },
            setLayerStyle(){
                let css = this.props.css,
                    style = {
                        backgroundColor:css.background_background_color.value,
                        backgroundImage:this.setImage,
                        backgroundRepeat:css.background_background_repeat.value,
                        minHeight:css.background_min_height.value+(css.background_min_height.value == 'auto' ? '' : 'px'),
                    }
                switch(css.layer_position.value){
                    case 'yh-block-fixed':
                    case 'yh-block-absolute':
                        style.marginLeft = css.layer_margin_left.value+'px'
                        style.top = css.layer_top.value+'px'
                        break
                    case 'yh-block-fixed-bottom':
                        style.marginLeft = css.layer_margin_left.value+'px'
                        style.bottom = css.layer_bottom.value+'px'
                        break
                    case 'yh-block-fixed-left':
                        style.left = css.layer_left.value+'px'
                        style.top = css.layer_top.value+'px'
                        break
                    case 'yh-block-fixed-right':
                        style.right = css.layer_right.value+'px'
                        style.top = css.layer_top.value+'px'
                        break
                    case 'yh-block-fixed-bright':
                        style.right = css.layer_right.value+'px'
                        style.bottom = css.layer_bottom.value+'px'
                        break
                }
                return style
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
            for(i = 0; i < 2; i++){
                newID = 'element'+self.count
                elements.push({
                    id:newID,
                    'yh-module':'Block_style1',
                    module:components['Block_style1'],
                    parentPath:'',
                    path:'props.elements.'+i,
                    parentmodule:'Block_style2',
                    props:components['Block_style1'].initCtor({
                        id:newID,
                        ignorestatus:'',
                        ischild:'ischild'
                    })
                })
                elements[i].props.css.background_width.value = document.documentElement.clientWidth / 2
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
