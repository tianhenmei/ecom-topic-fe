<template>
    <div class="list-style1 background clearfix" 
        :id="props.id"
        yh-module="List_style1"
        :class="{'yh-list-style1':props.elements.length > 0}"
        :style="{backgroundColor:props.css.background_background_color.value,
                 backgroundImage:setImage,
                 overflow:props.css.overflow.value}"
        :background_background_image_h5="props.h5css.background_background_image_h5.value"
        :ref="props.id"
        :yh-path="path"
        yh-vessel
        >
        <div :id="props.id+'-content'" class="yh-list-content clearfix" 
            :class="{'yh-init':!props.elements.length}">
            <div v-for="(element,index) in props.elements" 
                v-if="element.props.data.toH5.value"
                :is="element.module" 
                :props="element.props"
                :path="element.path"
                parentmodule="List_style1"></div>
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
        mounted(){
            
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
        methods:{
        }
    }
</script>
<style>
    @import './index.css';
</style>
