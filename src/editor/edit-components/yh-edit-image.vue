<template>
    <div class="yh-edit-image clearfix"
        :class="setClassname">
        <div class="yh-edit-text">{{options.cn}}：</div>
        <input type="text" class="yh-edit-value"
            v-model="parent[options.en].value"
            @input="setValue" />
        <div class="yh-edit-image-local">
            <!-- accept="image/*" * 通配符会延迟文件选择器的速度，可将其修改为指定的MIME类型，就可以解决Webkit浏览器下的对话框显示滞慢的问题。 -->
            <input type="file" class="yh-edit-imagefile"
                accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                :stylename="options.en"
                @change.stop="uploadFile" />
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
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
        computed:{
            setClassname(){
                let length = this.options.cn.length
                return 'yh-edit-image-'+length
            },
        },
        methods:{
            setBackgroundImageValue(src,data){
                let classname = this.options.en.split('_'),
                    name = '',
                    setArr = ['min_width','min_height'],  // 'width','height',
                    list = [],
                    i = 0,
                    parentName = this.options.parent ? this.options.parent : 'css',
                    eindex = !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index = !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset = this.ischildset ? this.ischildset : '',
                    imgAtrr = '',
                    type = this.options.edittype,
                    edittype = type ? ('set'+type.substring(0,1).toUpperCase()+type.substring(1)+'MultipleValue')
                        : 'setMultipleValue'
                // 默认为background_image
                if(classname.length > 2){
                    name = classname[0]+'_'
                }
                list = [{
                    parent:parentName,
                    eindex:eindex,
                    index:index,
                    ischildset:ischildset,
                    stylename:this.options.en,
                    actualValue:src,
                    designValue:src
                }]
                for(i = 0; i < setArr.length; i++){
                    if(this.parent[name+setArr[i]]){
                        imgAtrr = /(width)/g.test(setArr[i]) ? 'width' : 'height'
                        list.push({
                            parent:parentName,
                            eindex:eindex,
                            index:index,
                            ischildset:ischildset,
                            stylename:name+setArr[i],
                            actualValue:data[imgAtrr], // / (750 / 16)+'rem',
                            designValue:data[imgAtrr]
                        })
                    }
                }
                this.$store.commit(edittype,{
                    ischildset:ischildset,
                    path:this.path,
                    list:list,
                    store:this.$store
                })
            },
            setSrcValue(src,data){
                let classname = this.options.en.split('_'),
                    name = classname.length > 1 ? classname[0]+'_' : '_',
                    setArr = ['width','height'],  // 'width','height',
                    list = [],
                    i = 0,
                    parentName = this.options.parent ? this.options.parent : 'css',
                    eindex = !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index = !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset = this.ischildset ? this.ischildset : '',
                    imgAtrr = '',
                    type = this.options.edittype,
                    edittype = type ? ('set'+type.substring(0,1).toUpperCase()+type.substring(1)+'MultipleValue')
                        : 'setMultipleValue'
                list = [{
                    parent:parentName,
                    eindex:eindex,
                    index:index,
                    stylename:this.options.en,
                    actualValue:src,
                    designValue:src
                }]
                for(i = 0; i < setArr.length; i++){
                    if(this.parent[name+setArr[i]]){
                        imgAtrr = /(width)/g.test(setArr[i]) ? 'width' : 'height'
                        list.push({
                            parent:parentName,
                            eindex:eindex,
                            index:index,
                            ischildset:ischildset,
                            stylename:name+setArr[i],
                            actualValue:data[imgAtrr], // / (750 / 16)+'rem',
                            designValue:data[imgAtrr]
                        })
                    }
                }
                this.$store.commit(edittype,{
                    ischildset:ischildset,
                    path:this.path,
                    list:list,
                    store:this.$store
                })
            },
            setValue(e){
                let target = e.target,
                    value = target.value,
                    stylename = this.options.en,
                    image = null,
                    classname = [],
                    name = '',
                    setArr = [],
                    list = [],
                    i = 0,
                    parentName = '',
                    eindex = -1,
                    index = -1,
                    ischildset = '',
                    imgAtrr = ''
                switch(this.options.mold){
                    case 'bg':
                        image = new Image();
                        (function(self,value){
                            image.onload = function(){
                                self.setBackgroundImageValue(value,image)
                            }
                        })(this,value)
                        image.src = value
                        break
                    default:
                        image = new Image()
                        classname = this.options.en.split(/[_]/g)
                        name = classname.length > 1 ? classname[0]+'_' : '_';
                        (function(self,value){
                            image.onload = function(){
                                self.setSrcValue(value,image)
                            }
                        })(this,value)
                        image.src = value
                        break;
                }
            },
            uploadFile(e){
                let that = e.target,
                    file = that.files[0],
                    fileData = new FormData(),
                    requestdata = this.$store.state.ajaxUrl.File,
                    self = this
                fileData.append('files',file,file.name);
                (function(self,that){
                    //self.$store.state.connhost+'v3/api/editorPC/upload'
                    axios({
                        url:requestdata.url,
                        method:requestdata.type,
                        data:fileData
                    }).then(response => {
                        let data = response.data,
                            name = self.options.mold,
                            stylename = '',
                            value = ''
                        if(self.type){
                            switch(name){
                                case 'src':
                                    stylename = 'yh-src'
                                    value = self.$store.state.fileHost+data.filename
                                    break
                                case 'bg':
                                    stylename = 'background-image'
                                    value = self.$store.state.fileHost+data.filename
                                    break
                            }
                            self.$store.commit('setValue',{
                                parent:self.parent,
                                index:self.index,
                                ischildset:self.ischildset ? self.ischildset : '',
                                stylename:stylename,
                                actualValue:value,
                                designValue:value
                            })
                        }else{
                            switch(name){
                                case 'src':
                                    self.imageChange(self,data)
                                    break
                                case 'audiosrc':
                                    self.otherChange(self,data)
                                    break    
                                case 'bg':
                                    self.setBackgroundImage(self,data)
                                    break
                            }
                        }
                    },response => {
                        console.log(response.body.message)
                    })
                })(self,that)
            },
            otherChange(self,data){
                let src = self.$store.state.fileHost+data.filename
                self.$store.commit('setMultipleValue',{
                    ischildset:self.ischildset ? self.ischildset : '',
                    path:self.path,
                    list:[{
                        parent:this.parent ? this.parent : '',
                        eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                        index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                        ischildset:this.ischildset ? this.ischildset : '',
                        stylename:'audiosrc',
                        actualValue:src,
                        designValue:src
                    }]
                })
            },
            imageChange(self,data){
                let src = self.$store.state.fileHost+data.filename
                self.setSrcValue(src,data)
            },
            setBackgroundImage(self,data){
                let url = self.$store.state.fileHost+data.filename
                self.setBackgroundImageValue(url,data)
            },
        }
    }
</script>
<style lang="scss">
    @import '../css/index.scss';
    .yh-edit-image {
        width: 150px;
        height:20px;
        padding: 0 0 5px 0;
        position: relative;
        float:left;
    }
    .yh-edit-image-3 {
        width:187px;
    }
    .yh-edit-image-4 {
        width:195px;
    }
    .yh-edit-image .yh-edit-text {
        width: 80px;
        height: 20px;
        line-height: 20px;
        text-align: right;
        font-size: 12px;
        color: #666;
        float:left;
    }
    .yh-edit-image-3 .yh-edit-text {
        width:50px;
    }
    .yh-edit-image-4 .yh-edit-text {
        width:60px;
    }
    .yh-edit-image .yh-edit-value {
        width: 113px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #ccc;
        font-size: 12px;
        color: #666;
        background: transparent;
        float:left;
    }
    .yh-edit-image .yh-edit-image-local {
        width: 22px;
        height: 22px;
        background: url($host+'static/images/icons.png') no-repeat -2px -193px;
        position:absolute;
        left:165px;
        top:0;
    }
    .yh-edit-image-4 .yh-edit-image-local {
        left:175px;
    }
    .yh-edit-image .yh-edit-imagefile{
        width: 20px;
        height: 20px;
        border: none;
        opacity:0;
        display: block;
    }
</style>