// import $ from '../../common/js/lib/jquery.1.10.1.min.js'

var ScrollBar = function(options) {
    this.elem = null;
    this.initHeight = 0;
    this.elemHeight = 0;
    this.ul = null;
    this.li = null;
    this.bar = null;
    this.barHeight = 0;
    this.classname = '';
    this.length = 0;
    this.one = 0;
    this.height = 0;
    this.top = 0;
    this.start = 0;
    this.end = 0;
    this.number = 0;
    this.space = 0;
    this.scale = 0;
    this.fixedHeight = true;
    this.scroll = null;
    this.direction = 0;
    this.clickTime = 0;
    this.startMoving = false;

    var self = this;
    this.ctor = function(options){
        var elem = $(options.classname),
            ul = elem.children('ul'),
            li = ul.children('li'),
            bar = elem.find(options.classname.slice(0,-1) + '-bar]'),
            length = li.length,
            one = length > 0 ? li.eq(0).height() : 0;
        
        self.initHeight = options.height;
        self.classname = options.classname;
        self.elem = elem[0];
        self.ul = ul;
        self.li = li;
        self.bar = bar;
        self.one = options.one ? self.getRem(options.one) : one;
        self.fixedHeight = options.fixedHeight == undefined ? true : !!options.fixedHeight;
        self.number = options.number;
        self.space = options.space;
    };
    this.init = function(mode) {  // options
        var elem = $(self.classname),
            ul = elem.children('ul'),
            li = ul.children('li'),
            bar = elem.find(self.classname.slice(0,-1) + '-bar]'),
            length = li.length + mode;

        self.length = length;
        self.elemHeight = elem.height() + self.one * mode;
        self.height = self.one * self.length + parseFloat(ul.css('padding-top')) + parseFloat(ul.css('padding-bottom')) - self.getRem(self.initHeight);
        self.barHeight = self.getRem(self.initHeight) * self.number / self.length;
        self.scale = (self.getRem(self.initHeight) - self.barHeight - self.getRem(self.space) * 2) / ((self.length - self.number) * self.one);
        
        bar.css({
            height: self.barHeight + 'px'
        });
        // self.scroll = options.scroll;
        var barParent = self.bar.parent(self.classname.slice(0,-1) + '-bar-bg]');
        if (self.length > self.number) { // 只有列表的值太多，才会出现滚动条
            if (barParent.length > 0) {
                barParent.removeClass('search_hide');
            } else {
                self.bar.removeClass('search_hide');
            }
            self.initEvent();
            if (!self.fixedHeight) {
                elem.css({
                    'height': self.getRem(self.initHeight) + 'px'
                });
            }
        } else {
            if (barParent.length > 0) {
                barParent.addClass('search_hide');
            } else {
                self.bar.addClass('search_hide');
            }
            if (!self.fixedHeight) {
                elem.css({
                    'height': ul.height() + self.one * mode + 'px'//parseFloat(ul.css('padding-top')) + parseFloat(ul.css('padding-bottom')) + 'px'
                });
            }
            elem[0].removeEventListener('mousedown', self.scroll.startScroll, false);
            elem[0].removeEventListener('mousemove', self.scroll.moveScroll, false);
            elem[0].removeEventListener('mouseup', self.scroll.endScroll, false);
            elem[0].addEventListener('mousewheel',self.scroll.mouseScroll,false);
        }
    };

    this.initEvent = function() {
        var elem = $(self.classname)[0];
        elem.removeEventListener('mousedown', self.startScroll, false);
        elem.removeEventListener('mousemove', self.moveScroll, false);
        elem.removeEventListener('mouseup', self.endScroll, false);
        elem.removeEventListener('mousewheel',self.mouseScroll,false);

        elem.addEventListener('mousedown', self.startScroll, false);
        elem.addEventListener('mousemove', self.moveScroll, false);
        elem.addEventListener('mouseup', self.endScroll, false);
        elem.addEventListener('mousewheel',self.mouseScroll,false);
    };

    this.startScroll = function(e) {
        // e.stopPropagation();
        // e.preventDefault();
        self.scroll.isMoving = false;
        self.scroll.clickTime = new Date().getTime();
        if (self.scroll.length > self.scroll.number) {
            var touch = e;//e.targetTouches[0];
            self.scroll.start = touch.clientY;
            self.scroll.top = parseFloat(self.scroll.ul.css('top'));
            self.scroll.startMoving = true;
        }
    };

    this.moveScroll = function(e) {
        // e.stopPropagation();
        // e.preventDefault();
        if(!self.scroll.startMoving){
            return;
        }
        if (self.scroll.length > self.scroll.number) {
            self.scroll.isMoving = true;
            var touch = e;//e.targetTouches[0],
                self.scroll.direction = touch.clientY - self.scroll.start;

            self.scroll.direction = self.scroll.direction > 0 ? 1 : -1;
            self.scroll.end = touch.clientY - self.scroll.start + self.scroll.top
            if (self.scroll.direction == 1 && self.scroll.end >= 0) { // 向上
                self.scroll.end = 0;
            } else if (self.scroll.direction == -1 && self.scroll.end <= -self.scroll.height) { // 向下
                self.scroll.end = -self.scroll.height;
            }
            // console.log(-self.scale*self.end);
            self.scroll.bar.css({
                top: -self.scroll.scale * self.scroll.end + 'px'
            });
            self.scroll.ul.css({
                top: self.scroll.end + 'px'
            });
        }
    };

    this.endScroll = function(e){
        self.scroll.startMoving = false;
    };

    this.mouseScroll = function(e){
        if (self.scroll.length <= self.scroll.number) {
            return;
        }
        var value = e.wheelDelta ? e.wheelDelta : e.detail;
        value = value > 0 ? 20 : -20;

        self.scroll.top = parseFloat(self.scroll.ul.css('top'));
        self.scroll.end = value + self.scroll.top
        if (value > 0 && self.scroll.end >= 0) { // 向上
            self.scroll.end = 0;
        } else if (value < 0 && self.scroll.end <= -self.scroll.height) { // 向下
            self.scroll.end = -self.scroll.height;
        }
        self.scroll.bar.css({
            top: -self.scroll.scale * self.scroll.end + 'px'
        });
        self.scroll.ul.css({
            top: self.scroll.end + 'px'
        });
    };

    this.setRank = function(rank) {
        rank -= 1;
        self.li.removeClass('rank-active');
        if (rank <= (self.length - 1) && rank >= 0) {
            var rankTop = (rank - 1) * self.one,
                position = rank;
            if (rank <= self.number / 2) { // 当前排行在一半以下
                // 什么也不用做
                position = 0;
            } else if (rank >= (self.length - self.number / 2)) { // 当前排行在最后一屏的一半以上
                // 定位在最后一屏
                position = self.length - self.number;

            } else {
                position = rank - Math.floor(self.number / 2);
            }
            self.li.eq(rank).addClass('rank-active');
        } else {
            position = 0;
            // rank = 0;
        }
        self.ul.css({
            top: -(position * self.one) + 'px'
        });
        self.bar.css({
            top: self.scale * (position * self.one) + 'px'
        });
    };

    this.getRem = function(value) {
        // var scale = 1206 / 750,
        //     currentScale = GC.h / GC.w,
        //     fontSize = GC.w / (10 / currentScale * scale);
        // return value / 750 * 10 * fontSize;
        return value;
    }

    self.ctor(options);
};

module.exports = ScrollBar;