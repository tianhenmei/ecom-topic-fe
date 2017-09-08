import {Execute} from './text-dom.js'
class Editor{
    constructor(){
        this.style = {
            width:300 / (750 / 16) + 'rem',
            height:60 / (750 / 16) + 'rem',
            'line-height':60 / (750 / 16) + 'rem',
            'background-image':'',
            'font-size':36 / (750 / 16) + 'rem',
            'color':'#ffffff',
            'background-color':'#ff0084',
            'border-width':'0',
            'border-color':'#000000',
            'border-style':'none',
            'border-radius':'0',
            'box-shadow':'none',
            'box-shadow-color':'transparent',
            'box-shadow-x':'0',
            'box-shadow-y':'0',
            'box-shadow-blur':'0'
        }
    }
    // setEditData: 在元素被点击时调用，初始化数据
    setEditData(self,type){
        let elem = self.$el,
            elemID = elem.id,
            button = $(elem).find('.yh-'+type)[0],
            style = button.style.cssText,
            json = Object.assign({},JSON.parse(JSON.stringify(this.style)),Execute.getStyleJSON(style)),
            value,
            rgb = '',
            arr = [],
            r = 0,
            rv = ''  
        for(let i in json){
            value = json[i]
            if(/(rgb)/g.test(value)){
                rgb = value.match(/rgb\([0-9, .]*\)/g)  // /((rgb)|(rgba))\([0-9, .]*\)/g
                if(rgb){
                    for(r = 0; r < rgb.length; r++){
                        rv = this.getHEX(rgb[r])
                        value = value.replace(rgb[r],rv)
                    }
                }
            }else{
                if(/(rem)/g.test(value)){
                    value = Math.round(this.getPX(parseFloat(value)))
                }else if(/(px)/g.test(value)){
                    value = Math.round(parseFloat(value))
                }
            }
            self.style[i] = value
        }
        switch(self.style['box-shadow']+''){
            case 'none':
            case 'NaN':
            case 'undefined':
                self.style['box-shadow'] = 'none'
                break
            default:
                let shadowArray = self.style['box-shadow'].split(/(rgb[a]\([0-9, .]*\))/g),
                    shadow = [],
                    s = 0
                for(let j = 0; j < shadowArray.length; j++){
                    if(shadowArray[j].trim() && !/(rgb)/g.test(shadowArray[j])){
                        shadow = shadowArray[j].split(' ')
                        for(let i = 0; i < shadow.length; i++){
                            if(shadow[i]+''){
                                switch(s){
                                    case 0:
                                        self.style['box-shadow-color'] = shadow[i]
                                        s++
                                        break
                                    case 1:
                                        self.style['box-shadow-x'] = this.getDesignValue(shadow[i])
                                        s++
                                        break
                                    case 2:
                                        self.style['box-shadow-y'] = this.getDesignValue(shadow[i])
                                        s++
                                        break
                                    case 3:
                                        self.style['box-shadow-blur'] = this.getDesignValue(shadow[i])
                                        s++
                                        break
                                }
                            }
                        }
                    }else if(/(rgb)/g.test(shadowArray[j])){
                        self.style['box-shadow-color'] = shadowArray[j]
                        s++
                    }
                }
                break
        }
    }
    getPX(value){
        return value * (750 / 16)
    }
    getDesignValue(value){
        if(/(rem)/g.test(value)){
            value = this.getPX(parseFloat(value))
        }else if(/(px)/g.test(value)){
            value = parseFloat(value)
        }
        return value
    }
    getHEX(value){
        let arr = value.split(/[, \(\)rgba]/g),
            rv = '#',
            one = 0,
            hex = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
        
        for(let a = 0; a < arr.length; a++){
            if(arr[a]){
                one = parseInt(arr[a])
                rv += hex[Math.floor(one / 16)] + hex[one % 16]
            }
        }
        return rv
    }
}

export default new Editor()