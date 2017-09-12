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
    <div class="yh-edit-checkbox clearfix">
        <div class="yh-edit-text">{{options.cn}}{{options.cn ? '：' : ''}}</div>
        <div class="yh-edit-value clearfix">
            <input
                class="yh-edit-value-input-long"
                type="checkbox"
                :checked="parent[options.en] ? getDesignValue : false"
                :name="elem_id+'_'+options.en"
                @change="setValue"
            />
        </div>
    </div>
</template>
<script>
    export default {
        props:[
            'parent',
            'options',
            'index',
            'eindex',
            'ischildset',
            'elem_id',  // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
            'ischild',
            'path'
        ],
        data(){
            return {}
        },
        computed:{
            getDesignValue(){
                let actualValue = this.parent[this.options.en].value
                return actualValue ? true : false
            }
        },
        methods:{
            getDesign(value){
                return value * (750 / 16)
            },
            // yh-edit-checkbox
            setValue(e){
                let target = e.target,
                    value = target.checked ? 1 : 0,   // // 展示出来的字体大小（针对750的宽）
                    stylename = this.options.en,
                    actualValue = value // unit == realunit ? (value + realunit) : (this.getRemValue(parseFloat(value)) + realunit)
                
                // actualValue : 实际上使用的值
                // value : 展示用的值 （designValue）
                // this.$emit('setValue',stylename,actualValue,value)
                console.log(target.checked)
                if(this.backstatus){
                    this.$emit('setValue',
                        stylename,
                        actualValue,
                        value
                    )
                }else{
                    this.$store.commit('setValue',{
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
</script>

<style>
    .yh-edit-checkbox {
        width:100%;
        padding:0 0 5px 0;
        position:relative;
    }
    .yh-edit-checkbox .yh-edit-text{
        width: 80px;
        height: 25px;
        line-height: 25px;
        float:left;
        text-align:right;
        font-size:12px;
        color:#666;
        /*background: #fff;*/
    }
    .yh-edit-checkbox .yh-edit-value{
        width:115px;
        padding:0 5px 0 0;
        /*background: #fff;*/
        float:left;
    }
    .yh-edit-checkbox .yh-edit-value input {
        width: 93px;
        height: 23px;
        line-height: 23px;
        border:1px solid #ccc;
        float:left;
        font-size: 12px;
        color: #666;
        background: transparent;
    }
    .yh-edit-checkbox .yh-edit-value input.yh-edit-value-input-long{
        width:113px;
    }
    .yh-edit-checkbox .yh-edit-value span {
        width: 20px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 12px;
        color: #666;
        float:left;
    }
    .yh-edit-checkbox .yh-edit-choice {
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
</style>