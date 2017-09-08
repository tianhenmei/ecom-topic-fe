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
    <div class="yh-edit-input clearfix"
        :class="setClassname">
        <div class="yh-edit-text"
            v-if="!options.withoutText">{{options.name}}{{options.name ? ': ' : ''}}</div>
        <div class="yh-edit-value clearfix">
            <input
                :type="options.type"
                :value="options.style[options.stylename] ? getDesignValue : (options.type == 'number' ? 0 : '')"
                @input="setValue"
            />
            <span>{{options.unit}}</span>
        </div>
        <slot name="chooser"></slot>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        data(){
            return {}
        },
        props:[
            'eindex',
            'index',
            'options',
            'type',
            'elem_id',   // 当前被选中元素的ID
            'ischildset',  // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
            'ischild',
            'path'
        ],
        computed:{
            getDesignValue(){
                let actualValue = this.options.style[this.options.stylename].value
                if(this.options.type === 'number'){
                    let value = parseFloat(actualValue)
                    if(this.options.unit === this.options.realunit){
                        return value
                    }
                    return parseFloat(this.getDesign(value).toFixed(1))
                }
                return actualValue
            },
            setClassname(){
                let length = this.options.name.length
                return 'yh-edit-input-'+length + ' yh-edit-'+this.options.classname
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
            setValue(e){
                let target = e.target,
                    value = target.value,   // // 展示出来的字体大小（针对750的宽）
                    unit = this.options.unit ? this.options.unit : '',
                    realunit = this.options.realunit ? this.options.realunit : '',
                    stylename = this.options.stylename,
                    // actualValue = unit == realunit ? (value + realunit) : (this.getRemValue(parseFloat(value)) + realunit),
                    actualValue = unit == realunit ? value : this.getRemValue(parseFloat(value))
                
                // actualValue : 实际上使用的值
                // value : 展示用的值 （designValue）
                // this.$emit('setValue',stylename,actualValue,value)
                if(this.type && (this.type.index != -1 && this.type.index != undefined)){
                    this.$emit('setValue',
                        stylename,
                        actualValue,
                        value,
                        this.type.index
                    )
                }else{
                    this.$store.commit('setValue',{
                        stylename:stylename,
                        parent:this.options.parent ? this.options.parent : 'css',
                        eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                        index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                        ischildset:this.ischildset ? this.ischildset : '',
                        actualValue:actualValue,
                        designValue:value,
                        path:this.path,
                        store:this.$store
                    })
                    if(this.options.backstatus){
                        this.$emit('setValue',stylename,actualValue,value)
                    }
                }
            }
        }
    }
</script>

<style>
    .yh-edit-input {
        width:105px;
        position:relative;
        float:left;
    }
    .yh-edit-input-0 {
        width:75px;
    }
    .yh-edit-input-3 {
        width:115px;
    }
    .yh-edit-input-4 {
        width:130px;
    }
    .yh-edit-input .yh-edit-text{
        width: 30px;
        height: 20px;
        line-height: 20px;
        float:left;
        text-align:left;
        font-size:12px;
        color:#666;
        /*background: #fff;*/
    }
    .yh-edit-input-0 .yh-edit-text{
        width: 0;
    }
    .yh-edit-input-3 .yh-edit-text{
        width: 45px;
    }
    .yh-edit-input-4 .yh-edit-text{
        width: 60px;
    }
    .yh-edit-input .yh-edit-value{
        width:70px;
        /*background: #fff;*/
        float:left;
    }
    .yh-edit-input .yh-edit-value input {
        width: 43px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #ccc;
        float:left;
        font-size: 12px;
        color: #666;
        background: transparent;
    }
    .yh-edit-input .yh-edit-value span {
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        color: #666;
        float:left;
    }




    .yh-edit-options > .yh-edit-input{
        float:left;
    }


    .yh-edit-box-shadow-blur {
        width:82px;
    }
    .yh-edit-box-shadow-y {
        width:65px;
    }
    .yh-edit-box-shadow-x {
        width:105px;
    }
    .yh-edit-box-shadow-x .yh-edit-text {
        width:55px;
    }
    .yh-edit-box-shadow-blur .yh-edit-text{
        width:32px;
    }
    .yh-edit-box-shadow-y .yh-edit-text{
        width:15px;
    }
    .yh-edit-box-shadow-blur .yh-edit-value,
    .yh-edit-box-shadow-y .yh-edit-value,
    .yh-edit-box-shadow-x .yh-edit-value {
        width:50px;
    }
    .yh-edit-box-shadow-blur .yh-edit-value input,
    .yh-edit-box-shadow-y .yh-edit-value input,
    .yh-edit-box-shadow-x .yh-edit-value input{
        width:30px;
    }
    .yh-edit-box-shadow-blur .yh-edit-value span,
    .yh-edit-box-shadow-y .yh-edit-value span,
    .yh-edit-box-shadow-x .yh-edit-value span{
        width:15px;
    }

    .yh-edit-href {
        width: 100%;
        height: 30px;
        line-height: 30px;
    }
    .yh-edit-href .yh-edit-text {
        height: 28px;
        line-height: 28px;
    }
    .yh-edit-href .yh-edit-value input {
        width: 330px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
    }
</style>