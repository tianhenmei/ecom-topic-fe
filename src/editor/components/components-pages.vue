<template>
    <div components-pages>
        <ul class="components-pages-list">
            <li class="clearfix" v-for="(page,index) in pages" :page="index" @mouseenter="pageenter" @mouseleave="pageleave" @click.stop.prevent="changePage">
                <div class="yh-page-edit">
                    {{index+1}}
                </div>
                <div class="yh-page-center" :id="'pageCanvas'+index">
                    <div class="yh-page-canvas" :style="page.background">
                        <div v-for="element in page.elements" :is="element.module"
                            v-if="element"
                            :props="element.props"
                            :path="element.path"
                            :withoutedit="true"
                            >
                        </div>
                    </div>
                </div>
                <div :class="'yh-page-selected'+(currentPage == index ? '' : (page.status ? '' :' yh-page-hide'))">
                    <div class="yh-page-add" @click.stop.prevent="addPage">+</div>
                </div>
                <div :class="'yh-page-remove'+(currentPage == index ? '' : (page.status ? '' :' yh-page-hide'))" @click.stop.prevent="removePage"></div>
            </li>
        </ul>
        <div class="yh-page-bottom"></div>
        <div components-pages-bar-bg>
            <div components-pages-bar></div>
        </div>
    </div>
</template>
<script>
    import {mapState,mapGetters} from 'vuex'
    import ScrollBar from './ScrollBar.js'
    import MW from './bus.js'
    import YHImage from './yh-image.vue'
    import YHText from './yh-text.vue'
    import YHButton from './yh-button.vue'
    import YHTab from './yh-tab.vue'
    import YHAudio from './yh-audio.vue'

    // let components = {
    //     'yh-text':YHText,
    //     'yh-image':YHImage,
    //     'yh-button':YHButton,
    //     'yh-tab':YHTab,
    //     'yh-audio':YHAudio
    //     // 'components-button':YHButton,
    //     // 'components-form':YHForm,
    //     // 'components-video':YHVideo
    // }
    export default {
        // components:components,
        data(){
            return {
                // pageStatus:[],
                scroll:null,
                title:'components-pages title'
            }
        },
        computed:{
            ...mapState([
                'currentPage',
                'pages',
                'elements'
            ])
        },
        watch:{
            pages(newv,oldv){
                if(this.pages.length > 1){
                    // if(this.pageStatus.length == 0){
                    //     // this.initScroll(this.pages.length - 1)
                    //     this.initScroll(this.pages.length)
                    // }else{
                        
                    // }
                    this.initScroll(1)
                }else{
                    this.initScroll(1)
                }
            },
            currentPage(newv,oldv){
                this.$store.commit('changePageStatus',{
                    oldv,
                    newv
                })
            }
        },
        created(){
            var that = this;
        },
        mounted(){
            this.initScroll(0)
        },
        methods:{
            setPages(pages){
                this.initScroll(this.pages.length - 1)
            },
            pageenter(e){
                var index = Math.floor(e.target.attributes.page.value)
                this.$store.commit('changePageEnterStatus',index)
            },
            pageleave(e){
                var index = Math.floor(e.target.attributes.page.value)
                if(this.currentPage != index){
                    this.$store.commit('changePageLeaveStatus',index)
                }
            },
            changePage(e){
                let li = e.currentTarget
                let index = parseInt(li.attributes['page'].value)
                let selected = li.getElementsByClassName('yh-page-selected')[0]
                let remove = li.getElementsByClassName('yh-page-remove')[0]
                let oselected = document.getElementsByClassName('yh-page-selected')
                let oremove = document.getElementsByClassName('yh-page-remove')
                for( let o = 0; o < oselected.length; o++ ){
                    if(/(yh-page-hide)/g.test(oselected[o].className)){

                    }else{
                        oselected[o].className += ' yh-page-hide'
                    }
                }
                for( let o = 0; o < oremove.length; o++ ){
                    if(/(yh-page-hide)/g.test(oremove[o].className)){

                    }else{
                        oremove[o].className += ' yh-page-hide'
                    }
                }
                selected.className = (selected.className+'').replace('yh-page-hide','')
                remove.className = (remove.className+'').replace('yh-page-hide','')

                this.$store.commit('setCurrentPage',index)
                $('.yh-selection').hide()
            },
            addPage(e){
                var index = Math.floor(e.target.parentNode.parentNode.attributes.page.value)
                
                this.$store.commit('addPage',index)
                // this.setScroll(1);
            },
            removePage(e){
                var index = Math.floor(e.target.parentNode.attributes.page.value);
                this.$store.commit('removePage',index)
                this.setScroll(-1);
            },
            initScroll(mode){
                if(this.scroll){
                    this.setScroll(mode)
                }else{
                    this.scroll = new ScrollBar({
                        classname:'[components-pages]',
                        height:504, //510,
                        space: 0,
                        number: 2.4,
                        one: 251,
                        fixedHeight: false
                    });
                    this.scroll.scroll = this.scroll
                    this.setScroll(mode)
                }
            },
            setScroll(mode){
                this.scroll.init(mode);  // {scroll:this.scroll}
            }
        }
    }
</script>
<style>
    @import "./style/components-pages.css";
</style>