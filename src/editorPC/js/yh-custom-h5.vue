<template>
    <div class="yh-custom-content-h5"
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
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        components:{
        },
        computed:{
            ...mapState([
                'custom',
                'customStatus',
                'connhost'
            ]),
            setCustomStyleH5(){
                let style = 'width:'+this.custom.h5css.width.value+'px; '+
                    'height:'+this.custom.h5css.height.value+'px; '+
                    // 'backgroundColor:'+this.custom.h5css.background_color.value+'; '+
                    // 'backgroundImage:'+this.custom.h5css.background_image.value+'; '+
                    // 'backgroundRepeat:'+this.custom.h5css.background_repeat.value+'; '+
                    'borderColor:'+this.custom.h5css.border_color.value+'; '+
                    'borderWidth:'+this.custom.h5css.border_width.value+'px; '+
                    'borderStyle:'+this.custom.h5css.border_style.value+'; '+
                    'borderRadius:'+this.custom.h5css.border_radius.value+'px; '+
                    'boxShadow:'+this.setBoxShadow+'; '+
                    'position:relative; '
                switch(this.custom.h5css.background_type.value){
                    case 'background-color':
                        style += 'background-color:'+this.custom.h5css.background_color.value+'; '
                        break
                    case 'background-image':
                        style += 'background-color:'+this.custom.h5css.background_color.value+'; '+
                               'background-image:'+(this.custom.h5css.background_image.value == 'none' || this.custom.h5css.background_image.value == 'undefined' ? 'none' : 'url('+this.custom.h5css.background_image.value+')')+'; '+
                               'background-repeat:'+this.custom.h5css.background_repeat.value+'; '
                        break
                    case 'gradient-top-bottom':
                        style += ''+
                            'background:'+this.custom.h5css.gradient_color_top.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.custom.h5css.gradient_color_top.value+',endcolorstr='+this.custom.h5css.gradient_color_bottom.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.custom.h5css.gradient_color_top.value+',endcolorstr='+this.custom.h5css.gradient_color_bottom.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(top, '+this.custom.h5css.gradient_color_top.value+'), '+this.custom.h5css.gradient_color_bottom.value+'); '+
                            'background:-o-linear-gradient(top, '+this.custom.h5css.gradient_color_top.value+'), '+this.custom.h5css.gradient_color_bottom.value+'); '+
                            'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,'+this.custom.h5css.gradient_color_top.value+'),color-stop(100%,'+this.custom.h5css.gradient_color_bottom.value+'));'+       
                        ''
                        break
                    case 'gradient-left-right':
                        style += ''+
                            'background:'+this.custom.h5css.gradient_color_left.value+';'+
                            'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.custom.h5css.gradient_color_left.value+',endcolorstr='+this.custom.h5css.gradient_color_right.value+',gradientType=0);'+
                            '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr='+this.custom.h5css.gradient_color_left.value+',endcolorstr='+this.custom.h5css.gradient_color_right.value+',gradientType=0);'+
                            'background:-moz-linear-gradient(left, '+this.custom.h5css.gradient_color_left.value+'), '+this.custom.h5css.gradient_color_right.value+'); '+
                            'background:-o-linear-gradient(left, '+this.custom.h5css.gradient_color_left.value+'), '+this.custom.h5css.gradient_color_right.value+'); '+
                            'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,'+this.custom.h5css.gradient_color_left.value+'),color-stop(100%,'+this.custom.h5css.gradient_color_right.value+'));'+       
                        ''
                        break
                }
                return style
            }
        },
        methods:{

        }
    }
</script>