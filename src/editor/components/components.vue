<style>
    @import '../../../public/css/m_init.css';
    @import '../../../public/css/animation.css';
    @import './style/components.css';
    @import './style/edit-layer.css';
</style>
<template>
    <div kitty-components>
        <div class="yh-components-content">
            <h1 class="yh-title">{{title}}</h1>
            <components-content ref="yh-content"></components-content>
            <components-pages></components-pages>
            <components-edit></components-edit> <!--  v-on:addChild="componentAdd" -->
        </div>
    </div>
</template>
<script>
    import MW from './bus.js'
    import Pages from './components-pages'
    import Content from './components-content'
    import Edit from './components-edit'

    export default {
        data(){
            return {
                title:'KITTY EDITOR COMPONENTS'
            }
        },
        mounted(){
            this.init()
        },
        components:{
            'components-pages':Pages,
            'components-content':Content,
            'components-edit':Edit
        },
        methods:{
            init(){
                this.initEvent()
            },
            initEvent(){
                document.addEventListener('click',function(e){
                    let app = $(e.target).closest('[id]')
                    if(app.length > 0 && app[0].id != 'app'){
                        return
                    }
                    let setting = document.getElementsByClassName('setting'),
                        selection = document.getElementsByClassName('yh-selection'),
                        parents = $(e.target).parents('[id]').not('[id="app"]'),
                        s = 0
                    
                    if(parents.length == 0 && !MW.isMoving){
                        for(; s < setting.length; s++){
                            setting[s].className = setting[s].className.replace('setting','')
                        }
                        for(s = 0; s < selection.length; s++){
                            selection[s].style.display = 'none'
                        }
                    }
                    MW.isMoving = false
                },false)
            },
            componentAdd(){
                console.log('components componentAdd');
                // this.$emit('contentAddChild');
            }
        }
    }
</script>