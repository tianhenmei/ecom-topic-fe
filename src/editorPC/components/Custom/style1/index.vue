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
}"></div> <a :lagou-href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'" target="_blank" class="yh-custom-base-element5 yh-custom-text-href yh-custom-href name-href" :href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'"></a></div> </div><div id="custom2" path="elements.2" draggable="false" yh-custom-text="yh-custom-text" class="yh-custom-base-element6"><div class="yh-custom-text-content"><div class="yh-custom-text yh-custom-base-element7 yh-custom-text-text" v-html="dealStringLine(100,30,3,props.data.slogan.value,false)" :style="{
color:props.css.slogan_color.value,
}"></div> <!----></div> </div><div id="custom3" path="elements.3" draggable="false" yh-custom-position="yh-custom-position" class="yh-custom-base-element8 yh-position"><div class="yh-custom-position-content position positionList clearfix" style="width: 250px; height: 150px; overflow: hidden;"><div class="yh-custom-position-one" style="padding-right: 0px; padding-bottom: 10px; float: left;" v-for="one in props.data.position.value" :dynamic_type="one.dynamic_type.value"><a :lagou-href="'https://www.lagou.com/jobs/'+one.positionId.value+'.html?source=pl&amp;i=pl-0'" target="_blank" class="yh-custom-base-element9 yh-custom-position-href yh-custom-href position-href" :href="'https://www.lagou.com/jobs/'+one.positionId.value+'.html'"><div class="yh-custom-position yh-custom-base-element10 yh-custom-position-position clearfix" :style="setPositionStyle"><div class="yh-custom-base-element11 yh-custom-position-name position" :style="{
color:props.css.position.value.positionName_color.value,
}">
{{one.positionName.value}}
</div> <div class="yh-custom-base-element12 yh-custom-position-salary salary" :style="{
color:props.css.position.value.salary_color.value,
}">
{{one.salary.value}}
</div></div></a></div></div> </div><div id="custom4" path="elements.4" draggable="false" yh-custom-button="yh-custom-button" class="yh-custom-base-element21"><div class="yh-custom-button-content"><div class="yh-custom-button yh-custom-base-element22 yh-custom-button-btn" :style="setmoreButtonStyle">{{props.data.more_button_text.value}}
</div> <a :lagou-href="'https://www.lagou.com/gongsi/j'+props.data.companyId.value+'.html'" target="_blank" class="yh-custom-base-element23 yh-custom-button-href yh-custom-href" :href="'https://www.lagou.com/gongsi/j'+props.data.companyId.value+'.html'"></a></div> </div>    
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

const baseData = {"id":"","ignorestatus":"","ischild":"","yh_data_name":"name","path":"","parentmodule":"","css":{"yhcustom_background":{"en":"background","cn":"背景设置","parent":"css","type":"uplist","value":{"background_type":{"cn":"背景类型","en":"background_type","value":"gradient-top-bottom","cnvalue":"上下渐变","type":"options","parent":"css.yhcustom_background.value","options":[{"cn":"纯背景色","value":"background-color"},{"cn":"背景图","value":"background-image"},{"cn":"上下渐变","value":"gradient-top-bottom"},{"cn":"左右渐变","value":"gradient-left-right"}],"effect":["css.yhcustom_background.value.background_color","css.yhcustom_background.value.background_image","css.yhcustom_background.value.background_repeat","css.yhcustom_background.value.gradient_color_top","css.yhcustom_background.value.gradient_color_bottom","css.yhcustom_background.value.gradient_color_left","css.yhcustom_background.value.gradient_color_right"]},"background_color":{"cn":"背景颜色","en":"background_color","value":"#ffffff","type":"color","parent":"css.yhcustom_background.value","condition":["background-color","background-image"],"status":false},"background_image":{"cn":"背景图","en":"background_image","value":"none","type":"image","mold":"bg","parent":"css.yhcustom_background.value","condition":["background-image"],"status":false},"background_repeat":{"cn":"背景重复","en":"background_repeat","value":"no-repeat","cnvalue":"不重复","type":"options","options":[{"cn":"不重复","value":"no-repeat"},{"cn":"重复","value":"repeat"},{"cn":"横向重复","value":"repeat-x"},{"cn":"纵向重复","value":"repeat-y"}],"parent":"css.yhcustom_background.value","condition":["background-image"],"status":false},"gradient_color_top":{"cn":"背景-上","en":"gradient_color_top","value":"#00FF00","type":"color","parent":"css.yhcustom_background.value","condition":["gradient-top-bottom"],"status":true},"gradient_color_bottom":{"cn":"背景-下","en":"gradient_color_bottom","value":"#FFFF00","type":"color","parent":"css.yhcustom_background.value","condition":["gradient-top-bottom"],"status":true},"gradient_color_left":{"cn":"背景-左","en":"gradient_color_left","value":"#ffffff","type":"color","parent":"css.yhcustom_background.value","condition":["gradient-left-right"],"status":false},"gradient_color_right":{"cn":"背景-右","en":"gradient_color_right","value":"#ffffff","type":"color","parent":"css.yhcustom_background.value","condition":["gradient-left-right"],"status":false}}},"name_color":{"cn":"公司名称","en":"name_color","value":"#FFFFFF","type":"color","parent":"css"},"slogan_color":{"cn":"slogan","en":"slogan_color","value":"#FFFFFF","type":"color","parent":"css"},"position":{"cn":"职位样式设置","en":"position","type":"uplist","name":"cn","parent":"css","value":{"positionName_color":{"cn":"职位颜色","en":"positionName_color","value":"#FF00FF","type":"color","parent":"css.position.value"},"salary_color":{"cn":"薪资颜色","en":"salary_color","value":"#FF0000","type":"color","parent":"css.position.value"},"position_background_type":{"cn":"背景类型","en":"position_background_type","value":"gradient-top-bottom","cnvalue":"上下渐变","type":"options","parent":"css.position.value","options":[{"cn":"纯背景色","value":"background-color"},{"cn":"背景图","value":"background-image"},{"cn":"上下渐变","value":"gradient-top-bottom"},{"cn":"左右渐变","value":"gradient-left-right"}],"effect":["css.position.value.position_background_color","css.position.value.position_background_image","css.position.value.position_background_repeat","css.position.value.position_gradient_color_top","css.position.value.position_gradient_color_bottom","css.position.value.position_gradient_color_left","css.position.value.position_gradient_color_right"]},"position_background_color":{"cn":"背景色","en":"position_background_color","value":"#ffffff","type":"color","parent":"css.position.value","condition":["background-color","background-image"],"status":false},"position_background_image":{"cn":"背景图","en":"position_background_image","value":"none","type":"image","mold":"bg","parent":"css.position.value","condition":["background-image"],"status":false},"position_background_repeat":{"cn":"背景重复","en":"position_background_repeat","value":"no-repeat","cnvalue":"不重复","type":"options","parent":"css.position.value","condition":["background-image"],"status":false,"options":[{"cn":"不重复","value":"no-repeat"},{"cn":"重复","value":"repeat"},{"cn":"横向重复","value":"repeat-x"},{"cn":"纵向重复","value":"repeat-y"}]},"position_gradient_color_top":{"cn":"背景-上","en":"position_gradient_color_top","value":"#FFFF00","type":"color","parent":"css.position.value","condition":["gradient-top-bottom"],"status":true},"position_gradient_color_bottom":{"cn":"背景-下","en":"position_gradient_color_bottom","value":"#00FF00","type":"color","parent":"css.position.value","condition":["gradient-top-bottom"],"status":true},"position_gradient_color_left":{"cn":"背景-左","en":"position_gradient_color_left","value":"#ffffff","type":"color","parent":"css.position.value","condition":["gradient-left-right"],"status":false},"position_gradient_color_right":{"cn":"背景-右","en":"position_gradient_color_right","value":"#ffffff","type":"color","parent":"css.position.value","condition":["gradient-left-right"],"status":false}}},"more_button":{"cn":"更多按钮设置","en":"more_button","type":"uplist","name":"cn","parent":"css","value":{"more_background_type":{"cn":"背景类型","en":"more_background_type","value":"gradient-top-bottom","cnvalue":"上下渐变","type":"options","parent":"css.more_button.value","options":[{"cn":"纯背景色","value":"background-color"},{"cn":"背景图","value":"background-image"},{"cn":"上下渐变","value":"gradient-top-bottom"},{"cn":"左右渐变","value":"gradient-left-right"}],"effect":["css.more_button.value.more_background_color","css.more_button.value.more_background_image","css.more_button.value.more_background_repeat","css.more_button.value.more_gradient_color_top","css.more_button.value.more_gradient_color_bottom","css.more_button.value.more_gradient_color_left","css.more_button.value.more_gradient_color_right"]},"more_background_color":{"cn":"背景色","en":"more_background_color","value":"#ff0084","type":"color","parent":"css.more_button.value","condition":["background-color","background-image"],"status":false},"more_background_image":{"cn":"背景图","en":"more_background_image","value":"none","type":"image","mold":"bg","parent":"css.more_button.value","condition":["background-image"],"status":false},"more_background_repeat":{"cn":"背景重复","en":"more_background_repeat","value":"no-repeat","cnvalue":"不重复","type":"options","parent":"css.more_button.value","condition":["background-image"],"status":false,"options":[{"cn":"不重复","value":"no-repeat"},{"cn":"重复","value":"repeat"},{"cn":"横向重复","value":"repeat-x"},{"cn":"纵向重复","value":"repeat-y"}]},"more_gradient_color_top":{"cn":"背景-上","en":"more_gradient_color_top","value":"#FFFF00","type":"color","parent":"css.more_button.value","condition":["gradient-top-bottom"],"status":true},"more_gradient_color_bottom":{"cn":"背景-下","en":"more_gradient_color_bottom","value":"#00FF00","type":"color","parent":"css.more_button.value","condition":["gradient-top-bottom"],"status":true},"more_gradient_color_left":{"cn":"背景-左","en":"more_gradient_color_left","value":"#ffffff","type":"color","parent":"css.more_button.value","condition":["gradient-left-right"],"status":false},"more_gradient_color_right":{"cn":"背景-右","en":"more_gradient_color_right","value":"#ffffff","type":"color","parent":"css.more_button.value","condition":["gradient-left-right"],"status":false},"more_color":{"cn":"文字色","en":"more_color","value":"#FF00FF","type":"color","parent":"css.more_button.value"}}}},"h5css":{"yhcustom_background":{"en":"background","cn":"背景设置","parent":"h5css","type":"uplist","value":{"background_type":{"cn":"背景类型","en":"background_type","value":"gradient-top-bottom","cnvalue":"上下渐变","type":"options","parent":"h5css.yhcustom_background.value","options":[{"cn":"纯背景色","value":"background-color"},{"cn":"背景图","value":"background-image"},{"cn":"上下渐变","value":"gradient-top-bottom"},{"cn":"左右渐变","value":"gradient-left-right"}],"effect":["h5css.yhcustom_background.value.background_color","h5css.yhcustom_background.value.background_image","h5css.yhcustom_background.value.background_repeat","h5css.yhcustom_background.value.gradient_color_top","h5css.yhcustom_background.value.gradient_color_bottom","h5css.yhcustom_background.value.gradient_color_left","h5css.yhcustom_background.value.gradient_color_right"]},"background_color":{"cn":"背景颜色","en":"background_color","value":"#ffffff","type":"color","parent":"h5css.yhcustom_background.value","condition":["background-color","background-image"],"status":false},"background_image":{"cn":"背景图","en":"background_image","value":"none","type":"image","mold":"bg","parent":"h5css.yhcustom_background.value","condition":["background-image"],"status":false},"background_repeat":{"cn":"背景重复","en":"background_repeat","value":"no-repeat","cnvalue":"不重复","type":"options","options":[{"cn":"不重复","value":"no-repeat"},{"cn":"重复","value":"repeat"},{"cn":"横向重复","value":"repeat-x"},{"cn":"纵向重复","value":"repeat-y"}],"parent":"h5css.yhcustom_background.value","condition":["background-image"],"status":false},"gradient_color_top":{"cn":"背景-上","en":"gradient_color_top","value":"#00FF00","type":"color","parent":"h5css.yhcustom_background.value","condition":["gradient-top-bottom"],"status":true},"gradient_color_bottom":{"cn":"背景-下","en":"gradient_color_bottom","value":"#FFFF00","type":"color","parent":"h5css.yhcustom_background.value","condition":["gradient-top-bottom"],"status":true},"gradient_color_left":{"cn":"背景-左","en":"gradient_color_left","value":"#ffffff","type":"color","parent":"h5css.yhcustom_background.value","condition":["gradient-left-right"],"status":false},"gradient_color_right":{"cn":"背景-右","en":"gradient_color_right","value":"#ffffff","type":"color","parent":"h5css.yhcustom_background.value","condition":["gradient-left-right"],"status":false}}},"more_button":{"cn":"更多按钮设置","en":"more_button","type":"uplist","name":"cn","parent":"h5css","value":{"more_background_type":{"cn":"背景类型","en":"more_background_type","value":"gradient-top-bottom","cnvalue":"上下渐变","type":"options","parent":"h5css.more_button.value","options":[{"cn":"纯背景色","value":"background-color"},{"cn":"背景图","value":"background-image"},{"cn":"上下渐变","value":"gradient-top-bottom"},{"cn":"左右渐变","value":"gradient-left-right"}],"effect":["h5css.more_button.value.more_background_color","h5css.more_button.value.more_background_image","h5css.more_button.value.more_background_repeat","h5css.more_button.value.more_gradient_color_top","h5css.more_button.value.more_gradient_color_bottom","h5css.more_button.value.more_gradient_color_left","h5css.more_button.value.more_gradient_color_right"]},"more_background_color":{"cn":"背景色","en":"more_background_color","value":"#ff0084","type":"color","parent":"h5css.more_button.value","condition":["background-color","background-image"],"status":false},"more_background_image":{"cn":"背景图","en":"more_background_image","value":"none","type":"image","mold":"bg","parent":"h5css.more_button.value","condition":["background-image"],"status":false},"more_background_repeat":{"cn":"背景重复","en":"more_background_repeat","value":"no-repeat","cnvalue":"不重复","type":"options","parent":"h5css.more_button.value","condition":["background-image"],"status":false,"options":[{"cn":"不重复","value":"no-repeat"},{"cn":"重复","value":"repeat"},{"cn":"横向重复","value":"repeat-x"},{"cn":"纵向重复","value":"repeat-y"}]},"more_gradient_color_top":{"cn":"背景-上","en":"more_gradient_color_top","value":"#FFFF00","type":"color","parent":"h5css.more_button.value","condition":["gradient-top-bottom"],"status":true},"more_gradient_color_bottom":{"cn":"背景-下","en":"more_gradient_color_bottom","value":"#00FF00","type":"color","parent":"h5css.more_button.value","condition":["gradient-top-bottom"],"status":true},"more_gradient_color_left":{"cn":"背景-左","en":"more_gradient_color_left","value":"#ffffff","type":"color","parent":"h5css.more_button.value","condition":["gradient-left-right"],"status":false},"more_gradient_color_right":{"cn":"背景-右","en":"more_gradient_color_right","value":"#ffffff","type":"color","parent":"h5css.more_button.value","condition":["gradient-left-right"],"status":false},"more_color":{"cn":"文字色","en":"more_color","value":"#FF00FF","type":"color","parent":"h5css.more_button.value"}}}},"common":{},"attribute":{},"data":{"toH5":{"cn":"适配移动端","en":"toH5","value":1,"type":"checkbox","parent":"data"},"toPC":{"cn":"适配到PC","en":"toPC","value":1,"type":"checkbox","parent":"data"},"anchorID":{"cn":"锚点ID","en":"anchorID","value":"","type":"text","parent":"data"},"companyId":{"cn":"公司ID","en":"companyId","value":147,"type":"request","parent":"data"},"logo":{"cn":"公司logo","en":"logo","value":"https://www.lagou.com/topic/static/img/newEdit/topImg.png","type":"image","mold":"src","parent":"data"},"name":{"cn":"公司名称","en":"name","value":"公司名称","type":"text","parent":"data"},"slogan":{"cn":"slogan","en":"slogan","value":"我是文字，我是文字，我是文字～～～","type":"textarea","parent":"data"},"position":{"cn":"职位设置","en":"position","type":"uplist","name":"positionName","parent":"data","removeStatus":true,"value":[{"dynamic_type":{"cn":"职位类别","en":"dynamic_type","value":"设计","type":"none","parent":"data.position.value"},"positionId":{"cn":"职位ID","en":"positionId","value":"1777398","type":"request","parent":"data.position.value"},"positionName":{"cn":"职位名称","en":"positionName","value":"web前端开发","type":"text","parent":"data.position.value"},"salary":{"cn":"职位薪资","en":"salary","value":"10k-20k","type":"text","parent":"data.position.value"}},{"dynamic_type":{"cn":"职位类别","en":"dynamic_type","value":"设计","type":"none","parent":"data.position.value"},"positionId":{"cn":"职位ID","en":"positionId","value":"1777398","type":"request","parent":"data.position.value"},"positionName":{"cn":"职位名称","en":"positionName","value":"UI设计师","type":"text","parent":"data.position.value"},"salary":{"cn":"职位薪资","en":"salary","value":"7k-12k","type":"text","parent":"data.position.value"}},{"dynamic_type":{"cn":"职位类别","en":"dynamic_type","value":"设计","type":"none","parent":"data.position.value"},"positionId":{"cn":"职位ID","en":"positionId","value":"1777398","type":"request","parent":"data.position.value"},"positionName":{"cn":"职位名称","en":"positionName","value":"UI设计师","type":"text","parent":"data.position.value"},"salary":{"cn":"职位薪资","en":"salary","value":"7k-12k","type":"text","parent":"data.position.value"}}]},"more_button_text":{"cn":"更多文字","en":"more_button_text","value":"查看更多职位","type":"text","parent":"data","parentSetStatus":"common"}},"positionData":{"dynamic_type":{"cn":"职位类别","en":"dynamic_type","value":"设计","type":"none","parent":"data.position.value"},"positionId":{"cn":"职位ID","en":"positionId","value":"1777398","type":"request","parent":"data.position.value"},"positionName":{"cn":"职位名称","en":"positionName","value":"UI设计师","type":"text","parent":"data.position.value"},"salary":{"cn":"职位薪资","en":"salary","value":"7k-12k","type":"text","parent":"data.position.value"}}}
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
            setPositionStyle(){
                let style = ''
                switch(this.props.css.position.value.position_background_type.value){
                    case 'background-color':
                        style += 'background:'+this.props.css.position.value.position_background_color.value+'; '
                    break;
                    case 'background-image':
                        style += 'background:'+this.props.css.position.value.position_background_color.value+' '+
                            (this.props.css.position.value.position_background_image.value == 'none' || this.props.css.position.value.position_background_image.value == 'undefined' ? 'none' : 'url('+this.props.css.position.value.position_background_image.value+')')+' '+
                            this.props.css.position.value.position_background_repeat.value+'; '
                    break;
                    case 'gradient-top-bottom':
                        style += ''+
                            'background:'+this.props.css.position.value.position_gradient_color_top.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.position.value.position_gradient_color_top.value+',endcolorstr='+this.props.css.position.value.position_gradient_color_bottom.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.position.value.position_gradient_color_top.value+',endcolorstr='+this.props.css.position.value.position_gradient_color_bottom.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(top, '+this.props.css.position.value.position_gradient_color_top.value+'), '+this.props.css.position.value.position_gradient_color_bottom.value+'); '+
                            'background:-o-linear-gradient(top, '+this.props.css.position.value.position_gradient_color_top.value+'), '+this.props.css.position.value.position_gradient_color_bottom.value+'); '+
                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.props.css.position.value.position_gradient_color_top.value+'),color-stop(100%,'+this.props.css.position.value.position_gradient_color_bottom.value+'));'+ 
                            ''
                    break;
                    case 'gradient-left-right':
                        style += ''+
                            'background:'+this.props.css.position.value.position_gradient_color_left.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.position.value.position_gradient_color_left.value+',endcolorstr='+this.props.css.position.value.position_gradient_color_right.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.position.value.position_gradient_color_left.value+',endcolorstr='+this.props.css.position.value.position_gradient_color_right.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(left, '+this.props.css.position.value.position_gradient_color_left.value+'), '+this.props.css.position.value.position_gradient_color_right.value+'); '+
                            'background:-o-linear-gradient(left, '+this.props.css.position.value.position_gradient_color_left.value+'), '+this.props.css.position.value.position_gradient_color_right.value+'); '+
                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.props.css.position.value.position_gradient_color_left.value+'),color-stop(100%,'+this.props.css.position.value.position_gradient_color_right.value+'));'+
                            ''
                    break;
                }
                return style
            },
            setmoreButtonStyle(){
                let style = ''+
                    'color:'+this.props.css.more_button.value.more_color.value+'; '
                switch(this.props.css.more_button.value.more_background_type.value){
                    case 'background-color':
                        style += 'background:'+this.props.css.more_button.value.more_background_color.value+'; '
                    break;
                    case 'background-image':
                        style += 'background:'+this.props.css.more_button.value.more_background_color.value+' '+
                            (this.props.css.more_button.value.more_background_image.value == 'none' || this.props.css.more_button.value.more_background_image.value == 'undefined' ? 'none' : 'url('+this.props.css.more_button.value.more_background_image.value+')')+' '+
                            this.props.css.more_button.value.more_background_repeat.value+'; '
                    break;
                    case 'gradient-top-bottom':
                        style += ''+
                            'background:'+this.props.css.more_button.value.more_gradient_color_top.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.more_button.value.more_gradient_color_top.value+',endcolorstr='+this.props.css.more_button.value.more_gradient_color_bottom.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.more_button.value.more_gradient_color_top.value+',endcolorstr='+this.props.css.more_button.value.more_gradient_color_bottom.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(top, '+this.props.css.more_button.value.more_gradient_color_top.value+'), '+this.props.css.more_button.value.more_gradient_color_bottom.value+'); '+
                            'background:-o-linear-gradient(top, '+this.props.css.more_button.value.more_gradient_color_top.value+'), '+this.props.css.more_button.value.more_gradient_color_bottom.value+'); '+
                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.props.css.more_button.value.more_gradient_color_top.value+'),color-stop(100%,'+this.props.css.more_button.value.more_gradient_color_bottom.value+'));'+ 
                            ''
                    break;
                    case 'gradient-left-right':
                        style += ''+
                            'background:'+this.props.css.more_button.value.more_gradient_color_left.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.more_button.value.more_gradient_color_left.value+',endcolorstr='+this.props.css.more_button.value.more_gradient_color_right.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.css.more_button.value.more_gradient_color_left.value+',endcolorstr='+this.props.css.more_button.value.more_gradient_color_right.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(left, '+this.props.css.more_button.value.more_gradient_color_left.value+'), '+this.props.css.more_button.value.more_gradient_color_right.value+'); '+
                            'background:-o-linear-gradient(left, '+this.props.css.more_button.value.more_gradient_color_left.value+'), '+this.props.css.more_button.value.more_gradient_color_right.value+'); '+
                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.props.css.more_button.value.more_gradient_color_left.value+'),color-stop(100%,'+this.props.css.more_button.value.more_gradient_color_right.value+'));'+
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