const Node = {
    distance:0,
    positionTag:{
        '技术':'technique',
        '产品':'product',
        '设计':'design',
        '运营':'operation',
        '市场与销售':'market-sale',
        '职能':'function',
        '金融':'finance'
    }
}
Node.setAll = (e) => {
    console.log(e.target.path)
    console.log(this.$refs)
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
 * deepCopy: 深拷贝对象
 * n: 需要拷贝的对象
 * e：被拷贝的对象
 *******************************************/
Node.deepCopy = (n,c) => {
    for (let i in c) {
        if (typeof c[i] === 'object') {
            n[i] = (c[i].constructor === Array) ? [] : {}
            Node.deepCopy(c[i], n[i])
        } else {
            n[i] = c[i]
        }
    }
    return c
}
/********************************************
 * getNow: 获取当前时间
 * now: 默认当前时间，类型Date
 * format: 想要被返回的时间格式，默认：yyyy/MM/dd hh:mm:ss
 *******************************************/
Node.getNow = (now = new Date(),format='yyyy/MM/dd hh:mm:ss') => {
    let o = {
            yyyy: now.getFullYear() + '',
            MM: (now.getMonth() + 1) + '',
            dd: now.getDate() + '',
            hh: now.getHours() + '',
            mm: now.getMinutes() + '',
            ss: now.getSeconds() + ''
        },
        i = '',
        def = '0000'
    for(i in o){
        format = format.replace(i,def.substr(0,i.length-o[i].length)+o[i])
    }
    return format
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
            case 'h5css':
            case 'common':
            case 'attribute':
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
/********************************************
 * initSelected: 初始化选中，获取被选中元素的ID，取消其他组件选中状态，展示当前组件的设置yh-edit-layer
 * e: 事件对象
 * return id
 *******************************************/
Node.initSelected = (e) => {
    let i = 0,
        id = '',
        setting = document.getElementsByClassName('setting'),
        selected = document.getElementsByClassName('yh-module-selected'),  // 被选中的父级
        yhEditLayer = document.getElementsByClassName('yh-edit-layer'),
        parents = null,
        childs = null,
        elem = null
    for(i = 0; i < e.path.length; i++){
        if(e.path[i].getAttribute('yh-module')){
            id = e.path[i].id
            break
        }
    }
    for(i = 0; i < setting.length; i++){
        setting[i].className = setting[i].className.replace(/(setting)/g,'').replace(/  /g,' ')
    }
    for(i = 0; i < selected.length; i++){
        selected[i].className = selected[i].className.replace(/(yh-module-selected)/g,'').replace(/  /g,' ')
    }
    for(i = 0; i < yhEditLayer.length; i++){
        if(!/(hide)/g.test(yhEditLayer[i].className)){
            yhEditLayer[i].className = (yhEditLayer[i].className + ' hide').replace(/  /g,' ')
        }
    }

    elem = document.getElementById(id)
    parents = Node.getParentsByAttr(elem,'yh-module')
    childs = Node.getChildrenByAttr(elem,'yh-module')
    for(i = 1; i < parents.length; i++){
        if(!/(yh-module-selected)/g.test(parents[i].className)){
            parents[i].className = (parents[i].className + ' yh-module-selected').replace(/  /g,' ')
        }
    }
    if(elem.attributes['yh-vessel']){
        elem.className += ' yh-module-selected'
    }
    for(i = 0; i < childs.length - 1; i++){
        if(!/(yh-module-selected)/g.test(childs[i].className)){
            childs[i].className = (childs[i].className + ' yh-module-selected').replace(/  /g,' ')
        }
    }
    // .yh-module-selected
    return id
}
/********************************************
 * undoSelected: 取消组件选中状态
 *******************************************/
Node.undoSelected = () => {
    let i = 0,
        id = '',
        setting = document.getElementsByClassName('setting'),
        yhEditLayer = document.getElementsByClassName('yh-edit-layer'),
        selection = document.getElementsByClassName('yh-selection'),
        add = document.getElementsByClassName('yh-vessel-add'),
        selected = document.getElementsByClassName('yh-module-selected')//,
        // arr = [].concat(yhEditLayer,selection,add)
    for(i = 0; i < setting.length; i++){
        setting[i].className = setting[i].className.replace(/(setting)/g,'').replace(/  /g,' ')
    }
    for(i = 0; i < yhEditLayer.length; i++){
        if(!/(hide)/g.test(yhEditLayer[i].className)){
            yhEditLayer[i].className = (yhEditLayer[i].className + ' hide').replace(/  /g,' ')
        }
    }
    for(i = 0; i < selection.length; i++){
        if(!/(hide)/g.test(selection[i].className)){
            selection[i].className = (selection[i].className + ' hide').replace(/  /g,' ')
        }
    }
    for(i = 0; i < selected.length; ){
        selected[i].className = selected[i].className.replace(/(yh-module-selected)/g,'').replace(/[ ]{2,n}/g,' ')
    }
    for(i = 0; i < add.length; i++){
        if(!/(hide)/g.test(add[i].className)){
            add[i].className = (add[i].className + ' hide').replace(/(  )/g,' ')
        }
    }
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
        if(children[i] !== elem && children[i].getAttribute(attr)){
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
/***********************************
 * changeData: 修改数据（需区分是css值还是attr值）
 * elem: 当前要修改数据所属的元素
 * name: 要修改数据属性的名称
 * data: 元素的所有数据
 * value: 当前修改后的值
 ********************************/
Node.changeData = (elem,data,name,value) => {
    let arr = [],
        classname = '',
        stylename = '',
        classify = 'attribute'
    if(data.css.hasOwnProperty(name)){
        classify = 'css'
        arr = name.split('_')
        classname = arr[0]
        stylename = arr.slice(1).join('-')
        if(elem.hasClass(classname)){
            elem.css(stylename,value)
        }
        if(stylename.indexOf('color') >= 0){
            elem.find('.'+classname,',.'+classname+'-background-color'+',.'+classname+'-color'+',.'+classname+'-border-color').css(stylename,value)
        }else{
            elem.find('.'+classname).css(stylename,value)
        }
    }else{
        if(elem[0].getAttribute(name)){
            elem.attr(name,value)
        }
        elem.find('['+name+']').attr(name,value)
    }
    // 给data属性的css活attribute赋值
    data[classify][name] = value
}
/***********************************
 * uploadFile: 上传文件
 ********************************/
Node.uploadFile = () => {

}
/****
 * dealRGBColor(): 处理RGB颜色（将RGB转换为16进制）
 * */
Node.dealRGBColor = function(color){
    color = color + '';
    if(color.toLowerCase().indexOf('rgb') > -1){
        var colorArray = color.toLowerCase().split('(')[1].split(',');
        var lastColor = '#';
        if(colorArray.length == 4){
            return 'transparent';
        }
        for( var i = 0; i < colorArray.length; i++ ){
            var cu = parseInt(colorArray[i]).toString(16);
            if(cu.length == 1){
                cu = '0'+cu;
            }else if(cu.length == 0){
                cu = '00';
            }
            lastColor += cu;
        }
        return lastColor;
    }else{
        return color;
    }
};

Node.dealRGBOpacityColor = function(color){
    color = color + '';
    if(color.toLowerCase().indexOf('rgb') > -1){
        var colorStr = color.toLowerCase().split('(')[1];
        colorStr = substring(0,colorStr.length-1);
        var colorArray = colorStr.split(',');
        var lastColor = '#';
        if(colorArray.length == 4){
            return 'transparent';
        }
        for( var i = 0; i < colorArray.length; i++ ){
            var cu = parseInt(colorArray[i]).toString(16);
            if(cu.length == 1){
                cu = '0'+cu;
            }else if(cu.length == 0){
                cu = '00';
            }
            lastColor += cu;
        }
        return lastColor;
    }else{
        return color;
    }
};
/****
 * dealStringLine(): 截取字符串, 并且保证最多只有多少行
 * textSize : 总字数
 * one ： 一行的字数
 * line ：多少行
 * value ：字符串
 * status ： 状态（是否截断字符串），true：返回true or false
 * */
Node.dealStringLine = function(textSize,one,line,value,status){
    var tagReg = /\<[(p)|(\/p)|(li)|(\/li)|(ul)|(\/ul)|(span)|(\/span)|(h1)|(\/h1)|(h2)|(\/h2)|(h3)|(\/h3)|(h4)|(\/h4)|(h5)|(\/h5)|(h6)|(\/h6)|(font)|(\/font)|(b)|(\/b)|(u)|(\/u)|(i)|(\/i)|(div)|(\/div)]*[^>]*>/g,
        valueArray = value.split(/\<[(p)|(\/p)|(li)|(\/li)|(ul)|(\/ul)|(span)|(\/span)|(h1)|(\/h1)|(h2)|(\/h2)|(h3)|(\/h3)|(h4)|(\/h4)|(h5)|(\/h5)|(h6)|(\/h6)|(font)|(\/font)|(b)|(\/b)|(u)|(\/u)|(i)|(\/i)|(div)|(\/div)]*[^>]*>/),
        styleArray = value.match(/\<[(p)|(\/p)|(li)|(\/li)|(ul)|(\/ul)|(span)|(\/span)|(h1)|(\/h1)|(h2)|(\/h2)|(h3)|(\/h3)|(h4)|(\/h4)|(h5)|(\/h5)|(h6)|(\/h6)|(font)|(\/font)|(b)|(\/b)|(u)|(\/u)|(i)|(\/i)|(div)|(\/div)]*[^>]*>/g),
        // clearValue = value.replace(/[\t\n\r\s]/g, ""),  //\s*\t\n\r
        clearValue = value.replace(/(>( )*<)/g,'><')
                          .replace(/(<( )*)/g,'<')
                          .replace(/(( )*>)/g,'>')
                          .replace(/(<\/( )*)/g,'</')
                          .replace(/(<br( )*)/g,'<br')
                          .replace(/(( )*\/>)/g,'/>')
                          .replace(/(<( )*\/)/g,'</')
                          .replace(/[\n\r]/g, ''),
        i = 0,
        re=/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g,   // 匹配中文
        styleIndex = 0,
        tempIndex = 0,
        already = 0,
        str = '',
        tempStr = '',
        tempOne = 0,
        tempLength = 0,
        temp,
        isClip = false,
        lastLength = 0,
        resultTag = [],
        rt = 0,
        rt_first = false;
    if(valueArray){
        for( i = 0; i < valueArray.length; i++ ){
            if(!valueArray[i].trim()){
                valueArray.splice(i,1);
                i--;
            }
        }
    }
    if(styleArray){
        for( i = 0; i < styleArray.length; i++ ){
            if(!styleArray[i].trim()){
                styleArray.splice(i,1);
                i--;
            }
        }
    }
    for( i = 0,styleIndex = 0; i < valueArray.length; i++ ){
        if(styleArray){
            for(tempIndex = styleIndex; tempIndex < styleArray.length; tempIndex++){
                temp = str + styleArray[tempIndex];
                if(clearValue.indexOf(temp) == 0){
                    if(already < line){
                        str += styleArray[tempIndex];
                        if(styleArray[tempIndex].indexOf('<br') == 0){
                            already++;
                        }
                    }
                }else{
                    styleIndex = tempIndex;
                    break;
                }
            }
        }else if(i > 0){
            str += '<br/>';
        }
        tempOne = Math.ceil(valueArray[i].replace(re,"çç").length / one);
        if(already < line){
            if((already+tempOne) == line){
                lastLength = one*(line-already) - (one - (one * line - textSize));
                tempStr = valueArray[i].replace(re,"çç").slice(0,lastLength);
                if(/çç/g.test(tempStr)){
                    tempLength = tempStr.replace(/(çç)/g,"一").length;//tempStr.match(/çç/g).length;
                }
                if(tempLength < valueArray[i].length){
                    str += valueArray[i].slice(0,tempLength) + '...';
                    isClip = true;
                }else{
                    str += valueArray[i];
                    isClip = false;
                }
                already = line;
            }else if((already+tempOne) > line){
                lastLength = one*(line-already) - (one - (one * line - textSize));
                tempStr = valueArray[i].replace(re,"çç").slice(0,lastLength);
                if(/çç/g.test(tempStr)){
                    tempLength = tempStr.replace(/(çç)/g,"一").length;//tempStr.match(/çç/g).length;
                }
                str += valueArray[i].slice(0,tempLength) + '...';
                already = line;
                isClip = true;
            }else{
                already = already+tempOne;
                str += valueArray[i];
                if(i == (valueArray.length - 1)){
                    isClip = false;
                }
            }
            if(styleArray){
                for(tempIndex = styleIndex; tempIndex < styleArray.length; tempIndex++){
                    if(styleArray[tempIndex].indexOf('</') == 0 || styleArray[tempIndex].indexOf('<br') == 0){
                        if(styleArray[tempIndex].indexOf('<br') == 0){
                            if(already < line){
                                if(already == line){
                                    isClip = false;
                                }
                                temp = str + styleArray[tempIndex];
                                if(clearValue.indexOf(temp) == 0){
                                    resultTag = str.match(tagReg);
                                    str += styleArray[tempIndex];
                                    if(resultTag){
                                        for(rt = resultTag.length - 1; rt > -1; rt--){
                                            if(resultTag[rt].indexOf('<br') == -1){   // 最后一个不是换行符
                                                if(resultTag[rt].indexOf('</') == 0 && resultTag[rt].indexOf('</span') == -1){  // 如果最后一个标签能让str换行
                                                    already++;
                                                    break;
                                                }
                                            }else if(rt == resultTag.length - 1 && resultTag[rt].indexOf('<br') == 0){  // 如果最后一个是换行符
                                                already++;
                                                break;
                                            }
                                        }
                                    }
                                }else{
                                    styleIndex = tempIndex;
                                    break;
                                }
                            }else{
                                styleIndex = tempIndex;
                                break;
                            }
                        }else{
                            temp = str + styleArray[tempIndex];
                            if(clearValue.indexOf(temp) == 0){
                                str += styleArray[tempIndex];
                            }else{
                                styleIndex = tempIndex;
                                break;
                            }
                        }
                    }else{
                        if(already == line){
                            break;
                        }
                        styleIndex = tempIndex;
                        break;
                    }
                }
            }
            if(already == line){
                if(status){
                    return isClip;
                }else{
                    break;
                }
            }
        }/*else {
            if(i == (valueArray.length - 1)){
                isClip = false;
            }else{
                isClip = true;
                if(str.slice(str.length - 4).indexOf('...') == -1){
                    str += '...'
                }
            }
            break;
        }*/
    }
    if(status){
        return isClip;
    }else{
        // 闭合标签
        str = Node.closeHTML(str);
        return str;
    }
}
Node.closeHTML = (str) => {
    var styleArray = str.match(/\<[(p)|(\/p)|(li)|(\/li)|(ul)|(\/ul)|(span)|(\/span)|(h1)|(\/h1)|(h2)|(\/h2)|(h3)|(\/h3)|(h4)|(\/h4)|(h5)|(\/h5)|(h6)|(\/h6)|(font)|(\/font)|(b)|(\/b)|(u)|(\/u)|(i)|(\/i)|(div)|(\/div)]*[^>]*>/g),
        current, next,
        i = 0,
        not = [];
    if(styleArray){
        for( i = 0; i < styleArray.length; i++ ){
            if(styleArray[i].indexOf('<br') != 0){
                current = styleArray[i].split(/[\<(\s*)]/)[1];  //current   当前标签名
                if((i+1) < styleArray.length){
                    next = styleArray[i+1].split(/[\<(\s*)]/)[1];
                }else{
                    next = '';
                }

                if(current[0] == '/'){
                    if(current.slice(1) == not[not.length-1]){
                        not.splice(not.length - 1,1);
                    }
                }else if(current != next.slice(1)) {  // 此标签不是闭合标签
                    not.push(current);
                }else{
                    i++;
                }
            }
        }
        for( i = not.length - 1; i >= 0; i--){
            str += (not[i].indexOf('<') >= 0 ? '' : '<')+(not[i].indexOf('/') >= 0 ? '' : '/')+not[i]+(not[i].indexOf('>') >= 0 ? '' : '>');
        }
    }
    return str;
}


Node.getRequestData = (store,id,type) =>{
    switch(type){
        case 'companyId':
            break
        case 'positionId':
            break
    }
}

Node.getRem = (value) => {
    return value / (750 / 16)  //  + 'rem'
}

Node.getPx = (value) => {
    return value * (750 / 16) // + 'rem';
}

Node.recoveryChildElementsData = (parent,baseData,components,parentmodule="",ignorestatus="") => {
    let data = [],
        current = {},
        elem = parent[0].getAttribute('id') ? parent : parent.find('[id]').eq(0),
        elemID = elem.attr('id'),
        children = elem.children('#'+elemID+'-content').children(),
        child = null,
        id = '',
        yhmodule = '',
        i = 0
    for(i = 0; i < children.length; i++){
        if(children[i].getAttribute('id')){
            child = children.eq(i)
        }else{
            child = children.eq(i).find('[id]').eq(0)
        }
        id = child.attr('id')
        yhmodule = child.attr('yh-module')
        current = {
            id:id,
            'yh-module':yhmodule,
            module:components[yhmodule],
            recoveryChildElementsData:parentmodule,
            props:components[yhmodule].recoveryCtor(children.eq(i),{
                id:id,
                ignorestatus:ignorestatus,
                ischild:'ischild'
            })
        }
        data.push(current)
    }
    return {
        elements:data
    }
}

Node.recoveryDataCSS = (elem,baseData) => {
    let data = {},
        arr = [],
        classname = '',
        stylename = '',
        value = '',
        child = null
    for(let css in baseData){
        arr = css.split('_')
        classname = arr[0]
        stylename = arr.slice(1).join('-')
        switch(baseData[css].type){
            case 'number':
                switch(classname){
                    case 'width':
                    case 'height':
                        value = parseFloat(elem.css(classname))
                        if(!value){
                            value = baseData[css].value
                        }
                        break
                    default:
                        if(elem.hasClass(classname)){
                            value = elem.css(stylename)
                        }else{
                            child = elem.find('.'+classname)
                            value = child.eq(0).css(stylename)
                        }
                        break
                }
                switch(value){
                    case 'auto':
                        break
                    default:
                        if(value == ''){
                            value = baseData[css].value
                        }else{
                            value = parseFloat(value)
                        }
                        break
                }
                break
            case 'image':
                if(elem.hasClass(classname)){
                    value = elem.css(stylename)
                }else{
                    child = elem.find('.'+classname)
                    value = child.eq(0).css(stylename)
                }
                if(value){
                    switch(baseData[css].mold){
                        case 'bg':
                            value = value != 'none' ? value.split(/[\("'\)]/g)[2] : 'none'
                            break
                        default:
                            break
                    }
                }else{
                    value = baseData[css].value
                }
                break
            default:
                if(elem.hasClass(classname)){
                    value = elem.css(stylename)
                }else{
                    child = elem.find('.'+classname)
                    if(child.length == 0 && stylename.indexOf('color') >= 0 ){
                        let other = ['background-color','color','border-color'],
                            index = other.indexOf(stylename),
                            i = 0
                        other.splice(index,1)
                        for(i = 0; i < other.length; i++){
                            child = elem.find('.'+classname+'-'+other[i])
                            if(child.length > 0){
                                break
                            }
                        }
                        value = child.length > 0 ? child.eq(0).css(other[i]) : baseData[css].value
                    }else {
                        value = child.eq(0).css(stylename)
                    }
                    if(value == ''){
                        value = baseData[css].value
                    }
                }
                break
        }

        data[css] = {
            cn:baseData[css].cn,
            en:baseData[css].en,
            value:Node.dealRGBColor(value),
            type:baseData[css].type ? baseData[css].type : 'color'
        }
        if(baseData[css].mold){
            data[css].mold = baseData[css].mold
        }
    }
    return data
}
Node.recoveryDataATTR = (elem,baseData) => {
    let data = {},
        value = '',
        current = null
    for(let attr in baseData){
        if(elem[0].attributes[attr]){//getAttribute(attr)){
            value = elem[0].getAttribute(attr)
        }else{
            current = elem.find('['+attr+']')
            if(current.length > 0){
                value = current[0].getAttribute(attr)
            }else{
                value = baseData[attr].value
            }
        }
        if(value = '[object Object]'){
            value = baseData[attr].value
        }
        data[attr] = {
            cn:baseData[attr].cn,
            en:attr,
            value:value,
            type:baseData[attr].type ? baseData[attr].type : 'color'
        }
        if(baseData[attr].mold){
            data[attr].mold = baseData[attr].mold
        }
    }
    return data
}

Node.setChildArrayData = (elemData,baseData) => {
    let data = [],
        i = 0
    for(i = 0; i < elemData.length; i++){
        data.push({})
        for(let attr in baseData){
            data[i][attr] = {
                cn:baseData[attr].cn,
                en:attr,
                value:elemData[i][attr],
                type:baseData[attr].type ? baseData[attr].type : 'data',
                parent:baseData[attr].parent ? baseData[attr].parent : 'data'
            }
        }
    }
    return data
}

Node.setChildObjectData = (elemData,baseData) => {
    let data = []
    for(let attr in baseData){
        data[attr] = {
            cn:baseData[attr].cn,
            en:attr,
            value:elemData[attr],
            type:baseData[attr].type ? baseData[attr].type : 'data',
            parent:baseData[attr].parent ? baseData[attr].parent : 'data'
        }
    }
    return data
}

Node.setChildData = (elemData,baseData) => {
    let data = {},
        value = '',
        current = null
    for(let attr in baseData){
        if(elemData[attr] && (Node.isObject(elemData[attr]) || Node.isArray(elemData[attr]))){
            data[attr] = {
                cn:baseData[attr].cn,
                en:attr,
                value:Node.isArray(elemData[attr]) ? Node.setChildArrayData(elemData[attr],baseData[attr].value[0])
                    : Node.setChildObjectData(elemData[attr],baseData[attr].value),
                type:baseData[attr].type ? baseData[attr].type : 'data',
                parent:baseData[attr].parent ? baseData[attr].parent : 'data',
                name:baseData[attr].name ? baseData[attr].name : 'positionName'
            }
        }else{
            data[attr] = {
                cn:baseData[attr].cn,
                en:attr,
                value:elemData[attr] ? elemData[attr] : baseData[attr].value,
                type:baseData[attr].type ? baseData[attr].type : 'data',
                parent:baseData[attr].parent ? baseData[attr].parent : 'data'
            }
        }
        if(baseData[attr].mold){
            data[attr].mold = baseData[attr].mold
        }
    }
    return data
}

Node.getDataID = (link,number) =>{
    if(!link){
        return 0
    }
    let compIdGet = link.substr(number),
        index = compIdGet.indexOf("."),
        id = compIdGet.substring(0,index);

    return id;
}

/***********************************
 * recoveryData: 恢复数据（需区分是css值还是attr值）
 * 数据属性规则如下：progress_background_color（确保elem的css属性名称为此）
 * progress 类名，此属性涉及到的类名还可以是: 
 * progress-background-color progress-color progress-border-color
 * background-color 需改变的值
 ********************************/
Node.recoveryData = (elem,data) => {
    let css = Node.recoveryDataCSS(elem,data.css),
        h5css = Node.recoveryDataATTR(elem,data.h5css),
        attribute = Node.recoveryDataATTR(elem,data.attribute)
    return {
        css:css,
        h5css:h5css,
        attribute:attribute
    }
}

/****
* setData(): 设置数据
* */
Node.setData = function(elem,attributes){
    for( var attr in attributes ){
        if(attributes[attr]){
            elem[attr] = JSON.parse(JSON.stringify(attributes[attr]));
        }else if(attributes[attr] == 0 || attributes[attr] == false){
            elem[attr] = attributes[attr];
        }else{
            elem[attr] = '';
        }
    }
};
/****
 * setCompanyData(): 设置公司数据（较全）
 * */
Node.setCompanyData = (data,leader) => {
    let elemData = {},
        l = 0
    data.companyId = data.id
    data.name = data.companyshortname
    data.slogan = data.companyfeatures
    data.companySize = data.companysize
    if(data.logo.indexOf('http') == -1){
        if(data.logo.indexOf('i/image/') != -1 || data.logo.indexOf('image1/') != -1 || data.logo.indexOf('image2/') != -1){
            data.logo = 'https://www.lgstatic.com/thumbnail_200x200/'+data.logo
        }else{
            data.logo = 'https://www.lgstatic.com/'+data.logo
        }
    }else{
        data.logo = ''+data.logo
    }
    data.companyLeader = {}
    for(l = 0; l < leader.length; l++){
        if(leader[l]){
            data.companyLeader = {
                name:leader[l].name,
                photo:leader[l].photo,
                remark:leader[l].remark
            }
            if(data.companyLeader.photo.indexOf('http') == -1){
                if(data.companyLeader.photo.indexOf('i/image/') != -1 || data.companyLeader.photo.indexOf('image1/') != -1 || data.companyLeader.photo.indexOf('image2/') != -1){
                    data.companyLeader.photo = 'https://www.lgstatic.com/thumbnail_200x200/'+data.companyLeader.photo
                }else{
                    data.companyLeader.photo = 'https://www.lgstatic.com/'+data.companyLeader.photo
                }
            }else{
                data.companyLeader.photo = ''+data.companyLeader.photo
            }
            break;
        }
    }
    Node.setData(elemData,{
        companyId:data.companyId,
        description:data.description,
        allDescription:data.description,
        logo:data.logo,
        name:data.name,
        slogan:data.slogan,
        industryfield:data.industryfield,
        otherlabel:data.otherlabel,// ? data.otherlabel.split(',') : [],
        city:data.city,
        level:data.financestage,
        address:data.city,
        scale:data.companySize,
        type:data.industryfield,
        manager:{
            name:data.companyLeader ? (data.companyLeader.name ? data.companyLeader.name : '') : '',
            photo:data.companyLeader ? (data.logo.indexOf('http') == -1 ? data.companyLeader.photo : 'https://www.lgstatic.com/'+data.companyLeader.photo) : 'https://www.lgstatic.com/images/leader_default.png',
            position:data.companyLeader ? (data.companyLeader.position ? data.companyLeader.position : '') : '',
            remark:data.companyLeader ? (data.companyLeader.remark ? data.companyLeader.remark : '') : '',
            all_remark:data.companyLeader ? (data.companyLeader.remark ? data.companyLeader.remark : '') : ''
        }
    })
    return elemData
};
/****
 * setPositionData(): 设置职位数据(公司)（较全）
 * */
Node.setPositionData = (elemData,data) => {
    Node.setData(elemData,{
        positionId:data.positionId,
        positionName:data.positionName,
        salary:data.salary,
        education:data.education,
        workYear:data.workYear,
        dynamic_type:Node.positionTag[data.positionFirstType]
    });
};
/****
 * setCompIntroduceData(): 设置公司介绍数据（较全）
 * */
Node.setCompIntroduceData = (parentID,childID,data) => {
    Node.setData(Manager.allDatas[parentID].position[childID],{
        companyId:data.companyId,
        logo:data.logo,
        name:data.name,
        slogan:data.slogan,
        city:data.city,
        industryfield:data.industryfield,
        level:data.financestage,
        scale:data.companySize
    });
};

module.exports = {
    ...Node
}