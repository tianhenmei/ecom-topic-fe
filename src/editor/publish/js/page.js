class PageMove{
    constructor(options) {
        this.data = {
            direction: {
                x: "down",
                y: "down"
            },
            start: {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 0
            },
            now: 0,
            last: 0,
            page: {
                up: {
                    last: (options.animation ? options.animation : "move")+"ULast",
                    now: (options.animation ? options.animation : "move")+"UNow"
                },
                down: {
                    last: (options.animation ? options.animation : "move")+"DLast",
                    now: (options.animation ? options.animation : "move")+"DNow"
                }
            },
            pageLength: $(".page").length,
            isMoving: false,
            clickStatus: false
        }
        this._initPageMoveEvent()
    }

    pageMove(od, self) {
        $(".page").removeClass(self.data.page[self.data.direction.y].now + " " + self.data.page[self.data.direction.y].last + " " + self.data.page[od].now + " " + self.data.page[od].last + " pageCurrent").addClass("hide");
        $(".page" + self.data.now).removeClass("hide").addClass(self.data.page[self.data.direction.y].now + " pageCurrent");
        $(".page" + self.data.last).removeClass("hide").addClass(self.data.page[self.data.direction.y].last);
        setTimeout(function () {
            $(".page").removeClass(self.data.page[self.data.direction.y].now + " " + self.data.page[self.data.direction.y].last + " " + self.data.page[od].now + " " + self.data.page[od].last);
            $(".page" + self.data.last).addClass("hide")
            self.data.isMoving = false
            self._doneOther(self)
        }, 500);
    }
    _pageMoveCompute(self) {
        var od = "down";
        self.data.last = self.data.now;
        if (self.data.direction.y == "up") {
            self.data.now++;
        } else {
            self.data.now--;
            od = "up";
        }
        if (self.data.now == self.data.pageLength - 1) {
            if (self.data.signStatus) {
                if (self.data.last != self.data.pageLength) {
                    self.data.now = self.data.pageLength;
                } else {
                    if (self.data.direction.y != "up") {
                        self.data.now--;
                    }
                }
            }
        }
        if (!self.data.signStatus && self.data.now >= self.data.pageLength || self.data.signStatus && self.data.now > self.data.pageLength) {
            self.data.now = self.data.signStatus ? self.data.pageLength : self.data.pageLength - 1;
            self.data.last = self.data.now - 1;
            self.data.isMoving = false;
            return;
            self.data.now = 0;
        }
        if (self.data.now <= -1) {
            self.data.last = 1;
            self.data.now = 0;
            self.data.isMoving = false;
            return;
            if (self.data.signStatus) {
                self.data.now = self.data.pageLength;
            } else {
                self.data.now = self.data.pageLength - 1;
            }
        }
        self.pageMove(od, self);
    }
    _initPageMoveEvent() {
        var self = this;
        document.addEventListener("touchstart", function (ev) {
            var touch = ev.targetTouches[0];
            self.data.start.x = touch.clientX;
            self.data.start.y = touch.clientY;
        }, false);
        document.addEventListener("touchmove", function (ev) {
            ev.preventDefault();
            var touch = ev.targetTouches[0];
            self.data.end.x = touch.clientX;
            self.data.end.y = touch.clientY;
        }, false);
        document.addEventListener("touchend", function (ev) {
            var initdisc = 20,
                disc = self.data.end.y == 0 ? false : Math.abs(self.data.end.y - self.data.start.y) > initdisc;
            self.data.direction.x = self.data.end.x - self.data.start.x > initdisc ? "down" : self.data.end.x - self.data.start.x < initdisc ? "up" : "down";
            self.data.direction.y = self.data.end.y - self.data.start.y > initdisc ? "down" : self.data.end.y - self.data.start.y < initdisc ? "up" : "down";
            if (!self.data.clickStatus && !self.data.isMoving && disc) {
                self.data.isMoving = true;
                self._pageMoveCompute(self);
            }
            self.data.start.x = 0;
            self.data.start.y = 0;
            self.data.end.x = 0;
            self.data.end.y = 0;
            self.data.clickStatus = false;
        }, false);
    }
    _doneOther(self){
        // self.data.now
        // self.data.last
        let arr = ['last','now'],
            i = 0
        
        for(i = 0; i < arr.length; i++){
            if(pageDone[self.data[arr[i]]]){
                for(let id in pageDone[self.data[arr[i]]]){
                    let current = $('#'+id+' img[yh-states]'),
                        audio = current.siblings('audio')[0],
                        data = pageDone[self.data[arr[i]]][id]
                    switch(data.type){
                        case 'audio':
                            switch(arr[i]){
                                case 'last':
                                    current.removeClass(data.classname)
                                    if(data['yh-src']){
                                        current.attr('src',current.attr('yh-old-src'))
                                    }
                                    audio.pause()
                                    break
                                case 'now':
                                    current.addClass(data.classname)
                                    if(data['yh-src']){
                                        current.attr('src',data['yh-src'])
                                    }
                                    audio.play()
                                    break
                            }
                            break
                    }
                }
            }
        }
    }
}

// $('[contenteditable]').removeAttr('contenteditable')