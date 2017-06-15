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
    <div :class="(options.isChild ? '' : 'yh-edit-options')+
                ' yh-edit-choose yh-edit-'+options.stylename+' clearfix'" 
         @mouseleave="hideEditList">
        <div class="yh-edit-text" @click.stop="showEditList">{{options.name}}{{options.name ? ': ' : ''}}</div>
        <div class="yh-edit-value" @click.stop="showEditList">{{options.style[options.stylename] ? getDesignValue : value}}{{options.unit}}</div>
        <!--<div class="yh-edit-value" @click.stop="showEditList">{{options.style[options.stylename] ? options.style[options.stylename] : value}}{{options.unit}}</div>
        --><div class="yh-edit-arrow" @click.stop="showEditList"></div>
        <div class="yh-edit-list">
            <ul>
                <li 
                    v-for="(one,index) in options.list" 
                    :class="options.style[options.stylename] == one? 'active' : ''"
                    :value="options.realList[index]" 
                    :index="index"
                    :style="(options.stylename == 'font-size' ? ('font-size:'+options.realList[index]+options.realunit) : '')"
                    @click.stop="setValue">
                        {{one}}{{options.unit}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        props:['options','type'],
        data(){
            return {
                value:0
            }
        },
        computed:mapState({
            getDesignValue(state){
                let actualValue = this.options.style[this.options.stylename],
                    value,
                    index,
                    status = false

                if(this.options.type === 'number'){
                    status = /(px)/g.test(actualValue)
                    value = parseFloat(actualValue)
                }else{
                    value = actualValue
                }
                index = this.options.realList.indexOf(value)
                if(index == -1){
                    index = this.options.list.indexOf(value)
                }
                return status ? value : (index == -1 ? '' : this.options.list[index])
            }
        }),
        methods:{
            showEditList(e){
                $(e.target).closest('.yh-edit-choose').children('.yh-edit-list').show()
            },
            hideEditList(e){
                $(e.target).closest('.yh-edit-choose').children('.yh-edit-list').hide()
            },
            // yh-edit-options
            setValue(e){
                let target = e.target,
                    value = target.attributes['value'].value,   // 最终设置的值
                    index = target.attributes['index'].value,
                    svalue = this.options.list[index],  // 展示出来的字体大小（针对750的宽）
                    list = $(e.target).closest('.yh-edit-list')
                this.value = svalue
                list.hide()
                
                if(this.type){
                    this.$emit('setValue',
                        this.options.stylename,
                        value+this.options.realunit,
                        svalue+this.options.unit,
                        this.type.index
                    )
                }else{
                    this.options.style[this.options.stylename] = value+this.options.realunit
                    this.$emit('setValue',this.options.stylename,value+this.options.realunit,svalue+this.options.unit)
                }
            }
        }
    }
</script>

<style>
    .yh-edit-choose {
        width:140px;
        position:relative;
        /*background:#fff;*/
    }
    .yh-edit-choose .yh-edit-text {
        width:55px;
        font-size:12px;
        color:#666;
        float:left;
    }
    .yh-edit-choose .yh-edit-value{
        width:60px;
        cursor: pointer;
        float:left;
        text-align: center;
        font-size:12px;
        /*background: #fff;*/
        color:#666;
    }
    .yh-edit-choose .yh-edit-arrow{
        width: 20px;
        height: 20px;
        line-height: 20px;
        cursor: pointer;
        position:relative;
        float:left;
        /*background: #fff;*/
    }
    .yh-edit-choose .yh-edit-arrow:after {
        width: 20px;
        height: 20px;
        line-height: 20px;
        content: "\F0D7";
        font-family: FontAwesome;
        font-size: 12px;
        color: #666;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
    }
    .yh-edit-choose .yh-edit-list > ul > li,
    .yh-edit-choose .yh-edit-list > ul,
    .yh-edit-choose .yh-edit-list{
        width:130px;
        color:#666;
    }
    .yh-edit-choose .yh-edit-list {
        width: 138px;
        display: none;
        position: absolute;
        left: 0;
        top: 100%;
        /*height: 200px;*/
        max-height:200px;
        overflow-y: scroll;
        overflow-x: hidden;
        z-index:10;
    }
    .yh-edit-choose .yh-edit-list > ul > li {
        text-align:center;
        cursor:pointer;
        background:#fff;
    }
    .yh-edit-choose .yh-edit-list > ul > li:hover {
        background:#eee;
    }
    .yh-edit-choose .yh-edit-list > ul > li.active {
        background:#ff0084;
        color:#fff;
    }
</style>