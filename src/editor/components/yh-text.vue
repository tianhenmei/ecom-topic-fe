<template>
    <div :id="props.id" :ref="props.id" kitty-text 
        :yh-path="path"
        :class="props.classname"
        :style="{
            left:props.css.left.value+'rem',
            top:props.css.top.value+'rem',
            position: 'absolute'
        }"
        @mouseenter.stop.prevent="showEditLayer"
        @mouseleave.stop.prevent="hideEditLayer"
        @click.stop.prevent="addSetting">
        <div class="kitty-text-content" rotate contenteditable="true"
            :style="setRotateStyle"
            @input="contentChange">
            <div class="yh-text"
                :style="setTextStyle"
                v-html="props.data.text.value" yh-states>
            </div>
            <a :class="{'yh-text-href':props.href}" 
                href="javascript:void(0);"
                :lagou-href="getHref"
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
    import {
        updateData
    } from '../js/Node.js'

    // edit-components
    import YHEdit from '../edit-components/yh-edit.vue'

    const baseData = {
        id:'',
        ignorestatus:'',  // 是否为类似LIST的子集（如果是则会忽略样式设置） 为'ignorestatus' 时忽略
        ischild:'',
        yh_data_name:'name',  // 当作为子级时放入uplist中的title取值
        path:'',
        parentmodule:'',  // 父级模版
        css:{
            width:{
                cn:'宽',
                en:'width',
                value:200 / (750 / 16),
                type:'number',
                parent:'css',
                unit:'px',
                realunit:'rem'
            },
            height:{
                cn:'高',
                en:'height',
                value:40 / (750 / 16),
                type:'number',
                parent:'css',
                unit:'px',
                realunit:'rem'
            },
            line_height:{
                cn:'行高',
                en:'line_height',
                value:40 / (750 / 16),
                type:'number',
                parent:'css',
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
            font_size:{
                cn:'字体大小',
                en:'font_size',
                value:24 / (750 / 16),
                type:'number',
                parent:'css',
                unit:'px',
                realunit:'rem'
            },
            font_color:{
                cn:'字体颜色',
                en:'font_color',
                value:'#666666',
                type:'color',
                parent:'css'
            },
            text_align:{
                cn:'对齐方式',
                en:'text_align',
                value:'center',
                cnvalue:'居中对齐',
                type:'options',
                parent:'css',
                options:[{  // 选项的类容
                    cn:'居中对齐',   // 选项中文
                    value:'center' // 选项真正的值
                },{  // 选项的类容
                    cn:'居左对齐',   // 选项中文
                    value:'left' // 选项真正的值
                },{
                    cn:'向右对齐',
                    value:'right'
                },{
                    cn:'两端对齐',
                    value:'justify'
                }]
            },
            font_style:{
                cn:'字体样式',
                en:'font_style',
                value:'normal',
                cnvalue:'正常',
                type:'options',
                options:[{
                    cn:'正常',
                    value:'normal'
                },{
                    cn:'斜体',
                    value:'italic'
                },{
                    cn:'倾斜',
                    value:'oblique'
                }]
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
            text:{
                cn:'文字内容',
                en:'text',
                value:'我是文字',
                type:'textarea',
                parent:'data'
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
            setTextStyle(){
                let style = {
                    width:this.props.css.width.value+(this.props.css.width.realunit ? this.props.css.width.realunit : 'rem'),
                    height:this.props.css.height.value+(this.props.css.height.realunit ? this.props.css.height.realunit : 'rem'),
                    lineHeight:this.props.css.line_height.value+(this.props.css.line_height.realunit ? this.props.css.line_height.realunit : 'rem'),
                    fontSize:this.props.css.font_size.value+(this.props.css.font_size.realunit ? this.props.css.font_size.realunit : 'rem'),
                    color:this.props.css.font_color.value,
                    textAlign:this.props.css.text_align.value,
                    fontStyle:this.props.css.font_style.value
                }
                return style
            },
            getHref(){
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
        mounted:function(){
            
        },
        methods:{
            resetData(data){
                return updateData(data,baseData)
            },
            /*text***/
            showEditLayer(e){
                var target = $(e.target)
                if(target.hasClass('setting')){
                    target.children('.yh-edit-layer').show();
                    this.changeStatus = false
                }
            },
            hideEditLayer(e){
                if(!this.changeStatus){
                    let target = $(e.target).closest('[kitty-text]'),
                        text = target.find('.yh-text'),
                        page = target.closest('li[page]')

                    if(page.length > 0){

                    }else{
                        target.children('.yh-edit-layer').hide();
                    }
                }
            },
            contentChange(e){
                let content = $(e.target).children('.yh-text').html()
                this.$store.commit('setValue',{
                    parent:'data',
                    eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    stylename:'text',
                    actualValue:content,
                    designValue:content,
                    path:this.path,
                    store:this.$store
                })
            },
            addSetting(e){
                let target = $(e.target).closest('[kitty-text]')
                
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
    [kitty-text] {
        position:absolute;
        left:0;
        top:0;
    }
    [kitty-text] .kitty-text-content{
        position:relative;
    }
    [kitty-text] .kitty-text-content .yh-text{
        width:200px;
        height:22px;
        line-height:22px;
        color:#666;
        background-size: 100%;
        font-size:12px;
        text-align:center;
    }
    [kitty-text] .kitty-text-content a {
        display:none;
    }
    [kitty-text] .kitty-text-content .kitty-text-href {
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        display:block;
    }
    [kitty-text] .yh-text-content .yh-text {
        -webkit-user-select: none; 
        -moz-user-select: none;    
        -khtml-user-select: none;  
        -ms-user-select: none; 
        -o-user-select: none;
        user-select: none; 
    }
</style>