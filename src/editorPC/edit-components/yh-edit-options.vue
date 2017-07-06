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
    list  展示用的选项列表值
    realList  实际用到的列表值
-->
<template>
    <div class="yh-edit-options clearfix" 
        ref="yh-edit-options"
        @mouseleave="hideEditList">
        <div class="yh-edit-text" @click.stop="showEditList">{{options.cn}}{{options.cn ? '：' : ''}}</div>
        <div class="yh-edit-value" @click.stop="showEditList">{{parent[options.en] ? getDesignValue : value}}{{options.unit ? options.unit : ''}}</div>
        <div class="yh-edit-arrow" @click.stop="showEditList"></div>
        <div class="yh-edit-list" ref="yh-edit-list">
            <ul>
                <li 
                    v-for="(one,index) in options.options" 
                    :value="one.value" 
                    :index="index"
                    :style="(options.en == 'font-size' ? ('font-size:'+one.value + options.realunit) : '')"
                    @click.stop="setValue">
                        {{one.cn}}{{options.unit ? options.unit : ''}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        props:[
            'eindex',
            'index',
            'parent',
            'options',
            'elem_id',   // 当前被选中元素的ID
            'ischildset',  // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
            'ischild',
            'path'
        ],
        data(){
            return {
            }
        },
        computed:mapState({
            getDesignValue(state){
                let one = this.parent[this.options.en],
                    value = one.value,
                    cnvalue = one.cnvalue
                return cnvalue ? cnvalue : (/(px)/g.test(value) ? parseFloat(value) : value)
            }
        }),
        methods:{
            showEditList(e){
                this.$refs['yh-edit-list'].style.display = 'block'
            },
            hideEditList(e){
                this.$refs['yh-edit-list'].style.display = 'none'
            },
            // yh-edit-options
            setValue(e){
                let target = e.target,
                    value = target.attributes['value'].value,   // 最终设置的值
                    index = parseInt(target.attributes['index'].value),
                    svalue = this.options.options[index],  // 展示出来的字体大小（针对750的宽）
                    cnvalue = this.options.options[index].cn,
                    list = this.$refs['yh-edit-list']
                list.style.display = 'none'
                
                if(this.options.backstatus){
                    this.$emit('setValue',
                        this.options.en,
                        value+(this.options.realunit ? this.options.realunit : ''),
                        svalue+(this.options.unit ? this.options.unit : ''))
                }else{
                    this.$store.commit('setValue',{
                        parent:this.options.parent ? this.options.parent : 'css',
                        eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                        index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                        ischildset:this.ischildset ? this.ischildset : '',
                        stylename:this.options.en,
                        actualValue:value+(this.options.realunit ? this.options.realunit : ''),
                        designValue:svalue+(this.options.unit ? this.options.unit : ''),
                        cnvalue:cnvalue,
                        path:this.path
                    })
                }
            }
        }
    }
</script>

<style>
    .yh-edit-options {
        width: 100%;
        padding: 0 0 5px 0;
        position: relative;
    }
    .yh-edit-options .yh-edit-text {
        width: 80px;
        height: 25px;
        line-height: 25px;
        float: left;
        text-align: right;
        font-size: 12px;
        color: #666;
    }
    .yh-edit-options .yh-edit-value{
        width: 113px;
        height: 23px;
        line-height: 23px;
        border: 1px solid #ccc;
        float: left;
        font-size: 12px;
        color: #666;
        background: transparent;
        margin: 0 5px 0 0;
        float: left;
    }
    .yh-edit-options .yh-edit-arrow{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin: 2px 0 0 0;
        cursor: pointer;
        position:relative;
        float:left;
        background: #ff47a3;
    }
    .yh-edit-options .yh-edit-arrow:after {
        width: 20px;
        height: 20px;
        line-height: 20px;
        content: "\F0D7";
        font-family: FontAwesome;
        font-size: 12px;
        color: #fff;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
    }
    .yh-edit-options .yh-edit-list > ul > li,
    .yh-edit-options .yh-edit-list > ul,
    .yh-edit-options .yh-edit-list{
        width:100px;
        color:#666;
    }
    .yh-edit-options .yh-edit-list {
        width: 113px;
        display: none;
        position: absolute;
        left: 80px;
        top: 24px;
        border: 1px solid #ccc;
        /* height: 200px; */
        max-height: 200px;
        overflow-y: scroll;
        overflow-x: hidden;
        z-index: 10;
    }
    .yh-edit-options .yh-edit-list > ul > li {
        line-height:25px;
        text-align:center;
        cursor:pointer;
        background:#fff;
    }
    .yh-edit-options .yh-edit-list > ul > li:hover {
        background:#eee;
    }
    .yh-edit-options .yh-edit-list > ul > li.active {
        background:#ff0084;
        color:#fff;
    }
</style>