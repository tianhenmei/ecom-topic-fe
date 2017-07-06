/***未完成 */
import {
    getPointValue
} from './Node.js'

class YHScroll{
    constructor(options){
        this.id = options.id
        this.elem = document.getElementById(this.id)
        this.ul = this.elem.getElementById(this.id+'-content')
        this.li = this.ul.children
        this.bar = this.elem.getElementById(this.id+'-bar')
        this.initHeight = options.height
        // clientHeight height+paddingTop+paddingBottom
        this.one = options.one ? this.getRem(options.one) : 
                   (this.li.length > 0 ? 
                        (this.li[0].clientHeight + getPointValue(this.li[0],'border-top-width') + getPointValue(this.li[0],'border-bottom-width')) : 
                        0
                   )
        this.fixedHeight = options.fixedHeight == undefined ? true : !!options.fixedHeight
        this.number = options.number
        this.space = options.space

        this.elemHeight = 0
        this.barHeight = 0
        this.length = 0
        this.height = 0
        this.top = 0
        this.start = 0
        this.end = 0
        this.scale = 0
        this.scroll = null
        this.direction = 0
        this.clickTime = 0
        this.startMoving = false
    }
    init(mode) {  // options
        var elem = $(this.id),
            ul = elem.children('ul'),
            li = ul.children('li'),
            bar = elem.find(this.id.slice(0,-1) + '-bar]'),
            length = li.length + mode;

        this.length = length;
        this.elemHeight = elem.height() + this.one * mode;
        this.height = this.one * this.length + parseFloat(ul.css('padding-top')) + parseFloat(ul.css('padding-bottom')) - this.getRem(this.initHeight);
        this.barHeight = this.getRem(this.initHeight) * this.number / this.length;
        this.scale = (this.getRem(this.initHeight) - this.barHeight - this.getRem(this.space) * 2) / ((this.length - this.number) * this.one);
        
        bar.css({
            height: this.barHeight + 'px'
        });
        // this.scroll = options.scroll;
        var barParent = this.bar.parent(this.id.slice(0,-1) + '-bar-bg]');
        if (this.length > this.number) { // 只有列表的值太多，才会出现滚动条
            if (barParent.length > 0) {
                barParent.removeClass('search_hide');
            } else {
                this.bar.removeClass('search_hide');
            }
            this.initEvent();
            if (!this.fixedHeight) {
                elem.css({
                    'height': this.getRem(this.initHeight) + 'px'
                });
            }
        } else {
            if (barParent.length > 0) {
                barParent.addClass('search_hide');
            } else {
                this.bar.addClass('search_hide');
            }
            if (!this.fixedHeight) {
                elem.css({
                    'height': ul.height() + this.one * mode + 'px'//parseFloat(ul.css('padding-top')) + parseFloat(ul.css('padding-bottom')) + 'px'
                });
            }
            elem[0].removeEventListener('mousedown', this.scroll.startScroll, false);
            elem[0].removeEventListener('mousemove', this.scroll.moveScroll, false);
            elem[0].removeEventListener('mouseup', this.scroll.endScroll, false);
            elem[0].addEventListener('mousewheel',this.scroll.mouseScroll,false);
        }
    }
    initEvent() {
        var elem = $(this.id)[0];
        elem.removeEventListener('mousedown', this.startScroll, false);
        elem.removeEventListener('mousemove', this.moveScroll, false);
        elem.removeEventListener('mouseup', this.endScroll, false);
        elem.removeEventListener('mousewheel',this.mouseScroll,false);

        elem.addEventListener('mousedown', this.startScroll, false);
        elem.addEventListener('mousemove', this.moveScroll, false);
        elem.addEventListener('mouseup', this.endScroll, false);
        elem.addEventListener('mousewheel',this.mouseScroll,false);
    }
    startScroll(e) {
        // e.stopPropagation();
        // e.preventDefault();
        this.scroll.isMoving = false;
        this.scroll.clickTime = new Date().getTime();
        if (this.scroll.length > this.scroll.number) {
            var touch = e;//e.targetTouches[0];
            this.scroll.start = touch.clientY;
            this.scroll.top = parseFloat(this.scroll.ul.css('top'));
            this.scroll.startMoving = true;
        }
    }
    moveScroll(e) {
        // e.stopPropagation();
        // e.preventDefault();
        if(!this.scroll.startMoving){
            return;
        }
        if (this.scroll.length > this.scroll.number) {
            this.scroll.isMoving = true;
            var touch = e;//e.targetTouches[0],
                this.scroll.direction = touch.clientY - this.scroll.start;

            this.scroll.direction = this.scroll.direction > 0 ? 1 : -1;
            this.scroll.end = touch.clientY - this.scroll.start + this.scroll.top
            if (this.scroll.direction == 1 && this.scroll.end >= 0) { // 向上
                this.scroll.end = 0;
            } else if (this.scroll.direction == -1 && this.scroll.end <= -this.scroll.height) { // 向下
                this.scroll.end = -this.scroll.height;
            }
            // console.log(-this.scale*this.end);
            this.scroll.bar.css({
                top: -this.scroll.scale * this.scroll.end + 'px'
            });
            this.scroll.ul.css({
                top: this.scroll.end + 'px'
            });
        }
    }
    endScroll(e){
        this.scroll.startMoving = false;
    }
    mouseScroll(e){
        if (this.scroll.length <= this.scroll.number) {
            return;
        }
        var value = e.wheelDelta ? e.wheelDelta : e.detail;
        value = value > 0 ? 20 : -20;

        this.scroll.top = parseFloat(this.scroll.ul.css('top'));
        this.scroll.end = value + this.scroll.top
        if (value > 0 && this.scroll.end >= 0) { // 向上
            this.scroll.end = 0;
        } else if (value < 0 && this.scroll.end <= -this.scroll.height) { // 向下
            this.scroll.end = -this.scroll.height;
        }
        this.scroll.bar.css({
            top: -this.scroll.scale * this.scroll.end + 'px'
        });
        this.scroll.ul.css({
            top: this.scroll.end + 'px'
        });
    }
    setRank(rank) {
        rank -= 1;
        this.li.removeClass('rank-active');
        if (rank <= (this.length - 1) && rank >= 0) {
            var rankTop = (rank - 1) * this.one,
                position = rank;
            if (rank <= this.number / 2) { // 当前排行在一半以下
                // 什么也不用做
                position = 0;
            } else if (rank >= (this.length - this.number / 2)) { // 当前排行在最后一屏的一半以上
                // 定位在最后一屏
                position = this.length - this.number;

            } else {
                position = rank - Math.floor(this.number / 2);
            }
            this.li.eq(rank).addClass('rank-active');
        } else {
            position = 0;
            // rank = 0;
        }
        this.ul.css({
            top: -(position * this.one) + 'px'
        });
        this.bar.css({
            top: this.scale * (position * this.one) + 'px'
        });
    }
    getRem(value) {
        // var scale = 1206 / 750,
        //     currentScale = GC.h / GC.w,
        //     fontSize = GC.w / (10 / currentScale * scale);
        // return value / 750 * 10 * fontSize;
        return value;
    }
};

module.exports = YHScroll;