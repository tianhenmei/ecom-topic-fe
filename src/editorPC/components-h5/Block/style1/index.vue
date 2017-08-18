<template>
    <div class="block-style1" 
        :class="setLayerClass"
        :id="props.id" 
        yh-module="Block_style1"
        :ref="props.id"
        :yh-path="path"
        @click.stop="setAll"
        :style="setLayerStyle"
        yh-vessel
        >
        <div :id="props.id+'-content'" class="yh-block-content clearfix" 
            :class="{'yh-block-init':!props.elements.length,
            'yh-block-absolute':props.h5css.content_position.value == 'yh-block-absolute'}"
            :style="{
                marginLeft:props.h5css.content_position.value == 'yh-block-absolute' ? getRemValue(props.h5css.content_margin_left.value)+'rem': '',
                top:props.h5css.content_position.value == 'yh-block-absolute' ? getRemValue(props.h5css.content_top.value)+'rem': '0'}">
            <div v-for="(element,index) in props.elements" 
                v-if="element.props.data.toH5.value"
                :is="element.module" 
                :props="element.props"
                :path="element.path"
                parentmodule="Block_style1"></div>
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
            setLayerClass(){
                return this.props.h5css.layer_position.value
            },
            setLayerStyle(){
                let style = {
                    backgroundColor:this.props.h5css.background_background_color.value,
                    backgroundImage:this.setImage,
                    backgroundRepeat:this.props.h5css.background_background_repeat.value,
                    minWidth:this.getRemValue(this.props.h5css.background_min_width.value)+'rem',
                    minHeight:this.getRemValue(this.props.h5css.background_min_height.value)+'rem',
                    width:(this.props.h5css.background_width.value == 'auto' ? 'auto' : this.getRemValue(this.props.h5css.background_width.value)+'rem'),
                }
                switch(this.props.h5css.layer_position.value){
                    case 'yh-block-fixed':
                    case 'yh-block-absolute':
                        style.marginLeft = this.getRemValue(this.props.h5css.layer_margin_left.value)+'rem'
                        style.top = this.getRemValue(this.props.h5css.layer_top.value)+'rem'
                        break
                    case 'yh-block-fixed-bottom':
                        style.marginLeft = this.getRemValue(this.props.h5css.layer_margin_left.value)+'rem'
                        style.bottom = this.getRemValue(this.props.h5css.layer_bottom.value)+'rem'
                        break
                    case 'yh-block-fixed-left':
                        style.left = this.getRemValue(this.props.h5css.layer_left.value)+'rem'
                        style.top = this.getRemValue(this.props.h5css.layer_top.value)+'rem'
                        break
                    case 'yh-block-fixed-right':
                        style.right = this.getRemValue(this.props.h5css.layer_right.value)+'rem'
                        style.top = this.getRemValue(this.props.h5css.layer_top.value)+'rem'
                        break
                    case 'yh-block-fixed-bright':
                        style.right = this.getRemValue(this.props.h5css.layer_right.value)+'rem'
                        style.bottom = this.getRemValue(this.props.h5css.layer_bottom.value)+'rem'
                        break
                }
                return style
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
