<template>
    <div class="block-style3 clearfix" 
        :id="props.id" 
        yh-module="Block_style3"
        :ref="props.id"
        :yh-path="path"
        @click.stop="setAll"
        :style="{backgroundColor:props.h5css.background_background_color.value,
            backgroundImage:setImage,
            backgroundRepeat:props.h5css.background_background_repeat.value,
            minHeight:getRemValue(props.h5css.background_min_height.value)+'rem'}"
        yh-vessel
        >
        <div :id="props.id+'-content'" class="yh-block-content clearfix" 
            :class="{'yh-block-init':!props.elements.length}">
            <div v-for="(element,index) in props.elements" 
                v-if="element.props.data.toH5.value"
                :is="element.module" 
                :props="element.props"
                :path="element.path"
                parentmodule="Block_style3"></div>
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
