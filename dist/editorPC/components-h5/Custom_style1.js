/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Node = __webpack_require__(5);

exports.default = {
    props: ["props", "path", "parentmodule"],
    data: function data() {
        return {};
    },
    mounted: function mounted() {},

    computed: {
        setCustomBackgroundStyle: function setCustomBackgroundStyle() {
            var style = '';
            switch (this.props.h5css.yhcustom_background.value.background_type.value) {
                case 'background-color':
                    style += 'background:' + this.props.h5css.yhcustom_background.value.background_color.value + '; ';
                    break;
                case 'background-image':
                    style += 'background:' + this.propsh5.css.yhcustom_background.value.background_color.value + ' ' + (this.props.h5css.yhcustom_background.value.background_image.value == 'none' || this.props.h5css.yhcustom_background.value.background_image.value == 'undefined' ? 'none' : 'url(' + this.props.h5css.yhcustom_background.value.background_image.value + ')') + ' ' + this.props.h5css.yhcustom_background.value.background_repeat.value + '; ';
                    break;
                case 'gradient-top-bottom':
                    style += '' + 'background:' + this.props.h5css.yhcustom_background.value.gradient_color_top.value + ';' + 'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=' + this.props.h5css.yhcustom_background.value.gradient_color_top.value + ',endcolorstr=' + this.props.h5css.yhcustom_background.value.gradient_color_bottom.value + ',gradientType=0);' + '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=' + this.props.h5css.yhcustom_background.value.gradient_color_top.value + ',endcolorstr=' + this.props.h5css.yhcustom_background.value.gradient_color_bottom.value + ',gradientType=0);' + 'background:-moz-linear-gradient(top, ' + this.props.h5css.yhcustom_background.value.gradient_color_top.value + '), ' + this.props.h5css.yhcustom_background.value.gradient_color_bottom.value + '); ' + 'background:-o-linear-gradient(top, ' + this.props.h5css.yhcustom_background.value.gradient_color_top.value + '), ' + this.props.h5css.yhcustom_background.value.gradient_color_bottom.value + '); ' + 'background:-webkit-gradient(linear,0 0,0 100%,color-stop(0%,' + this.props.h5css.yhcustom_background.value.gradient_color_top.value + '),color-stop(100%,' + this.props.h5css.yhcustom_background.value.gradient_color_bottom.value + '));' + '';
                    break;
                case 'gradient-left-right':
                    style += '' + 'background:' + this.props.h5css.yhcustom_background.value.gradient_color_left.value + ';' + 'filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=' + this.props.h5css.yhcustom_background.value.gradient_color_left.value + ',endcolorstr=' + this.props.h5css.yhcustom_background.value.gradient_color_right.value + ',gradientType=0);' + '-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=150,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=' + this.props.h5css.yhcustom_background.value.gradient_color_left.value + ',endcolorstr=' + this.props.h5css.yhcustom_background.value.gradient_color_right.value + ',gradientType=0);' + 'background:-moz-linear-gradient(left, ' + this.props.h5css.yhcustom_background.value.gradient_color_left.value + '), ' + this.props.h5css.yhcustom_background.value.gradient_color_right.value + '); ' + 'background:-o-linear-gradient(left, ' + this.props.h5css.yhcustom_background.value.gradient_color_left.value + '), ' + this.props.h5css.yhcustom_background.value.gradient_color_right.value + '); ' + 'background:-webkit-gradient(linear,0 0,100% 0,color-stop(0%,' + this.props.h5css.yhcustom_background.value.gradient_color_left.value + '),color-stop(100%,' + this.props.h5css.yhcustom_background.value.gradient_color_right.value + '));' + '';
                    break;
            }
            return style;
        }
    },
    methods: {
        dealStringLine: _Node.dealStringLine
    }
}; //
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: _vm.props.id,
    staticClass: "custom-style1 yh-custom-base-element00",
    style: (_vm.setCustomBackgroundStyle),
    attrs: {
      "id": _vm.props.id,
      "yh-module": "Custom_style1"
    }
  }, [_c('div', {
    staticClass: "yh-custom-base-element0",
    attrs: {
      "id": "custom_h0",
      "path": "elements_h.0",
      "draggable": "false",
      "yh-custom-image": "yh-custom-image"
    }
  }, [_c('div', {
    staticClass: "yh-custom-image-content"
  }, [_c('img', {
    staticClass: "yh-custom-image yh-custom-base-element1 yh-custom-image-img logo",
    attrs: {
      "src": _vm.props.data.logo.value
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "yh-custom-base-element2 yh-custom-image-href yh-custom-href logo-href",
    attrs: {
      "lagou-href": 'https://www.lagou.com/gongsi/' + _vm.props.data.companyId.value + '.html',
      "target": "_blank",
      "href": 'https://www.lagou.com/gongsi/' + _vm.props.data.companyId.value + '.html'
    }
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7a89ab01", module.exports)
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(9)("b58e6176", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a89ab01\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a89ab01\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Node = {
    distance: 0,
    positionTag: {
        '技术': 'technique',
        '产品': 'product',
        '设计': 'design',
        '运营': 'operation',
        '市场与销售': 'market-sale',
        '职能': 'function',
        '金融': 'finance'
    }
};
Node.setAll = function (e) {
    console.log(e.target.path);
    console.log(undefined.$refs);
};
/********************************************
 * getQueryString: 获取url参数的值
 * parm: 对象
 *******************************************/
Node.getQueryString = function (parm) {
    var reg = new RegExp("(^|&)" + parm + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]);
    return null;
};
/********************************************
 * isEmptyObject: 判断一个对象是否为空对象
 * e: 对象
 *******************************************/
Node.isEmptyObject = function (e) {
    var t = '';
    for (t in e) {
        return !1;
    }
    return !0;
};
/********************************************
 * isObject: 判断一个对象是否为对象
 * e: 对象
 * Object.prototype.toString.call(e)
 *******************************************/
Node.isObject = function (e) {
    return e instanceof Object;
};
/********************************************
 * isArray: 判断一个对象是否为数组
 * e: 对象
 *******************************************/
Node.isArray = function (e) {
    return e instanceof Array;
};

/********************************************
 * deepCopy: 深拷贝对象
 * n: 需要拷贝的对象
 * e：被拷贝的对象
 *******************************************/
Node.deepCopy = function (n, c) {
    for (var i in c) {
        if (_typeof(c[i]) === 'object') {
            n[i] = c[i].constructor === Array ? [] : {};
            Node.deepCopy(c[i], n[i]);
        } else {
            n[i] = c[i];
        }
    }
    return c;
};
/********************************************
 * getNow: 获取当前时间
 * now: 默认当前时间，类型Date
 * format: 想要被返回的时间格式，默认：yyyy/MM/dd hh:mm:ss
 *******************************************/
Node.getNow = function () {
    var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy/MM/dd hh:mm:ss';

    var o = {
        yyyy: now.getFullYear() + '',
        MM: now.getMonth() + 1 + '',
        dd: now.getDate() + '',
        hh: now.getHours() + '',
        mm: now.getMinutes() + '',
        ss: now.getSeconds() + ''
    },
        i = '',
        def = '0000';
    for (i in o) {
        format = format.replace(i, def.substr(0, i.length - o[i].length) + o[i]);
    }
    return format;
};

Node.updateData = function (data, baseData) {
    var i = '',
        j = '',
        status = false,
        newdata = {};
    for (i in baseData) {
        switch (i) {
            case 'sync':
            case 'data':
            case 'css':
            case 'h5css':
            case 'common':
            case 'attribute':
                newdata[i] = {};
                if (data[i]) {
                    for (j in baseData[i]) {
                        // status = Node.isArray(baseData[i][j].value) || Node.isObject(baseData[i][j].value)
                        if (data[i][j]) {
                            newdata[i][j] = JSON.parse(JSON.stringify(baseData[i][j]));
                            newdata[i][j].value = data[i][j].value;
                            if (data[i][j].hasOwnProperty('status')) {
                                newdata[i][j].status = data[i][j].status;
                            }
                        } else {
                            newdata[i][j] = JSON.parse(JSON.stringify(baseData[i][j]));
                        }
                    }
                } else {
                    newdata[i] = JSON.parse(JSON.stringify(baseData[i]));
                }
                break;
            default:
                newdata[i] = data[i];
                break;
        }
    }
    return newdata;
};
/********************************************
 * initSelected: 初始化选中，获取被选中元素的ID，取消其他组件选中状态，展示当前组件的设置yh-edit-layer
 * e: 事件对象
 * return id
 *******************************************/
Node.initSelected = function (e) {
    var i = 0,
        id = '',
        setting = document.getElementsByClassName('setting'),
        selected = document.getElementsByClassName('yh-module-selected'),
        // 被选中的父级
    yhEditLayer = document.getElementsByClassName('yh-edit-layer'),
        parents = null,
        childs = null,
        elem = null;
    for (i = 0; i < e.path.length; i++) {
        if (e.path[i].getAttribute('yh-module')) {
            id = e.path[i].id;
            break;
        }
    }
    for (i = 0; i < setting.length; i++) {
        setting[i].className = setting[i].className.replace(/(setting)/g, '').replace(/  /g, ' ');
    }
    for (i = 0; i < selected.length; i++) {
        selected[i].className = selected[i].className.replace(/(yh-module-selected)/g, '').replace(/  /g, ' ');
    }
    for (i = 0; i < yhEditLayer.length; i++) {
        if (!/(hide)/g.test(yhEditLayer[i].className)) {
            yhEditLayer[i].className = (yhEditLayer[i].className + ' hide').replace(/  /g, ' ');
        }
    }

    elem = document.getElementById(id);
    parents = Node.getParentsByAttr(elem, 'yh-module');
    childs = Node.getChildrenByAttr(elem, 'yh-module');
    for (i = 1; i < parents.length; i++) {
        if (!/(yh-module-selected)/g.test(parents[i].className)) {
            parents[i].className = (parents[i].className + ' yh-module-selected').replace(/  /g, ' ');
        }
    }
    if (elem.attributes['yh-vessel']) {
        elem.className += ' yh-module-selected';
    }
    for (i = 0; i < childs.length - 1; i++) {
        if (!/(yh-module-selected)/g.test(childs[i].className)) {
            childs[i].className = (childs[i].className + ' yh-module-selected').replace(/  /g, ' ');
        }
    }
    // .yh-module-selected
    return id;
};
/********************************************
 * undoSelected: 取消组件选中状态
 *******************************************/
Node.undoSelected = function () {
    var i = 0,
        id = '',
        setting = document.getElementsByClassName('setting'),
        yhEditLayer = document.getElementsByClassName('yh-edit-layer'),
        selection = document.getElementsByClassName('yh-selection'),
        add = document.getElementsByClassName('yh-vessel-add'),
        selected = document.getElementsByClassName('yh-module-selected'); //,
    // arr = [].concat(yhEditLayer,selection,add)
    for (i = 0; i < setting.length; i++) {
        setting[i].className = setting[i].className.replace(/(setting)/g, '').replace(/  /g, ' ');
    }
    for (i = 0; i < yhEditLayer.length; i++) {
        if (!/(hide)/g.test(yhEditLayer[i].className)) {
            yhEditLayer[i].className = (yhEditLayer[i].className + ' hide').replace(/  /g, ' ');
        }
    }
    for (i = 0; i < selection.length; i++) {
        if (!/(hide)/g.test(selection[i].className)) {
            selection[i].className = (selection[i].className + ' hide').replace(/  /g, ' ');
        }
    }
    for (i = 0; i < selected.length;) {
        selected[i].className = selected[i].className.replace(/(yh-module-selected)/g, '').replace(/[ ]{2,n}/g, ' ');
    }
    for (i = 0; i < add.length; i++) {
        if (!/(hide)/g.test(add[i].className)) {
            add[i].className = (add[i].className + ' hide').replace(/(  )/g, ' ');
        }
    }
};
Node.checkClassName = function (current, classname) {
    var arr = current.split(/( )/g),
        i = 0,
        one = '';
    for (i = 0; i < arr.length; i++) {
        one = arr[i].trim();
        if (one && one == classname) {
            return true;
        }
    }
    return false;
};
/********************************************
 * getParentByClassName: 通过类名获取父级
 * elem: 初始元素
 * classname: 类名
 *******************************************/
Node.getParentByClassName = function (elem, classname) {
    while (elem && !Node.checkClassName(elem.className, classname)) {
        elem = elem.parentNode;
    }
    return elem;
};
/********************************************
 * getParentByAttr 通过属性名获取父级
 * elem: 初始元素
 * attr: 类名
 *******************************************/
Node.getParentByAttr = function (elem, attr) {
    while (elem && !elem.getAttribute(attr)) {
        elem = elem.parentNode;
    }
    return elem;
};
/********************************************
 * getParentsByAttr 通过属性名获取所有有此属性的父级
 * elem: 初始元素
 * attr: 类名
 *******************************************/
Node.getParentsByAttr = function (elem, attr) {
    var parent = [];
    while (elem && !elem.attributes['yh-editor-content']) {
        if (elem.getAttribute('yh-module')) {
            parent.push(elem);
        }
        elem = elem.parentNode;
    }
    return parent;
};
/********************************************
 * getChildrenByAttr: 通过属性名获取所有子节点
 * elem: 初始元素
 * attr: 类名
 *******************************************/
Node.getChildrenByAttr = function (elem, attr) {
    var children = elem.children,
        a = [],
        i = 0;
    for (i = 0; i < children.length; i++) {
        if (children[i] !== elem && children[i].getAttribute(attr)) {
            a.push(children[i]);
        }
    }
    return a;
};
/********************************************
 * getChildrenByClassName: 通过类名获取所有子节点
 * elem: 初始元素
 * classname: 类名
 *******************************************/
Node.getChildrenByClassName = function (elem, classname) {
    var children = elem.children,
        a = [],
        i = 0;
    for (i = 0; i < children.length; i++) {
        if (children[i] !== elem && Node.checkClassName(children[i].className, classname)) {
            a.push(children[i]);
        }
    }
    return a;
};
/********************************************
 * getSiblingsByClassName: 通过类名获取所有兄弟节点
 * elem: 初始元素
 * classname: 类名
 *******************************************/
Node.getSiblingsByClassName = function (elem, classname) {
    var children = elem.parentNode.children,
        a = [],
        i = 0;
    for (i = 0; i < children.length; i++) {
        if (children[i] !== elem && Node.checkClassName(children[i].className, classname)) {
            a.push(children[i]);
        }
    }
    return a;
};
/********************************************
 * getChildById: 通过ID获取所有子节点
 * elem: 初始元素
 * id: id
 *******************************************/
Node.getChildById = function (elem, id) {
    var children = elem.children,
        i = 0;
    for (i = 0; i < children.length; i++) {
        if (children[i] !== elem && children[i].id == id) {
            return children[i];
        }
    }
};
Node.getComputedValue = function (elem, attribute) {
    var value = window.getComputedStyle(elem, null).getPropertyValue(attribute);
    return value;
};
Node.getPointValue = function (elem, attribute) {
    if (!elem || elem.length == 0) {
        return 0;
    }
    var value = window.getComputedStyle(elem, null).getPropertyValue(attribute);
    return parseFloat(parseFloat(value).toFixed(2));
};
Node.getPointWidth = function (elem) {
    var value = Node.getPointValue(elem, "width"); //window.getComputedStyle(elem[0],null).getPropertyValue("width");
    return value;
};
Node.getPointHeight = function (elem) {
    var value = Node.getPointValue(elem, "height"); // window.getComputedStyle(elem[0],null).getPropertyValue("height");
    return value;
};
Node.getPointOuterWidth = function (elem) {
    var width = Node.getPointValue(elem, "width"),
        //window.getComputedStyle(elem[0],null).getPropertyValue("width");
    left = Node.getPointValue(elem, "padding-left"),
        right = Node.getPointValue(elem, "padding-right"),
        value = width + left + right;
    return value;
};
Node.getPointOuterHeight = function (elem) {
    var width = Node.getPointValue(elem, "height"),
        top = Node.getPointValue(elem, "padding-top"),
        bottom = Node.getPointValue(elem, "padding-bottom"),
        value = width + top + bottom;
    return value;
};
/********************************************
 * settingBox: 选中元素时，选中框的位置设定
 * elem: 当前被选中的元素
 * ischild: 判断当前被选中的元素是否是子集
 *          如果是(ischild='ischild')，则选中框的偏移量(offsetLeft/offsetTop)都需要根据父级的偏移量来确定
 * parentHeight: 父级元素的高度（暂时未用）
 *******************************************/
Node.settingBox = function (elem, ischild) {
    var parentHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    // 选中框
    var checkedboxStyle = {},
        parent = null,
        left = 0,
        top = 0,
        i = 0;
    switch (ischild) {
        case 'ischild':
            parent = elem.offsetParent;
            while (parent && !parent.attributes['yh-editor-content']) {
                left += parent.offsetLeft;
                top += parent.offsetTop;
                parent = parent.offsetParent;
            }
            break;
    }
    checkedboxStyle.left = elem.offsetLeft + left - 2 + Node.distance;
    checkedboxStyle.top = elem.offsetTop + top - 2 + Node.distance + parentHeight;
    checkedboxStyle.width = Node.getPointWidth(elem) + Node.getPointValue(elem, 'border-left-width') + Node.getPointValue(elem, 'border-right-width');
    checkedboxStyle.height = Node.getPointHeight(elem) + Node.getPointValue(elem, 'border-top-width') + Node.getPointValue(elem, 'border-bottom-width');
    checkedboxStyle.display = "block";

    var scale = 1;
    checkedboxStyle.left -= 2 * scale;
    checkedboxStyle.top -= 2 * scale;
    checkedboxStyle.width += 4 * scale;
    checkedboxStyle.height += 4 * scale;

    var selectParent = '',
        selection = document.getElementsByClassName('yh-selection'),
        selectTop = document.getElementsByClassName('yh-selectTop')[0],
        selectBottom = document.getElementsByClassName('yh-selectBottom')[0],
        selectLeft = document.getElementsByClassName('yh-selectLeft')[0],
        selectRight = document.getElementsByClassName('yh-selectRight')[0];

    selectTop.style.width = checkedboxStyle.width + 'px';
    selectTop.style.left = checkedboxStyle.left + 'px';
    selectTop.style.top = checkedboxStyle.top + 'px';
    selectBottom.style.width = checkedboxStyle.width + 'px';
    selectBottom.style.left = checkedboxStyle.left + 'px';
    selectBottom.style.top = checkedboxStyle.top + checkedboxStyle.height + 'px';
    selectLeft.style.height = checkedboxStyle.height + 'px';
    selectLeft.style.left = checkedboxStyle.left + 'px';
    selectLeft.style.top = checkedboxStyle.top + 'px';
    selectRight.style.height = checkedboxStyle.height + 'px';
    selectRight.style.left = checkedboxStyle.left + checkedboxStyle.width + 'px';
    selectRight.style.top = checkedboxStyle.top + 'px';

    for (i = 0; i < selection.length; i++) {
        if (/(hide)/g.test(selection[i].className)) {
            selection[i].className = selection[i].className.replace(/(hide)/g, '').replace('  ', ' ');
        }
    }
};
/***********************************
 * changeData: 修改数据（需区分是css值还是attr值）
 * elem: 当前要修改数据所属的元素
 * name: 要修改数据属性的名称
 * data: 元素的所有数据
 * value: 当前修改后的值
 ********************************/
Node.changeData = function (elem, data, name, value) {
    var arr = [],
        classname = '',
        stylename = '',
        classify = 'attribute';
    if (data.css.hasOwnProperty(name)) {
        classify = 'css';
        arr = name.split('_');
        classname = arr[0];
        stylename = arr.slice(1).join('-');
        if (elem.hasClass(classname)) {
            elem.css(stylename, value);
        }
        if (stylename.indexOf('color') >= 0) {
            elem.find('.' + classname, ',.' + classname + '-background-color' + ',.' + classname + '-color' + ',.' + classname + '-border-color').css(stylename, value);
        } else {
            elem.find('.' + classname).css(stylename, value);
        }
    } else {
        if (elem[0].getAttribute(name)) {
            elem.attr(name, value);
        }
        elem.find('[' + name + ']').attr(name, value);
    }
    // 给data属性的css活attribute赋值
    data[classify][name] = value;
};
/***********************************
 * uploadFile: 上传文件
 ********************************/
Node.uploadFile = function () {};
/****
 * dealRGBColor(): 处理RGB颜色（将RGB转换为16进制）
 * */
Node.dealRGBColor = function (color) {
    color = color + '';
    if (color.toLowerCase().indexOf('rgb') > -1) {
        var colorArray = color.toLowerCase().split('(')[1].split(',');
        var lastColor = '#';
        if (colorArray.length == 4) {
            return 'transparent';
        }
        for (var i = 0; i < colorArray.length; i++) {
            var cu = parseInt(colorArray[i]).toString(16);
            if (cu.length == 1) {
                cu = '0' + cu;
            } else if (cu.length == 0) {
                cu = '00';
            }
            lastColor += cu;
        }
        return lastColor;
    } else {
        return color;
    }
};

Node.dealRGBOpacityColor = function (color) {
    color = color + '';
    if (color.toLowerCase().indexOf('rgb') > -1) {
        var colorStr = color.toLowerCase().split('(')[1];
        colorStr = substring(0, colorStr.length - 1);
        var colorArray = colorStr.split(',');
        var lastColor = '#';
        if (colorArray.length == 4) {
            return 'transparent';
        }
        for (var i = 0; i < colorArray.length; i++) {
            var cu = parseInt(colorArray[i]).toString(16);
            if (cu.length == 1) {
                cu = '0' + cu;
            } else if (cu.length == 0) {
                cu = '00';
            }
            lastColor += cu;
        }
        return lastColor;
    } else {
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
Node.dealStringLine = function (textSize, one, line, value, status) {
    var tagReg = /\<[(p)|(\/p)|(li)|(\/li)|(ul)|(\/ul)|(span)|(\/span)|(h1)|(\/h1)|(h2)|(\/h2)|(h3)|(\/h3)|(h4)|(\/h4)|(h5)|(\/h5)|(h6)|(\/h6)|(font)|(\/font)|(b)|(\/b)|(u)|(\/u)|(i)|(\/i)|(div)|(\/div)]*[^>]*>/g,
        valueArray = value.split(/\<[(p)|(\/p)|(li)|(\/li)|(ul)|(\/ul)|(span)|(\/span)|(h1)|(\/h1)|(h2)|(\/h2)|(h3)|(\/h3)|(h4)|(\/h4)|(h5)|(\/h5)|(h6)|(\/h6)|(font)|(\/font)|(b)|(\/b)|(u)|(\/u)|(i)|(\/i)|(div)|(\/div)]*[^>]*>/),
        styleArray = value.match(/\<[(p)|(\/p)|(li)|(\/li)|(ul)|(\/ul)|(span)|(\/span)|(h1)|(\/h1)|(h2)|(\/h2)|(h3)|(\/h3)|(h4)|(\/h4)|(h5)|(\/h5)|(h6)|(\/h6)|(font)|(\/font)|(b)|(\/b)|(u)|(\/u)|(i)|(\/i)|(div)|(\/div)]*[^>]*>/g),

    // clearValue = value.replace(/[\t\n\r\s]/g, ""),  //\s*\t\n\r
    clearValue = value.replace(/(>( )*<)/g, '><').replace(/(<( )*)/g, '<').replace(/(( )*>)/g, '>').replace(/(<\/( )*)/g, '</').replace(/(<br( )*)/g, '<br').replace(/(( )*\/>)/g, '/>').replace(/(<( )*\/)/g, '</').replace(/[\n\r]/g, ''),
        i = 0,
        re = /([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g,
        // 匹配中文
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
    if (valueArray) {
        for (i = 0; i < valueArray.length; i++) {
            if (!valueArray[i].trim()) {
                valueArray.splice(i, 1);
                i--;
            }
        }
    }
    if (styleArray) {
        for (i = 0; i < styleArray.length; i++) {
            if (!styleArray[i].trim()) {
                styleArray.splice(i, 1);
                i--;
            }
        }
    }
    for (i = 0, styleIndex = 0; i < valueArray.length; i++) {
        if (styleArray) {
            for (tempIndex = styleIndex; tempIndex < styleArray.length; tempIndex++) {
                temp = str + styleArray[tempIndex];
                if (clearValue.indexOf(temp) == 0) {
                    if (already < line) {
                        str += styleArray[tempIndex];
                        if (styleArray[tempIndex].indexOf('<br') == 0) {
                            already++;
                        }
                    }
                } else {
                    styleIndex = tempIndex;
                    break;
                }
            }
        } else if (i > 0) {
            str += '<br/>';
        }
        tempOne = Math.ceil(valueArray[i].replace(re, "çç").length / one);
        if (already < line) {
            if (already + tempOne == line) {
                lastLength = one * (line - already) - (one - (one * line - textSize));
                tempStr = valueArray[i].replace(re, "çç").slice(0, lastLength);
                if (/çç/g.test(tempStr)) {
                    tempLength = tempStr.replace(/(çç)/g, "一").length; //tempStr.match(/çç/g).length;
                }
                if (tempLength < valueArray[i].length) {
                    str += valueArray[i].slice(0, tempLength) + '...';
                    isClip = true;
                } else {
                    str += valueArray[i];
                    isClip = false;
                }
                already = line;
            } else if (already + tempOne > line) {
                lastLength = one * (line - already) - (one - (one * line - textSize));
                tempStr = valueArray[i].replace(re, "çç").slice(0, lastLength);
                if (/çç/g.test(tempStr)) {
                    tempLength = tempStr.replace(/(çç)/g, "一").length; //tempStr.match(/çç/g).length;
                }
                str += valueArray[i].slice(0, tempLength) + '...';
                already = line;
                isClip = true;
            } else {
                already = already + tempOne;
                str += valueArray[i];
                if (i == valueArray.length - 1) {
                    isClip = false;
                }
            }
            if (styleArray) {
                for (tempIndex = styleIndex; tempIndex < styleArray.length; tempIndex++) {
                    if (styleArray[tempIndex].indexOf('</') == 0 || styleArray[tempIndex].indexOf('<br') == 0) {
                        if (styleArray[tempIndex].indexOf('<br') == 0) {
                            if (already < line) {
                                if (already == line) {
                                    isClip = false;
                                }
                                temp = str + styleArray[tempIndex];
                                if (clearValue.indexOf(temp) == 0) {
                                    resultTag = str.match(tagReg);
                                    str += styleArray[tempIndex];
                                    if (resultTag) {
                                        for (rt = resultTag.length - 1; rt > -1; rt--) {
                                            if (resultTag[rt].indexOf('<br') == -1) {
                                                // 最后一个不是换行符
                                                if (resultTag[rt].indexOf('</') == 0 && resultTag[rt].indexOf('</span') == -1) {
                                                    // 如果最后一个标签能让str换行
                                                    already++;
                                                    break;
                                                }
                                            } else if (rt == resultTag.length - 1 && resultTag[rt].indexOf('<br') == 0) {
                                                // 如果最后一个是换行符
                                                already++;
                                                break;
                                            }
                                        }
                                    }
                                } else {
                                    styleIndex = tempIndex;
                                    break;
                                }
                            } else {
                                styleIndex = tempIndex;
                                break;
                            }
                        } else {
                            temp = str + styleArray[tempIndex];
                            if (clearValue.indexOf(temp) == 0) {
                                str += styleArray[tempIndex];
                            } else {
                                styleIndex = tempIndex;
                                break;
                            }
                        }
                    } else {
                        if (already == line) {
                            break;
                        }
                        styleIndex = tempIndex;
                        break;
                    }
                }
            }
            if (already == line) {
                if (status) {
                    return isClip;
                } else {
                    break;
                }
            }
        } /*else {
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
    if (status) {
        return isClip;
    } else {
        // 闭合标签
        str = Node.closeHTML(str);
        return str;
    }
};
Node.closeHTML = function (str) {
    var styleArray = str.match(/\<[(p)|(\/p)|(li)|(\/li)|(ul)|(\/ul)|(span)|(\/span)|(h1)|(\/h1)|(h2)|(\/h2)|(h3)|(\/h3)|(h4)|(\/h4)|(h5)|(\/h5)|(h6)|(\/h6)|(font)|(\/font)|(b)|(\/b)|(u)|(\/u)|(i)|(\/i)|(div)|(\/div)]*[^>]*>/g),
        current,
        next,
        i = 0,
        not = [];
    if (styleArray) {
        for (i = 0; i < styleArray.length; i++) {
            if (styleArray[i].indexOf('<br') != 0) {
                current = styleArray[i].split(/[\<(\s*)]/)[1]; //current   当前标签名
                if (i + 1 < styleArray.length) {
                    next = styleArray[i + 1].split(/[\<(\s*)]/)[1];
                } else {
                    next = '';
                }

                if (current[0] == '/') {
                    if (current.slice(1) == not[not.length - 1]) {
                        not.splice(not.length - 1, 1);
                    }
                } else if (current != next.slice(1)) {
                    // 此标签不是闭合标签
                    not.push(current);
                } else {
                    i++;
                }
            }
        }
        for (i = not.length - 1; i >= 0; i--) {
            str += (not[i].indexOf('<') >= 0 ? '' : '<') + (not[i].indexOf('/') >= 0 ? '' : '/') + not[i] + (not[i].indexOf('>') >= 0 ? '' : '>');
        }
    }
    return str;
};

Node.getRequestData = function (store, id, type) {
    switch (type) {
        case 'companyId':
            break;
        case 'positionId':
            break;
    }
};

Node.recoveryChildElementsData = function (parent, baseData, components) {
    var parentmodule = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
    var ignorestatus = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

    var data = [],
        current = {},
        elem = parent[0].getAttribute('id') ? parent : parent.find('[id]').eq(0),
        elemID = elem.attr('id'),
        children = elem.children('#' + elemID + '-content').children(),
        child = null,
        id = '',
        yhmodule = '',
        i = 0;
    for (i = 0; i < children.length; i++) {
        if (children[i].getAttribute('id')) {
            child = children.eq(i);
        } else {
            child = children.eq(i).find('[id]').eq(0);
        }
        id = child.attr('id');
        yhmodule = child.attr('yh-module');
        current = {
            id: id,
            'yh-module': yhmodule,
            module: components[yhmodule],
            recoveryChildElementsData: parentmodule,
            props: components[yhmodule].recoveryCtor(children.eq(i), {
                id: id,
                ignorestatus: ignorestatus,
                ischild: 'ischild'
            })
        };
        data.push(current);
    }
    return {
        elements: data
    };
};

Node.recoveryDataCSS = function (elem, baseData) {
    var data = {},
        arr = [],
        classname = '',
        stylename = '',
        value = '',
        child = null;
    for (var css in baseData) {
        arr = css.split('_');
        classname = arr[0];
        stylename = arr.slice(1).join('-');
        switch (baseData[css].type) {
            case 'number':
                switch (classname) {
                    case 'width':
                    case 'height':
                        value = parseFloat(elem.css(classname));
                        if (!value) {
                            value = baseData[css].value;
                        }
                        break;
                    default:
                        if (elem.hasClass(classname)) {
                            value = elem.css(stylename);
                        } else {
                            child = elem.find('.' + classname);
                            value = child.eq(0).css(stylename);
                        }
                        break;
                }
                switch (value) {
                    case 'auto':
                        break;
                    default:
                        if (value == '') {
                            value = baseData[css].value;
                        } else {
                            value = parseFloat(value);
                        }
                        break;
                }
                break;
            case 'image':
                if (elem.hasClass(classname)) {
                    value = elem.css(stylename);
                } else {
                    child = elem.find('.' + classname);
                    value = child.eq(0).css(stylename);
                }
                if (value) {
                    switch (baseData[css].mold) {
                        case 'bg':
                            value = value != 'none' ? value.split(/[\("'\)]/g)[2] : 'none';
                            break;
                        default:
                            break;
                    }
                } else {
                    value = baseData[css].value;
                }
                break;
            default:
                if (elem.hasClass(classname)) {
                    value = elem.css(stylename);
                } else {
                    child = elem.find('.' + classname);
                    if (child.length == 0 && stylename.indexOf('color') >= 0) {
                        var other = ['background-color', 'color', 'border-color'],
                            index = other.indexOf(stylename),
                            i = 0;
                        other.splice(index, 1);
                        for (i = 0; i < other.length; i++) {
                            child = elem.find('.' + classname + '-' + other[i]);
                            if (child.length > 0) {
                                break;
                            }
                        }
                        value = child.length > 0 ? child.eq(0).css(other[i]) : baseData[css].value;
                    } else {
                        value = child.eq(0).css(stylename);
                    }
                    if (value == '') {
                        value = baseData[css].value;
                    }
                }
                break;
        }

        data[css] = {
            cn: baseData[css].cn,
            en: baseData[css].en,
            value: Node.dealRGBColor(value),
            type: baseData[css].type ? baseData[css].type : 'color'
        };
        if (baseData[css].mold) {
            data[css].mold = baseData[css].mold;
        }
    }
    return data;
};
Node.recoveryDataATTR = function (elem, baseData) {
    var data = {},
        value = '',
        current = null;
    for (var attr in baseData) {
        if (elem[0].attributes[attr]) {
            //getAttribute(attr)){
            value = elem[0].getAttribute(attr);
        } else {
            current = elem.find('[' + attr + ']');
            if (current.length > 0) {
                value = current[0].getAttribute(attr);
            } else {
                value = baseData[attr].value;
            }
        }
        if (value = '[object Object]') {
            value = baseData[attr].value;
        }
        data[attr] = {
            cn: baseData[attr].cn,
            en: attr,
            value: value,
            type: baseData[attr].type ? baseData[attr].type : 'color'
        };
        if (baseData[attr].mold) {
            data[attr].mold = baseData[attr].mold;
        }
    }
    return data;
};

Node.setChildArrayData = function (elemData, baseData) {
    var data = [],
        i = 0;
    for (i = 0; i < elemData.length; i++) {
        data.push({});
        for (var attr in baseData) {
            data[i][attr] = {
                cn: baseData[attr].cn,
                en: attr,
                value: elemData[i][attr],
                type: baseData[attr].type ? baseData[attr].type : 'data',
                parent: baseData[attr].parent ? baseData[attr].parent : 'data'
            };
        }
    }
    return data;
};

Node.setChildObjectData = function (elemData, baseData) {
    var data = [];
    for (var attr in baseData) {
        data[attr] = {
            cn: baseData[attr].cn,
            en: attr,
            value: elemData[attr],
            type: baseData[attr].type ? baseData[attr].type : 'data',
            parent: baseData[attr].parent ? baseData[attr].parent : 'data'
        };
    }
    return data;
};

Node.setChildData = function (elemData, baseData) {
    var data = {},
        value = '',
        current = null;
    for (var attr in baseData) {
        if (elemData[attr] && (Node.isObject(elemData[attr]) || Node.isArray(elemData[attr]))) {
            data[attr] = {
                cn: baseData[attr].cn,
                en: attr,
                value: Node.isArray(elemData[attr]) ? Node.setChildArrayData(elemData[attr], baseData[attr].value[0]) : Node.setChildObjectData(elemData[attr], baseData[attr].value),
                type: baseData[attr].type ? baseData[attr].type : 'data',
                parent: baseData[attr].parent ? baseData[attr].parent : 'data',
                name: baseData[attr].name ? baseData[attr].name : 'positionName'
            };
        } else {
            data[attr] = {
                cn: baseData[attr].cn,
                en: attr,
                value: elemData[attr] ? elemData[attr] : baseData[attr].value,
                type: baseData[attr].type ? baseData[attr].type : 'data',
                parent: baseData[attr].parent ? baseData[attr].parent : 'data'
            };
        }
        if (baseData[attr].mold) {
            data[attr].mold = baseData[attr].mold;
        }
    }
    return data;
};

Node.getDataID = function (link, number) {
    if (!link) {
        return 0;
    }
    var compIdGet = link.substr(number),
        index = compIdGet.indexOf("."),
        id = compIdGet.substring(0, index);

    return id;
};

/***********************************
 * recoveryData: 恢复数据（需区分是css值还是attr值）
 * 数据属性规则如下：progress_background_color（确保elem的css属性名称为此）
 * progress 类名，此属性涉及到的类名还可以是: 
 * progress-background-color progress-color progress-border-color
 * background-color 需改变的值
 ********************************/
Node.recoveryData = function (elem, data) {
    var css = Node.recoveryDataCSS(elem, data.css),
        h5css = Node.recoveryDataATTR(elem, data.h5css),
        attribute = Node.recoveryDataATTR(elem, data.attribute);
    return {
        css: css,
        h5css: h5css,
        attribute: attribute
    };
};

/****
* setData(): 设置数据
* */
Node.setData = function (elem, attributes) {
    for (var attr in attributes) {
        if (attributes[attr]) {
            elem[attr] = JSON.parse(JSON.stringify(attributes[attr]));
        } else if (attributes[attr] == 0 || attributes[attr] == false) {
            elem[attr] = attributes[attr];
        } else {
            elem[attr] = '';
        }
    }
};
/****
 * setCompanyData(): 设置公司数据（较全）
 * */
Node.setCompanyData = function (data, leader) {
    var elemData = {},
        l = 0;
    data.companyId = data.id;
    data.name = data.companyshortname;
    data.slogan = data.companyfeatures;
    data.companySize = data.companysize;
    if (data.logo.indexOf('http') == -1) {
        if (data.logo.indexOf('i/image/') != -1 || data.logo.indexOf('image1/') != -1 || data.logo.indexOf('image2/') != -1) {
            data.logo = 'https://www.lgstatic.com/thumbnail_200x200/' + data.logo;
        } else {
            data.logo = 'https://www.lgstatic.com/' + data.logo;
        }
    } else {
        data.logo = '' + data.logo;
    }
    data.companyLeader = {};
    for (l = 0; l < leader.length; l++) {
        if (leader[l]) {
            data.companyLeader = {
                name: leader[l].name,
                photo: leader[l].photo,
                remark: leader[l].remark
            };
            if (data.companyLeader.photo.indexOf('http') == -1) {
                if (data.companyLeader.photo.indexOf('i/image/') != -1 || data.companyLeader.photo.indexOf('image1/') != -1 || data.companyLeader.photo.indexOf('image2/') != -1) {
                    data.companyLeader.photo = 'https://www.lgstatic.com/thumbnail_200x200/' + data.companyLeader.photo;
                } else {
                    data.companyLeader.photo = 'https://www.lgstatic.com/' + data.companyLeader.photo;
                }
            } else {
                data.companyLeader.photo = '' + data.companyLeader.photo;
            }
            break;
        }
    }
    Node.setData(elemData, {
        companyId: data.companyId,
        description: data.description,
        allDescription: data.description,
        logo: data.logo,
        name: data.name,
        slogan: data.slogan,
        industryfield: data.industryfield,
        otherlabel: data.otherlabel, // ? data.otherlabel.split(',') : [],
        city: data.city,
        level: data.financestage,
        address: data.city,
        scale: data.companySize,
        type: data.industryfield,
        manager: {
            name: data.companyLeader ? data.companyLeader.name ? data.companyLeader.name : '' : '',
            photo: data.companyLeader ? data.logo.indexOf('http') == -1 ? data.companyLeader.photo : 'https://www.lgstatic.com/' + data.companyLeader.photo : 'https://www.lgstatic.com/images/leader_default.png',
            position: data.companyLeader ? data.companyLeader.position ? data.companyLeader.position : '' : '',
            remark: data.companyLeader ? data.companyLeader.remark ? data.companyLeader.remark : '' : '',
            all_remark: data.companyLeader ? data.companyLeader.remark ? data.companyLeader.remark : '' : ''
        }
    });
    return elemData;
};
/****
 * setPositionData(): 设置职位数据(公司)（较全）
 * */
Node.setPositionData = function (elemData, data) {
    Node.setData(elemData, {
        positionId: data.positionId,
        positionName: data.positionName,
        salary: data.salary,
        education: data.education,
        workYear: data.workYear,
        dynamic_type: Node.positionTag[data.positionFirstType]
    });
};
/****
 * setCompIntroduceData(): 设置公司介绍数据（较全）
 * */
Node.setCompIntroduceData = function (parentID, childID, data) {
    Node.setData(Manager.allDatas[parentID].position[childID], {
        companyId: data.companyId,
        logo: data.logo,
        name: data.name,
        slogan: data.slogan,
        city: data.city,
        industryfield: data.industryfield,
        level: data.financestage,
        scale: data.companySize
    });
};

module.exports = _extends({}, Node);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports
exports.i(__webpack_require__(7), "");

// module
exports.push([module.i, "\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".yh-custom-base-element00 { margin:0 auto; width: 100px; height: 100px; border-color: rgb(255, 255, 255); border-width: 0px; border-style: none; border-radius: 6px; position: relative; background-color: rgb(255, 255, 255);}.yh-custom-base-element0{left: 0px; top: 0px; position: absolute;}.yh-custom-base-element1{width: 100px; height: 100px; background-color: rgb(255, 255, 255); border-color: rgb(255, 255, 255); border-width: 0px; border-style: none; border-radius: 6px; box-shadow: rgb(255, 255, 255) 0px 0px 0px;}.yh-custom-base-element2{width: 100%; height: 100%; position: absolute; left: 0px; top: 0px; display: block;}", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(4)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(1),
  /* template */
  __webpack_require__(3),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-h5/Custom/style1/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a89ab01", Component.options)
  } else {
    hotAPI.reload("data-v-7a89ab01", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(10)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);