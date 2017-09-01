<template>
    <yh-edit-input 
        @setValue="setValue" 
        :options="optionsData"
        :ischildset="ischildset"
        :eindex="eindex"
        :index="index"
        :path="path" >
        <div slot="chooser" class="yh-edit-chooser">
            <input class="yh-edit-vcolor" 
                type="color"
                @click.stop="setChangeStatus"
                @change.stop="colorChange" />
            <ul class="yh-edit-list clearfix" ref="yh-edit-list">
                <li v-for="one in list" 
                    :class="one == 'transparent' ? 'transparent' : ''" 
                    :value="one" 
                    :style="'background-color:'+one"
                    @click.stop="setColor"
                    ></li>
            </ul>
        </div>
    </yh-edit-input>
</template>
<script>
    import YHEditInput from './yh-edit-input.vue'
    export default {
        components:{
            'yh-edit-input':YHEditInput,
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
                optionsData:{
                    name:this.options.cn,
                    stylename:this.options.en,
                    unit:'',
                    realunit:'',
                    type:'text',
                    classname:'color',
                    style:this.parent
                },
                list:[
                    '#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF',
                    '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF',
                    '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE',
                    '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD',
                    '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5',
                    '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B',
                    '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842',
                    '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031',
                    'transparent'
                ],
                changeStatus:false
            }
        },
        mounted(){
            // @mouseenter="showEditLayer"
            // @mouseleave="hideEditLayer"
            var textInput = this.$el.getElementsByClassName('yh-edit-value')[0].getElementsByTagName('input')[0]
            textInput.addEventListener('focus',this.showEditLayer)
            this.$el.addEventListener('mouseleave',this.hideEditLayer)
        },
        methods:{
            showEditLayer(e){
                // $(e.target).closest('.yh-edit-input').find('.yh-edit-list').show()
                this.$refs['yh-edit-list'].style.display = 'block'
                this.changeStatus = false
            },
            hideEditLayer(e){
                if(!this.changeStatus){
                    // $(e.target).closest('.yh-edit-input').find('.yh-edit-list').hide()
                    this.$refs['yh-edit-list'].style.display = 'none'
                }
            },
            setValue(name,actualValue,value){
                let type = this.options.edittype,
                    edittype = type ? ('set'+type.substring(0,1).toUpperCase()+type.substring(1)+'Value')
                        : 'setValue'
                if(this.options.backstatus){
                    this.$emit('setValue',name,value,value)
                }else{
                    this.$store.commit(edittype,{
                        parent:this.options.parent ? this.options.parent : 'css',
                        eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                        index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                        ischildset:this.ischildset ? this.ischildset : '',
                        stylename:name,
                        actualValue:value,
                        designValue:value,
                        path:this.path,
                        store:this.$store
                    })
                }
            },
            setChangeStatus(e){
                this.changeStatus = true
                this.$emit('setChangeStatus',true)
            },
            colorChange(e){
                let target = e.target,
                    value = target.value //,
                    // input = $(target).closest('.yh-edit-input').find('.yh-edit-value > input')
                
                this.setValue(this.options.en,value,value)
                // input.val(value)
            },
            setColor(e){
                let target = e.target,
                    value = target.attributes['value'].value//,
                    // input = $(target).closest('.yh-edit-input').find('.yh-edit-value > input')

                this.setValue(this.options.en,value,value)
                // input.val(value)
            }
        }
    }
</script>
<style lang="scss">
    @import '../css/index.scss';
    .yh-edit-chooser {
        width:25px;
        height:25px;
        float:left;
        position:relative;
    }
    .yh-edit-chooser .yh-edit-vcolor {
        width:25px;
        height:25px;
        border:none;
        position:absolute;
        left:0;
        top:0;
    }
    .yh-edit-chooser .yh-edit-list {
        width:176px;
        position: absolute;
        right: 0;
        top: 100%;
        background: #fff;
        padding:2px 0 0 2px;
        box-shadow: 0 0 10px #ccc;
        display:none;
        z-index: 10;
    }
    .yh-edit-chooser .yh-edit-list li {
        width:18px;
        height:18px;
        margin:0 2px 2px 0;
        border:1px solid #efefef;
        cursor:pointer;
        float:left;
    }
    .yh-edit-chooser .yh-edit-list li.transparent{
        background:url($host+'static/images/icons.png') no-repeat 0 -1700px;
    }
</style>