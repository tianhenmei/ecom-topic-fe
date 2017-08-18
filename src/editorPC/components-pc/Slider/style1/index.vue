<template>
    <div class="slider-style1" :id="props.id" yh-module="Slider_style1"
        :ref="props.id"
        :yh-path="path"
        :autoplay="props.data.autoplay.value"
        :animation="props.data.animation.value"
        :style="{
            height:props.css.background_height.value+(props.css.background_height.value == 'auto' ? '' : 'px'),
            minHeight:props.css.background_min_height.value+(props.css.background_min_height.value == 'auto' ? '' : 'px')
        }"
        yh-vessel>
        <div :id="props.id+'-container'" class="yh-slider-container clearfix"
            :style="{
                width:props.css.width.value+(props.css.width.value == 'auto' ? '' : 'px'),
                height:props.css.background_height.value+(props.css.background_height.value == 'auto' ? '' : 'px'),
                backgroundColor:props.css.background_background_color.value,
                backgroundImage:setImage,
                backgroundRepeat:props.css.background_background_repeat.value,
                minHeight:props.css.background_min_height.value+(props.css.background_min_height.value == 'auto' ? '' : 'px')
            }">
            <div :id="props.id+'-content'" class="yh-slider-content clearfix"
                :style="{
                    left:0,
                    // width:(props.css.slider_width.value == 'auto' ? 'auto' : (props.css.slider_width.value * props.elements.length)+'px')
                }">
                <div v-for="(element,index) in props.elements" 
                    :is="element.module" 
                    :props="element.props"
                    :path="element.path"
                    parentmodule="Slider_style1"></div>
            </div>
        </div>
        <a class="arrow-left" href="javascript:void(0);"></a>
        <a class="arrow-right" href="javascript:void(0);"></a>
    </div>
</template>
<script>
    export default {
        props:['props','path','parentmodule'],
        data(){
            return {}
        },
        computed:{
            setImage(){
                let src = this.props.css.background_background_image.value.trim()
                switch(src){
                    case 'none':
                        return src
                    case 'undefined':
                        return 'none'
                    default:
                        return 'url('+src+')'
                }
            },
            getLeft(){
                return this.props.data.currentIndex.value * this.props.elements[0].props.css.background_width.value * -1
            }
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
</script>
<style>
    @import './index.css';
</style>
