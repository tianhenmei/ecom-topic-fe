!function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function i(){2==++p&&c()}function a(e,t){var n=document,i=n.createElement("link");i.setAttribute("rel","stylesheet"),i.setAttribute("type","text/css"),i.setAttribute("href",e);var a=n.getElementsByTagName("head");a.length?a[0].appendChild(i):n.documentElement.appendChild(i),i.onload=function(){t()}}function r(e,t){var n=document.createElement("script");n.setAttribute("type","text/javascript"),n.setAttribute("src",e);var i=document.getElementsByTagName("head");i.length?i[0].appendChild(n):document.documentElement.appendChild(n),n.onload=function(){t()}}function o(){var e=window.navigator.userAgent,t=e.indexOf("Opera")>-1,n=0;return t?n=0:e.indexOf("Firefox")>-1?n=1:e.indexOf("Chrome")>-1?n=2:e.indexOf("Safari")>-1?n=3:e.indexOf("compatible")>-1&&e.indexOf("MSIE")>-1&&!t?n="9."==e.match(/9./i)||"10."==e.match(/10./i)?4:6:e.toLowerCase().indexOf("trident")>-1&&e.indexOf("rv")>-1&&(n=5),n}function c(){var e=0,t=!1,n="move",i="",a=null,r=null,o=null,c=3;for(e=0;e<l.length;e++)i=l.eq(e).attr("id"),t=l.eq(e).attr("autoplay"),t=!!t,n=l.eq(e).attr("animation"),n=n||"move",a=l.eq(e).find("#"+i+"-content"),r=a.children(),c=r.length,o=r.eq(0),a.css("left",0),u[i]={width:o.children().eq(0).width(),currentIndex:0,length:c,autoplay:t,animation:n},s(i)}function s(e){var t=$("#"+e+"-pagination").children(),n=t.length,i=3;d[e]=new Swiper("#"+e+"-container",{wrapperClass:"yh-slider-content",slideClass:"block-style1",autoplay:u[e].autoplay?3e3:0,loop:!0,paginationClickable:!0,bulletClass:"one",bulletActiveClass:"active",onInit:function(t){i=$("#"+e+"-pagination").children().length},onSlideChangeEnd:function(e){var a=e.activeIndex,r=a-1;-1==r?r=n-1:r==i&&(r=0),t.removeClass("active").eq(r).addClass("active")}})}var l=$('[yh-module="Slider_style1"]'),u={},d={},p=0;!function(){switch(o()){case 0:case 1:case 2:case 3:a("https://www.lgstatic.com/topic/css/swiper.min.css",i),r("https://www.lgstatic.com/topic/js/swiper.min.js",i);break;case 6:animationStatus=!0;break;case 4:case 5:default:a("https://www.lgstatic.com/topic/css/idangerous.swiper.css",i),r("https://www.lgstatic.com/topic/js/idangerous.swiper.min.js",i)}}()}]);