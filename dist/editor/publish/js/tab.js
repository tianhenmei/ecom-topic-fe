class TabClass {
    constructor(classname,id){
        this.classname = classname
        this.id = id
        this.title = $('#'+this.id+' [yh-tab-title]')[0]//document.getElementById(this.id)
        this.status = false
        this.start = {
            x:0,
            y:0
        }
        this.end = {
            x:0,
            y:0
        }
        this.init = {
            x:0,
            y:0
        }
        this.starte = null
        this.moved = false
        this.left = 0
        this.width = 0
        this.windowWidth = document.documentElement.clientWidth || window.innerWidth || screen.width

        this._initEvent()
    }
    _initEvent(){
        let tabTitle = $('#'+this.id+' [yh-tab-title]'),
            tabOne = tabTitle.children('.yh-tab-one'),
            callback = this._tabClick,
            self = this
        this.width = this._getTabTitleWidth(tabOne)
        this._setActiveTab(tabOne.eq(0),this.classname,0)
        this.status = this.width > this.windowWidth ? true : false
        if(this.status){
            callback = self._touchEnd
            tabOne.on('touchstart',function(e){
                self._touchStart(self,e)
            })
            tabOne.on('touchmove',function(e){
                self._touchMove(self,e)
            })
        }
        tabOne.on('touchend',function(e){
            callback(self,e)
        })
    }
    _touchStart(self,e){
        e.preventDefault()
        e.stopPropagation()
        self.starte = e

        let touch = e.originalEvent.touches[0]
        self.start.x = touch.clientX
        self.start.y = touch.clientY
        self.init.x = self.start.x
        self.init.y = self.start.y
    }

    _touchMove(self,e){
        e.preventDefault()
        e.stopPropagation()

        let touch = e.originalEvent.touches[0]
        self.end.x = touch.clientX
        self.end.y = touch.clientY
        self.moved = true

        let distance = self.end.x - self.start.x
        self.left += distance
        if(self.left > 0){
            self.left = 0
        }else if(self.left < (this.windowWidth - self.width)){
            self.left = this.windowWidth - self.width
        }
        self.title.style.transform = 'translateX('+self.left+'px)'
        self.title.style.webkitTransform = 'translateX('+self.left+'px)'
        self.start.x = self.end.x
        self.start.y = self.end.y
    }

    _touchEnd(self,e){
        e.preventDefault()
        e.stopPropagation()

        if(self.moved && self.end.x > 0 && Math.abs(self.init.x - self.end.x) > 10){

        }else{
            self._tabClick(self,self.starte)
        }
        self.end.x = 0
        self.end.y = 0
        self.start.x = 0
        self.start.y = 0
        self.init.x = 0
        self.init.y = 0
        self.moved = false
        self.starte = null
    }

    _tabClick(self,e){
        e.preventDefault()
        e.stopPropagation()

        let target = $(e.target).closest('.yh-tab-one'),
            index = target.index()
        self._setActiveTab(target,self.classname,index)
    }

    _getTabTitleWidth(tabOne){
        let one = tabOne[0],
            length = tabOne.length,
            width = this._getElementValue(one,'width'),
            border = this._getElementValue(one,'border-width') * 2
        return (width + border) * length
    }
    _getElementValue(elem,stylename){
        let value = window.getComputedStyle(elem, null).getPropertyValue(stylename)
        return parseFloat(value)
    }
    _forbidEnd(e){
        e.preventDefault()
        e.stopPropagation()
    }
    _setActiveTab(current,classname,index){
        let content = current.closest('[yh-tab-title]').siblings('[yh-tab-content]').children()
        current.siblings().removeClass('yh-tab-active '+classname)
        current.addClass('yh-tab-active '+classname)
        content.removeClass('yh-tab-active')
        content.eq(index).addClass('yh-tab-active')
    }
}


function initTabEvent(elementState,id){
    new TabClass(elementState.classname,id)
}