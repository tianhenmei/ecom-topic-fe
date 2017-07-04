<style>
    @import './index.css';
    .yh-list-addone {
        width:100%;
        height:80px;
        line-height:80px;
        margin: 0 auto;
        border: 1px solid #ccc;
        font-size:40px;
        text-align:center;
        color:#666;
        cursor:pointer;
        box-sizing:border-box;
    }
</style>
<template>
    <div class="list-style1 background" :id="props.id" yh-module="List_style1"
        :style="{backgroundColor:props.css.background_background_color.value,
                 backgroundImage:setImage,
                 height:props.css.height.value+'px',
                 minHeight:props.nonset.min_height.value+'px'}"
        :background_background_image_h5="props.h5css.background_background_image_h5.value"
        :ref="props.id"
        @click.stop="setAll"
        yh-vessel
        >
        <div :id="props.id+'-content'" class="yh-list-content" :class="{'yh-init':!props.elements.length}">
            <div v-for="(element,index) in props.elements" :is="element.module" :props="element.props"></div>
        </div>
        <div 
            v-if="props.elements.length > 0" 
            class="yh-vessel-add yh-list-addone"
            @click.prevent="addElement">+</div>
        <!-- yh-edit 组件设置 -->
        <yh-edit-complicated
            ref="yh-edit-complicated"
            :css="props.css"
            :h5css="props.h5css"
            :elem_id="props.id"
            :common="props.common"
            :nature="props.attribute"
            :elements="props.elements"
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
        recoveryChildElementsData,
        updateData,
        setChildData
    } from '../../Base/Node.js'
    import YHEditComplicated from '../../../edit-components/yh-edit-complicated.vue'

    const baseData = {
        id:'',
        ignorestatus:'',  // 是否为类似LIST的子集（如果是则会忽略样式设置）为'ignorestatus' 时忽略
        ischild:'',
        yh_data_name:'name',  // 当作为子级时放入uplist中的title取值
        nonset:{
            min_height:{
                cn:'最小高度',
                en:'min_height',
                value:0,
                parent:'nonset'
            }
        },
        css:{
            height:{
                cn:'高度',
                en:'height',
                value:'auto',
                type:'number'
            },
            // background: 类名  background_color: css样式background-color
            background_background_color:{
                cn:'背景颜色',
                en:'background_background_color',
                value:'#00c99b'
            },
            background_background_image:{
                cn:'背景图片',
                en:'background_background_image',
                value:'none',
                type:'image',
                mold:'bg',   // mold两种模式：bg（背景图） src（图片src）
            }
        },
        h5css:{
            background_background_image_h5:{
                cn:'H5背景图片',
                en:'background_background_image_h5',
                value:'none',
                type:'image',
                mold:'bg',
            }
        },
        common:{

        },
        attribute:{
            
        },
        elements:{

        },
        data:{  // 卡片数据
            childmodule:{
                cn:'子集模板',
                en:'childmodule',
                value:'CompanyPosition_style1',
                parent:'none'
            }
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
                    nonset:baseData.nonset,
                    css:baseData.css,
                    h5css:baseData.h5css,
                    elements:baseData.elements,
                    attribute:baseData.attribute,
                    data:baseData.data,
                    common:baseData.common
                }))
            }
        },
        mounted(){
            
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
            addElement(e){
                let childmodule = this.props.data.childmodule.value,
                    classify = childmodule.split(/_/g)[0],
                    addedit = document.getElementById('yh-edit-add-'+classify)
                addedit.className = addedit.className.replace(/(hide)/g,'').replace('  ',' ')
                this.$store.commit('setTriggerID',{
                    triggerId:this.props.id,
                    triggerClassify:classify,
                    childClassify:childmodule
                })
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
            return data
        },
        setCtor(options,elemData){
            let data = Object.assign(
                {},
                JSON.parse(JSON.stringify({
                    ignorestatus:baseData.ignorestatus,
                    ischild:baseData.ischild,
                    yh_data_name:baseData.yh_data_name,
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
                    nonset:baseData.nonset,
                    common:baseData.common
                },
                options
            )
            return data
        }
    }
</script>