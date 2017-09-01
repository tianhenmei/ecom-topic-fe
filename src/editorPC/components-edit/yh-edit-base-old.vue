<template>
    <div class="yh-edit-base clearfix">
        <font-size v-if="basewith.indexOf('font-size') != -1" 
            :options="style" :type="type"></font-size>
        <width v-if="basewith.indexOf('width') != -1" 
            :options="style" :type="type"></width>
        <height v-if="basewith.indexOf('height') != -1" 
            :options="style" :type="type"></height>
        <line-height v-if="basewith.indexOf('line-height') != -1" 
            :options="style" :type="type"></line-height>
        <color v-if="basewith.indexOf('color') != -1"
            @setValue="setValue" 
            @setChangeStatus="setChangeStatus" 
            :options="{'style':style,mold:'color',stylename:'color',name:'文本'}" :type="type"></color>
        <color v-if="basewith.indexOf('background-color') != -1"
            @setValue="setValue" 
            @setChangeStatus="setChangeStatus" 
            :options="{'style':style,mold:'color',stylename:'background-color',name:'背景'}" :type="type"></color>
        <yh-edit-image v-if="basewith.indexOf('image') != -1" 
            :options="{'style':style,mold:mold}" :type="type"
            :online="online"></yh-edit-image>
        <border v-if="basewith.indexOf('border') != -1"
            @setValue="setValue" 
            @setChangeStatus="setChangeStatus"
            :options="style" :type="type"
            ></border>
        <box-shadow v-if="basewith.indexOf('box-shadow') != -1" 
            :options="style" :type="type" @setChangeStatus="setChangeStatus"></box-shadow>
        <slot name="otherbase"></slot>
    </div>
</template>
<script>
    import YHEditInput from './yh-edit-input'
    import YHEditOptions from './yh-edit-options'
    import fontSize from './font-size'
    import width from './width'
    import height from './height'
    import lineHeight from './line-height'
    import borderWidth from './border-width'
    import borderStyle from './border-style'
    import color from './yh-edit-color'
    import border from './border'
    import boxShadow from './box-shadow'
    import YHEditImage from './yh-edit-image'

    export default {
        components:{
            'yh-edit-input':YHEditInput,
            'yh-edit-options':YHEditOptions,
            'font-size':fontSize,
            'width':width,
            'height':height,
            'line-height':lineHeight,
            'border-width':borderWidth,
            'border-style':borderStyle,
            'color':color,
            'border':border,
            'box-shadow':boxShadow,
            'yh-edit-image':YHEditImage
        },
        props:['props','mold','without','type','basewith','online'],
        data(){
            if(!(this.basewith && this.basewith.indexOf('box-shadow') == -1)){
                this.getBoxShadow()
            }
            return {
                style:this.props
            }
        },
        methods:{
            setValue(name,value,designValue,status = true){
                if(status){
                    let elem = document.getElementsByClassName('setting'),
                        content = elem.getElementsByClassName('kitty-button-content'),
                        button = elem.getElementsByClassName('yh-button'),
                        i = 0,
                        nameArr = name.split(/-/g)
                        newname = ''
                    for(i = 0; i < nameArr.length; i++){
                        nameArr[i] = nameArr[i].trim()
                        if(nameArr[i]){
                            if(i == 0){
                                newname = nameArr[i]
                            }else(
                                newname += nameArr[i][0].toUpperCase()+nameArr[i].slice(1)
                            )
                        }
                    }
                    for(i = 0; i < button.length; i++){
                        button[i].style[newname] = value
                    }
                    this.style[name] = designValue
                }else{
                    this.style[name] = designValue
                }
            },
            setChangeStatus(status){
                this.$emit('setChangeStatus',true)
            },
            getBoxShadow(){
                if(this.props && this.props['box-shadow-x'] == undefined){
                    switch(this.props['box-shadow']){
                        case 'none':
                            this.props['box-shadow-x'] = 0
                            this.props['box-shadow-y'] = 0
                            this.props['box-shadow-blur'] = 0
                            this.props['box-shadow-color'] = 'transparent'
                            break
                        default:
                            let color = this.props['box-shadow'].match(/(rgb[a]{0,1}\([\d, .]*\))/g),
                                all = [],
                                i = 0,j = 0
                            if(color){
                                this.props['box-shadow-color'] = color[0]
                                all = this.props['box-shadow'].split(/(rgb[a]{0,1}\([\d, .]*\))/g)[2].trim().split(/ /g),
                                j = 1
                            }else{
                                all = this.props['box-shadow'].split(/ /g)
                            }
                            for(i = 0; i < all.length; i++){
                                if(all[i] != ''){
                                    switch(j){
                                        case 0:
                                            this.props['box-shadow-color'] = all[i]
                                            break
                                        case 1:
                                            this.props['box-shadow-x'] = parseFloat(all[i])
                                            break
                                        case 2:
                                            this.props['box-shadow-y'] = parseFloat(all[i])
                                            break
                                        case 3:
                                            this.props['box-shadow-blur'] = parseFloat(all[i])
                                            break
                                        default:
                                            j--
                                            break
                                    }
                                    j++
                                }
                            }
                            break
                    }
                }
            },
        }
    }
</script>