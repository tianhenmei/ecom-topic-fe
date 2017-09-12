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
/******/ 	return __webpack_require__(__webpack_require__.s = 77);
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
/* 2 */
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

var listToStyles = __webpack_require__(104)

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(13);
var isBuffer = __webpack_require__(73);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 4 */
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

Node.getRem = function (value) {
    return value / (750 / 16); //  + 'rem'
};

Node.getPx = function (value) {
    return value * (750 / 16); // + 'rem';
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(3);
var normalizeHeaderName = __webpack_require__(42);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(9);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(9);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(24)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(103)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(49),
  /* template */
  __webpack_require__(90),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-input.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-input.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d3a0c83c", Component.options)
  } else {
    hotAPI.reload("data-v-d3a0c83c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/**
 * vuex v2.3.0
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: {} };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed'
        );
        return
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state; if ( state === void 0 ) state = {};
  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error(("[vuex] unknown mutation type: " + type));
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error(("[vuex] unknown action type: " + type));
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(("[vuex] duplicate getter key: " + type));
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    );
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.3.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(28);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(3);
var settle = __webpack_require__(34);
var buildURL = __webpack_require__(37);
var parseHeaders = __webpack_require__(43);
var isURLSameOrigin = __webpack_require__(41);
var createError = __webpack_require__(12);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(36);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(39);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(24)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(33);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(99)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(45),
  /* template */
  __webpack_require__(86),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-checkbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-checkbox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a6bc34a", Component.options)
  } else {
    hotAPI.reload("data-v-7a6bc34a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(102)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(46),
  /* template */
  __webpack_require__(89),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-color.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-color.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b2f8020a", Component.options)
  } else {
    hotAPI.reload("data-v-b2f8020a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(92)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(48),
  /* template */
  __webpack_require__(79),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-image.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-image.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-07cc861a", Component.options)
  } else {
    hotAPI.reload("data-v-07cc861a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(95)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(50),
  /* template */
  __webpack_require__(82),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-mutiple.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-mutiple.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5c169c78", Component.options)
  } else {
    hotAPI.reload("data-v-5c169c78", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(98)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(51),
  /* template */
  __webpack_require__(85),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-number.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-number.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f45ea3e", Component.options)
  } else {
    hotAPI.reload("data-v-6f45ea3e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(91)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(52),
  /* template */
  __webpack_require__(78),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-options.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-options.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0597a0b6", Component.options)
  } else {
    hotAPI.reload("data-v-0597a0b6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(96)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(53),
  /* template */
  __webpack_require__(83),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-request.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-request.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e76ac27", Component.options)
  } else {
    hotAPI.reload("data-v-5e76ac27", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(97)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(84),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-text.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-text.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-64217a76", Component.options)
  } else {
    hotAPI.reload("data-v-64217a76", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(101)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(56),
  /* template */
  __webpack_require__(88),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-textarea.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-textarea.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a3abb35c", Component.options)
  } else {
    hotAPI.reload("data-v-a3abb35c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(100)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(57),
  /* template */
  __webpack_require__(87),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-uplist.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-uplist.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-99191d5e", Component.options)
  } else {
    hotAPI.reload("data-v-99191d5e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
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
//

// import Swiper from '../../../../../public/js/lib/swiper.min.js'


var _vuex = __webpack_require__(7);

var _Node = __webpack_require__(4);

var _yhEditComplicated = __webpack_require__(75);

var _yhEditComplicated2 = _interopRequireDefault(_yhEditComplicated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseData = {
    id: '',
    ignorestatus: '', // 是否为类似LIST的子集（如果是则会忽略样式设置） 为'ignorestatus' 时忽略
    ischild: '',
    yh_data_name: 'anchorID', // 当作为子级时放入uplist中的title取值
    path: '',
    parentmodule: '', // 父级模版
    sync: {
        'background_width': ['css.width']
    },
    css: {
        // background: 类名  background_color: css样式background-color
        background_background_color: {
            cn: '背景颜色',
            en: 'background_background_color',
            value: 'transparent',
            type: 'color'
            // color(默认)   
            // image（背景图(mold="bg")、图片(mold="src")）  
            // number(数字)     
            // text(文本)
            // textarea(多行文字)
            // uplist(内部多选项设置)
            // request （数据请求：公司ID、职位ID、问题ID、回答ID等）
            // options 选项
            // none  不编辑的属性
            // name:'子级属性名'  只有点击显示多个编辑的时候，如果子级是数组，每个数组元素是对象，则取此对象的属性等于name值的值作为uplist的title
            // condition:["auto",0]（条件）  通过带有effect属性的设置项查找，当其值等于"auto"或0时才会显示设置
            // status: false | true   条件控制的状态
            // effect:['',''] 当前属性会影响的属性，如css.overflow
            // default:'auto',  // 默认值
            // ivalue:100,   // 初始值
            // options:[{  // 选项的类容
            // cn:'',   ／／ 选项中文
            // value:'' // 选项真正的值
            // }]
            // 只有当前组件是容器组件时，一般只有设置数据才有，才会有eindex和index
            // 其中 eindex 指的是子组件在容器组件里面的位置
            //     index 指的是子组件的某个属性值value=数组，index表示在其中的位置，如公司组件的职位列表
        },
        width: {
            cn: '宽度',
            en: 'width',
            value: document.documentElement.clientWidth, //'auto',
            default: 'auto', // 默认值
            ivalue: document.documentElement.clientWidth, //100,   // 初始值
            type: 'none'
        },
        // background_height:{
        //     cn:'高度',
        //     en:'background_height',
        //     value:100,//'auto',
        //     default:'auto',  // 默认值
        //     ivalue:100,//document.documentElement.clientWidth,   // 初始值
        //     type:'number'
        // },
        // background_min_height:{
        //     cn:'最小高度',
        //     en:'background_min_height',
        //     value:'auto',
        //     default:'auto',
        //     ivalue:100,
        //     type:'none',
        //     parent:'css'
        // },
        background_background_image: {
            cn: '背景图片',
            en: 'background_background_image',
            value: 'none',
            type: 'image',
            mold: 'bg'
        },
        background_background_repeat: {
            cn: '背景重复',
            en: 'background_background_repeat',
            value: 'no-repeat',
            type: 'options',
            options: [{
                cn: '不重复',
                value: 'no-repeat'
            }, {
                cn: '重复',
                value: 'repeat'
            }, {
                cn: '横向重复',
                value: 'repeat-x'
            }, {
                cn: '纵向重复',
                value: 'repeat-y'
            }]
        },
        pagination_color: {
            cn: '分页背景',
            en: 'pagination_color',
            value: '#00c99b'
        },
        navigation: {
            cn: '左右按钮',
            en: 'navigation',
            value: 0,
            type: 'checkbox',
            parent: 'css',
            effect: ['css.navigation_left_background', 'css.navigation_right_background', 'css.navigation_top', 'css.navigation_left']
        },
        navigation_left_background: {
            cn: '左按钮背景',
            en: 'navigation_left_background',
            value: 'https://activity.lagou.com/topic/static/img/newEdit/carouselButton.png',
            type: 'image',
            mold: 'bg',
            status: false,
            condition: [1]
        },
        navigation_right_background: {
            cn: '右按钮背景',
            en: 'navigation_right_background',
            value: 'https://activity.lagou.com/topic/static/img/newEdit/carouselButton.png',
            type: 'image',
            mold: 'bg',
            status: false,
            condition: [1]
        },
        navigation_top: {
            cn: '按钮-Y',
            en: 'navigation_top',
            value: 0,
            type: 'number',
            status: false,
            condition: [1]
        },
        navigation_left: {
            cn: '按钮-X',
            en: 'navigation_left',
            value: 0,
            type: 'number',
            status: false,
            condition: [1]
        }
    },
    h5css: {
        // height:{
        //     cn:'高度',
        //     en:'height',
        //     value:100,//'auto',
        //     default:'auto',  // 默认值
        //     ivalue:100,//100,   // 初始值
        //     type:'number',
        //     parent:'h5css'
        // },
        // background_min_height:{
        //     cn:'最小高度',
        //     en:'background_min_height',
        //     value:'auto',
        //     default:'auto',
        //     ivalue:100,
        //     type:'none',
        //     parent:'h5css'
        // },
        background_background_color: {
            cn: '背景颜色',
            en: 'background_background_color',
            value: 'transparent',
            type: 'color',
            parent: 'h5css'
        },
        background_background_image_h5: {
            cn: 'H5背景图片',
            en: 'background_background_image_h5',
            value: 'none',
            type: 'image',
            mold: 'bg',
            parent: 'h5css'
        },
        background_background_repeat: {
            cn: '背景重复',
            en: 'background_background_repeat',
            value: 'no-repeat',
            type: 'options',
            parent: 'h5css',
            options: [{
                cn: '不重复',
                value: 'no-repeat'
            }, {
                cn: '重复',
                value: 'repeat'
            }, {
                cn: '横向重复',
                value: 'repeat-x'
            }, {
                cn: '纵向重复',
                value: 'repeat-y'
            }]
        },
        pagination_color: {
            cn: '分页背景',
            en: 'pagination_color',
            value: '#00c99b',
            parent: 'h5css'
        },
        navigation: {
            cn: '左右按钮',
            en: 'navigation',
            value: 0,
            type: 'checkbox',
            parent: 'h5css',
            effect: ['h5css.navigation_left_background', 'h5css.navigation_right_background', 'h5css.navigation_top', 'h5css.navigation_left']
        },
        navigation_left_background: {
            cn: '左按钮背景',
            en: 'navigation_left_background',
            value: 'https://activity.lagou.com/topic/static/img/newEdit/gIcon3_h5.png',
            type: 'image',
            mold: 'bg',
            parent: 'h5css',
            status: false,
            condition: [1]
        },
        navigation_right_background: {
            cn: '右按钮背景',
            en: 'navigation_right_background',
            value: 'https://activity.lagou.com/topic/static/img/newEdit/gIcon3_h5.png',
            type: 'image',
            mold: 'bg',
            parent: 'h5css',
            status: false,
            condition: [1]
        },
        navigation_top: {
            cn: '按钮-上',
            en: 'navigation_top',
            value: 0,
            type: 'number',
            parent: 'h5css',
            status: false,
            condition: [1]
        },
        navigation_left: {
            cn: '按钮-X',
            en: 'navigation_left',
            value: 0,
            type: 'number',
            parent: 'h5css',
            status: false,
            condition: [1]
        }
    },
    elements: [],
    common: {},
    attribute: {},
    data: { // 卡片数据
        toH5: {
            cn: '适配移动端',
            en: 'toH5',
            value: 1,
            type: 'checkbox',
            parent: 'data'
        },
        toPC: {
            cn: '适配到PC',
            en: 'toPC',
            value: 1,
            type: 'checkbox',
            parent: 'data'
        },
        anchorID: {
            cn: '锚点ID',
            en: 'anchorID',
            value: '',
            type: 'text',
            parent: 'data'
        },
        currentIndex: {
            cn: '当前激活索引',
            en: 'currentIndex',
            value: 0,
            type: 'none',
            parent: 'data'
        },
        pagination: {
            cn: '分页器',
            en: 'pagination',
            value: 1,
            // type:'checkbox',
            type: 'none',
            parent: 'data'
        },
        autoplay: {
            cn: '自动轮播',
            en: 'autoplay',
            value: 0,
            type: 'checkbox',
            parent: 'data'
        },
        animation: {
            cn: '轮播动画',
            en: 'animation',
            value: 'move',
            type: 'options',
            parent: 'data',
            options: [{
                cn: '平移',
                value: 'move'
            }, {
                cn: '3D缩小',
                value: 'zoomIn'
            }]
        },
        childmodule: {
            cn: '子集模板',
            en: 'childmodule',
            value: 'Block_style1',
            parent: 'data',
            type: 'none'
        }
    }
};
exports.default = {
    props: ['props', 'path', 'parentmodule'],
    components: {
        'yh-edit-complicated': _yhEditComplicated2.default
    },
    data: function data() {
        return {
            swiper: null
        };
    },

    computed: _extends({}, (0, _vuex.mapState)(['count']), {
        setImage: function setImage() {
            var src = this.props.css.background_background_image.value.trim();
            switch (src) {
                case 'none':
                    return src;
                case 'undefined':
                    return 'none';
                default:
                    return 'url(' + src + ')';
            }
        },
        getLeft: function getLeft() {
            var str = '',
                value = this.props.data.currentIndex.value * this.props.elements[0].props.css.background_width.value * -1 + 'px';
            // str = 'transform:translate('+value+',0); '+
            //       '-webkit-transform:translate('+value+',0)'
            str = 'left:' + value + '; ';
            // switch(this.props.data.animation.value){
            //     case 'zoomIn':
            //         str += 'width:'+this.props.css.width.value+'px; '
            //         break
            // }
            return str;
        },
        getAutoplay: function getAutoplay() {
            if (this.props.data.autoplay.value) {
                return 'autoplay';
            } else {
                return false;
            }
        },
        setArrowLeftStyle: function setArrowLeftStyle() {
            var style = {
                top: this.props.css.navigation_top.value + 'px'
            };
            if (this.props.css.navigation_left_background.value != 'https://activity.lagou.com/topic/static/img/newEdit/carouselButton.png') {
                style.backgroundImage = 'url(' + this.props.css.navigation_left_background.value + ')';
                style.backgroundPosition = '0 0';
            }
            return style;
        },
        setArrowRightStyle: function setArrowRightStyle() {
            var style = {
                top: this.props.css.navigation_top.value + 'px'
            };
            if (this.props.css.navigation_right_background.value != 'https://activity.lagou.com/topic/static/img/newEdit/carouselButton.png') {
                style.backgroundImage = 'url(' + this.props.css.navigation_right_background.value + ')';
                style.backgroundPosition = '0 0';
            }
            return style;
        }
    }),
    mounted: function mounted() {
        this.props.data.currentIndex.value = 0;
        // this.swiper = new Swiper('#'+this.props.id,{
        //     wrapperClass:'yh-slider-content',
        //     slideClass:'block-style1',
        //     // autoplay : 5000,
        // })
    },

    methods: {
        resetData: function resetData(data) {
            return (0, _Node.updateData)(data, baseData);
        },
        setAll: function setAll(e) {
            var id = (0, _Node.initSelected)(e);
            this.$refs[id].className += ' setting';
            var yh_edit_layer = this.$refs['yh-edit-complicated'].$refs[id + '-yh-edit-layer'],
                add = this.$refs['yh-slider-addone'];
            yh_edit_layer.className = yh_edit_layer.className.replace(/( hide)/g, '');
            add.className = add.className.replace(/(hide)/g, '').replace(/  /g, ' ');
            (0, _Node.settingBox)(this.$refs[id], this.props.ischild);
        },
        recoveryModuleData: function recoveryModuleData(elem, baseData) {
            var data = {},
                attr = '',
                current = null,
                currentChild = null,
                i = 0,
                curr = '',
                childdata = {};
            for (attr in baseData.data) {}
            return {
                data: data
            };
        },
        leftEvent: function leftEvent(e) {
            var length = this.props.elements.length;
            this.props.data.currentIndex.value--;
            if (this.props.data.currentIndex.value == -1) {
                this.props.data.currentIndex.value = length - 1;
            }
        },
        rightEvent: function rightEvent(e) {
            var length = this.props.elements.length;
            this.props.data.currentIndex.value++;
            if (this.props.data.currentIndex.value == length) {
                this.props.data.currentIndex.value = 0;
            }
        },
        showAddLayer: function showAddLayer(e) {
            var id = this.props.id,
                list = this.$refs[id],
                add = this.$refs['yh-slider-addone'];
            if (/(setting)/g.test(list.className)) {
                add.className = add.className.replace(/(hide)/g, '').replace(/  /g, ' ');
            }
        },
        hideAddLayer: function hideAddLayer(e) {
            var id = this.props.id,
                list = this.$refs[id],
                add = this.$refs['yh-slider-addone'];
            if (/(setting)/g.test(list.className)) {
                add.className += ' hide';
            }
        },
        addElement: function addElement(e) {
            // let childmodule = this.props.data.childmodule.value,
            //     classify = childmodule.split(/_/g)[0],
            //     addedit = document.getElementById('yh-edit-add-'+classify)
            // addedit.className = addedit.className.replace(/(hide)/g,'').replace('  ',' ')
            var newId = 'element' + this.count,
                length = this.props.elements.length;
            this.$emit('addChildComponent', {
                id: newId,
                'yh-module': 'Block_style1',
                module: null,
                parentPath: this.path,
                path: 'props.elements.cindex',
                parentmodule: 'Slider_style1',
                props: {
                    id: newId,
                    ignorestatus: 'ignorestatus',
                    ischild: 'ischild',
                    yh_data_name: baseData.yh_data_name
                }
            });
            this.$store.commit('changeCount');
            this.$store.commit('setValue', {
                parent: 'data',
                eindex: -1,
                index: -1,
                ischildset: '',
                stylename: 'currentIndex',
                actualValue: length,
                designValue: length,
                path: this.path
            });
        }
    },
    initCtor: function initCtor(options, self, components) {
        var newID = '',
            i = 0,
            elements = [];
        for (i = 0; i < 3; i++) {
            newID = 'element' + self.count;
            elements.push({
                id: newID,
                'yh-module': 'Block_style1',
                module: components['Block_style1'],
                parentPath: '',
                path: 'props.elements.' + i,
                parentmodule: 'Slider_style1',
                props: components['Block_style1'].initCtor({
                    id: newID,
                    ignorestatus: 'ignorestatus',
                    ischild: 'ischild',
                    yh_data_name: baseData.yh_data_name
                })
            });
            elements[i].props.css.background_width.value = document.documentElement.clientWidth;
            self.$store.commit('changeCount');
        }
        var data = Object.assign({}, JSON.parse(JSON.stringify({
            ignorestatus: baseData.ignorestatus,
            ischild: baseData.ischild,
            yh_data_name: baseData.yh_data_name,
            nonset: baseData.nonset,
            css: baseData.css,
            h5css: baseData.h5css,
            elements: baseData.elements,
            attribute: baseData.attribute,
            data: baseData.data,
            common: baseData.common,
            sync: baseData.sync
        })), options, {
            elements: elements
        });
        data.data.anchorID.value = options.id;
        return data;
    },
    setCtor: function setCtor(options, elemData) {
        var data = Object.assign({}, JSON.parse(JSON.stringify({
            ignorestatus: baseData.ignorestatus,
            ischild: baseData.ischild,
            yh_data_name: baseData.yh_data_name,
            path: path,
            css: baseData.css,
            h5css: baseData.h5css,
            elements: baseData.elements,
            nonset: baseData.nonset,
            attribute: baseData.attribute,
            data: (0, _Node.setChildData)(elemData, baseData.data),
            common: baseData.common,
            sync: baseData.sync
        })), options);
        data.data.anchorID.value = options.id;
        return data;
    },
    recoveryCtor: function recoveryCtor(elem, options, components) {
        var data = Object.assign({}, (0, _Node.recoveryData)(elem, baseData), this.methods.recoveryModuleData(elem, baseData), (0, _Node.recoveryChildElementsData)(elem, baseData, components, 'ignorestatus'), {
            yh_data_name: baseData.yh_data_name,
            path: path,
            nonset: baseData.nonset,
            common: baseData.common,
            sync: baseData.sync
        }, options);
        if (!data.data.anchorID.value) {
            data.data.anchorID.value = options.id;
        }
        return data;
    }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: _vm.props.id,
    staticClass: "slider-style1",
    attrs: {
      "id": _vm.props.id,
      "yh-module": "Slider_style1",
      "yh-path": _vm.path,
      "autoplay": _vm.getAutoplay,
      "animation": _vm.props.data.animation.value,
      "yh-vessel": ""
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.setAll($event)
      },
      "mouseenter": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.showAddLayer($event)
      },
      "mouseleave": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.hideAddLayer($event)
      }
    }
  }, [_c('div', {
    staticClass: "yh-slider-container clearfix",
    style: ({
      width: _vm.props.css.width.value + (_vm.props.css.width.value == 'auto' ? '' : 'px'),
      marginLeft: (_vm.props.css.width.value == '-50%' ? '' : (-parseFloat(_vm.props.css.width.value) / 2) + 'px'),
      backgroundColor: _vm.props.css.background_background_color.value,
      backgroundImage: _vm.setImage,
      backgroundRepeat: _vm.props.css.background_background_repeat.value
    }),
    attrs: {
      "id": _vm.props.id + '-container'
    }
  }, [_c('div', {
    staticClass: "yh-slider-content clearfix",
    style: (_vm.getLeft),
    attrs: {
      "id": _vm.props.id + '-content'
    }
  }, _vm._l((_vm.props.elements), function(element, index) {
    return (element) ? _c(element.module, {
      tag: "div",
      attrs: {
        "props": element.props,
        "path": element.path,
        "parentmodule": "Slider_style1"
      }
    }) : _vm._e()
  }))]), _vm._v(" "), _c('a', {
    staticClass: "arrow-left",
    style: (_vm.setArrowLeftStyle),
    attrs: {
      "href": "javascript:void(0);"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.leftEvent($event)
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "arrow-right",
    style: (_vm.setArrowRightStyle),
    attrs: {
      "href": "javascript:void(0);"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.rightEvent($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.props.elements.length > 0),
      expression: "props.elements.length > 0"
    }],
    staticClass: "pagination",
    style: ({
      width: 20 * _vm.props.elements.length + 'px',
      marginLeft: (20 * _vm.props.elements.length / 2 * -1) + 'px'
    }),
    attrs: {
      "id": _vm.props.id + '-pagination'
    }
  }, _vm._l((_vm.props.elements), function(one, index) {
    return _c('div', {
      staticClass: "one",
      class: {
        'active': index == _vm.props.data.currentIndex.value
      },
      style: ({
        backgroundColor: _vm.props.css.pagination_color.value
      })
    })
  })), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.props.elements.length > 0),
      expression: "props.elements.length > 0"
    }],
    ref: "yh-slider-addone",
    staticClass: "yh-vessel-add yh-slider-addone hide",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.addElement($event)
      }
    }
  }, [_vm._v("+")]), _vm._v(" "), _c('yh-edit-complicated', {
    ref: "yh-edit-complicated",
    attrs: {
      "css": _vm.props.css,
      "h5css": _vm.props.h5css,
      "elem_id": _vm.props.id,
      "common": _vm.props.common,
      "nature": _vm.props.attribute,
      "elements": _vm.props.elements,
      "ignorestatus": _vm.props.ignorestatus,
      "ischild": _vm.props.ischild,
      "owndata": _vm.props.data,
      "path": _vm.path,
      "parentmodule": _vm.parentmodule
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3471953d", module.exports)
  }
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(61);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("45708580", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3471953d\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3471953d\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var bind = __webpack_require__(13);
var Axios = __webpack_require__(30);
var defaults = __webpack_require__(5);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(10);
axios.CancelToken = __webpack_require__(29);
axios.isCancel = __webpack_require__(11);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(44);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(10);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(5);
var utils = __webpack_require__(3);
var InterceptorManager = __webpack_require__(31);
var dispatchRequest = __webpack_require__(32);
var isAbsoluteURL = __webpack_require__(40);
var combineURLs = __webpack_require__(38);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var transformData = __webpack_require__(35);
var isCancel = __webpack_require__(11);
var defaults = __webpack_require__(5);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(12);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
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
//
//
//

exports.default = {
    props: ['parent', 'options', 'index', 'eindex', 'ischildset', 'elem_id', // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
    'ischild', 'path'],
    data: function data() {
        return {};
    },

    computed: {
        getDesignValue: function getDesignValue() {
            var actualValue = this.parent[this.options.en].value;
            return actualValue ? true : false;
        }
    },
    methods: {
        getDesign: function getDesign(value) {
            return value * (750 / 16);
        },

        // yh-edit-checkbox
        setValue: function setValue(e) {
            var target = e.target,
                value = target.checked ? 1 : 0,
                // // 展示出来的字体大小（针对750的宽）
            stylename = this.options.en,
                actualValue = value; // unit == realunit ? (value + realunit) : (this.getRemValue(parseFloat(value)) + realunit)

            // actualValue : 实际上使用的值
            // value : 展示用的值 （designValue）
            // this.$emit('setValue',stylename,actualValue,value)
            console.log(target.checked);
            if (this.backstatus) {
                this.$emit('setValue', stylename, actualValue, value);
            } else {
                this.$store.commit('setValue', {
                    parent: this.options.parent ? this.options.parent : 'css',
                    eindex: !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index: !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset: this.ischildset ? this.ischildset : '',
                    stylename: stylename,
                    actualValue: actualValue,
                    designValue: value,
                    path: this.path
                });
            }
        }
    }
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _yhEditInput = __webpack_require__(6);

var _yhEditInput2 = _interopRequireDefault(_yhEditInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        'yh-edit-input': _yhEditInput2.default
    },
    props: ['eindex', // elements中的索引
    'index', 'parent', 'options', 'elem_id', // 当前被选中元素的ID
    'ischildset', // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
    'ischild', 'path'],
    data: function data() {
        return {
            optionsData: {
                name: this.options.cn,
                stylename: this.options.en,
                unit: '',
                realunit: '',
                type: 'text',
                classname: 'color',
                style: this.parent
            },
            list: ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF', '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031', 'transparent'],
            changeStatus: false
        };
    },
    mounted: function mounted() {
        // @mouseenter="showEditLayer"
        // @mouseleave="hideEditLayer"
        var textInput = this.$el.getElementsByClassName('yh-edit-value')[0].getElementsByTagName('input')[0];
        textInput.addEventListener('focus', this.showEditLayer);
        this.$el.addEventListener('mouseleave', this.hideEditLayer);
    },

    methods: {
        showEditLayer: function showEditLayer(e) {
            // $(e.target).closest('.yh-edit-input').find('.yh-edit-list').show()
            this.$refs['yh-edit-list'].style.display = 'block';
            this.changeStatus = false;
        },
        hideEditLayer: function hideEditLayer(e) {
            if (!this.changeStatus) {
                // $(e.target).closest('.yh-edit-input').find('.yh-edit-list').hide()
                this.$refs['yh-edit-list'].style.display = 'none';
            }
        },
        setValue: function setValue(name, actualValue, value) {
            var type = this.options.edittype,
                edittype = type ? 'set' + type.substring(0, 1).toUpperCase() + type.substring(1) + 'Value' : 'setValue';
            if (this.options.backstatus) {
                this.$emit('setValue', name, value, value);
            } else {
                this.$store.commit(edittype, {
                    parent: this.options.parent ? this.options.parent : 'css',
                    eindex: !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index: !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset: this.ischildset ? this.ischildset : '',
                    stylename: name,
                    actualValue: value,
                    designValue: value,
                    path: this.path,
                    store: this.$store
                });
            }
        },
        setChangeStatus: function setChangeStatus(e) {
            this.changeStatus = true;
            this.$emit('setChangeStatus', true);
        },
        colorChange: function colorChange(e) {
            var target = e.target,
                value = target.value; //,
            // input = $(target).closest('.yh-edit-input').find('.yh-edit-value > input')

            this.setValue(this.options.en, value, value);
            // input.val(value)
        },
        setColor: function setColor(e) {
            var target = e.target,
                value = target.attributes['value'].value; //,
            // input = $(target).closest('.yh-edit-input').find('.yh-edit-value > input')

            this.setValue(this.options.en, value, value);
            // input.val(value)
        }
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
//

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Node = __webpack_require__(4);

var _yhEditTab = __webpack_require__(76);

var _yhEditTab2 = _interopRequireDefault(_yhEditTab);

var _yhEditUplist = __webpack_require__(23);

var _yhEditUplist2 = _interopRequireDefault(_yhEditUplist);

var _yhEditColor = __webpack_require__(15);

var _yhEditColor2 = _interopRequireDefault(_yhEditColor);

var _yhEditImage = __webpack_require__(16);

var _yhEditImage2 = _interopRequireDefault(_yhEditImage);

var _yhEditNumber = __webpack_require__(18);

var _yhEditNumber2 = _interopRequireDefault(_yhEditNumber);

var _yhEditText = __webpack_require__(21);

var _yhEditText2 = _interopRequireDefault(_yhEditText);

var _yhEditCheckbox = __webpack_require__(14);

var _yhEditCheckbox2 = _interopRequireDefault(_yhEditCheckbox);

var _yhEditTextarea = __webpack_require__(22);

var _yhEditTextarea2 = _interopRequireDefault(_yhEditTextarea);

var _yhEditOptions = __webpack_require__(19);

var _yhEditOptions2 = _interopRequireDefault(_yhEditOptions);

var _yhEditRequest = __webpack_require__(20);

var _yhEditRequest2 = _interopRequireDefault(_yhEditRequest);

var _yhEditMutiple = __webpack_require__(17);

var _yhEditMutiple2 = _interopRequireDefault(_yhEditMutiple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// debugger
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
//
//
//
//
//
//
//
//
//

exports.default = {
    components: {
        'yh-edit-tab': _yhEditTab2.default,
        'yh-edit-uplist': _yhEditUplist2.default,
        'yh-edit-color': _yhEditColor2.default,
        'yh-edit-image': _yhEditImage2.default,
        'yh-edit-number': _yhEditNumber2.default,
        'yh-edit-text': _yhEditText2.default,
        'yh-edit-checkbox': _yhEditCheckbox2.default,
        'yh-edit-textarea': _yhEditTextarea2.default,
        'yh-edit-options': _yhEditOptions2.default,
        'yh-edit-request': _yhEditRequest2.default,
        'yh-edit-mutiple': _yhEditMutiple2.default
    },
    props: ['css', // 基本样式 (同属common)
    'h5css', // 移动端样式设置 (同属common)
    'common', // 公共样式：主要用于列表的样式
    'nature', // 基本属性：非PC样式，但必须的数据，存与elem的属性上，如: background_background_image_h5
    'elements', // 只有LIST才有
    'owndata', // 组件的数据：如公司组件里公司名称、logo等
    'elem_id', // 当前组件的id
    'ignorestatus', // 当前是否忽略样式设置
    'ischild', // 当前是否子元素，用于yh-edit-number 的宽高设置
    'path', 'parentmodule'],
    data: function data() {
        var tabs = [];
        switch (this.ignorestatus) {
            case 'ignorestatus':
                tabs = [{
                    title: '数据设置',
                    type: 'data'
                }];
                break;
            default:
                tabs = [{
                    title: 'PC设置',
                    type: 'css'
                }, {
                    title: '移动端设置',
                    type: 'h5css'
                }, {
                    title: '数据设置',
                    type: 'data'
                }];
                break;
        }
        return {
            yhmodule: {
                YHEditColor: _yhEditColor2.default,
                YHEditImage: _yhEditImage2.default,
                YHEditNumber: _yhEditNumber2.default,
                YHEditText: _yhEditText2.default,
                YHEditCheckbox: _yhEditCheckbox2.default,
                YHEditTextarea: _yhEditTextarea2.default,
                YHEditRequest: _yhEditRequest2.default,
                YHEditMutiple: _yhEditMutiple2.default,
                YHEditOptions: _yhEditOptions2.default
            },
            tabOptions: {
                base: {
                    tabs: tabs
                }
            }
        };
    },

    computed: {},
    methods: {
        getConditionValue: function getConditionValue(key) {
            var temp = key.split('.'),
                t = temp[0] == 'data' ? 'owndata' : temp[0];
            return this[t][temp[1]].status;
        },
        getChildCssStatus: function getChildCssStatus(index) {
            var css = this.elements[index].props.css,
                status = false,
                i = 0;
            for (i in css) {
                if (css[i].parentSetStatus == 'child') {
                    status = true;
                    break;
                }
            }
            return status;
        },
        getChildH5CssStatus: function getChildH5CssStatus(index) {
            var css = this.elements[index].props.h5css,
                status = false,
                i = 0;
            for (i in css) {
                if (css[i].parentSetStatus == 'child') {
                    status = true;
                    break;
                }
            }
            return status;
        },
        getChildDataStatus: function getChildDataStatus(index) {
            var data = this.elements[index].props.data,
                status = false,
                i = 0;
            for (i in data) {
                if (!data[i].parentSetStatus || data[i].parentSetStatus == 'child') {
                    status = true;
                    break;
                }
            }
            return status;
        },
        getChildSetStatus: function getChildSetStatus(one) {
            switch (one.en) {
                case 'toH5':
                case 'toPC':
                case 'anchorID':
                    var l = this.path.match(/(elements)/g).length;
                    if (l == 2) {
                        switch (this.parentmodule) {
                            case 'List_style1':
                                return false;
                                break;
                        }
                    }
                    break;
            }
            return true;
        },
        setDisplayStatus: function setDisplayStatus(one) {
            // return true
            if (one.condition) {
                // 条件判断
                return one.status;
            } else {
                return true;
            }
        },
        getContentStatus: function getContentStatus(value) {
            var i = 0;
            for (i = 0; i < this.tabOptions.base.tabs.length; i++) {
                if (this.tabOptions.base.tabs[i].type == value) {
                    return true;
                }
            }
            return false;
        },
        setContentSlot: function setContentSlot(value) {
            var i = 0;
            for (i = 0; i < this.tabOptions.base.tabs.length; i++) {
                if (this.tabOptions.base.tabs[i].type == value) {
                    return 'content' + i;
                }
            }
            return 'content0';
        },
        setModule: function setModule(one) {
            switch (one.type) {
                case 'uplist':
                    return this.yhmodule.YHEditMutiple;
                default:
                    if (one.type) {
                        return this.yhmodule['YHEdit' + one.type[0].toLocaleUpperCase() + one.type.slice(1)];
                    } else {
                        return this.yhmodule.YHEditColor;
                    }
            }
        },
        removeElement: function removeElement(e) {
            var elem = document.getElementsByClassName('setting')[0],
                elemID = elem.getAttribute('id');
            this.$store.commit('removeElement', {
                path: this.path
            });
            (0, _Node.undoSelected)();
        },
        undoElement: function undoElement(e) {
            (0, _Node.undoSelected)();
        }
    }
};
// components-edit

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: ['eindex', 'index', 'parent', 'options', 'elem_id', // 当前被选中元素的ID
    'ischildset', // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
    'ischild', 'path'],
    data: function data() {
        return {};
    },

    methods: {
        setBackgroundImageValue: function setBackgroundImageValue(src, data) {
            var classname = this.options.en.split('_'),
                name = '',
                setArr = ['min_width', 'min_height'],
                // 'width','height',
            list = [],
                i = 0,
                parentName = this.options.parent ? this.options.parent : 'css',
                eindex = !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                index = !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                ischildset = this.ischildset ? this.ischildset : '',
                imgAtrr = '',
                type = this.options.edittype,
                edittype = type ? 'set' + type.substring(0, 1).toUpperCase() + type.substring(1) + 'MultipleValue' : 'setMultipleValue';
            // 默认为background_image
            if (classname.length > 2) {
                name = classname[0] + '_';
            }
            list = [{
                parent: parentName,
                eindex: eindex,
                index: index,
                ischildset: ischildset,
                stylename: this.options.en,
                actualValue: src,
                designValue: src
            }];
            for (i = 0; i < setArr.length; i++) {
                if (this.parent[name + setArr[i]]) {
                    imgAtrr = /(width)/g.test(setArr[i]) ? 'width' : 'height';
                    list.push({
                        parent: parentName,
                        eindex: eindex,
                        index: index,
                        ischildset: ischildset,
                        stylename: name + setArr[i],
                        actualValue: data[imgAtrr], // / (750 / 16)+'rem',
                        designValue: data[imgAtrr]
                    });
                }
            }
            this.$store.commit(edittype, {
                ischildset: ischildset,
                path: this.path,
                list: list,
                store: this.$store
            });
        },
        setSrcValue: function setSrcValue(src, data) {
            var classname = this.options.en.split('_'),
                name = classname.length > 1 ? classname[0] + '_' : '_',
                setArr = ['width', 'height'],
                // 'width','height',
            list = [],
                i = 0,
                parentName = this.options.parent ? this.options.parent : 'css',
                eindex = !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                index = !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                ischildset = this.ischildset ? this.ischildset : '',
                imgAtrr = '',
                type = this.options.edittype,
                edittype = type ? 'set' + type.substring(0, 1).toUpperCase() + type.substring(1) + 'MultipleValue' : 'setMultipleValue';
            list = [{
                parent: parentName,
                eindex: eindex,
                index: index,
                stylename: this.options.en,
                actualValue: src,
                designValue: src
            }];
            for (i = 0; i < setArr.length; i++) {
                if (this.parent[name + setArr[i]]) {
                    imgAtrr = /(width)/g.test(setArr[i]) ? 'width' : 'height';
                    list.push({
                        parent: parentName,
                        eindex: eindex,
                        index: index,
                        ischildset: ischildset,
                        stylename: name + setArr[i],
                        actualValue: data[imgAtrr], // / (750 / 16)+'rem',
                        designValue: data[imgAtrr]
                    });
                }
            }
            this.$store.commit(edittype, {
                ischildset: ischildset,
                path: this.path,
                list: list,
                store: this.$store
            });
        },
        setValue: function setValue(e) {
            var target = e.target,
                value = target.value,
                stylename = this.options.en,
                image = null,
                classname = [],
                name = '',
                setArr = [],
                list = [],
                i = 0,
                parentName = '',
                eindex = -1,
                index = -1,
                ischildset = '',
                imgAtrr = '';
            switch (this.options.mold) {
                case 'bg':
                    image = new Image();
                    (function (self, value) {
                        image.onload = function () {
                            self.setBackgroundImageValue(value, image);
                        };
                    })(this, value);
                    image.src = value;
                    break;
                default:
                    image = new Image();
                    classname = this.options.en.split(/[_]/g);
                    name = classname.length > 1 ? classname[0] + '_' : '_';
                    (function (self, value) {
                        image.onload = function () {
                            self.setSrcValue(value, image);
                        };
                    })(this, value);
                    image.src = value;
                    break;
            }
        },
        uploadFile: function uploadFile(e) {
            var that = e.target,
                file = that.files[0],
                fileData = new FormData(),
                requestdata = this.$store.state.ajaxUrl.File,
                self = this;
            fileData.append('files', file, file.name);
            (function (self, that) {
                //self.$store.state.connhost+'v3/api/editorPC/upload'
                (0, _axios2.default)({
                    url: requestdata.url,
                    method: requestdata.type,
                    data: fileData,
                    withCredentials: true
                }).then(function (response) {
                    var data = response.data,
                        name = self.options.mold,
                        stylename = '',
                        value = '';
                    if (self.type) {
                        switch (name) {
                            case 'src':
                                stylename = 'yh-src';
                                value = self.$store.state.fileHost + data.filename;
                                break;
                            case 'bg':
                                stylename = 'background-image';
                                value = self.$store.state.fileHost + data.filename;
                                break;
                        }
                        self.$store.commit('setValue', {
                            parent: self.parent,
                            index: self.index,
                            ischildset: self.ischildset ? self.ischildset : '',
                            stylename: stylename,
                            actualValue: value,
                            designValue: value
                        });
                    } else {
                        switch (name) {
                            case 'src':
                                self.imageChange(self, data);
                                break;
                            case 'audiosrc':
                                self.otherChange(self, data);
                                break;
                            case 'bg':
                                self.setBackgroundImage(self, data);
                                break;
                        }
                    }
                }, function (response) {
                    console.log(response.body.message);
                });
            })(self, that);
        },
        otherChange: function otherChange(self, data) {
            var src = self.$store.state.fileHost + data.filename;
            self.$store.commit('setMultipleValue', {
                ischildset: self.ischildset ? self.ischildset : '',
                path: self.path,
                list: [{
                    parent: this.parent ? this.parent : '',
                    eindex: !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index: !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset: this.ischildset ? this.ischildset : '',
                    stylename: 'audiosrc',
                    actualValue: src,
                    designValue: src
                }]
            });
        },
        imageChange: function imageChange(self, data) {
            var src = self.$store.state.fileHost + data.filename;
            self.setSrcValue(src, data);
        },
        setBackgroundImage: function setBackgroundImage(self, data) {
            var url = self.$store.state.fileHost + data.filename;
            self.setBackgroundImageValue(url, data);
        }
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
//
//
//

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
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
//
//
//

var _vuex = __webpack_require__(7);

var _Node = __webpack_require__(4);

exports.default = {
    props: ['eindex', 'index', 'options', 'type', 'ischildset', // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
    'path'],
    data: function data() {
        return {};
    },

    computed: _extends({
        getDefaultStatus: function getDefaultStatus() {
            return !!this.options.default && this.options.default != false && this.options.default != 0;
        },
        setClassname: function setClassname() {
            var str = '';
            if (this.options.classname) {
                str += 'yh-edit-' + this.options.classname;
            }
            if (!this.options.name) {
                str += ' yh-eidt-combine';
            }
            return str;
        },
        getDesignValue: function getDesignValue() {
            var actualValue = this.options.style[this.options.stylename].value;
            if (this.options.type === 'number') {
                var value = parseFloat(actualValue);
                if (this.options.unit === this.options.realunit) {
                    return value;
                }
                return value; //this.getDesign(value)
            }
            return actualValue;
        },
        setReadonlyStatus: function setReadonlyStatus() {
            var status = this.getDefaultStatus && this.getDesignValue == this.options.default && Object.prototype.toString.call(this.options.default) === '[object String]';
            return status;
        }
    }, (0, _vuex.mapState)({
        // getDesignValue(state){

        // }
    })),
    methods: {
        getDesign: function getDesign(value) {
            return value * (750 / 16);
        },
        getRemValue: function getRemValue(value) {
            return value / (750 / 16);
        },
        inputSelected: function inputSelected(e) {},
        getDefStatus: function getDefStatus() {
            return this.options.default && this.options.default != false && this.options.default != 0;
        },
        showChoice: function showChoice(e) {
            if (this.getDefStatus()) {
                var choice = this.$refs['yh-edit-choice'];
                choice.className = choice.className.replace(/(hide)/g, '').replace(/  /g, ' ');
            }
        },
        hideChoice: function hideChoice(e) {
            if (this.getDefStatus()) {
                var choice = this.$refs['yh-edit-choice'];
                choice.className += ' hide';
            }
        },
        setChoice: function setChoice(e) {
            var choice = this.$refs['yh-edit-choice'],
                value = parseInt(e.target.getAttribute('value')),
                number = value || value == 0 ? value : e.target.getAttribute('value'),
                actualValue = value || value == 0 ? this.options.unit && this.options.unit != this.options.realunit ? (0, _Node.getRem)(number) : number : number,
                type = this.options.edittype,
                edittype = type ? 'set' + type.substring(0, 1).toUpperCase() + type.substring(1) + 'Value' : 'setValue'; /*,
                                                                                                                         elem = document.getElementsByClassName('setting')[0],
                                                                                                                         width = elem.style.width,
                                                                                                                         height = elem.style.height,//getComputedValue(elem,'height'),
                                                                                                                         paddingVerticle = getPointValue(elem,'padding-top') + getPointValue(elem,'padding-bottom'),
                                                                                                                         paddingHorizontal= getPointValue(elem,'padding-left') + getPointValue(elem,'padding-right'),
                                                                                                                         nheight = elem.clientHeight - paddingVerticle,
                                                                                                                         nwidth = elem.clientWidth - paddingHorizontal*/

            choice.className += ' hide';
            if (this.options.backstatus) {
                this.$emit('setValue', this.options.stylename, actualValue, number); // this.options.def
            } else {
                this.$store.commit(edittype, {
                    parent: this.options.parent ? this.options.parent : 'css',
                    eindex: !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index: !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset: this.ischildset ? this.ischildset : '',
                    stylename: this.options.stylename,
                    actualValue: actualValue,
                    designValue: number,
                    path: this.path
                });
            }
            // switch(this.options.stylename){
            //     case 'height':
            //          switch(height){
            //             case 'auto':
            //                 this.options.def = 'auto'
            //                 this.options.type = 'number'
            //                 break
            //             default:
            //                 this.options.def = nheight
            //                 this.options.type = 'text'
            //                 break
            //         }
            //         break
            //     case 'width':
            //         switch(width){
            //             case 'auto':
            //                 this.options.def = 'auto'
            //                 this.options.type = 'number'
            //                 break
            //             default:
            //                 this.options.def = nwidth
            //                 this.options.type = 'text'
            //                 break
            //         }
            //         break
            // }
        },
        setValue: function setValue(e) {
            var target = e.target,
                value = target.value,
                // // 展示出来的字体大小（针对750的宽）
            unit = this.options.unit ? this.options.unit : '',
                realunit = this.options.realunit ? this.options.realunit : '',
                stylename = this.options.stylename,
                actualValue = this.options.unit && this.options.unit != this.options.realunit ? (0, _Node.getRem)(parseFloat(value)) : value,
                type = this.options.edittype,
                edittype = type ? 'set' + type.substring(0, 1).toUpperCase() + type.substring(1) + 'Value' : 'setValue'; // unit == realunit ? (value + realunit) : (this.getRemValue(parseFloat(value)) + realunit)

            // actualValue : 实际上使用的值
            // value : 展示用的值 （designValue）
            // this.$emit('setValue',stylename,actualValue,value)
            if (this.index && this.index != -1 && this.index != undefined) {
                this.$emit('setValue', stylename, actualValue, value);
            } else {
                if (this.options.backstatus) {
                    this.$emit('setValue', stylename, actualValue, value);
                } else {
                    this.$store.commit(edittype, {
                        parent: this.options.parent ? this.options.parent : 'css',
                        eindex: !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                        index: !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                        ischildset: this.ischildset ? this.ischildset : '',
                        stylename: stylename,
                        actualValue: actualValue,
                        designValue: value,
                        path: this.path
                    });
                }
            }
        }
    }
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Node = __webpack_require__(4);

var _yhEditUplist = __webpack_require__(23);

var _yhEditUplist2 = _interopRequireDefault(_yhEditUplist);

var _yhEditColor = __webpack_require__(15);

var _yhEditColor2 = _interopRequireDefault(_yhEditColor);

var _yhEditImage = __webpack_require__(16);

var _yhEditImage2 = _interopRequireDefault(_yhEditImage);

var _yhEditNumber = __webpack_require__(18);

var _yhEditNumber2 = _interopRequireDefault(_yhEditNumber);

var _yhEditText = __webpack_require__(21);

var _yhEditText2 = _interopRequireDefault(_yhEditText);

var _yhEditCheckbox = __webpack_require__(14);

var _yhEditCheckbox2 = _interopRequireDefault(_yhEditCheckbox);

var _yhEditTextarea = __webpack_require__(22);

var _yhEditTextarea2 = _interopRequireDefault(_yhEditTextarea);

var _yhEditOptions = __webpack_require__(19);

var _yhEditOptions2 = _interopRequireDefault(_yhEditOptions);

var _yhEditRequest = __webpack_require__(20);

var _yhEditRequest2 = _interopRequireDefault(_yhEditRequest);

var _yhEditMutiple = __webpack_require__(17);

var _yhEditMutiple2 = _interopRequireDefault(_yhEditMutiple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        'yh-edit-uplist': _yhEditUplist2.default,
        'yh-edit-color': _yhEditColor2.default,
        'yh-edit-image': _yhEditImage2.default,
        'yh-edit-number': _yhEditNumber2.default,
        'yh-edit-text': _yhEditText2.default,
        'yh-edit-checkbox': _yhEditCheckbox2.default,
        'yh-edit-textarea': _yhEditTextarea2.default,
        'yh-edit-options': _yhEditOptions2.default,
        'yh-edit-request': _yhEditRequest2.default,
        'yh-edit-mutiple': _yhEditMutiple2.default
    },
    props: ["eindex", // 元素所在的elements中的索引
    'parent', 'options', 'elem_id', // 当前被选中元素的ID
    'ischildset', // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
    'ischild', 'path', 'parentmodule'],
    data: function data() {
        return {
            yhmodule: {
                YHEditColor: _yhEditColor2.default,
                YHEditImage: _yhEditImage2.default,
                YHEditNumber: _yhEditNumber2.default,
                YHEditText: _yhEditText2.default,
                YHEditCheckbox: _yhEditCheckbox2.default,
                YHEditTextarea: _yhEditTextarea2.default,
                YHEditRequest: _yhEditRequest2.default,
                YHEditMutiple: _yhEditMutiple2.default,
                YHEditOptions: _yhEditOptions2.default
            },
            optionsData: {
                name: this.options.cn,
                stylename: this.options.en,
                unit: '',
                realunit: '',
                type: 'text',
                classname: 'yhtext',
                style: this.parent,
                backstatus: true
            },
            changeStatus: false
        };
    },

    computed: {
        getObjectStatus: function getObjectStatus() {
            return (0, _Node.isArray)(this.options.value);
        }
    },
    mounted: function mounted() {},

    methods: {
        getChildSetStatus: function getChildSetStatus(one) {
            switch (one.en) {
                case 'toH5':
                case 'toPC':
                case 'anchorID':
                    var l = this.path.match(/(elements)/g).length;
                    if (l == 2) {
                        switch (this.parentmodule) {
                            case 'List_style1':
                                return false;
                                break;
                        }
                    }
                    break;
            }
            return true;
        },
        setValue: function setValue(name, actualValue, value) {
            if (this.options.backstatus) {
                this.$emit('setValue', name, value, value);
            } else {
                this.$store.commit('setValue', {
                    parent: this.options.parent ? this.options.parent : 'css',
                    index: this.type ? this.type.index : -1,
                    ischildset: this.ischildset ? this.ischildset : '',
                    stylename: name,
                    actualValue: value,
                    designValue: value
                });
            }
        },
        setModule: function setModule(one) {
            switch (one.type) {
                case 'image':
                    return this.yhmodule.YHEditImage;
                case 'number':
                    return this.yhmodule.YHEditNumber;
                case 'text':
                    return this.yhmodule.YHEditText;
                case 'checkbox':
                    return this.yhmodule.YHEditCheckbox;
                case 'textarea':
                    return this.yhmodule.YHEditTextarea;
                case 'options':
                    return this.yhmodule.YHEditOptions;
                case 'uplist':
                    return this.yhmodule.YHEditMutiple;
                case 'request':
                    return this.yhmodule.YHEditRequest;
                default:
                    return this.yhmodule.YHEditColor;
            }
        }
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Node = __webpack_require__(4);

var _yhEditInput = __webpack_require__(6);

var _yhEditInput2 = _interopRequireDefault(_yhEditInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//

exports.default = {
    components: {
        'yh-edit-input': _yhEditInput2.default
    },
    props: ['eindex', 'index', 'parent', 'options', 'elem_id', // 当前被选中元素的ID
    'ischildset', // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
    'ischild', 'path'],
    data: function data() {
        var hasdef = false,
            def = 'auto',
            type = 'number';
        if (this.parent[this.options.en].hasOwnProperty('ivalue')) {
            hasdef = true;
            if (this.parent[this.options.en].value == 'auto') {
                type = 'text';
                def = this.parent[this.options.en].ivalue;
            }
        }
        return {
            optionsData: {
                name: this.options.cn,
                stylename: this.options.en,
                unit: this.options.nounit ? '' : this.options.unit ? this.options.unit : 'px',
                realunit: this.options.nounit ? '' : this.options.realunit ? this.options.realunit : 'px',
                type: type,
                classname: 'number',
                style: this.parent,
                hasdef: hasdef,
                def: def,
                default: this.options.default,
                ivalue: this.options.ivalue,
                backstatus: true
            },
            changeStatus: false
        };
    },
    mounted: function mounted() {
        // @mouseenter="showEditLayer"
        // @mouseleave="hideEditLayer"
        var textInput = this.$el.getElementsByClassName('yh-edit-value')[0].getElementsByTagName('input')[0];
        textInput.addEventListener('focus', this.showEditLayer);
        this.$el.addEventListener('mouseleave', this.hideEditLayer);
    },

    methods: {
        settingBox: _Node.settingBox,
        showEditLayer: function showEditLayer(e) {
            // $(e.target).closest('.yh-edit-input').find('.yh-edit-list').show()
            this.changeStatus = false;
        },
        hideEditLayer: function hideEditLayer(e) {
            if (!this.changeStatus) {
                // $(e.target).closest('.yh-edit-input').find('.yh-edit-list').hide()
            }
        },
        setValue: function setValue(name, actualValue, value) {
            var type = this.options.edittype,
                edittype = type ? 'set' + type.substring(0, 1).toUpperCase() + type.substring(1) + 'Value' : 'setValue';
            if (this.options.backstatus) {
                this.$emit('setValue', name, actualValue, value);
            } else {
                this.$store.commit(edittype, {
                    parent: this.options.parent ? this.options.parent : 'css',
                    eindex: !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index: !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset: this.ischildset ? this.ischildset : '',
                    stylename: name,
                    actualValue: actualValue,
                    designValue: value,
                    path: this.path,
                    store: this.$store
                });
                // 非实时
                switch (name) {
                    case 'width':
                    case 'height':
                        // console.log(document.getElementById(this.elem_id).clientHeight)
                        this.settingBox(document.getElementById(this.elem_id), this.ischild);
                        break;
                }
            }
        }
    }
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(7);

exports.default = {
    props: ['eindex', 'index', 'parent', 'options', 'elem_id', // 当前被选中元素的ID
    'ischildset', // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
    'ischild', 'path'],
    data: function data() {
        return {};
    },

    computed: (0, _vuex.mapState)({
        getDesignValue: function getDesignValue(state) {
            var one = this.parent[this.options.en],
                value = one.value,
                i = 0,
                cnvalue = ''; //one.cnvalue
            for (i = 0; i < one.options.length; i++) {
                if (value == one.options[i].value) {
                    cnvalue = one.options[i].cn;
                    break;
                }
            }
            return cnvalue ? cnvalue : /(px)/g.test(value) ? parseFloat(value) : value;
        }
    }),
    methods: {
        showEditList: function showEditList(e) {
            this.$refs['yh-edit-list'].style.display = 'block';
        },
        hideEditList: function hideEditList(e) {
            this.$refs['yh-edit-list'].style.display = 'none';
        },

        // yh-edit-options
        setValue: function setValue(e) {
            var target = e.target,
                value = target.attributes['value'].value,
                // 最终设置的值
            index = parseInt(target.attributes['index'].value),
                svalue = this.options.options[index].value,
                // 展示出来的字体大小（针对750的宽）
            cnvalue = this.options.options[index].cn,
                list = this.$refs['yh-edit-list'],
                type = this.options.edittype,
                edittype = type ? 'set' + type.substring(0, 1).toUpperCase() + type.substring(1) + 'Value' : 'setValue';
            list.style.display = 'none';

            if (this.options.backstatus) {
                this.$emit('setValue', this.options.en, value + (this.options.realunit ? this.options.realunit : ''), svalue + (this.options.unit ? this.options.unit : ''));
            } else {
                this.$store.commit(edittype, {
                    parent: this.options.parent ? this.options.parent : 'css',
                    eindex: !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index: !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset: this.ischildset ? this.ischildset : '',
                    stylename: this.options.en,
                    actualValue: value + (this.options.realunit ? this.options.realunit : ''),
                    designValue: svalue + (this.options.unit ? this.options.unit : ''),
                    cnvalue: cnvalue,
                    path: this.path,
                    store: this.$store
                });
            }
        }
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _isomorphicFetch = __webpack_require__(74);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _Node = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: ['eindex', 'index', 'parent', 'options', 'elem_id', // 当前被选中元素的ID
    'ischildset', // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
    'ischild', 'path'],
    data: function data() {
        return {
            optionsData: {
                name: this.options.cn,
                stylename: this.options.en,
                unit: '',
                realunit: '',
                type: 'text',
                classname: 'request',
                style: this.parent,
                backstatus: false
            },
            changeStatus: false
        };
    },

    computed: {
        getDesignValue: function getDesignValue() {
            var actualValue = this.optionsData.style[this.optionsData.stylename].value;
            return actualValue;
        }
    },
    mounted: function mounted() {},

    methods: {
        requestEvent: function requestEvent(e) {
            var id = this.$refs['yh-edit-request-input'].value,
                //this.parent[this.options.en].value,
            src = this.$store.state.ajaxUrl.CompanyPosition.url,
                //this.$store.state.companyHost,
            method = this.$store.state.ajaxUrl.CompanyPosition.type,
                //'post',
            commitname = 'setCompanyData',
                self = this;
            switch (this.options.en) {
                case 'companyId':
                    src += id;
                    break;
                case 'positionId':
                    src = this.$store.state.ajaxUrl.Position.url + id;
                    method = this.$store.state.ajaxUrl.Position.type; //'get'
                    commitname = 'setPositionData';
                    break;
            }
            // this.connhost+'v3/api/editorPC/getPageData'
            (0, _axios2.default)({
                method: method,
                url: src,
                withCredentials: true
            })
            // fetch(src,{
            //     mode: 'cors',//'cors',  // 'same-origin'
            //     method: method,
            //     credentials: 'include',//'include',  // 'same-origin'
            //     withCredentials:true,
            //     // headers: {
            //         // 'Access-Control-Allow-Origin':'*',
            //         // 'Access-Control-Allow-Credentials': true,

            //         // 'Accept': 'application/json,form-urlencoded',
            //         // 'Content-Type': 'application/json;charset=utf-8',
            //         // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            //     // },
            // })
            .then(function (response) {
                var result = response.data.result;
                if (result.hasOwnProperty('logo')) {
                    if (result.logo.indexOf('http') == -1) {
                        if (result.logo.indexOf('i/image/') != -1 || result.logo.indexOf('image1/') != -1 || result.logo.indexOf('image2/') != -1) {
                            result.logo = 'https://www.lgstatic.com/thumbnail_200x200/' + result.logo;
                        } else {
                            result.logo = 'https://www.lgstatic.com/' + result.logo;
                        }
                    } else {
                        result.logo = '' + result.logo;
                    }
                }
                self.$store.commit(commitname, {
                    parent: self.options.parent ? self.options.parent : 'data',
                    eindex: !(self.eindex == -1 || self.eindex == undefined || typeof self.eindex == 'string') ? self.eindex : -1,
                    index: !(self.index == -1 || self.index == undefined || typeof self.index == 'string') ? self.index : -1,
                    ischildset: self.ischildset ? self.ischildset : '',
                    path: self.path,
                    result: result
                });
            }, function (response) {
                if (response.body) {
                    console.log(response.body.message);
                } else {
                    console.log(response.message);
                }
                // console.log(response.body.message)
            });
            // getRequestData(this.$store,id,this.options.en)
        }
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
//
//

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Node = __webpack_require__(4);

exports.default = {
    props: ['props'],
    data: function data() {
        return {
            style: {
                width: 200,
                height: 100
            },
            position: {
                width: 750,
                left: 0,
                top: 0
            },
            status: true, // status == true  当前是编辑元素的tab
            active: 0 // 当前激活的索引值，默认为0
        };
    },

    methods: {
        getParentByClassName: _Node.getParentByClassName,
        changeTab: function changeTab(e) {
            var target = this.getParentByClassName(e.target, 'yh-tab-one'),
                index = parseInt(target.getAttribute('index'));
            if (index != this.active) {
                this.active = index;
                if (this.props.backstatus) {
                    this.$emit('changeTab', this.active);
                }
            }
        }
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
//
//
//
//
//
//
//

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _yhEditInput = __webpack_require__(6);

var _yhEditInput2 = _interopRequireDefault(_yhEditInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        'yh-edit-input': _yhEditInput2.default
    },
    props: ['eindex', 'index', // index
    'parent', 'options', 'elem_id', // 当前被选中元素的ID
    'ischildset', // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
    'ischild', 'path'],
    data: function data() {
        return {
            optionsData: {
                name: this.options.cn,
                stylename: this.options.en,
                unit: '',
                realunit: '',
                type: 'text',
                classname: 'yhtext',
                style: this.parent,
                edittype: this.options.edittype,
                backstatus: true
            },
            changeStatus: false
        };
    },
    mounted: function mounted() {},

    methods: {
        // yh-edit-text
        setValue: function setValue(name, actualValue, value) {
            var type = this.options.edittype,
                edittype = type ? 'set' + type.substring(0, 1).toUpperCase() + type.substring(1) + 'Value' : 'setValue';
            if (this.options.backstatus) {
                this.$emit('setValue', name, value, value);
            } else {
                this.$store.commit(edittype, {
                    parent: this.options.parent ? this.options.parent : 'css',
                    eindex: !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index: !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset: this.ischildset ? this.ischildset : '',
                    stylename: name,
                    actualValue: value,
                    designValue: value,
                    path: this.path,
                    store: this.$store
                });
            }
        }
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

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
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
//
//
//

exports.default = {
    props: ['eindex', 'index', 'parent', 'options', 'elem_id', // 当前被选中元素的ID
    'ischildset', // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
    'ischild', 'path'],
    data: function data() {
        return {
            optionsData: {
                name: this.options.cn,
                stylename: this.options.en,
                unit: '',
                realunit: '',
                type: 'text',
                classname: 'yhtextarea',
                style: this.parent,
                backstatus: true
            },
            changeStatus: false
        };
    },
    mounted: function mounted() {},

    computed: {
        setClassname: function setClassname() {
            if (this.optionsData.classname) {
                return 'yh-edit-' + this.optionsData.classname;
            }
            return '';
        },
        getDesignValue: function getDesignValue() {
            var actualValue = this.optionsData.style[this.optionsData.stylename].value;
            if (this.optionsData.type === 'number') {
                var value = parseFloat(actualValue);
                if (this.optionsData.unit === this.optionsData.realunit) {
                    return value;
                }
                return this.getDesign(value);
            }
            return actualValue;
        }
    },
    methods: {
        setValue: function setValue(e) {
            var target = e.target,
                value = target.value,
                type = this.options.edittype,
                name = this.options.en,
                edittype = type ? 'set' + type.substring(0, 1).toUpperCase() + type.substring(1) + 'Value' : 'setValue';
            if (this.options.backstatus) {
                this.$emit('setValue', name, value, value);
            } else {
                this.$store.commit(edittype, {
                    parent: this.options.parent ? this.options.parent : 'css',
                    eindex: !(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index: !(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset: this.ischildset ? this.ischildset : '',
                    stylename: name,
                    actualValue: value,
                    designValue: value,
                    path: this.path,
                    store: this.$store
                });
            }
        }
    }
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Node = __webpack_require__(4);

exports.default = {
    props: ['options', 'status', // 是否有子集
    'removeStatus', // 删除状态
    'index', //     当前所在父组件的索引
    'parentID', // 父组件ID
    'path' // 父组件路径
    ],
    data: function data() {
        return {};
    },
    mounted: function mounted() {},

    methods: {
        getParentByClassName: _Node.getParentByClassName,
        getChildrenByClassName: _Node.getChildrenByClassName,
        getSiblingsByClassName: _Node.getSiblingsByClassName,
        toggleUplistContent: function toggleUplistContent(e) {
            var parent = this.getParentByClassName(e.target, 'yh-uplist-set'),
                siblings = this.getSiblingsByClassName(parent, 'yh-uplist-set'),
                title = this.getParentByClassName(e.target, 'yh-uplist-set-title'),
                content = this.getSiblingsByClassName(title, 'yh-uplist-set-content')[0],
                icon = this.getChildrenByClassName(title, 'icon')[0],
                i = 0,
                stitle = null,
                scontent = null,
                sicon = null,
                status = /(hide)/g.test(content.className);

            for (i = 0; i < siblings.length; i++) {
                stitle = this.getChildrenByClassName(siblings[i], 'yh-uplist-set-title')[0];
                scontent = this.getChildrenByClassName(siblings[i], 'yh-uplist-set-content')[0];
                sicon = this.getChildrenByClassName(stitle, 'icon')[0];
                if (!/(hide)/g.test(scontent.className)) {
                    sicon.className = sicon.className.replace('listshow', '').replace('  ', ' ');
                    scontent.className = scontent.className + ' hide';
                }
            }
            if (status) {
                if (!/(listshow)/g.test(icon.className)) {
                    icon.className = icon.className + ' listshow';
                }
                content.className = content.className.replace('hide', '').replace('  ', ' ');
            } else {
                icon.className = icon.className.replace('listshow', '').replace('  ', ' ');
                content.className = content.className + ' hide';
            }
        },
        removeElement: function removeElement(e) {
            this.$store.commit('removeElement', {
                path: this.path + '.props.elements.' + this.index
            });
        }
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
//

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.yh-edit-options {\n    width: 100%;\n    padding: 0 0 5px 0;\n    position: relative;\n}\n.yh-edit-options .yh-edit-text {\n    width: 80px;\n    height: 25px;\n    line-height: 25px;\n    float: left;\n    text-align: right;\n    font-size: 12px;\n    color: #666;\n}\n.yh-edit-options .yh-edit-value{\n    width: 113px;\n    height: 23px;\n    line-height: 23px;\n    border: 1px solid #ccc;\n    float: left;\n    font-size: 12px;\n    color: #666;\n    background: transparent;\n    margin: 0 5px 0 0;\n    float: left;\n}\n.yh-edit-options .yh-edit-arrow{\n    width: 20px;\n    height: 20px;\n    line-height: 20px;\n    margin: 2px 0 0 0;\n    cursor: pointer;\n    position:relative;\n    float:left;\n    background: #ff47a3;\n}\n.yh-edit-options .yh-edit-arrow:after {\n    width: 20px;\n    height: 20px;\n    line-height: 20px;\n    content: \"\\F0D7\";\n    font-family: FontAwesome;\n    font-size: 12px;\n    color: #fff;\n    text-align: center;\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n.yh-edit-options .yh-edit-list > ul > li,\n.yh-edit-options .yh-edit-list > ul,\n.yh-edit-options .yh-edit-list{\n    width:100px;\n    color:#666;\n}\n.yh-edit-options .yh-edit-list {\n    width: 113px;\n    display: none;\n    position: absolute;\n    left: 80px;\n    top: 24px;\n    border: 1px solid #ccc;\n    /* height: 200px; */\n    max-height: 200px;\n    overflow-y: scroll;\n    overflow-x: hidden;\n    z-index: 10;\n}\n.yh-edit-options .yh-edit-list > ul > li {\n    font-size: 12px;\n    line-height:25px;\n    text-align:center;\n    cursor:pointer;\n    background:#fff;\n}\n.yh-edit-options .yh-edit-list > ul > li:hover {\n    background:#eee;\n}\n.yh-edit-options .yh-edit-list > ul > li.active {\n    background:#ff0084;\n    color:#fff;\n}\n", ""]);

// exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.yh-edit-image {\n  width: 100%;\n  padding: 0 0 5px 0;\n  position: relative;\n}\n.yh-edit-image .yh-edit-text {\n  width: 80px;\n  height: 25px;\n  line-height: 25px;\n  text-align: right;\n  font-size: 12px;\n  color: #666;\n  float: left;\n}\n.yh-edit-image .yh-edit-value {\n  width: 113px;\n  height: 23px;\n  line-height: 23px;\n  border: 1px solid #ccc;\n  font-size: 12px;\n  color: #666;\n  background: transparent;\n  float: left;\n}\n.yh-edit-image .yh-edit-image-local {\n  width: 20px;\n  height: 20px;\n  background: url(\"http://topic.lagou.com/v3/static/images/icons.png\") no-repeat -2px -194px;\n  position: absolute;\n  left: 200px;\n  top: 3px;\n}\n.yh-edit-image .yh-edit-imagefile {\n  width: 20px;\n  height: 20px;\n  border: none;\n  opacity: 0;\n  display: block;\n}\n", ""]);

// exports


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.yh-edit-tab {\n    width:250px;\n    height:520px;\n    box-shadow:0px 0px 6px #ccc;\n    background:#fff;\n    position:fixed;\n    right:0;\n    top:77px;\n    overflow-x: hidden;\n    overflow-y: scroll;\n}\n.yh-edit-tab .yh-edit-tabTitle{\n    width:100%;\n}\n.yh-edit-tab .yh-edit-tabTitle > div {\n    padding: 0 10px;\n    line-height: 26px;\n    float:left;\n    text-align:center;\n    font-size:14px;\n    color:#666;\n    background:#efefef;\n    cursor:pointer;\n}\n.yh-edit-tab .yh-edit-tabTitle > div:hover,\n.yh-edit-tab .yh-edit-tabTitle > div.yh-tab-active{\n    background:#ff0084;\n    color:#fff;\n}\n.yh-edit-tab .yh-edit-tabContent > div{\n    position: relative;\n    display:none;\n}\n.yh-edit-tab .yh-edit-tabContent > div.yh-tab-active{\n    display:block;\n}\n", ""]);

// exports


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports
exports.i(__webpack_require__(72), "");

// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* @import '../../../../../public/css/lib/swiper.min.css';*/\n.slider-style1 .yh-slider-container {\n    /* position:absolute; */\n}\n.slider-style1 .yh-slider-content {\n    /*position:absolute;\n    left:0;\n    top:0; */\n}\n.yh-module-selected > .yh-slider-container > .yh-slider-content{\n    top:20px;\n}\n.yh-slider-addone {\n    width: 100%;\n    height: 50px;\n    line-height: 50px;\n    margin: 0;\n    border: 1px solid #ccc;\n    font-size: 40px;\n    text-align: center;\n    background-color: #fff;\n    color: #666;\n    cursor: pointer;\n    box-sizing: border-box;\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    z-index: 1000;\n}\n", ""]);

// exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.yh-edit-layer {\n    /* width: 100%;\n    height: 100%; */\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index:1000;\n}\n.yh-delete-undo{\n    width:45px;\n    height:17px;\n    font-family: serif;\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n.yh-delete-undo .yh-delete,\n.yh-delete-undo .yh-undo {\n    width: 17px;\n    height: 17px;\n    line-height: 17px;\n    border: 1px solid #ff0084;\n    border-radius: 17px;\n    font-size: 12px;\n    text-align: center;\n    color: #ff0084;\n    cursor: pointer;\n    float:left;\n    margin:0 3px 0 0;\n}\n.yh-delete-undo .yh-delete {\n    font-family: initial;\n}\n.child-split {\n    line-height: 30px;\n    padding: 0 10px;\n    margin: 5px 0;\n    background-color: #ff0084;\n    color: #fff;\n    font-size: 14px;\n}\n", ""]);

// exports


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.yh-edit-yhtext {\n    width: 100%;\n    padding: 0 0 5px 0;\n    position:relative;\n}\n.yh-edit-yhtext .yh-edit-value{\n    width: 145px;\n}\n.yh-edit-yhtext .yh-edit-value input{\n    width: 113px;\n}\n", ""]);

// exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.yh-edit-request {\n    width: 100%;\n    padding: 0 0 5px 0;\n    position:relative;\n}\n.yh-edit-request .yh-edit-text{\n    width: 80px;\n    height: 25px;\n    line-height: 25px;\n    float:left;\n    text-align:right;\n    font-size:12px;\n    color:#666;\n}\n.yh-edit-request .yh-edit-value{\n    width: 140px;\n    padding:0 5px 0 0;\n    float:left;\n}\n.yh-edit-request .yh-edit-value input{\n    width: 93px;\n    height: 23px;\n    line-height: 23px;\n    border:1px solid #ccc;\n    float:left;\n    font-size: 12px;\n    color: #666;\n    background: transparent;\n}\n.yh-edit-request .yh-edit-value span {\n    width: 40px;\n    height: 25px;\n    line-height: 25px;\n    margin: 0 0 0 5px;\n    text-align: center;\n    font-size: 12px;\n    color: #fff;\n    float: left;\n    background: #ff0084;\n    cursor:pointer;\n}\n", ""]);

// exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.yh-edit-yhtext {\n    width: 100%;\n    padding: 0 0 5px 0;\n    position:relative;\n}\n.yh-edit-yhtext .yh-edit-value{\n    width: 145px;\n}\n.yh-edit-yhtext .yh-edit-value input{\n    width: 113px;\n}\n", ""]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.yh-edit-number {\n    width: 100%;\n    padding: 0 0 5px 0;\n    position:relative;\n}\n.yh-edit-number .yh-edit-value{\n    width: 145px;\n}\n.yh-edit-number .yh-edit-value input{\n    width: 113px;\n}\n", ""]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.yh-edit-checkbox {\n    width:100%;\n    padding:0 0 5px 0;\n    position:relative;\n}\n.yh-edit-checkbox .yh-edit-text{\n    width: 80px;\n    height: 25px;\n    line-height: 25px;\n    float:left;\n    text-align:right;\n    font-size:12px;\n    color:#666;\n    /*background: #fff;*/\n}\n.yh-edit-checkbox .yh-edit-value{\n    width:115px;\n    padding:0 5px 0 0;\n    /*background: #fff;*/\n    float:left;\n}\n.yh-edit-checkbox .yh-edit-value input {\n    width: 93px;\n    height: 23px;\n    line-height: 23px;\n    border:1px solid #ccc;\n    float:left;\n    font-size: 12px;\n    color: #666;\n    background: transparent;\n}\n.yh-edit-checkbox .yh-edit-value input.yh-edit-value-input-long{\n    width:113px;\n}\n.yh-edit-checkbox .yh-edit-value span {\n    width: 20px;\n    height: 25px;\n    line-height: 25px;\n    text-align: center;\n    font-size: 12px;\n    color: #666;\n    float:left;\n}\n.yh-edit-checkbox .yh-edit-choice {\n    width: 145px;\n    height: 30px;\n    line-height: 30px;\n    border: 1px solid #ccc;\n    position: absolute;\n    left: 80px;\n    top: 24px;\n    background-color: #fff;\n    z-index: 2;\n    color: #666;\n}\n", ""]);

// exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*******************\nuplist 样式\n***********************/\n.yh-uplist-set {\n    margin:5px 0;\n    background: #fff7fb;\n}\n.yh-uplist-set .yh-uplist-set-title {\n    position:relative;\n    padding:0 0 0 20px;\n    cursor:pointer;\n    font-size:14px;\n}\n.yh-uplist-set .yh-uplist-set-title .icon{\n    width:0;\n    height:0;\n    position:absolute;\n    left:5px;\n    top:2px;\n    border-top:7px solid transparent;\n    border-bottom:7px solid transparent;\n    border-left:7px solid #ff0084;\n}\n.yh-uplist-set .yh-uplist-set-title .listshow{\n    border-left:7px solid transparent;\n    border-right:7px solid transparent;\n    border-top:7px solid #ff0084;\n    top:6px;\n}\n.showup{\n    -webkit-animation:showup 0.3 both linear;\n    animation:showup 0.3 both linear;\n}\n@-webkit-keyframes showup{\n0% {\n}\n100% {\n        -webkit-transform:rotateZ(90deg);\n        transform:rotateZ(90deg);\n}\n}\n@keyframes showup{\n0% {\n}\n100% {\n        -webkit-transform:rotateZ(90deg);\n        transform:rotateZ(90deg);\n}\n}\n.hidedown{\n    -webkit-animation:hidedown 0.3 both linear;\n    animation:hidedown 0.3 both linear;\n}\n@-webkit-keyframes hidedown{\n0% {\n}\n100% {\n        -webkit-transform:rotateZ(0deg);\n        transform:rotateZ(0deg);\n}\n}\n@keyframes hidedown{\n0% {\n}\n100% {\n        -webkit-transform:rotateZ(0deg);\n        transform:rotateZ(0deg);\n}\n}\n.yh-uplist-set .yh-uplist-set-title .name {\n    color:#ff0084;\n    font-size:14px;\n    text-align:left;\n}\n.yh-uplist-set .yh-uplist-set-title .remove {\n    display: block;\n    width: 14px;\n    height: 14px;\n    line-height: 14px;\n    border: 1px solid #ff0084;\n    border-radius: 50%;\n    text-align: center;\n    font-size: 12px;\n    color: #ff0084;\n    position: absolute;\n    right: 0;\n    top: 2.5px;\n    cursor:pointer;\n}\n", ""]);

// exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.yh-edit-yhtextarea {\n    width: 100%;\n    padding: 0 0 5px 0;\n    position:relative;\n}\n.yh-edit-yhtextarea .yh-edit-text {\n    width: 80px;\n    height: 25px;\n    line-height: 25px;\n    float: left;\n    text-align: right;\n    font-size: 12px;\n    color: #666;\n}\n.yh-edit-yhtextarea .yh-edit-value{\n    width: 145px;\n    height: 60px;\n    float:left;\n}\n.yh-edit-yhtextarea .yh-edit-value textarea{\n    /*width: 113px;*/\n    height: 60px;\n    outline: none;\n    resize: none;\n}\n", ""]);

// exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.yh-edit-chooser {\n  width: 25px;\n  height: 25px;\n  float: left;\n  position: relative;\n}\n.yh-edit-chooser .yh-edit-vcolor {\n  width: 25px;\n  height: 25px;\n  border: none;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n.yh-edit-chooser .yh-edit-list {\n  width: 176px;\n  position: absolute;\n  right: 0;\n  top: 100%;\n  background: #fff;\n  padding: 2px 0 0 2px;\n  box-shadow: 0 0 10px #ccc;\n  display: none;\n  z-index: 10;\n}\n.yh-edit-chooser .yh-edit-list li {\n  width: 18px;\n  height: 18px;\n  margin: 0 2px 2px 0;\n  border: 1px solid #efefef;\n  cursor: pointer;\n  float: left;\n}\n.yh-edit-chooser .yh-edit-list li.transparent {\n  background: url(\"http://topic.lagou.com/v3/static/images/icons.png\") no-repeat 0 -1700px;\n}\n", ""]);

// exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.yh-edit-input {\n    width:100%;\n    padding:0 0 5px 0;\n    position:relative;\n}\n.yh-edit-input .yh-edit-text{\n    width: 80px;\n    height: 25px;\n    line-height: 25px;\n    float:left;\n    text-align:right;\n    font-size:12px;\n    color:#666;\n    /*background: #fff;*/\n}\n.yh-edit-input .yh-edit-value{\n    width:115px;\n    padding:0 5px 0 0;\n    /*background: #fff;*/\n    float:left;\n}\n.yh-edit-input .yh-edit-value input {\n    width: 93px;\n    height: 23px;\n    line-height: 23px;\n    border:1px solid #ccc;\n    float:left;\n    font-size: 12px;\n    color: #666;\n    background: transparent;\n}\n.yh-edit-input .yh-edit-value input.yh-edit-value-input-long{\n    width:113px;\n}\n.yh-edit-input .yh-edit-value span {\n    width: 20px;\n    height: 25px;\n    line-height: 25px;\n    text-align: center;\n    font-size: 12px;\n    color: #666;\n    float:left;\n}\n.yh-edit-input .yh-edit-choice {\n    width: 145px;\n    height: 30px;\n    line-height: 30px;\n    border: 1px solid #ccc;\n    position: absolute;\n    left: 80px;\n    top: 24px;\n    background-color: #fff;\n    z-index: 2;\n    color: #666;\n    font-size:12px;\n}\n.yh-eidt-combine.yh-edit-input {\n    width:82px;\n}\n.yh-eidt-combine.yh-edit-input .yh-edit-value{\n    width:82px;\n}\n.yh-eidt-combine.yh-edit-input .yh-edit-value input {\n    width:60px;\n}\n.yh-eidt-combine.yh-edit-color {\n    width:92px;\n}\n.yh-eidt-combine.yh-edit-color .yh-edit-value {\n    width:62px;\n}\n", ""]);

// exports


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".slider-style1{width:100%;overflow:hidden;position:relative}.slider-style1 .yh-slider-container{width:1920px;position:relative;left:50%;top:0;margin:0 0 0 -960px;padding:0 0 20px 0;overflow:hidden}.slider-style1 .yh-slider-content{width:90000px;position:relative}.slider-style1 .yh-slider-content>.block-style1{float:left}.slider-style1 .yh-slider-content>.block-style1>.yh-block-content{margin:0}.slider-style1 .arrow-left,.slider-style1 .arrow-right{width:80px;height:80px;background:url(http://topic.lagou.com/static/img/newEdit/carouselButton.png) no-repeat -80px 0;position:absolute;top:0;z-index:10;cursor:pointer;display:block}.slider-style1 .arrow-left{left:40px}.slider-style1 .arrow-left:hover{background-position:-80px -80px}.slider-style1 .arrow-right{background-position:0 0;right:40px}.slider-style1 .arrow-right:hover{background-position:0 -80px}.slider-style1 .pagination{width:60px;height:10px;position:absolute;left:50%;bottom:10px;margin:0 0 0 -30px;z-index:10}.slider-style1 .pagination>div,.slider-style1 .pagination>span{width:10px;height:10px;margin:0 5px;border-radius:10px;opacity:.5;background:#00c99b;float:left}.slider-style1 .pagination>div.active,.slider-style1 .pagination>span.active{opacity:1}.yh-slider-zoomin{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-box-sizing:content-box;box-sizing:content-box}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .yh-slider-slide,.swiper-container-3d .yh-slider-zoomin{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-coverflow .yh-slider-zoomin{-ms-perspective:1200px}.swiper-container-3d .yh-slider-slide{-webkit-transform-origin:0 50%;transform-origin:0 50%;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-flex-shrink:0;-ms-flex:0 0 auto;-ms-flex-negative:0;flex-shrink:0;width:100%;height:100%;position:relative}.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right{display:none}", ""]);

// exports


/***/ }),
/* 73 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(105);
module.exports = self.fetch.bind(self);


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(94)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(47),
  /* template */
  __webpack_require__(81),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-complicated.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-complicated.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-37523641", Component.options)
  } else {
    hotAPI.reload("data-v-37523641", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(93)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(80),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components-edit/yh-edit-tab.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] yh-edit-tab.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-27c6c62d", Component.options)
  } else {
    hotAPI.reload("data-v-27c6c62d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(27)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(26),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dagou/Documents/workspace/20161117work/ecom-topic-fe/src/editorPC/components/Slider/style1/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3471953d", Component.options)
  } else {
    hotAPI.reload("data-v-3471953d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "yh-edit-options",
    staticClass: "yh-edit-options clearfix",
    on: {
      "mouseleave": _vm.hideEditList
    }
  }, [_c('div', {
    staticClass: "yh-edit-text",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.showEditList($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.options.cn) + _vm._s(_vm.options.cn ? '：' : ''))]), _vm._v(" "), _c('div', {
    staticClass: "yh-edit-value",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.showEditList($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.parent[_vm.options.en] ? _vm.getDesignValue : _vm.value) + _vm._s(_vm.options.unit ? _vm.options.unit : ''))]), _vm._v(" "), _c('div', {
    staticClass: "yh-edit-arrow",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.showEditList($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    ref: "yh-edit-list",
    staticClass: "yh-edit-list"
  }, [_c('ul', _vm._l((_vm.options.options), function(one, index) {
    return _c('li', {
      style: ((_vm.options.en == 'font-size' ? ('font-size:' + one.value + _vm.options.realunit) : '')),
      attrs: {
        "value": one.value,
        "index": index
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.setValue($event)
        }
      }
    }, [_vm._v("\n                    " + _vm._s(one.cn) + _vm._s(_vm.options.unit ? _vm.options.unit : '') + "\n            ")])
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0597a0b6", module.exports)
  }
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "yh-edit-image clearfix"
  }, [_c('div', {
    staticClass: "yh-edit-text"
  }, [_vm._v(_vm._s(_vm.options.cn) + "：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.parent[_vm.options.en].value),
      expression: "parent[options.en].value"
    }],
    staticClass: "yh-edit-value",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.parent[_vm.options.en].value)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.parent[_vm.options.en].value = $event.target.value
      }, _vm.setValue]
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "yh-edit-image-local"
  }, [_c('input', {
    staticClass: "yh-edit-imagefile",
    attrs: {
      "type": "file",
      "accept": "image/gif,image/jpeg,image/jpg,image/png,image/svg",
      "stylename": _vm.options.en
    },
    on: {
      "change": function($event) {
        $event.stopPropagation();
        _vm.uploadFile($event)
      }
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-07cc861a", module.exports)
  }
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "yh-edit-tab"
  }, [_c('div', {
    staticClass: "clearfix yh-edit-tabTitle"
  }, _vm._l((_vm.props.base.tabs), function(tab, index) {
    return _c('div', {
      staticClass: "yh-tab-one",
      class: _vm.active == index ? 'yh-tab-active' : '',
      attrs: {
        "index": index
      },
      on: {
        "touchstart": function($event) {
          $event.stopPropagation();
          $event.preventDefault();
          _vm.changeTab($event)
        },
        "mousedown": function($event) {
          $event.stopPropagation();
          $event.preventDefault();
          _vm.changeTab($event)
        }
      }
    }, [_vm._v(_vm._s(tab.title))])
  })), _vm._v(" "), _c('div', {
    staticClass: "yh-edit-tabContent"
  }, _vm._l((_vm.props.base.tabs), function(tab, index) {
    return _c('div', {
      class: _vm.active == index ? 'yh-tab-active' : '',
      attrs: {
        "index": index
      }
    }, [_vm._t('content' + index)], 2)
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-27c6c62d", module.exports)
  }
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: _vm.elem_id + '-yh-edit-layer',
    staticClass: "yh-edit-layer clearfix hide"
  }, [_c('yh-edit-tab', {
    attrs: {
      "props": _vm.tabOptions
    }
  }, [(_vm.getContentStatus('css')) ? _c('div', {
    staticClass: "yh-edit-tab-content yh-edit-css clearfix",
    slot: _vm.setContentSlot('css')
  }, [(!_vm.elements || _vm.elements.length == 0) ? _c('div', {
    staticClass: "yh-component-set"
  }, _vm._l((_vm.css), function(one) {
    return (one.type != 'none') ? _c(_vm.setModule(one), {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && _vm.getConditionValue(one.conditionKey))))),
        expression: "!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
      }],
      tag: "div",
      attrs: {
        "parent": _vm.css,
        "options": one,
        "elem_id": _vm.elem_id,
        "ischild": _vm.ischild,
        "path": _vm.path
      }
    }) : _vm._e()
  })) : _c('div', {
    staticClass: "yh-component-set"
  }, [_c('yh-edit-uplist', {
    attrs: {
      "options": {
        name: '外壳基本样式'
      },
      "status": true
    }
  }, _vm._l((_vm.css), function(one) {
    return (one.type != 'none') ? _c(_vm.setModule(one), {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && _vm.getConditionValue(one.conditionKey))))),
        expression: "!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
      }],
      tag: "div",
      attrs: {
        "parent": _vm.css,
        "options": one,
        "elem_id": _vm.elem_id,
        "ischild": _vm.ischild,
        "path": _vm.path
      }
    }) : _vm._e()
  })), _vm._v(" "), _c('p', {
    staticClass: "child-split"
  }, [_vm._v("子组件设置")]), _vm._v(" "), _vm._l((_vm.elements[0].props.css), function(one) {
    return (one.type != 'none' && (!one.parentSetStatus || one.parentSetStatus == 'common')) ? _c(_vm.setModule(one), {
      tag: "div",
      attrs: {
        "parent": _vm.elements[0].props.css,
        "options": one,
        "ischildset": "ischildset",
        "elem_id": _vm.elem_id,
        "ischild": _vm.ischild,
        "path": _vm.path
      }
    }) : _vm._e()
  }), _vm._v(" "), _vm._l((_vm.elements), function(one, index) {
    return _c('yh-edit-uplist', {
      key: index,
      attrs: {
        "status": _vm.getChildCssStatus(index),
        "options": {
          name: _vm.elements[index].props.data[_vm.elements[index].props.yh_data_name].value
        },
        "removeStatus": true,
        "index": index,
        "parentID": _vm.elem_id,
        "path": _vm.path
      }
    }, _vm._l((_vm.elements[index].props.css), function(one) {
      return (one.type != 'none' && (one.parentSetStatus == 'child')) ? _c(_vm.setModule(one), {
        tag: "div",
        attrs: {
          "parent": _vm.elements[index].props.css,
          "options": one,
          "eindex": index,
          "ischildset": "ischildset",
          "elem_id": _vm.elem_id,
          "ischild": _vm.ischild,
          "path": _vm.path
        }
      }) : _vm._e()
    }))
  })], 2)]) : _vm._e(), _vm._v(" "), (_vm.getContentStatus('h5css')) ? _c('div', {
    staticClass: "yh-edit-tab-content yh-edit-deployh5 clearfix",
    slot: _vm.setContentSlot('h5css')
  }, [(!_vm.elements || _vm.elements.length == 0) ? _c('div', {
    staticClass: "yh-component-set"
  }, _vm._l((_vm.h5css), function(one) {
    return (one.type != 'none') ? _c(_vm.setModule(one), {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && _vm.getConditionValue(one.conditionKey))))),
        expression: "!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
      }],
      tag: "div",
      attrs: {
        "parent": _vm.h5css,
        "options": one,
        "elem_id": _vm.elem_id,
        "ischild": _vm.ischild,
        "path": _vm.path
      }
    }) : _vm._e()
  })) : _c('div', {
    staticClass: "yh-component-set"
  }, [_c('yh-edit-uplist', {
    attrs: {
      "options": {
        name: '外壳基本样式'
      },
      "status": true
    }
  }, _vm._l((_vm.h5css), function(one) {
    return (one.type != 'none') ? _c(_vm.setModule(one), {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && _vm.getConditionValue(one.conditionKey))))),
        expression: "!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
      }],
      tag: "div",
      attrs: {
        "parent": _vm.h5css,
        "options": one,
        "elem_id": _vm.elem_id,
        "ischild": _vm.ischild,
        "path": _vm.path
      }
    }) : _vm._e()
  })), _vm._v(" "), _c('p', {
    staticClass: "child-split"
  }, [_vm._v("子组件设置")]), _vm._v(" "), _vm._l((_vm.elements[0].props.h5css), function(one) {
    return (one.type != 'none' && (!one.parentSetStatus || one.parentSetStatus == 'common')) ? _c(_vm.setModule(one), {
      tag: "div",
      attrs: {
        "parent": _vm.elements[0].props.h5css,
        "options": one,
        "ischildset": "ischildset",
        "elem_id": _vm.elem_id,
        "ischild": _vm.ischild,
        "path": _vm.path
      }
    }) : _vm._e()
  }), _vm._v(" "), _vm._l((_vm.elements), function(one, index) {
    return _c('yh-edit-uplist', {
      key: index,
      attrs: {
        "status": _vm.getChildH5CssStatus(index),
        "options": {
          name: _vm.elements[index].props.data[_vm.elements[index].props.yh_data_name].value
        },
        "removeStatus": true,
        "index": index,
        "parentID": _vm.elem_id,
        "path": _vm.path
      }
    }, _vm._l((_vm.elements[index].props.h5css), function(one) {
      return (one.type != 'none' && (one.parentSetStatus == 'child')) ? _c(_vm.setModule(one), {
        tag: "div",
        attrs: {
          "parent": _vm.elements[index].props.h5css,
          "options": one,
          "eindex": index,
          "ischildset": "ischildset",
          "elem_id": _vm.elem_id,
          "ischild": _vm.ischild,
          "path": _vm.path
        }
      }) : _vm._e()
    }))
  })], 2)]) : _vm._e(), _vm._v(" "), (_vm.getContentStatus('data')) ? _c('div', {
    staticClass: "yh-edit-tab-content yh-edit-owndata clearfix",
    slot: _vm.setContentSlot('data')
  }, [(!_vm.elements || _vm.elements.length == 0) ? _c('div', {
    staticClass: "yh-component-set"
  }, _vm._l((_vm.owndata), function(one) {
    return (one.type != 'none') ? _c(_vm.setModule(one), {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: ((!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && _vm.getConditionValue(one.conditionKey))))) && _vm.getChildSetStatus(one)),
        expression: "(!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))) && getChildSetStatus(one)"
      }],
      tag: "div",
      attrs: {
        "parent": _vm.owndata,
        "options": one,
        "ischildset": "",
        "elem_id": _vm.elem_id,
        "ischild": _vm.ischild,
        "path": _vm.path,
        "parentmodule": _vm.parentmodule
      }
    }) : _vm._e()
  })) : _c('div', {
    staticClass: "yh-component-set"
  }, [_c('yh-edit-uplist', {
    attrs: {
      "options": {
        name: '外壳数据设置'
      },
      "status": true
    }
  }, _vm._l((_vm.owndata), function(one) {
    return (one.type != 'none') ? _c(_vm.setModule(one), {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && _vm.getConditionValue(one.conditionKey))))),
        expression: "!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
      }],
      tag: "div",
      attrs: {
        "parent": _vm.owndata,
        "options": one,
        "ischildset": "",
        "elem_id": _vm.elem_id,
        "ischild": _vm.ischild,
        "path": _vm.path
      }
    }) : _vm._e()
  })), _vm._v(" "), _c('p', {
    staticClass: "child-split"
  }, [_vm._v("子组件设置")]), _vm._v(" "), _vm._l((_vm.elements[0].props.owndata), function(one) {
    return (one.type != 'none' && (one.parentSetStatus && one.parentSetStatus == 'common')) ? _c(_vm.setModule(one), {
      tag: "div",
      attrs: {
        "parent": _vm.elements[0].props.owndata,
        "options": one,
        "ischildset": "ischildset",
        "elem_id": _vm.elem_id,
        "ischild": _vm.ischild,
        "path": _vm.path
      }
    }) : _vm._e()
  }), _vm._v(" "), _vm._l((_vm.elements), function(one, index) {
    return _c('yh-edit-uplist', {
      key: index,
      attrs: {
        "options": {
          name: _vm.elements[index].props.data[_vm.elements[index].props.yh_data_name].value
        },
        "status": _vm.getChildDataStatus(index),
        "removeStatus": true,
        "index": index,
        "parentID": _vm.elem_id,
        "path": _vm.path
      }
    }, _vm._l((_vm.elements[index].props.data), function(one) {
      return (one.type != 'none' && (!one.parentSetStatus || one.parentSetStatus == 'child')) ? _c(_vm.setModule(one), {
        tag: "div",
        attrs: {
          "parent": _vm.elements[index].props.data,
          "options": one,
          "eindex": index,
          "ischildset": "ischildset",
          "elem_id": _vm.elem_id,
          "ischild": _vm.ischild,
          "path": _vm.path
        }
      }) : _vm._e()
    }))
  })], 2)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "yh-delete-undo"
  }, [_c('div', {
    staticClass: "yh-delete",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.removeElement($event)
      }
    }
  }, [_vm._v("x")]), _vm._v(" "), _c('div', {
    staticClass: "yh-undo",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.undoElement($event)
      }
    }
  }, [_vm._v("√")])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-37523641", module.exports)
  }
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('yh-edit-uplist', {
    attrs: {
      "options": {
        name: _vm.options.cn
      },
      "status": _vm.options.value
    }
  }, [_vm._l((_vm.options.value), function(one, index) {
    return (_vm.getObjectStatus) ? _c('yh-edit-uplist', {
      key: index,
      attrs: {
        "options": {
          name: _vm.options.value[index][_vm.options.name].value
        },
        "status": _vm.options.value[index],
        "removeStatus": one.removeStatus
      }
    }, _vm._l((_vm.options.value[index]), function(one) {
      return (one.type != 'none') ? _c(_vm.setModule(one), {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: (_vm.getChildSetStatus(one) && (!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && _vm.getConditionValue(one.conditionKey)))))),
          expression: "getChildSetStatus(one) && (!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey)))))"
        }],
        tag: "div",
        attrs: {
          "parent": _vm.options.value[index],
          "eindex": _vm.eindex,
          "index": index,
          "options": one,
          "ischildset": _vm.ischildset,
          "elem_id": _vm.elem_id,
          "ischild": _vm.ischild,
          "path": _vm.path
        }
      }) : _vm._e()
    })) : _vm._e()
  }), _vm._v(" "), _vm._l((_vm.options.value), function(one) {
    return (!_vm.getObjectStatus && one.type != 'none') ? _c(_vm.setModule(one), {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.getChildSetStatus(one) && (!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && _vm.getConditionValue(one.conditionKey)))))),
        expression: "getChildSetStatus(one) && (!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey)))))"
      }],
      tag: "div",
      attrs: {
        "parent": _vm.options.value,
        "eindex": _vm.eindex,
        "options": one,
        "ischildset": _vm.ischildset,
        "elem_id": _vm.elem_id,
        "ischild": _vm.ischild,
        "path": _vm.path
      }
    }) : _vm._e()
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5c169c78", module.exports)
  }
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "yh-edit-request clearfix"
  }, [_c('div', {
    staticClass: "yh-edit-text"
  }, [_vm._v(_vm._s(_vm.options.cn) + _vm._s(_vm.options.cn ? '：' : ''))]), _vm._v(" "), _c('div', {
    staticClass: "yh-edit-value clearfix"
  }, [_c('input', {
    ref: "yh-edit-request-input",
    attrs: {
      "type": _vm.optionsData.type
    },
    domProps: {
      "value": _vm.parent[_vm.options.en] ? _vm.getDesignValue : (_vm.optionsData.type == 'number' ? 0 : '')
    }
  }), _vm._v(" "), _c('span', {
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.requestEvent($event)
      }
    }
  }, [_vm._v("获取")])]), _vm._v(" "), _vm._t("chooser")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5e76ac27", module.exports)
  }
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('yh-edit-input', {
    attrs: {
      "options": _vm.optionsData,
      "ischildset": _vm.ischildset,
      "eindex": _vm.eindex,
      "index": _vm.index,
      "path": _vm.path
    },
    on: {
      "setValue": _vm.setValue
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-64217a76", module.exports)
  }
}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('yh-edit-input', {
    attrs: {
      "options": _vm.optionsData,
      "ischildset": _vm.ischildset,
      "eindex": _vm.eindex,
      "index": _vm.index
    },
    on: {
      "setValue": _vm.setValue
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6f45ea3e", module.exports)
  }
}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "yh-edit-checkbox clearfix"
  }, [_c('div', {
    staticClass: "yh-edit-text"
  }, [_vm._v(_vm._s(_vm.options.cn) + _vm._s(_vm.options.cn ? '：' : ''))]), _vm._v(" "), _c('div', {
    staticClass: "yh-edit-value clearfix"
  }, [_c('input', {
    staticClass: "yh-edit-value-input-long",
    attrs: {
      "type": "checkbox",
      "name": _vm.elem_id + '_' + _vm.options.en
    },
    domProps: {
      "checked": _vm.parent[_vm.options.en] ? _vm.getDesignValue : false
    },
    on: {
      "change": _vm.setValue
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7a6bc34a", module.exports)
  }
}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.status) ? _c('div', {
    staticClass: "yh-uplist-set"
  }, [_c('div', {
    staticClass: "yh-uplist-set-title",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.toggleUplistContent($event)
      }
    }
  }, [_c('span', {
    staticClass: "icon"
  }), _vm._v(" "), _c('span', {
    staticClass: "name"
  }, [_vm._v(_vm._s(_vm.options.name))]), _vm._v(" "), (_vm.removeStatus) ? _c('span', {
    staticClass: "remove",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.removeElement($event)
      }
    }
  }, [_vm._v("x")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "yh-uplist-set-content hide"
  }, [_vm._t("default")], 2)]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-99191d5e", module.exports)
  }
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "yh-edit-yhtextarea clearfix"
  }, [_c('div', {
    staticClass: "yh-edit-text"
  }, [_vm._v(_vm._s(_vm.optionsData.name) + _vm._s(_vm.optionsData.name ? '：' : ''))]), _vm._v(" "), _c('div', {
    staticClass: "yh-edit-value clearfix"
  }, [_c('textarea', {
    class: {
      'yh-edit-value-input-long': !_vm.optionsData.unit
    },
    domProps: {
      "value": _vm.optionsData.style[_vm.optionsData.stylename] ? _vm.getDesignValue : (_vm.optionsData.type == 'number' ? 0 : '')
    },
    on: {
      "input": _vm.setValue
    }
  }), _vm._v(" "), (_vm.optionsData.unit) ? _c('span', [_vm._v(_vm._s(_vm.optionsData.unit))]) : _vm._e()]), _vm._v(" "), _vm._t("chooser")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-a3abb35c", module.exports)
  }
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('yh-edit-input', {
    attrs: {
      "options": _vm.optionsData,
      "ischildset": _vm.ischildset,
      "eindex": _vm.eindex,
      "index": _vm.index,
      "path": _vm.path
    },
    on: {
      "setValue": _vm.setValue
    }
  }, [_c('div', {
    staticClass: "yh-edit-chooser",
    slot: "chooser"
  }, [_c('input', {
    staticClass: "yh-edit-vcolor",
    attrs: {
      "type": "color"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.setChangeStatus($event)
      },
      "change": function($event) {
        $event.stopPropagation();
        _vm.colorChange($event)
      }
    }
  }), _vm._v(" "), _c('ul', {
    ref: "yh-edit-list",
    staticClass: "yh-edit-list clearfix"
  }, _vm._l((_vm.list), function(one) {
    return _c('li', {
      class: one == 'transparent' ? 'transparent' : '',
      style: ('background-color:' + one),
      attrs: {
        "value": one
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.setColor($event)
        }
      }
    })
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-b2f8020a", module.exports)
  }
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "yh-edit-input clearfix",
    class: _vm.setClassname,
    on: {
      "mouseenter": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.showChoice($event)
      },
      "mouseleave": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.hideChoice($event)
      }
    }
  }, [(_vm.options.name) ? _c('div', {
    staticClass: "yh-edit-text"
  }, [_vm._v(_vm._s(_vm.options.name) + _vm._s(_vm.options.name ? '：' : ''))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "yh-edit-value clearfix"
  }, [_c('input', {
    class: {
      'yh-edit-value-input-long': !_vm.options.unit
    },
    attrs: {
      "type": _vm.options.type,
      "readonly": _vm.setReadonlyStatus
    },
    domProps: {
      "value": _vm.options.style[_vm.options.stylename] ? _vm.getDesignValue : (_vm.options.type == 'number' ? 0 : '')
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.inputSelected($event)
      },
      "input": _vm.setValue
    }
  }), _vm._v(" "), (_vm.options.unit) ? _c('span', [_vm._v(_vm._s(_vm.options.unit))]) : _vm._e()]), _vm._v(" "), (_vm.getDefaultStatus) ? _c('div', {
    ref: "yh-edit-choice",
    staticClass: "yh-edit-choice hide",
    attrs: {
      "value": _vm.options.style[_vm.options.stylename].value == _vm.options.default ? _vm.options.ivalue : _vm.options.default
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.setChoice($event)
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.options.style[_vm.options.stylename].value == _vm.options.default ? '输入数值' : _vm.options.default) + "\n    ")]) : _vm._e(), _vm._v(" "), _vm._t("chooser")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-d3a0c83c", module.exports)
  }
}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(58);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("721a21f7", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0597a0b6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-options.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0597a0b6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-options.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(59);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7140fc22", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-07cc861a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-image.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-07cc861a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-image.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(60);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("a732bfd2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-27c6c62d\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-tab.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-27c6c62d\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-tab.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(62);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("64282a07", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-37523641\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-complicated.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-37523641\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-complicated.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(63);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("55d211a1", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5c169c78\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-mutiple.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5c169c78\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-mutiple.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(64);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0a0d33d4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5e76ac27\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-request.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5e76ac27\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-request.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4dc74a52", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-64217a76\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-text.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-64217a76\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-text.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("06f8c9dd", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6f45ea3e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-number.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6f45ea3e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-number.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0a454bef", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a6bc34a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-checkbox.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a6bc34a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-checkbox.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("b029133e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-99191d5e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-uplist.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-99191d5e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-uplist.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(69);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1821cc19", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a3abb35c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-textarea.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a3abb35c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-textarea.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e7d93d72", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b2f8020a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-color.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b2f8020a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-color.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5d7e6268", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d3a0c83c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-input.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d3a0c83c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./yh-edit-input.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 104 */
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


/***/ }),
/* 105 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ })
/******/ ]);