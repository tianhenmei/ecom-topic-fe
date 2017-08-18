<template>
    <div class="slider-style1" :id="props.id" yh-module="Slider_style1"
        :ref="props.id"
        :autoplay="props.data.autoplay.value"
        :animation="props.data.animation.value"
        :style="{
            height:(props.h5css.height.value == 'auto' ? 'auto' : getRemValue(props.h5css.height.value)+'rem'),
            minHeight:(props.h5css.background_min_height.value == 'auto' ? 'auto' : getRemValue(props.h5css.background_min_height.value)+'rem')
        }"
        yh-vessel>
        <div :id="props.id+'-container'" class="yh-slider-container clearfix"
            :style="{
                height:(props.h5css.height.value == 'auto' ? 'auto' : getRemValue(props.h5css.height.value)+'rem'),
                backgroundColor:props.h5css.background_background_color.value,
                backgroundImage:setImage,
                backgroundRepeat:props.h5css.background_background_repeat.value,
                minHeight:(props.h5css.background_min_height.value == 'auto' ? 'auto' : props.h5css.background_min_height.value+'rem')
            }">
            <div :id="props.id+'-content'" class="yh-slider-content clearfix"
                :style="{
                    left:0,
                    // width:(props.css.slider_width.value == 'auto' ? 'auto' : (props.css.slider_width.value * props.elements.length)+'px')
                }">
                <div v-for="(element,index) in props.elements" 
                    v-if="element.props.data.toH5.value"
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
                let src = this.props.h5css.background_background_image_h5.value.trim()
                switch(src){
                    case 'none':
                        return src
                    case 'undefined':
                        return 'none'
                    default:
                        return 'url('+src+')'
                }
            }
        },
        mounted(){
            
        },
        methods:{
            getRemValue(value){
                return (value / (750 / 16)).toFixed(2)
            }
        }
    }
</script>
<style>
    @import './index.css';
</style>
