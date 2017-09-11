<template>
    <div class="yh-custom" :id="custom.id" yh-module="yh-custom"
        :ref="custom.id"
        v-show="customStatus"
        @click.stop.prevent="undoSelected"
        >
        <div class="yh-custom-layer">
            <div class="yh-custom-top">
                <div class="yh-custom-components clearfix"
                    v-show="custom.activeStatus == 'pc'">
                    <div class="title">基础组件：</div>
                    <div class="yh-custom-image" yh-custom-type="image" @click.stop.prevent="addCustomComponent">图片</div>
                    <div class="yh-custom-button" yh-custom-type="button" @click.stop.prevent="addCustomComponent">按钮</div>
                    <div class="yh-custom-text" yh-custom-type="text" @click.stop.prevent="addCustomComponent">文字</div>
                    <div class="yh-custom-position" v-if="!positionStatus" yh-custom-type="position" @click.stop.prevent="addCustomComponent">职位</div>
                    <div class="yh-custom-clear" @click.stop.prevent="clearAddCustom">清空</div>
                    <div class="yh-custom-undo" @click.stop.prevent="undoAddCustom">取消</div>
                    <div class="yh-custom-close" @click.stop.prevent="closeCustomSet">关闭</div>
                    <div class="yh-custom-save" @click.stop.prevent="saveComponent">保存</div>
                </div>
                <div class="yh-custom-components-h5 clearfix"
                    v-show="custom.activeStatus == 'h5'">
                    <div class="title">基础组件：</div>
                    <div class="yh-custom-image" yh-custom-type="image-h5" @click.stop.prevent="addCustomComponent">图片</div>
                    <div class="yh-custom-button" yh-custom-type="button-h5" @click.stop.prevent="addCustomComponent">按钮</div>
                    <div class="yh-custom-text" yh-custom-type="text-h5" @click.stop.prevent="addCustomComponent">文字</div>
                    <div class="yh-custom-position" v-if="!positionStatusH5" yh-custom-type="position-h5" @click.stop.prevent="addCustomComponent">职位</div>
                    <div class="yh-custom-undo" @click.stop.prevent="clearAddCustom">清空</div>
                    <div class="yh-custom-undo" @click.stop.prevent="undoAddCustom">取消</div>
                    <div class="yh-custom-close" @click.stop.prevent="closeCustomSet">关闭</div>
                    <div class="yh-custom-save" @click.stop.prevent="saveComponent">保存</div>
                </div>
                <!-- yh-edit 组件设置 -->
                <yh-edit-custom
                    ref="yh-edit-custom"
                    :css="custom.css"
                    :h5css="custom.h5css"
                    :elem_id="custom.id"
                    :owndata="custom.data"
                    custom="custom">
                </yh-edit-custom>
            </div>
            <div class="yh-custom-content"
                :class="{'yh-custom-hide': custom.activeStatus != 'pc'}"
                ref="yh-custom-content"
                :style="setCustomStyle">
                <div v-for="(element,index) in custom.elements" :is="element.module"
                    :props="element.props"
                    :path="element.path"
                    :eindex="index"></div>
                <!-- 选中框 -->
                <div class="yh-custom-selectTop yh-custom-selection" :class="{'hide':!custom.selectStatus}" ref="yh-custom-select0">
                    <p class="center"></p>
                    <p class="rotate"></p>
                    <p></p>
                </div>
                <div class="yh-custom-selectRight yh-custom-selection" :class="{'hide':!custom.selectStatus}" ref="yh-custom-select1">
                    <p class="center"></p>
                    <p></p>
                </div>
                <div class="yh-custom-selectBottom yh-custom-selection" :class="{'hide':!custom.selectStatus}" ref="yh-custom-select2">
                    <p class="center"></p>
                    <p></p>
                </div>
                <div class="yh-custom-selectLeft yh-custom-selection" :class="{'hide':!custom.selectStatus}" ref="yh-custom-select3">
                    <p class="center"></p>
                    <p></p>
                </div>
            </div>
            <yh-custom-h5 ref="yh-custom-content-h5"></yh-custom-h5>
            <!-- <div class="yh-custom-content-h5"
                :class="{'yh-custom-hide': custom.activeStatus != 'h5'}"
                ref="yh-custom-content-h5"
                :style="setCustomStyleH5">
                <div v-for="(element,index) in custom.elements_h" :is="element.module"
                    :props="element.props"
                    :path="element.path"
                    :eindex="index"></div>
                <div class="yh-custom-selectTop yh-custom-selection" :class="{'hide':!custom.selectStatusH5}" ref="yh-custom-select0-h5">
                    <p class="center"></p>
                    <p class="rotate"></p>
                    <p></p>
                </div>
                <div class="yh-custom-selectRight yh-custom-selection" :class="{'hide':!custom.selectStatusH5}" ref="yh-custom-select1-h5">
                    <p class="center"></p>
                    <p></p>
                </div>
                <div class="yh-custom-selectBottom yh-custom-selection" :class="{'hide':!custom.selectStatusH5}" ref="yh-custom-select2-h5">
                    <p class="center"></p>
                    <p></p>
                </div>
                <div class="yh-custom-selectLeft yh-custom-selection" :class="{'hide':!custom.selectStatusH5}" ref="yh-custom-select3-h5">
                    <p class="center"></p>
                    <p></p>
                </div>
            </div>-->
        </div>
        <yh-edit-prompt
            id="yh-custom-edit-prompt"
            title="请输入自定义组件的职位个数"
            text=""
            @setListCol="setListCol"></yh-edit-prompt>
    </div>
</template>
<script>
    import axios from 'axios'
    import {mapState} from 'vuex'
    import {
        getParentByAttr,
        getChildrenByClassName
    } from '../components/Base/Node.js'
    import YHEditPrompt from '../components-edit/yh-edit-prompt.vue'
    import YHEditCustom from '../components-edit/yh-edit-custom.vue'
    import YHImage from '../components/Base/yh-image.vue'
    import YHButton from '../components/Base/yh-button.vue'
    import YHText from '../components/Base/yh-text.vue'
    import YHPosition from '../components/Base/yh-position.vue'
    import YHCustomH5 from './yh-custom-h5.vue'
    import YHImageH5 from '../components/Base/yh-image-h5.vue'
    import YHButtonH5 from '../components/Base/yh-button-h5.vue'
    import YHTextH5 from '../components/Base/yh-text-h5.vue'
    import YHPositionH5 from '../components/Base/yh-position-h5.vue'

    export default {
        components:{
            'yh-edit-prompt':YHEditPrompt,
            'yh-edit-custom':YHEditCustom,
            'yh-image':YHImage,
            'yh-button':YHButton,
            'yh-text':YHText,
            'yh-position':YHPosition,
            'yh-custom-h5':YHCustomH5,
            'yh-image-h5':YHImageH5,
            'yh-button-h5':YHButtonH5,
            'yh-text-h5':YHTextH5,
            'yh-position-h5':YHPositionH5
        },
        computed:{
            ...mapState([
                'custom',
                'customStatus',
                'connhost',
                'yh_custom_status'
            ]),
            setBoxShadow(){
                let str = 
                    this.custom.css.box_shadow_x.value+'px ' + 
                    this.custom.css.box_shadow_y.value+'px ' + 
                    this.custom.css.box_shadow_blur.value+'px ' + 
                    this.custom.css.box_shadow_color.value
                return str
            },
            setCustomStyle(){
                let style = 'width:'+this.custom.css.width.value+'px; '+
                    'height:'+this.custom.css.height.value+'px; '+
                    // 'backgroundColor:'+this.custom.css.background_color.value+'; '+
                    // 'backgroundImage:'+this.custom.css.background_image.value+'; '+
                    // 'backgroundRepeat:'+this.custom.css.background_repeat.value+'; '+
                    'borderColor:'+this.custom.css.border_color.value+'; '+
                    'borderWidth:'+this.custom.css.border_width.value+'px; '+
                    'borderStyle:'+this.custom.css.border_style.value+'; '+
                    'borderRadius:'+this.custom.css.border_radius.value+'px; '+
                    'boxShadow:'+this.setBoxShadow+'; '+
                    'position:relative; '
                switch(this.custom.css.background_type.value){
                    case 'background-color':
                        style += 'background-color:'+this.custom.css.background_color.value+'; '
                        break
                    case 'background-image':
                        style += 'background-color:'+this.custom.css.background_color.value+'; '+
                               'background-image:'+(this.custom.css.background_image.value == 'none' || this.custom.css.background_image.value == 'undefined' ? 'none' : 'url('+this.custom.css.background_image.value+')')+'; '+
                               'background-repeat:'+this.custom.css.background_repeat.value+'; '
                        break
                    case 'gradient-top-bottom':
                        style += ''+
                            'background:'+this.custom.css.gradient_color_top.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.custom.css.gradient_color_top.value+',endcolorstr='+this.custom.css.gradient_color_bottom.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.custom.css.gradient_color_top.value+',endcolorstr='+this.custom.css.gradient_color_bottom.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(top, '+this.custom.css.gradient_color_top.value+'), '+this.custom.css.gradient_color_bottom.value+'); '+
                            'background:-o-linear-gradient(top, '+this.custom.css.gradient_color_top.value+'), '+this.custom.css.gradient_color_bottom.value+'); '+
                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.custom.css.gradient_color_top.value+'),color-stop(100%,'+this.custom.css.gradient_color_bottom.value+'));'+       
                        ''
                        break
                    case 'gradient-left-right':
                        style += ''+
                            'background:'+this.custom.css.gradient_color_left.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.custom.css.gradient_color_left.value+',endcolorstr='+this.custom.css.gradient_color_right.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.custom.css.gradient_color_left.value+',endcolorstr='+this.custom.css.gradient_color_right.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(left, '+this.custom.css.gradient_color_left.value+'), '+this.custom.css.gradient_color_right.value+'); '+
                            'background:-o-linear-gradient(left, '+this.custom.css.gradient_color_left.value+'), '+this.custom.css.gradient_color_right.value+'); '+
                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.custom.css.gradient_color_left.value+'),color-stop(100%,'+this.custom.css.gradient_color_right.value+'));'+       
                        ''
                        break
                }
                return style
            },
            // setCustomStyleH5(){
            //     let style = 'width:'+this.custom.h5css.width.value+'px; '+
            //         'height:'+this.custom.h5css.height.value+'px; '+
            //         // 'backgroundColor:'+this.custom.h5css.background_color.value+'; '+
            //         // 'backgroundImage:'+this.custom.h5css.background_image.value+'; '+
            //         // 'backgroundRepeat:'+this.custom.h5css.background_repeat.value+'; '+
            //         'borderColor:'+this.custom.h5css.border_color.value+'; '+
            //         'borderWidth:'+this.custom.h5css.border_width.value+'px; '+
            //         'borderStyle:'+this.custom.h5css.border_style.value+'; '+
            //         'borderRadius:'+this.custom.h5css.border_radius.value+'px; '+
            //         'boxShadow:'+this.setBoxShadow+'; '+
            //         'position:relative; '
            //     switch(this.custom.h5css.background_type.value){
            //         case 'background-color':
            //             style += 'background-color:'+this.custom.h5css.background_color.value+'; '
            //             break
            //         case 'background-image':
            //             style += 'background-color:'+this.custom.h5css.background_color.value+'; '+
            //                    'background-image:'+(this.custom.h5css.background_image.value == 'none' || this.custom.h5css.background_image.value == 'undefined' ? 'none' : 'url('+this.custom.h5css.background_image.value+')')+'; '+
            //                    'background-repeat:'+this.custom.h5css.background_repeat.value+'; '
            //             break
            //         case 'gradient-top-bottom':
            //             style += ''+
            //                 'background:'+this.custom.h5css.gradient_color_top.value+';'+
            //                 'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.custom.h5css.gradient_color_top.value+',endcolorstr='+this.custom.h5css.gradient_color_bottom.value+',gradientType=0);'+
            //                 '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.custom.h5css.gradient_color_top.value+',endcolorstr='+this.custom.h5css.gradient_color_bottom.value+',gradientType=0);'+
            //                 'background:-moz-linear-gradient(top, '+this.custom.h5css.gradient_color_top.value+'), '+this.custom.h5css.gradient_color_bottom.value+'); '+
            //                 'background:-o-linear-gradient(top, '+this.custom.h5css.gradient_color_top.value+'), '+this.custom.h5css.gradient_color_bottom.value+'); '+
            //                 'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.custom.h5css.gradient_color_top.value+'),color-stop(100%,'+this.custom.h5css.gradient_color_bottom.value+'));'+       
            //             ''
            //             break
            //         case 'gradient-left-right':
            //             style += ''+
            //                 'background:'+this.custom.h5css.gradient_color_left.value+';'+
            //                 'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.custom.h5css.gradient_color_left.value+',endcolorstr='+this.custom.h5css.gradient_color_right.value+',gradientType=0);'+
            //                 '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.custom.h5css.gradient_color_left.value+',endcolorstr='+this.custom.h5css.gradient_color_right.value+',gradientType=0);'+
            //                 'background:-moz-linear-gradient(left, '+this.custom.h5css.gradient_color_left.value+'), '+this.custom.h5css.gradient_color_right.value+'); '+
            //                 'background:-o-linear-gradient(left, '+this.custom.h5css.gradient_color_left.value+'), '+this.custom.h5css.gradient_color_right.value+'); '+
            //                 'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.custom.h5css.gradient_color_left.value+'),color-stop(100%,'+this.custom.h5css.gradient_color_right.value+'));'+       
            //             ''
            //             break
            //     }
            //     return style
            // }
        },
        data(){
            return {
                yhmodule:{
                    'yh-image':YHImage,
                    'yh-button':YHButton,
                    'yh-text':YHText,
                    'yh-position':YHPosition,
                    'yh-image-h5':YHImageH5,
                    'yh-button-h5':YHButtonH5,
                    'yh-text-h5':YHTextH5,
                    'yh-position-h5':YHPositionH5
                },
                positionStatus:false,
                positionStatusH5:false,
                yh:{
                    name:''
                }
            }
        },
        mounted(){
            
        },
        methods:{
            undoSelected(e){
                let current = null,
                    i = 0,j = 0,t = 0,
                    status = false
                if(this.custom.selectID){
                    for(i = 0; i < this.$children.length; i++){
                        current = this.$children[i]
                        if(/(yh-custom-content-h5)/g.test(current.$el.className)){
                            current = current.$children
                            for(t = 0; t < current.length; t++){
                                for(j in current[t].$refs){
                                    if(j == this.custom.selectID){
                                        current[t].$data.editLayerStatus = false
                                        status = true
                                        break
                                    }
                                }
                                if(status){
                                    break
                                }
                            }
                        }else{
                            for(j in current.$refs){
                                if(j == this.custom.selectID){
                                    current.$data.editLayerStatus = false
                                    status = true
                                    break
                                }
                            }
                        }
                        if(status){
                            break
                        }
                    }
                }
                this.$store.commit('setCustomSelectedID','')
                this.$store.commit('changeCustomSelectStatus',false)
            },
            addCustomComponent(e){
                let type = e.target.getAttribute('yh-custom-type'),
                    name = 'yh-'+type,
                    newID = '',
                    isH5 = /(-h5)/g.test(type),
                    suffix = isH5 ? '_h' : '',
                    countname = 'count'+suffix

                switch(type){
                    case 'position-h5':
                    case 'position':
                        let prompt = document.getElementById('yh-custom-edit-prompt')
                        this.yh.name = name
                        prompt.className = prompt.className.replace(/(hide)/g,'').replace(/(  )/g,' ')
                        break
                    default:
                        newID = 'custom'+suffix+this.custom[countname]
                        this.$store.commit('changeCustomCount')
                        this.$store.commit('addCustomElement',{
                            id:newID,
                            'yh-module':name,
                            module:this.yhmodule[name],
                            path:'elements'+suffix+'.index',
                            props:this.yhmodule[name].initCtor({
                                id:newID
                            })
                        })
                        break
                }
            },
            saveComponentH5(pcdata){
                let start = '<style>\n'+
                            '    @import "./index.css";\n'+
                            '</style>\n'+
                            '<template>\n',
                    customElemStart = '    <div class="custom-'+this.yh_custom_status+' yh-custom-'+this.yh_custom_status+'-base-element00" :id="props.id" yh-module="Custom_'+this.yh_custom_status+'" \n'+
                                    '        :ref="props.id" \n'+
                                    '        :style="setCustomBackgroundStyle"\n'+
                                    '        >\n',
                    customElemEnd = '    </div>\n'+
                            '</template>\n'+
                            '<script>\n'+
                            '    import {\n'+
                            '        dealStringLine\n'+
                            '    } from "../../../components/Base/Node.js"\n',
                    jsstart_h5 = 
                            '    export default {\n'+
                            '        props:["props","path","parentmodule"],\n'+
                            '        data(){\n'+
                            '            return {\n'+
                            '            }\n'+
                            '        },\n'+
                            '        mounted(){\n'+
                            '        },\n'+
                            '        computed:{\n',
                    jscontent =     '',
                    jsend = '        },\n'+
                            '        methods:{\n'+
                            '            dealStringLine\n'+
                            '        },\n'+
                            '    }\n'+
                        '<\/script>',
                    elem = this.$refs['yh-custom-content-h5'].$refs['yh-custom-content-h5'].cloneNode(true),
                    selection = getChildrenByClassName(elem,'yh-custom-selection'),
                    editLayer = elem.getElementsByClassName('yh-base-edit-layer'),
                    styleElem = elem.getElementsByClassName('yh-custom-style'),
                    yhPosition = elem.getElementsByClassName('yh-custom-position-one'),
                    yhPositionContent = elem.getElementsByClassName('yh-custom-position-content'),
                    hasSetPositionStyleStatus = false,
                    addPositionSetStatus = false,
                    setPositionListStatus = false,
                    baseData = {
                        h5css:{
                            yhcustom_background:{
                                en:'background',
                                cn:'背景设置',
                                parent:'h5css',
                                type:'uplist',
                                value:{
                                    background_type:{
                                        cn:'背景类型',
                                        en:'background_type',
                                        value:this.custom.css.background_type.value,
                                        cnvalue:this.custom.css.background_type.cnvalue,
                                        type:'options',
                                        parent:'h5css.yhcustom_background.value',
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
                                        effect:[
                                            'h5css.yhcustom_background.value.background_color',
                                            'h5css.yhcustom_background.value.background_image',
                                            'h5css.yhcustom_background.value.background_repeat',
                                            'h5css.yhcustom_background.value.gradient_color_top',
                                            'h5css.yhcustom_background.value.gradient_color_bottom',
                                            'h5css.yhcustom_background.value.gradient_color_left',
                                            'h5css.yhcustom_background.value.gradient_color_right'
                                        ]
                                    },
                                    background_color:{
                                        cn:'背景颜色',
                                        en:'background_color',
                                        value:this.custom.css.background_color.value,
                                        type:'color',
                                        parent:'h5css.yhcustom_background.value',
                                        condition:['background-color','background-image'],
                                        status:this.custom.css.background_type.value == 'background-color' || this.custom.css.background_type.value == 'background-image'
                                    },
                                    background_image:{
                                        cn:'背景图',
                                        en:'background_image',
                                        value:this.custom.css.background_image.value,
                                        type:'image',
                                        mold:'bg',
                                        parent:'h5css.yhcustom_background.value',
                                        condition:['background-image'],
                                        status:this.custom.css.background_type.value == 'background-image'
                                    },
                                    background_repeat:{
                                        cn:'背景重复',
                                        en:'background_repeat',
                                        value:this.custom.css.background_repeat.value,
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
                                        parent:'h5css.yhcustom_background.value',
                                        condition:['background-image'],
                                        status:this.custom.css.background_type.value == 'background-image'
                                    },
                                    gradient_color_top:{
                                        cn:'背景-上',
                                        en:'gradient_color_top',
                                        value:this.custom.css.gradient_color_top.value,
                                        type:'color',
                                        parent:'h5css.yhcustom_background.value',
                                        condition:['gradient-top-bottom'],
                                        status:this.custom.css.background_type.value == 'gradient-top-bottom'
                                    },
                                    gradient_color_bottom:{
                                        cn:'背景-下',
                                        en:'gradient_color_bottom',
                                        value:this.custom.css.gradient_color_bottom.value,
                                        type:'color',
                                        parent:'h5css.yhcustom_background.value',
                                        condition:['gradient-top-bottom'],
                                        status:this.custom.css.background_type.value == 'gradient-top-bottom'
                                    },
                                    gradient_color_left:{
                                        cn:'背景-左',
                                        en:'gradient_color_left',
                                        value:this.custom.css.gradient_color_left.value,
                                        type:'color',
                                        parent:'h5css.yhcustom_background.value',
                                        condition:['gradient-left-right'],
                                        status:this.custom.css.background_type.value == 'gradient-left-right'
                                    },
                                    gradient_color_right:{
                                        cn:'背景-右',
                                        en:'gradient_color_right',
                                        value:this.custom.css.gradient_color_right.value,
                                        type:'color',
                                        parent:'h5css.yhcustom_background.value',
                                        condition:['gradient-left-right'],
                                        status:this.custom.css.background_type.value == 'gradient-left-right'
                                    }
                                }
                            }
                        },
                        data:{}
                    },
                    length = 0,
                    i = 0,ii = 0, j = 0,
                    parent = null,
                    pcHasCompanyId = pcdata.data.hasOwnProperty('companyId'),
                    hasCompanyId = false,
                    customStyle = '',
                    cssText = '',
                    style = '',
                    name = '',
                    enname = '',
                    tempstr = '',
                    elemData = {},
                    imageIndex = 0,
                    status = true,
                    path = '',
                    text_start = 0,
                    image_start = 0,
                    button_start = 0
                // 删除没必要的HTML
                length = selection.length
                for(i = 0,ii = 0; ii < length; ii++,i++){
                    elem.removeChild(selection[i])
                }
                length = editLayer.length
                for(i = 0,ii = 0; ii < length; ii++){
                    editLayer[0].parentNode.removeChild(editLayer[0])
                }
                // 获取自定义组件的所有样式
                cssText = elem.style.cssText
                style += '.yh-custom-'+this.yh_custom_status+'-base-element00 { margin:0 auto; '+cssText+'}'
                length = styleElem.length
                for(i = 0,ii = 0; ii < length; ii++ ){
                    cssText = styleElem[i].style.cssText
                    if(/(yh-custom-image-img)/g.test(styleElem[i].className)){
                        parent = getParentByAttr(styleElem[i],'path')
                        path = parent.getAttribute('path').split('.')
                        elemData = this.custom
                        for(j = 0; j < path.length; j++){
                            if(path[j].trim()){
                                if(/[0-9]/g.test(path[j])){
                                    elemData = elemData[parseInt(path[j])]
                                }else{
                                    elemData = elemData[path[j]]
                                }
                            }
                        }
                        switch(elemData.props.data.imagetype.value){
                            case 'logo':
                                enname = 'data.logo'
                                break
                            case 'manager_logo':
                                enname = 'data.manager_logo'
                                break
                            default:
                                enname = 'h5css.'+elemData.props.data.imageen.value+'_src'
                                break
                        }
                        if(!pcHasCompanyId){
                            if(!hasCompanyId && (elemData.props.data.imagetype.value == 'logo' || elemData.props.data.imagetype.value == 'manager_logo')){
                                hasCompanyId = true
                                baseData.data.companyId = {
                                    cn:'公司ID',
                                    en:'companyId',
                                    value:147,
                                    type:'request',
                                    parent:'data'
                                }
                            }
                        }
                        styleElem[i].outerHTML = styleElem[i].outerHTML.replace(/src=\"([^\"]*)\"/g,':src="props.'+enname+'.value"')
                    }else if(/(yh-custom-href)/g.test(styleElem[i].className)){
                        styleElem[i].removeAttribute('href')
                        if(/(yh-custom-position-href)/g.test(styleElem[i].className)){
                            styleElem[i].setAttribute(':href',"\'https:\/\/www.lagou.com\/center\/job_\'+one.positionId.value+\'.html\'")
                        }else{
                            if(!pcHasCompanyId){
                                if(!hasCompanyId && /(props.data.companyId)/g.test(styleElem[i].getAttribute('lagou-href'))){
                                    hasCompanyId = true
                                    baseData.data.companyId = {
                                        cn:'公司ID',
                                        en:'companyId',
                                        value:147,
                                        type:'request',
                                        parent:'data'
                                    }
                                }
                            }
                            styleElem[i].setAttribute(':href',styleElem[i].getAttribute('lagou-href'))
                        }
                        styleElem[i].outerHTML = styleElem[i].outerHTML.replace(/lagou-href=\"([^\"]*)\"/g,':lagou-href="'+styleElem[i].getAttribute('lagou-href')+'"')
                    }else if(/(yh-custom-button-btn)/g.test(styleElem[i].className)){
                        parent = getParentByAttr(styleElem[i],'path')
                        path = parent.getAttribute('path').split('.')
                        elemData = this.custom
                        for(j = 0; j < path.length; j++){
                            if(path[j].trim()){
                                if(/[0-9]/g.test(path[j])){
                                    elemData = elemData[parseInt(path[j])]
                                }else{
                                    elemData = elemData[path[j]]
                                }
                            }
                        }
                        enname = elemData.props.data.buttonen.value
                        if(!pcdata.data.hasOwnProperty(enname+'_button_text')){
                            styleElem[i].innerHTML = "{{props.data.yh_h5data.value."+enname+"_button_text.value}}\n"
                        }else{
                            styleElem[i].innerHTML = "{{props.data."+enname+"_button_text.value}}\n"
                        }
                        // tempstr = "{"+
                                // "color:props.css."+enname+"_color.value,"
                                // "backgroundColor:props.css."+enname+"_background_color.value,"+
                                // "backgroundImage:(props.css."+enname+"_background_image.value == 'none' || props.css."+enname+"_background_image.value == 'undefined') ? 'none' : url(props.css."+enname+"_background_image.value),"+
                                // "backgroundRepeat:props.css."+enname+"_background_repeat.value,"
                        jscontent += this.getButtonStyleFunc(elemData,enname,'h5')
                        styleElem[i].setAttribute(':style',"set"+enname+"ButtonStyle")
                    }else if(/(yh-custom-text-text)/g.test(styleElem[i].className)){
                        parent = getParentByAttr(styleElem[i],'path')
                        path = parent.getAttribute('path').split('.')
                        elemData = this.custom
                        for(j = 0; j < path.length; j++){
                            if(path[j].trim()){
                                if(/[0-9]/g.test(path[j])){
                                    elemData = elemData[parseInt(path[j])]
                                }else{
                                    elemData = elemData[path[j]]
                                }
                            }
                        }
                        enname = elemData.props.data.text_type.value == 'other' ? elemData.props.data.texten.value+'_text' : elemData.props.data.text_type.value
                        if(!pcHasCompanyId){
                            if(!hasCompanyId && elemData.props.data.text_type.value == 'name'){
                                hasCompanyId = true
                                baseData.data.companyId = {
                                    cn:'公司ID',
                                    en:'companyId',
                                    value:147,
                                    type:'request',
                                    parent:'data'
                                }
                            }
                        }
                        if(!pcdata.data.hasOwnProperty(enname)){
                            styleElem[i].setAttribute('v-html',elemData.props.data.text_lines.value > 1 ? ("dealStringLine("+elemData.props.data.text_limit.value+","+elemData.props.data.each_line.value+","+elemData.props.data.text_lines.value+",props.data."+enname+".value,false)") : ("props.data.yh_h5data.value."+enname+".value"))
                        }else{
                            styleElem[i].setAttribute('v-html',elemData.props.data.text_lines.value > 1 ? ("dealStringLine("+elemData.props.data.text_limit.value+","+elemData.props.data.each_line.value+","+elemData.props.data.text_lines.value+",props.data."+enname+".value,false)") : ("props.data."+enname+".value"))
                        }
                        styleElem[i].innerHTML = ''
                        enname = elemData.props.data.text_type.value == 'other' ? elemData.props.data.texten.value : elemData.props.data.text_type.value
                        tempstr = "{\n"+
                                        "color:props.h5css."+enname+"_color.value,\n"+
                                   "}"
                        styleElem[i].setAttribute(':style',tempstr)
                    }else if(/(yh-custom-position-position)/g.test(styleElem[i].className)){
                        parent = getParentByAttr(styleElem[i],'path')
                        path = parent.getAttribute('path').split('.')
                        elemData = this.custom
                        for(j = 0; j < path.length; j++){
                            if(path[j].trim()){
                                if(/[0-9]/g.test(path[j])){
                                    elemData = elemData[parseInt(path[j])]
                                }else{
                                    elemData = elemData[path[j]]
                                }
                            }
                        }
                        if(!hasSetPositionStyleStatus){
                            hasSetPositionStyleStatus = true
                            jscontent += this.getPositionStyleFunc(elemData,'h5')
                        }
                        styleElem[i].setAttribute(':style',"setPositionStyle")
                    }else if(/(yh-custom-position-name)/g.test(styleElem[i].className)){
                        parent = getParentByAttr(styleElem[i],'path')
                        path = parent.getAttribute('path').split('.')
                        elemData = this.custom
                        for(j = 0; j < path.length; j++){
                            if(path[j].trim()){
                                if(/[0-9]/g.test(path[j])){
                                    elemData = elemData[parseInt(path[j])]
                                }else{
                                    elemData = elemData[path[j]]
                                }
                            }
                        }
                        styleElem[i].innerHTML = "\n{{one.positionName.value}}\n"
                        tempstr = "{\n"+
                                        "color:props.h5css.position.value.positionName_color.value,\n"+
                                   "}"
                        styleElem[i].setAttribute(':style',tempstr)
                    }else if(/(yh-custom-position-salary)/g.test(styleElem[i].className)){
                        parent = getParentByAttr(styleElem[i],'path')
                        path = parent.getAttribute('path').split('.')
                        elemData = this.custom
                        for(j = 0; j < path.length; j++){
                            if(path[j].trim()){
                                if(/[0-9]/g.test(path[j])){
                                    elemData = elemData[parseInt(path[j])]
                                }else{
                                    elemData = elemData[path[j]]
                                }
                            }
                        }
                        styleElem[i].innerHTML = "\n{{one.salary.value}}\n"
                        tempstr = "{\n"+
                                        "color:props.h5css.position.value.salary_color.value,\n"+
                                   "}"
                        styleElem[i].setAttribute(':style',tempstr) 
                    }
                    name = 'yh-custom-'+this.yh_custom_status+'-base-element'+ii
                    style += '.'+name+'{'+cssText+'}'
                    styleElem[i].removeAttribute('style')
                    if(styleElem[i].attributes['id']){
                        styleElem[i].removeAttribute('id')
                        styleElem[i].removeAttribute('path')
                    }
                    styleElem[i].className = styleElem[i].className.replace('yh-custom-style',name)
                }
                length = yhPosition.length
                for(i = 0, ii = 0; ii < length;ii++ ){
                    if(i == 0){
                        yhPosition[i].setAttribute('v-for','one in props.data.position.value')
                        yhPosition[i].setAttribute(':dynamic_type','one.dynamic_type.value')
                        i++
                    }else{
                        yhPosition[i].parentNode.removeChild(yhPosition[i])
                    }
                }
                length = yhPositionContent.length
                for(i = 0; i < length; i++){
                    yhPositionContent[i].className += ' position positionList clearfix'
                    break
                }
                customStyle = this.getCustomStyleFunc('h5')
                // 设置数据
                // baseData.h5css baseData.data
                for(i = 0; i < this.custom.elements_h.length; i++){
                    elemData = this.custom.elements_h[i]
                    switch(elemData['yh-module']){
                        case 'yh-image-h5':
                            switch(elemData.props.data.imagetype.value){
                                case 'logo':  // 公司logo
                                    break
                                case 'manager_logo':  // 公司领导logo
                                    break
                                case 'normal-src':  // 普通图片
                                default:
                                    baseData.h5css[elemData.props.data.imageen.value+'_src'] = {
                                        cn:elemData.props.data.imagecn.value,
                                        en:elemData.props.data.imageen.value+'_src',
                                        value:elemData.props.css.src.value,
                                        type:'image',
                                        mold:'src',
                                        parent:'h5css'
                                    }
                                    break
                            }
                            break
                        case 'yh-button-h5':
                            name = elemData.props.data.buttoncn.value
                            enname = elemData.props.data.buttonen.value
                            baseData.h5css[enname+'_button'] = {
                                cn:name+'按钮设置',
                                en:enname+'_button',
                                type:'uplist',
                                name:'cn',
                                parent:'h5css',
                                value:{

                                }
                            }
                            baseData.h5css[enname+'_button'].value[enname+'_background_type'] = {
                                cn:'背景类型',
                                en:enname+'_background_type',
                                value:elemData.props.css.background_type.value,
                                cnvalue:elemData.props.css.background_type.cnvalue,
                                type:'options',
                                parent:'h5css.'+enname+'_button.value',
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
                                effect:[
                                    'h5css.'+enname+'_button.value.'+enname+'_background_color',
                                    'h5css.'+enname+'_button.value.'+enname+'_background_image',
                                    'h5css.'+enname+'_button.value.'+enname+'_background_repeat',
                                    'h5css.'+enname+'_button.value.'+enname+'_gradient_color_top',
                                    'h5css.'+enname+'_button.value.'+enname+'_gradient_color_bottom',
                                    'h5css.'+enname+'_button.value.'+enname+'_gradient_color_left',
                                    'h5css.'+enname+'_button.value.'+enname+'_gradient_color_right']
                            }
                            baseData.h5css[enname+'_button'].value[enname+'_background_color'] = {
                                cn:'背景色',
                                en:enname+'_background_color',
                                value:elemData.props.css.background_color.value,
                                type:'color',
                                parent:'h5css.'+enname+'_button.value',
                                condition:['background-color','background-image'],
                                status:elemData.props.css.background_type.value == 'background-color' || elemData.props.css.background_type.value == 'background-image'
                            }
                            baseData.h5css[enname+'_button'].value[enname+'_background_image'] = {
                                cn:'背景图',
                                en:enname+'_background_image',
                                value:elemData.props.css.background_image.value,
                                type:'image',
                                mold:'bg',
                                parent:'h5css.'+enname+'_button.value',
                                condition:['background-image'],
                                status:elemData.props.css.background_type.value == 'background-image'
                            }
                            baseData.h5css[enname+'_button'].value[enname+'_background_repeat'] = {
                                cn:'背景重复',
                                en:enname+'_background_repeat',
                                value:elemData.props.css.background_repeat.value,
                                cnvalue:elemData.props.css.background_repeat.cnvalue,
                                type:'options',
                                parent:'h5css.'+enname+'_button.value',
                                condition:['background-image'],
                                status:elemData.props.css.background_type.value == 'background-image',
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
                            baseData.h5css[enname+'_button'].value[enname+'_gradient_color_top'] = {
                                cn:'背景-上',
                                en:enname+'_gradient_color_top',
                                value:elemData.props.css.gradient_color_top.value,
                                type:'color',
                                parent:'h5css.'+enname+'_button.value',
                                condition:['gradient-top-bottom'],
                                status:elemData.props.css.background_type.value == 'gradient-top-bottom'
                            }
                            baseData.h5css[enname+'_button'].value[enname+'_gradient_color_bottom'] = {
                                cn:'背景-下',
                                en:enname+'_gradient_color_bottom',
                                value:elemData.props.css.gradient_color_bottom.value,
                                type:'color',
                                parent:'h5css.'+enname+'_button.value',
                                condition:['gradient-top-bottom'],
                                status:elemData.props.css.background_type.value == 'gradient-top-bottom'
                            }
                            baseData.h5css[enname+'_button'].value[enname+'_gradient_color_left'] = {
                                cn:'背景-左',
                                en:enname+'_gradient_color_left',
                                value:elemData.props.css.gradient_color_left.value,
                                type:'color',
                                parent:'h5css.'+enname+'_button.value',
                                condition:['gradient-left-right'],
                                status:elemData.props.css.background_type.value == 'gradient-left-right'
                            }
                            baseData.h5css[enname+'_button'].value[enname+'_gradient_color_right'] = {
                                cn:'背景-右',
                                en:enname+'_gradient_color_right',
                                value:elemData.props.css.gradient_color_right.value,
                                type:'color',
                                parent:'h5css.'+enname+'_button.value',
                                condition:['gradient-left-right'],
                                status:elemData.props.css.background_type.value == 'gradient-left-right'
                            }
                            if(!pcdata.data.hasOwnProperty(enname+'_button_text')){
                                if(!baseData.data.hasOwnProperty('yh_h5data')){
                                    baseData.data.yh_h5data = {
                                        cn:'移动端数据设置',
                                        en:'yh_h5data',
                                        parent:'yh_h5data',
                                        type:'uplist',
                                        value:{}
                                    }
                                }
                                if(elemData.props.event.linkClassify.value == 'positionList'){
                                    baseData.data.yh_h5data.value[enname+'_button_text'] = {
                                        cn:name+'文字',
                                        en:enname+'_button_text',
                                        value:elemData.props.data.button_text.value,
                                        type:'text',
                                        parent:'data.yh_h5data.value',
                                        parentSetStatus:'common'
                                    }
                                }else{
                                    baseData.data.yh_h5data.value[enname+'_button_text'] = {
                                        cn:name+'文字',
                                        en:enname+'_button_text',
                                        value:elemData.props.data.button_text.value,
                                        type:'text',
                                        parent:'data.yh_h5data.value'
                                    }
                                }
                            }
                            
                            // baseData.css[enname+'_color'] = {
                            baseData.h5css[enname+'_button'].value[enname+'_color'] = {
                                // cn:name+'文字色',
                                cn:'文字色',
                                en:enname+'_color',
                                value:elemData.props.css.font_color.value,
                                type:'color',
                                // parent:'css'
                                parent:'h5css.'+enname+'_button.value',
                            }
                            if(elemData.props.css.border_width.value && elemData.props.css.border_style.value != 'none'){
                                // baseData.css[enname+'_border_color'] = {
                                baseData.h5css[enname+'_button'].value[enname+'_border_color'] = {
                                    // cn:name+'边框颜色',
                                    cn:'边框颜色',
                                    en:enname+'_border_color',
                                    value:elemData.props.css.border_color.value,
                                    type:'color',
                                    // parent:'css'
                                    parent:'h5css.'+enname+'_button.value',
                                }
                            }
                            if(elemData.props.css.box_shadow_x.value || elemData.props.css.box_shadow_y.value || elemData.props.css.box_shadow_blur.value){
                                // baseData.css[enname+'_box_shadow_color'] = {
                                baseData.h5css[enname+'_button'].value[enname+'_box_shadow_color'] = {
                                    // cn:name+'阴影颜色',
                                    cn:'阴影颜色',
                                    en:enname+'_box_shadow_color',
                                    value:elemData.props.css.box_shadow_color.value,
                                    type:'color',
                                    // parent:'css'
                                    parent:'h5css.'+enname+'_button.value',
                                }
                            }
                            break
                        case 'yh-text-h5':
                            name = elemData.props.data.text_type.value == 'other' ? elemData.props.data.textcn.value+'文案' : elemData.props.data.text_type.cnvalue
                            enname = elemData.props.data.text_type.value == 'other' ? elemData.props.data.texten.value : elemData.props.data.text_type.value
                            baseData.h5css[enname+'_color'] = {
                                cn:name,
                                en:enname+'_color',
                                value:elemData.props.css.font_color.value,
                                type:'color',
                                parent:'h5css'
                            }
                            enname = elemData.props.data.text_type.value == 'other' ? elemData.props.data.texten.value+'_text' : elemData.props.data.text_type.value
                            if(!pcdata.data.hasOwnProperty(enname)){
                                if(!baseData.data.hasOwnProperty('yh_h5data')){
                                    baseData.data.yh_h5data = {
                                        cn:'移动端数据设置',
                                        en:'yh_h5data',
                                        parent:'yh_h5data',
                                        type:'uplist',
                                        value:{}
                                    }
                                }
                                baseData.data.yh_h5data.value[enname] = {
                                    cn:name,
                                    en:enname,
                                    value:elemData.props.data.text.value,
                                    type:elemData.props.data.text_type.value == 'slogan' || elemData.props.data.text_type.value == 'description' ? 'textarea' :'text',
                                    parent:'data.yh_h5data.value'
                                }
                            }
                            break
                        case 'yh-position-h5':
                            if(!addPositionSetStatus){
                                addPositionSetStatus = true
                                baseData.h5css.position = {
                                    cn:'职位样式设置',
                                    en:'position',
                                    type:'uplist',
                                    name:'cn',
                                    parent:'h5css',
                                    value:{

                                    }
                                }
                                baseData.h5css.position.value['positionName_color'] = {
                                    cn:'职位颜色',
                                    en:'positionName_color',
                                    value:elemData.props.css.position_color.value,
                                    type:'color',
                                    parent:'h5css.position.value'
                                }
                                baseData.h5css.position.value['salary_color'] = {
                                    cn:'薪资颜色',
                                    en:'salary_color',
                                    value:elemData.props.css.salary_color.value,
                                    type:'color',
                                    parent:'h5css.position.value'
                                }
                                if(elemData.props.css.border_width.value && elemData.props.css.border_style.value != 'none'){
                                    baseData.h5css.position.value['position_border_color'] = {
                                        cn:'边框颜色',
                                        en:'position_border_color',
                                        value:elemData.props.css.border_color.value,
                                        type:'color',
                                        parent:'h5css.position.value'
                                    }
                                }
                                if(elemData.props.css.box_shadow_x.value || elemData.props.css.box_shadow_y.value || elemData.props.css.box_shadow_blur.value){
                                    baseData.h5css.position.value['position_box_shadow_color'] = {
                                        cn:'阴影颜色',
                                        en:'position_box_shadow_color',
                                        value:elemData.props.css.box_shadow_color.value,
                                        type:'color',
                                        parent:'h5css.position.value'
                                    }
                                }
                                baseData.h5css.position.value['position_background_type'] = {
                                    cn:'背景类型',
                                    en:'position_background_type',
                                    value:elemData.props.css.background_type.value,
                                    cnvalue:elemData.props.css.background_type.cnvalue,
                                    type:'options',
                                    parent:'h5css.position.value',
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
                                    effect:[
                                        'h5css.position.value.position_background_color',
                                        'h5css.position.value.position_background_image',
                                        'h5css.position.value.position_background_repeat',
                                        'h5css.position.value.position_gradient_color_top',
                                        'h5css.position.value.position_gradient_color_bottom',
                                        'h5css.position.value.position_gradient_color_left',
                                        'h5css.position.value.position_gradient_color_right']
                                }
                                baseData.h5css.position.value['position_background_color'] = {
                                    cn:'背景色',
                                    en:'position_background_color',
                                    value:elemData.props.css.background_color.value,
                                    type:'color',
                                    parent:'h5css.position.value',
                                    condition:['background-color','background-image'],
                                    status:elemData.props.css.background_type.value == 'background-color' || elemData.props.css.background_type.value == 'background-image'
                                }
                                baseData.h5css.position.value['position_background_image'] = {
                                    cn:'背景图',
                                    en:'position_background_image',
                                    value:elemData.props.css.background_image.value,
                                    type:'image',
                                    mold:'bg',
                                    parent:'h5css.position.value',
                                    condition:['background-image'],
                                    status:elemData.props.css.background_type.value == 'background-image'
                                }
                                baseData.h5css.position.value['position_background_repeat'] = {
                                    cn:'背景重复',
                                    en:'position_background_repeat',
                                    value:elemData.props.css.background_repeat.value,
                                    cnvalue:elemData.props.css.background_repeat.cnvalue,
                                    type:'options',
                                    parent:'h5css.position.value',
                                    condition:['background-image'],
                                    status:elemData.props.css.background_type.value == 'background-image',
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
                                baseData.h5css.position.value['position_gradient_color_top'] = {
                                    cn:'背景-上',
                                    en:'position_gradient_color_top',
                                    value:elemData.props.css.gradient_color_top.value,
                                    type:'color',
                                    parent:'h5css.position.value',
                                    condition:['gradient-top-bottom'],
                                    status:elemData.props.css.background_type.value == 'gradient-top-bottom'
                                }
                                baseData.h5css.position.value['position_gradient_color_bottom'] = {
                                    cn:'背景-下',
                                    en:'position_gradient_color_bottom',
                                    value:elemData.props.css.gradient_color_bottom.value,
                                    type:'color',
                                    parent:'h5css.position.value',
                                    condition:['gradient-top-bottom'],
                                    status:elemData.props.css.background_type.value == 'gradient-top-bottom'
                                }
                                baseData.h5css.position.value['position_gradient_color_left'] = {
                                    cn:'背景-左',
                                    en:'position_gradient_color_left',
                                    value:elemData.props.css.gradient_color_left.value,
                                    type:'color',
                                    parent:'h5css.position.value',
                                    condition:['gradient-left-right'],
                                    status:elemData.props.css.background_type.value == 'gradient-left-right'
                                }
                                baseData.h5css.position.value['position_gradient_color_right'] = {
                                    cn:'背景-右',
                                    en:'position_gradient_color_right',
                                    value:elemData.props.css.gradient_color_right.value,
                                    type:'color',
                                    parent:'h5css.position.value',
                                    condition:['gradient-left-right'],
                                    status:elemData.props.css.background_type.value == 'gradient-left-right'
                                }
                                if(!pcdata.data.hasOwnProperty('position')){
                                    baseData.data.position = {
                                        cn:'职位设置',
                                        en:'position',
                                        type:'uplist',
                                        name:'positionName',
                                        parent:'data',
                                        removeStatus:true,
                                        value:[{
                                            dynamic_type:{
                                                cn:'职位类别',
                                                en:'dynamic_type',
                                                value:'设计',
                                                type:'none',
                                                parent:'data.position.value'
                                            },
                                            positionId:{
                                                cn:'职位ID',
                                                en:'positionId',
                                                value:'1777398',
                                                type:'request',
                                                parent:'data.position.value'
                                            },
                                            positionName:{
                                                cn:'职位名称',
                                                en:'positionName',
                                                value:elemData.props.data.position.value,
                                                type:'text',
                                                parent:'data.position.value'
                                            },
                                            salary:{
                                                cn:'职位薪资',
                                                en:'salary',
                                                value:elemData.props.data.salary.value,
                                                type:'text',
                                                parent:'data.position.value'
                                            }
                                        }]
                                    }
                                    baseData.positionData = {
                                        dynamic_type:{
                                            cn:'职位类别',
                                            en:'dynamic_type',
                                            value:'设计',
                                            type:'none',
                                            parent:'data.position.value'
                                        },
                                        positionId:{
                                            cn:'职位ID',
                                            en:'positionId',
                                            value:'1777398',
                                            type:'request',
                                            parent:'data.position.value'
                                        },
                                        positionName:{
                                            cn:'职位名称',
                                            en:'positionName',
                                            value:'UI设计师',
                                            type:'text',
                                            parent:'data.position.value'
                                        },
                                        salary:{
                                            cn:'职位薪资',
                                            en:'salary',
                                            value:'7k-12k',
                                            type:'text',
                                            parent:'data.position.value'
                                        }
                                    }
                                    for(j = 1; j < elemData.props.col; j++){
                                        baseData.data.position.value.push(baseData.positionData)
                                    }
                                }
                            }
                            break
                    }
                }
                return {
                    html:start+customElemStart+'\n'+elem.innerHTML+'\n'+customElemEnd+jsstart_h5+customStyle+jscontent+jsend,
                    css:style,
                    data:baseData
                }
            },
            saveComponent(e){
                let start =   '<style>\n'+
                            '    @import "./index.css";\n'+
                            '</style>\n'+
                            '<template>\n',
                    customElemStart = '    <div class="custom-'+this.yh_custom_status+' yh-custom-'+this.yh_custom_status+'-base-element00" :id="props.id" yh-module="Custom_'+this.yh_custom_status+'" \n'+
                                    '        :ref="props.id" \n'+
                                    '        :style="setCustomBackgroundStyle"\n',

                    customElemEnd = '         \n'+
                                    '        @click.stop="setAll">\n',

                    end =           '        <!-- yh-edit 组件设置 -->\n'+
                                    '        <yh-edit-complicated\n'+
                                    '            ref="yh-edit-complicated"\n'+
                                    '            :css="props.css"\n'+
                                    '            :h5css="props.h5css"\n'+
                                    '            :elem_id="props.id"\n'+
                                    '            :common="props.common"\n'+
                                    '            :nature="props.attribute"\n'+
                                    '            :elements="props.elements"\n'+
                                    '            :ignorestatus="props.ignorestatus"\n'+
                                    '            :ischild="props.ischild"\n'+
                                    '            :owndata="props.data"\n'+
                                    '            :path="path"\n'+
                                    '            :parentmodule="parentmodule"></yh-edit-complicated>\n'+ 
                                    '    </div>\n'+
                            '</template>\n'+
                            '<script>\n'+
                                '    import {\n'+
                                '        recoveryData,\n'+
                                '        getDataID,\n'+
                                '        settingBox,\n'+
                                '        initSelected,\n'+
                                '        updateData,\n'+
                                '        setChildData,\n'+
                                '        recoveryChildElementsData,\n'+
                                '        dealStringLine\n'+
                                '    } from "../../Base/Node.js"\n'+
                                '    import YHEditComplicated from "../../../components-edit/yh-edit-complicated.vue"\n',
                    baseData = {
                        id:'',
                        ignorestatus:'',
                        ischild:'',
                        yh_data_name:'name',
                        path:'',
                        parentmodule:'',
                        css:{
                            yhcustom_background:{
                                en:'background',
                                cn:'背景设置',
                                parent:'css',
                                type:'uplist',
                                value:{
                                    background_type:{
                                        cn:'背景类型',
                                        en:'background_type',
                                        value:this.custom.css.background_type.value,
                                        cnvalue:this.custom.css.background_type.cnvalue,
                                        type:'options',
                                        parent:'css.yhcustom_background.value',
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
                                        effect:[
                                            'css.yhcustom_background.value.background_color',
                                            'css.yhcustom_background.value.background_image',
                                            'css.yhcustom_background.value.background_repeat',
                                            'css.yhcustom_background.value.gradient_color_top',
                                            'css.yhcustom_background.value.gradient_color_bottom',
                                            'css.yhcustom_background.value.gradient_color_left',
                                            'css.yhcustom_background.value.gradient_color_right'
                                        ]
                                    },
                                    background_color:{
                                        cn:'背景颜色',
                                        en:'background_color',
                                        value:this.custom.css.background_color.value,
                                        type:'color',
                                        parent:'css.yhcustom_background.value',
                                        condition:['background-color','background-image'],
                                        status:this.custom.css.background_type.value == 'background-color' || this.custom.css.background_type.value == 'background-image'
                                    },
                                    background_image:{
                                        cn:'背景图',
                                        en:'background_image',
                                        value:this.custom.css.background_image.value,
                                        type:'image',
                                        mold:'bg',
                                        parent:'css.yhcustom_background.value',
                                        condition:['background-image'],
                                        status:this.custom.css.background_type.value == 'background-image'
                                    },
                                    background_repeat:{
                                        cn:'背景重复',
                                        en:'background_repeat',
                                        value:this.custom.css.background_repeat.value,
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
                                        parent:'css.yhcustom_background.value',
                                        condition:['background-image'],
                                        status:this.custom.css.background_type.value == 'background-image'
                                    },
                                    gradient_color_top:{
                                        cn:'背景-上',
                                        en:'gradient_color_top',
                                        value:this.custom.css.gradient_color_top.value,
                                        type:'color',
                                        parent:'css.yhcustom_background.value',
                                        condition:['gradient-top-bottom'],
                                        status:this.custom.css.background_type.value == 'gradient-top-bottom'
                                    },
                                    gradient_color_bottom:{
                                        cn:'背景-下',
                                        en:'gradient_color_bottom',
                                        value:this.custom.css.gradient_color_bottom.value,
                                        type:'color',
                                        parent:'css.yhcustom_background.value',
                                        condition:['gradient-top-bottom'],
                                        status:this.custom.css.background_type.value == 'gradient-top-bottom'
                                    },
                                    gradient_color_left:{
                                        cn:'背景-左',
                                        en:'gradient_color_left',
                                        value:this.custom.css.gradient_color_left.value,
                                        type:'color',
                                        parent:'css.yhcustom_background.value',
                                        condition:['gradient-left-right'],
                                        status:this.custom.css.background_type.value == 'gradient-left-right'
                                    },
                                    gradient_color_right:{
                                        cn:'背景-右',
                                        en:'gradient_color_right',
                                        value:this.custom.css.gradient_color_right.value,
                                        type:'color',
                                        parent:'css.yhcustom_background.value',
                                        condition:['gradient-left-right'],
                                        status:this.custom.css.background_type.value == 'gradient-left-right'
                                    }
                                }
                            },
                            // background_color:{
                            //     cn:'背景颜色',
                            //     en:'background_color',
                            //     value:this.custom.css.background_color.value,
                            //     type:'color'
                            // },
                            // background_image:{
                            //     cn:'背景图片',
                            //     en:'background_image',
                            //     value:this.custom.css.background_image.value,
                            //     type:'image',
                            //     mold:'bg'
                            // },
                            // background_repeat:{
                            //     cn:'背景重复',
                            //     en:'background_repeat',
                            //     value:this.custom.css.background_repeat.value,
                            //     cnvalue:this.custom.css.background_repeat.cnvalue,
                            //     type:'options',
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
                        },
                        h5css:{},
                        common:{},
                        attribute:{},
                        data:{
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
                            }
                        }
                    },
                    jsstart = 
                            '    export default {\n'+
                            '        props:["props","path","parentmodule"],\n'+
                            '        components:{\n'+
                            '            "yh-edit-complicated":YHEditComplicated\n'+
                            '        },\n'+
                            '        data(){\n'+
                            '            return {\n'+
                            '            }\n'+
                            '        },\n'+
                            '        mounted(){\n'+
                            '        },\n'+
                            '        computed:{\n',
                    jsstart_pc = 
                            '    export default {\n'+
                            '        props:["props","path","parentmodule"],\n'+
                            '        data(){\n'+
                            '            return {\n'+
                            '            }\n'+
                            '        },\n'+
                            '        mounted(){\n'+
                            '        },\n'+
                            '        computed:{\n',
                    jscontent =     '',
                    jsend = '        },\n'+
                            '        methods:{\n'+
                            '            dealStringLine,\n'+
                            '            resetData(data){\n'+
                            '                return updateData(data,baseData)\n'+
                            '            },\n'+
                            '            setAll(e){\n'+
                            '                let id = initSelected(e)\n'+
                            '                this.$refs[id].className += " setting"\n'+
                            '                let yh_edit_layer = this.$refs["yh-edit-complicated"].$refs[id+"-yh-edit-layer"]\n'+
                            '                yh_edit_layer.className = yh_edit_layer.className.replace(/( hide)/g,"")\n'+
                            '                settingBox(this.$refs[id],this.props.ischild)\n'+
                            '            },\n'+
                            '            recoveryModuleData(elem,baseData){\n'+
                            '                let data = {},\n'+
                            '                    attr = "",\n'+
                            '                    current = null,\n'+
                            '                    currentChild = null,\n'+
                            '                    i = 0,curr = "",\n'+
                            '                    childdata = {}\n'+
                            '                for(attr in baseData.data){ \n'+
                            '                }\n'+
                            '                return {\n'+
                            '                    data:data\n'+
                            '                }\n'+
                            '            }\n'+
                            '        },\n'+
                            '        initCtor(options){\n'+
                            '            let data = Object.assign(\n'+
                            '                {},\n'+
                            '                JSON.parse(JSON.stringify({\n'+
                            '                    ignorestatus:baseData.ignorestatus,\n'+
                            '                    ischild:baseData.ischild,\n'+
                            '                    yh_data_name:baseData.yh_data_name,\n'+
                            '                    nonset:baseData.nonset,\n'+
                            '                    css:baseData.css,\n'+
                            '                    h5css:baseData.h5css,\n'+
                            '                    elements:baseData.elements,\n'+
                            '                    attribute:baseData.attribute,\n'+
                            '                    data:baseData.data,\n'+
                            '                    common:baseData.common\n'+
                            '                })),\n'+
                            '                options\n'+
                            '            )\n'+
                            '            data.data.anchorID.value = options.id\n'+
                            '            return data\n'+
                            '        },\n'+
                            '        setCtor(options,elemData){\n'+
                            '            let data = Object.assign(\n'+
                            '                {},\n'+
                            '                JSON.parse(JSON.stringify({\n'+
                            '                    ignorestatus:baseData.ignorestatus,\n'+
                            '                    ischild:baseData.ischild,\n'+
                            '                    yh_data_name:baseData.yh_data_name,\n'+
                            '                    path:path,\n'+
                            '                    css:baseData.css,\n'+
                            '                    h5css:baseData.h5css,\n'+
                            '                    elements:baseData.elements,\n'+
                            '                    nonset:baseData.nonset,\n'+
                            '                    attribute:baseData.attribute,\n'+
                            '                    data:setChildData(elemData,baseData.data),\n'+
                            '                    common:baseData.common\n'+
                            '                })),\n'+
                            '                options\n'+
                            '            )\n'+
                            '            data.data.anchorID.value = options.id\n'+
                            '            return data\n'+
                            '        },\n'+
                            '        recoveryCtor(elem,options,components){\n'+
                            '            let data = Object.assign(\n'+
                            '                {},\n'+
                            '                recoveryData(elem,baseData),\n'+
                            '                this.methods.recoveryModuleData(elem,baseData),\n'+
                            '                recoveryChildElementsData(elem,baseData,components,"ignorestatus"),\n'+
                            '                {\n'+
                            '                    yh_data_name:baseData.yh_data_name,\n'+
                            '                    path:path,\n'+
                            '                    nonset:baseData.nonset,\n'+
                            '                    common:baseData.common\n'+
                            '                },\n'+
                            '                options\n'+
                            '            )\n'+
                            '            if(!data.data.anchorID.value){\n'+
                            '                data.data.anchorID.value = options.id\n'+
                            '            }\n'+
                            '            return data\n'+
                            '        }\n'+
                            '    }\n'+
                        '<\/script>',
                    // 参数为True的时候，是深度克隆，克隆当前对象的一切子节点
                    // 参数为false的时候，是浅克隆，只会克隆标签，不包含文本信息
                    elem = this.$refs['yh-custom-content'].cloneNode(true),
                    selection = getChildrenByClassName(elem,'yh-custom-selection'),
                    editLayer = elem.getElementsByClassName('yh-base-edit-layer'),
                    styleElem = elem.getElementsByClassName('yh-custom-style'),
                    yhPosition = elem.getElementsByClassName('yh-custom-position-one'),
                    yhPositionContent = elem.getElementsByClassName('yh-custom-position-content'),
                    hasSetPositionStyleStatus = false,
                    addPositionSetStatus = false,
                    setPositionListStatus = false,
                    hasCompanyId = false,
                    length = 0,
                    i = 0,ii = 0, j = 0,
                    parent = null,
                    customStyle = '',
                    cssText = '',
                    style = '',
                    name = '',
                    enname = '',
                    tempstr = '',
                    elemData = {},
                    imageIndex = 0,
                    status = true,
                    path = ''
                // 删除没必要的HTML
                length = selection.length
                for(i = 0,ii = 0; ii < length; ii++,i++){
                    elem.removeChild(selection[i])
                }
                length = editLayer.length
                for(i = 0,ii = 0; ii < length; ii++){
                    editLayer[0].parentNode.removeChild(editLayer[0])
                }
                // 获取自定义组件的所有样式
                cssText = elem.style.cssText
                style += '.yh-custom-'+this.yh_custom_status+'-base-element00 { margin:0 auto; '+cssText+'}'
                length = styleElem.length
                for(i = 0,ii = 0; ii < length; ii++ ){
                    cssText = styleElem[i].style.cssText
                    if(/(yh-custom-image-img)/g.test(styleElem[i].className)){
                        parent = getParentByAttr(styleElem[i],'path')
                        path = parent.getAttribute('path').split('.')
                        elemData = this.custom
                        for(j = 0; j < path.length; j++){
                            if(path[j].trim()){
                                if(/[0-9]/g.test(path[j])){
                                    elemData = elemData[parseInt(path[j])]
                                }else{
                                    elemData = elemData[path[j]]
                                }
                            }
                        }
                        switch(elemData.props.data.imagetype.value){
                            case 'logo':
                                enname = 'data.logo'
                                break
                            case 'manager_logo':
                                enname = 'data.manager_logo'
                                break
                            default:
                                enname = 'css.'+elemData.props.data.imageen.value+'_src'
                                break
                        }
                        if(!hasCompanyId && (elemData.props.data.imagetype.value == 'logo' || elemData.props.data.imagetype.value == 'manager_logo')){
                            hasCompanyId = true
                            baseData.data.companyId = {
                                cn:'公司ID',
                                en:'companyId',
                                value:147,
                                type:'request',
                                parent:'data'
                            }
                        }
                        styleElem[i].outerHTML = styleElem[i].outerHTML.replace(/src=\"([^\"]*)\"/g,':src="props.'+enname+'.value"')
                    }else if(/(yh-custom-href)/g.test(styleElem[i].className)){
                        styleElem[i].removeAttribute('href')
                        if(/(yh-custom-position-href)/g.test(styleElem[i].className)){
                            styleElem[i].setAttribute(':href',"\'https:\/\/www.lagou.com/jobs/\'+one.positionId.value+\'.html\'")
                        }else{
                            if(!hasCompanyId && /(props.data.companyId)/g.test(styleElem[i].getAttribute('lagou-href'))){
                                hasCompanyId = true
                                baseData.data.companyId = {
                                    cn:'公司ID',
                                    en:'companyId',
                                    value:147,
                                    type:'request',
                                    parent:'data'
                                }
                            }
                            styleElem[i].setAttribute(':href',styleElem[i].getAttribute('lagou-href'))
                        }
                        styleElem[i].outerHTML = styleElem[i].outerHTML.replace(/lagou-href=\"([^\"]*)\"/g,':lagou-href="'+styleElem[i].getAttribute('lagou-href')+'"')
                    }else if(/(yh-custom-button-btn)/g.test(styleElem[i].className)){
                        parent = getParentByAttr(styleElem[i],'path')
                        path = parent.getAttribute('path').split('.')
                        elemData = this.custom
                        for(j = 0; j < path.length; j++){
                            if(path[j].trim()){
                                if(/[0-9]/g.test(path[j])){
                                    elemData = elemData[parseInt(path[j])]
                                }else{
                                    elemData = elemData[path[j]]
                                }
                            }
                        }
                        enname = elemData.props.data.buttonen.value
                        styleElem[i].innerHTML = "{{props.data."+enname+"_button_text.value}}\n"
                        // tempstr = "{"+
                                // "color:props.css."+enname+"_color.value,"
                                // "backgroundColor:props.css."+enname+"_background_color.value,"+
                                // "backgroundImage:(props.css."+enname+"_background_image.value == 'none' || props.css."+enname+"_background_image.value == 'undefined') ? 'none' : url(props.css."+enname+"_background_image.value),"+
                                // "backgroundRepeat:props.css."+enname+"_background_repeat.value,"
                        jscontent += this.getButtonStyleFunc(elemData,enname)
                        styleElem[i].setAttribute(':style',"set"+enname+"ButtonStyle")
                    }else if(/(yh-custom-text-text)/g.test(styleElem[i].className)){
                        parent = getParentByAttr(styleElem[i],'path')
                        path = parent.getAttribute('path').split('.')
                        elemData = this.custom
                        for(j = 0; j < path.length; j++){
                            if(path[j].trim()){
                                if(/[0-9]/g.test(path[j])){
                                    elemData = elemData[parseInt(path[j])]
                                }else{
                                    elemData = elemData[path[j]]
                                }
                            }
                        }
                        enname = elemData.props.data.text_type.value == 'other' ? elemData.props.data.texten.value+'_text' : elemData.props.data.text_type.value
                        if(!hasCompanyId && elemData.props.data.text_type.value == 'name'){
                            hasCompanyId = true
                            baseData.data.companyId = {
                                cn:'公司ID',
                                en:'companyId',
                                value:147,
                                type:'request',
                                parent:'data'
                            }
                        }
                        styleElem[i].setAttribute('v-html',elemData.props.data.text_lines.value > 1 ? ("dealStringLine("+elemData.props.data.text_limit.value+","+elemData.props.data.each_line.value+","+elemData.props.data.text_lines.value+",props.data."+enname+".value,false)") : ("props.data."+enname+".value"))
                        styleElem[i].innerHTML = ''
                        enname = elemData.props.data.text_type.value == 'other' ? elemData.props.data.texten.value : elemData.props.data.text_type.value
                        tempstr = "{\n"+
                                        "color:props.css."+enname+"_color.value,\n"+
                                   "}"
                        styleElem[i].setAttribute(':style',tempstr)
                    }else if(/(yh-custom-position-position)/g.test(styleElem[i].className)){
                        parent = getParentByAttr(styleElem[i],'path')
                        path = parent.getAttribute('path').split('.')
                        elemData = this.custom
                        for(j = 0; j < path.length; j++){
                            if(path[j].trim()){
                                if(/[0-9]/g.test(path[j])){
                                    elemData = elemData[parseInt(path[j])]
                                }else{
                                    elemData = elemData[path[j]]
                                }
                            }
                        }
                        if(!hasSetPositionStyleStatus){
                            hasSetPositionStyleStatus = true
                            jscontent += this.getPositionStyleFunc(elemData)
                        }
                        styleElem[i].setAttribute(':style',"setPositionStyle")
                    }else if(/(yh-custom-position-name)/g.test(styleElem[i].className)){
                        parent = getParentByAttr(styleElem[i],'path')
                        path = parent.getAttribute('path').split('.')
                        elemData = this.custom
                        for(j = 0; j < path.length; j++){
                            if(path[j].trim()){
                                if(/[0-9]/g.test(path[j])){
                                    elemData = elemData[parseInt(path[j])]
                                }else{
                                    elemData = elemData[path[j]]
                                }
                            }
                        }
                        styleElem[i].innerHTML = "\n{{one.positionName.value}}\n"
                        tempstr = "{\n"+
                                        "color:props.css.position.value.positionName_color.value,\n"+
                                   "}"
                        styleElem[i].setAttribute(':style',tempstr)
                    }else if(/(yh-custom-position-salary)/g.test(styleElem[i].className)){
                        parent = getParentByAttr(styleElem[i],'path')
                        path = parent.getAttribute('path').split('.')
                        elemData = this.custom
                        for(j = 0; j < path.length; j++){
                            if(path[j].trim()){
                                if(/[0-9]/g.test(path[j])){
                                    elemData = elemData[parseInt(path[j])]
                                }else{
                                    elemData = elemData[path[j]]
                                }
                            }
                        }
                        styleElem[i].innerHTML = "\n{{one.salary.value}}\n"
                        tempstr = "{\n"+
                                        "color:props.css.position.value.salary_color.value,\n"+
                                   "}"
                        styleElem[i].setAttribute(':style',tempstr) 
                    }
                    name = 'yh-custom-'+this.yh_custom_status+'-base-element'+ii
                    style += '.'+name+'{'+cssText+'}'
                    styleElem[i].removeAttribute('style')
                    styleElem[i].className = styleElem[i].className.replace('yh-custom-style',name)
                }
                length = yhPosition.length
                for(i = 0, ii = 0; ii < length;ii++ ){
                    if(i == 0){
                        yhPosition[i].setAttribute('v-for','one in props.data.position.value')
                        yhPosition[i].setAttribute(':dynamic_type','one.dynamic_type.value')
                        i++
                    }else{
                        yhPosition[i].parentNode.removeChild(yhPosition[i])
                    }
                }
                length = yhPositionContent.length
                for(i = 0; i < length; i++){
                    yhPositionContent[i].className += ' position positionList clearfix'
                    break
                }
                customStyle = this.getCustomStyleFunc()
                // 设置数据
                // baseData.css baseData.data
                for(i = 0; i < this.custom.elements.length; i++){
                    elemData = this.custom.elements[i]
                    switch(elemData['yh-module']){
                        case 'yh-image':
                            switch(elemData.props.data.imagetype.value){
                                case 'logo':  // 公司logo
                                    baseData.data['logo'] = {
                                        cn:'公司logo',
                                        en:'logo',
                                        value:elemData.props.css.src.value,
                                        type:'image',
                                        mold:'src',
                                        parent:'data'
                                    }
                                    break
                                case 'manager_logo':  // 公司领导logo
                                    baseData.data['manager_logo'] = {
                                        cn:'领导图片',
                                        en:'manager_logo',
                                        value:elemData.props.css.manager_logo.value,
                                        type:'image',
                                        mold:'src',
                                        parent:'data'
                                    }
                                    break
                                case 'normal-src':  // 普通图片
                                default:
                                    baseData.css[elemData.props.data.imageen.value+'_src'] = {
                                        cn:elemData.props.data.imagecn.value,
                                        en:elemData.props.data.imageen.value+'_src',
                                        value:elemData.props.css.src.value,
                                        type:'image',
                                        mold:'src',
                                        parent:'css'
                                    }
                                    break
                            }
                            break
                        case 'yh-button':
                            name = elemData.props.data.buttoncn.value
                            enname = elemData.props.data.buttonen.value
                            baseData.css[enname+'_button'] = {
                                cn:name+'按钮设置',
                                en:enname+'_button',
                                type:'uplist',
                                name:'cn',
                                parent:'css',
                                value:{

                                }
                            }
                            // baseData.css[enname+'_background_type'] = {
                            baseData.css[enname+'_button'].value[enname+'_background_type'] = {
                                // cn:name+'背景类型',
                                cn:'背景类型',
                                en:enname+'_background_type',
                                value:elemData.props.css.background_type.value,
                                cnvalue:elemData.props.css.background_type.cnvalue,
                                type:'options',
                                // parent:'css',
                                parent:'css.'+enname+'_button.value',
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
                                effect:[
                                    'css.'+enname+'_button.value.'+enname+'_background_color',
                                    'css.'+enname+'_button.value.'+enname+'_background_image',
                                    'css.'+enname+'_button.value.'+enname+'_background_repeat',
                                    'css.'+enname+'_button.value.'+enname+'_gradient_color_top',
                                    'css.'+enname+'_button.value.'+enname+'_gradient_color_bottom',
                                    'css.'+enname+'_button.value.'+enname+'_gradient_color_left',
                                    'css.'+enname+'_button.value.'+enname+'_gradient_color_right']
                            }
                            // baseData.css[enname+'_background_color'] = {
                            baseData.css[enname+'_button'].value[enname+'_background_color'] = {
                                // cn:name+'背景',
                                cn:'背景色',
                                en:enname+'_background_color',
                                value:elemData.props.css.background_color.value,
                                type:'color',
                                // parent:'css',
                                parent:'css.'+enname+'_button.value',
                                condition:['background-color','background-image'],
                                status:elemData.props.css.background_type.value == 'background-color' || elemData.props.css.background_type.value == 'background-image'
                            }
                            // baseData.css[enname+'_background_image'] = {
                            baseData.css[enname+'_button'].value[enname+'_background_image'] = {
                                // cn:name+'背景图',
                                cn:'背景图',
                                en:enname+'_background_image',
                                value:elemData.props.css.background_image.value,
                                type:'image',
                                mold:'bg',
                                // parent:'css',
                                parent:'css.'+enname+'_button.value',
                                condition:['background-image'],
                                status:elemData.props.css.background_type.value == 'background-image'
                            }
                            // baseData.css[enname+'_background_repeat'] = {
                            baseData.css[enname+'_button'].value[enname+'_background_repeat'] = {
                                // cn:name+'背景重复',
                                cn:'背景重复',
                                en:enname+'_background_repeat',
                                value:elemData.props.css.background_repeat.value,
                                cnvalue:elemData.props.css.background_repeat.cnvalue,
                                type:'options',
                                // parent:'css',
                                parent:'css.'+enname+'_button.value',
                                condition:['background-image'],
                                status:elemData.props.css.background_type.value == 'background-image',
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
                            // baseData.css[enname+'_gradient_color_top'] = {
                            baseData.css[enname+'_button'].value[enname+'_gradient_color_top'] = {
                                // cn:name+'背景-上',
                                cn:'背景-上',
                                en:enname+'_gradient_color_top',
                                value:elemData.props.css.gradient_color_top.value,
                                type:'color',
                                // parent:'css',
                                parent:'css.'+enname+'_button.value',
                                condition:['gradient-top-bottom'],
                                status:elemData.props.css.background_type.value == 'gradient-top-bottom'
                            }
                            // baseData.css[enname+'_gradient_color_bottom'] = {
                            baseData.css[enname+'_button'].value[enname+'_gradient_color_bottom'] = {
                                // cn:name+'背景-下',
                                cn:'背景-下',
                                en:enname+'_gradient_color_bottom',
                                value:elemData.props.css.gradient_color_bottom.value,
                                type:'color',
                                // parent:'css',
                                parent:'css.'+enname+'_button.value',
                                condition:['gradient-top-bottom'],
                                status:elemData.props.css.background_type.value == 'gradient-top-bottom'
                            }
                            // baseData.css[enname+'_gradient_color_left'] = {
                            baseData.css[enname+'_button'].value[enname+'_gradient_color_left'] = {
                                // cn:name+'背景-左',
                                cn:'背景-左',
                                en:enname+'_gradient_color_left',
                                value:elemData.props.css.gradient_color_left.value,
                                type:'color',
                                // parent:'css',
                                parent:'css.'+enname+'_button.value',
                                condition:['gradient-left-right'],
                                status:elemData.props.css.background_type.value == 'gradient-left-right'
                            }
                            // baseData.css[enname+'_gradient_color_right'] = {
                            baseData.css[enname+'_button'].value[enname+'_gradient_color_right'] = {
                                // cn:name+'背景-右',
                                cn:'背景-右',
                                en:enname+'_gradient_color_right',
                                value:elemData.props.css.gradient_color_right.value,
                                type:'color',
                                // parent:'css',
                                parent:'css.'+enname+'_button.value',
                                condition:['gradient-left-right'],
                                status:elemData.props.css.background_type.value == 'gradient-left-right'
                            }
                            if(elemData.props.event.linkClassify.value == 'positionList'){
                                baseData.data[enname+'_button_text'] = {
                                    cn:name+'文字',
                                    en:enname+'_button_text',
                                    value:elemData.props.data.button_text.value,
                                    type:'text',
                                    parent:'data',
                                    parentSetStatus:'common'
                                }
                            }else{
                                baseData.data[enname+'_button_text'] = {
                                    cn:name+'文字',
                                    en:enname+'_button_text',
                                    value:elemData.props.data.button_text.value,
                                    type:'text',
                                    parent:'data'
                                }
                            }
                            // baseData.css[enname+'_color'] = {
                            baseData.css[enname+'_button'].value[enname+'_color'] = {
                                // cn:name+'文字色',
                                cn:'文字色',
                                en:enname+'_color',
                                value:elemData.props.css.font_color.value,
                                type:'color',
                                // parent:'css'
                                parent:'css.'+enname+'_button.value',
                            }
                            if(elemData.props.css.border_width.value && elemData.props.css.border_style.value != 'none'){
                                // baseData.css[enname+'_border_color'] = {
                                baseData.css[enname+'_button'].value[enname+'_border_color'] = {
                                    // cn:name+'边框颜色',
                                    cn:'边框颜色',
                                    en:enname+'_border_color',
                                    value:elemData.props.css.border_color.value,
                                    type:'color',
                                    // parent:'css'
                                    parent:'css.'+enname+'_button.value',
                                }
                            }
                            if(elemData.props.css.box_shadow_x.value || elemData.props.css.box_shadow_y.value || elemData.props.css.box_shadow_blur.value){
                                // baseData.css[enname+'_box_shadow_color'] = {
                                baseData.css[enname+'_button'].value[enname+'_box_shadow_color'] = {
                                    // cn:name+'阴影颜色',
                                    cn:'阴影颜色',
                                    en:enname+'_box_shadow_color',
                                    value:elemData.props.css.box_shadow_color.value,
                                    type:'color',
                                    // parent:'css'
                                    parent:'css.'+enname+'_button.value',
                                }
                            }
                            break
                        case 'yh-text':
                            name = elemData.props.data.text_type.value == 'other' ? elemData.props.data.textcn.value+'文案' : elemData.props.data.text_type.cnvalue
                            enname = elemData.props.data.text_type.value == 'other' ? elemData.props.data.texten.value : elemData.props.data.text_type.value
                            baseData.css[enname+'_color'] = {
                                cn:name,
                                en:enname+'_color',
                                value:elemData.props.css.font_color.value,
                                type:'color',
                                parent:'css'
                            }
                            enname = elemData.props.data.text_type.value == 'other' ? elemData.props.data.texten.value+'_text' : elemData.props.data.text_type.value
                            baseData.data[enname] = {
                                cn:name,
                                en:enname,
                                value:elemData.props.data.text.value,
                                type:elemData.props.data.text_type.value == 'slogan' || elemData.props.data.text_type.value == 'description' ? 'textarea' :'text',
                                parent:'data'
                            }
                            break
                        case 'yh-position':
                            if(!addPositionSetStatus){
                                addPositionSetStatus = true
                                baseData.css.position = {
                                    cn:'职位样式设置',
                                    en:'position',
                                    type:'uplist',
                                    name:'cn',
                                    parent:'css',
                                    value:{

                                    }
                                }
                                baseData.css.position.value['positionName_color'] = {
                                    cn:'职位颜色',
                                    en:'positionName_color',
                                    value:elemData.props.css.position_color.value,
                                    type:'color',
                                    parent:'css.position.value'
                                }
                                baseData.css.position.value['salary_color'] = {
                                    cn:'薪资颜色',
                                    en:'salary_color',
                                    value:elemData.props.css.salary_color.value,
                                    type:'color',
                                    parent:'css.position.value'
                                }
                                if(elemData.props.css.border_width.value && elemData.props.css.border_style.value != 'none'){
                                    baseData.css.position.value['position_border_color'] = {
                                        cn:'边框颜色',
                                        en:'position_border_color',
                                        value:elemData.props.css.border_color.value,
                                        type:'color',
                                        parent:'css.position.value'
                                    }
                                }
                                if(elemData.props.css.box_shadow_x.value || elemData.props.css.box_shadow_y.value || elemData.props.css.box_shadow_blur.value){
                                    baseData.css.position.value['position_box_shadow_color'] = {
                                        cn:'阴影颜色',
                                        en:'position_box_shadow_color',
                                        value:elemData.props.css.box_shadow_color.value,
                                        type:'color',
                                        parent:'css.position.value'
                                    }
                                }
                                baseData.css.position.value['position_background_type'] = {
                                    cn:'背景类型',
                                    en:'position_background_type',
                                    value:elemData.props.css.background_type.value,
                                    cnvalue:elemData.props.css.background_type.cnvalue,
                                    type:'options',
                                    parent:'css.position.value',
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
                                    effect:[
                                        'css.position.value.position_background_color',
                                        'css.position.value.position_background_image',
                                        'css.position.value.position_background_repeat',
                                        'css.position.value.position_gradient_color_top',
                                        'css.position.value.position_gradient_color_bottom',
                                        'css.position.value.position_gradient_color_left',
                                        'css.position.value.position_gradient_color_right']
                                }
                                baseData.css.position.value['position_background_color'] = {
                                    cn:'背景色',
                                    en:'position_background_color',
                                    value:elemData.props.css.background_color.value,
                                    type:'color',
                                    parent:'css.position.value',
                                    condition:['background-color','background-image'],
                                    status:elemData.props.css.background_type.value == 'background-color' || elemData.props.css.background_type.value == 'background-image'
                                }
                                baseData.css.position.value['position_background_image'] = {
                                    cn:'背景图',
                                    en:'position_background_image',
                                    value:elemData.props.css.background_image.value,
                                    type:'image',
                                    mold:'bg',
                                    parent:'css.position.value',
                                    condition:['background-image'],
                                    status:elemData.props.css.background_type.value == 'background-image'
                                }
                                baseData.css.position.value['position_background_repeat'] = {
                                    cn:'背景重复',
                                    en:'position_background_repeat',
                                    value:elemData.props.css.background_repeat.value,
                                    cnvalue:elemData.props.css.background_repeat.cnvalue,
                                    type:'options',
                                    parent:'css.position.value',
                                    condition:['background-image'],
                                    status:elemData.props.css.background_type.value == 'background-image',
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
                                baseData.css.position.value['position_gradient_color_top'] = {
                                    cn:'背景-上',
                                    en:'position_gradient_color_top',
                                    value:elemData.props.css.gradient_color_top.value,
                                    type:'color',
                                    parent:'css.position.value',
                                    condition:['gradient-top-bottom'],
                                    status:elemData.props.css.background_type.value == 'gradient-top-bottom'
                                }
                                baseData.css.position.value['position_gradient_color_bottom'] = {
                                    cn:'背景-下',
                                    en:'position_gradient_color_bottom',
                                    value:elemData.props.css.gradient_color_bottom.value,
                                    type:'color',
                                    parent:'css.position.value',
                                    condition:['gradient-top-bottom'],
                                    status:elemData.props.css.background_type.value == 'gradient-top-bottom'
                                }
                                baseData.css.position.value['position_gradient_color_left'] = {
                                    cn:'背景-左',
                                    en:'position_gradient_color_left',
                                    value:elemData.props.css.gradient_color_left.value,
                                    type:'color',
                                    parent:'css.position.value',
                                    condition:['gradient-left-right'],
                                    status:elemData.props.css.background_type.value == 'gradient-left-right'
                                }
                                baseData.css.position.value['position_gradient_color_right'] = {
                                    cn:'背景-右',
                                    en:'position_gradient_color_right',
                                    value:elemData.props.css.gradient_color_right.value,
                                    type:'color',
                                    parent:'css.position.value',
                                    condition:['gradient-left-right'],
                                    status:elemData.props.css.background_type.value == 'gradient-left-right'
                                }
                                baseData.data.position = {
                                    cn:'职位设置',
                                    en:'position',
                                    type:'uplist',
                                    name:'positionName',
                                    parent:'data',
                                    removeStatus:true,
                                    value:[{
                                        dynamic_type:{
                                            cn:'职位类别',
                                            en:'dynamic_type',
                                            value:'设计',
                                            type:'none',
                                            parent:'data.position.value'
                                        },
                                        positionId:{
                                            cn:'职位ID',
                                            en:'positionId',
                                            value:'1777398',
                                            type:'request',
                                            parent:'data.position.value'
                                        },
                                        positionName:{
                                            cn:'职位名称',
                                            en:'positionName',
                                            value:elemData.props.data.position.value,
                                            type:'text',
                                            parent:'data.position.value'
                                        },
                                        salary:{
                                            cn:'职位薪资',
                                            en:'salary',
                                            value:elemData.props.data.salary.value,
                                            type:'text',
                                            parent:'data.position.value'
                                        }
                                    }]
                                }
                                baseData.positionData = {
                                    dynamic_type:{
                                        cn:'职位类别',
                                        en:'dynamic_type',
                                        value:'设计',
                                        type:'none',
                                        parent:'data.position.value'
                                    },
                                    positionId:{
                                        cn:'职位ID',
                                        en:'positionId',
                                        value:'1777398',
                                        type:'request',
                                        parent:'data.position.value'
                                    },
                                    positionName:{
                                        cn:'职位名称',
                                        en:'positionName',
                                        value:'UI设计师',
                                        type:'text',
                                        parent:'data.position.value'
                                    },
                                    salary:{
                                        cn:'职位薪资',
                                        en:'salary',
                                        value:'7k-12k',
                                        type:'text',
                                        parent:'data.position.value'
                                    }
                                }
                                for(j = 1; j < elemData.props.col; j++){
                                    baseData.data.position.value.push(baseData.positionData)
                                }
                            }
                            break
                    }
                }
                let h5data = this.saveComponentH5(baseData)
                baseData.h5css = h5data.data.h5css
                // if(h5data.data.data.hasOwnProperty('yh_h5data')){
                //     baseData.data.yh_h5data = h5data.data.data.yh_h5data
                // }
                Object.assign(baseData.data,h5data.data.data)
                
                let self = this
                axios.post(this.connhost+'v3/api/editorPC/saveComponent',{
                    html:start+customElemStart+customElemEnd+'\n'+elem.innerHTML+'\n'+end+'\nconst baseData = '+JSON.stringify(baseData)+'\n'+jsstart+customStyle+jscontent+jsend,
                    css:style,
                    PC:start+customElemStart+
                        '    >\n'+
                        elem.innerHTML+'\n    </div>\n</template>\n<script>\n'+
                        '    import {\n'+
                        '        dealStringLine\n'+
                        '    } from "../../../components/Base/Node.js"\n'+
                        jsstart_pc+customStyle+jscontent+'        },\n'+
                        '        methods:{\n'+
                        '            dealStringLine,\n'+
                        '},\n    }\n<\/script>',
                    H5:h5data.html,
                    h5css:h5data.css,
                    name:this.yh_custom_status
                }).then(response => {
                    let content = response.data.content
                    // yh_custom_status
                    if(!self.yh_custom_status || self.yh_custom_status != content.name){
                        self.$store.commit('setYHCustomStatus',{
                            content:content.name
                        })
                    }
                        self.$store.commit('addCustom',{
                            content:content.name
                        })
                    // }
                    alert(response.data.message)
                    // self.$store.commit('initData',{
                    //     includes:content.includes,
                    //     count:content.count
                    // })
                },response => {
                    alert('保存失败')
                })
                console.log(baseData)
            },
            getPositionStyleFunc(elemData,type = ''){
                let jscontent = ""+
                    "            setPositionStyle(){\n"+
                    "                let style = ''\n"
                if(elemData.props.css.border_width.value && elemData.props.css.border_style.value != 'none'){
                    jscontent += "                    +'border-color:'+this.props."+type+"css.position.value.position_border_color.value+'; '\n"
                }
                if(elemData.props.css.box_shadow_x.value || elemData.props.css.box_shadow_y.value || elemData.props.css.box_shadow_blur.value){
                    jscontent += "                    +'box-shadow:'"+elemData.props.css.box_shadow_x.value+"'px '"+elemData.props.css.box_shadow_y.value+"'px '"+elemData.props.css.box_shadow_blur.value+"'px '+this.props."+type+"css.position.value.position_box_shadow_color.value'; '\n"
                }
                jscontent += "                switch(this.props."+type+"css.position.value.position_background_type.value){\n"+
                    "                    case 'background-color':\n"+
                    "                        style += 'background:'+this.props."+type+"css.position.value.position_background_color.value+'; '\n"+
                    "                    break;\n"+
                    "                    case 'background-image':\n"+
                    "                        style += 'background:'+this.props."+type+"css.position.value.position_background_color.value+' '+\n"+
                    "                            (this.props."+type+"css.position.value.position_background_image.value == \'none\' || this.props."+type+"css.position.value.position_background_image.value == \'undefined\' ? \'none\' : 'url('+this.props."+type+"css.position.value.position_background_image.value+')')+' '+\n"+
                    "                            this.props."+type+"css.position.value.position_background_repeat.value+'; '\n"+
                    "                    break;\n"+
                    "                    case 'gradient-top-bottom':\n"+
                    "                        style += ''+\n"+
                    "                            'background:'+this.props."+type+"css.position.value.position_gradient_color_top.value+';'+\n"+
                    "                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props."+type+"css.position.value.position_gradient_color_top.value+',endcolorstr='+this.props."+type+"css.position.value.position_gradient_color_bottom.value+',gradientType=0);'+\n"+
                    "                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props."+type+"css.position.value.position_gradient_color_top.value+',endcolorstr='+this.props."+type+"css.position.value.position_gradient_color_bottom.value+',gradientType=0);'+\n"+
                    "                            'background:-moz-linear-gradient(top, '+this.props."+type+"css.position.value.position_gradient_color_top.value+'), '+this.props."+type+"css.position.value.position_gradient_color_bottom.value+'); '+\n"+
                    "                            'background:-o-linear-gradient(top, '+this.props."+type+"css.position.value.position_gradient_color_top.value+'), '+this.props."+type+"css.position.value.position_gradient_color_bottom.value+'); '+\n"+
                    "                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.props.css.position.value.position_gradient_color_top.value+'),color-stop(100%,'+this.props."+type+"css.position.value.position_gradient_color_bottom.value+'));'+ \n"+
                    "                            ''\n"+
                    "                    break;\n"+
                    "                    case 'gradient-left-right':\n"+
                    "                        style += ''+\n"+
                    "                            'background:'+this.props."+type+"css.position.value.position_gradient_color_left.value+';'+\n"+
                    "                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props."+type+"css.position.value.position_gradient_color_left.value+',endcolorstr='+this.props."+type+"css.position.value.position_gradient_color_right.value+',gradientType=0);'+\n"+
                    "                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props."+type+"css.position.value.position_gradient_color_left.value+',endcolorstr='+this.props."+type+"css.position.value.position_gradient_color_right.value+',gradientType=0);'+\n"+
                    "                            'background:-moz-linear-gradient(left, '+this.props."+type+"css.position.value.position_gradient_color_left.value+'), '+this.props."+type+"css.position.value.position_gradient_color_right.value+'); '+\n"+
                    "                            'background:-o-linear-gradient(left, '+this.props."+type+"css.position.value.position_gradient_color_left.value+'), '+this.props."+type+"css.position.value.position_gradient_color_right.value+'); '+\n"+
                    "                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.props."+type+"css.position.value.position_gradient_color_left.value+'),color-stop(100%,'+this.props."+type+"css.position.value.position_gradient_color_right.value+'));'+\n"+ 
                    "                            ''\n"+
                    "                    break;\n"+
                    "                }\n"+
                    "                return style\n"+
                    "            },\n"
                return jscontent
            },
            getButtonStyleFunc(elemData,enname,type = ''){
                let jscontent = ""+
                        "            set"+enname+"ButtonStyle(){\n"+
                        "                let style = ''+\n"+
                        // "                    'color:'+this.props.css."+enname+"_color.value+'; '\n"
                        "                    'color:'+this.props."+type+"css."+enname+"_button.value."+enname+"_color.value+'; '\n"
                if(elemData.props.css.border_width.value && elemData.props.css.border_style.value != 'none'){
                    // jscontent += "                    +'border-color:'+this.props.css."+enname+"_border_color.value+'; '\n"
                    jscontent += "                    +'border-color:'+this.props."+type+"css."+enname+"_button.value."+enname+"_border_color.value+'; '\n"
                }
                if(elemData.props.css.box_shadow_x.value || elemData.props.css.box_shadow_y.value || elemData.props.css.box_shadow_blur.value){
                    // jscontent += "                    +'box-shadow:'"+elemData.props.css.box_shadow_x.value+"'px '"+elemData.props.css.box_shadow_y.value+"'px '"+elemData.props.css.box_shadow_blur.value+"'px '+this.props.css."+enname+"_box_shadow_color.value'; '\n"
                    jscontent += "                    +'box-shadow:'"+elemData.props.css.box_shadow_x.value+"'px '"+elemData.props.css.box_shadow_y.value+"'px '"+elemData.props.css.box_shadow_blur.value+"'px '+this.props."+type+"css."+enname+"_button.value."+enname+"_box_shadow_color.value'; '\n"
                }
                // jscontent += "                switch(this.props.css."+enname+"_background_type.value){\n"+
                jscontent += "                switch(this.props."+type+"css."+enname+"_button.value."+enname+"_background_type.value){\n"+
                    "                    case 'background-color':\n"+
                    // "                        style += 'background:'+this.props.css."+enname+"_background_color.value+'; '\n"+
                    "                        style += 'background:'+this.props."+type+"css."+enname+"_button.value."+enname+"_background_color.value+'; '\n"+
                    "                    break;\n"+
                    "                    case 'background-image':\n"+
                    // "                        style += 'background:'+this.props.css."+enname+"_background_color.value+' '+\n"+
                    "                        style += 'background:'+this.props."+type+"css."+enname+"_button.value."+enname+"_background_color.value+' '+\n"+
                    // "                            (this.props.css."+enname+"_background_image.value == 'none' || this.props.css."+enname+"_background_image.value == 'undefined' ? 'none' : 'url('+this.props.css."+enname+"_background_image.value+')')+' '+\n"+
                    "                            (this.props."+type+"css."+enname+"_button.value."+enname+"_background_image.value == 'none' || this.props."+type+"css."+enname+"_button.value."+enname+"_background_image.value == 'undefined' ? 'none' : 'url('+this.props."+type+"css."+enname+"_button.value."+enname+"_background_image.value+')')+' '+\n"+
                    // "                            this.props.css."+enname+"_background_repeat.value+'; '\n"+
                    "                            this.props."+type+"css."+enname+"_button.value."+enname+"_background_repeat.value+'; '\n"+
                    "                    break;\n"+
                    "                    case 'gradient-top-bottom':\n"+
                    "                        style += ''+\n"+
                    // "                            'background:'+this.props.css."+enname+"_gradient_color_top.value+';'+\n"+
                    "                            'background:'+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_top.value+';'+\n"+
                    // "                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css."+enname+"_gradient_color_top.value+',endcolorstr='+this.props.css."+enname+"_gradient_color_bottom.value+',gradientType=0);'+\n"+
                    "                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_top.value+',endcolorstr='+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_bottom.value+',gradientType=0);'+\n"+
                    // "                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css."+enname+"_gradient_color_top.value+',endcolorstr='+this.props.css."+enname+"_gradient_color_bottom.value+',gradientType=0);'+\n"+
                    "                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_top.value+',endcolorstr='+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_bottom.value+',gradientType=0);'+\n"+
                    // "                            'background:-moz-linear-gradient(top, '+this.props.css."+enname+"_gradient_color_top.value+'), '+this.props.css."+enname+"_gradient_color_bottom.value+'); '+\n"+
                    "                            'background:-moz-linear-gradient(top, '+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_top.value+'), '+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_bottom.value+'); '+\n"+
                    // "                            'background:-o-linear-gradient(top, '+this.props.css."+enname+"_gradient_color_top.value+'), '+this.props.css."+enname+"_gradient_color_bottom.value+'); '+\n"+
                    "                            'background:-o-linear-gradient(top, '+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_top.value+'), '+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_bottom.value+'); '+\n"+
                    // "                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.props.css."+enname+"_gradient_color_top.value+'),color-stop(100%,'+this.props.css."+enname+"_gradient_color_bottom.value+'));'+ \n"+
                    "                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_top.value+'),color-stop(100%,'+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_bottom.value+'));'+ \n"+
                    "                            ''\n"+
                    "                    break;\n"+
                    "                    case 'gradient-left-right':\n"+
                    "                        style += ''+\n"+
                    // "                            'background:'+this.props.css."+enname+"_gradient_color_left.value+';'+\n"+
                    "                            'background:'+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_left.value+';'+\n"+
                    // "                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css."+enname+"_gradient_color_left.value+',endcolorstr='+this.props.css."+enname+"_gradient_color_right.value+',gradientType=0);'+\n"+
                    "                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_left.value+',endcolorstr='+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_right.value+',gradientType=0);'+\n"+
                    // "                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css."+enname+"_gradient_color_left.value+',endcolorstr='+this.props.css."+enname+"_gradient_color_right.value+',gradientType=0);'+\n"+
                    "                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_left.value+',endcolorstr='+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_right.value+',gradientType=0);'+\n"+
                    // "                            'background:-moz-linear-gradient(left, '+this.props.css."+enname+"_gradient_color_left.value+'), '+this.props.css."+enname+"_gradient_color_right.value+'); '+\n"+
                    "                            'background:-moz-linear-gradient(left, '+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_left.value+'), '+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_right.value+'); '+\n"+
                    // "                            'background:-o-linear-gradient(left, '+this.props.css."+enname+"_gradient_color_left.value+'), '+this.props.css."+enname+"_gradient_color_right.value+'); '+\n"+
                    "                            'background:-o-linear-gradient(left, '+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_left.value+'), '+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_right.value+'); '+\n"+
                    // "                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.props.css."+enname+"_gradient_color_left.value+'),color-stop(100%,'+this.props.css."+enname+"_gradient_color_right.value+'));'+\n"+ 
                    "                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_left.value+'),color-stop(100%,'+this.props."+type+"css."+enname+"_button.value."+enname+"_gradient_color_right.value+'));'+\n"+ 
                    "                        ''\n"+
                    "                    break;\n"+
                    "                }\n"+
                    "                return style\n"+
                    "            },\n"
                return jscontent
            },
            getCustomStyleFunc(type = ""){
                // 获取最终得到的组件的设置项
                let customStyle = ""+
                        "            setCustomBackgroundStyle(){\n"+
                        "                let style = ''\n"
                if(this.custom.css.border_width.value && this.custom.css.border_style.value != 'none'){
                    baseData.css.border_color = {
                        cn:'边框颜色',
                        en:'border_color',
                        value:this.custom.css.border_color.value,
                        type:'color',
                        parent:'css'
                    }
                    customStyle += "                    +'border-color:'+this.props."+type+"css.border_color.value+'; '\n"
                    // customElemStart += 'borderColor:props.css.border_color.value,'
                }
                if(this.custom.css.box_shadow_x.value || this.custom.css.box_shadow_y.value || this.custom.css.box_shadow_blur.value){
                    baseData.css.box_shadow_color = {
                        cn:'阴影颜色',
                        en:'box_shadow_color',
                        value:this.custom.css.box_shadow_color.value,
                        type:'color',
                        parent:'css'
                    }
                    customStyle += "                    +'box-shadow:'"+this.custom.css.box_shadow_x.value+"'px '"+this.custom.css.box_shadow_y.value+"'px '"+this.custom.css.box_shadow_blur.value+"'px '+this.props."+type+"css.box_shadow_color.value'; '\n"
                    // customElemStart += 'boxShadow:'+this.custom.css.box_shadow_x.value+'px '+ this.custom.css.box_shadow_y.value+'px '+this.custom.css.box_shadow_blur.value+'px props.css.box_shadow_color.value,'
                }
                customStyle += "                switch(this.props."+type+"css.yhcustom_background.value.background_type.value){\n"+
                    "                    case 'background-color':\n"+
                    "                        style += 'background:'+this.props."+type+"css.yhcustom_background.value.background_color.value+'; '\n"+
                    "                    break;\n"+
                    "                    case 'background-image':\n"+
                    "                        style += 'background:'+this.props"+type+".css.yhcustom_background.value.background_color.value+' '+\n"+
                    "                            (this.props."+type+"css.yhcustom_background.value.background_image.value == \'none\' || this.props."+type+"css.yhcustom_background.value.background_image.value == \'undefined\' ? \'none\' : 'url('+this.props."+type+"css.yhcustom_background.value.background_image.value+')')+' '+\n"+
                    "                            this.props."+type+"css.yhcustom_background.value.background_repeat.value+'; '\n"+
                    "                    break;\n"+
                    "                    case 'gradient-top-bottom':\n"+
                    "                        style += ''+\n"+
                    "                            'background:'+this.props."+type+"css.yhcustom_background.value.gradient_color_top.value+';'+\n"+
                    "                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props."+type+"css.yhcustom_background.value.gradient_color_top.value+',endcolorstr='+this.props."+type+"css.yhcustom_background.value.gradient_color_bottom.value+',gradientType=0);'+\n"+
                    "                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props."+type+"css.yhcustom_background.value.gradient_color_top.value+',endcolorstr='+this.props."+type+"css.yhcustom_background.value.gradient_color_bottom.value+',gradientType=0);'+\n"+
                    "                            'background:-moz-linear-gradient(top, '+this.props."+type+"css.yhcustom_background.value.gradient_color_top.value+'), '+this.props."+type+"css.yhcustom_background.value.gradient_color_bottom.value+'); '+\n"+
                    "                            'background:-o-linear-gradient(top, '+this.props."+type+"css.yhcustom_background.value.gradient_color_top.value+'), '+this.props."+type+"css.yhcustom_background.value.gradient_color_bottom.value+'); '+\n"+
                    "                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.props."+type+"css.yhcustom_background.value.gradient_color_top.value+'),color-stop(100%,'+this.props."+type+"css.yhcustom_background.value.gradient_color_bottom.value+'));'+ \n"+
                    "                            ''\n"+
                    "                    break;\n"+
                    "                    case 'gradient-left-right':\n"+
                    "                        style += ''+\n"+
                    "                            'background:'+this.props."+type+"css.yhcustom_background.value.gradient_color_left.value+';'+\n"+
                    "                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props."+type+"css.yhcustom_background.value.gradient_color_left.value+',endcolorstr='+this.props."+type+"css.yhcustom_background.value.gradient_color_right.value+',gradientType=0);'+\n"+
                    "                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props."+type+"css.yhcustom_background.value.gradient_color_left.value+',endcolorstr='+this.props."+type+"css.yhcustom_background.value.gradient_color_right.value+',gradientType=0);'+\n"+
                    "                            'background:-moz-linear-gradient(left, '+this.props."+type+"css.yhcustom_background.value.gradient_color_left.value+'), '+this.props."+type+"css.yhcustom_background.value.gradient_color_right.value+'); '+\n"+
                    "                            'background:-o-linear-gradient(left, '+this.props."+type+"css.yhcustom_background.value.gradient_color_left.value+'), '+this.props."+type+"css.yhcustom_background.value.gradient_color_right.value+'); '+\n"+
                    "                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.props."+type+"css.yhcustom_background.value.gradient_color_left.value+'),color-stop(100%,'+this.props."+type+"css.yhcustom_background.value.gradient_color_right.value+'));'+\n"+ 
                    "                            ''\n"+
                    "                    break;\n"+
                    "                }\n"+
                    "                return style\n"+
                    "            },\n"
                return customStyle
            },
            setListCol(col){
                let isH5 = this.custom.activeStatus == 'h5' ? true : false,
                    suffix = isH5 ? '_h' : '',
                    countname = 'count'+suffix,
                    newID = 'custom'+suffix+this.custom['count'+suffix]
                this.positionStatus = true
                this.$store.commit('changeCustomCount')
                this.$store.commit('addCustomElement',{
                    id:newID,
                    'yh-module':this.yh.name,
                    module:this.yhmodule[this.yh.name],
                    path:'elements'+suffix+'.index',
                    props:this.yhmodule[this.yh.name].initCtor({
                        id:newID,
                        col:col
                    })
                })
            },
            clearAddCustom(e){
                this.$store.commit('clearCustomElements')
            },
            closeCustomSet(e){
                this.$store.commit('setYHCustomStatus',{
                    content:''
                })
                this.$store.commit('setCustomStatus')
            },
            undoAddCustom(e){
                this.$store.commit('setYHCustomStatus',{
                    content:''
                })
                this.$store.commit('setCustomStatus')
            }
        }
    }
</script>
<style>
/*yh-custom**************************************************************************/
.yh-custom {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #000;
    background-color: rgba(0,0,0,0.5);
    filter: Alpha(opacity=50);
    *zoom:1;
    z-index: 10000;
}
.yh-custom-layer {
    width: 1000px;
    /* height: 550px;*/
    padding: 0 0 10px 0;
    position: absolute;
    left: 50%;
    top: 46px;
    margin: 0 0 0 -500px;
    background: #232323;
}
.yh-custom-hide {
    display:none;
}
.yh-custom-top {
    margin:0 0 10px 0;
    background:#131313;
}
.yh-custom-components-h5,
.yh-custom-components {
    width:1000px;
    height:30px;
    background: #000;
}
.yh-custom-components-h5 > div,
.yh-custom-components > div {
    width:40px;
    height:30px;
    line-height:30px;
    color:#fff;
    text-align:center;
    font-size:14px;
    float:left;
}
.yh-custom-components-h5 > div.title,
.yh-custom-components > div.title {
    width: 90px;
    text-align: right;
}
.yh-custom-content-h5,
.yh-custom-content {
    width: 300px;
    height:400px;
    margin:0 auto;
    background:#fff;
}
.yh-custom .yh-edit-prompt {
    z-index:100;
}
/*yh-custom**************************************************************************/
/*选中框********************************************/
.yh-custom-selection {/*display: none;*/ position:absolute; z-index: 3;}
.yh-custom-selection p { 
    width:10px; 
    height:10px;  
    background:#ff0084; 
    position:absolute;
    cursor:ne-resize;
}
.yh-custom-selectTop p { 
    left:0; top:0; 
    margin:-5px 0 0 -5px; 
    cursor:nw-resize;
}
.yh-custom-selectRight p { left:0; top:0; margin:-5px 0 0 -5px; }
.yh-custom-selectBottom p { 
    left:100%; 
    top:0; 
    margin:-5px 0 0 -5px; 
    cursor:se-resize;
}
.yh-custom-selectLeft p { 
    left:0; top:100%; margin:-5px 0 0 -5px; 
    cursor:sw-resize;
}

.yh-custom-selectTop p.center,.yh-custom-selectBottom p.center {
    left:50%;
    top:50%;
    margin:-5px 0 0 -5px;
}
.yh-custom-selectTop p.rotate {
    border-radius:10px;
    left:50%;
    top:-24px;
    margin:0 0 0 -5px;
    cursor:pointer;
}
.yh-custom-selectTop p.rotate:after {
    width: 2px;
    height: 20px;
    content: "";
    background: #ff0084;
    position: absolute;
    left: 50%;
    top: 0;
    margin: 0 0 0 -1px;
}
.yh-custom-selectLeft p.center,.yh-custom-selectRight p.center {
    left:50%;
    top:50%;
    margin:-5px 0 0 -5px;
}
.yh-custom-selectLeft p.center {
    cursor:w-resize;
}
.yh-custom-selectRight p.center {
    cursor:e-resize;
}
.yh-custom-selectTop p.center{
    cursor:n-resize;
}
.yh-custom-selectBottom p.center {
    cursor:s-resize;
}
.yh-custom-selectTop,.yh-custom-selectBottom {border-top: 2px dashed #ff0084; }
.yh-custom-selectLeft,.yh-custom-selectRight {border-left: 2px dashed #ff0084; }
</style>