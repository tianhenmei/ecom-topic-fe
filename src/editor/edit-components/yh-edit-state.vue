<template>
    <div class="yh-edit-state clearfix">
        <div v-for="(one,index) in props" class="yh-edit-state-one">
            <div class="yh-state-one-title clearfix" @click.stop="slidedownList" :index="index">
                <div class="yh-state-one-arrow"></div>
                <div class="yh-state-one-type">{{ getStateType(one.type) }}</div>
                <div class="yh-state-one-remove" @click.stop="removeState">x</div>
            </div>
            <div class="yh-state-one-list clearfix">
                <yh-edit-options v-if="one.type == 'active'" 
                    :options="getStatesNumber(index)" 
                    :type="{parent:'states',index:index}"
                    @setValue="setStateAttriute"></yh-edit-options>
                <yh-edit-input v-if="one.type == 'invalid'"
                    :options="getStateStartTime(index)" 
                    :type="{parent:'states',index:index}"
                    @setValue="setStateAttriute"
                    ></yh-edit-input>
                <yh-edit-input v-if="one.type == 'invalid'"
                    :options="getStateEndTime(index)" 
                    :type="{parent:'states',index:index}"
                    @setValue="setStateAttriute"
                    ></yh-edit-input>
                <yh-edit-options v-if="one.type == 'invalid'" 
                    :options="getStatesType(index)" 
                    :type="{parent:'states',index:index}"
                    @setValue="setStateAttriute"></yh-edit-options>
                <div v-for="onestyle in stateswith">
                    <color 
                        v-if="onestyle == 'color' && one['yh-valid-type'] != 'hide'" 
                        :options="{'style':one,mold:'color',stylename:'color',name:'文本'}"
                        :type="{parent:'states',index:index}"
                        @setChangeStatus="setChangeStatus"></color>
                    <color 
                        v-if="onestyle == 'background-color' && one['yh-valid-type'] != 'hide'"
                        :options="{'style':one,mold:'color',stylename:'background-color',name:'背景'}"
                        :type="{parent:'states',index:index}"
                        @setChangeStatus="setChangeStatus"></color>
                    <yh-edit-image 
                        v-if="onestyle == 'image' && one['yh-valid-type'] != 'hide'"
                        :options="{'style':one,mold:mold}"
                        :type="{parent:'states',index:index}"></yh-edit-image>
                    <box-shadow 
                        v-if="onestyle == 'box-shadow' && one['yh-valid-type'] != 'hide'" 
                        :options="one" @setChangeStatus="setChangeStatus"
                        :type="{parent:'states',index:index}"></box-shadow>
                </div>
            </div>
        </div>
        <div v-if="props.length < 2" class="yh-edit-state-add">
            <yh-edit-options :options="optionsData" @setValue="setValue"></yh-edit-options>
            <div class="yh-state-add" @click.stop.prevent="addState">添加状态</div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    import color from './yh-edit-color'
    import boxShadow from './box-shadow'
    import YHEditImage from './yh-edit-image'
    import YHEditOptions from './yh-edit-options'
    import YHEditInput from './yh-edit-input.vue'

    export default {
        components:{
            'color':color,
            'box-shadow':boxShadow,
            'yh-edit-image':YHEditImage,
            'yh-edit-options':YHEditOptions,
            'yh-edit-input':YHEditInput
        },
        props:['props','mold','stateswith'],
        data(){
            // this.getBoxShadow()
            return {
                states:this.props,
                optionsData:{
                    name:'',
                    stylename:'yh-state',
                    unit:'',
                    realunit:'',
                    list:['无','点击后','无效'],
                    realList:['none','active','invalid'],
                    type:'text',
                    style:{
                        'yh-state':'none'
                    }
                },
                index:0
            }
        },
        computed:{
            ...mapState({
                
            })
        },
        methods:{
            setValue(name,actualValue,designValue){
                this.optionsData.style[name] = actualValue
            },
            setStateAttriute(name,actualValue,designValue,index){
                this.$store.commit('setValue',{
                    parent:'states',
                    index:index,
                    stylename:name,
                    actualValue:actualValue,
                    designValue:designValue
                })
            },
            setChangeStatus(status){
                this.$emit('setChangeStatus',true)
            },
            addState(e){
                let target = e.target,
                    i = 0,
                    isdefined = false,
                    state = this.optionsData.style['yh-state']
                switch(state){
                    case 'none':
                        alert("* 请先选择添加的状态类型！")
                        break
                    default:
                        if(this.props){
                            for(i = 0; i < this.props.length; i++){
                                if(this.props[i].type == state){
                                    isdefined = true
                                    break
                                }
                            }
                        }
                        if(isdefined){
                            alert("* 不能设置多个同种状态！")
                        }else{
                            this.$store.commit('addElementStates',{
                                type:state,
                                mold:this.mold
                            })
                        }
                        break
                }
            },
            removeState(e){
                let one = $(e.target).closest('.yh-state-one-title'),
                    index = parseInt(one.attr('index'))
                this.$store.commit('removeElementState',index)
            },
            slidedownList(e){
                let one = $(e.target).closest('.yh-edit-state-one'),
                    other = one.siblings('.yh-edit-state-one')
                if(one.hasClass('yh-edit-state-active')){
                    one.removeClass('yh-edit-state-active')
                }else{
                    one.addClass('yh-edit-state-active')
                }
                other.removeClass('yh-edit-state-active')
            },
            getStateType(type){
                let index = this.optionsData.realList.indexOf(type)
                return this.optionsData.list[index] 
            },
            getBoxShadow(){
                if(this.props['box-shadow-x'] == undefined){
                    switch(this.props['box-shadow']){
                        case 'none':
                            this.props['box-shadow-x'] = 0
                            this.props['box-shadow-y'] = 0
                            this.props['box-shadow-blur'] = 0
                            this.props['box-shadow-color'] = 'transparent'
                            break
                        default:
                            let color = this.props['box-shadow'].match(/(rgb[a]{0,1}\([\d, .]*\))/g),
                                all = [],
                                i = 0,j = 0
                            if(color){
                                this.props['box-shadow-color'] = color[0]
                                all = this.props['box-shadow'].split(/(rgb[a]{0,1}\([\d, .]*\))/g)[2].trim().split(/ /g),
                                j = 1
                            }else{
                                all = this.props['box-shadow'].split(/ /g)
                            }
                            for(i = 0; i < all.length; i++){
                                if(all[i] != ''){
                                    switch(j){
                                        case 0:
                                            this.props['box-shadow-color'] = all[i]
                                            break
                                        case 1:
                                            this.props['box-shadow-x'] = parseFloat(all[i])
                                            break
                                        case 2:
                                            this.props['box-shadow-y'] = parseFloat(all[i])
                                            break
                                        case 3:
                                            this.props['box-shadow-blur'] = parseFloat(all[i])
                                            break
                                        default:
                                            j--
                                            break
                                    }
                                    j++
                                }
                            }
                            break
                    }
                }
            },
            getStatesNumber(index){
                let data = {
                    name:'点击次数',
                    stylename:'yh-number',
                    unit:'',
                    realunit:'',
                    list:['1次','无数次'],
                    realList:['1','N'],
                    type:'text',
                    style:this.props[index]
                }
                return data
            },
            getStateStartTime(index){
                let data = {
                    name:'开始时间',
                    stylename:'yh-valid-start',
                    unit:'',
                    realunit:'',
                    type:'text',
                    style:this.props[index]
                }
                return data
            },
            getStateEndTime(index){
                let data = {
                    name:'结束时间',
                    stylename:'yh-valid-end',
                    unit:'',
                    realunit:'',
                    type:'text',
                    style:this.props[index]
                }
                return data
            },
            getStatesType(index){
                let data = {
                    name:'无效状态',
                    stylename:'yh-valid-type',
                    unit:'',
                    realunit:'',
                    list:['样式变化','隐藏'],
                    realList:['stylechange','hide'],
                    type:'text',
                    style:this.props[index]
                }
                return data
            },
        }
    }
</script>
<style>
    .yh-state-one-title {
        cursor:pointer;
    }
    .yh-state-one-title .yh-state-one-arrow{
        width: 30px;
        height: 20px;
        float:left;
        position:relative;
    }
    .yh-state-one-title .yh-state-one-arrow:after{
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        left: 10px;
        top: 2px;
        border-left: 10px solid #ff0084;
        border-right: none;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
    }
    .yh-state-one-title .yh-state-one-type{
        font-size:14px;
        color:#ff0084;
        text-align:left;
        float:left;
    }
    .yh-state-one-title .yh-state-one-remove{
        width:15px;
        height:15px;
        line-height:15px;
        margin:0 0 0 15px;
        border:1px solid #ff0084;
        border-radius:15px;
        font-size:14px;
        color:#ff0084;
        text-align:center;
        float:left;
    }
    .yh-state-one-list{
        display:none;
    }
    .yh-state-one-list .yh-edit-yh-number{
        width:116px;
    }
    .yh-state-one-list .yh-edit-yh-number .yh-edit-value{
        width:40px;
    }
    .yh-state-one-list .yh-edit-yh-valid-end,
    .yh-state-one-list .yh-edit-yh-valid-start{
        width: 200px;
    }
    .yh-state-one-list .yh-edit-yh-valid-end .yh-edit-text,
    .yh-state-one-list .yh-edit-yh-valid-start .yh-edit-text{
        width: 55px;
    }
    .yh-state-one-list .yh-edit-yh-valid-end .yh-edit-value,
    .yh-state-one-list .yh-edit-yh-valid-start .yh-edit-value{
        width: 145px;
    }
    .yh-state-one-list .yh-edit-yh-valid-end .yh-edit-value input,
    .yh-state-one-list .yh-edit-yh-valid-start .yh-edit-value input{
        width:125px;
    }
    .yh-state-one-list .yh-edit-yh-valid-type{
        width:120px;
    }
    .yh-state-one-list .yh-edit-yh-valid-type .yh-edit-value{
        width:50px;
    }
    .yh-state-one-list .yh-edit-yh-valid-type .yh-edit-arrow{
        width:10px;
    }
    .yh-state-one-list .yh-edit-yh-valid-type .yh-edit-arrow:after{
        left:-5px;
    }
    .yh-edit-state-active .yh-state-one-list{
        display:block;
    }
    .yh-edit-state-active .yh-state-one-title .yh-state-one-arrow:after{
        left: 5px;
        top: 5px;
        border-top: 10px solid #ff0084;
        border-bottom: none;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
    }

    .yh-edit-state-add .yh-edit-yh-state{
        width:80px;
        height: 30px;
        line-height: 30px;
    }
    .yh-edit-state-add .yh-edit-yh-state .yh-edit-list{
        width:80px;
    }
    .yh-edit-state-add .yh-edit-yh-state .yh-edit-list > ul > li,
    .yh-edit-state-add .yh-edit-yh-state .yh-edit-list > ul{
        width:72px;
    }
    .yh-edit-state-add .yh-edit-yh-state .yh-edit-arrow{
        top:5px;
    }
    .yh-edit-state-add .yh-state-add{
        width: 100px;
        height: 30px;
        line-height: 30px;
        float: left;
        font-size: 12px;
        text-align: center;
        background: #ff0084;
        color: #fff;
        cursor:pointer;
    }
</style>