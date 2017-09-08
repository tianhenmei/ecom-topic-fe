
// var params = {
// 	left: 0,
// 	top: 0,
// 	currentX: 0,
// 	currentY: 0,
// 	flag: false
// };
// //获取相关CSS属性
// var getCss = function(o,key){
// 	return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
// };

// //拖拽的实现
// var startDrag = function(bar, target, callback){
// 	if(getCss(target, "left") !== "auto"){
// 		params.left = getCss(target, "left");
// 	}
// 	if(getCss(target, "top") !== "auto"){
// 		params.top = getCss(target, "top");
// 	}
// 	//o是移动对象
// 	bar.onmousedown = function(event){
// 		params.flag = true;
// 		if(!event){
// 			event = window.event;
// 			//防止IE文字选中
// 			bar.onselectstart = function(){
// 				return false;
// 			}  
// 		}
// 		var e = event;
// 		params.currentX = e.clientX;
// 		params.currentY = e.clientY;
// 	};
// 	document.onmouseup = function(){
// 		params.flag = false;	
// 		if(getCss(target, "left") !== "auto"){
// 			params.left = getCss(target, "left");
// 		}
// 		if(getCss(target, "top") !== "auto"){
// 			params.top = getCss(target, "top");
// 		}
// 	};
// 	document.onmousemove = function(event){
// 		var e = event ? event: window.event;
// 		if(params.flag){
// 			var nowX = e.clientX, nowY = e.clientY;
// 			var disX = nowX - params.currentX, disY = nowY - params.currentY;
// 			target.style.left = parseInt(params.left) + disX + "px";
// 			target.style.top = parseInt(params.top) + disY + "px";
// 		}
		
// 		if (typeof callback == "function") {
// 			callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
// 		}
// 	}	
// };




// import $ from '../../common/js/lib/jquery.1.10.1.min.js'
class Drag{
    constructor(params){
        this.outer = $(params.outer)
        this.contain = $(params.contain)
        this.move_box = params.move_box ? $(params.move_box) : null
        this.elemPath = params.elemPath ? params.elemPath : ''
        this.mousedownCallback = params.mousedownCallback ? params.mousedownCallback : function(){}
        this.mouseupCallback = params.mouseupCallback ? params.mouseupCallback : function(){}
        this.firstMoveCallback = params.firstMoveCallback ? params.firstMoveCallback : function(){}
        this.distance = params.distance ? params.distance : 0

        this.down = false   // 是否点击
        this.ismoving = false
        this.elem = null  // 当前被点击的元素
        this.contain_position = {   // 容器的偏移量
            x:this.contain.offset().left,
            y:this.contain.offset().top
        }

        this.origin = {
            x:0,
            y:0
        }
        this.end = {
            x:0,
            y:0
        }
        this.data = {
            width:0,
            height:0,
            left:0,
            top:0,
            x:0,
            y:0
        }
        this.status = true;

        this.initEvent()
    }
    initEvent(){
        var self = this
        var body = $('body')
        this.outer.on('mousedown',this.elemPath,function(e){
            e.stopPropagation();

            if(self.status){
                self.elem = $(this);
                if(!self.move_box){
                    self.move_box = self.elem;
                }
                self.mousedown(e.clientX,e.clientY,self);
            }else{
                self.ismoving = false;
                self.down = false;
            }
        })
        body.on('mousemove',function(e){
            e.preventDefault() 
            if(self.status){
                self.mousemove(e.clientX,e.clientY,self);
            }else{
                self.ismoving = false;
                self.down = false;
            }
        })
        body.on('mouseup',function(e){
            if(self.status){
                self.mouseup(e.clientX,e.clientY,self);
            }else{
                self.ismoving = false;
                self.down = false;
            }
        })
    }
    mouseup(x,y,self){
        if(self.ismoving){
            self.mouseupCallback(
                self.elem,
                self.move_box,
                self.end.x,
                self.end.y,
                self.distance
            );
        }
        self.ismoving = false;
        self.down = false;
    }
    mousemove(x,y,self){
        if(self.down){
            if(!self.ismoving){
                self.firstMoveCallback()
                self.move_box.css({
                    'width':self.data.width+'px',
                    'height':self.data.height+'px',
                    'left':(self.data.left + self.distance) + 'px',
                    'top':(self.data.top + self.distance) +'px',
                    '-webkit-transform':'rotateZ(0deg)',
                    'transform':'rotateZ(0deg)',
                    'display':'block'
                });
                self.end.x = self.data.left + self.distance;
                self.end.y = self.data.top + self.distance;
            }else{
                self.end.x = x - this.contain_position.x - self.origin.x + self.distance;
                self.end.y = y - this.contain_position.y - self.origin.y + self.distance;
            }

            self.move_box.css({
                'left':self.end.x+'px',
                'top':self.end.y+'px'
            });
            self.ismoving = true;
        }
    }
    getParentTop(elem){
        if(elem.parents('[yh-tab]').length > 0){
            let tab = elem.parents('[yh-tab]').eq(0),
                tabTitle = tab.children('[yh-tab-title]'),
                top = this.getPointHeight(tabTitle) + this.getPointValue(tab,'top')
            return top
        }else{
            return 0
        }
    }
    mousedown(x,y,self){
        self.contain_position.x = self.contain.offset().left
        self.contain_position.y = self.contain.offset().top

        self.data.width = self.getPointOuterWidth(self.elem)
        self.data.height = self.getPointOuterHeight(self.elem)
        self.data.left = self.getPointValue(self.elem,'left')
        self.data.top = self.getPointValue(self.elem,'top') + self.getParentTop(self.elem)
        self.data.x = self.elem.offset().left
        self.data.y = self.elem.offset().top

        self.origin.x = x - self.data.x;   // 鼠标在当前元素的位置
        self.origin.y = y - self.data.y;

        self.down = true;
        self.ismoving = false

        this.mousedownCallback(self.contain,self.elem)
    }











    getComputedValue(elem,attribute){
        var value = window.getComputedStyle(elem[0],null).getPropertyValue(attribute);
        return value;
    }
    getPointValue(elem,attribute){
        if(!elem || elem.length == 0){
            return 0
        }
        var value = window.getComputedStyle(elem[0],null).getPropertyValue(attribute);
        return parseFloat(parseFloat(value).toFixed(2));
    }
    getPointWidth(elem){
        var value = this.getPointValue(elem,"width"); //window.getComputedStyle(elem[0],null).getPropertyValue("width");
        return value;
    }
    getPointHeight(elem){
        var value = this.getPointValue(elem,"height"); // window.getComputedStyle(elem[0],null).getPropertyValue("height");
        return value;
    }
    getPointOuterWidth(elem){
        var width =  this.getPointValue(elem,"width"), //window.getComputedStyle(elem[0],null).getPropertyValue("width");
            left = this.getPointValue(elem,"padding-left"),
            right = this.getPointValue(elem,"padding-right"),
            value = width + left + right;
        return value;
    }
    getPointOuterHeight(elem){
        var width =  this.getPointValue(elem,"height"),
            top = this.getPointValue(elem,"padding-top"),
            bottom = this.getPointValue(elem,"padding-bottom"),
            value = width + top + bottom;
        return value;
    }
}



module.exports = Drag