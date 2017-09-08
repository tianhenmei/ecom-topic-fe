<template>
    <div 
        :id="props.id" 
        :style="props.position"
        @mouseenter.stop.prevent="showEditLayer" 
        @mouseleave.stop.prevent="hideEditLayer"
        @click.stop.prevent="addSetting"
        yh-tab>
        <div :class="props.classname" yh-tab-center>
            <div class="clearfix" yh-tab-title :style="'width:'+getTitleWidth+';'">
                <div v-for="(tab,index) in props.base.tabs"
                    class="yh-tab-one"
                    :class="active == index ? 'yh-tab-active' : ''"
                    :style="props.styletitle"
                    yh-states
                    @touchstart="changeTab"
                    @mousedown="changeTab">
                    <div @input="contentChange" :index="index" contenteditable="true"  v-html="tab.title"></div>
                    <div class="yh-remove" @click.stop.prevent="removeTab">x</div>
                    <!--{{tab.title}}
                    <div :is="tab.title.yh_module" :props="tab.title.props"></div> -->
                </div>
                <div class="yh-add" @click.stop.prevent="addTab">+</div>
            </div>
            <div yh-tab-content>
                <div v-for="(tab,index) in props.base.tabs"
                    :style="props.stylecontent"
                    :class="active == index ? 'yh-tab-active' : ''">
                    <div v-for="(element,index) in tab.elements" :is="element.yh_module" :props="element.props">

                    </div>
                    <slot :name="'content'+index"></slot>
                </div>
            </div>
        </div>
        <div class="yh-edit-layer clearfix">
            <yh-edit-tab :props="editOptions">
                <div class="yh-edit-tab-content yh-edit-basic clearfix" slot="content0">
                    <yh-edit-base 
                        :props="props.styletitle" :mold="mold"
                        :type="tieletype"
                        :basewith="basewith"
                        @setChangeStatus="setChangeStatus"></yh-edit-base>
                </div>
                <div class="yh-edit-tab-content yh-edit-basic clearfix" slot="content1">
                    <yh-edit-base 
                        :props="props.stylecontent" :mold="mold"
                        :type="contenttype"
                        :basewith="contentwith"
                        @setChangeStatus="setChangeStatus"></yh-edit-base>
                </div>
                <div class="yh-edit-tab-content yh-edit-status clearfix" slot="content2">
                    <!--<yh-edit-state 
                        :props="props.states" :mold="mold"
                        @setChangeStatus="setChangeStatus"></yh-edit-state>-->
                    <yh-edit-base 
                        :props="props.states[0]" :mold="mold"
                        :basewith="stateswith"
                        :type="statestype"
                        @setChangeStatus="setChangeStatus"></yh-edit-base>
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
    import {mapState} from 'vuex'
    import Editor from './editor.js'

    import YHImage from './yh-image.vue'
    import YHText from './yh-text.vue'
    import YHButton from './yh-button.vue'
    import YHAudio from './yh-audio.vue'
    import YHEditTab from '../edit-components/yh-edit-tab'
    import YHEditBase from '../edit-components/yh-edit-base'
    import YHEditState from '../edit-components/yh-edit-state'
    const Elements = {
        'yh-text':YHText,
        'yh-image':YHImage,
        'yh-button':YHButton,
        'yh-audio':YHAudio
    }
    export default {
        components:{
            'yh-edit-tab':YHEditTab,
            'yh-edit-base':YHEditBase,
            'yh-edit-state':YHEditState
        },
        props:['props'],
        computed:{
            ...mapState([
                'fontSize',
            ]),
            getTitleWidth(){
                let length = this.props.base.tabs.length,
                    rem = /(rem)/g.test(this.props.styletitle.width),
                    width = parseFloat(this.props.styletitle.width),
                    border = parseFloat(this.props.styletitle['border-width'])
                if(!rem){
                    width /= this.fontSize
                }
                if(!border){
                    border = 0
                }else {
                    border = border * 3 / this.fontSize
                }
                return (width + border * 2) * length + 'rem'
            },
        },
        data(){
            if(this.props.states.length == 0){
                this.props.states.push({
                    'type':'active',
                    'yh-number':'N',
                    'image':'',
                    'background-image':this.props.styletitle['background-image'],
                    'box-shadow':this.props.styletitle['box-shadow'],
                    'box-shadow-x':this.props.styletitle['box-shadow-x'],
                    'box-shadow-y':this.props.styletitle['box-shadow-y'],
                    'box-shadow-blur':this.props.styletitle['box-shadow-blur'],
                    'box-shadow-color':this.props.styletitle['box-shadow-color'],
                    'color':this.props.styletitle['color'],
                    'background-color':this.props.styletitle['background-color']
                })
            }
            return {
                status:true,   // status == true  当前是编辑元素的tab
                active:0,   // 当前激活的索引值，默认为0
                editOptions:{
                    position:{},
                    style:{},
                    classname:'yh-edit-tab',
                    base:{
                        tabs:[{
                            title:'title设置'
                        },{ 
                            title:'content设置'
                        },{ 
                            title:'title状态设置'
                        }]
                    }
                },
                mold:'bg',
                basewith:[
                    'width',
                    'height',
                    'background-color',
                    'image',
                    'border',
                    'box-shadow'
                ],
                contentwith:[
                    'width',
                    'height',
                    'background-color',
                    'image',
                    'border',
                    'box-shadow'
                ],
                stateswith:[
                    'color',
                    'background-color',
                    'image',
                    'box-shadow'
                ],
                tieletype:{
                    parent:'styletitle'
                },
                contenttype:{
                    parent:'stylecontent'
                },
                statestype:{
                    parent:'states',
                    index:0
                },
                changeStatus:false
            }
        },
        methods:{
            /*yh-tab***/
            showEditLayer(e){
                var target = $(e.target).closest('[yh-tab]')
                if(target.hasClass('setting')){
                    target.children('.yh-edit-layer').show();
                    this.changeStatus = false
                }
            },
            hideEditLayer(e){
                if(!this.changeStatus){
                    let target = $(e.target).closest('[yh-tab]'),
                        page = target.closest('li[page]')

                    if(page.length > 0){

                    }else{
                        target.children('.yh-edit-layer').hide();
                    }
                }
            },
            contentChange(e){
                let target = $(e.target),
                    content = target.html(),
                    index = target.attr('index')
                this.$store.commit('setTabValue',{
                    index:index,
                    stylename:'title',
                    actualValue:content
                })
                target.focus()
            },
            addSetting(e){
                let target = $(e.target).closest('[yh-tab]')
                
                $('.yh-edit-layer').hide()
                target.children('.yh-edit-layer').show();
                this.changeStatus = false
            },
            changeTab(e){
                let target = $(e.target).closest('.yh-tab-one'),
                    index = target.index()

                if(index != this.active){
                    this.active = index
                }
            },
            removeTab(e){
                let target = $(e.target),
                    index = target.closest('.yh-tab-one').index()
                this.$store.commit('removeTab',index)
            },
            addTab(e){
                let target = $(e.target),
                    index = target.closest('.yh-tab-one')
                this.$store.commit('addTab',{
                    title:'tab',
                    elements:[]
                })
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
            }
        },
        initCtor(options,that){
            options = options || {}
            return {
                id:options.id ? options.id : '',
                styletitle:Object.assign(JSON.parse(JSON.stringify(Editor.style)), {
                    width:200 / (750 / 16) + 'rem',
                    height:100 / (750 / 16) + 'rem',
                    'line-height':100 / (750 / 16) + 'rem'
                }),
                stylecontent:Object.assign(JSON.parse(JSON.stringify(Editor.style)),{
                    width:400 / (750 / 16) + 'rem',
                    height:300 / (750 / 16) + 'rem',
                    'background-color':'#ffffff',
                }),
                position:{
                    left:0,
                    top:0,
                },
                states:[{
                    'type':'active',
                    'yh-number':'N',
                    'background-image':'',
                    'image':'',
                    'box-shadow':'none',
                    'box-shadow-x':0,
                    'box-shadow-y':0,
                    'box-shadow-blur':0,
                    'box-shadow-color':'transparent',
                    'color':'#ffffff',
                    'background-color':'#ff0084'
                }],
                elements:[{
                    title:'tab1',
                    elements:[]
                },{
                    title:'tab2',
                    elements:[]
                }],
                classname:options.classname ? options.classname : ''
            }
        }
    }
</script>
<style>
[yh-tab] {
    /*width:300px;
    height:200px;
    background:#fff;*/
    position:absolute;
    left:0;
    top:0;
}
[yh-tab] [yh-tab-title]{
    width:100%;
    position: relative;
    z-index: 1;
}
[yh-tab] [yh-tab-title] > div {
    float:left;
    text-align:center;
    font-size:14px;
    color:#666;
    background:#efefef;
    cursor:pointer;
    position: relative;
    outline: none;
}
[yh-tab] [yh-tab-title] > div:hover,
[yh-tab] [yh-tab-title] > div.yh-tab-active{
    border: 1px solid #ff0084!important;
}

[yh-tab] [yh-tab-content] > div{
    position: relative;
    display:none;
}
[yh-tab] [yh-tab-content] > div.yh-tab-active{
    display:block;
}



[yh-tab] [yh-tab-title] [kitty-button]{
    position:static;
}

[yh-tab] [yh-tab-title] .yh-remove{
    width: 14px!important;
    height: 14px!important;
    line-height: 14px!important;
    font-size:14px!important;
    color:#ff0084!important;
    text-align:center!important;
    border:1px solid #ff0084!important;
    border-radius:20px!important;
    position:absolute!important;
    right:0px!important;
    top:0px!important;
}
[yh-tab] [yh-tab-title] .yh-add{
    width: 20px!important;
    height: 20px!important;
    line-height: 20px!important;
    font-size:14px!important;
    color:#fff!important;
    background:#ff0084!important;
    text-align:center!important;
    border:1px solid #ff0084!important;
    border-radius:20px!important;
    position:absolute!important;
    right:-25px!important;
    top:0px!important;
}
</style>