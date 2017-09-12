<template>
    <div class="block-style1" 
        :class="setLayerClass"
        :id="props.id" 
        yh-module="Block_style1"
        :ref="props.id"
        :yh-path="path"
        :style="setLayerStyle"
        yh-vessel
        >
        <div :id="props.id+'-content'" class="yh-block-content clearfix" 
            :class="{'yh-block-init':!props.elements.length,
            'yh-block-absolute':props.css.content_position.value == 'yh-block-absolute'}"
            :style="getContentStyle">
            <div v-for="(element,index) in props.elements" 
                v-if="element.props.data.toPC.value && element"
                :is="element.module" 
                :props="element.props"
                :path="element.path"
                parentmodule="Block_style1"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['props','path','parentmodule',
            // 当作为slider-style1的子元素时,设置的类名
            'classname',
            // 当作为slider-style1的子元素时，用此元素主要控制block-content宽度
            // 当animation == 'zoomIn'时，宽为100%；否则为设置的
            'animation'
        ],
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
                return this.props.css.layer_position.value + ' '+this.classname
            },
            setLayerStyle(){
                let style = {
                    backgroundColor:this.props.css.background_background_color.value,
                    backgroundImage:this.setImage,
                    backgroundRepeat:this.props.css.background_background_repeat.value,
                    minHeight:this.props.css.background_min_height.value+(this.props.css.background_min_height.value == 'auto' ? '' : 'px'),
                }
                switch(this.props.css.layer_position.value){
                    case 'yh-block-fixed':
                    case 'yh-block-absolute':
                        style.marginLeft = this.props.css.layer_margin_left.value+'px'
                        style.top = this.props.css.layer_top.value+'px'
                        break
                    case 'yh-block-fixed-bottom':
                        style.marginLeft = this.props.css.layer_margin_left.value+'px'
                        style.bottom = this.props.css.layer_bottom.value+'px'
                        break
                    case 'yh-block-fixed-left':
                        style.left = this.props.css.layer_left.value+'px'
                        style.top = this.props.css.layer_top.value+'px'
                        break
                    case 'yh-block-fixed-right':
                        style.right = this.props.css.layer_right.value+'px'
                        style.top = this.props.css.layer_top.value+'px'
                        break
                    case 'yh-block-fixed-bright':
                        style.right = this.props.css.layer_right.value+'px'
                        style.bottom = this.props.css.layer_bottom.value+'px'
                        break
                }
                switch(this.animation){
                    case 'zoomIn':
                        style.overflow = 'visible'
                        break
                }
                return style
            },
            getContentStyle(){
                let style = {
                    marginLeft:this.props.css.content_position.value == 'yh-block-absolute' ? this.props.css.content_margin_left.value+'px': '',
                    top:this.props.css.content_position.value == 'yh-block-absolute' ? this.props.css.content_top.value+'px': '0px'
                }
                switch(this.animation){
                    case 'zoomIn':
                        break
                    default:
                        style.width = this.props.css.background_width.value+(this.props.css.background_width.value == 'auto' ? '' : 'px')
                        break
                }
                return style
            },
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
