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
            case 'data':
            case 'css':
            case 'common':
            case 'attribute':
                newdata[i] = {}
                if(data[i]){
                    for(j in baseData[i]){
                        // status = Node.isArray(baseData[i][j].value) || Node.isObject(baseData[i][j].value)
                        if(data[i][j]){
                            newdata[i][j] = JSON.parse(JSON.stringify(baseData[i][j]))
                            newdata[i][j].value = data[i][j].value
                            // if(!status){ // 非对象非数组
                                
                            // }else{

                            // }
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
        yhEditLayer = document.getElementsByClassName('yh-edit-layer')
    for(i = 0; i < e.path.length; i++){
        if(e.path[i].getAttribute('yh-module')){
            id = e.path[i].id
            break
        }
    }
    for(i = 0; i < setting.length; i++){
        setting[i].className = setting[i].className.replace(/(setting)/g,'').replace(/  /g,' ')
    }
    for(i = 0; i < yhEditLayer.length; i++){
        if(!/(hide)/g.test(yhEditLayer[i].className)){
            yhEditLayer[i].className = yhEditLayer[i].className + ' hide'
        }
    }
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
        selection = document.getElementsByClassName('yh-selection')
    for(i = 0; i < setting.length; i++){
        setting[i].className = setting[i].className.replace(/(setting)/g,'').replace(/  /g,' ')
    }
    for(i = 0; i < yhEditLayer.length; i++){
        if(!/(hide)/g.test(yhEditLayer[i].className)){
            yhEditLayer[i].className = yhEditLayer[i].className + ' hide'
        }
    }
    for(i = 0; i < selection.length; i++){
        if(!/(hide)/g.test(selection[i].className)){
            selection[i].className = selection[i].className + ' hide'
        }
    }
}
/********************************************
 * getParentByClassName: 通过类名获取父级
 * elem: 初始元素
 * classname: 类名
 *******************************************/
Node.getParentByClassName = (elem,classname) => {
    while(elem && !new RegExp('('+classname+')','g').test(elem.className)){
        elem = elem.parentNode
    }
    return elem
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
        if(children[i] !== elem && new RegExp('('+classname+')','g').test(children[i].className)){
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
        if(children[i] !== elem && new RegExp('('+classname+')','g').test(children[i].className)){
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
        selection[i].style.display = 'block'
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




Node.getRequestData = (store,id,type) =>{
    switch(type){
        case 'companyId':
            break
        case 'positionId':
            break
    }
}



Node.recoveryChildElementsData = (parent,baseData,components,ignorestatus="") => {
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
Node.setCompanyData = (data) => {
    let elemData = {}
    Node.setData(elemData,{
        companyId:data.companyId,
        description:data.description,
        allDescription:data.description,
        logo:data.logo,
        name:data.name,
        slogan:data.slogan,
        industryfield:data.industryfield,
        otherlabel:data.otherlabel ? data.otherlabel.split(',') : [],
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