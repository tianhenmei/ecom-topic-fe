<style>
    @import './index.css';
</style>
<template>
    <div class="demo-style1" :id="props.id" yh-module="Demo_style1"
        :ref="props.id"
        @click.stop="setAll"
        >
        
        <!-- yh-edit 组件设置 -->
        <yh-edit-complicated
            ref="yh-edit-complicated"
            :css="props.css"
            :elem_id="props.id"
            :common="props.common"
            :ignorestatus="props.ignorestatus"
            :ischild="props.ischild"
            :owndata="props.data"></yh-edit-complicated>
    </div>
</template>
<script>
    import {
        recoveryData,
        getDataID,
        settingBox,
        initSelected,
        updateData,
        setChildData
    } from '../../Base/Node.js'
    import YHEditComplicated from '../../../edit-components/yh-edit-complicated.vue'

    const baseData = {
        id:'',
        ignorestatus:'',  // 是否为类似LIST的子集（如果是则会忽略样式设置） 为'ignorestatus' 时忽略
        ischild:'',
        yh_data_name:'name',  // 当作为子级时放入uplist中的title取值
        css:{
            // background: 类名  background_color: css样式background-color
            background_background_color:{
                cn:'背景颜色',
                en:'background_background_color',
                value:'#00c99b',
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
            // name: 类名  color: css样式color
            name_color:{
                cn:'名称颜色',
                en:'name_color',
                value:'#ffffff'
            }
        },
        common:{

        },
        attribute:{
            
        },
        data:{  // 卡片数据
            
        }
    }
    export default {
        props:['props'],
        components:{
            'yh-edit-complicated':YHEditComplicated
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
                    ischild:baseData.ischild,
                    ignorestatus:baseData.ignorestatus,
                    yh_data_name:baseData.yh_data_name,
                    css:baseData.css,
                    attribute:baseData.attribute,
                    data:baseData.data,
                    common:baseData.common
                })),
                options
            )
            return data
        },
        setCtor(options,elemData){
            let data = Object.assign(
                {},
                JSON.parse(JSON.stringify({
                    ischild:baseData.ischild,
                    ignorestatus:baseData.ignorestatus,
                    yh_data_name:baseData.yh_data_name,
                    css:baseData.css,
                    attribute:baseData.attribute,
                    data:setChildData(elemData,baseData.data),
                    common:baseData.common
                })),
                options
            )
            return data
        },
        recoveryCtor(elem,options){
            let data = Object.assign(
                {},
                recoveryData(elem,baseData),
                this.methods.recoveryModuleData(elem,baseData),
                {
                    yh_data_name:baseData.yh_data_name,
                    common:baseData.common
                },
                options
            )
            return data
        }
    }
</script>