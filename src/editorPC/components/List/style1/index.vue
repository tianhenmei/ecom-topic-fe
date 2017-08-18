<template>
    <div class="list-style1 background clearfix" 
        :id="props.id"
        yh-module="List_style1"
        :class="{'yh-list-style1':props.elements.length > 0}"
        :style="{backgroundColor:props.css.background_background_color.value,
                 backgroundImage:setImage,
                 height:props.css.height.value+(props.css.height.value == 'auto' ? '' : 'px'),
                 overflow:props.css.overflow.value,
                 minHeight:props.nonset.min_height.value+'px'}"
        :background_background_image_h5="props.h5css.background_background_image_h5.value"
        :ref="props.id"
        :yh-path="path"
        @click.stop="setAll"
        @mouseenter.stop.prevent="showAddLayer"
        @mouseleave.stop.prevent="hideAddLayer"
        yh-vessel
        >
        <div :id="props.id+'-content'" class="yh-list-content clearfix" 
            :class="{'yh-init':!props.elements.length}"
            :style="{
                width:props.css.width.value+(props.css.width.value == 'auto' ? '' : 'px')}">
            <div v-for="(element,index) in props.elements" 
                :is="element.module" 
                :props="element.props"
                :path="element.path"
                parentmodule="List_style1"></div>
        </div>
        <div v-show="props.css.overflow.cnvalue == '滚动'" 
            :id="props.id+'-bar'"></div>
        <div v-show="props.elements.length == 0" class="yh-list-initcontent">选中添加组件</div>
        <div 
            v-show="props.elements.length > 0" 
            class="yh-vessel-add yh-list-addone hide"
            @click.prevent="addElement"
            ref="yh-list-addone">+</div>
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
        recoveryChildElementsData,
        updateData,
        setChildData
    } from '../../Base/Node.js'
    import YHEditComplicated from '../../../components-edit/yh-edit-complicated.vue'

    const baseData = {
        id:'',
        ignorestatus:'',  // 是否为类似LIST的子集（如果是则会忽略样式设置）为'ignorestatus' 时忽略
        ischild:'',
        yh_data_name:'name',  // 当作为子级时放入uplist中的title取值
        path:'',
        parentmodule:'',  // 父级模版
        nonset:{
            min_height:{
                cn:'最小高度',
                en:'min_height',
                value:0,
                parent:'nonset'
            }
        },
        css:{
            width:{
                cn:'宽度',
                en:'width',
                value:'auto',
                type:'none'
            },
            height:{
                cn:'高度',
                en:'height',
                value:'auto',
                type:'number',
                default:'auto',  // 默认值
                ivalue:100,   // 初始值
                effect:['css.overflow']
            },
            overflow:{
                cn:'超过高度',
                en:'overflow',
                value:'visible',  // visible(显示)  hidden(隐藏或滚动)
                cnvalue:'显示',
                condition:'css.height.value=="auto"',//（条件）  只有条件满足时才会设置
                implied:'visible',  // 条件不满足时，默认值
                type:'options',
                options:[{
                    cn:'显示',
                    value:'visible'
                },{
                    cn:'隐藏',
                    value:'hidden'
                },{
                    cn:'滚动',
                    value:'hidden'
                }]
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
            },
            childmodule:{
                cn:'子集模板',
                en:'childmodule',
                value:'CompanyPosition_style1',
                parent:'data',
                type:'none'
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
                let yh_edit_layer = this.$refs['yh-edit-complicated'].$refs[id+'-yh-edit-layer'],
                    add = this.$refs['yh-list-addone']
                yh_edit_layer.className = yh_edit_layer.className.replace(/( hide)/g,'')
                add.className = add.className.replace(/(hide)/g,'').replace(/  /g,' ')
                settingBox(this.$refs[id],this.props.ischild)
            },
            showAddLayer(e){
                let id = this.props.id,
                    list = this.$refs[id],
                    add = this.$refs['yh-list-addone']
                if(/(setting)/g.test(list.className)){
                    add.className = add.className.replace(/(hide)/g,'').replace(/  /g,' ')
                }
            },
            hideAddLayer(e){
                let id = this.props.id,
                    list = this.$refs[id],
                    add = this.$refs['yh-list-addone']
                if(/(setting)/g.test(list.className)){
                    add.className += ' hide'
                }
            },
            addElement(e){
                let childmodule = this.props.data.childmodule.value,
                    classify = childmodule.split(/_/g)[0],
                    addedit = document.getElementById('yh-edit-add-'+classify)
                addedit.className = addedit.className.replace(/(hide)/g,'').replace('  ',' ')
                this.$store.commit('setTriggerID',{
                    triggerId:this.props.id,
                    triggerClassify:classify,
                    childClassify:childmodule,
                    parentmodule:'List_style1'
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
                recoveryChildElementsData(elem,baseData,components,'List_style1','ignorestatus'),
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
    .yh-list-style1{
        /* padding:0 0 80px 0; */
        position:relative;
    }
    .yh-init {
        
    }
    .yh-list-initcontent{
        width: 500px;
        height: 80px;
        line-height: 80px;
        border: 1px dashed #fff;
        border-radius: 10px;
        box-sizing: border-box;
        text-align: center;
        font-size: 48px;
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -40px 0 0 -250px;
    }
    .yh-list-addone {
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin: -50px auto 0;
        border: 1px solid #ccc;
        font-size: 40px;
        text-align: center;
        background-color: #fff;
        color: #666;
        cursor: pointer;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 100%;
        z-index: 1000;
    }
</style>
