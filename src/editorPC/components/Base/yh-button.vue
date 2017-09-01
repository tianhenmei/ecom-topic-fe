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
        yh-custom-button="yh-custom-button"
        >
        <div class="yh-custom-button-content">
            <div class="yh-custom-button yh-custom-style yh-custom-button-btn"
                :style="setButtonStyle">
                {{props.data.button_text.value}}
            </div>
            <a class="yh-custom-style yh-custom-button-href yh-custom-href" href="javascript:void(0);" :lagou-href="getButtonHref"
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
                value:200,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            height:{
                cn:'高',
                en:'height',
                value:50,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            line_height:{
                cn:'行高',
                en:'line_height',
                value:50,
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
            background_type:{
                cn:'背景类型',
                en:'background_type',
                value:'background-color',
                cnvalue:'纯背景色',
                type:'options',
                parent:'css',
                edittype:'custom',
                options:[{  // 选项的类容
                    cn:'纯背景色',   // 选项中文
                    value:'background-color' // 选项真正的值
                },{  // 选项的类容
                    cn:'背景图',   // 选项中文
                    value:'background-image' // 选项真正的值
                },{
                    cn:'上下渐变',
                    value:'gradient-top-bottom'
                },{
                    cn:'左右渐变',
                    value:'gradient-left-right'
                }],
                effect:['css.background_color','css.background_image','css.background_repeat',
                    'css.gradient_color_top','css.gradient_color_bottom',
                    'css.gradient_color_left','css.gradient_color_right']
            },
            background_color:{
                cn:'背景颜色',
                en:'background_color',
                value:'#ff0084',
                type:'color',
                parent:'css',
                edittype:'custom',
                condition:['background-color','background-image'],
                status:true
            },
            background_image:{
                cn:'背景图',
                en:'background_image',
                value:'none',
                type:'image',
                mold:'bg',
                edittype:'custom' ,
                parent:'css',
                condition:['background-image'],
                status:false
            },
            background_repeat:{
                cn:'背景重复',
                en:'background_repeat',
                value:'no-repeat',
                cnvalue:'不重复',
                type:'options',
                edittype:'custom',
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
                }],
                parent:'css',
                condition:['background-image'],
                status:false
            },
            gradient_color_top:{
                cn:'背景-上',
                en:'gradient_color_top',
                value:'#ffffff',
                type:'color',
                edittype:'custom',
                parent:'css',
                condition:['gradient-top-bottom'],
                status:false
            },
            gradient_color_bottom:{
                cn:'背景-下',
                en:'gradient_color_bottom',
                value:'#ffffff',
                type:'color',
                edittype:'custom',
                parent:'css',
                condition:['gradient-top-bottom'],
                status:false
            },
            gradient_color_left:{
                cn:'背景-左',
                en:'gradient_color_left',
                value:'#ffffff',
                type:'color',
                edittype:'custom',
                parent:'css',
                condition:['gradient-left-right'],
                status:false
            },
            gradient_color_right:{
                cn:'背景-右',
                en:'gradient_color_right',
                value:'#ffffff',
                type:'color',
                edittype:'custom',
                parent:'css',
                condition:['gradient-left-right'],
                status:false
            },
            // background_color:{
            //     cn:'背景颜色',
            //     en:'background_color',
            //     value:'#ff0084',
            //     type:'color',
            //     edittype:'custom'
            // },
            // background_image:{
            //     cn:'背景图',
            //     en:'background_image',
            //     value:'none',
            //     type:'image',
            //     mold:'bg',
            //     edittype:'custom' 
            // },
            // background_repeat:{
            //     cn:'背景重复',
            //     en:'background_repeat',
            //     value:'no-repeat',
            //     cnvalue:'不重复',
            //     type:'options',
            //     edittype:'custom',
            //     options:[{
            //         cn:'不重复',
            //         value:'no-repeat'
            //     },{
            //         cn:'重复',
            //         value:'repeat'
            //     },{
            //         cn:'横向重复',
            //         value:'repeat-x'
            //     },{
            //         cn:'纵向重复',
            //         value:'repeat-y'
            //     }]
            // },
            border_radius:{
                cn:'圆角',
                en:'border_radius',
                value:8,
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
            font_size:{
                cn:'字体大小',
                en:'font_size',
                value:14,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            font_color:{
                cn:'字体颜色',
                en:'font_color',
                value:'#ffffff',
                type:'color',
                parent:'css',
                edittype:'custom'
            },
        },
        h5css:{
            
        },
        common:{

        },
        attribute:{
            
        },
        data:{  // 卡片数据
            button_text:{
                cn:'按钮文字',
                en:'button_text',
                value:'我是按钮',
                type:'text',
                parent:'data',
                edittype:'custom'
            },
            buttoncn:{
                cn:'设置名称',
                en:'buttoncn',
                value:'按钮',
                type:'text',
                parent:'data',
                edittype:'custom'
            },
            buttonen:{
                cn:'英文名称',
                en:'buttonen',
                value:'button',
                type:'text',
                parent:'data',
                edittype:'custom'
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
                condition:["link"],
                status:true
            }
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
                let src = this.props.css.background_image.value.trim()
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
            setButtonStyle(){
                // 'background-color:'+this.props.css.background_color.value+'; '+
                // 'background-image:'+this.setImage+'; '+
                // 'background-repeat:'+this.props.css.background_repeat.value+'; '+
                let style = ''+
                        'width:'+this.props.css.width.value+'px; '+
                        'height:'+this.props.css.height.value+'px; '+
                        'line-height:'+this.props.css.line_height.value+'px; '+
                        'border-color:'+this.props.css.border_color.value+'; '+
                        'border-width:'+this.props.css.border_width.value+'px; '+
                        'border-style:'+this.props.css.border_style.value+'; '+
                        'border-radius:'+this.props.css.border_radius.value+'px; '+
                        'box-shadow:'+this.setBoxShadow+'; '+
                        'font-size:'+this.props.css.font_size.value+'px; '+
                        'color:'+this.props.css.font_color.value+'; '+
                        'text-align:center; '
                switch(this.props.css.background_type.value){
                    case 'background-color':
                        style += 'background-color:'+this.props.css.background_color.value+'; '
                        break
                    case 'background-image':
                        style += 'background-color:'+this.props.css.background_color.value+'; '+
                               'background-image:'+(this.props.css.background_image.value == 'none' || this.props.css.background_image.value == 'undefined' ? 'none' : 'url('+this.props.css.background_image.value+')')+'; '+
                               'background-repeat:'+this.props.css.background_repeat.value+'; '
                        break
                    case 'gradient-top-bottom':
                        style += ''+
                            'background:'+this.props.css.gradient_color_top.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.gradient_color_top.value+',endcolorstr='+this.props.css.gradient_color_bottom.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.gradient_color_top.value+',endcolorstr='+this.props.css.gradient_color_bottom.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(top, '+this.props.css.gradient_color_top.value+'), '+this.props.css.gradient_color_bottom.value+'); '+
                            'background:-o-linear-gradient(top, '+this.props.css.gradient_color_top.value+'), '+this.props.css.gradient_color_bottom.value+'); '+
                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.props.css.gradient_color_top.value+'),color-stop(100%,'+this.props.css.gradient_color_bottom.value+'));'+       
                        ''
                        break
                    case 'gradient-left-right':
                        style += ''+
                            'background:'+this.props.css.gradient_color_left.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.gradient_color_left.value+',endcolorstr='+this.props.css.gradient_color_right.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.gradient_color_left.value+',endcolorstr='+this.props.css.gradient_color_right.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(left, '+this.props.css.gradient_color_left.value+'), '+this.props.css.gradient_color_right.value+'); '+
                            'background:-o-linear-gradient(left, '+this.props.css.gradient_color_left.value+'), '+this.props.css.gradient_color_right.value+'); '+
                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.props.css.gradient_color_left.value+'),color-stop(100%,'+this.props.css.gradient_color_right.value+'));'+       
                        ''
                        break
                }
                return style
            },
            getButtonHref(){
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
                //     let target = $(e.target).closest('[yh-button]'),
                //         button = target.find('.yh-button'),
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
    [yh-button] .yh-button-content{
        position:relative;
    }
    [yh-button] .yh-button-content .yh-button-href{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
    }
    [yh-button] .yh-button-content a {
        display:none;
    }
    [yh-button] .yh-button-content .yh-button-href {
        display:block;
    }
    [yh-button] .yh-button-content .yh-button {
        -webkit-user-select: none; 
        -moz-user-select: none;    
        -khtml-user-select: none;  
        -ms-user-select: none; 
        -o-user-select: none;
        user-select: none; 
    }
    [yh-custom-button] .yh-base-edit-layer {
        width:620px;
        margin-left:-310px;
    }
</style>