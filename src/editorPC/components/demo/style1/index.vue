<style>
    @import './index.css';
</style>
<template>
    <div class="demo-style1" :id="props.id" yh-module="Demo_style1"
        :ref="props.id"
        :yh-path="path"
        @click.stop="setAll"
        >
        
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
    import YHEditComplicated from '../../../components-edit/yh-edit-complicated.vue'

    const baseData = {
        id:'',
        ignorestatus:'',  // 是否为类似LIST的子集（如果是则会忽略样式设置） 为'ignorestatus' 时忽略
        ischild:'',
        yh_data_name:'name',  // 当作为子级时放入uplist中的title取值
        path:'',
        parentmodule:'',  // 父级模版
        // sync : 只有当此组件为容器组件时才会有
        // 用来当容器组件的子组件的某个属性（必须是公共属性）改变时，当前容器组件的某个属性也要跟着改变
        // 可改变多个容器组件的属性，数组的形式
        // sync:{
        //     'background_width':['css.width']
        // }
        css:{
            // background: 类名  background_color: css样式background-color
            background_background_color:{
                cn:'背景颜色',
                en:'background_background_color',
                value:'transparent',
                type:'color'  
                    // color(默认)   
                    // image（背景图(mold="bg")、图片(mold="src")）  
                    // number(数字)     
                    // text(文本)
                    // textarea(多行文字)
                    // uplist(内部多选项设置)
                    // request （数据请求：公司ID、职位ID、问题ID、回答ID等）
                    // options 选项
                    // none  不编辑的属性
                // nounit 是否有单位，如果为true，表示没有，只有type值为number才有此属性

                // name:'子级属性名'  只有点击显示多个编辑的时候，如果子级是数组，每个数组元素是对象，则取此对象的属性等于name值的值作为uplist的title
                
                // condition:["auto",0]（条件）(被影响属性)  通过带有effect属性的设置项查找，当其值等于"auto"或0时才会显示设置
                // conditionKey: '' (被影响属性: 非必要)  条件控制的属性名, 如css.overflow
                // status: false | true (被影响属性)  条件控制的状态
                // limitop: "==" (被影响属性) 默认“==”，即如果父级属性的值等于condition中任意一个值，则成立,其值如下
                //          "!=" condition中的所有值同时满足
                //          ">" "<" ">=" "<=" 当前的值只允许 condition数组中只有一个值
                // effect:['',''] (影响属性) 当前属性会影响的属性，如css.overflow

                // default:'auto',  // 默认值
                // ivalue:100,   // 初始值
                // options:[{  // 选项的类容
                    // cn:'',   ／／ 选项中文
                    // value:'' // 选项真正的值
                // }]
                // parentSetStatus:'common',  // 如果当前组件为子组件时，其设置的状态， common: 共同设置(css默认)    save: 保留不设置   child: 单独设置(data默认)
                // 只有当前组件是容器组件时，一般只有设置数据才有，才会有eindex和index
                // 其中 eindex 指的是子组件在容器组件里面的位置
                //     index 指的是子组件的某个属性值value=数组，index表示在其中的位置，如公司组件的职位列表
            },
            // name: 类名  color: css样式color
            name_color:{
                cn:'名称颜色',
                en:'name_color',
                value:'#ffffff'
            }
        },
        h5css:{
            
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
        data(){
            return {
                
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