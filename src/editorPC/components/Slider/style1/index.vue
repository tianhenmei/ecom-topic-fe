<template>
    <div class="slider-style1" :id="props.id" yh-module="Slider_style1"
        :ref="props.id"
        :yh-path="path"
        @click.stop="setAll"
        :autoplay="props.data.autoplay.value"
        :animation="props.data.animation.value"
        yh-vessel>
        <div :id="props.id+'-container'" class="yh-slider-container clearfix"
            :style="{
                height:props.css.background_height.value+(props.css.background_height.value == 'auto' ? '' : 'px'),
                backgroundColor:props.css.background_background_color.value,
                backgroundImage:setImage,
                backgroundRepeat:props.css.background_background_repeat.value,
                minHeight:props.css.background_min_height.value+(props.css.background_min_height.value == 'auto' ? '' : 'px')
            }">
            <div :id="props.id+'-content'" class="yh-slider-content clearfix"
                :style="{
                    left:getLeft+ 'px',
                    // width:(props.css.slider_width.value == 'auto' ? 'auto' : (props.css.slider_width.value * props.elements.length)+'px')
                }">
                <div v-for="(element,index) in props.elements" 
                    :is="element.module" 
                    :props="element.props"
                    :path="element.path"
                    parentmodule="Slider_style1"></div>
            </div>
        </div>
        <a class="arrow-left" href="javascript:void(0);"
            @click.stop.prevent="leftEvent"></a>
        <a class="arrow-right" href="javascript:void(0);"
            @click.stop.prevent="rightEvent"></a>
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
        updateData,
        setChildData,
        recoveryChildElementsData
    } from '../../Base/Node.js'
    // import Swiper from '../../../../../public/js/lib/swiper.min.js'
    import YHEditComplicated from '../../../components-edit/yh-edit-complicated.vue'

    const baseData = {
        id:'',
        ignorestatus:'',  // 是否为类似LIST的子集（如果是则会忽略样式设置） 为'ignorestatus' 时忽略
        ischild:'',
        yh_data_name:'anchorID',  // 当作为子级时放入uplist中的title取值
        path:'',
        parentmodule:'',  // 父级模版
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
                // name:'子级属性名'  只有点击显示多个编辑的时候，如果子级是数组，每个数组元素是对象，则取此对象的属性等于name值的值作为uplist的title
                // condition:["auto",0]（条件）  通过带有effect属性的设置项查找，当其值等于"auto"或0时才会显示设置
                // status: false | true   条件控制的状态
                // effect:['',''] 当前属性会影响的属性，如css.overflow
                // default:'auto',  // 默认值
                // ivalue:100,   // 初始值
                // options:[{  // 选项的类容
                    // cn:'',   ／／ 选项中文
                    // value:'' // 选项真正的值
                // }]
                // 只有当前组件是容器组件时，一般只有设置数据才有，才会有eindex和index
                // 其中 eindex 指的是子组件在容器组件里面的位置
                //     index 指的是子组件的某个属性值value=数组，index表示在其中的位置，如公司组件的职位列表
            },
            background_height:{
                cn:'高度',
                en:'background_height',
                value:100,//'auto',
                default:'auto',  // 默认值
                ivalue:100,//document.documentElement.clientWidth,   // 初始值
                type:'number'
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
            // slider_width:{
            //     cn:'slider宽度',
            //     en:'slider_width',
            //     value:document.documentElement.clientWidth,//'auto',
            //     default:'auto',  // 默认值
            //     ivalue:document.documentElement.clientWidth,   // 初始值
            //     type:'number'
            // },
        },
        h5css:{
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
        elements:[],
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
            },
            currentIndex:{
                cn:'当前激活索引',
                en:'currentIndex',
                value:0,
                type:'none',
                parent:'data'
            },
            navigation:{
                cn:'左右按钮',
                en:'navigation',
                value:0,
                type:'checkbox',
                parent:'data'
            },
            pagination:{
                cn:'分页器',
                en:'pagination',
                value:0,
                type:'checkbox',
                parent:'data'
            },
            autoplay:{
                cn:'自动轮播',
                en:'autoplay',
                value:0,
                type:'checkbox',
                parent:'data'
            },
            animation:{
                cn:'轮播动画',
                en:'animation',
                value:'move',
                type:'options',
                parent:'data',
                options:[{
                    cn:'平移',
                    value:'move'
                },{
                    cn:'从小到大',
                    value:'zoomIn'
                }],
            },
        }
    }
    export default {
        props:['props','path','parentmodule'],
        components:{
            'yh-edit-complicated':YHEditComplicated
        },
        data(){
            return {
                swiper: null
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
            getLeft(){
                return this.props.data.currentIndex.value * this.props.elements[0].props.css.background_width.value * -1
            }
        },
        mounted(){
            // this.swiper = new Swiper('#'+this.props.id,{
            //     wrapperClass:'yh-slider-content',
            //     slideClass:'block-style1',
            //     // autoplay : 5000,
            // })
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
            },
            leftEvent(e){
                let length = this.props.elements.length
                this.props.data.currentIndex.value--
                if(this.props.data.currentIndex.value == -1){
                    this.props.data.currentIndex.value = length - 1
                }
            },
            rightEvent(e){
                let length = this.props.elements.length
                this.props.data.currentIndex.value++
                if(this.props.data.currentIndex.value == length){
                    this.props.data.currentIndex.value = 0
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
                    parentmodule:'Slider_style1',
                    props:components['Block_style1'].initCtor({
                        id:newID,
                        ignorestatus:'ignorestatus',
                        ischild:'ischild',
                        yh_data_name:baseData.yh_data_name
                    })
                })
                elements[i].props.css.background_width.value = document.documentElement.clientWidth
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
    /* @import '../../../../../public/css/lib/swiper.min.css';*/
    @import './index.css';
    .yh-module-selected > .yh-slider-container > .yh-slider-content{
        top:20px;
    }
</style>
