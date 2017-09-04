<style>
    @import "./index.css";
</style>
<template>
    <div class="custom-style1 yh-custom-base-element00" :id="props.id" yh-module="Custom_style1" 
        :ref="props.id" 
        :style="setCustomBackgroundStyle"
         
        @click.stop="setAll">

<div id="custom0" path="elements.0" draggable="false" yh-custom-image="yh-custom-image" class="yh-custom-base-element0"><div class="yh-custom-image-content"><img :src="props.data.logo.value" class="yh-custom-image yh-custom-base-element1 yh-custom-image-img logo"> <a :lagou-href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'" target="_blank" class="yh-custom-base-element2 yh-custom-image-href yh-custom-href logo-href" :href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'"></a></div> </div><div id="custom1" path="elements.1" draggable="false" yh-custom-text="yh-custom-text" class="yh-custom-base-element3"><div class="yh-custom-text-content"><div class="yh-custom-text yh-custom-base-element4 yh-custom-text-text" v-html="props.data.name.value" :style="{
color:props.css.name_color.value,
}"></div> <a :lagou-href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'" target="_blank" class="yh-custom-base-element5 yh-custom-text-href yh-custom-href name-href" :href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'"></a></div> </div><div id="custom2" path="elements.2" draggable="false" yh-custom-button="yh-custom-button" class="yh-custom-base-element6"><div class="yh-custom-button-content"><div class="yh-custom-button yh-custom-base-element7 yh-custom-button-btn" :style="setbuttonButtonStyle">{{props.data.button_button_text.value}}
</div> <a :lagou-href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'" target="_blank" class="yh-custom-base-element8 yh-custom-button-href yh-custom-href" :href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'"></a></div> </div>    
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
        recoveryChildElementsData,
        dealStringLine
    } from "../../Base/Node.js"
    import YHEditComplicated from "../../../components-edit/yh-edit-complicated.vue"

const baseData = {"id":"","ignorestatus":"","ischild":"","yh_data_name":"name","path":"","parentmodule":"","css":{"yhcustom_background":{"en":"background","cn":"背景设置","parent":"css","type":"uplist","value":{"background_type":{"cn":"背景类型","en":"background_type","value":"background-color","cnvalue":"纯背景色","type":"options","parent":"css.yhcustom_background.value","options":[{"cn":"纯背景色","value":"background-color"},{"cn":"背景图","value":"background-image"},{"cn":"上下渐变","value":"gradient-top-bottom"},{"cn":"左右渐变","value":"gradient-left-right"}],"effect":["css.yhcustom_background.value.background_color","css.yhcustom_background.value.background_image","css.yhcustom_background.value.background_repeat","css.yhcustom_background.value.gradient_color_top","css.yhcustom_background.value.gradient_color_bottom","css.yhcustom_background.value.gradient_color_left","css.yhcustom_background.value.gradient_color_right"]},"background_color":{"cn":"背景颜色","en":"background_color","value":"#ffffff","type":"color","parent":"css.yhcustom_background.value","condition":["background-color","background-image"],"status":true},"background_image":{"cn":"背景图","en":"background_image","value":"none","type":"image","mold":"bg","parent":"css.yhcustom_background.value","condition":["background-image"],"status":false},"background_repeat":{"cn":"背景重复","en":"background_repeat","value":"no-repeat","cnvalue":"不重复","type":"options","options":[{"cn":"不重复","value":"no-repeat"},{"cn":"重复","value":"repeat"},{"cn":"横向重复","value":"repeat-x"},{"cn":"纵向重复","value":"repeat-y"}],"parent":"css.yhcustom_background.value","condition":["background-image"],"status":false},"gradient_color_top":{"cn":"背景-上","en":"gradient_color_top","value":"#ffffff","type":"color","parent":"css.yhcustom_background.value","condition":["gradient-top-bottom"],"status":false},"gradient_color_bottom":{"cn":"背景-下","en":"gradient_color_bottom","value":"#ffffff","type":"color","parent":"css.yhcustom_background.value","condition":["gradient-top-bottom"],"status":false},"gradient_color_left":{"cn":"背景-左","en":"gradient_color_left","value":"#ffffff","type":"color","parent":"css.yhcustom_background.value","condition":["gradient-left-right"],"status":false},"gradient_color_right":{"cn":"背景-右","en":"gradient_color_right","value":"#ffffff","type":"color","parent":"css.yhcustom_background.value","condition":["gradient-left-right"],"status":false}}},"name_color":{"cn":"公司名称","en":"name_color","value":"#666666","type":"color","parent":"css"},"button_button":{"cn":"按钮按钮设置","en":"button_button","type":"uplist","name":"cn","parent":"css","value":{"button_background_type":{"cn":"背景类型","en":"button_background_type","value":"background-color","cnvalue":"纯背景色","type":"options","parent":"css.button_button.value","options":[{"cn":"纯背景色","value":"background-color"},{"cn":"背景图","value":"background-image"},{"cn":"上下渐变","value":"gradient-top-bottom"},{"cn":"左右渐变","value":"gradient-left-right"}],"effect":["css.button_button.value.button_background_color","css.button_button.value.button_background_image","css.button_button.value.button_background_repeat","css.button_button.value.button_gradient_color_top","css.button_button.value.button_gradient_color_bottom","css.button_button.value.button_gradient_color_left","css.button_button.value.button_gradient_color_right"]},"button_background_color":{"cn":"背景色","en":"button_background_color","value":"#ff0084","type":"color","parent":"css.button_button.value","condition":["background-color","background-image"],"status":true},"button_background_image":{"cn":"背景图","en":"button_background_image","value":"none","type":"image","mold":"bg","parent":"css.button_button.value","condition":["background-image"],"status":false},"button_background_repeat":{"cn":"背景重复","en":"button_background_repeat","value":"no-repeat","cnvalue":"不重复","type":"options","parent":"css.button_button.value","condition":["background-image"],"status":false,"options":[{"cn":"不重复","value":"no-repeat"},{"cn":"重复","value":"repeat"},{"cn":"横向重复","value":"repeat-x"},{"cn":"纵向重复","value":"repeat-y"}]},"button_gradient_color_top":{"cn":"背景-上","en":"button_gradient_color_top","value":"#ffffff","type":"color","parent":"css.button_button.value","condition":["gradient-top-bottom"],"status":false},"button_gradient_color_bottom":{"cn":"背景-下","en":"button_gradient_color_bottom","value":"#ffffff","type":"color","parent":"css.button_button.value","condition":["gradient-top-bottom"],"status":false},"button_gradient_color_left":{"cn":"背景-左","en":"button_gradient_color_left","value":"#ffffff","type":"color","parent":"css.button_button.value","condition":["gradient-left-right"],"status":false},"button_gradient_color_right":{"cn":"背景-右","en":"button_gradient_color_right","value":"#ffffff","type":"color","parent":"css.button_button.value","condition":["gradient-left-right"],"status":false},"button_color":{"cn":"文字色","en":"button_color","value":"#ffffff","type":"color","parent":"css.button_button.value"}}}},"h5css":{"yhcustom_background":{"en":"background","cn":"背景设置","parent":"h5css","type":"uplist","value":{"background_type":{"cn":"背景类型","en":"background_type","value":"background-color","cnvalue":"纯背景色","type":"options","parent":"h5css.yhcustom_background.value","options":[{"cn":"纯背景色","value":"background-color"},{"cn":"背景图","value":"background-image"},{"cn":"上下渐变","value":"gradient-top-bottom"},{"cn":"左右渐变","value":"gradient-left-right"}],"effect":["h5css.yhcustom_background.value.background_color","h5css.yhcustom_background.value.background_image","h5css.yhcustom_background.value.background_repeat","h5css.yhcustom_background.value.gradient_color_top","h5css.yhcustom_background.value.gradient_color_bottom","h5css.yhcustom_background.value.gradient_color_left","h5css.yhcustom_background.value.gradient_color_right"]},"background_color":{"cn":"背景颜色","en":"background_color","value":"#ffffff","type":"color","parent":"h5css.yhcustom_background.value","condition":["background-color","background-image"],"status":true},"background_image":{"cn":"背景图","en":"background_image","value":"none","type":"image","mold":"bg","parent":"h5css.yhcustom_background.value","condition":["background-image"],"status":false},"background_repeat":{"cn":"背景重复","en":"background_repeat","value":"no-repeat","cnvalue":"不重复","type":"options","options":[{"cn":"不重复","value":"no-repeat"},{"cn":"重复","value":"repeat"},{"cn":"横向重复","value":"repeat-x"},{"cn":"纵向重复","value":"repeat-y"}],"parent":"h5css.yhcustom_background.value","condition":["background-image"],"status":false},"gradient_color_top":{"cn":"背景-上","en":"gradient_color_top","value":"#ffffff","type":"color","parent":"h5css.yhcustom_background.value","condition":["gradient-top-bottom"],"status":false},"gradient_color_bottom":{"cn":"背景-下","en":"gradient_color_bottom","value":"#ffffff","type":"color","parent":"h5css.yhcustom_background.value","condition":["gradient-top-bottom"],"status":false},"gradient_color_left":{"cn":"背景-左","en":"gradient_color_left","value":"#ffffff","type":"color","parent":"h5css.yhcustom_background.value","condition":["gradient-left-right"],"status":false},"gradient_color_right":{"cn":"背景-右","en":"gradient_color_right","value":"#ffffff","type":"color","parent":"h5css.yhcustom_background.value","condition":["gradient-left-right"],"status":false}}}},"common":{},"attribute":{},"data":{"toH5":{"cn":"适配移动端","en":"toH5","value":1,"type":"checkbox","parent":"data"},"toPC":{"cn":"适配到PC","en":"toPC","value":1,"type":"checkbox","parent":"data"},"anchorID":{"cn":"锚点ID","en":"anchorID","value":"","type":"text","parent":"data"},"companyId":{"cn":"公司ID","en":"companyId","value":147,"type":"request","parent":"data"},"logo":{"cn":"公司logo","en":"logo","value":"https://www.lagou.com/topic/static/img/newEdit/topImg.png","type":"image","mold":"src","parent":"data"},"name":{"cn":"公司名称","en":"name","value":"公司名称","type":"text","parent":"data"},"button_button_text":{"cn":"按钮文字","en":"button_button_text","value":"我是按钮","type":"text","parent":"data"}}}
    export default {
        props:["props","path","parentmodule"],
        components:{
            "yh-edit-complicated":YHEditComplicated
        },
        data(){
            return {
            }
        },
        mounted(){
        },
        computed:{
            setCustomBackgroundStyle(){
                let style = ''
                switch(this.props.css.yhcustom_background.value.background_type.value){
                    case 'background-color':
                        style += 'background:'+this.props.css.yhcustom_background.value.background_color.value+'; '
                    break;
                    case 'background-image':
                        style += 'background:'+this.props.css.yhcustom_background.value.background_color.value+' '+
                            (this.props.css.yhcustom_background.value.background_image.value == 'none' || this.props.css.yhcustom_background.value.background_image.value == 'undefined' ? 'none' : 'url('+this.props.css.yhcustom_background.value.background_image.value+')')+' '+
                            this.props.css.yhcustom_background.value.background_repeat.value+'; '
                    break;
                    case 'gradient-top-bottom':
                        style += ''+
                            'background:'+this.props.css.yhcustom_background.value.gradient_color_top.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.yhcustom_background.value.gradient_color_top.value+',endcolorstr='+this.props.css.yhcustom_background.value.gradient_color_bottom.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.yhcustom_background.value.gradient_color_top.value+',endcolorstr='+this.props.css.yhcustom_background.value.gradient_color_bottom.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(top, '+this.props.css.yhcustom_background.value.gradient_color_top.value+'), '+this.props.css.yhcustom_background.value.gradient_color_bottom.value+'); '+
                            'background:-o-linear-gradient(top, '+this.props.css.yhcustom_background.value.gradient_color_top.value+'), '+this.props.css.yhcustom_background.value.gradient_color_bottom.value+'); '+
                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.props.css.yhcustom_background.value.gradient_color_top.value+'),color-stop(100%,'+this.props.css.yhcustom_background.value.gradient_color_bottom.value+'));'+ 
                            ''
                    break;
                    case 'gradient-left-right':
                        style += ''+
                            'background:'+this.props.css.yhcustom_background.value.gradient_color_left.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.yhcustom_background.value.gradient_color_left.value+',endcolorstr='+this.props.css.yhcustom_background.value.gradient_color_right.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.yhcustom_background.value.gradient_color_left.value+',endcolorstr='+this.props.css.yhcustom_background.value.gradient_color_right.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(left, '+this.props.css.yhcustom_background.value.gradient_color_left.value+'), '+this.props.css.yhcustom_background.value.gradient_color_right.value+'); '+
                            'background:-o-linear-gradient(left, '+this.props.css.yhcustom_background.value.gradient_color_left.value+'), '+this.props.css.yhcustom_background.value.gradient_color_right.value+'); '+
                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.props.css.yhcustom_background.value.gradient_color_left.value+'),color-stop(100%,'+this.props.css.yhcustom_background.value.gradient_color_right.value+'));'+
                            ''
                    break;
                }
                return style
            },
            setbuttonButtonStyle(){
                let style = ''+
                    'color:'+this.props.css.button_button.value.button_color.value+'; '
                switch(this.props.css.button_button.value.button_background_type.value){
                    case 'background-color':
                        style += 'background:'+this.props.css.button_button.value.button_background_color.value+'; '
                    break;
                    case 'background-image':
                        style += 'background:'+this.props.css.button_button.value.button_background_color.value+' '+
                            (this.props.css.button_button.value.button_background_image.value == 'none' || this.props.css.button_button.value.button_background_image.value == 'undefined' ? 'none' : 'url('+this.props.css.button_button.value.button_background_image.value+')')+' '+
                            this.props.css.button_button.value.button_background_repeat.value+'; '
                    break;
                    case 'gradient-top-bottom':
                        style += ''+
                            'background:'+this.props.css.button_button.value.button_gradient_color_top.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.button_button.value.button_gradient_color_top.value+',endcolorstr='+this.props.css.button_button.value.button_gradient_color_bottom.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.button_button.value.button_gradient_color_top.value+',endcolorstr='+this.props.css.button_button.value.button_gradient_color_bottom.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(top, '+this.props.css.button_button.value.button_gradient_color_top.value+'), '+this.props.css.button_button.value.button_gradient_color_bottom.value+'); '+
                            'background:-o-linear-gradient(top, '+this.props.css.button_button.value.button_gradient_color_top.value+'), '+this.props.css.button_button.value.button_gradient_color_bottom.value+'); '+
                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.props.css.button_button.value.button_gradient_color_top.value+'),color-stop(100%,'+this.props.css.button_button.value.button_gradient_color_bottom.value+'));'+ 
                            ''
                    break;
                    case 'gradient-left-right':
                        style += ''+
                            'background:'+this.props.css.button_button.value.button_gradient_color_left.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.button_button.value.button_gradient_color_left.value+',endcolorstr='+this.props.css.button_button.value.button_gradient_color_right.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.button_button.value.button_gradient_color_left.value+',endcolorstr='+this.props.css.button_button.value.button_gradient_color_right.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(left, '+this.props.css.button_button.value.button_gradient_color_left.value+'), '+this.props.css.button_button.value.button_gradient_color_right.value+'); '+
                            'background:-o-linear-gradient(left, '+this.props.css.button_button.value.button_gradient_color_left.value+'), '+this.props.css.button_button.value.button_gradient_color_right.value+'); '+
                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.props.css.button_button.value.button_gradient_color_left.value+'),color-stop(100%,'+this.props.css.button_button.value.button_gradient_color_right.value+'));'+
                        ''
                    break;
                }
                return style
            },
        },
        methods:{
            dealStringLine,
            resetData(data){
                return updateData(data,baseData)
            },
            setAll(e){
                let id = initSelected(e)
                this.$refs[id].className += " setting"
                let yh_edit_layer = this.$refs["yh-edit-complicated"].$refs[id+"-yh-edit-layer"]
                yh_edit_layer.className = yh_edit_layer.className.replace(/( hide)/g,"")
                settingBox(this.$refs[id],this.props.ischild)
            },
            recoveryModuleData(elem,baseData){
                let data = {},
                    attr = "",
                    current = null,
                    currentChild = null,
                    i = 0,curr = "",
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
                recoveryChildElementsData(elem,baseData,components,"ignorestatus"),
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