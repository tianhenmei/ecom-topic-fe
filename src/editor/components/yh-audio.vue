<template>
    <div :id="props.id" :style="props.position" 
        :class="props.classname+(props.states[0].status == 'hide' ? ' yh-hide' : '')" 
        @mouseenter.stop.prevent="showEditLayer"
        @mouseleave.stop.prevent="hideEditLayer"
        @click.stop.prevent="addSetting"
        kitty-audio 
        >
        <div class="kitty-audio-content yh-audio-open"  rotate :style="props.rotate">
            <div class="yh-audio-center" :style="props.style">
                <img class="yh-audio-open" :src="props.src" 
                    :style="'width:'+props.style.width+'; height:'+props.style.height"
                    yh-states />
                <audio class="yh-audio" 
                    preload="auto"
                    :src="props.audiosrc"
                    yh-states>
                </audio>
            </div>
        </div>
       <div class="yh-edit-layer clearfix">
            <yh-edit-tab :props="editOptions">
                <div class="yh-edit-tab-content yh-edit-basic clearfix" slot="content0">
                    <yh-edit-base 
                        :props="style" :mold="'src'"
                        :basewith="basewith"
                        :online="onlineSrc"
                        @setChangeStatus="setChangeStatus">
                        <yh-edit-image
                            :options="{'style':style,mold:'audiosrc'}"
                            :online="onlineAudio" slot="otherbase"></yh-edit-image>
                    </yh-edit-base>
                </div>
                <div class="yh-edit-tab-content yh-edit-status clearfix" slot="content1">
                    <yh-edit-base 
                        :props="props.states[0]" :mold="'src'"
                        :basewith="stateswith"
                        :type="statestype"
                        :online="onlineStates"
                        @setChangeStatus="setChangeStatus">
                        <div class="yh-edit-otherbase" slot="otherbase">
                            <yh-edit-options :options="statusData" :type="statestype" @setValue="setStatesValue"></yh-edit-options>
                            <yh-edit-options :options="methodData" :type="statestype" @setValue="setStatesValue"></yh-edit-options>
                            <yh-edit-options :options="countData" :type="statestype" @setValue="setStatesValue"></yh-edit-options>
                        </div>    
                    </yh-edit-base>
                </div>
            </yh-edit-tab>
            <div class="yh-delete-undo">
                <div class="yh-delete" @click.stop="removeElement">x</div>
                <div class="yh-undo" @click.stop="undoElement">√</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Editor from './editor.js'
    import {
        updateData
    } from '../js/Node.js'
    // edit-components
    import YHEditOptions from '../edit-components/yh-edit-options'
    import YHEditImage from '../edit-components/yh-edit-image'
    import YHEditBase from '../edit-components/yh-edit-base'
    import YHEditTab from '../edit-components/yh-edit-tab'
    import YHEdit from '../edit-components/yh-edit.vue'
    export default {
        components:{
            'yh-edit-options':YHEditOptions,
            'yh-edit-image':YHEditImage,
            'yh-edit-base':YHEditBase,
            'yh-edit-tab':YHEditTab,
            'yh-edit':YHEdit
        },
        props:['props'],
        data(){
            return Object.assign({
                style:{
                    width:49,
                    height:46,
                },
                position:{
                    left:0,
                    top:0
                },
                rotate:{
                    '-webkit-transform':'none',
                    transform:'none'
                },
                audiosrc:'http://localhost:9000/static/images/bg4.mp3',
                src:'http://localhost:9000/static/images/music-open.png',
                changeStatus:false,
                basewith:[
                    'width',
                    'height',
                    'image'
                ],
                stateswith:[
                    'image'
                ],
                no:{
                    event:true,
                    animation:true
                },
                statestype:{
                    parent:'states',
                    index:0
                },
                onlineAudio:{
                    name:'音乐地址',
                    stylename:'audiosrc',
                    style:this.props,
                    parent:'',
                    classname:'yh-edit-online'
                },
                onlineSrc:{
                    name:'音乐图片',
                    stylename:'src',
                    style:this.props,
                    parent:'',
                    classname:'yh-edit-online'
                },
                onlineStates:{
                    name:'音乐图片',
                    stylename:'yh-src',
                    style:this.props.states[0],
                    parent:'states',
                    index:0,
                    classname:'yh-edit-online'
                },
                editOptions:{
                    position:{},
                    style:{},
                    classname:'yh-edit-tab',
                    base:{
                        tabs:[{
                            title:'基础设置'
                        },{ 
                            title:'状态设置'
                        }]
                    }
                },
                statusData:{
                    name:'状态设置',
                    stylename:'status',
                    unit:'',
                    realunit:'',
                    list:['显示','隐藏'],
                    realList:['show','hide'],
                    isChild:true,
                    type:'text',
                    style:this.props.states[0]
                },
                methodData:{
                    name:'播放方式',
                    stylename:'method',
                    unit:'',
                    realunit:'',
                    list:['点击时','翻页时'],
                    realList:['click','flip'],
                    isChild:true,
                    type:'text',
                    style:this.props.states[0]
                },
                countData:{
                    name:'是否循环',
                    stylename:'yh-count',
                    unit:'',
                    realunit:'',
                    list:['否','是'],
                    realList:['0','1'],
                    isChild:true,
                    type:'text',
                    style:this.props.states[0]
                },
            },{
                style:Editor.style,
            })
        },
        methods:{
            resetData(data){
                return updateData(data,baseData)
            },
            getRem(value){
                return value / (750 / 16) + 'rem';
            },
            showEditLayer(e){
                let elem = $(e.target).closest('[id]')
                if(elem.hasClass('setting')){
                    $(e.target).children('.yh-edit-layer').show();
                }
            },
            hideEditLayer(e){
                if(!this.changeStatus){
                    let target = $(e.target).closest('[kitty-audio]'),
                        audio = target.find('.yh-audio'),
                        page = target.closest('li[page]')

                    if(page.length > 0){

                    }else{
                        target.children('.yh-edit-layer').hide();
                    }
                }
            },
            addSetting(e){
                let target = $(e.target).closest('[kitty-audio]')
                
                $('.yh-edit-layer').hide()
                target.children('.yh-edit-layer').show()
                this.changeStatus = false
            },
            setChangeStatus(status){
                this.changeStatus = true
            },
            removeElement(e){
                var elem = $('.setting'),
                    elemID = elem.attr('id');
                this.$store.commit('removeElement',elemID)
                $('.yh-selection').hide()
            },
            undoElement(e){
                $('.setting').removeClass('setting')
                $('.yh-selection').hide()
            },
            setStatesValue(name,actualValue,designValue){
                this.$store.commit('setValue',{
                    parent:'states',
                    index:0,
                    stylename:name,
                    actualValue:actualValue,
                    designValue:designValue
                })
            }
        },
        initCtor(options,that){
            options = options || {}
            return {
                id:options.id ? options.id : '',
                style:Object.assign({},JSON.parse(JSON.stringify(Editor.style)),options.style ? options.style : {
                    width:that.getRem(49),
                    height:that.getRem(46),
                    background:'transparent'
                }),
                position:{
                    left:0,
                    top:0
                },
                rotate:{
                    '-webkit-transform':'none',
                    transform:'none'
                },
                states:[{
                    'type':'audio',
                    'status':'show',
                    'method':'click',
                    'yh-count':'0',
                    'yh-number':'N',
                    'yh-valid-type':'stylechange',
                    'yh-src':'http://localhost:9000/static/images/music-close.png'
                }],
                event:{
                    'entype':'none',
                },
                audiosrc:options.audiosrc ? options.audiosrc : 'http://localhost:9000/static/images/bg4.mp3',
                src:options.src ? options.src : 'http://localhost:9000/static/images/music-open.png',
                classname:options.classname ? options.classname : ''
            }
        }
    }
</script>
<style>
    [kitty-audio] .kitty-audio-content{
        position:relative;
    }
    [kitty-audio] .kitty-audio-content .yh-image-href{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
    }
    [kitty-audio] .kitty-audio-content a {
        display:none;
    }
    [kitty-audio] .kitty-audio-content .yh-image-href {
        display:block;
    }
    [kitty-audio] .kitty-audio-content .yh-image {
        -webkit-user-select: none; 
        -moz-user-select: none;    
        -khtml-user-select: none;  
        -ms-user-select: none; 
        -o-user-select: none;
        user-select: none; 
    }
</style>