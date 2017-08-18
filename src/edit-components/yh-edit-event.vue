<template>
    <div yh-edit-event>
        <yh-edit-options :options="type" @setValue="setEventType"></yh-edit-options>
        <div v-show="event['entype'] == 'href'" class="yh-edit-href-options clearfix">
            <yh-edit-input 
                :options="href"
                :type="eventtype"></yh-edit-input>
        </div>
        <div v-show="event['entype'] == 'show'" class="clearfix" ref="yh-edit-show-options">
            <yh-edit-options :options="show" @setValue="setValue"></yh-edit-options>
        </div>
        <div v-show="event['entype'] == 'page'" class="clearfix" ref="yh-edit-page-options">
            <yh-edit-options :options="page" @setValue="setValue"></yh-edit-options>
        </div>
    </div>
</template>
<script>
    import YHEditInput from '../components-edit/yh-edit-input.vue'
    import YHEditOptions from '../components-edit/yh-edit-options.vue'

    export default {
        components:{
            'yh-edit-input':YHEditInput,
            'yh-edit-options':YHEditOptions
        },
        props:['event'],
        data(){
            return {
                eventtype:{
                    parent:'event'
                },
                type:{
                    name:'触发结果类型',
                    stylename:'entype',
                    unit:'',
                    realunit:'',
                    list:['无','链接','显示/隐藏','跳页'],
                    realList:['none','href','show','page'],
                    isChild:true,
                    style:this.event
                },
                href:{
                    name:'链接',
                    stylename:'href',
                    unit:'',
                    realunit:'',
                    type:'text',
                    style:this.event,
                },
                show:{
                    name:'显示/隐藏',
                    stylename:'show',
                    unit:'',
                    realunit:'',
                    list:[],
                    realList:[],
                    style:{
                        show:/(show-)/g.test(this.event['href']) ? this.event['href'].replace(/(show-)/g,'') : 'none'
                    },
                },
                page:{
                    name:'跳页',
                    stylename:'page',
                    unit:'',
                    realunit:'',
                    list:[],
                    realList:[],
                    style:{
                        page:/(page-)/g.test(this.event['href']) ? this.event['href'].replace(/(page-)/g,'') : 'none'
                    }
                }
            }
        },
        mounted(){
            let self = this
            this.$refs['yh-edit-show-options'].addEventListener('mouseenter',function(e){
                self.getElements()
            },false)
            this.$refs['yh-edit-page-options'].addEventListener('mouseenter',function(e){
                self.getPages()
            },false)
        },
        methods:{
            getElements(){
                let elements = $('#'+this.event.id).closest('.page').children('[id]'),
                    ids = [],
                    i = 0
                for(i = 0; i < elements.length; i++){
                    ids.push(elements[i].id)
                }
                this.show.list = ids;
                this.show.realList = ids;
            },
            getPages(){
                let page = $('.page'),
                    i = 0,
                    pages = [],
                    actualPages = []
                for(i = 0; i < page.length; i++){
                    pages.push('第'+(i + 1) + '页')
                    actualPages.push(i)
                }
                this.page.list = pages;
                this.page.realList = actualPages;
            },
            setEventType(name,value){  // value -> realList
                let index = this.type.realList.indexOf(value)
                this.$store.commit('setValue',{
                    parent:'event',
                    stylename:name,
                    actualValue:value
                })
            },
            setValue(name,actualValue,designValue){
                let elem = $('.setting')
                switch(name){
                    case 'show':
                        this[name].style[name] = designValue
                        this.$store.commit('setValue',{
                            parent:'event',
                            stylename:'href',
                            actualValue:'show-'+actualValue
                        })
                        // elem.attr('href','show-'+actualValue)
                        break
                    case 'page':
                        this[name].style[name] = designValue
                        this.$store.commit('setValue',{
                            parent:'event',
                            stylename:'href',
                            actualValue:'page-'+actualValue
                        })
                        // elem.attr('href','page-'+actualValue)
                        break
                }
            }
        }
    }
</script>

<style>
    /*entype***/
    .yh-edit-entype {
        width: 250px;
    }
    .yh-edit-entype .yh-edit-text{
        width:90px;
    }
    .yh-edit-entype .yh-edit-value {
        width:100px;
    }
    .yh-edit-entype .yh-edit-list{
        left:90px;
    }
    .yh-edit-page,
    .yh-edit-show{
        width: 232px;
        height: 30px;
        position:relative;
    }
    .yh-edit-page .yh-edit-text,
    .yh-edit-show .yh-edit-text{
        width: 80px;
        height: 30px;
        line-height: 30px;
    }
    .yh-edit-page .yh-edit-value,
    .yh-edit-show .yh-edit-value{
        width: 150px;
        height: 28px;
        line-height: 28px;
        border: 1px solid #ccc;
    }
    .yh-edit-page .yh-edit-arrow,
    .yh-edit-show .yh-edit-arrow{
        position:absolute;
        right: 10px;
        top:0;
    }
    .yh-edit-page .yh-edit-arrow:after,
    .yh-edit-show .yh-edit-arrow:after{
        left: 5px;
        top: 5px;
    }
    .yh-edit-choose.yh-edit-page .yh-edit-list,
    .yh-edit-choose.yh-edit-show .yh-edit-list{
        width: 150px;
        left: 80px;
    }
    .yh-edit-choose.yh-edit-page .yh-edit-list > ul > li,
    .yh-edit-choose.yh-edit-show .yh-edit-list > ul > li,
    .yh-edit-choose.yh-edit-page .yh-edit-list > ul,
    .yh-edit-choose.yh-edit-show .yh-edit-list > ul{
        width: 142px;
    }
</style>