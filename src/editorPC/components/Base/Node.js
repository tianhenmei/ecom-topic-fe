const Node = {
    distance:0
}
Node.setAll = (e) => {
    console.log(e.target.path)
    console.log(this.$refs)
}
Node.getComputedValue = (elem,attribute) => {
    var value = window.getComputedStyle(elem[0],null).getPropertyValue(attribute);
    return value;
}
Node.getPointValue = (elem,attribute) => {
    if(!elem || elem.length == 0){
        return 0
    }
    var value = window.getComputedStyle(elem[0],null).getPropertyValue(attribute);
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
Node.settingBox = (elem,parentHeight = 0) => {   // 选中框
    let checkedboxStyle = {},
        element = $(elem)
    checkedboxStyle.left = elem.offsetLeft - 2 + Node.distance
    checkedboxStyle.top = elem.offsetTop - 2 + Node.distance + parentHeight
    checkedboxStyle.width = Node.getPointWidth(element) + parseFloat(element.css('border-left-width'))+parseFloat(element.css('border-right-width'));
    checkedboxStyle.height = Node.getPointHeight(element) + parseFloat(element.css('border-top-width'))+parseFloat(element.css('border-bottom-width'));
    checkedboxStyle.display = "block"

    let scale = 1
    checkedboxStyle.left -= 2 * scale
    checkedboxStyle.top -= 2 * scale
    checkedboxStyle.width += 4 * scale
    checkedboxStyle.height += 4 * scale

    let selectParent = ''
    $(selectParent+' .yh-selectTop').css({
        'width':checkedboxStyle.width+'px',
        'left':checkedboxStyle.left+'px',
        'top':checkedboxStyle.top+'px'
    })
    $(selectParent+' .yh-selectBottom').css({
        'width':checkedboxStyle.width+'px',
        'left':checkedboxStyle.left+'px',
        'top':checkedboxStyle.top+checkedboxStyle.height+'px'
    })
    $(selectParent+' .yh-selectLeft').css({
        'height':checkedboxStyle.height+'px',
        'left':checkedboxStyle.left+'px',
        'top':checkedboxStyle.top+'px'
    })
    $(selectParent+' .yh-selectRight').css({
        'height':checkedboxStyle.height+'px',
        'left':checkedboxStyle.left+checkedboxStyle.width+'px',
        'top':checkedboxStyle.top+'px'
    })
    // $(selectParent+' .yh-selectOpera').css({
    //     'left':checkedboxStyle.left+5+'px',
    //     'top':checkedboxStyle.top+5+'px'
    // })
    $(selectParent+' .yh-selection').css('display','block')
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
        if(elem.hasClass(classname)){
            value = elem.css(stylename)
        }else{
            child = elem.find('.'+classname)
            if(stylename.indexOf('color') >= 0 && child.length == 0){
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

        data[css] = {
            cn:baseData[css].cn,
            en:css,
            value:Node.dealRGBColor(value)
        }
    }
    return data
}
Node.recoveryDataATTR = (elem,baseData) => {
    let data = {},
        value = ''
    for(let attr in baseData){
        if(elem[0].getAttribute(attr)){
            value = elem[0].getAttribute(attr)
        }else{
            value = elem.find('['+attr+']')[0].getAttribute(attr)
        }
        data[css] = value
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
        attribute = Node.recoveryDataATTR(elem,data.attribute)
    return {
        css:css,
        attribute:attribute
    }
}


module.exports = {
    ...Node
}