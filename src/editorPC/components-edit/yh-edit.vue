<!-- yh-edit  用于基础设置、事件设置、动画设置
    基础设置目前包括：font-size
                   width
                   height
                   line-height
                   color
                   background-color
                   image(不区分是src还是背景图，但传参时通过mold区分，mold="src" || mold ="bg")
                   border
                   box-shadow
    事件设置
    动画设置
    参数如下：
        props：包括组件的基本样式
        mold: 针对设置项图片的设置  mold="src" || mold ="bg"
        without：当前不需要那些设置，不需要为true，没有可不传
-->
<template>
    <div class="yh-edit-layer clearfix">
        <yh-edit-tab :props="editOptions">
            <div class="yh-edit-tab-content yh-edit-basic clearfix" slot="content0">
                <yh-edit-base 
                    :props="props" :mold="mold"
                    :basewith="basewith"
                    @setChangeStatus="setChangeStatus"></yh-edit-base>
            </div>
            <div v-if="!(no && no.event)" class="yh-edit-tab-content yh-edit-event clearfix" :slot="'content'+yes.event">
                 <yh-edit-event :event="event"></yh-edit-event>
            </div>
            <div v-if="!(no && no.states)" class="yh-edit-tab-content yh-edit-status clearfix" :slot="'content'+yes.states">
                <yh-edit-state 
                    :props="states" :mold="mold" :stateswith="stateswith"
                    @setChangeStatus="setChangeStatus"></yh-edit-state>
            </div>
            <div v-if="!(no && no.animation)" class="yh-edit-tab-content yh-edit-animation clearfix" :slot="'content'+yes.animation">
            </div>
        </yh-edit-tab>
        <div class="yh-delete-undo">
            <div class="yh-delete" @click.stop="removeElement">x</div>
            <div class="yh-undo" @click.stop="undoElement">√</div>
        </div>
    </div>
</template>
<script>
    // components-edit
    import YHEditTab from './yh-edit-tab'
    import YHEditBase from './yh-edit-base'
    import YHEditEvent from './yh-edit-event'
    import YHEditState from './yh-edit-state'
    // debugger
    export default {
        components:{
            'yh-edit-tab':YHEditTab,
            'yh-edit-base':YHEditBase,
            'yh-edit-event':YHEditEvent,
            'yh-edit-state':YHEditState
        },
        props:['props','mold','states','event','basewith','stateswith','no'],
        data(){
            let self = this,
                tab = [],
                i = 0,j = 0,
                arr = ['base','event','states','animation'],
                arr2 = ['基础设置','事件设置','状态设置','动画设置'],
                yes = {}
            for(i = 0; i < arr.length; i++ ){
                if(!(this.no && this.no[arr[i]])){
                    tab.push({
                        title:arr2[i]
                    })
                    yes[arr[i]] = j
                    j++
                }
            }
            return {
                href:'',
                animation:'',
                changeStatus:false,
                style:this.props,
                editOptions:{
                    position:{},
                    style:{},
                    classname:'yh-edit-tab',
                    base:{
                        tabs:tab
                    }
                },
                yes:yes
            }
        },
        methods:{
            setEvent(name,value,designValue){
                // let elem = document.getElementsByClassName('.setting')[0],
                //     content = elem.getElementsByClassName('.kitty-button-content')[0],
                //     button = elem.getElementsByClassName('.yh-button')[0]
                
                this.props.href = designValue
            },
            setChangeStatus(status){
                this.changeStatus = true
                this.$emit('setChangeStatus',true)
            },
            removeElement(e){
                var elem = document.getElementsByClassName('.setting')[0],
                    elemID = elem.getAttribute('id'),
                    selection = document.getElementsByClassName('yh-selection'),
                    i = 0
                this.$store.commit('removeElement',elemID)
                for(i = 0; i < selection.length; i++){
                    if(!/(hide)/g.test(selection[i].className)){
                        selection[i].className = selection[i].className + ' hide'
                    }
                }
            },
            undoElement(e){
                let selection = document.getElementsByClassName('yh-selection'),
                    setting = document.getElementsByClassName('.setting'),
                    i = 0
                
                for(i = 0; i < selection.length; i++){
                    if(!/(hide)/g.test(selection[i].className)){
                        selection[i].className = selection[i].className + ' hide'
                    }
                }
                for(i = 0; i < setting.length; i++){
                    setting[i].className = setting[i].className.replace('setting','').replace('  ','')
                }
            }
        }
     }
</script>
<style>
    .yh-delete-undo{
        width:45px;
        height:17px;
        position:absolute;
        right:0;
        top:3px;
        font-family: serif;
    }
    .yh-delete-undo .yh-delete,
    .yh-delete-undo .yh-undo {
        width: 17px;
        height: 17px;
        line-height: 17px;
        border: 1px solid #ff0084;
        border-radius: 17px;
        font-size: 12px;
        text-align: center;
        color: #ff0084;
        cursor: pointer;
        float:left;
        margin:0 3px 0 0;
    }
    .yh-delete-undo .yh-delete {
        font-family: initial;
    }
</style>