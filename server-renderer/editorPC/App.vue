<template>
    <div yh-editor-content ref="yh-editor-content">
        <div v-for="(element,index) in elements" :is="element.module" 
        :props="element.props"
        :path="element.path"></div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    import CompanyPosition_style1 from '../../src/editorPC/components-h5/CompanyPosition/style1/index.vue'
    import CompanyPosition_style2 from '../../src/editorPC/components-h5/CompanyPosition/style2/index.vue'
    import List_style1 from '../../src/editorPC/components-h5/List/style1/index.vue'
    import Image_style1 from '../../src/editorPC/components-h5/Image/style1/index.vue'

    let components = {
        CompanyPosition_style1,
        CompanyPosition_style2,
        List_style1,
        Image_style1
    }
    export default {
        computed:mapState([
            'elements'
        ]),
        components:components,
        beforeCreate(){
            
        },
        created(){
            console.log('******************************')
            console.log(this.elements)
            function initModule(elements){
                for(let i = 0;i < elements.length; i++){
                    elements[i].module = components[elements[i]['yh-module']]
                    if(elements[i].props.elements && elements[i].props.elements.length > 0){
                        initModule(elements[i].props.elements)
                    }
                }
            }
            initModule(this.elements)
        },
        data(){
            // console.log('******************************')
            // console.log(this.elements)
            return {
                
            }
        },
        methods:{
            initModule(elements){
                for(let i = 0;i < elements.length; i++){
                    elements[i].module = components[elements[i]['yh-module']]
                    if(elements[i].props.elements && elements[i].props.elements.length > 0){
                        this.initModule(elements[i].props.elements)
                    }
                }
            }
        },
    }
</script>