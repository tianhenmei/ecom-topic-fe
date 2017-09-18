<template>
    <div :id="props.id"
        :yh-path="path"
        :class="props.classname" 
        :style="{
            left:props.css.left.value+'rem',
            top:props.css.top.value+'rem',
            position: 'absolute'
        }"
        @mouseenter.stop.prevent="showEditLayer"
        @mouseleave.stop.prevent="hideEditLayer"
        @click.stop.prevent="addSetting"
        draggable="false"
        kitty-image 
        >
        <div class="kitty-image-content" rotate 
            :style="setRotateStyle">
            <img class="yh-image" :class="props.data.imagetype.value"
                :src="props.css.src.value" 
                :style="{
                    width:props.css.width.value+'rem',
                    height:props.css.height.value+'rem',
                    backgroundColor:props.css.background_color.value,
                    borderColor:props.css.border_color.value,
                    borderWidth:props.css.border_width.value+'px',
                    borderStyle:props.css.border_style.value,
                    borderRadius:props.css.border_radius.value+'rem',
                    boxShadow:setBoxShadow
                }" yh-states />
            <a class="yh-button-href" 
                :class="props.data.imagetype.value+'-href'"
                href="javascript:void(0);" 
                :lagou-href="getImageHref"
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
            :event="props.event"></yh-edit>
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
        css:{
            width:{
                cn:'宽',
                en:'width',
                value:200 / (750 / 16),
                type:'number',
                parent:'css'
            },
            height:{
                cn:'高',
                en:'height',
                value:200 / (750 / 16),
                type:'number',
                parent:'css'
            },
            left:{
                cn:'定位.左',
                en:'left',
                value:0,
                type:'number',
                parent:'css'
            },
            top:{
                cn:'定位.上',
                en:'top',
                value:0,
                type:'number',
                parent:'css'
            },
            background_color:{
                cn:'背景颜色',
                en:'background_color',
                value:'#ffffff',
                type:'color'
            },
            src:{
                cn:'图片地址',
                en:'src',
                value:'https://www.lagou.com/topic/static/img/newEdit/topImg.png',
                type:'image',
                mold:'src'
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
                parent:'css'
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
            border_radius:{
                cn:'圆角',
                en:'border_radius',
                value:0,
                type:'number',
                parent:'css'
            },
            box_shadow_x:{
                cn:'阴影',
                en:'box_shadow_x',
                value:0,
                type:'number',
                parent:'css'
            },
            box_shadow_y:{
                cn:'', 
                en:'box_shadow_y',
                value:0,
                type:'number',
                parent:'css'
            },
            box_shadow_blur:{
                cn:'',
                en:'box_shadow_blur',
                value:0,
                type:'number',
                parent:'css'
            },
            box_shadow_color:{
                cn:'',
                en:'box_shadow_color',
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
            imagetype:{
                cn:'图片类型',
                en:'imagetype',
                value:'normal-src',
                cnvalue:'普通图片',
                type:'options',
                parent:'data',
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
                parent:'data'
            },
            imageen:{
                cn:'英文名称',
                en:'imageen',
                value:'image',
                type:'text',
                parent:'data',
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
        data(){
            return {
                changeStatus:false,
            }
        },
        computed:{
            setRotateStyle(){
                return ''+
                    '-webkit-transform:'+this.props.rotate['-webkit-transform'].value + 
                    'transform:'+this.props.rotate['transform'].value
            },
            setBoxShadow(){
                let str = 
                    this.props.css.box_shadow_x.value+'rem ' + 
                    this.props.css.box_shadow_y.value+'rem ' + 
                    this.props.css.box_shadow_blur.value+'rem ' + 
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
        methods:{
            resetData(data){
                return updateData(data,baseData)
            },
            getRem(value){
                return value / (750 / 16) + 'rem';
            },
            showEditLayer(e){
                let elem = $(e.target).closest('[id]')
                if(elem.hasClass('setting')){
                    $(e.target).children('.yh-edit-layer').show();
                }
            },
            hideEditLayer(e){
                if(!this.changeStatus){
                    let target = $(e.target).closest('[kitty-image]'),
                        image = target.find('.yh-image'),
                        page = target.closest('li[page]')

                    if(page.length > 0){

                    }else{
                        target.children('.yh-edit-layer').hide();
                    }
                }
            },
            addSetting(e){
                let target = $(e.target).closest('[kitty-image]')
                
                $('.yh-edit-layer').hide()
                target.children('.yh-edit-layer').show()
                this.changeStatus = false
            },
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
    [kitty-image] .kitty-image-content{
        position:relative;
    }
    [kitty-image] .kitty-image-content .yh-image-href{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
    }
    [kitty-image] .kitty-image-content a {
        display:none;
    }
    [kitty-image] .kitty-image-content .yh-image-href {
        display:block;
    }
    [kitty-image] .kitty-image-content .yh-image {
        -webkit-user-select: none; 
        -moz-user-select: none;    
        -khtml-user-select: none;  
        -ms-user-select: none; 
        -o-user-select: none;
        user-select: none; 
    }
</style>