<template>
    <div yh-editor-content ref="yh-editor-content">
        <div v-for="(element,index) in elements" 
            v-if="element.props.data.toH5.value"
            :is="element.module" 
            :props="element.props"
            :path="element.path"></div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    let components = {}
    export default {
        computed:mapState([
            'elements',
            // 'includes'
        ]),
        components:components,
        beforeCreate(){
            
        },
        created(){
            this.setComponents(this.elements)
        },
        data(){
            // data 在 computed 之前，所以在data中是拿不到elements的
            return {
                loadStatus:0,
                finishLength:0
            }
        },
        methods:{
            setComponents(elements){
                let i = 0
                for(i = 0; i < elements.length; i++){
                    if(!components[elements[i]['yh-module']]){
                        components[elements[i]['yh-module']] = elements[i].module
                        if(elements[i].props.elements && elements[i].props.elements.length > 0){
                            this.setComponents(elements[i].props.elements)
                        }
                    }
                }
            }
        }
    }
</script>