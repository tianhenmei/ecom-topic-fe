<style>
    @import "./index.css";
</style>
<template>
    <div class="custom-style1 yh-custom-base-element00" :id="props.id" yh-module="Custom_style1" 
        :ref="props.id" 
        :style="setCustomBackgroundStyle"
    >
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
    </div>
</template>
<script>
    import {
        dealStringLine
    } from "../../../components/Base/Node.js"
    export default {
        props:["props","path","parentmodule"],
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
},
    }
</script>