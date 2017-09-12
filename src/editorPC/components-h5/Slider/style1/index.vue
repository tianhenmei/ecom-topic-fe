<template>
    <div class="slider-style1" :id="props.id" yh-module="Slider_style1"
        :ref="props.id"
        :autoplay="getAutoplay"
        :animation="props.data.animation.value"
        yh-vessel>
        <!--:style="{
            height:(props.h5css.height.value == 'auto' ? 'auto' : getRemValue(props.h5css.height.value)+'rem'),
            minHeight:(props.h5css.background_min_height.value == 'auto' ? 'auto' : getRemValue(props.h5css.background_min_height.value)+'rem')
        }"-->
        <div :id="props.id+'-container'" class="yh-slider-container clearfix"
            :style="{
                backgroundColor:props.h5css.background_background_color.value,
                backgroundImage:setImage,
                backgroundRepeat:props.h5css.background_background_repeat.value,
            }">
            <!-- 
            height:(props.h5css.height.value == 'auto' ? 'auto' : getRemValue(props.h5css.height.value)+'rem'),
            minHeight:(props.h5css.background_min_height.value == 'auto' ? 'auto' : props.h5css.background_min_height.value+'rem')
            -->
            <div :id="props.id+'-content'" class="yh-slider-content clearfix"
                :style="{
                    left:0,
                    // width:(props.css.slider_width.value == 'auto' ? 'auto' : (props.css.slider_width.value * props.elements.length)+'px')
                }">
                <div v-for="(element,index) in props.elements" 
                    v-if="element.props.data.toH5.value && element"
                    :is="element.module" 
                    :props="element.props"
                    :path="element.path"
                    parentmodule="Slider_style1"></div>
            </div>
        </div>
        <a v-if="props.data.navigation.value" 
            :style="setArrowLeftStyle"
            class="arrow-left" href="javascript:void(0);"></a>
        <a v-if="props.data.navigation.value" 
            :style="setArrowRightStyle"
            class="arrow-right" href="javascript:void(0);"></a>
        <div v-if="props.elements.length > 0"
            class="pagination"
            :id="props.id+'-pagination'"
            :style="{
                width:getRemValue(28 * (props.elements.length + 1)) + 'rem',
                marginLeft:getRemValue(28 * (props.elements.length + 1)/ 2 * -1)+'rem'
            }">
            <div v-for="(one,index) in props.elements" class="one"
                :class="{'active':index == props.data.currentIndex.value}"
                :style="{
                    backgroundColor:props.h5css.pagination_color.value
                }"></div>
        </div>
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
            },
            getAutoplay(){
                if(this.props.data.autoplay.value){
                    return 'autoplay'
                }else {
                    return false
                }
            },
            setArrowLeftStyle(){
                let style = {
                    top:this.getRem(this.props.h5css.navigation_top.value),
                }
                if(this.props.h5css.navigation_left_background.value != 'https://activity.lagou.com/topic/static/img/newEdit/gIcon3_h5.png'){
                    style.backgroundImage = 'url('+this.props.h5css.navigation_left_background.value+')'
                    style.backgroundPosition = '0 0'
                }
                return style
            },
            setArrowRightStyle(){
                let style = {
                    top:this.getRem(this.props.h5css.navigation_top.value),
                }
                if(this.props.h5css.navigation_right_background.value != 'https://activity.lagou.com/topic/static/img/newEdit/gIcon3_h5.png'){
                    style.backgroundImage = 'url('+this.props.h5css.navigation_right_background.value+')'
                    style.backgroundPosition = '0 0'
                }
                return style
            }
        },
        mounted(){
            
        },
        methods:{
            getRem(value){
                return parseFloat(value) / (750 / 16) + 'rem'
            },
            getRemValue(value){
                return (parseFloat(value) / (750 / 16)).toFixed(2)
            }
        }
    }
</script>
<style>
    @import './index.css';
</style>
