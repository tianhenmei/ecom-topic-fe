<template>
    <div class="block-style2" 
        :class="setLayerClass"
        :id="props.id" 
        yh-module="Block_style2"
        :ref="props.id"
        :yh-path="path"
        :style="setLayerStyle"
        yh-vessel
        >
        <div :id="props.id+'-content'" class="yh-block-content clearfix" 
            :class="{'yh-block-init':!props.elements.length,
            'yh-block-absolute':props.css.content_position.value == 'yh-block-absolute'}"
            :style="{
                width:props.css.background_width.value+(props.css.background_width.value == 'auto' ? '' : 'px'),
                marginLeft:props.css.content_position.value == 'yh-block-absolute' ? props.css.content_margin_left.value+'px': '',
                top:props.css.content_position.value == 'yh-block-absolute' ? props.css.content_top.value+'px': '0px'}">
            <div v-for="(element,index) in props.elements" 
                v-if="element.props.data.toPC.value && element"
                :is="element.module" 
                :props="element.props"
                :path="element.path"
                parentmodule="Block_style2"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['props','path','parentmodule'],
        data(){
            return {
                
            }
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
            setLayerClass(){
                return this.props.css.layer_position.value
            },
            setLayerStyle(){
                let css = this.props.css,
                    style = {
                        backgroundColor:css.background_background_color.value,
                        backgroundImage:this.setImage,
                        backgroundRepeat:css.background_background_repeat.value,
                        minHeight:css.background_min_height.value+(css.background_min_height.value == 'auto' ? '' : 'px'),
                    }
                switch(css.layer_position.value){
                    case 'yh-block-fixed':
                    case 'yh-block-absolute':
                        style.marginLeft = css.layer_margin_left.value+'px'
                        style.top = css.layer_top.value+'px'
                        break
                    case 'yh-block-fixed-bottom':
                        style.marginLeft = css.layer_margin_left.value+'px'
                        style.bottom = css.layer_bottom.value+'px'
                        break
                    case 'yh-block-fixed-left':
                        style.left = css.layer_left.value+'px'
                        style.top = css.layer_top.value+'px'
                        break
                    case 'yh-block-fixed-right':
                        style.right = css.layer_right.value+'px'
                        style.top = css.layer_top.value+'px'
                        break
                    case 'yh-block-fixed-bright':
                        style.right = css.layer_right.value+'px'
                        style.bottom = css.layer_bottom.value+'px'
                        break
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
