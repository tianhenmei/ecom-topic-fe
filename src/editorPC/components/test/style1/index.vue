<style>
    @import './index.css';
</style>
<template>
    <div class="demo-style1" :id="props.id" yh-module="Demo_style1"
        :ref="props.id"
        @click.stop="setAll"
        >
        
        <!-- yh-edit 组件设置 -->
        <yh-edit-complicated
            ref="yh-edit-complicated"
            :css="props.css"
            :elem_id="props.id"
            :common="props.common"
            :owndata="props.data"></yh-edit-complicated>
    </div>
</template>
<script>
    import {recoveryData,getDataID,settingBox,initSelected} from '../../Base/Node.js'
    import YHEditComplicated from '../../../components-edit/yh-edit-complicated.vue'

    const baseData = {
        id:'',
        css:{
            // background: 类名  background_color: css样式background-color
            background_background_color:{
                cn:'背景颜色',
                en:'background_background_color',
                value:'#00c99b'
            },
            // name: 类名  color: css样式color
            name_color:{
                cn:'名称颜色',
                en:'name_color',
                value:'#ffffff'
            }
        },
        common:{

        },
        attribute:{

        },
        data:{  // 卡片数据
            
        }
    }
    export default {
        props:['props'],
        components:{
            'yh-edit-complicated':YHEditComplicated
        },
        data(){
            return {
                baseData:JSON.parse(JSON.stringify({
                    id:baseData.id,
                    css:baseData.css,
                    attribute:baseData.attribute,
                    data:baseData.data,
                    common:baseData.common
                }))
            }
        },
        mounted(){
            
        },
        methods:{
            recoveryData,
            getDataID,
            settingBox,
            initSelected,
            setAll(e){
                let id = this.initSelected(e)
                this.$refs[id].className += ' setting'
                let yh_edit_layer = this.$refs['yh-edit-complicated'].$refs[id+'-yh-edit-layer']
                yh_edit_layer.className = yh_edit_layer.className.replace(/( hide)/g,'')
                this.settingBox(this.$refs[id])
            },
            recoveryModuleData(elem,baseData){
                let data = {},
                    attr = '',
                    current = null,
                    currentChild = null,
                    i = 0,curr = '',
                    childdata = {}
                for(attr in baseData.data){ 
                    
                }
                return {
                    data:data
                }
            }
        },
        initCtor(options){
            let data = Object.assign(
                {},
                JSON.parse(JSON.stringify({
                    css:baseData.css,
                    attribute:baseData.attribute,
                    data:baseData.data,
                    common:baseData.common
                })),
                options
            )
            return data
        },
        recoveryCtor(elem,options){
            let data = Object.assign(
                {},
                this.methods.recoveryData(elem,baseData),
                this.methods.recoveryModuleData(elem,baseData),
                {
                    common:baseData.common
                },
                options
            )
            return data
        }
    }
</script>