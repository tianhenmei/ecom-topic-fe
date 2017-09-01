<template>
    <div class="yh-edit-options yh-edit-shadow clearfix">
        <yh-edit-input 
            :eindex="eindex"
            :index="index"
            :parent="parent"
            :options="options"
            :elem_id="elem_id"
            :ischildset="ischildset"
            :ischild="ischild"
            :path="path"></yh-edit-input>
        <yh-edit-input @setValue="setY" :options="list.y" :type="type"></yh-edit-input>
        <yh-edit-input @setValue="setBlur" :options="list.blur" :type="type"></yh-edit-input>
        <yh-edit-color 
            @setValue="setValue" 
            @setChangeStatus="setChangeStatus" 
            :options="shadowColor" :type="type"></yh-edit-color>
    </div>
</template>
<script>
    import YHEditInput from './yh-edit-input.vue'
    import YHEditColor from './yh-edit-color.vue'
    export default {
        components:{
            'yh-edit-input':YHEditInput,
            'yh-edit-color':YHEditColor
        },
        props:[
            'eindex',  // elements中的索引
            'index','parent','options',
            'elem_id',   // 当前被选中元素的ID
            'ischildset',  // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
            'ischild',
            'path'
        ],
        data(){
            return {
                list:{
                    x:{
                        name:'阴影：x',
                        stylename:'box-shadow-x',
                        unit:'px',
                        realunit:'px',
                        type:'number',
                        isChild:true,
                        backstatus:true,   // 回到父级
                        style:this.options
                    },
                    y:{
                        name:'y',
                        stylename:'box-shadow-y',
                        unit:'px',
                        realunit:'px',
                        type:'number',
                        isChild:true,
                        backstatus:true,
                        style:this.options
                    },
                    blur:{
                        name:'blur',
                        stylename:'box-shadow-blur',
                        unit:'px',
                        realunit:'px',
                        type:'number',
                        isChild:true,
                        backstatus:true,
                        style:this.options
                    }
                },
                shadowColor:{
                    name:'',
                    mold:'color',
                    stylename:'box-shadow-color',
                    chinese:'',
                    isChild:true,
                    style:this.options,
                    backstatus:true
                },
                changeStatus:false
            }
        },
        watch:{},
        methods:{
            setChangeStatus(status){
                this.changeStatus = true
                this.$emit('setChangeStatus',true)
            },
            setValue(name,value,designValue){
                this.shadowColor.value = value
                this.options[name] = value
                this.setShadow()
            },
            setX(name,value,designValue){  // value = designValue
                this.list.x.value = value
                this.options[name] = value
                this.setShadow()
            },
            setY(name,value,designValue){
                this.list.y.value = value
                this.options[name] = value
                this.setShadow()
            },
            setBlur(name,value,designValue){
                this.list.blur.value = value
                this.options[name] = value
                this.setShadow()
            },
            setShadow(){
                let last = 
                    (/(px)/g.test(this.options['box-shadow-x'] + '') ? this.options['box-shadow-x'] : this.options['box-shadow-x'] + 'px') + ' ' + 
                    (/(px)/g.test(this.options['box-shadow-y'] + '') ? this.options['box-shadow-y'] : this.options['box-shadow-y'] + 'px') + ' ' + 
                    (/(px)/g.test(this.options['box-shadow-blur'] + '') ? this.options['box-shadow-blur'] : this.options['box-shadow-blur'] + 'px') + ' ' + 
                    this.options['box-shadow-color']
                
                this.$store.commit('setValue',{
                    parent:this.type ? this.type.parent : 'style',
                    index:this.type ? this.type.index : -1,
                    stylename:'box-shadow',
                    actualValue:last,
                    designValue:last
                })
            },
        }
    }
</script>
