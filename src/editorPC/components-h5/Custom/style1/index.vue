<style>
    @import "./index.css";
</style>
<template>
    <div class="custom-style1 yh-custom-base-element00" :id="props.id" yh-module="Custom_style1" 
        :ref="props.id" 
        :style="setCustomBackgroundStyle"
        >

<div id="custom_h0" path="elements_h.0" draggable="false" yh-custom-image="yh-custom-image" class="yh-custom-base-element0"><div class="yh-custom-image-content"><img :src="props.data.logo.value" class="yh-custom-image yh-custom-base-element1 yh-custom-image-img logo"> <a :lagou-href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'" target="_blank" class="yh-custom-base-element2 yh-custom-image-href yh-custom-href logo-href" :href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'"></a></div> </div><div id="custom_h1" path="elements_h.1" draggable="false" yh-custom-button="yh-custom-button" class="yh-custom-base-element3"><div class="yh-custom-button-content"><div class="yh-custom-button yh-custom-base-element4 yh-custom-button-btn" :style="setmoreButtonStyle">{{props.data.more_button_text.value}}
</div> <a :lagou-href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'" target="_blank" class="yh-custom-base-element5 yh-custom-button-href yh-custom-href" :href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'"></a></div> </div>    
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
                switch(this.props.h5css.yhcustom_background.value.background_type.value){
                    case 'background-color':
                        style += 'background:'+this.props.h5css.yhcustom_background.value.background_color.value+'; '
                    break;
                    case 'background-image':
                        style += 'background:'+this.propsh5.css.yhcustom_background.value.background_color.value+' '+
                            (this.props.h5css.yhcustom_background.value.background_image.value == 'none' || this.props.h5css.yhcustom_background.value.background_image.value == 'undefined' ? 'none' : 'url('+this.props.h5css.yhcustom_background.value.background_image.value+')')+' '+
                            this.props.h5css.yhcustom_background.value.background_repeat.value+'; '
                    break;
                    case 'gradient-top-bottom':
                        style += ''+
                            'background:'+this.props.h5css.yhcustom_background.value.gradient_color_top.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.h5css.yhcustom_background.value.gradient_color_top.value+',endcolorstr='+this.props.h5css.yhcustom_background.value.gradient_color_bottom.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.h5css.yhcustom_background.value.gradient_color_top.value+',endcolorstr='+this.props.h5css.yhcustom_background.value.gradient_color_bottom.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(top, '+this.props.h5css.yhcustom_background.value.gradient_color_top.value+'), '+this.props.h5css.yhcustom_background.value.gradient_color_bottom.value+'); '+
                            'background:-o-linear-gradient(top, '+this.props.h5css.yhcustom_background.value.gradient_color_top.value+'), '+this.props.h5css.yhcustom_background.value.gradient_color_bottom.value+'); '+
                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.props.h5css.yhcustom_background.value.gradient_color_top.value+'),color-stop(100%,'+this.props.h5css.yhcustom_background.value.gradient_color_bottom.value+'));'+ 
                            ''
                    break;
                    case 'gradient-left-right':
                        style += ''+
                            'background:'+this.props.h5css.yhcustom_background.value.gradient_color_left.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.h5css.yhcustom_background.value.gradient_color_left.value+',endcolorstr='+this.props.h5css.yhcustom_background.value.gradient_color_right.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.h5css.yhcustom_background.value.gradient_color_left.value+',endcolorstr='+this.props.h5css.yhcustom_background.value.gradient_color_right.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(left, '+this.props.h5css.yhcustom_background.value.gradient_color_left.value+'), '+this.props.h5css.yhcustom_background.value.gradient_color_right.value+'); '+
                            'background:-o-linear-gradient(left, '+this.props.h5css.yhcustom_background.value.gradient_color_left.value+'), '+this.props.h5css.yhcustom_background.value.gradient_color_right.value+'); '+
                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.props.h5css.yhcustom_background.value.gradient_color_left.value+'),color-stop(100%,'+this.props.h5css.yhcustom_background.value.gradient_color_right.value+'));'+
                            ''
                    break;
                }
                return style
            },
            setmoreButtonStyle(){
                let style = ''+
                    'color:'+this.props.h5css.more_button.value.more_color.value+'; '
                switch(this.props.h5css.more_button.value.more_background_type.value){
                    case 'background-color':
                        style += 'background:'+this.props.h5css.more_button.value.more_background_color.value+'; '
                    break;
                    case 'background-image':
                        style += 'background:'+this.props.h5css.more_button.value.more_background_color.value+' '+
                            (this.props.h5css.more_button.value.more_background_image.value == 'none' || this.props.h5css.more_button.value.more_background_image.value == 'undefined' ? 'none' : 'url('+this.props.h5css.more_button.value.more_background_image.value+')')+' '+
                            this.props.h5css.more_button.value.more_background_repeat.value+'; '
                    break;
                    case 'gradient-top-bottom':
                        style += ''+
                            'background:'+this.props.h5css.more_button.value.more_gradient_color_top.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.h5css.more_button.value.more_gradient_color_top.value+',endcolorstr='+this.props.h5css.more_button.value.more_gradient_color_bottom.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.h5css.more_button.value.more_gradient_color_top.value+',endcolorstr='+this.props.h5css.more_button.value.more_gradient_color_bottom.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(top, '+this.props.h5css.more_button.value.more_gradient_color_top.value+'), '+this.props.h5css.more_button.value.more_gradient_color_bottom.value+'); '+
                            'background:-o-linear-gradient(top, '+this.props.h5css.more_button.value.more_gradient_color_top.value+'), '+this.props.h5css.more_button.value.more_gradient_color_bottom.value+'); '+
                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.props.h5css.more_button.value.more_gradient_color_top.value+'),color-stop(100%,'+this.props.h5css.more_button.value.more_gradient_color_bottom.value+'));'+ 
                            ''
                    break;
                    case 'gradient-left-right':
                        style += ''+
                            'background:'+this.props.h5css.more_button.value.more_gradient_color_left.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.h5css.more_button.value.more_gradient_color_left.value+',endcolorstr='+this.props.h5css.more_button.value.more_gradient_color_right.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.props.h5css.more_button.value.more_gradient_color_left.value+',endcolorstr='+this.props.h5css.more_button.value.more_gradient_color_right.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(left, '+this.props.h5css.more_button.value.more_gradient_color_left.value+'), '+this.props.h5css.more_button.value.more_gradient_color_right.value+'); '+
                            'background:-o-linear-gradient(left, '+this.props.h5css.more_button.value.more_gradient_color_left.value+'), '+this.props.h5css.more_button.value.more_gradient_color_right.value+'); '+
                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.props.h5css.more_button.value.more_gradient_color_left.value+'),color-stop(100%,'+this.props.h5css.more_button.value.more_gradient_color_right.value+'));'+
                        ''
                    break;
                }
                return style
            },
        },
        methods:{
            dealStringLine
        },
    }
</script>