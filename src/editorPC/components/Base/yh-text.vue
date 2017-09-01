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
        yh-custom-text="yh-custom-text"
        >
        <div class="yh-custom-text-content">
            <div class="yh-custom-text yh-custom-style yh-custom-text-text"
                :style="getTextStyle"
                v-html="props.data.text.value">
            </div>
            <a v-if="props.data.text_type.value == 'name'" class="yh-custom-style yh-custom-text-href yh-custom-href name-href" href="javascript:void(0);" :lagou-href="getTextHref"
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
                value:22,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            line_height:{
                cn:'行高',
                en:'line_height',
                value:22,
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
                value:'#666666',
                type:'color',
                parent:'css',
                edittype:'custom'
            },
            text_align:{
                cn:'对齐方式',
                en:'text_align',
                value:'center',
                cnvalue:'居中对齐',
                type:'options',
                parent:'css',
                edittype:'custom',
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
                edittype:'custom',
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
        h5css:{
            
        },
        common:{

        },
        attribute:{
            
        },
        data:{  // 卡片数据
            text:{
                cn:'文字内容',
                en:'text',
                value:'我是文字',
                type:'textarea',
                parent:'data',
                edittype:'custom'
            },
            text_lines:{
                cn:'文字行数',
                en:'text_lines',
                value:1,
                type:'number',
                nounit:true,
                parent:'data',
                edittype:'custom',
                effect:['data.text_limit','data.each_line']
            },
            each_line:{
                cn:'每行字数',
                en:'each_line',
                value:30,
                type:'number',
                nounit:true,
                parent:'data',
                edittype:'custom',
                condition:[1],
                limitop:">",
                status:false
            },
            text_limit:{
                cn:'字数限制',
                en:'text_limit',
                value:100,
                type:'number',
                nounit:true,
                parent:'data',
                edittype:'custom',
                condition:[1],
                limitop:">",
                status:false
            },
            text_type:{
                cn:'文字类型',
                en:'text_type',
                value:'other',
                cnvalue:'其他',
                type:'options',
                parent:'data',
                edittype:'custom',
                options:[{  // 选项的类容
                    cn:'其他',   // 选项中文
                    value:'other' // 选项真正的值
                },{  // 选项的类容
                    cn:'公司名称',   // 选项中文
                    value:'name' // 选项真正的值
                },{  // 选项的类容
                    cn:'slogan',   // 选项中文
                    value:'slogan' // 选项真正的值
                },{
                    cn:'公司介绍',
                    value:'description'
                },{
                    cn:'行业类别',
                    value:'industryfield'
                },{
                    cn:'所在城市',
                    value:'city'
                },{
                    cn:'融资阶段',   
                    value:'financestage'
                },{
                    cn:'公司大小',   
                    value:'companySize'
                },{
                    cn:'领导名称',   
                    value:'manager_name'
                },{
                    cn:'领导职称',   
                    value:'manager_position'
                },{
                    cn:'领导简介',   
                    value:'manager_remark'
                }],
                effect:['data.textcn','data.texten','event.linkClassify']
            },
            textcn:{
                cn:'设置名称',
                en:'textcn',
                value:'其他',
                type:'text',
                parent:'data',
                edittype:'custom',
                condition:['other'],
                status:true
            },
            texten:{
                cn:'英文名称',
                en:'texten',
                value:'text',
                type:'text',
                parent:'data',
                edittype:'custom',
                condition:['other'],
                status:true
            }
        },
        event:{
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
                condition:["name"],
                status:false
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
            getTextStyle(){
                let style = {
                    width:this.props.css.width.value+'px',
                    height:this.props.css.height.value+'px',
                    lineHeight:this.props.css.line_height.value+'px',
                    fontSize:this.props.css.font_size.value+'px',
                    color:this.props.css.font_color.value,
                    textAlign:this.props.css.text_align.value,
                    fontStyle:this.props.css.font_style.value,
                    overflow:'hidden'
                }
                if(this.props.data.text_lines.value <= 1){
                    style.whiteSpace = 'nowrap'
                    style.textOverflow = 'ellipsis'
                }
                return style
            },
            getTextHref(){
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
                //     let target = $(e.target).closest('[yh-text]'),
                //         text = target.find('.yh-text'),
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
                    borderWidth = 0,
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
    [yh-text] .yh-text-content{
        position:relative;
    }
    [yh-text] .yh-text-content .yh-text-href{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
    }
    [yh-text] .yh-text-content a {
        display:none;
    }
    [yh-text] .yh-text-content .yh-text-href {
        display:block;
    }
    [yh-text] .yh-text-content .yh-text {
        -webkit-user-select: none; 
        -moz-user-select: none;    
        -khtml-user-select: none;  
        -ms-user-select: none; 
        -o-user-select: none;
        user-select: none; 
    }
</style>