<template>
    <yh-edit-input 
        @setValue="setValue" 
        :options="optionsData" >
        <div slot="chooser">
            <input class="yh-edit-vcolor" 
                    type="color"
                    @click.stop="setChangeStatus"
                    @change.stop="colorChange" />
            <ul class="yh-edit-list clearfix">
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
        props:['options','type'],
        data(){
            let name = this.options.mold ? this.options.mold : ''
            return {
                optionsData:{
                    name:this.options.name,
                    mold:name,
                    stylename:this.options.stylename,
                    unit:'',
                    realunit:'',
                    type:'text',
                    withoutText:false,
                    isChild:this.options.isChild ? true : false,
                    style:this.options.style
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
            var textInput = $(this.$el).find('.yh-edit-value > input')[0]
            textInput.addEventListener('focus',this.showEditLayer)
            this.$el.addEventListener('mouseleave',this.hideEditLayer)
        },
        methods:{
            showEditLayer(e){
                $(e.target).closest('.yh-edit-input').find('.yh-edit-list').show()
                this.changeStatus = false
            },
            hideEditLayer(e){
                if(!this.changeStatus){
                    $(e.target).closest('.yh-edit-input').find('.yh-edit-list').hide()
                }
            },
            setValue(name,actualValue,value){
                if(this.options.backstatus){
                    this.$emit('setValue',name,value,value)
                }else{
                    this.$store.commit('setValue',{
                        parent:this.type ? this.type.parent : 'style',
                        index:this.type ? this.type.index : -1,
                        stylename:name,
                        actualValue:value,
                        designValue:value
                    })
                }
            },
            setChangeStatus(e){
                this.changeStatus = true
                this.$emit('setChangeStatus',true)
            },
            colorChange(e){
                let target = e.target,
                    value = target.value,
                    input = $(target).closest('.yh-edit-input').find('.yh-edit-value > input')
                
                this.setValue(this.options.stylename,value,value)
                input.val(value)
            },
            setColor(e){
                let target = e.target,
                    value = target.attributes['value'].value,
                    input = $(target).closest('.yh-edit-input').find('.yh-edit-value > input')

                this.setValue(this.options.stylename,value,value)
                input.val(value)
            }
        }
    }
</script>
<style>
    .yh-edit-color {
        width:125px;
        padding:0 5px 0 0;
    }
    .yh-edit-color .yh-edit-list {
        width:176px;
        position: absolute;
        left: 0;
        top: 100%;
        background: #fff;
        padding:2px 0 0 2px;
        display:none;
        z-index: 10;
    }
    .yh-edit-color .yh-edit-list li {
        width:18px;
        height:18px;
        margin:0 2px 2px 0;
        border:1px solid #efefef;
        cursor:pointer;
        float:left;
    }
    .yh-edit-color .yh-edit-list li.transparent{
        background:url('http://localhost:9000/static/images/icons.png') no-repeat 0 -1700px;
    }
    .yh-edit-color .yh-edit-text{
        width:40px;
        font-size:12px;
        position:relative;
    }
    .yh-edit-color .yh-edit-value{
        width:85px;
    }
    .yh-edit-color .yh-edit-value input {
        width:65px;
    }
    .yh-edit-color .yh-edit-vcolor {
        width:20px;
        height:20px;
        border:none;
        position:absolute;
        right:5px;
        top:0;
    }



    /**yh-edit-border-color***/
    .yh-edit-box-shadow-color,
    .yh-edit-border-color{
        width:85px;
    }
    .yh-edit-box-shadow-color .yh-edit-text,
    .yh-edit-border-color .yh-edit-text{
        display:none;
    }
</style>