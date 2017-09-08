<template>
    <div :id="props.id" kitty-text 
            :yh-path="path"
            :class="props.classname"
            :style="{
                left:props.css.left.value+'rem',
                top:props.css.top.value+'rem',
                position: 'absolute'
            }"
            @mouseenter.stop.prevent="showEditLayer" 
            @mouseleave.stop.prevent="hideEditLayer">
        <div class="kitty-text-content" contenteditable="true" spellcheck="false" 
            :style="props.style" 
            @dblclick="focusSelection" 
            @mousedown="deleteLastRange" 
            @mouseup="saveSelectionRange"
            @blur="contentChange"
            rotate
            v-html="props.content">
        </div>
        <!--@mousemove="saveSelectionRange"-->
        <div class="yh-edit-layer">
            <ul class="clearfix" 
                    @click="setStyleEvent" 
                    >
                <li v-for="(one,index) in cmd" class="yh-edit-normal" 
                    :class="specialClass(one)" 
                    :cmd="JSON.stringify(one)" 
                    :yh-name="index">
                    <div v-if="!one.change && one.list" class="yh-tedit clearfix">
                        <div class="yh-tedit-text">{{one.cn ? one.cn+'：' : one.cn}}</div>
                        <div class="yh-tedit-value">{{one.value}}</div>
                        <div v-if="one.realunit" class="yh-tedit-unit">{{one.realunit}}</div>
                        <div class="yh-tedit-arrow"></div>
                        <div class="yh-tedit-list-parent" v-if="one.reallist" v-show="one.status">
                            <ul class="yh-tedit-list">
                                <li v-for="(vlist,vindex) in one.reallist" :value="one.list[vindex]" :style="'font-size:'+one.list[vindex]+one.unit">{{vlist}}{{one.realunit}}</li>
                            </ul>
                        </div>
                        <ul class="yh-tedit-list" v-else>
                            <li v-for="vlist in one.list" :value="vlist" :style="'font-size:'+vlist+'px'">{{vlist}}{{one.unit}}</li>
                        </ul>
                    </div>
                    <div v-if="one.change == 1" class="yh-tedit clearfix">
                        <div class="yh-tedit-text">{{one.cn ? one.cn+'：' : one.cn}}</div>
                        <!-- <p :style="'color: '+color"></p> -->
                        <div class="yh-tedit-cmore clearfix">
                            <input type="text" v-model="color" />
                            <input type="color" v-model="color" @blur="colorBur" />
                        </div>
                        <!-- <div class="yh-tedit-arrow"></div> -->
                        <ul class="yh-tedit-list clearfix" v-show="one.status">
                            <li v-for="vlist in one.list" :value="vlist" :style="'background-color:'+vlist"></li>
                        </ul>
                    </div>
                    <div v-if="one.change == 2" class="yh-tedit clearfix">
                        <div class="yh-tedit-text">{{one.cn ? one.cn+'：' : one.cn}}</div>
                        <!-- <p :style="'color: '+bgColor"></p> -->
                        <div class="yh-tedit-cmore clearfix">
                            <input type="text" v-model="color" />
                            <input type="color" v-model="color" @blur="colorBur" />
                        </div>
                        <!-- <div class="yh-tedit-arrow"></div> -->
                        <ul class="yh-tedit-list clearfix" v-show="one.status">
                            <li v-for="vlist in one.list" :one="vlist" :style="'background-color:'+vlist"></li>
                        </ul>
                    </div>
                    <div v-if="one.modal" class="yh-tedit clearfix" contenteditable="true">
                        <div class="yh-tedit-text">{{one.cn ? one.cn+'：' : one.cn}}</div>
                        <div class="yh-tedit-value" @click="changeLink"></div>
                        <ul class="yh-tedit-list yh-tedit-modal clearfix">
                            <li class="yh-tedit-cmore clearfix" @click.stop.prevent="setLinkEvent">
                                <input class="yh-tedit-clink" type="text" v-model="link" placeholder="http://www" />
                                <label><input class="yh-tedit-ccheck" type="radio" name="linkMode" checked="checked" />新窗口打开</label>
                                <div class="yh-tedit-btn clearfix">
                                    <div class="yh-tedit-button yh-tedit-sure" @click.stop.prevent="setLink">确定</div>
                                    <div class="yh-tedit-button yh-tedit-undo" @click.stop.prevent="undoLinkSet">取消</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import MW from './bus.js'
    import {DOM,Execute} from './text-dom.js'
    export default {
        data(){
            return {
                cmd:{
                    fontSize:{
                        cn: '字体大小', 
                        en: 'font-size', 
                        value: 24, 
                        initValue: 24,
                        unit:'rem',
                        realunit:'px',
                        list:[0.512, 0.5546666666666666, 0.5973333333333334, 0.64, 0.768, 
                                0.8106666666666666, 0.8533333333333334, 0.896, 0.9386666666666666,
                                0.9813333333333333, 1.024, 1.28, 1.536, 2.048, 2.304, 2.56],
                        reallist:[24, 26, 28, 30, 36, 38, 40, 42, 44, 46, 48, 60, 72, 96, 108, 120],
                        status:false
                    },
                    color:{
                        cn:'字体颜色',
                        en: 'color', 
                        value: '#666666', 
                        initValue: '#666666',
                        unit:'',
                        change:1,
                        list:[
                            '#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF',
                            '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF',
                            '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE',
                            '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD',
                            '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5',
                            '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B',
                            '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842',
                            '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'
                        ],
                        status:false
                    },
                    backgroundColor:{
                        cn:'背景颜色',
                        en: 'background-color', 
                        value: 'rgba(0,0,0,0)', 
                        initValue: 'rgba(0,0,0,0)', 
                        unit:'',
                        change:2,
                        list:[
                            '#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF',
                            '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF',
                            '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE',
                            '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD',
                            '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5',
                            '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B',
                            '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842',
                            '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031',
                            'rgba(0,0,0,0)'
                        ],
                        status:false
                    },
                    lineHeight:{
                        cn: '行高', 
                        en: 'line-height', 
                        value: 1, 
                        initValue: 1,
                        unit:'',
                        list:[1, 1.2, 1.5, 2, 2.5, 3]
                    },
                    bold:{
                        cn: '粗体', 
                        active: false, 
                        en: 'font-weight', 
                        value: 'bold', 
                        initValue:'normal'
                    },
                    italic: {
                        cn: '斜体', 
                        en:'italic',
                        active: false, 
                        en: 'font-style', 
                        value: 'italic', 
                        initValue:'normal'
                    },
                    linethrough: {
                        cn: '中划线', 
                        en:'linethrough',
                        active: false, 
                        en: 'text-decoration', 
                        value: 'line-through', 
                        initValue:'none',
                        relative:['underline']
                    },
                    underline: {
                        cn: '下划线', 
                        active: false, 
                        en: 'text-decoration', 
                        value: 'underline', 
                        initValue:'none',
                        relative:['linethrough']
                    },
                    // superscript: {
                    //     cn: '上划线', 
                    //     active: false, 
                    //     en: 'vertical-align', 
                    //     value: 'super', 
                    //     initValue:'baseline',
                    //     relative:['subscript']
                    // },
                    // subscript: {
                    //     cn: '下划线', 
                    //     active: false, 
                    //     en: 'vertical-align', 
                    //     value: 'sub', 
                    //     initValue:'baseline',
                    //     relative:['superscript']
                    // },
                    left: {
                        cn: '左对齐', 
                        active: false, 
                        en: 'text-align', 
                        value: 'left', 
                        initValue:'center',
                        relative:['center','right','justify']
                    },
                    center: {
                        cn: '居中', 
                        active: true, 
                        en: 'text-align', 
                        value: 'center', 
                        initValue:'center',
                        relative:['left','right','justify']
                    },
                    right: {
                        cn: '右对齐', 
                        active: false, 
                        en: 'text-align', 
                        value: 'right', 
                        initValue:'center',
                        relative:['left','center','justify']
                    },
                    justify: {
                        cn: '左右对齐', 
                        active: false, 
                        en: 'text-align', 
                        value: 'justify', 
                        initValue:'center',
                        relative:['left','right','center']
                    },
                    indent: {
                        cn: '缩进', 
                        active: false, 
                        en: 'margin-left',
                        value:25,
                        value: '0px',
                        initValue:0,
                        relative:['outdent']
                    },
                    outdent: {
                        cn: '伸出', 
                        active: false, 
                        en: 'margin-left',
                        value:-25,
                        value: '0px', 
                        initValue:0,
                        relative:['indent']
                    },
                    ol: {
                        cn: '有序列表', 
                        active: false, 
                        en: 'margin-left',
                        value: '25px',
                        initValue:0,
                        relative:['ul']
                    },
                    ul: {
                        cn: '无序列表', 
                        active: false, 
                        en: 'margin-left',
                        value: '25px',
                        initValue:0,
                        relative:['ol']
                    },
                    // img: {
                    //     cn: '图片', 
                    //     cmd: 'insertImage', 
                    //     valign: 'bottom', 
                    //     value: '',
                    //     modal: 'hidden',
                    //     error: ''
                    // },
                    link: {
                        cn: '链接', 
                        active: false, 
                        value: '', 
                        cmd: 'createLink', 
                        modal: 'hidden',
                        blank: false,
                        error: ''
                    },
                    unlink:{
                        cn: '去掉链接', 
                        active: false, 
                        cmd: 'unlink'
                    },
                },
                isChanging:false,
                linkChangeStatus:false,
                color:'#666666',
                bgColor:'rgba(0,0,0,0)',
                link:''
            }
        },
        props:[
            'props',
            'path',
            'parentmodule',
            'withoutedit',
            'eindex'
        ],
        methods:{
            getRemValue(value){
                return value / (750 / 16);
            },
            getRem(value){
                return value / (750 / 16) + 'rem';
            },
            specialClass(data){
                let str = 'yh-edit-normal-'+data.cn.length+' '
                if(data.change){
                    return str+'yh-edit-color'
                }else if(data.list || data.modal){
                    return str+'yh-edit-list' + (data.active ? ' active' : '')
                }else{
                    return str+'yh-edit-'+data.en+' ' + (data.active ? ' active' : '')
                }
            },
            showEditLayer(e){
                let elem = $(e.target)
                // if(!elem.hasClass('setting')){
                //     return
                // }
                elem.addClass('white-bg')
                elem.children('.yh-edit-layer').show();
                
                // console.log('showEditLayer: '+this.linkChangeStatus)
                if(this.linkChangeStatus == 2){
                    this.linkChangeStatus = false
                }
                // 展示编辑层，恢复当前选中元素的编辑数据
                this.recoveryEditData(elem)
            },
            hideEditLayer(e){
                // console.log('hideEditLayer: '+this.isChanging)
                // console.log('hideEditLayer: '+this.linkChangeStatus)
                let elem = $(e.target)
                if(this.linkChangeStatus == false){
                    elem.find('.yh-tedit-list,.yh-tedit-list-parent').hide()
                }
                if(!this.isChanging && this.linkChangeStatus == false){
                    elem.removeClass('white-bg')
                    elem.children('.yh-edit-layer').hide();
                }
                MW.bus.$emit('blurSelection')
            },
            recoveryEditData(hoverElem){
                let styleJSON = DOM.recoveryEditData(hoverElem)
                this.initCmd()
                this.setCmd(styleJSON)
            },
            changeColor(now,old){
                DOM.restoreRange()
                var elem = $('.setting > .yh-edit-layer [yh-name="color"] input[type="color"]')
                this.setStyle(elem[0])
                this.isChanging = false
            },
            changeBColor(now,old){
                DOM.restoreRange()
                var elem = $('.setting > .yh-edit-layer [yh-name="backgroundColor"] input[type="color"]')
                this.setStyle(elem[0])
                this.isChanging = false
            },
            changeLink(e){
                var elem = $('.setting > .yh-edit-layer [yh-name="link"] .yh-tedit-cmore > input')
                this.setStyle(elem[0])
                this.isChanging = true
                this.linkChangeStatus = true
            },
            colorBur(e){
                this.isChanging = true
                // console.log('colorBur: '+this.isChanging)
            },
            setLinkEvent(e){

            },
            setLink(e){
                let elem = $('.setting > .yh-edit-layer [yh-name="link"] .yh-tedit-cmore > input')
                
                this.isChanging = false
                this.linkChangeStatus = 2
                this.cmd.link.active = true
                this.cmd['unlink'].active = false

                this.setStyle(elem[0])
            },
            undoLinkSet(e){
                this.isChanging = false
                this.linkChangeStatus = 2
                $(e.target).closest('.yh-tedit-list,.yh-tedit-list-parent').hide()
            },
            setStyleEvent(e){
                this.setStyle(e.target)
            },
            setStyle(target){
                MW.textEditing = true
                let that = $(target),
                    normal = that.hasClass('yh-edit-normal'),  // true 直接设置的元素
                    li = normal ? that : that.closest('.yh-edit-normal'),  // li [yh-name]
                    hasLi = normal || that.closest('.yh-edit-normal').length > 0

                DOM.restoreRange()
                let elem = null,
                    firstCommonParent = null,
                    nextNode = null,
                    parent = null,
                    hasRange = DOM.isSelectedRange(),
                    startOffset = 0,
                    endOffset = 0,
                    // 普通    颜色     链接
                    nowEditStatus = target.tagName.toLowerCase() == 'li' || target.type == 'color' || (that.hasClass('yh-tedit-clink') && this.linkChangeStatus == 2)

                // 普通    颜色     链接
                if(nowEditStatus){
                    let rangeStatus = true
                    if(hasRange){ // 当前有选择文本
                        if(nowEditStatus){
                            firstCommonParent = DOM.getFirstCommonParent()
                            elem = DOM.getRangeElem()
                        }else{
                            elem = $('.setting').children('.kitty-text-content')
                            hasRange = false;
                        }
                    }else{ // 当前没有选择文本
                        elem = $('.setting').children('.kitty-text-content')
                        rangeStatus = false
                    }
                    let data = JSON.parse(li[0].attributes['cmd'].value),
                        name = li.attr('yh-name'),
                        elemValue = data.initValue

                    switch(name){
                        case 'indent':  // 缩进
                        case 'outdent':  // 伸出
                            elemValue = data.value
                            if(rangeStatus){
                                let elemParent = DOM.getParentLi(elem,false)
                                Execute.setIndent(elemValue,elemParent,this)
                            }else{
                                let cParent = DOM.getCursorPosition()
                                if(!cParent || cParent.attributes['yh-name']){
                                    alert('* 请先选择需要缩进或伸出的元素！')
                                }else{
                                    Execute.setIndent(elemValue,[cParent],this)
                                }
                            }
                            // data.value = lastValue+'rem'
                            break
                        case 'ol':
                        case 'ul':
                            let cParent = DOM.getCursorPosition(),
                                relativeName = name == 'ol' ? 'ul' : 'ol',
                                elemLi = []/*,
                                elstatus = DOM.getAllElementStatus(elem)
                            
                            if(elstatus){
                                elemLi = DOM.getParentLi(elem,false)
                            }else{
                                elemLi = DOM.getParentLi(elem,false)
                                // elemLi = DOM.getParentLi(elem)
                            }*/
                            if(rangeStatus){
                                elemLi = DOM.getParentLi(elem,false)
                            }else{
                                elemLi = [cParent]
                            }
                            if(cParent){
                                if(this.cmd[name].active){
                                    Execute.unwrapLi(cParent)
                                    this.cmd[name].active = false
                                }else{
                                    if(elemLi.length > 0){
                                        for(let el = 0; el < elemLi.length; el++){
                                            if(elemLi[el]){
                                                Execute.wrapLi(elemLi[el],name)
                                            }else{
                                                Execute.wrapLi(cParent,name)
                                                break
                                            }
                                        }
                                    }else{
                                        Execute.wrapLi(cParent,name)
                                    }
                                    this.cmd[name].active = true
                                    this.cmd[relativeName].active = false
                                    DOM.removeRange()
                                }
                            }
                            break
                        default:
                            if(normal){  // 能直接设置的
                                if(!data.active){
                                    elemValue = data.value
                                }
                                data.active = !data.active
                                this.cmd[name].active = data.active
                            }else{  // 有下拉列表的
                                let attrKey = data.value == undefined ? 'value' : 'value'
                                data[attrKey] = target.tagName.toLowerCase() == 'input' ? that.val() :that.attr('value')
                                elemValue = data[attrKey] + (this.cmd[name].unit ? this.cmd[name].unit : '')
                                
                                if(name == 'fontSize'){
                                    this.cmd[name][attrKey] = data['reallist'][that.index()]
                                }else{
                                    this.cmd[name][attrKey] = data[attrKey]
                                }
                                if(!this.linkChangeStatus || this.linkChangeStatus == 2){
                                    li.find('.yh-tedit-list,.yh-tedit-list-parent').hide()
                                }
                            }
                            if(hasRange){
                                switch(name){
                                    case 'unlink':
                                        document.execCommand(this.cmd[name].cmd,false)
                                        this.cmd[name].active = false
                                        this.cmd['link'].active = false
                                        this.cmd['link'].value = ''
                                        this.link = ''
                                        break
                                    case 'link':
                                        let linkEdit = that.closest('.yh-tedit-cmore'),
                                            status = linkEdit.find('.yh-tedit-ccheck')[0].checked,
                                            linkAttr = status ? 'target="_blank"' : ''

                                        this.cmd.link.value = elemValue
                                        this.cmd.link.blank = status

                                        if(DOM.getChildNodesLength(firstCommonParent[0]) == elem.length && (firstCommonParent.attr('style')+'').indexOf(data.en) != -1){
                                            firstCommonParent.html('<a href="'+elemValue+'" '+linkAttr+'>'+firstCommonParent.html()+'</a>')
                                        }else{
                                            for (let i = 0; i < elem.length; i++){
                                                elem[i].html('<a href="'+elemValue+'" '+linkAttr+'>'+elem[i].html()+'</a>')
                                            }
                                        }
                                        break
                                    default:
                                        for (let i = 0; i < elem.length; i++){
                                            elem[i].css(data.en,elemValue)
                                        }
                                        if(DOM.equalHtml(firstCommonParent,elem) && (firstCommonParent.attr('style')+'').indexOf(data.en) != -1){
                                            firstCommonParent.css(data.en,elemValue)
                                        }
                                        break
                                }
                                switch(name){
                                    case 'link':
                                        DOM.saveChangeRange(elem[0].children()[0].firstChild,0,elem[elem.length-1].children()[0].firstChild,elem[elem.length-1].children().html().length)
                                        break
                                    default:
                                        DOM.saveChangeRange(elem[0][0].firstChild,0,elem[elem.length-1][0].firstChild,elem[elem.length-1].html().length)
                                        break
                                }
                                DOM.restoreRange()
                            }else{
                                switch(name){
                                    case 'link':
                                    case 'unlink':
                                        break
                                    default:
                                        elem.css(data.en,elemValue)
                                        break
                                }
                            }
                    }  // switch
                    let textContent = this.$el.getElementsByClassName('kitty-text-content')[0]
                    this.content = textContent.innerHTML
                    MW.bus.$emit(
                        'updateContent',
                        this.content,
                        Execute.getStyleJSON(textContent.style.cssText),
                        this.$el.id
                    )
                }else if(hasLi){
                    li.find('.yh-tedit-list,.yh-tedit-list-parent').show()
                }
                MW.textEditing = false
            },
            focusSelection(e){
                MW.bus.$emit('focusSelection')
            },
            saveSelectionRange(e){
                // if(!MW.moveStatus){
                //     e.stopPropagation()
                // }
                // if(!MW.moveStatus){
                    if(!MW.textEditing && DOM.getSelectionRange()){
                        DOM.saveRange()
                    }else{
                        // DOM.removeRange()
                    }
                    // 展示编辑层，恢复当前选中元素的编辑数据
                    this.recoveryEditData($(e.target))
                // }
            },
            deleteLastRange(e) {
                // if(!MW.moveStatus){
                //     e.stopPropagation()
                // }
                DOM.saveRange()
                // 展示编辑层，恢复当前选中元素的编辑数据
                // var range = this.getSelectionRange()
                DOM.restoreRange()
                this.recoveryEditData()
                // DOM.removeRange()
            },
            contentChange(e){
                let target = e.target,
                    html = target.innerHTML
                MW.bus.$emit(
                    'updateContent',
                    html,
                    Execute.getStyleJSON(target.style.cssText),
                    target.parentNode.id
                )
            },
            setCmd(styleJSON){
                for( let s in styleJSON){
                    switch(s){
                        case 'font-size':
                            this.cmd['fontSize'].value = parseInt(parseFloat(styleJSON[s]) * (750 / 16))
                            break
                        case 'font-weight':
                            switch(styleJSON[s]){
                                case 'bold':
                                    this.cmd['bold'].active = true
                                    break
                            }
                            break
                        case 'font-style':
                            switch(styleJSON[s]){
                                case 'italic':
                                    this.cmd['italic'].active = true
                                    break
                            }
                            break
                        case 'text-decoration':
                            switch(styleJSON[s]){
                                case 'line-through':
                                    this.cmd['linethrough'].active = true
                                    break
                                case 'underline':
                                    this.cmd['underline'].active = true
                                    break
                            }
                            break
                        case 'vertical-align':
                            switch(styleJSON[s]){
                                case 'super':
                                    this.cmd['superscript'].active = true
                                    break
                                case 'sub':
                                    this.cmd['subscript'].active = true
                                    break
                            }
                            break
                        case 'text-align':
                            switch(styleJSON[s]){
                                case 'left':
                                    this.cmd['left'].active = true
                                    break
                                case 'center':
                                    this.cmd['center'].active = true
                                    break
                                case 'right':
                                    this.cmd['right'].active = true
                                    break
                                case 'justify':
                                    this.cmd['justify'].active = true
                                    break
                            }
                            break
                        case 'margin-left':
                            break
                    }
                }
                let range = DOM.getSelectionRange()
                if(range){
                    let start = range.startContainer,
                        end = range.endContainer

                    if(start == end){
                        if(start.parentNode.tagName.toLowerCase() == 'li' && start.parentNode.parentNode.tagName.toLowerCase() == 'ul'){
                            this.cmd['ul'].active = true
                            this.cmd['ol'].active = false
                        }else if(start.parentNode.tagName.toLowerCase() == 'li' && start.parentNode.parentNode.tagName.toLowerCase() == 'ol'){
                            this.cmd['ul'].active = false
                            this.cmd['ol'].active = true
                        }else{
                            this.cmd['ul'].active = false
                            this.cmd['ol'].active = false
                        }
                    }else{
                        this.cmd['ul'].active = false
                        this.cmd['ol'].active = false
                    }
                }else{
                    this.cmd['ul'].active = false
                    this.cmd['ol'].active = false
                }
            },
            initCmd(){
                for(let s in this.cmd){
                    switch(s){
                        case 'fontSize':
                            this.cmd[s].value = this.cmd[s].initValue
                            break
                        case 'bold':
                        case 'italic':
                        case 'linethrough':
                        case 'underline':
                        case 'superscript':
                        case 'subscript':
                        case 'left':
                        case 'center':
                        case 'right':
                        case 'justify':
                            this.cmd[s].active = false
                            break
                    }
                }
            }
        },  // methods
        watch:{
            color:{   // 深度watch
                handler: 'changeColor',
                deep: true
            },
            bgColor:{   // 深度watch
                handler: 'changeBColor',
                deep: true
            },
            // link:{
            //     handler:'changeLink',
            //     deep:true
            // },
        },
        initCtor(options,that){
            options = options || {}
            return {
                id:options.id ? options.id : '',
                content: options.content || "<p>It's a test</p>",//"<ol style=\"text-align:left;\"><li>It's a test.<ol style=\"margin-left: 1.06666rem;\"><li>hello</li><li>dagou</li></ol></li><li>waoefnaeojg</li><li>xxnxixn</li></ol>",
                css:{
                    left:{
                        cn:'定位.左',
                        en:'left',
                        value:0,
                        type:'number',
                        parent:'css',
                        unit:'px',
                        realunit:'rem'
                    },
                    top:{
                        cn:'定位.上',
                        en:'top',
                        value:0,
                        type:'number',
                        parent:'css',
                        unit:'px',
                        realunit:'rem'
                    },
                },
                style:{
                    width:that.getRem((options.width ||  options.width == 0) ? options.width : 375),
                    height:that.getRem((options.height ||  options.height == 0) ? options.height : 75),
                    webkitTransform:'none',
                    transform:'none'
                },
                classname:options.classname ? options.classname : ''
            }
        }
    }
</script>
<style>
    [kitty-text] .kitty-text-content{
        width:150px;
        height:30px;
        line-height:30px;
        color:#666;
        text-align:center;
        font-size:0.512rem;
    }
    [kitty-text] .kitty-text-content ul > li,
    [kitty-text] .kitty-text-content ul{
        list-style:	disc inside none;
    }
    [kitty-text] .kitty-text-content ol > li,
    [kitty-text] .kitty-text-content ol{
        list-style:	decimal inside none;
    }
    [kitty-text] .kitty-text-content ul > li > ul > li,
    [kitty-text] .kitty-text-content ul > li > ul{
        list-style:	circle inside none;
    }
    [kitty-text] .kitty-text-content ul > li > ul > li > ul > li,
    [kitty-text] .kitty-text-content ul > li > ul > li > ul{
        list-style:	square inside none;
    }
    [kitty-text] .kitty-text-content ul > li.style-none,
    [kitty-text] .kitty-text-content ol > li.style-none{
        list-style:none;
    }


    /***kitty-text yh-eidt-layer*********************/
    [kitty-text] .yh-edit-layer {
        width: 500px;
        height: 200px;
        border: 1px solid #ccc;
        position: absolute;
        left: 50%;
        top: -200px;
        margin: 0 0 0 -250px;
        background-color:#fff;
        z-index:1000;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal {
        width:154px;
        padding:2px 0 2px 0;
        float:left;
        position:relative;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal .yh-tedit .yh-tedit-text {
        width:42px;
        line-height:20px;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal-3 .yh-tedit .yh-tedit-text {
        width:62px;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal-4 .yh-tedit .yh-tedit-text {
        width:72px;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal .yh-tedit > div {
        float:left;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal .yh-tedit .yh-tedit-value {
        width:60px;
        height:20px;
        line-height:20px;
        border:1px solid #ccc;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal .yh-tedit .yh-tedit-unit{
        width:20px;
        height:20px;
        line-height:20px;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal .yh-tedit .yh-tedit-arrow{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin: 1px 0 0 0;
        cursor: pointer;
        position:relative;
        float:left;
        background: #ff47a3;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal .yh-tedit .yh-tedit-arrow:after {
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
    [kitty-text] .yh-edit-layer .yh-edit-normal .yh-tedit-list-parent {
        width:100px;
        height:100px;
        border:1px solid #ccc;
        overflow-x:hidden;
        overflow-y:scroll;
        position:absolute;
        left:30px;
        top:100%;
        z-index: 2;
        background-color: #fff;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal-3 .yh-tedit-list-parent {
        left:45px;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal-4 .yh-tedit-list-parent {
        left:72px;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal-4 .yh-tedit-list-parent .yh-tedit-list{
        width: 100%;
        height: 100%;
    }
    [kitty-text] .yh-edit-layer .yh-edit-color{
        width:172px;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal .yh-tedit-cmore{
        width:100px;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal .yh-tedit-cmore input {
        float:left;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal .yh-tedit-cmore input[type="text"]{
        width:58px;
        height:20px;
        line-height:20px;
        border:1px solid #ccc;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal .yh-tedit-cmore input[type="color"]{
        width:40px;
        height:20px;
        margin: 1px 0 0 0;
        border:none;
    }
    [kitty-text] .yh-edit-layer .yh-edit-color .yh-tedit-list {
        width: 178px;
        height: 178px;
        position: absolute;
        left: 0;
        top: 100%;
        background-color: #fff;
        z-index: 3;
        border: 1px solid #ccc;
    }
    [kitty-text] .yh-edit-layer .yh-edit-color .yh-tedit-list > li {
        width: 18px;
        height: 18px;
        border: 1px solid #ccc;
        margin: 2px 0 0 2px;
        float:left;
    }
    [kitty-text] .yh-edit-layer .yh-edit-list {
        width:130px;
    }
    [kitty-text] .yh-edit-layer .yh-edit-list[yh-name="fontSize"]{
        width:176px;
    }
    [kitty-text] .yh-edit-layer .yh-edit-list .yh-tedit-list {
        width:100px;
        height:100px;
        overflow-x:hidden;
        overflow-y:scroll;
        position: absolute;
        left: 0;
        top: 100%;
        background-color: #fff;
        z-index: 3;
        border: 1px solid #ccc;
    }
    [kitty-text] .yh-edit-layer .yh-edit-normal-2 .yh-tedit-list{
        left:42px;
    }

    [kitty-text] .yh-edit-layer li {
        width:22px;
        height:22px;
    }
    [kitty-text] .yh-edit-layer .yh-edit-margin-left,
    [kitty-text] .yh-edit-layer .yh-edit-text-decoration,
    [kitty-text] .yh-edit-layer .yh-edit-text-align,
    [kitty-text] .yh-edit-layer .yh-edit-font-style,
    [kitty-text] .yh-edit-layer .yh-edit-font-weight {
        width:22px;
    }
    [kitty-text] .yh-edit-layer li:after{
        width:20px;
        line-height:20px;
        font-family: FontAwesome;
        font-size:12px;
        text-align:center;
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="bold"]:after{
        content:"\F032";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="italic"]:after{
        content:"\F033";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="linethrough"]:after{
        content:"\F0CC";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="underline"]:after{
        content:"\F0CD";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="superscript"]:after{
        content:"\F12B";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="subscript"]:after{
        content:"\F12C";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="left"]:after{
        content:"\F036";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="center"]:after{
        content:"\F037";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="right"]:after{
        content:"\F038";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="justify"]:after{
        content:"\F039";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="indent"]:after{
        content:"\F03C";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="outdent"]:after{
        content:"\F03B";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="ol"]:after{
        content:"\F0CB";
    }
    [kitty-text] .yh-edit-layer li.yh-edit-normal[yh-name="ul"]:after{
        content:"\F0CA";
    }

    .white-bg{
        background:#fff;
        color:#666;
    }

    .setting {
        z-index: 9999;
    }
</style>