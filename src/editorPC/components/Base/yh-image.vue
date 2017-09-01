<template>
    <div :id="props.id" :ref="props.id"
        :path="path"
        :style="{
            left:props.css.left.value+'px',
            top:props.css.top.value+'px',
            position: 'absolute'
        }"
        class="yh-custom-style"
        @mouseenter.stop.prevent="showEditLayer"
        @mouseleave.stop.prevent="hideEditLayer"
        @click.stop.prevent="setAll"
        draggable="false"
        yh-custom-image="yh-custom-image"
        >
        <div class="yh-custom-image-content">
            <img class="yh-custom-image yh-custom-style yh-custom-image-img" 
                :class="props.data.imagetype.value"
                :src="props.css.src.value" 
                :style="{
                    width:props.css.width.value+'px',
                    height:props.css.height.value+'px',
                    backgroundColor:props.css.background_color.value,
                    borderColor:props.css.border_color.value,
                    borderWidth:props.css.border_width.value+'px',
                    borderStyle:props.css.border_style.value,
                    borderRadius:props.css.border_radius.value+'px',
                    boxShadow:setBoxShadow
                }"/>
            <a class="yh-custom-style yh-custom-image-href yh-custom-href" :class="props.data.imagetype.value+'-href'" href="javascript:void(0);" :lagou-href="getImageHref"
                target="_blank"
                :style="{
                    width:'100%',
                    height:'100%',
                    position:'absolute',
                    left:'0',
                    top:'0',
                    display:'block'
                }"></a>
        </div>
        <yh-edit-base 
            ref="yh-edit-base"
            :css="props.css" 
            :h5css="props.h5css" 
            :elem_id="props.id"
            :owndata="props.data"
            :event="props.event"
            :eindex="eindex"
            :path="path"
            custom="custom"
            :editLayerStatus="editLayerStatus"></yh-edit-base>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import {
        settingBox,
        initSelected
    } from './Node.js'
    // edit-components
    import YHEditBase from '../../components-edit/yh-edit-base.vue'
    const baseData = {
        id:'',
        ignorestatus:'',  // 是否为类似LIST的子集（如果是则会忽略样式设置） 为'ignorestatus' 时忽略
        ischild:'',
        yh_data_name:'name',  // 当作为子级时放入uplist中的title取值
        path:'',
        css:{
            width:{
                cn:'宽',
                en:'width',
                value:100,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            height:{
                cn:'高',
                en:'height',
                value:100,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            left:{
                cn:'定位.左',
                en:'left',
                value:0,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            top:{
                cn:'定位.上',
                en:'top',
                value:0,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            background_color:{
                cn:'背景颜色',
                en:'background_color',
                value:'#ffffff',
                type:'color',
                edittype:'custom'
            },
            src:{
                cn:'图片地址',
                en:'src',
                value:'https://www.lagou.com/topic/static/img/newEdit/topImg.png',
                type:'image',
                mold:'src',
                edittype:'custom' 
            },
            border_color:{
                cn:'边框颜色',
                en:'border_color',
                value:'#ffffff',
                type:'color',
                parent:'css',
                edittype:'custom'
            },
            border_width:{
                cn:'边框宽度',
                en:'border_width',
                value:0,
                type:'number',
                parent:'css',
                edittype:'custom'
            },
            border_style:{
                cn:'边框类型',
                en:'border_style',
                value:'none',
                cnvalue:'无',
                type:'options',
                parent:'css',
                edittype:'custom',
                options:[{  // 选项的类容
                    cn:'无',   // 选项中文
                    value:'none' // 选项真正的值
                },{  // 选项的类容
                    cn:'实线',   // 选项中文
                    value:'solid' // 选项真正的值
                },{
                    cn:'虚线',
                    value:'dashed'
                },{
                    cn:'点状',
                    value:'dotted'
                },{
                    cn:'双线',
                    value:'double'
                }]
            },
            border_radius:{
                cn:'圆角',
                en:'border_radius',
                value:0,
                type:'number',
                parent:'css',
                edittype:'custom'
            },
            box_shadow_x:{
                cn:'阴影',
                en:'box_shadow_x',
                value:0,
                type:'number',
                parent:'css',
                edittype:'custom'
            },
            box_shadow_y:{
                cn:'', 
                en:'box_shadow_y',
                value:0,
                type:'number',
                parent:'css',
                edittype:'custom'
            },
            box_shadow_blur:{
                cn:'',
                en:'box_shadow_blur',
                value:0,
                type:'number',
                parent:'css',
                edittype:'custom'
            },
            box_shadow_color:{
                cn:'',
                en:'box_shadow_color',
                value:'#ffffff',
                type:'color',
                parent:'css',
                edittype:'custom'
            }
        },
        h5css:{
            
        },
        common:{

        },
        attribute:{
            
        },
        data:{  // 卡片数据
            imagetype:{
                cn:'图片类型',
                en:'imagetype',
                value:'normal-src',
                cnvalue:'普通图片',
                type:'options',
                parent:'data',
                edittype:'custom',
                options:[{  // 选项的类容
                    cn:'普通图片',   // 选项中文
                    value:'normal-src' // 选项真正的值
                },{  // 选项的类容
                    cn:'公司logo',   // 选项中文
                    value:'logo' // 选项真正的值
                },{
                    cn:'领导logo',
                    value:'manager_logo'
                }],
                effect:['data.imagecn','data.imageen']
            },
            imagecn:{
                cn:'设置中文',
                en:'imagecn',
                value:'图片设置',
                type:'text',
                condition:['normal-src'],
                status:true,
                edittype:'custom',
                parent:'data'
            },
            imageen:{
                cn:'英文名称',
                en:'imageen',
                value:'image',
                type:'text',
                parent:'data',
                edittype:'custom',
                condition:['normal-src'],
                status:true
            }
        },
        event:{
            eventtype:{
                cn:'事件类型',
                en:'eventtype',
                value:'click',
                cnvalue:'点击',
                type:'options',
                parent:'event',
                edittype:'custom',
                options:[{  // 选项的类容
                    cn:'点击',   // 选项中文
                    value:'click' // 选项真正的值
                },{  // 选项的类容
                    cn:'鼠标滑过',   // 选项中文
                    value:'mouseenter' // 选项真正的值
                }]
            },
            eventmethod:{
                cn:'响应方式',
                en:'eventmethod',
                value:'link',
                cnvalue:'链接',
                type:'options',
                parent:'event',
                edittype:'custom',
                options:[{  // 选项的类容
                    cn:'链接',   // 选项中文
                    value:'link' // 选项真正的值
                },{  // 选项的类容
                    cn:'浮层',   // 选项中文
                    value:'float' // 选项真正的值
                }],
                effect:['event.floatDirection','event.linkClassify']
            },
            floatDirection:{
                cn:'浮层方向',
                en:'floatDirection',
                value:'down',
                cnvalue:'从下往上',
                type:'options',
                parent:'event',
                edittype:'custom',
                options:[{  // 选项的类容
                    cn:'从下往上',   // 选项中文
                    value:'down' // 选项真正的值
                },{  // 选项的类容
                    cn:'从上往下',   // 选项中文
                    value:'up' // 选项真正的值
                },{
                    cn:'从左往右',
                    value:'left'
                },{
                    cn:'从右往左',
                    value:'right'
                },{
                    cn:'右下角',
                    value:'rightbottom'
                },{
                    cn:'翻转',
                    value:'flip'
                }],
                condition:["float"],
                status:false
            },
            linkClassify:{
                cn:'链接类型',
                en:'linkClassify',
                value:'company',
                cnvalue:'公司主页',
                type:'options',
                parent:'event',
                edittype:'custom',
                options:[{  // 选项的类容
                    cn:'公司主页',   // 选项中文
                    value:'company' // 选项真正的值
                },{  // 选项的类容
                    cn:'职位列表',   // 选项中文
                    value:'positionList' // 选项真正的值
                },{
                    cn:'职位页',
                    value:'position'
                },{
                    cn:'言职问题',
                    value:'question'
                },{
                    cn:'言职回答',
                    value:'answer'
                },{
                    cn:'自定义',
                    value:'userdefined'
                }],
                // effect:[
                //     'event.company_id',
                //     'event.positionList_id',
                //     'event.position_id',
                //     'event.question_id',
                //     'event.answer_id',
                //     'event.userdefined'
                // ],
                condition:["link"],
                status:true
            },
            // company_id:{
            //     cn:'公司ID',
            //     en:'company_id',
            //     value:'',
            //     type:'text',
            //     parent:'event',
            //     edittype:'custom',
            //     condition:["company"],
            //     conditionKey:'event.linkClassify',
            //     status:true
            // },
            // positionList_id:{
            //     cn:'公司ID',
            //     en:'positionList_id',
            //     value:'',
            //     type:'text',
            //     parent:'event',
            //     edittype:'custom',
            //     condition:["positionList"],
            //     conditionKey:'event.linkClassify',
            //     status:false
            // },
            // position_id:{
            //     cn:'职位ID',
            //     en:'position_id',
            //     value:'',
            //     type:'text',
            //     parent:'event',
            //     edittype:'custom',
            //     condition:["position"],
            //     conditionKey:'event.linkClassify',
            //     status:false
            // },
            // question_id:{
            //     cn:'问题ID',
            //     en:'question_id',
            //     value:'',
            //     type:'text',
            //     parent:'event',
            //     edittype:'custom',
            //     condition:["question"],
            //     conditionKey:'event.linkClassify',
            //     status:false
            // },
            // answer_id:{
            //     cn:'回答ID',
            //     en:'answer_id',
            //     value:'',
            //     type:'text',
            //     parent:'event',
            //     edittype:'custom',
            //     condition:["answer"],
            //     conditionKey:'event.linkClassify',
            //     status:false
            // },
            // userdefined:{
            //     cn:'自定义URL',
            //     en:'userdefined',
            //     value:'',
            //     type:'text',
            //     parent:'event',
            //     edittype:'custom',
            //     condition:["userdefined"],
            //     conditionKey:'event.linkClassify',
            //     status:false
            // }
        }
    }
    export default {
        components:{
            'yh-edit-base':YHEditBase
        },
        props:['props','path','eindex'],
        computed:{
            ...mapState([
                'custom'
            ]),
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
            setBoxShadow(){
                let str = 
                    this.props.css.box_shadow_x.value+'px ' + 
                    this.props.css.box_shadow_y.value+'px ' + 
                    this.props.css.box_shadow_blur.value+'px ' + 
                    this.props.css.box_shadow_color.value
                return str
            },
            getImageHref(){
                let type = this.props.event.linkClassify.value
                switch(type){
                    case 'company':
                        return "'https://www.lagou.com/gongsi/\'+props.data.companyId.value+\'.html'"
                    case 'positionList':
                        return "'https://www.lagou.com/gongsi/j\'+props.data.companyId.value+\'.html'"
                    case 'position':
                        return "'https://www.lagou.com/jobs/\'+props.data.positionId.value+\'.html?source=pl&i=pl-0'"
                    case 'question':
                        return "'https://yanzhi.lagou.com/question/\'+props.data.questionId.value+\'.html'"
                    case 'answer':
                        return "'https://yanzhi.lagou.com/answer/\'+props.data.anwserId.value+\'.html'"
                    case 'userdefined':
                    default:
                        return 'props.data.href.value'
                }
            }
        },
        data(){
            return {
                editLayerStatus:false
            }
        },
        mounted:function(){
            
        },
        methods:{
            showEditLayer(e){
                // let id = this.props.id,
                //     elem = this.$refs[id],
                //     yh_edit_layer = this.$refs['yh-edit-complicated'].$refs[id+'-yh-edit-layer']
                // if(/(setting)/g.test(elem.className)){
                //     yh_edit_layer.className = yh_edit_layer.className.replace(/( hide)/g,'')
                // }
            },
            hideEditLayer(e){
                // if(!this.changeStatus){
                //     let target = $(e.target).closest('[yh-image]'),
                //         image = target.find('.yh-image'),
                //         page = target.closest('li[page]')

                //     if(page.length > 0){

                //     }else{
                //         target.children('.yh-edit-layer').hide();
                //     }
                // }
            },
            setAll(e){
                let id = this.props.id,
                    top = this.$parent.$refs['yh-custom-select0'],
                    right = this.$parent.$refs['yh-custom-select1'],
                    bottom = this.$parent.$refs['yh-custom-select2'],
                    left = this.$parent.$refs['yh-custom-select3'],
                    borderWidth = this.props.css.border_style.value == 'none' ? 0 : parseInt(this.props.css.border_width.value) * 2,
                    threhold = 2 * 2,
                    style = {
                        left: parseInt(this.props.css.left.value) - threhold,
                        top: parseInt(this.props.css.top.value) - threhold,
                        width: parseInt(this.props.css.width.value) + borderWidth + threhold,
                        height: parseInt(this.props.css.height.value) + borderWidth + threhold
                    },
                    children = null,
                    i = 0
                top.style.cssText = "width:"+style.width+"px; left:"+style.left+"px; top:"+style.top+"px"
                bottom.style.cssText = "width:"+style.width+"px; left:"+style.left+"px; top:"+(style.top+style.height)+"px"
                left.style.cssText = "height:"+style.height+"px; left:"+style.left+"px; top:"+style.top+"px"
                right.style.cssText = "height:"+style.height+"px; left:"+(style.left+style.width)+"px; top:"+style.top+"px"
                if((this.editLayerStatus && this.custom.selectID != id) || !this.editLayerStatus){
                    if(this.custom.selectID){
                        children = this.$parent.$children
                        for(i = 0; i < children.length; i++){
                            if(children[i].props && children[i].props.id == this.custom.selectID){
                                children[i].$data.editLayerStatus = false
                                break
                            }
                        }
                    }
                    this.$store.commit('setCustomSelectedID',id)
                    this.$store.commit('changeCustomSelectStatus',true)
                    this.editLayerStatus = true
                }
            }
        },
        initCtor(options){
            let data = Object.assign(
                {},
                JSON.parse(JSON.stringify({
                    css:baseData.css,
                    h5css:baseData.h5css,
                    data:baseData.data,
                    event:baseData.event
                })),
                options
            )
            return data
        }
    }
</script>
<style>
    [yh-image] .yh-image-content{
        position:relative;
    }
    [yh-image] .yh-image-content .yh-image-href{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
    }
    [yh-image] .yh-image-content a {
        display:none;
    }
    [yh-image] .yh-image-content .yh-image-href {
        display:block;
    }
    [yh-image] .yh-image-content .yh-image {
        -webkit-user-select: none; 
        -moz-user-select: none;    
        -khtml-user-select: none;  
        -ms-user-select: none; 
        -o-user-select: none;
        user-select: none; 
    }
</style>