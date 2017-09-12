<template>
    <div class="slider-style1" :id="props.id" yh-module="Slider_style1"
        :ref="props.id"
        :yh-path="path"
        :autoplay="getAutoplay"
        :animation="props.data.animation.value"
        yh-vessel>
        <!--:style="{
            height:props.css.background_height.value+(props.css.background_height.value == 'auto' ? '' : 'px'),
            minHeight:props.css.background_min_height.value+(props.css.background_min_height.value == 'auto' ? '' : 'px')
        }"-->
        <div :id="props.id+'-container'" class="yh-slider-container clearfix"
            :style="{
                width:props.css.width.value+(props.css.width.value == 'auto' ? '' : 'px'),
                backgroundColor:props.css.background_background_color.value,
                backgroundImage:setImage,
                backgroundRepeat:props.css.background_background_repeat.value,
            }">
            <!-- 
            height:props.css.background_height.value+(props.css.background_height.value == 'auto' ? '' : 'px'),
            minHeight:props.css.background_min_height.value+(props.css.background_min_height.value == 'auto' ? '' : 'px')
            -->
            <div :id="props.id+'-content'" class="yh-slider-content clearfix"
                :style="{
                    left:0,
                    // width:(props.css.slider_width.value == 'auto' ? 'auto' : (props.css.slider_width.value * props.elements.length)+'px')
                }">
                <div v-for="(element,index) in props.elements" 
                    v-if="element.props.data.toPC.value && element"
                    :is="element.module" 
                    :index="index"
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
                width:20 * (props.elements.length + 1) + 'px',
                marginLeft:(20 * (props.elements.length + 1) / 2 * -1)+'px'
            }">
            <div v-for="(one,index) in props.elements" class="one"
                :class="{'active':index == props.data.currentIndex.value}"
                :style="{
                    backgroundColor:props.css.pagination_color.value
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
                    top:this.props.css.navigation_top.value+'px',
                }
                if(this.props.css.navigation_left_background.value != 'https://activity.lagou.com/topic/static/img/newEdit/carouselButton.png'){
                    style.backgroundImage = 'url('+this.props.css.navigation_left_background.value+')'
                    style.backgroundPosition = '0 0'
                }
                return style
            },
            setArrowRightStyle(){
                let style = {
                    top:this.props.css.navigation_top.value+'px',
                }
                if(this.props.css.navigation_right_background.value != 'https://activity.lagou.com/topic/static/img/newEdit/carouselButton.png'){
                    style.backgroundImage = 'url('+this.props.css.navigation_right_background.value+')'
                    style.backgroundPosition = '0 0'
                }
                return style
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
