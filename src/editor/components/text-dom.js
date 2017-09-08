import MW from './bus.js'

var DOM = {
    getSelectionRange() {
        let selection = window.getSelection()
        return selection.anchorNode ? selection.getRangeAt(0) : null
    },
    saveRange() {
        var range = this.getSelectionRange()
        if(range){
            this._yh_startContainer = range.startContainer
            this._yh_startOffset = range.startOffset
            this._yh_endContainer = range.endContainer
            this._yh_endOffset = range.endOffset
        }else{
            this.removeRange()
        }
    },
    saveChangeRange(startContainer,startOffset,endContainer,endOffset) {
        this._yh_startContainer = startContainer
        this._yh_startOffset = startOffset
        this._yh_endContainer = endContainer
        this._yh_endOffset = endOffset
    },
    blinkCursor(){
        var selection = window.getSelection(),
            range = this.getSelectionRange(),
            newRange = document.createRange(),
            endElem = range.endContainer,
            endOffset = range.endOffset
        
        newRange.setStart(endElem,endOffset)
        newRange.setEnd(endElem,endOffset)
        document.removeAllRanges()
        selection.addRange(newRange)
    },
    restoreRange() {
        if(this._yh_startContainer){
            let selection = window.getSelection()
            selection.removeAllRanges()
            let range = document.createRange()
            range.setStart(this._yh_startContainer, this._yh_startOffset)
            range.setEnd(this._yh_endContainer, this._yh_endOffset)

            selection.addRange(range)
        }
    },
    removeRange(){
        let selection = window.getSelection()
        selection.removeAllRanges()
        this._yh_startContainer = null
        this._yh_startOffset = 0
        this._yh_endContainer = null
        this._yh_endOffset = 0
    },
    isSelectedRange(){
        if(this.getSelectionRange()){
            // return true
            var range = this.getSelectionRange(),
                startElem = this.getElementParent(range.startContainer),
                endElem = this.getElementParent(range.endContainer)
            if(range.startOffset == range.endOffset && startElem == endElem){
                return false
            }else{
                return true
            }
        }else {
            return false
        }
    },
    getTagName(elem) {
        return elem.tagName.toLowerCase()
    },
    getCssProperty(elem, styleName) {
        return window.getComputedStyle(elem,null).getPropertyValue(styleName)
    },
    getHtmlRem(value){
        let fontSize = parseFloat(this.getCssProperty(document.getElementsByTagName("html")[0],'font-size'))
        return value / fontSize
    },
    getArray(origin){
        var current = []
        if(this.isString(origin)) {
            current = [origin.toLowerCase()]
        } else if(Array.isArray(origin)) {
            current = origin.map(t => t.toLowerCase())
        }
        return current
    },
    isString (str){
        return (typeof str == 'string') && str.constructor == String; 
    },
    isUndefined(tag) {
        return typeof(value) == "undefined"
    },
    getElementParent(elem,condition) {
        let cc = false
        while(elem && !elem.id) {
            if(condition){
                condition.forEach(function(con){
                    if(elem.nodeType == Node.ELEMENT_NODE && elem.tagName.toLowerCase() == con && elem.className != 'kitty-text-content'){
                        cc = true
                    }
                })
                if(cc){
                    break
                }else{
                    elem = elem.parentElement
                }
            }else{
                if(elem.nodeType !== Node.ELEMENT_NODE){
                    elem = elem.parentElement
                }else{
                    break
                }
            }
        }
        if(elem && elem.id){
            return null
        }else{
            return elem
        }
    },
    getOuterParent(elem,condition){
        let cc = false,
            fintStatus = false,
            originElem = elem,
            li = elem
        while(elem && !elem.id) {
            if(condition){
                condition.forEach(function(con){
                    if(elem.nodeType == Node.ELEMENT_NODE && elem.tagName.toLowerCase() == con && elem.className != 'kitty-text-content'){
                        cc = true
                    }
                })
                if(cc){
                    li = elem
                    fintStatus = true
                    elem = elem.parentElement
                    cc = false
                }else{
                    elem = elem.parentElement
                }
            }else{
                if(elem.nodeType !== Node.ELEMENT_NODE){
                    elem = elem.parentElement
                    li = elem
                    fintStatus = true
                }else{
                    break
                }
            }
        }
        if(fintStatus){
            return [li]
        }else if(originElem && /(ul)|(ol)/g.test(originElem.tagName.toLowerCase())){
            let childs = originElem.childNodes,
                liA = []
            for(let c = 0; c < childs.length; c++){
                if(childs[c].nodeType == Node.ELEMENT_NODE){
                    liA.push(childs[c])
                }
            }
            return liA
        }else{
            null
        }
    },
    getSelectedElem(elem,range,rangeStatus){
        let parent = this.getElementParent(elem),
            nextNode = null,
            previousNode = null

        if(elem.nodeType === Node.ELEMENT_NODE){
            if(range.endOffset == 0){
                return null
            }else {
                elem = $(elem)
            }
        }else if(elem.nodeType === Node.TEXT_NODE) {
            var startElem = null,
                firstNode = null,
                endNode = null,
                span = null,
                fullText = '',
                firstText = '',
                endText = ''
            
            startElem = range.startContainer
            switch(rangeStatus){
                case 'start':   
                    fullText = elem.textContent//startElem.textContent
                    firstText = fullText.slice(0,range.startOffset)
                    endText = fullText.slice(range.startOffset)
                    firstNode = document.createTextNode(firstText)
                    // endNode = document.createTextNode(endText)
                    span = document.createElement('span')
                    span.innerHTML = endText
                    break
                case 'center':
                    fullText = elem.textContent
                    span = document.createElement('span')
                    span.innerHTML = elem.textContent
                    break
                case 'end':
                    fullText = elem.textContent//range.endContainer.textContent
                    firstText = fullText.slice(0,range.endOffset)
                    endText = fullText.slice(range.endOffset)
                    // firstNode = document.createTextNode(firstText)
                    endNode = document.createTextNode(endText)
                    span = document.createElement('span')
                    span.innerHTML = firstText
                    break
                case false:
                    fullText = startElem.textContent
                    firstText = fullText.slice(0,range.startOffset)
                    endText = fullText.slice(range.endOffset)
                    firstNode = document.createTextNode(firstText)
                    endNode = document.createTextNode(endText)
                    span = document.createElement('span')
                    span.innerHTML = fullText.slice(range.startOffset,range.endOffset)
                    break
            }
            nextNode = elem.nextSibling
            previousNode = elem.previousSibling
            if(!firstText && !endText) {
                if(rangeStatus == 'center' || rangeStatus == false){
                    if(!parent){
                        return null
                    }
                    if(parent.innerHTML == fullText && !nextNode && !previousNode){
                        elem = $(parent)
                    }else{
                        parent.insertBefore(span,elem)
                        elem = $(elem)
                        elem.remove()
                        elem = $(span)
                    }
                }else{
                    elem = $(parent)
                }
            } else {
                if(span.innerHTML == fullText && !nextNode && !previousNode){
                    elem = $(parent)
                }else{
                    if(firstNode && parent){
                        if(nextNode){
                            parent.insertBefore(firstNode,nextNode)
                        }else{
                            parent.appendChild(firstNode)
                        }
                    }
                    if(endNode && parent){
                        if(nextNode){
                            parent.insertBefore(endNode,nextNode)
                        }else{
                            parent.appendChild(endNode)
                        }
                    }
                    if(firstNode && endNode && parent){
                        parent.insertBefore(span, endNode)
                    }else if(firstNode && !endNode && parent){
                        if(nextNode){
                            parent.insertBefore(span,nextNode)
                        }else{
                            parent.appendChild(span)
                        }
                    }else if(endNode && parent){
                        parent.insertBefore(span, endNode)
                    }else if(parent) {
                        if(nextNode){
                            parent.insertBefore(span,nextNode)
                        }else{
                            parent.appendChild(span)
                        }
                    }
                    elem.remove()
                    elem = $(span)
                }
            }
        }else{
            console.log('unknown nodeType')
            return ''
        }
        return elem
    },
    getSelectedOriginalElem(elem,range,rangeStatus){
        let parent = this.getElementParent(elem),
            nextNode = null

        if(elem.nodeType === Node.ELEMENT_NODE){
            elem = $(elem)
        }else if(elem.nodeType === Node.TEXT_NODE) {
            elem = $(parent)
        }else{
            console.log('unknown nodeType')
            return ''
        }
        return elem
    },
    equalParent(elem,current) {
        while(current && (current.nodeType == Node.TEXT_NODE || !current.attributes || !current.attributes['id'])){
            if(elem == current) {
                return true
            }else {
                current = current.parentNode
            }
        }
        return false
    },
    getFirstCommonParent(){
        if(!this.getSelectionRange()){
            return null
        }
        let range = this.getSelectionRange(),
            startElem = range.startContainer,
            endElem = range.endContainer,
            elem = [],
            current = null
        if(startElem.nodeType == Node.ELEMENT_NODE && ($(startElem).hasClass('kitty-text-content') || $(startElem).find('.kitty-text-content').length > 0)){
            this.removeRange()
            return null
        }
        if(startElem == endElem){
            current = this.getSelectedOriginalElem(startElem,range,false)
            elem = current
        }else{
            let centerArray = [],
                centerNode = startElem,
                startParent = null
            centerNode = startElem.parentNode
            startParent = startElem.parentNode
            while(!this.equalParent(centerNode,endElem.parentNode)){  // start 与 end 不是同一个元素时
                centerNode = startParent.parentNode
                startParent = startParent.parentNode
            }
            elem = $(centerNode)
        }
        return elem
    },
    _getFirstElementChild(elem){
        return elem.firstChild
        // let childs = elem.childNodes
        // for(let c = 0; c < childs.length; c++){
        //     if(childs[c].nodeType == Node.ELEMENT_NODE){
        //         return childs[c]
        //     }
        // }
        // return null
    },
    getRangeOriginalElem(){
        if(!this.getSelectionRange()){
            return []
        }
        var range = this.getSelectionRange(),
            startElem = range.startContainer,
            endElem = range.endContainer,
            elem = [],
            current = null
        
        if(startElem == endElem){
            current = this.getSelectedOriginalElem(startElem,range,false)
            if(current){
                elem.push(current)
            }
        }else{
            let centerArray = [],
                centerNode = startElem,
                startParent = null
            while(centerNode){
                centerNode = centerNode.nextSibling
                if(centerNode){
                    centerArray.push(centerNode)
                }
            }
            centerNode = startElem.parentNode
            startParent = startElem.parentNode
            while(true){  // start 与 end 不是同一个元素时
                while(centerNode && !this.equalParent(centerNode,endElem.parentNode)){  // 当前元素与结尾元素不是一个父节点
                    centerNode = centerNode.nextSibling
                    if(centerNode && !this.equalParent(centerNode,endElem.parentNode)){  // 当前元素与结尾元素不是一个父节点
                        centerArray.push(centerNode)
                    }
                }
                if(this.equalParent(startParent,endElem.parentNode)){  // 直到两个的父元素相等才截止
                    break
                }
                centerNode = startParent.parentNode
                startParent = startParent.parentNode
            }
            current = this.getSelectedOriginalElem(startElem,range,'start')
            if(current){
                elem.push(current)
            }
            for(let i = 0; i < centerArray.length; i++){
                current = this.getSelectedOriginalElem(centerArray[i],range,'center')
                if(current){
                    elem.push(current)
                }
            }
            current = this.getSelectedOriginalElem(endElem,range,'end')
            if(current){
                elem.push(current)
            }
        }
        return elem
    },
    getRangeElem() {
        if(!this.getSelectionRange()){
            return []
        }
        var range = this.getSelectionRange(),
            startElem = range.startContainer,
            endElem = range.endContainer,
            elem = [],
            current = null
        
        if(startElem == endElem){
            current = this.getSelectedElem(startElem,range,false)
            if(current){
                elem.push(current)
            }
        }else{
            let centerArray = [],
                centerNode = startElem,
                startParent = null
            while(centerNode){
                centerNode = centerNode.nextSibling
                if(centerNode && !this.equalParent(centerNode,endElem)){//centerNode != endElem
                    centerArray.push(centerNode)
                }else if(centerNode == endElem){
                    break
                }
            }
            centerNode = startElem.parentNode
            startParent = startElem.parentNode
            while(true){  // start 与 end 不是同一个元素时
                while(centerNode && !this.equalParent(centerNode,endElem)){  // 当前元素与结尾元素不是一个父节点
                    centerNode = centerNode.nextSibling
                    if(centerNode && !this.equalParent(centerNode,endElem)){  // 当前元素与结尾元素不是一个父节点
                        centerArray.push(centerNode)
                    }
                }
                if(centerNode && centerNode == endElem){
                    break
                }
                if(centerNode && this.equalParent(centerNode,endElem)){
                    let previousData = this.getElementPrevious(centerNode,startElem,endElem)
                    centerArray = centerArray.concat(previousData.list)
                    if(previousData.status){
                        break
                    }
                }
                if(this.equalParent(startParent,endElem)){  // 直到两个的父元素相等才截止
                    break
                }
                centerNode = startParent.parentNode
                startParent = startParent.parentNode
            }
            current = this.getSelectedElem(startElem,range,'start')
            if(current){
                elem.push(current)
            }
            for(let i = 0; i < centerArray.length; i++){
                current = this.getSelectedElem(centerArray[i],range,'center')
                if(current){
                    elem.push(current)
                }
            }
            current = this.getSelectedElem(endElem,range,'end')
            if(current){
                elem.push(current)
            }
        }
        return elem
    },
    getElementPrevious(elem,startElem,endElem){
        let childs = elem.childNodes,
            status = false,
            list = []
        for(let cc = 0; cc < childs.length; cc++){
            if(!this.equalParent(childs[cc],endElem)){
                if((childs[cc].nodeType == Node.ELEMENT_NODE || childs[cc].textContent.trim()) && childs[cc] != startElem){
                    list.push(childs[cc])
                }
            }else{  // 当前元素与最后节点的某个父级相等
                if(childs[cc].nodeType == Node.ELEMENT_NODE && childs[cc] != endElem && childs[cc] != startElem){
                    let previousData = this.getElementPrevious(childs[cc],endElem)
                    list = list.concat(previousData.list)
                    status = previousData.status
                    if(status){
                        break
                    }
                }else if(childs[cc] == endElem){
                    status = true
                    break
                }
            }
        }
        return {
            status:status,
            list:list
        }
    },
    getChildNodesLength(elem){
        let childs = elem.childNodes,
            c = 0,
            length = childs.length
        for ( c = 0 ; c < childs.length; c++ ){
            if(childs[c].nodeType == Node.TEXT_NODE && !childs[c].textContent.trim()){
                length--
            }
        }
        return length
    },
    /********************************
     * equalHtml: 通过判断父级的html的内容与子集元素是否相等 来判断子集是父级的全部子集
     * parent: 父级元素，使用jQuery获取的
     * elem: 子集数组，以数组的形式组成，每一个子集使用jQuery获取的
     *********************************/
    equalHtml(parent,elem){
        let elength = this.getChildNodesLength(parent[0]) == elem.length
        if(elength){
            let childs = parent.children(),
                c = 0,
                equal = false
            for( c = 0; c < childs.length; c++ ){
                equal = false
                for(let i = 0; i < elem.length; i++){
                    if(childs.eq(c) == elem[i]){
                        equal = true
                        break;
                    }
                }
                if(equal == false){
                    return false
                }
            }
            return true
        }
        return false
    },
    /********************************
     * recoveryEditData: 恢复当前选中元素编辑数据
     * hoverElem: 当前鼠标滑入的元素，在没有选中元素时使用
     *********************************/
    recoveryEditData(hoverElem){
        let elem = null,
            style = '',
            styleArray = [],
            styleJSON = {},
            elemJSON = {},
            elemParent = null
        if(this.isSelectedRange()){ // 当前有选中元素
            elem = this.getFirstCommonParent()//this.getRangeOriginalElem()
            style = elem.attr('style')
            styleArray = style ? style.split(';') : []
            for (let ss = 0; ss < styleArray.length; ss++) {
                if(styleArray[ss]){
                    let sone = styleArray[ss].replace(/ /g,'').split(':')
                    elemJSON[sone[0]] = sone[1]
                }
            }
            elemParent = elem.parent()
            while(!elemParent.attr('id')){
                style = elemParent.attr('style')
                styleArray = style ? style.split(';') : []
                for (let ss = 0; ss < styleArray.length; ss++) {
                    if(styleArray[ss]){
                        let sone = styleArray[ss].replace(/ /g,'').split(':')
                        if(!elemJSON[sone[0]]){
                            elemJSON[sone[0]] = sone[1]
                        }
                    }
                }
                elemParent = elemParent.parent()
            }
            for(let s in elemJSON){
                styleJSON[s] = elemJSON[s]
            }
        }else if(hoverElem){  // 当前没有选中元素
            elem = hoverElem.children('.kitty-text-content')
            style = elem.attr('style')
            styleArray = style ? style.split(';') : []
            for (let s = 0; s < styleArray.length; s++) {
                if(styleArray[s]){
                    let sone = styleArray[s].replace(/ /g,'').split(':')
                    styleJSON[sone[0]] = sone[1]
                }
            }
        }
        return styleJSON
    },
    /********************************
     * getCursorPosition: 获取光标所在位置的父级<p>、<li>
     * 主要用于给元素添加列表
     *********************************/
    getCursorPosition(){
        let range = this.getSelectionRange()
        if(!range){
            return null
        }else{
            let parent = this.getElementParent(range.startContainer,['p','div','li'])
            return parent
        }
    },
    /********************************
     * DOM.getSiblingsList: 判断元素的邻接点是否是列表ul、ol
     * elem：js元素
     * name: 匹配需要邻接点的tagName值
     * previousElementSibling: 前一个兄弟节点
     * previousSibling：前一个兄弟节点（包括文本节点）
     *********************************/
    getSiblingsList(elem,name){
        let status = false,
            previous = elem.previousElementSibling,
            next = elem.nextElementSibling
        if(previous && previous.nodeType == Node.ELEMENT_NODE && previous.tagName.toLowerCase() == name){ ///(ol)|(ul)/g.test(previous.tagName.toLowerCase())
            return {
                elem:previous,
                position:'previous'
            }
        }
        if(next && next.nodeType == Node.ELEMENT_NODE && next.tagName.toLowerCase() == name){ ///(ol)|(ul)/g.test(next.tagName.toLowerCase())
            return {
                elem:next,
                position:'next'
            }
        }
        return null
    },
    /********************************
     * DOM.getSiblingsIndentList: 判断元素的邻接点li 的子元素是否含有ul或ol元素
     * elem：js元素
     * name: 需要匹配的ul/ol的tagName值
     *********************************/
    getSiblingsIndentList(elem,name){
        let previous = elem.previousElementSibling,
            next = elem.nextElementSibling,
            list = null,
            position = '',
            other = []
        
        if(previous){
            let childs = previous.childNodes
            for(let c = 0; c < childs.length; c++){
                if(childs[c].nodeType == Node.ELEMENT_NODE && childs[c].tagName.toLowerCase() == name){
                    list = childs[c]
                    position = 'previous'
                    break
                }
            }
        }
        if(next){
            let childs = next.childNodes
            for(let c = 0; c < childs.length; c++){
                if(childs[c].nodeType == Node.ELEMENT_NODE && childs[c].tagName.toLowerCase() == name){
                    if(previous){
                        let cchilds = childs[c].childNodes
                        for(let cc = 0; cc < cchilds.length; cc++){
                            if(cchilds[cc].nodeType == Node.ELEMENT_NODE && cchilds[cc].tagName.toLowerCase() == 'li'){
                                other.push(cchilds[cc])
                            }
                        }
                    }else{
                        list = childs[c]
                        position = 'next'
                    }
                    break
                }
            }
        }
        return {
            previous:previous,
            next:next,
            list:list,
            position:position,
            other:other
        }
    },
    /********************************
     * DOM.getFirstChild: 获取第一个nodeType==Node.ELEMENT_NODE的节点
     * elem：js元素
     *********************************/
    getFirstChild(elem){
        let childs = elem.childNodes
        for(let i = 0; i < childs.length; i++){
            if(childs[i].nodeType == Node.ELEMENT_NODE){
                return childs[i]
            }
        }
        return false
    },
    /********************************
     * hasElementChild: 是否含有nodeType==Node.ELEMENT_NODE的节点
     * elem：js元素
     *********************************/
    hasElementChild(elem){
        let childs = elem.childNodes
        for(let i = 0; i < childs.length; i++){
            if(childs[i].nodeType == Node.ELEMENT_NODE){
                return true
            }
        }
        return false
    },
    /********************************
     * getParentLi: 获取数组中每个元素的父级Li元素，同时去重
     * elem：数组，其中每个元素为jQuery元素
     * return li数组（js）
     *********************************/
    getParentLi(elem,scope = true){
        let li = null,
            list = []
        for(let i = 0 ; i < elem.length; i++){
            if(scope){
                li = this.getOuterParent(elem[i][0],['li','p','div'])
            }else{
                let oneLi = this.getElementParent(elem[i][0],['li','p','div'])
                li = [oneLi]
            }
            if(li){
                for (let l = 0; l < li.length; l++){
                    let status = false
                    for(let j = 0; j < list.length; j++){
                        if(li[l] == list[j]){
                            status = true
                            break
                        }
                    }
                    if(!status){
                        list.push(li[l])
                    }
                }
                
            }
        }
        return list
    },
    getAllElementStatus(elem){
        if(elem instanceof Array){
            let parent = elem[0][0].parentNode,
                childs = parent.childNodes,
                elemLength = 0,
                status = true
            for(let i = 1; i < elem.length; i++){
                if(elem[i][0].parentNode != parent){
                    status = false
                }
            }
            if(status){
                for(let i = 0; i < childs.length; i++){
                    if(childs[i].nodeType == Node.ELEMENT_NODE){
                        elemLength++
                    }
                }
                if(elemLength != elem.length){
                    status = false
                }
            }
            return status
        }
        return false
    }
}
var Execute = {
    /********************************
     * _getLiPosition: 获取Li处在ul/ol中的位置
     * changeElem：当前需要判断的元素
     * return first middle end one(只有当前一个元素)
     *********************************/
    _getLiPosition(li){
        let previous = li.previousElementSibling,
            next = li.nextElementSibling

        if(previous && next){
            return 'middle'
        }else if(!previous && next){
            return 'first'
        }else if(previous && !next){
            return 'end'
        }else{
            return 'one'
        }
    },
    /********************************
     * unwrapLi: 取消包装成li，还原成p
     * elem: 当前的Li元素
     * 如果当前是P标签，且相邻的元素没有ul、ol，则创建ul/ol、li
     * 如果当前是P标签，且相邻元素有ul、ol，则将元素加入ul/ol(判断插入之前还是添加到之后)
     * 如果当前是LI标签，代表当前元素的父级tagName属于name相反的值，需将当前元素提出来
     *********************************/
    unwrapLi(elem){
        let ul = elem.parentNode,
            unext = ul.nextSibling,
            position = this._getLiPosition(elem)
        
        switch(position){
            case 'first':
                ul.parentNode.insertBefore(elem,ul)
                elem.outerHTML = elem.outerHTML.replace('<li','<p').replace('/li>','/p>')
                break
            case 'middle':
                let name = ul.tagName.toLowerCase(),
                    relativeName = name == 'ul' ? 'ol' : 'ul'
                this._wrapMiddleLi(elem,ul,unext,relativeName)
                elem.outerHTML = elem.outerHTML.replace('<li','<p').replace('/li>','/p>')
                break
            case 'end':
                if(unext){
                    ul.parentNode.insertBefore(elem,unext)
                }else{
                    ul.parentNode.appendChild(elem)
                }
                elem.outerHTML = elem.outerHTML.replace('<li','<p').replace('/li>','/p>')
                break
            case 'one':
                ul.parentNode.insertBefore(elem,ul)
                elem.outerHTML = elem.outerHTML.replace('<li','<p').replace('/li>','/p>')
                ul.parentNode.removeChild(ul)
                break
        }
    },
    /********************************
     * wrapLi: 包装成li
     * changeElem：当前需要判断的元素
     * name：ul或者ol
     * 如果当前是P标签，且相邻的元素没有ul、ol，则创建ul/ol、li
     * 如果当前是P标签，且相邻元素有ul、ol，则将元素加入ul/ol(判断插入之前还是添加到之后)
     * 如果当前是LI标签，代表当前元素的父级tagName属于name相反的值，需将当前元素提出来
     *      如果当前元素属于第一个，提出来即可，提出来之后判断它的前一个元素tagName === name，相等，则追加到子元素，不相等，则创建
     *      如果当前元素属于最后一个，提出来即可，提出来之后判断它的后一个元素tagName === name，相等，则插入到第一个元素之前，不相等，则创建
     *      如果当前元素属于中间的某一个，需将该元素之前的兄弟节点提出来创建一个新的ul/ol,该元素
     *********************************/
    wrapLi(changeElem,name){
        let siblingsData = DOM.getSiblingsList(changeElem,name), // siblingsData.elem = ul / ol
            relativeName = name == 'ul' ? 'ol' : 'ul'
        if(siblingsData){
            if(siblingsData.position == 'previous'){
                siblingsData.elem.appendChild(changeElem)
            }else{
                let exitChild = DOM.getFirstChild(siblingsData.elem)
                if(exitChild){
                    siblingsData.elem.insertBefore(changeElem,exitChild)
                }else{
                    siblingsData.elem.appendChild(changeElem)
                }
            }
            changeElem.outerHTML = changeElem.outerHTML.replace(/(<p)|(<div)/g,'<li').replace(/(\/p>)|(\/div>)/g,'/li>')
        }else{
            if(changeElem.tagName.toLowerCase() == 'li'){
                this._wrapElemLi(changeElem,name)
            }else{
                changeElem.outerHTML = changeElem.outerHTML.replace(/(<p)|(<div)/g,'<'+name+'><li').replace(/(\/p>)|(\/div>)/g,'/li></'+name+'>')
            }
        }
    },
    _wrapElemLi(changeElem,name){
        let ul = changeElem.parentNode,
            position = this._getLiPosition(changeElem),
            next = ul.nextSibling,
            style= ul.style.cssText,
            wrapStatus = true
        switch(position){
            case 'first':
                ul.parentNode.insertBefore(changeElem,ul)
                break
            case 'middle':
                // console.log(ul)
                if( ul.tagName.toLowerCase() != name){
                    this._wrapMiddleLi(changeElem,ul,next,name)
                }else{
                    wrapStatus = false
                }
                break
            case 'end':
                if(next){
                    ul.parentNode.insertBefore(changeElem,next)
                }else{
                    ul.parentNode.appendChild(changeElem)
                }
                break
            case 'one':
                ul.parentNode.insertBefore(changeElem,ul)
                ul.parentNode.removeChild(ul)
                break
        }
        let sibling = DOM.getSiblingsList(changeElem,name)
        if(sibling && wrapStatus){
            switch(sibling.position){
                case 'previous':
                    let enext = changeElem.nextElementSibling
                    sibling.elem.appendChild(changeElem)
                    if(enext && enext.tagName.toLowerCase() == name){
                        let childs = enext.childNodes
                        for(let i = 0; i < childs.length; ){
                            sibling.elem.appendChild(childs[i])
                        }
                        enext.parentNode.removeChild(enext)
                    }
                    break
                case 'next':
                    sibling.elem.insertBefore(changeElem,sibling.elem.childNodes[0])
                    break
            }
        }else if(wrapStatus){
            changeElem.outerHTML = changeElem.outerHTML.replace(/^(<li)/,'<'+name+' style="'+style+'"><li').replace(/(\/li>)$/,'/li></'+name+'>')
        }
    },
    _wrapMiddleLi(changeElem,ul,next,name){
        let preElem = changeElem.previousElementSibling,
            nextElem = changeElem.nextElementSibling,
            prepre = changeElem.previousElementSibling,
            nextnext = changeElem.nextElementSibling,
            relativeName = name == 'ul' ? 'ol' : 'ul',
            pre = null,
            nex = null
        if(preElem){
            pre = document.createElement(relativeName)
            pre.style = ul.style.cssText
            pre.appendChild(preElem)
            preElem = changeElem.previousElementSibling
        }
        while(preElem){
            pre.insertBefore(preElem,pre.childNodes[0])
            preElem = changeElem.previousElementSibling
        }
        if(pre){
            ul.parentNode.insertBefore(pre,ul)
        }

        if(nextElem){
            nex = document.createElement(relativeName)
            nex.style = ul.style.cssText
            nex.appendChild(nextElem)
            nextElem = changeElem.nextElementSibling
        }
        while(nextElem){
            nex.appendChild(nextElem)
            nextElem = changeElem.nextElementSibling
        }
        if(next){
            ul.parentNode.insertBefore(nex,next)
        }else{
            ul.parentNode.appendChild(nex)
        }
        if(nex){
            ul.parentNode.insertBefore(changeElem,nex)
        }else{
            ul.parentNode.appendChild(changeElem)
        }
        ul.parentNode.removeChild(ul)
    },
    /***wrapLi: 包装成li end**************************************************************/
    /***indent outdent start**************************************************************/
    /********************************
     * setIndent: 摄设置缩进
     * elemValue：需要缩进的值：25 或  -25
     * elemParent：被缩进的元素，数组形式，每个元素为js元素
     * 如果当前是P标签，则直接缩进
     * 如果当前是LI标签，需将内容放置到另一个ul里面
     *********************************/
    setIndent(elemValue,elemParent,TEXT){
        for (let io = 0; io < elemParent.length; io++){
            let eptag = elemParent[io].tagName.toLowerCase()
            switch(eptag){
                case 'div':
                case 'p':
                    this.setIndentValue(elemValue,elemParent[io],TEXT)
                    break
                case 'li':
                    let ul = elemParent[io].parentNode,
                        name = ul.tagName.toLowerCase(),
                        position = Execute._getLiPosition(elemParent[io])  // 获取Li处在ul/ol中的位置
                        
                    switch(elemValue > 0){
                        case true:
                            Execute.setLiIndentIn(elemParent[io],ul,name,elemValue,position,TEXT)
                            break
                        default:  // 缩进  -25
                            Execute.setLiIndentOut(elemParent[io],ul,name,elemValue,position,TEXT)
                            break
                    }
                    break
            }
        }
    },
    /********************************
     * setLiIndentIn: 设置LI缩进 25
     * elem: 当前元素li
     * ul: 当前元素的父级元素ul/ol
     * name: 当前元素的父级元素ul/ol的标签名
     * elemValue: 25
     * position: Li(elem)处在父级元素ul/ol中的位置
     * 目的：将elem放置到另一个ul里面
     *********************************/
    setLiIndentIn(elem,ul,name,elemValue,position,TEXT){
        // 判断元素的邻接点li 的子元素是否含有ul或ol元素
        let indentListData = DOM.getSiblingsIndentList(elem,name),
            status = false
        if(indentListData.list){
            switch(indentListData.position){
                case 'previous':
                    indentListData.list.appendChild(elem)
                    break
                case 'next':
                    indentListData.list.insertBefore(elem,indentListData.list.childNodes[0])
                    break
            }
        }else{
            let changeElem = elem

            if(indentListData.previous){
                indentListData.previous.appendChild(elem)
            }else{
                if(DOM.equalParent(ul.parentNode,ul)){  // !/(kitty-text-content)/g.test(ul.parentNode) && 
                    changeElem = ul
                    status = true
                }else{
                    ul.parentNode.insertBefore(elem,ul)
                }
            }
            this.setIndentValue(elemValue,changeElem,TEXT)

            if(!status){
                let style = elem.style.cssText,
                    innerHTML = elem.innerHTML
                
                elem.outerHTML = '<'+name+' style="'+style+'"><li>' + innerHTML + '</li></'+name+'>'
            }
        }
        if(!status){
            switch(position){
                case 'one':
                    ul.parentNode.removeChild(ul)
                    break
            }  
        }    
    },
    /********************************
     * setLiIndentOut: 设置LI缩进 -25
     * elem: 当前元素li
     * ul: 当前元素的父级元素ul/ol
     * name: 当前元素的父级元素ul/ol的标签名
     * elemValue: 25
     * position: Li(elem)处在父级元素ul/ol中的位置
     *********************************/
    setLiIndentOut(elem,ul,name,elemValue,position,TEXT){
        let ulParentTag = ul.parentNode.tagName.toLowerCase()

        switch(ulParentTag){
            case 'li':
                this.setMultipleIndentOut(elem,ul,name,elemValue,position,TEXT)
                break
            default:
                this.setSingleIndentOut(elem,ul,name,elemValue,position,TEXT)
                break
        }
    },
    setMultipleIndentOut(elem,ul,name,elemValue,position,TEXT){
        let outerParent = ul.parentNode.parentNode,
            upnext = ul.parentNode.nextElementSibling
        switch(position){
            case 'first':// ul 即是li的子元素，将elem作为ul的后一个兄弟节点
                outerParent.insertBefore(elem,ul.parentNode)
                break
            case 'middle':
                this.setMiddleLiIndentOut(elem,ul,name,elemValue,TEXT)
                break
            case 'end':// ul 即是li的子元素，将elem作为ul的后一个兄弟节点
                if(upnext){
                    outerParent.insertBefore(elem,upnext)
                }else{
                    outerParent.appendChild(elem)
                }
                break
            case 'one':// ul 即是li的子元素，将elem作为ul的后一个兄弟节点
                if(upnext){
                    outerParent.insertBefore(elem,upnext)
                }else{
                    outerParent.appendChild(elem)
                }
                ul.parentNode.removeChild(ul)
                break
        }
    },
    setSingleIndentOut(elem,ul,name,elemValue,position,TEXT){
        let unext = ul.nextSibling
            
        switch(position){
            case 'first':
                ul.parentNode.insertBefore(elem,ul)
                elem.outerHTML = elem.outerHTML.replace('<li','<p').replace('/li>','/p>')
                break
            case 'middle':
                self.setMiddleLiIndentOut(elem,ul,name,elemValue,TEXT)
                break
            case 'end':
                if(unext){
                    ul.parentNode.insertBefore(elem,unext)
                }else{
                    ul.parentNode.appendChild(elem)
                }
                elem.outerHTML = elem.outerHTML.replace('<li','<p').replace('/li>','/p>')
                break
            case 'one':
                ul.parentNode.insertBefore(elem,ul)
                elem.outerHTML = elem.outerHTML.replace('<li','<p').replace('/li>','/p>')
                ul.parentNode.removeChild(ul)
                break
        }
    },
    setMiddleLiIndentOut(elem,ul,name,elemValue,TEXT){
        let ulParentTag = ul.parentNode.tagName.toLowerCase(),
            outerParent = ul.parentNode.parentNode,
            upnext = ul.parentNode.nextElementSibling,

            newUl = document.createElement(name),
            nextElementArray = [],
            nextElem = elem.nextElementSibling
        while(nextElem){
            nextElementArray.push(nextElem)
            nextElem = nextElem.nextElementSibling
        }
        newUl.style = ul.style.cssText
        for(let n = 0; n < nextElementArray.length; n++){
            newUl.appendChild(nextElementArray[n])
        }
        switch(ulParentTag){
            case 'li':
                if(upnext){
                    let marginLeft = DOM.getHtmlRem(parseFloat(DOM.getCssProperty(ul.parentNode,'margin-left'))),
                        lastValue = Execute.getIndentValue(elemValue,elem,TEXT,ul.parentNode,false)
                    newUl.style.marginLeft = -lastValue + 'rem'
                    outerParent.insertBefore(elem,upnext)
                    elem.appendChild(newUl)
                    elem.style.marginLeft = marginLeft + 'rem'
                }else{
                    outerParent.appendChild(elem)
                    elem.appendChild(newUl)
                }
                break
            default:
                let ulnext = ul.nextSibling,
                    textAlign = DOM.getCssProperty(ul,'text-align')
                if(ulnext){
                    ul.parentNode.insertBefore(newUl,ulnext)
                }else{
                    ul.parentNode.appendChild(newUl)
                }
                elem.style = ul.style.cssText
                ul.parentNode.insertBefore(elem,newUl)
                elem.outerHTML = elem.outerHTML.replace('<li','<p').replace('/li>','/p>')
                break
        }
    },
    setIndentValue(elemValue,elem,TEXT){
        let lastValue = this.getIndentValue(elemValue,elem,TEXT,elem)
        elem.style.marginLeft = lastValue + 'rem'
    },
    getIndentValue(elemValue,elem,TEXT,elemParent,status = true){
        let nvalue = 0,
            lastValue = TEXT.getRemValue(elemValue),
            middle = elem
        if(status){
            while(middle){
                nvalue = DOM.getHtmlRem(parseFloat(DOM.getCssProperty(middle,'margin-left')))
                lastValue += nvalue
                if(middle == elemParent){
                    break
                }
                middle = middle.parentNode
            }
        }
        if(Math.abs(lastValue * (750 / 16)) < 5){
            lastValue = 0
        }
        return lastValue
    },
    /***indent outdent end**************************************************************/
    getStyleJSON(styleText){
        let styleArray = styleText.split(';'),
            styleJSON = {}
        for(let s = 0; s < styleArray.length; s++){
            let one = styleArray[s].trim(),
                arr = [],
                name = ''
            if(one){
                arr = one.split(':')
                name = arr[0].trim()
                arr.shift()
                styleJSON[name] = arr.join(':').trim()
            }
        }
        return styleJSON
    },
}
export {
    DOM,
    Execute
}