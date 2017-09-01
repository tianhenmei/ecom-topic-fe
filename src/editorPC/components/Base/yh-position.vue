<template>
    <div :id="props.id" :ref="props.id"
        :path="path"
        :style="{
            left:props.css.left.value+'px',
            top:props.css.top.value+'px',
            position: 'absolute'
        }"
        class="yh-custom-style yh-position"
        @mouseenter.stop.prevent="showEditLayer"
        @mouseleave.stop.prevent="hideEditLayer"
        @click.stop.prevent="setAll"
        draggable="false"
        yh-custom-position="yh-custom-position"
        >
        <div class="yh-custom-position-content"
            :style="{
                width:props.css.width.value+'px',
                height:props.css.height.value+'px',
                overflow:'hidden'
            }">
            <div v-for="index in props.col" class="yh-custom-position-one"
                :style="{
                    paddingRight:props.css.one_left.value+'px',
                    paddingBottom:props.css.one_top.value+'px',
                    float: 'left'
                }">
                <a class="yh-custom-style yh-custom-position-href yh-custom-href position-href" href="javascript:void(0);" 
                    :lagou-href="getPositionHref"
                    target="_blank"
                    :style="{
                        display:'block'
                    }">
                    <div class="yh-custom-position yh-custom-style yh-custom-position-position clearfix"
                        :style="setPositionStyle">
                        <div class="yh-custom-style yh-custom-position-name position"
                            :style="{
                                width:props.css.position_width.value+'px',
                                height:props.css.position_height.value+'px',
                                lineHeight:props.css.position_line_height.value+'px',
                                paddingLeft:props.css.position_padding_left.value+'px',
                                fontSize:props.css.position_font_size.value+'px',
                                color:props.css.position_color.value,
                                textAlign:props.css.position_text_align.value,
                                fontStyle:props.css.position_font_style.value,
                                float:'left',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }">{{props.data.position.value}}</div>
                        <div class="yh-custom-style yh-custom-position-salary salary"
                            :style="{
                                width:props.css.salary_width.value+'px',
                                height:props.css.salary_height.value+'px',
                                lineHeight:props.css.salary_line_height.value+'px',
                                paddingLeft:props.css.salary_padding_left.value+'px',
                                paddingRight:props.css.salary_padding_right.value+'px',
                                fontSize:props.css.salary_font_size.value+'px',
                                color:props.css.salary_color.value,
                                textAlign:props.css.salary_text_align.value,
                                fontStyle:props.css.salary_font_style.value,
                                float:'left',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }">{{props.data.salary.value}}</div>
                    </div>
                </a>
            </div>
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
                value:250,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            height:{
                cn:'高',
                en:'height',
                value:88,
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
            one_left:{
                cn:'左右间距',
                en:'one_left',
                value:0,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            one_top:{
                cn:'上下间距',
                en:'one_top',
                value:0,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            one_width:{
                cn:'one-宽',
                en:'one_width',
                value:250,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            one_height:{
                cn:'one-高',
                en:'one_height',
                value:22,
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
                value:'#ffffff',
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
            border_radius:{
                cn:'圆角',
                en:'border_radius',
                value:0,
                type:'number',
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
            position_width:{
                cn:'职位宽度',
                en:'position_width',
                value:120,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            position_height:{
                cn:'职位高度',
                en:'position_height',
                value:22,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            position_line_height:{
                cn:'职位行高',
                en:'position_line_height',
                value:22,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            position_padding_left:{
                cn:'职位-左',
                en:'position_padding_left',
                value:20,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            position_font_size:{
                cn:'职位大小',
                en:'position_font_size',
                value:14,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            position_color:{
                cn:'职位颜色',
                en:'position_color',
                value:'#666666',
                type:'color',
                parent:'css',
                edittype:'custom'
            },
            position_text_align:{
                cn:'职位对齐',
                en:'position_text_align',
                value:'left',
                cnvalue:'居左对齐',
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
            position_font_style:{
                cn:'职位样式',
                en:'position_font_style',
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
            },
            salary_width:{
                cn:'薪资宽度',
                en:'salary_width',
                value:80,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            salary_height:{
                cn:'薪资高度',
                en:'salary_height',
                value:22,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            salary_line_height:{
                cn:'薪资行高',
                en:'salary_line_height',
                value:22,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            salary_padding_left:{
                cn:'薪资-左',
                en:'salary_padding_left',
                value:10,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            salary_padding_right:{
                cn:'薪资-右',
                en:'salary_padding_right',
                value:20,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            salary_font_size:{
                cn:'薪资大小',
                en:'salary_font_size',
                value:14,
                type:'number',
                edittype:'custom',
                parent:'css'
            },
            salary_color:{
                cn:'薪资颜色',
                en:'salary_color',
                value:'#666666',
                type:'color',
                parent:'css',
                edittype:'custom'
            },
            salary_text_align:{
                cn:'薪资对齐',
                en:'salary_text_align',
                value:'left',
                cnvalue:'居左对齐',
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
            salary_font_style:{
                cn:'薪资样式',
                en:'salary_font_style',
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
            position:{
                cn:'职位名称',
                en:'position',
                value:'web前端开发',
                type:'text',
                parent:'data',
                edittype:'custom'
            },
            salary:{
                cn:'薪资',
                en:'salary',
                value:'10k-20k',
                type:'text',
                parent:'data',
                edittype:'custom'
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
            setPositionStyle(){
                let style = ''+
                    'width:'+this.props.css.one_width.value+'px; ' +
                    'height:'+this.props.css.one_height.value+'px; ' +
                    'border-radius:'+this.props.css.border_radius.value+'px; ' +
                    'border-color:'+this.props.css.border_color.value+'; '+
                    'border-width:'+this.props.css.border_width.value+'px; '+
                    'border-style:'+this.props.css.border_style.value+'; '+
                    'box-shadow:'+this.setBoxShadow+'; '+
                    'overflow:hidden; '
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
            setBoxShadow(){
                let str = 
                    this.props.css.box_shadow_x.value+'px ' + 
                    this.props.css.box_shadow_y.value+'px ' + 
                    this.props.css.box_shadow_blur.value+'px ' + 
                    this.props.css.box_shadow_color.value
                return str
            },
            getPositionHref(){
                return "\'https://www.lagou.com/jobs/\'+one.positionId.value+\'.html?source=pl&i=pl-0\'"
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
    [yh-position] .yh-position-content{
        position:relative;
    }
    [yh-position] .yh-position-content .yh-position-href{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
    }
    [yh-position] .yh-position-content a {
        display:none;
    }
    [yh-position] .yh-position-content .yh-position-href {
        display:block;
    }
    [yh-position] .yh-position-content .yh-position {
        -webkit-user-select: none; 
        -moz-user-select: none;    
        -khtml-user-select: none;  
        -ms-user-select: none; 
        -o-user-select: none;
        user-select: none; 
    }

    [yh-custom-position] .yh-base-edit-layer {
        width:1000px;
        margin-left:-500px;
    }
</style>