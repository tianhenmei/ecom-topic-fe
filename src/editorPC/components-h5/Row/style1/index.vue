<template>
    <div class="row-style1" 
        :id="props.id" 
        yh-module="Row_style1"
        :ref="props.id"
        :yh-path="path"
        @click.stop="setAll"
        :style="{backgroundColor:props.css.background_background_color.value,
            backgroundImage:setImage,
            backgroundRepeat:props.css.background_background_repeat.value}"
        yh-vessel
        >
        <div :id="props.id+'-content'" class="yh-row-content clearfix" 
            :class="{'yh-row-init':!props.elements.length}">
            <div v-for="(element,index) in props.elements" 
                v-if="element.props.data.toH5.value && element"
                :is="element.module" 
                :props="element.props"
                :path="element.path"
                parentmodule="Row_style1"></div>
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
