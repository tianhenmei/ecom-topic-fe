<style>
    @import './index.css';
</style>
<template>
    <div class="image-style1" :id="props.id" yh-module="Image_style1"
        :ref="props.id"
        :style="{
            height:props.css.content_height.value+'px',
            backgroundColor:props.css.content_background_color.value,
        }"
        @click.stop="setAll"
        >
        <img class="yh-image-content"
            :style="{
                marginTop:(-props.css.content_height.value / 2 + 'px'),
                marginLeft:(-props.css.content_width.value / 2 + 'px')
            }"
            :src="props.css.content_src.value" />
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
        css:{
            // background: 类名  background_color: css样式background-color
            content_background_color:{
                cn:'背景颜色',
                en:'content_background_color',
                value:'#ffffff',
                type:'color'  
                    // color(默认)   
                    // image（背景图(mold="bg")、图片(mold="src")）  
                    // number(数字)     
                    // text(文本)
                    // textarea(多行文字)
                    // uplist(内部多选项设置)
                    // request （数据请求：公司ID、职位ID、问题ID、回答ID等）
                    // options 选项
                // name:'子级属性名'  只有点击显示多个编辑的时候，如果子级是数组，每个数组元素是对象，则取此对象的属性等于name值的值作为uplist的title
                // condition:'css.height.value=="auto"'（条件）  只有条件满足时才会设置
                // effect:['',''] 当前属性会影响的属性，如css.overflow
            },
            content_src:{
                cn:'图片地址',
                en:'content_src',
                value:'https://www.lagou.com/topic/static/img/newEdit/topImg.png',
                type:'image',
                mold:'src'  
            },
            content_width:{
                cn:'宽',
                en:'content_width',
                value:1210,
                type:'none',
            },
            content_height:{
                cn:'高',
                en:'content_height',
                value:200,
                type:'none',
            }
        },
        h5css:{
            content_background_color:{
                cn:'背景颜色',
                en:'content_background_color',
                value:'#00c99b',
                type:'color'
            },
            content_src:{
                cn:'背景图片',
                en:'content_src',
                value:'none',
                type:'image',
                mold:'bg'  
            }
        },
        common:{

        },
        attribute:{
            
        },
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
        data(){
            return {
                baseData:JSON.parse(JSON.stringify({
                    id:baseData.id,
                    ignorestatus:baseData.ignorestatus,
                    ischild:baseData.ischild,
                    yh_data_name:baseData.yh_data_name,
                    css:baseData.css,
                    attribute:baseData.attribute,
                    data:baseData.data,
                    common:baseData.common
                }))
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
        initCtor(options){
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
                options
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