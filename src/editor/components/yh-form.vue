<template>
    <div :id="props.id" :style="props.position" :class="props.classname" kitty-form  
        @mouseenter.stop.prevent="showEditLayer" 
        @mouseleave.stop.prevent="hideEditLayer"
        @click.stop.prevent="addSetting" >
        <div class="kitty-form-content" rotate
            :style="props.rotate">
            <div class="kitty-form-words"
                 contenteditable="true"
                 @input="contentChange"
                 v-html="props.content" >
            </div>
            <yh-form-text v-if="props.type == 'text'"
                :props="props"
                ></yh-form-text>
        </div>
        <!--<yh-edit 
            :props="props.style"
            :states="props.states"
            :event="props.event"
            :mold="'bg'"
            :basewith="basewith"
            :stateswith="stateswith"
            @setChangeStatus="setChangeStatus"
        ></yh-edit>-->
    </div>
</template>
<script>
    import Editor from './editor.js'
    import {
        updateData
    } from '../js/Node.js'
    import YHFormText from './yh-form-text.vue'
    // edit-components
    import YHEdit from '../edit-components/yh-edit.vue'
    let baseData = {
        style:Editor.style,
        position:{
            left:0,
            top:0
        },
        rotate:{
            '-webkit-transform':'none',
            transform:'none'
        },
        content:'文本',
    }
    export default {
        components:{
            'yh-form-text':YHFormText,
            'yh-edit':YHEdit
        },
        props:['props'],
        data(){
            let self = this
            return Object.assign({
                self:self,
                animation:'',
            },JSON.parse(JSON.stringify(baseData)),{
                basewith:[
                    'font-size',
                    'width',
                    'height',
                    'line-height',
                    'color',
                    'background-color',
                    'image',
                    'border',
                    'box-shadow'
                ]
            })
        },
        mounted(){

        },
        methods:{
            /*form***/
            showEditLayer(e){
                var target = $(e.target)
                if(target.hasClass('setting')){
                    target.children('.yh-edit-layer').show();
                    this.changeStatus = false
                }
            },
            hideEditLayer(e){
                if(!this.changeStatus){
                    let target = $(e.target).closest('[kitty-form]'),
                        form = target.find('.yh-form'),
                        page = target.closest('li[page]')

                    if(page.length > 0){

                    }else{
                        target.children('.yh-edit-layer').hide();
                    }
                }
            },
            contentChange(e){
                let content = $(e.target).children('.yh-form').html()
                this.$store.commit('setMultipleValue',[{
                    stylename:'content',
                    actualValue:content
                }])
            },
            addSetting(e){
                let target = $(e.target).closest('[kitty-form]')
                
                $('.yh-edit-layer').hide()
                target.children('.yh-edit-layer').show();
                this.changeStatus = false
            }
        },
        initCtor(options,that){
            let data = {
                id:options.id ? options.id : '',
                style:Object.assign({},JSON.parse(JSON.stringify(Editor.style)),options.style ? options.style : {}),
                position:Object.assign({},JSON.parse(JSON.stringify(baseData.position)),options.position ? options.position : {}),
                classname:options.classname ? options.classname : '',
                rotate:{
                    '-webkit-transform':'none',
                    transform:'none'
                },
                states:[],
                event:{
                    'entype':'none',
                },
                type:options.type ? options.type : 'text'
            }
            options = options || {}
            switch(options.type){
                case 'select':
                    data.content = options.content ? options.content : '我是下拉框',
                    break
                case 'checkbox':
                    data.content = options.content ? options.content : '我是复选框',
                    break
                case 'radio':
                    data.content = options.content ? options.content : '我是单选框',
                    break
                case 'text':
                default:
                    data.content = options.content ? options.content : '文本',
                    break
            }
            return data
        }
    }
</script>
<style>
    [kitty-form]{
        position:absolute;
        left:0;
        top:0;
    }
    [kitty-form] .kitty-form-content{
        position:relative;
    }
    [kitty-form] .kitty-form-content .yh-form{
        width:300px;
        height:60px;
        line-height:60px;
        color:#fff;
        background: #ff0084 no-repeat 0 0;
        background-size: 100%;
        font-size:0.768rem;
        text-align:center;
    }
    [kitty-form] .kitty-form-content a {
        display:none;
    }
    [kitty-form] .kitty-form-content .yh-form-href{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
    }
    [kitty-form] .kitty-form-content .yh-form-href {
        display:block;
    }
    [kitty-form] .kitty-form-content .yh-form {
        -webkit-user-select: none; 
        -moz-user-select: none;    
        -khtml-user-select: none;  
        -ms-user-select: none; 
        -o-user-select: none;
        user-select: none; 
    }
</style>