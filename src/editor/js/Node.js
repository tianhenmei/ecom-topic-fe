const Node = {
    distance:0
}

/********************************************
 * isEmptyObject: 判断一个对象是否为空对象
 * e: 对象
 *******************************************/
Node.isEmptyObject = (e) => {
    let t = ''
    for(t in e){
        return !1
    }
    return !0
}
/********************************************
 * isObject: 判断一个对象是否为对象
 * e: 对象
 * Object.prototype.toString.call(e)
 *******************************************/
Node.isObject = (e) => {
    return e instanceof Object
}
/********************************************
 * isArray: 判断一个对象是否为数组
 * e: 对象
 *******************************************/
Node.isArray = (e) => {
    return e instanceof Array
}

/********************************************
 * getQueryString: 获取url参数的值
 * parm: 对象
 *******************************************/
Node.getQueryString = (parm) => {
    var reg = new RegExp("(^|&)" + parm + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]); 
    return null;
}

Node.checkClassName = (current,classname) => {
    let arr = current.split(/( )/g),
        i = 0,
        one = ''
    for(i = 0; i < arr.length; i++){
        one = arr[i].trim()
        if(one && one == classname){
            return true
        }
    }
    return false
}
/********************************************
 * getParentByClassName: 通过类名获取父级
 * elem: 初始元素
 * classname: 类名
 *******************************************/
Node.getParentByClassName = (elem,classname) => {
    while(elem && !Node.checkClassName(elem.className,classname)){
        elem = elem.parentNode
    }
    return elem
}
/********************************************
 * getParentByAttr 通过属性名获取父级
 * elem: 初始元素
 * attr: 类名
 *******************************************/
Node.getParentByAttr = (elem,attr) => {
    while(elem && !elem.getAttribute(attr)){
        elem = elem.parentNode
    }
    return elem
}

/********************************************
 * getParentHasAttr 通过属性名获取父级
 * elem: 初始元素
 * attr: 类名
 *******************************************/
Node.getParentHasAttr = (elem,attr) => {
    while(elem && !elem.attributes['kitty-components'] && !elem.attributes[attr]){
        elem = elem.parentNode
    }
    if(elem.attributes['kitty-components']){
        return null
    }
    return elem
}
/********************************************
 * parentHasAttr 通过属性名获取父级
 * elem: 初始元素
 * attr: 类名
 *******************************************/
Node.parentHasAttr = (elem,attr) => {
    while(1){
        if(elem && !elem.attributes['kitty-components'] && !elem.attributes[attr]){
            elem = elem.parentNode
        }else if(elem.attributes[attr]){
            return true
        }else{
            break
        }
    }
    return false
}
/********************************************
 * getParentsByAttr 通过属性名获取所有有此属性的父级
 * elem: 初始元素
 * attr: 类名
 *******************************************/
Node.getParentsByAttr = (elem,attr) => {
    let parent = []
    while(elem && !elem.attributes['yh-editor-content']){
        if(elem.getAttribute('yh-module')){
            parent.push(elem)
        }
        elem = elem.parentNode
    }
    return parent
}
/********************************************
 * getChildrenByAttr: 通过属性名获取所有子节点
 * elem: 初始元素
 * attr: 类名
 *******************************************/
Node.getChildrenByAttr = (elem,attr) => {
    let children = elem.children,
        a = [],
        i = 0
    for(i = 0; i < children.length; i++){
        if(children[i] !== elem && children[i].attributes[attr]){
            a.push(children[i])
        }
    }
    return a
}
/********************************************
 * getChildrenHasAttr: 通过属性名获取所有子节点
 * elem: 初始元素
 * attr: 类名
 *******************************************/
Node.getChildrenHasAttr = (elem,attr) => {
    let children = elem.children,
        a = [],
        i = 0
    for(i = 0; i < children.length; i++){
        if(children[i] !== elem && children[i].attributes(attr)){
            a.push(children[i])
        }
    }
    return a
}
/********************************************
 * getChildrenByClassName: 通过类名获取所有子节点
 * elem: 初始元素
 * classname: 类名
 *******************************************/
Node.getChildrenByClassName = (elem,classname) => {
    let children = elem.children,
        a = [],
        i = 0
    for(i = 0; i < children.length; i++){
        if(children[i] !== elem && Node.checkClassName(children[i].className,classname)){
            a.push(children[i])
        }
    }
    return a
}
/********************************************
 * getSiblingsByClassName: 通过类名获取所有兄弟节点
 * elem: 初始元素
 * classname: 类名
 *******************************************/
Node.getSiblingsByClassName = (elem,classname) => {
    let children = elem.parentNode.children,
        a = [],
        i = 0
    for(i = 0; i < children.length; i++){
        if(children[i] !== elem && Node.checkClassName(children[i].className,classname)){
            a.push(children[i])
        }
    }
    return a
}
/********************************************
 * getChildById: 通过ID获取所有子节点
 * elem: 初始元素
 * id: id
 *******************************************/
Node.getChildById = (elem,id) => {
    let children = elem.children,
        i = 0
    for(i = 0; i < children.length; i++){
        if(children[i] !== elem && children[i].id == id){
            return children[i]
        }
    }
}
Node.getComputedValue = (elem,attribute) => {
    var value = window.getComputedStyle(elem,null).getPropertyValue(attribute);
    return value;
}
Node.getPointValue = (elem,attribute) => {
    if(!elem || elem.length == 0){
        return 0
    }
    var value = window.getComputedStyle(elem,null).getPropertyValue(attribute);
    return parseFloat(parseFloat(value).toFixed(2));
}
Node.getPointWidth = (elem) => {
    var value = Node.getPointValue(elem,"width"); //window.getComputedStyle(elem[0],null).getPropertyValue("width");
    return value;
}
Node.getPointHeight = (elem) => {
    var value = Node.getPointValue(elem,"height"); // window.getComputedStyle(elem[0],null).getPropertyValue("height");
    return value;
}
Node.getPointOuterWidth = (elem) => {
    var width =  Node.getPointValue(elem,"width"), //window.getComputedStyle(elem[0],null).getPropertyValue("width");
        left = Node.getPointValue(elem,"padding-left"),
        right = Node.getPointValue(elem,"padding-right"),
        value = width + left + right;
    return value;
}
Node.getPointOuterHeight = (elem) => {
    var width =  Node.getPointValue(elem,"height"),
        top = Node.getPointValue(elem,"padding-top"),
        bottom = Node.getPointValue(elem,"padding-bottom"),
        value = width + top + bottom;
    return value;
}
/********************************************
 * settingBox: 选中元素时，选中框的位置设定
 * elem: 当前被选中的元素
 * ischild: 判断当前被选中的元素是否是子集
 *          如果是(ischild='ischild')，则选中框的偏移量(offsetLeft/offsetTop)都需要根据父级的偏移量来确定
 * parentHeight: 父级元素的高度（暂时未用）
 *******************************************/
Node.settingBox = (elem,ischild,parentHeight = 0) => {   // 选中框
    let checkedboxStyle = {},
        parent = null,
        left = 0,
        top = 0,
        i = 0
    switch(ischild){
        case 'ischild':
            parent = elem.offsetParent
            while(parent && !parent.attributes['yh-editor-content']){
                left += parent.offsetLeft
                top += parent.offsetTop
                parent = parent.offsetParent
            }
            break
    }
    checkedboxStyle.left = elem.offsetLeft + left - 2 + Node.distance
    checkedboxStyle.top = elem.offsetTop + top - 2 + Node.distance + parentHeight
    checkedboxStyle.width = Node.getPointWidth(elem) + Node.getPointValue(elem,'border-left-width') + Node.getPointValue(elem,'border-right-width');
    checkedboxStyle.height = Node.getPointHeight(elem) + Node.getPointValue(elem,'border-top-width') + Node.getPointValue(elem,'border-bottom-width');
    checkedboxStyle.display = "block"

    let scale = 1
    checkedboxStyle.left -= 2 * scale
    checkedboxStyle.top -= 2 * scale
    checkedboxStyle.width += 4 * scale
    checkedboxStyle.height += 4 * scale

    let selectParent = '',
        selection = document.getElementsByClassName('yh-selection'),
        selectTop = document.getElementsByClassName('yh-selectTop')[0],
        selectBottom = document.getElementsByClassName('yh-selectBottom')[0],
        selectLeft = document.getElementsByClassName('yh-selectLeft')[0],
        selectRight = document.getElementsByClassName('yh-selectRight')[0]
    
    selectTop.style.width = checkedboxStyle.width+'px'
    selectTop.style.left = checkedboxStyle.left+'px'
    selectTop.style.top = checkedboxStyle.top+'px'
    selectBottom.style.width = checkedboxStyle.width+'px'
    selectBottom.style.left = checkedboxStyle.left+'px'
    selectBottom.style.top = checkedboxStyle.top+checkedboxStyle.height+'px'
    selectLeft.style.height = checkedboxStyle.height+'px'
    selectLeft.style.left = checkedboxStyle.left+'px'
    selectLeft.style.top = checkedboxStyle.top+'px'
    selectRight.style.height = checkedboxStyle.height+'px'
    selectRight.style.left = checkedboxStyle.left+checkedboxStyle.width+'px'
    selectRight.style.top = checkedboxStyle.top+'px'
    
    for(i = 0; i < selection.length; i++){
        if(/(hide)/g.test(selection[i].className)){
            selection[i].className = selection[i].className.replace(/(hide)/g,'').replace('  ',' ')
        }
    }
}

Node.updateData = (data,baseData) =>{
    let i = '',
        j = '',
        status = false,
        newdata = {}
    for( i in baseData){
        switch(i){
            case 'sync':
            case 'data':
            case 'css':
            case 'rotate':
            case 'event':
            case 'states':
                newdata[i] = {}
                if(data[i]){
                    for(j in baseData[i]){
                        // status = Node.isArray(baseData[i][j].value) || Node.isObject(baseData[i][j].value)
                        if(data[i][j]){
                            newdata[i][j] = JSON.parse(JSON.stringify(baseData[i][j]))
                            newdata[i][j].value = data[i][j].value
                            if(data[i][j].hasOwnProperty('status')){
                                newdata[i][j].status = data[i][j].status
                            }
                        }else{
                            newdata[i][j] = JSON.parse(JSON.stringify(baseData[i][j]))
                        }
                    }
                }else{
                    newdata[i] = JSON.parse(JSON.stringify(baseData[i]))
                }
                break
            default:
                newdata[i] =  data[i]
                break
        }
    }
    return newdata
}

module.exports = {
    ...Node
}