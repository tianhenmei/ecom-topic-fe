<!-- options
    isChild  是否某一个子集 ，true 则没有类名 yh-edit-options
    mold 判断当前的input是不是某个类型的元素，比如color
    withoutText 判断是否需要介绍文案，true：不需要，默认false
    name  此设置项的中文名
    type  input的类型，如：text、number等
    style  input 的值，从组件继承下来，是一个对象
    stylename  当前input对应的样式值，如width、height、color等
    unit  展示给编辑人员的数字单位，通常px
    realunit   实际的数据单位，通常为rem
-->
<template>
    <div class="yh-edit-input clearfix" :class="setClassname"
        @mouseenter.stop.prevent="showChoice"
        @mouseleave.stop.prevent="hideChoice">
        <div class="yh-edit-text" v-if="options.name">{{options.name}}{{options.name ? '：' : ''}}</div>
        <div class="yh-edit-value clearfix">
            <input
                :class="{'yh-edit-value-input-long': !options.unit}"
                :type="options.type"
                :value="options.style[options.stylename] ? getDesignValue : (options.type == 'number' ? 0 : '')"
                :readonly="setReadonlyStatus"
                @click.stop.prevent="inputSelected"
                @input="setValue"
            />
            <span v-if="options.unit">{{options.unit}}</span>
        </div>
        <div v-if="getDefaultStatus" 
            class="yh-edit-choice hide" 
            ref="yh-edit-choice"
            @click.stop.prevent="setChoice"
            :value="options.style[options.stylename].value == options.default ? options.ivalue : options.default">
            {{options.style[options.stylename].value == options.default ? '输入数值' : options.default }}
        </div>
        <slot name="chooser"></slot>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import {getComputedValue,getPointValue} from '../components/Base/Node.js'
    export default {
        props:['eindex','index','options','type',
            'ischildset',  // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
            'path'
        ],
        data(){
            return {}
        },
        computed:{
            getDefaultStatus(){
                return (!!this.options.default) && this.options.default != false && this.options.default != 0
            },
            setClassname(){
                let str = ''
                if(this.options.classname){
                    str += 'yh-edit-'+this.options.classname
                }
                if(!this.options.name){
                    str += ' yh-eidt-combine'
                }
                return str
            },
            getDesignValue(){
                let actualValue = this.options.style[this.options.stylename].value
                if(this.options.type === 'number'){
                    let value = parseFloat(actualValue)
                    if(this.options.unit === this.options.realunit){
                        return value
                    }
                    return this.getDesign(value)
                }
                return actualValue
            },
            setReadonlyStatus(){
                let status = this.getDefaultStatus
                        && this.getDesignValue == this.options.default 
                        && Object.prototype.toString.call(this.options.default) === '[object String]'
                return status
            },
            ...mapState({
                // getDesignValue(state){
                    
                // }
            })
        },
        methods:{
            getDesign(value){
                return value * (750 / 16)
            },
            getRemValue(value){
                return value / (750 / 16)
            },
            inputSelected(e){
                
            },
            getDefStatus(){
                return this.options.default && this.options.default != false && this.options.default != 0
            },
            showChoice(e){
                if(this.getDefStatus()){
                    let choice = this.$refs['yh-edit-choice']
                    choice.className = choice.className.replace(/(hide)/g,'').replace(/  /g,' ')
                }
            },
            hideChoice(e){
                if(this.getDefStatus()){
                    let choice = this.$refs['yh-edit-choice']
                    choice.className += ' hide'
                }
            },
            setChoice(e){
                let choice = this.$refs['yh-edit-choice'],
                    value = parseInt(e.target.getAttribute('value')),
                    number = (value || value == 0) ? value : e.target.getAttribute('value'),
                    type = this.options.edittype,
                    edittype = type ? ('set'+type.substring(0,1).toUpperCase()+type.substring(1)+'Value')
                        : 'setValue'/*,
                    elem = document.getElementsByClassName('setting')[0],
                    width = elem.style.width,
                    height = elem.style.height,//getComputedValue(elem,'height'),
                    paddingVerticle = getPointValue(elem,'padding-top') + getPointValue(elem,'padding-bottom'),
                    paddingHorizontal= getPointValue(elem,'padding-left') + getPointValue(elem,'padding-right'),
                    nheight = elem.clientHeight - paddingVerticle,
                    nwidth = elem.clientWidth - paddingHorizontal*/
                
                choice.className += ' hide'
                if(this.options.backstatus){
                    this.$emit('setValue',this.options.stylename,number,number)   // this.options.def
                }else{
                    this.$store.commit(edittype,{
                        parent:this.options.parent ? this.options.parent : 'css',
                        eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                        index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                        ischildset:this.ischildset ? this.ischildset : '',
                        stylename:this.options.stylename,
                        actualValue:number,
                        designValue:number,
                        path:this.path
                    })
                }
                // switch(this.options.stylename){
                //     case 'height':
                //          switch(height){
                //             case 'auto':
                //                 this.options.def = 'auto'
                //                 this.options.type = 'number'
                //                 break
                //             default:
                //                 this.options.def = nheight
                //                 this.options.type = 'text'
                //                 break
                //         }
                //         break
                //     case 'width':
                //         switch(width){
                //             case 'auto':
                //                 this.options.def = 'auto'
                //                 this.options.type = 'number'
                //                 break
                //             default:
                //                 this.options.def = nwidth
                //                 this.options.type = 'text'
                //                 break
                //         }
                //         break
                // }
            },
            setValue(e){
                let target = e.target,
                    value = target.value,   // // 展示出来的字体大小（针对750的宽）
                    unit = this.options.unit ? this.options.unit : '',
                    realunit = this.options.realunit ? this.options.realunit : '',
                    stylename = this.options.stylename,
                    actualValue = value,
                    type = this.options.edittype,
                    edittype = type ? ('set'+type.substring(0,1).toUpperCase()+type.substring(1)+'Value')
                        : 'setValue' // unit == realunit ? (value + realunit) : (this.getRemValue(parseFloat(value)) + realunit)
                
                // actualValue : 实际上使用的值
                // value : 展示用的值 （designValue）
                // this.$emit('setValue',stylename,actualValue,value)
                if(this.index && (this.index != -1 && this.index != undefined)){
                    this.$emit('setValue',
                        stylename,
                        actualValue,
                        value
                    )
                }else{
                    if(this.options.backstatus){
                        this.$emit('setValue',stylename,actualValue,value)
                    }else{
                        this.$store.commit(edittype,{
                            parent:this.options.parent ? this.options.parent : 'css',
                            eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                            index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                            ischildset:this.ischildset ? this.ischildset : '',
                            stylename:stylename,
                            actualValue:actualValue,
                            designValue:value,
                            path:this.path
                        })
                    }
                }
            }
        }
    }
</script>

<style>
    .yh-edit-input {
        width:100%;
        padding:0 0 5px 0;
        position:relative;
    }
    .yh-edit-input .yh-edit-text{
        width: 80px;
        height: 25px;
        line-height: 25px;
        float:left;
        text-align:right;
        font-size:12px;
        color:#666;
        /*background: #fff;*/
    }
    .yh-edit-input .yh-edit-value{
        width:115px;
        padding:0 5px 0 0;
        /*background: #fff;*/
        float:left;
    }
    .yh-edit-input .yh-edit-value input {
        width: 93px;
        height: 23px;
        line-height: 23px;
        border:1px solid #ccc;
        float:left;
        font-size: 12px;
        color: #666;
        background: transparent;
    }
    .yh-edit-input .yh-edit-value input.yh-edit-value-input-long{
        width:113px;
    }
    .yh-edit-input .yh-edit-value span {
        width: 20px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 12px;
        color: #666;
        float:left;
    }
    .yh-edit-input .yh-edit-choice {
        width: 145px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        position: absolute;
        left: 80px;
        top: 24px;
        background-color: #fff;
        z-index: 2;
        color: #666;
    }
    .yh-eidt-combine.yh-edit-input {
        width:82px;
    }
    .yh-eidt-combine.yh-edit-input .yh-edit-value{
        width:82px;
    }
    .yh-eidt-combine.yh-edit-input .yh-edit-value input {
        width:60px;
    }
    .yh-eidt-combine.yh-edit-color {
        width:92px;
    }
    .yh-eidt-combine.yh-edit-color .yh-edit-value {
        width:62px;
    }
</style>