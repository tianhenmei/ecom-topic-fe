<template>
    <div :id="props.id"  kitty-button 
        :yh-path="path"
        :class="props.classname"
        :style="{
            left:props.css.left.value+'rem',
            top:props.css.top.value+'rem',
            position: 'absolute'
        }"
        @mouseenter.stop.prevent="showEditLayer" 
        @mouseleave.stop.prevent="hideEditLayer"
        @click.stop.prevent="addSetting" >
        <div class="kitty-button-content" rotate contenteditable="true" 
            :style="setRotateStyle"
            @input="contentChange">
            <div class="yh-button"  
                :style="setButtonStyle"
                v-html="props.data.button_text.value" yh-states></div>
            <a :class="{'yh-button-href':props.href}" 
                href="javascript:void(0);" 
                :lagou-href="getButtonHref"
                target="_blank"></a>
        </div>
        <yh-edit 
            v-if="!withoutedit"
            ref="yh-edit-complicated"
            :css="props.css"
            :elem_id="props.id"
            :ignorestatus="props.ignorestatus"
            :ischild="props.ischild"
            :owndata="props.data"
            :path="path"
            :parentmodule="parentmodule"
            :states="props.states"
            :event="props.event"
        ></yh-edit>
    </div>
</template>
<script>
    import Editor from './editor.js'

    // edit-components
    import YHEdit from '../edit-components/yh-edit.vue'
    const baseData = {
        id:'',
        ignorestatus:'',  // 是否为类似LIST的子集（如果是则会忽略样式设置）为'ignorestatus' 时忽略
        ischild:'',
        yh_data_name:'name',  // 当作为子级时放入uplist中的title取值
        path:'',
        parentmodule:'',  // 父级模版
        css:{
            width:{
                cn:'宽度',
                en:'width',
                value:300 / (750 / 16),
                type:'number',
                unit:'px',
                realunit:'rem'
            },
            height:{
                cn:'高度',
                en:'height',
                value:60 / (750 / 16),
                type:'number',
                default:'auto',  // 默认值
                ivalue:60 / (750 / 16),   // 初始值
                unit:'px',
                realunit:'rem'
            },
            line_height:{
                cn:'行高',
                en:'line_height',
                value:60 / (750 / 16),
                type:'number',
                default:'auto',  // 默认值
                ivalue:60 / (750 / 16),   // 初始值,
                unit:'px',
                realunit:'rem'
            },
            left:{
                cn:'定位.左',
                en:'left',
                value:0,
                type:'number',
                parent:'css',
                unit:'px',
                realunit:'rem'
            },
            top:{
                cn:'定位.上',
                en:'top',
                value:0,
                type:'number',
                parent:'css',
                unit:'px',
                realunit:'rem'
            },
            background_type:{
                cn:'背景类型',
                en:'background_type',
                value:'background-color',
                cnvalue:'纯背景色',
                type:'options',
                parent:'css',
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
                condition:['background-color','background-image'],
                status:true
            },
            background_image:{
                cn:'背景图',
                en:'background_image',
                value:'none',
                type:'image',
                mold:'bg',
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
                parent:'css',
                condition:['gradient-top-bottom'],
                status:false
            },
            gradient_color_bottom:{
                cn:'背景-下',
                en:'gradient_color_bottom',
                value:'#ffffff',
                type:'color',
                parent:'css',
                condition:['gradient-top-bottom'],
                status:false
            },
            gradient_color_left:{
                cn:'背景-左',
                en:'gradient_color_left',
                value:'#ffffff',
                type:'color',
                parent:'css',
                condition:['gradient-left-right'],
                status:false
            },
            gradient_color_right:{
                cn:'背景-右',
                en:'gradient_color_right',
                value:'#ffffff',
                type:'color',
                parent:'css',
                condition:['gradient-left-right'],
                status:false
            },
            border_radius:{
                cn:'圆角',
                en:'border_radius',
                value:8,
                type:'number',
                parent:'css',
                unit:'px',
                realunit:'rem'
            },
            box_shadow_x:{
                cn:'阴影',
                en:'box_shadow_x',
                value:0,
                type:'number',
                parent:'css',
                unit:'px',
                realunit:'rem'
            },
            box_shadow_y:{
                cn:'', 
                en:'box_shadow_y',
                value:0,
                type:'number',
                parent:'css',
                unit:'px',
                realunit:'rem'
            },
            box_shadow_blur:{
                cn:'',
                en:'box_shadow_blur',
                value:0,
                type:'number',
                parent:'css',
                unit:'px',
                realunit:'rem'
            },
            box_shadow_color:{
                cn:'',
                en:'box_shadow_color',
                value:'#ffffff',
                type:'color',
                parent:'css'
            },
            border_color:{
                cn:'边框颜色',
                en:'border_color',
                value:'#ffffff',
                type:'color',
                parent:'css'
            },
            border_width:{
                cn:'边框宽度',
                en:'border_width',
                value:0,
                type:'number',
                parent:'css',
                unit:'px',
                realunit:'px'
            },
            border_style:{
                cn:'边框类型',
                en:'border_style',
                value:'none',
                cnvalue:'无',
                type:'options',
                parent:'css',
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
                value:14 / (750 / 16),
                type:'number',
                parent:'css',
                unit:'px',
                realunit:'rem'
            },
            font_color:{
                cn:'字体颜色',
                en:'font_color',
                value:'#ffffff',
                type:'color',
                parent:'css'
            }
        },
        rotate:{
            '-webkit-transform':{
                cn:'旋转',
                en:'-webkit-transform',
                value:'none',
                type:'none',
                parent:'rotate'  
            },
            'transform':{
                cn:'旋转',
                en:'transform',
                value:'none',
                type:'none',
                parent:'rotate'  
            }
        },
        data:{  // 卡片数据
            anchorID:{
                cn:'锚点ID',
                en:'anchorID',
                value:'',
                type:'text',
                parent:'data'
            },
            button_text:{
                cn:'按钮文字',
                en:'button_text',
                value:'我是按钮',
                type:'text',
                parent:'data'
            },
        },
        event:{
            eventtype:{
                cn:'事件类型',
                en:'eventtype',
                value:'click',
                cnvalue:'点击',
                type:'options',
                parent:'event',
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
        },
        states:[]
    }
    // let baseData = {
    //     style:Editor.style,
    //     position:{
    //         left:0,
    //         top:0
    //     },
    //     rotate:{
    //         '-webkit-transform':'none',
    //         transform:'none'
    //     },
    //     content:'我是按钮',
    // }
    export default {
        components:{
            'yh-edit':YHEdit
        },
        props:[
            'props',
            'path',
            'parentmodule',
            'withoutedit',
            'eindex'
        ],
        computed:{
            setRotateStyle(){
                return ''+
                    '-webkit-transform:'+this.props.rotate['-webkit-transform'].value + '; '+ 
                    'transform:'+this.props.rotate['transform'].value + '; '
            },
            setBoxShadow(){
                let str = 
                    this.props.css.box_shadow_x.value+(this.props.css.box_shadow_x.realunit ? this.props.css.box_shadow_x.realunit : 'rem')+' ' + 
                    this.props.css.box_shadow_y.value+(this.props.css.box_shadow_y.realunit ? this.props.css.box_shadow_y.realunit : 'rem')+' ' + 
                    this.props.css.box_shadow_blur.value+(this.props.css.box_shadow_blur.realunit ? this.props.css.box_shadow_blur.realunit : 'rem')+' ' + 
                    this.props.css.box_shadow_color.value
                return str
            },
            setButtonStyle(){
                let style = ''+
                        'width:'+this.props.css.width.value+(this.props.css.width.realunit ? this.props.css.width.realunit : 'rem')+'; '+
                        'height:'+this.props.css.height.value+(this.props.css.height.realunit ? this.props.css.height.realunit : 'rem')+'; '+
                        'line-height:'+this.props.css.line_height.value+(this.props.css.line_height.realunit ? this.props.css.line_height.realunit : 'rem')+'; '+
                        'border-color:'+this.props.css.border_color.value+'; '+
                        'border-width:'+this.props.css.border_width.value+(this.props.css.border_width.realunit ? this.props.css.border_width.realunit : 'rem')+'; '+
                        'border-style:'+this.props.css.border_style.value+'; '+
                        'border-radius:'+this.props.css.border_radius.value+(this.props.css.border_radius.realunit ? this.props.css.border_radius.realunit : 'rem')+'; '+
                        'box-shadow:'+this.setBoxShadow+'; '+
                        'font-size:'+this.props.css.font_size.value+(this.props.css.font_size.realunit ? this.props.css.font_size.realunit : 'rem')+'; '+
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
                changeStatus:false,
            }
        },
        mounted(){

        },
        methods:{
            /*button***/
            showEditLayer(e){
                var target = $(e.target)
                if(target.hasClass('setting')){
                    target.children('.yh-edit-layer').show();
                    this.changeStatus = false
                }
            },
            hideEditLayer(e){
                if(!this.changeStatus){
                    let target = $(e.target).closest('[kitty-button]'),
                        button = target.find('.yh-button'),
                        page = target.closest('li[page]')

                    if(page.length > 0){

                    }else{
                        target.children('.yh-edit-layer').hide();
                    }
                }
            },
            contentChange(e){
                let content = $(e.target).children('.yh-button').html()
                this.$store.commit('setValue',{
                    parent:'data',
                    eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    stylename:'button_text',
                    actualValue:content,
                    designValue:content,
                    path:this.path,
                    store:this.$store
                })
            },
            addSetting(e){
                let target = $(e.target).closest('[kitty-button]')
                
                $('.yh-edit-layer').hide()
                target.children('.yh-edit-layer').show();
                this.changeStatus = false
            }
        },
        initCtor(options,that){
            let data = Object.assign(
                {},
                JSON.parse(JSON.stringify({
                    ignorestatus:baseData.ignorestatus,
                    ischild:baseData.ischild,
                    yh_data_name:baseData.yh_data_name,
                    css:baseData.css,
                    rotate:baseData.rotate,
                    data:baseData.data,
                    event:baseData.event,
                    states:baseData.states
                })),
                options
            )
            data.data.anchorID.value = options.id
            return data
        }
    }
</script>
<style>
    [kitty-button]{
        position:absolute;
        left:0;
        top:0;
    }
    [kitty-button] .kitty-button-content{
        position:relative;
    }
    [kitty-button] .kitty-button-content .yh-button{
        width:300px;
        height:60px;
        line-height:60px;
        color:#fff;
        background: #ff0084 no-repeat 0 0;
        background-size: 100%;
        font-size:0.768rem;
        text-align:center;
    }
    [kitty-button] .kitty-button-content a {
        display:none;
    }
    [kitty-button] .kitty-button-content .yh-button-href{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
    }
    [kitty-button] .kitty-button-content .yh-button-href {
        display:block;
    }
    [kitty-button] .kitty-button-content .yh-button {
        -webkit-user-select: none; 
        -moz-user-select: none;    
        -khtml-user-select: none;  
        -ms-user-select: none; 
        -o-user-select: none;
        user-select: none; 
    }
</style>