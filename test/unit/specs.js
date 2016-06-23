/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(5);

	__webpack_require__(10);

	__webpack_require__(19);

	__webpack_require__(20);

	__webpack_require__(21);

	__webpack_require__(24);

	__webpack_require__(25);

	__webpack_require__(26);

	__webpack_require__(27);

	__webpack_require__(28);

	__webpack_require__(29);

	var UA = navigator.userAgent.toLowerCase();
	window.isIE9 = UA.indexOf('msie 9.0') > 0;
	window.isIE = UA.indexOf('trident') > 0;

	// IE has some shaky timer precision issues when using the Promise polyfill...
	window.wait = isIE ? 100 : 30;
	// import Router from '../../../dist/nova-router.js'
	// import '../../../example/basic/component/nova-view/main.js'


	// window.router = new Router();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	(function () {
	  function n(t) {
	    var n = function r(n) {
	      return n && e.Initial.set(n), new t();
	    };return n.realConstructor = t, n;
	  }var e = function r(e) {
	    var t = r.Utils.mix({}, r.Base);r.Utils.chainObject(e, t);var i = { prototype: e };if (e["extends"]) {
	      var s = document.createElement(e["extends"]);s.toString() == "[object HTMLUnknownElement]" && console.warn("extends to HTMLUnknownElement"), r.Utils.chainObject(t, s.constructor.prototype), i["extends"] = e["extends"];
	    } else r.Utils.chainObject(t, HTMLElement.prototype);r.Style.init(e);var o = document.registerElement(e.is, i);return n(o);
	  };e.Components = {}, e.Loader = {};var t = function i(t) {
	    e.Utils.mix(t, i.exports);var n = e(t);return i.exports = {}, n;
	  };t.exports = {}, window.Nova = e, window.NovaExports = t;
	})(), Nova.CssParse = function () {
	  function t(e) {
	    return e[0].selector.indexOf(r) >= 0;
	  }function n(e) {
	    return e.replace(o.customProp, "").replace(o.mixinProp, "").replace(o.mixinApply, "").replace(o.varApply, "");
	  }var e = { parse: function parse(t) {
	      return t = this._clean(t), this._parseCss(this._lex(t), t);
	    }, _clean: function _clean(t) {
	      return t.replace(o.comments, "").replace(o.port, "");
	    }, _lex: function _lex(t) {
	      var n = { start: 0, end: t.length },
	          r = n;for (var i = 0, s = 0, o = t.length; i < o; i++) {
	        switch (t[i]) {case this.OPEN_BRACE:
	            r.rules || (r.rules = []);var u = r,
	                a = u.rules[u.rules.length - 1];r = { start: i + 1, parent: u, previous: a }, u.rules.push(r);break;case this.CLOSE_BRACE:
	            r.end = i + 1, r = r.parent || n;}
	      }return n;
	    }, _parseCss: function _parseCss(t, n) {
	      var u = n.substring(t.start, t.end - 1);t.parsedCssText = t.cssText = u.trim();if (t.parent) {
	        var a = t.previous ? t.previous.end : t.parent.start;u = n.substring(a, t.start - 1), u = u.substring(u.lastIndexOf(";") + 1);var f = t.parsedSelector = t.selector = u.trim();t.atRule = f.indexOf(s) === 0, t.atRule ? f.indexOf(i) === 0 ? t.type = this.types.MEDIA_RULE : f.match(o.keyframesRule) && (t.type = this.types.KEYFRAMES_RULE) : f.indexOf(r) === 0 ? t.type = this.types.MIXIN_RULE : t.type = this.types.STYLE_RULE;
	      }var l = t.rules;if (l) for (var c = 0, h = l.length, p; c < h && (p = l[c]); c++) {
	        this._parseCss(p, n);
	      }return t;
	    }, stringify: function stringify(r, i, s) {
	      s = s || "";var o = "";if (r.cssText || r.rules) {
	        var u = r.rules;if (u && (i || !t(u))) for (var a = 0, f = u.length, l; a < f && (l = u[a]); a++) {
	          o = this.stringify(l, i, o);
	        } else o = i ? r.cssText : n(r.cssText), o = o.trim(), o && (o = "  " + o + "\n");
	      }return o && (r.selector && (s += r.selector + " " + this.OPEN_BRACE + "\n"), s += o, r.selector && (s += this.CLOSE_BRACE + "\n\n")), s;
	    }, types: { STYLE_RULE: 1, KEYFRAMES_RULE: 7, MEDIA_RULE: 4, MIXIN_RULE: 1e3 }, OPEN_BRACE: "{", CLOSE_BRACE: "}" },
	      r = "--",
	      i = "@media",
	      s = "@",
	      o = { comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, port: /@import[^;]*;/gim, customProp: /(?:^|[\s;])--[^;{]*?:[^{};]*?;/gim, mixinProp: /(?:^|[\s;])--[^;{]*?:[^{;]*?{[^}]*?};?/gim, mixinApply: /@apply[\s]*\([^)]*?\)[\s]*;/gim, varApply: /[^;:]*?:[^;]*var[^;]*;/gim, keyframesRule: /^@[^\s]*keyframes/ };return e;
	}(), function () {
	  var e = { _caseMap: {}, dashToCamelCase: function dashToCamelCase(t) {
	      var n = this._caseMap[t];return n ? n : t.indexOf("-") < 0 ? this._caseMap[t] = t : this._caseMap[t] = t.replace(/-([a-z])/g, function (e) {
	        return e[1].toUpperCase();
	      });
	    }, camelToDashCase: function camelToDashCase(t) {
	      var n = this._caseMap[t];return n ? n : this._caseMap[t] = t.replace(/([a-z][A-Z])/g, function (e) {
	        return e[0] + "-" + e[1].toLowerCase();
	      });
	    } };Nova.CaseMap = e;
	}(), function () {
	  var e = { mix: function mix(t, n, r) {
	      if (n && n.constructor == Array) {
	        for (var i = 0, s = n.length; i < s; i++) {
	          this.mix(t, n[i], r);
	        }return t;
	      }if (typeof r == "function") for (i in n) {
	        t[i] = r(t[i], n[i], i);
	      } else for (i in n) {
	        if (r || !(t[i] || i in t)) t[i] = n[i];
	      }return t;
	    }, chainObject: function chainObject(t, n) {
	      if (t && n && t !== n) if (!Object.__proto__) t = this.mix(Object.create(n), t, !0);else {
	        var r = t;while (r.__proto__ && r.__proto__.__proto__) {
	          r = r.__proto__;
	        }r.__proto__ = n;
	      }return t;
	    }, tmpl: function tmpl(t, n, r) {
	      var i = !0;t.trim().match(/^{{.*}}$/) && t.trim().match(/{{(.*?)}}/g).length == 1 && (i = !1);var s;return t = t.replace(/\{\{(.*?)\}\}/g, function (e, t) {
	        if (!t) return "";try {
	          return s = new Function("data", "with(data){return (" + t + ");}")(n), r ? r(s, t) : s;
	        } catch (i) {
	          return s = e, e;
	        }
	      }), i ? t : s;
	    }, setPropByPath: function setPropByPath(t, n, r) {
	      var i = n.split("."),
	          s = t;for (var o = 0, u = i.length; o < u - 1; o++) {
	        if (!s) return;s = s[i[o]];
	      }s && (s[i[i.length - 1]] = r);
	    }, getPropByPath: function getPropByPath(t, n) {
	      var r = n.split("."),
	          i = t;for (var s = 0, o = r.length; s < o; s++) {
	        try {
	          i = i[r[s]];
	        } catch (u) {
	          return;
	        }
	      }return i;
	    } };Nova.Utils = e;
	}(), function () {
	  var e = { set: function set(t) {
	      Nova._initData = t;
	    }, get: function get() {
	      return Nova._initData;
	    }, clear: function clear() {
	      delete Nova._initData;
	    }, has: function has() {
	      return !!Nova._initData;
	    } };Nova.Initial = e;
	}(), function () {
	  Nova.Utils.mix(Nova, { ready: function ready(t, n) {
	      function s() {
	        i == r && n();
	      }t.constructor != Array && (t = [t]);var r = t.length,
	          i = 0;t.forEach(function (e) {
	        e._nova && e._nova.isReady ? i++ : e.addEventListener("nova.ready", function () {
	          i++, s();
	        });
	      }), s();
	    } });
	}(), function () {
	  Nova.devOpt = { umd: { baseUrl: "", root: "window" } };
	}(), function () {
	  var e = undefined,
	      t = { init: function init(t) {
	      if (!t.stylesheet || !t.stylesheet.trim()) return;var n = t.stylesheet;n = this.compile(n, t.is), this.attach(n);
	    }, compile: function compile(t, n) {
	      var r = Nova.CssParse.parse(t),
	          i = r.rules;return this.compileRules(i, n);
	    }, compileRules: function compileRules(t, n) {
	      var r = this,
	          i = "";return t.forEach(function (e) {
	        e.type == Nova.CssParse.types.STYLE_RULE && function () {
	          var t = e.selector;t = t.replace(/([+>]|::content|::shadow)/g, function (e) {
	            return " " + e + " ";
	          }).replace(/,/g, " , "), t = t.split(/\s+/);var r = "";t.every(function (e, i) {
	            if (e.indexOf(":host") >= 0) r += e.replace(":host", n) + " ";else if (e == "::content" || e == "::shadow") {
	              if (i > 0) {
	                for (var s = i + 1; s < t.length; s++) {
	                  r += t[s] + " ";
	                }return !1;
	              }r += e;
	            } else if ("> + ,".split(" ").indexOf(e) >= 0) r += e + " ";else {
	              var o = e.indexOf(":");o < 0 ? r += e + "." + n + " " : r += e.slice(0, o) + "." + n + e.slice(o) + " ";
	            }return !0;
	          });var s = e.cssText;i += r + "\n{\n" + s + "\n}\n";
	        }();if (e.type == Nova.CssParse.types.KEYFRAMES_RULE) {
	          var t = e.selector,
	              s = e.cssText;i += t + "\n{\n" + s + "\n}\n";
	        }if (e.type == Nova.CssParse.types.MEDIA_RULE) {
	          var t = e.selector,
	              s = r.compileRules(e.rules || [], n);i += t + "\n{\n" + s + "\n}\n";
	        }
	      }), i;
	    }, attach: function attach(n) {
	      var r = document.head,
	          i = document.createElement("style");i.innerHTML = n, e ? r.insertBefore(i, e.nextSibling) : r.insertBefore(i, r.firstChild), e = i;
	    } };Nova.Style = t;
	}(), function () {
	  function r(e, t) {
	    !this._eventListeners && (this._eventListeners = {}), !this._eventListeners[e] && (this._eventListeners[e] = new Map());var n = this,
	        r = this._eventListeners[e],
	        i = r.get(t);return i || (i = function i(e) {
	      var r = [e].concat(e.detail);t.apply(n, r);
	    }, r.set(t, i)), i;
	  }function i(e, t) {
	    if (!this._eventListeners || !this._eventListeners[e]) return;var n = this._eventListeners[e],
	        r = n.get(t);return n["delete"](t), r;
	  }if (!window.CustomEvent) {
	    var e = function e(t, n) {
	      n = n || { bubbles: !1, cancelable: !1, detail: undefined };var r = document.createEvent("Events");return r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail, r;
	    };e.prototype = window.Event.prototype, window.CustomEvent = e;
	  }var t = " ",
	      n = { on: function on(n, i, s) {
	      n = n.split(t);var o = undefined;while (o = n.shift()) {
	        var u = r.call(this, o, i);this.addEventListener(o, u, s);
	      }
	    }, off: function off(n, r, s) {
	      n = n.split(t);var o = undefined;while (o = n.shift()) {
	        var u = i.call(this, o, r);u && this.removeEventListener(o, u, s);
	      }
	    }, trigger: function trigger(n, r) {
	      n = n.split(t);var i = undefined;while (i = n.shift()) {
	        var s = new CustomEvent(i, { detail: r });this.dispatchEvent(s);
	      }
	    } };Nova.EventBehavior = n;
	}(), function () {
	  function n(t, n, i) {
	    var s = n.split(e),
	        o,
	        u;while (o = s.shift()) {
	      u = this[o];if (!u || typeof u != "function") break;u._isAspected || r.call(this, o), this.on(t + ":" + o, i);
	    }
	  }function r(e) {
	    var t = this[e],
	        n,
	        r,
	        i = this;this[e] = function () {
	      r = this.trigger("before:" + e, Array.prototype.slice.call(arguments));if (r === !1) return;return n = t.apply(this, arguments), this.trigger("after:" + e, Array.prototype.slice.call(arguments)), n;
	    }, this[e]._isAspected = !0;
	  }var e = " ",
	      t = { before: function before(t, r) {
	      return n.call(this, "before", t, r), this;
	    }, after: function after(t, r) {
	      return n.call(this, "after", t, r), this;
	    } };Nova.AspectBehavior = t;
	}(), function () {
	  function t(e, t) {
	    this.trigger.apply(this, arguments), this.trigger(this._propsCommonChangeEvent, t);
	  }function n() {
	    var e = {},
	        t = this.__proto__;this.__proto__ = e, e.__proto__ = t;for (var n in this.props) {
	      this.props.hasOwnProperty(n) && (o.call(this, n), u.call(this, n, this.props[n]));
	    }this._nova.attrsToPropsMap = r.call(this);for (var n in this.props) {
	      this.props.hasOwnProperty(n) && a.call(this, n, this.props[n]);
	    }
	  }function r() {
	    var e = this,
	        t = {};return Array.prototype.slice.call(this.attributes || []).forEach(function (n) {
	      if (n.constructor == Attr) {
	        var r = n.name,
	            i = n.value,
	            s = Nova.CaseMap.dashToCamelCase(r),
	            o = s.indexOf(".") >= 0,
	            u = s.split(".")[0],
	            a = e.props[u];if (e.hasProperty(u)) {
	          var f = t[u] || {};t[u] = f, o ? (f.subProps = f.subProps || [], f.subProps.push({ path: s, value: i })) : Nova.Utils.mix(f, { path: s, value: l.call(e, r, i, a) });
	        }
	      }
	    }), t;
	  }function i(e, t) {
	    var n = Nova.CaseMap.dashToCamelCase(e),
	        r = n.split(".")[0],
	        i = n.indexOf(".") >= 0,
	        s = this.props[r];i ? this.set(n, t) : this[r] = l.call(this, e, t, s);
	  }function s(e) {
	    var t = this,
	        n = Nova.CaseMap.camelToDashCase(e),
	        r = this._nova.attrsToPropsMap[e];r.hasOwnProperty("value") ? this[e] = r.value : function () {
	      var n = f(t.props[e]);r.subProps.forEach(function (e) {
	        var t = e.path.replace(/^(.+)\./, "");Nova.Utils.setPropByPath(n, t, e.value);
	      }), t[e] = n;
	    }();
	  }function o(e) {
	    var t = this.props[e];this._propTypes.indexOf(t) >= 0 && (this.props[e] = { type: this.props[e] });
	  }function u(e, n) {
	    var r = this,
	        i = "_prop_";Object.defineProperty(this.__proto__, e, { get: function get() {
	        return r[i + e];
	      }, set: function set(s) {
	        var o = r[i + e];if (s == o || s != s && o != o) return;r[i + e] = s, t.call(r, r._getPropChangeEventName(e), [o, s, e]);
	      } }), n.observer && this.on(r._getPropChangeEventName(e), function () {
	      r[n.observer] && r[n.observer].apply(r, arguments);
	    });
	  }function a(e, t) {
	    var n = this[e],
	        r = this.hasOwnProperty(e);delete this[e];var i = Nova.CaseMap.camelToDashCase(e);this._nova.attrsToPropsMap[e] ? s.call(this, e) : r ? this[e] = n : this[e] = f(t);
	  }function f(e) {
	    var t;return e.hasOwnProperty("value") && (typeof e.value == "function" ? t = e.value.apply(this) : t = e.value), t;
	  }function l(e, t, n) {
	    var r = n.type;r != String && t && (t = t.trim());var i = t;switch (r) {case Object:case Array:
	        try {
	          i = JSON.parse(t);
	        } catch (s) {
	          i = null, console.warn("Nova::Attributes: could not decode Array as JSON");
	        }break;case Number:
	        i = Number(t);break;case Date:
	        i = new Date(t);break;case Boolean:
	        return this.hasAttribute(e) && t != "false";}return i;
	  }var e = { props: function props() {}, _propTypes: [Object, Number, String, Boolean, Date, Array], _propsCommonChangeEvent: "_propsChanged", createdHandler: function createdHandler() {
	      this.beforePropsInit && this.beforePropsInit(), this.props = Nova.Utils.mix({}, [this.props]), n.call(this);
	    }, attributeChangedHandler: function attributeChangedHandler(t, n, r) {
	      var s = Nova.CaseMap.dashToCamelCase(t),
	          o = s.split(".")[0];this.hasProperty(o) && i.call(this, t, r);
	    }, set: function set(n, r, i) {
	      var s = n.split("."),
	          o = this[s[0]],
	          u = this.get(n);Nova.Utils.setPropByPath(this, n, r), (s.length != 1 || this.get(n) == r) && u != r && t.call(this, this._getPropChangeEventName(s[0]), [o, this[s[0]], n]);
	    }, get: function get(t) {
	      return Nova.Utils.getPropByPath(this, t);
	    }, addProperty: function addProperty(t, n) {
	      this.props[t] = n, u.call(this, t, n), a.call(this, t, n);
	    }, hasProperty: function hasProperty(t) {
	      return !!this.props[t];
	    }, notifyPath: function notifyPath(n) {
	      var r = n.split(",");t.call(this, this._getPropChangeEventName(r[0]), [this[r[0]], this[r[0]], n]);
	    }, _getPropChangeEventName: function _getPropChangeEventName(t) {
	      return "_" + t + "Changed";
	    } };Nova.PropBehavior = e;
	}(), function () {
	  Nova.ExpressionParser = { BIND_TYPES: { TEXT: 1, PROPERTY: 2, ATTRIBUTE: 3, EVENT: 4 }, ANNOTATION_REGEXP: /{{.+?}}/g, SCOPED_ELEMENTS: ["TEMPLATE-REPEAT-ITEM", "TEMPLATE"], parse: function parse(t, n) {
	      var r = new Map();return this._parseNode(t, n, r), r;
	    }, _parseNode: function _parseNode(t, n, r) {
	      t.nodeType == Node.TEXT_NODE ? this._parseTextNode(t, n, r) : this._parseElementNode(t, n, r);
	    }, _parseTextNode: function _parseTextNode(t, n, r) {
	      var i = t.textContent;if (!this._testEscape(i)) return;var s = this,
	          o = this._parseExpression(i);Nova.Utils.mix(o, [{ type: this.BIND_TYPES.TEXT, scope: n }]), r.set(t, [o]);
	    }, _parseElementNode: function _parseElementNode(t, n, r) {
	      var i = this,
	          s = [];Array.prototype.slice.call(t.attributes || []).forEach(function (e) {
	        if (e.constructor == Attr && i._testEscape(e.value)) {
	          var r = i._getTypeByAttrName(e.name),
	              o = { type: r, scope: n };switch (r) {case i.BIND_TYPES.EVENT:
	              o.event = Nova.CaseMap.dashToCamelCase(e.name.match(/^on-(.+)$/)[1]), o.callback = i._parseCallbackAnnotation(e.value);break;case i.BIND_TYPES.ATTRIBUTE:case i.BIND_TYPES.PROPERTY:
	              o.name = r == i.BIND_TYPES.ATTRIBUTE ? e.name.slice(0, -1) : Nova.CaseMap.dashToCamelCase(e.name), Nova.Utils.mix(o, [i._parseExpression(e.value)]);}t.removeAttribute(e.name), s.push(o);
	        }
	      }), s.length > 0 && r.set(t, s), this.SCOPED_ELEMENTS.indexOf(t.tagName) < 0 && t.childNodes && Array.prototype.slice.call(t.childNodes).forEach(function (e) {
	        i._parseNode(e, n, r);
	      });
	    }, _getTypeByAttrName: function _getTypeByAttrName(t) {
	      return t.match(/^on-(.+)$/) ? this.BIND_TYPES.EVENT : t[t.length - 1] == "_" ? this.BIND_TYPES.ATTRIBUTE : this.BIND_TYPES.PROPERTY;
	    }, _parseExpression: function _parseExpression(t) {
	      var n = this,
	          r = [],
	          i = undefined,
	          s = undefined,
	          o = [];return t.replace(this.ANNOTATION_REGEXP, function (e) {
	        r.push(n._parseAnnotation(e));
	      }), /^{{\s*([_$a-zA-Z][\w_\$\d\[\].:]*)\s*}}$/.test(t.trim()) && (i = !0, s = r[0].event), r.forEach(function (e) {
	        !i && e.event && console.warn("Cannot bind to non left value"), e.relatedProps.forEach(function (e) {
	          o.indexOf(e) < 0 && o.push(e);
	        });
	      }), { value: t, isLeftValue: i, event: s, relatedProps: o, annotations: r };
	    }, _parseAnnotation: function _parseAnnotation(t) {
	      var n = [],
	          r = t.slice(2).slice(0, -2).trim().split("::"),
	          i = r[0],
	          s = r[1],
	          o = undefined,
	          u = i.replace(/"/g, "'").replace(/\\\'/g, "").replace(/'.*?'/g, "");return u.replace(/([_$a-zA-Z][\w_\$\d\[\].]*)/g, function (e, t) {
	        n.push({ name: t.split(".")[0], path: t });
	      }), { value: t, relatedProps: n, event: s };
	    }, _parseCallbackAnnotation: function _parseCallbackAnnotation(t) {
	      var n = t.match(/^{{([_$a-zA-Z][\w_\$\d]*)}}$/);return n ? n[1] : undefined;
	    }, _testEscape: function _testEscape(t) {
	      return t.match(this.ANNOTATION_REGEXP);
	    } };
	}(), function () {
	  Nova.ExpressionEvaluator = { compile: function compile(t) {
	      var n = this,
	          r = t.annotations,
	          i = t.scope,
	          s = this.getTmplData(t, i),
	          o = this.compileTmplString(t);return this.evaluate(o, s, t);
	    }, evaluate: function evaluate(t, n, r) {
	      return Nova.Utils.tmpl(t, n);
	    }, compileTmplString: function compileTmplString(t) {
	      var n = this;return t.tmplString || function () {
	        var e = t.value;t.annotations.forEach(function (t) {
	          var r = n.compileAnnotationTmplString(t);e = e.replace(t.value, r);
	        }), t.tmplString = e;
	      }(), t.tmplString;
	    }, compileAnnotationTmplString: function compileAnnotationTmplString(t) {
	      var n = this,
	          r = t.value;return r = r.replace(/::.+?}}/g, "}}"), t.relatedProps.forEach(function (e) {
	        var t = e.path;r = r.replace(new RegExp(t, "g"), function (e) {
	          var n = t.replace(/\.(\d+)($|\.)/g, function (e, t, n) {
	            return "[" + t + "]" + n;
	          });return n;
	        });
	      }), r;
	    }, getTmplData: function getTmplData(t, n) {
	      var r = {};return t.relatedProps.forEach(function (e) {
	        var t = n;while (t) {
	          if ((t == n || t.enumerableAsParentScope) && t.hasProperty(e.name)) {
	            r[e.name] = t[e.name];break;
	          }t = t._nova.parentScope;
	        }
	      }), r;
	    } };
	}(), function () {
	  function t(e, t) {
	    var r = this;if (t.type == Nova.ExpressionParser.BIND_TYPES.EVENT) {
	      var i = n.call(r, t.callback, !0);i && a.call(i, e, t.event, t);
	    } else {
	      t.relatedProps.forEach(function (i) {
	        var s = n.call(r, i.name);s && u.call(s, e, i.name, i.path, t), r._nova.binds.allBindings.push(t);
	      });if (t.isLeftValue) {
	        var i = n.call(r, t.relatedProps[0].name);i && t.event && a.call(i, e, t.event, t), i && t.type == Nova.ExpressionParser.BIND_TYPES.PROPERTY && a.call(i, e, this._getPropChangeEventName(t.name), t);
	      }
	    }
	  }function n(e, t) {
	    var n = this;while (n) {
	      if (n == this || n.enumerableAsParentScope) {
	        if (!t && n.hasProperty(e)) break;if (t && typeof n[e] == "function") break;
	      }n = n._nova.parentScope;
	    }return n;
	  }function r() {
	    this.on(this._propsCommonChangeEvent, s);
	  }function i() {
	    var e = document.createElement("div");return e.innerHTML = this.template, this.compileNodes(e), e;
	  }function s(e, t, n, r) {
	    o.call(this, r);
	  }function o(e) {
	    var t = this,
	        n = e ? e.split(".")[0] : "",
	        r = this._nova.binds.hostToChild[n];r && r.forEach(function (n, r) {
	      n && n.forEach(function (n) {
	        if (n.propPath.slice(0, e.length) == e) {
	          var i = Nova.ExpressionEvaluator.compile(n.bindObj);c.call(t, r, i, n.bindObj);
	        }
	      });
	    });
	  }function u(e, t, n, r) {
	    var i = this._nova.binds.hostToChild[t] || new Map();this._nova.binds.hostToChild[t] = i;var s = i.get(e) || [];i.set(e, s), s.push({ propPath: n, bindObj: r });
	  }function a(e, t, n) {
	    var r = this,
	        i = this._nova.binds.childToHost.get(e) || {};this._nova.binds.childToHost.set(e, i);if (!i[t]) {
	      i[t] = [];var s = function s(_s) {
	        i[t].forEach(function (t) {
	          if (t.type == Nova.ExpressionParser.BIND_TYPES.EVENT) {
	            var n = [_s].concat(_s.detail || []);r[t.callback].apply(r, n);
	          } else h.call(r, e, t.relatedProps[0].path, t);
	        });
	      };e.addEventListener(t, s), i[t].callback = s;
	    }i[t].push(n);
	  }function f(e) {
	    var t = this;for (var n in this._nova.binds.hostToChild) {
	      var r = this._nova.binds.hostToChild[n].get(e);r && r.forEach(function (e) {
	        var n = t._nova.binds.allBindings.indexOf(e.bindObj);t._nova.binds.allBindings.splice(n, 1);
	      }), this._nova.binds.hostToChild[n]["delete"](e);
	    }
	  }function l(e) {
	    var t = this._nova.binds.childToHost.get(e);if (t) {
	      for (var n in t) {
	        t.hasOwnProperty(n) && e.removeEventListener(n, t[n].callback);
	      }this._nova.binds.childToHost["delete"](e);
	    }
	  }function c(e, t, n) {
	    switch (n.type) {case Nova.ExpressionParser.BIND_TYPES.ATTRIBUTE:
	        e.getAttribute(n.name) != t && (e.setAttribute(n.name, t), t === !1 && e.removeAttribute(n.name));break;case Nova.ExpressionParser.BIND_TYPES.PROPERTY:
	        e[n.name] != t && (e[n.name] = t);break;case Nova.ExpressionParser.BIND_TYPES.TEXT:
	        e.textContent != t && (e.textContent = t);}
	  }function h(e, t, n) {
	    var r = undefined;switch (n.type) {case Nova.ExpressionParser.BIND_TYPES.PROPERTY:
	        r = e[n.name];break;case Nova.ExpressionParser.BIND_TYPES.ATTRIBUTE:
	        r = e.getAttribute(n.name);}this.set(t, r);
	  }function p(e) {
	    var t = this,
	        n = Array.prototype.slice.call(e.querySelectorAll("content"));n.forEach(function (e) {
	      var n = e.getAttribute("select"),
	          r = undefined;r = Array.prototype.slice.call((n ? t.querySelectorAll(n) : t.childNodes) || []), r.forEach(function (r) {
	        (Array.prototype.slice.call(t.children).indexOf(r) >= 0 || !n) && e.parentElement.insertBefore(r, e);
	      }), e.parentElement.removeChild(e);
	    });
	  }function d(e) {
	    var t = this,
	        n = this;while (n) {
	      if (Nova.ExpressionParser.SCOPED_ELEMENTS.indexOf(n.tagName) < 0) {
	        if (!e.className || e.className.indexOf(n.is) < 0) e.className += " " + n.is;e.hasAttribute && e.hasAttribute("class_") && e.setAttribute("class_", e.getAttribute("class_") + " " + n.is);
	      }n = n._nova.parentScope;
	    }e.childNodes && Array.prototype.slice.call(e.childNodes).forEach(function (e) {
	      d.call(t, e);
	    });
	  }function v(e) {
	    var t = Array.prototype.slice.call(e.childNodes);for (var n = 0; n < t.length; n++) {
	      this.appendChild(t[n]);
	    }
	  }var e = { host: null, parentScope: null, enumerableAsParentScope: !0, createdHandler: function createdHandler() {
	      this.beforeTemplateInit && this.beforeTemplateInit();if (!this.template) return;var t = this;this._nova.binds = { hostToChild: {}, childToHost: new Map(), allBindings: [] }, r.call(t);var n = i.call(this);p.call(this, n), v.call(this, n), this.updateTemplate();
	    }, compileNodes: function compileNodes(t) {
	      d.call(this, t), this.bindNodes(t);
	    }, bindNodeByConfigs: function bindNodeByConfigs(n, r) {
	      var i = this;r.forEach(function (e) {
	        var r = Nova.Utils.mix({}, [e, { scope: i }]);switch (r.type) {case Nova.ExpressionParser.BIND_TYPES.ATTRIBUTE:case Nova.ExpressionParser.BIND_TYPES.PROPERTY:
	            Nova.Utils.mix(r, [Nova.ExpressionParser._parseExpression(r.value)], !0);}t.call(i, n, r);
	      }), n._nova = n._nova || {}, n._nova.host = i, Nova.ExpressionParser.SCOPED_ELEMENTS.indexOf(n.tagName) >= 0 && (n._nova.parentScope = n._nova.host);
	    }, bindNodes: function bindNodes(n) {
	      var r = this,
	          i = Nova.ExpressionParser.parse(n, this);i.forEach(function (e, n) {
	        e.forEach(function (e) {
	          t.call(r, n, e);
	        }), n._nova = n._nova || {}, n._nova.host = r, Nova.ExpressionParser.SCOPED_ELEMENTS.indexOf(n.tagName) >= 0 && (n._nova.parentScope = n._nova.host);
	      });
	    }, unbindNodes: function unbindNodes(t) {
	      var n = this;f.call(n, t), l.call(n, t), t.childNodes && Array.prototype.slice.call(t.childNodes).forEach(function (e) {
	        n.unbindNodes(e);
	      });
	    }, updateTemplate: function updateTemplate(t) {
	      var r = this;t ? t.constructor != Array && (t = [t]) : (t = [], this._nova.binds.allBindings.forEach(function (e) {
	        e.relatedProps.forEach(function (e) {
	          var n = undefined;for (var r = 0, i = t.length; r < i; r++) {
	            e.path.indexOf(t[r]) == 0 && (!e.path[t[r]] || e.prop[t[r]] == ".") && (n = !0);
	          }!n && t.push(e.path);
	        });
	      })), t.forEach(function (e) {
	        var t = n.call(r, e.split(".")[0]);t && o.call(t, e);
	      });
	    } };Nova.TemplateBehavior = e;
	}(), function () {
	  var e = { createdHandler: function createdHandler() {
	      this.removeAttribute("unresolved");
	    } };Nova.StyleBehavior = e;
	}(), console.log("nova"), function () {
	  var e = Nova.Utils,
	      t = !0,
	      n = [],
	      r = { _behaviors: [Nova.EventBehavior, Nova.AspectBehavior, Nova.PropBehavior, Nova.TemplateBehavior, Nova.StyleBehavior], behaviors: [], props: {}, createdCallback: function createdCallback() {
	      var t = this;t._nova = t._nova || {}, t._initBehaviors(), this._waitForParentBehaviorsReady(function () {
	        n.push(t), t._initInitialData(), t.trigger("nova.behaviors.created"), t._nova.isBehaviorsReady = !0, n.pop(), t.trigger("nova.behaviors.ready"), t.createdHandler && t.createdHandler(), t.trigger("nova.ready"), t._nova.isReady = !0;
	      });
	    }, attachedCallback: function attachedCallback() {
	      var t = this;this._waitForParentBehaviorsReady(function () {
	        t.trigger("nova.behaviors.attached"), t.attachedHandler && t.attachedHandler();
	      });
	    }, detachedCallback: function detachedCallback() {
	      var t = this;this._waitForParentBehaviorsReady(function () {
	        t.trigger("nova.behaviors.detached"), t.detachedHandler && t.detachedHandler();
	      });
	    }, attributeChangedCallback: function attributeChangedCallback(t, n, r) {
	      var i = this;this._nova.isBehaviorsReady && (i.trigger("nova.behaviors.attributeChanged", [t, n, r]), i.attributeChangedHandler && i.attributeChangedHandler(t, n, r));
	    }, _waitForParentBehaviorsReady: function _waitForParentBehaviorsReady(t) {
	      var r = n[n.length - 1];!r || r._nova.isBehaviorsReady ? t() : function () {
	        var e = function n() {
	          r.off("nova.behaviors.ready", n), t();
	        };r.on("nova.behaviors.ready", e);
	      }();
	    }, _initInitialData: function _initInitialData() {
	      var t = Nova.Initial.get();Nova.Initial.clear();if (!t) return;if (t.attrs) for (var n in t.attrs) {
	        this.setAttribute(n, t.attrs[n]);
	      }if (t.props) for (var r in t.props) {
	        this[r] = t.props[r];
	      }t.beforeCreated && t.beforeCreated.call(this);
	    }, _initBehaviors: function _initBehaviors() {
	      var n = this,
	          r = n._behaviors.concat(n.behaviors);r.forEach(function (e, t) {
	        if (typeof e == "function") {
	          var n = e.realConstructor.prototype,
	              i = {};r[t] = i;for (var s in n) {
	            n.hasOwnProperty(s) && (i[s] = n[s]);
	          }(n.behaviors || []).forEach(function (e, n) {
	            r.splice(t + 1 + n, 0, e);
	          });
	        }
	      }), r.forEach(function (t) {
	        var r = e.mix({}, t);"createdHandler attachedHandler detachedHandler attributeChangedHandler".split(" ").forEach(function (e) {
	          delete r[e];
	        }), e.mix(n, r), e.mix(n.props, r.props);
	      }), this.on("nova.behaviors.created nova.behaviors.attached nova.behaviors.detached nova.behaviors.attributeChanged", function (e) {
	        var t = arguments,
	            i = e.type.match(/nova\.behaviors\.(.+)$/)[1];r.forEach(function (e) {
	          var r = e[i + "Handler"];r && r.apply(n, Array.prototype.slice.call(t, 1));
	        });
	      });
	    }, _getPrivateProp: function _getPrivateProp(t) {
	      if (!this._nova) return;return this._nova[t];
	    }, _setPrivateProp: function _setPrivateProp(t, n) {
	      this._nova || (this._nova = {}), this._nova[t] = n;
	    } };Nova.Base = r;
	}(), undefined, NovaExports.__fixedUglify = "script>", NovaExports.exports = { stylesheet: ":host{display:none}", template: "\n    " }, Nova.Components.TemplateRepeat = NovaExports({ is: "template-repeat", "extends": "template", enumerableAsParentScope: !1, props: { items: { type: Array, value: function value() {
	        return [];
	      } } }, createdHandler: function createdHandler() {
	    var t = this;this.as = this.getAttribute("as") || "item", this.indexAs = this.getAttribute("index-as") || "index";var n = this.getAttribute("parent-selector");this.insertParent = n ? this.parentElement.querySelector(n) : this.parentElement, this.insertNextSibling = this.nextSibling, setTimeout(function () {
	      t.parentElement && t.parentElement.removeChild(t);
	    }, 0), this.on("_itemsChanged", this._itemsObserver), this.notifyPath("items");
	  }, _itemsObserver: function _itemsObserver(t, n, r, i) {
	    if (i != "items" || !r || r.constructor != Array) return;this.itemNodes = this.itemNodes || [];for (var s = this.itemNodes.length - 1; s >= 0; s--) {
	      this.removeItem(s);
	    }for (var s = 0, o = r.length; s < o; s++) {
	      this.appendItem(s);
	    }
	  }, appendItem: function appendItem(t) {
	    var n = this,
	        r = new Nova.Components.TemplateRepeatItem({ props: { as: this.as, indexAs: this.indexAs, index: t, item: n.items[t], template: this.innerHTML, insertParent: this.insertParent, insertNextSibling: this.insertNextSibling }, beforeCreated: function beforeCreated() {
	        n.compileNodes(this), n.bindNodeByConfigs(this, [{ type: Nova.ExpressionParser.BIND_TYPES.PROPERTY, value: "{{items." + t + "}}", name: n.as }, { type: Nova.ExpressionParser.BIND_TYPES.EVENT, callback: "itemChangedHandler", event: n._getPropChangeEventName(n.as) }]);
	      } });this.itemNodes.push(r);
	  }, removeItem: function removeItem(t) {
	    var n = this,
	        r = this.itemNodes.splice(t, 1)[0];r._childNodes.forEach(function (e) {
	      e.parentElement && e.parentElement.removeChild(e), n.unbindNodes(r);
	    });
	  }, itemChangedHandler: function itemChangedHandler(t, n, r, i, s) {
	    this.trigger("itemChanged", n, r, i, s);
	  } }), undefined, NovaExports.__fixedUglify = "script>", NovaExports.exports = {}, Nova.Components.TemplateIf = NovaExports({ is: "template-if", props: { "if": { type: Boolean } }, createdHandler: function createdHandler() {
	    var t = this;this.insertParent = this.parentSelector ? this.parentElement.querySelector(this.parentSelector) : this.parentElement, this.insertNextSibling = this.nextSibling, this.nodes = Array.prototype.slice.call(this.childNodes), setTimeout(function () {
	      t.parentElement && t.parentElement.removeChild(t);
	    }, 0), this.on("_ifChanged", this._ifObserver), this.trigger("_ifChanged", [this["if"], this["if"]]);
	  }, _ifObserver: function _ifObserver(t, n, r) {
	    var i = this;r ? this.nodes.forEach(function (e) {
	      i.append(e);
	    }) : this.nodes.forEach(function (e) {
	      e.parentElement == i.insertParent && i.insertParent.removeChild(e);
	    });
	  }, append: function append(t) {
	    this.insertNextSibling && this.insertNextSibling.parentElement == this.insertParent ? this.insertParent.insertBefore(t, this.insertNextSibling) : this.insertParent.appendChild(t);
	  } }), undefined, NovaExports.__fixedUglify = "script>", NovaExports.exports = { template: "\n        <content></content>\n    " }, Nova.Components.TemplateRepeatItem = NovaExports({ is: "template-repeat-item", props: {}, beforeTemplateInit: function beforeTemplateInit() {
	    var t = this;this[this.as] = this.item, this.addProperty(this.as, { type: null, value: this.item }), this[this.indexAs] = this.index, this.addProperty(this.indexAs, { type: null, value: this.index });
	  }, createdHandler: function createdHandler() {
	    var t = this;this._childNodes = Array.prototype.slice.call(this.childNodes), t._childNodes.forEach(function (e) {
	      t.compileNodes(e), t.append(e);
	    });
	  }, append: function append(t) {
	    this.insertNextSibling && this.insertNextSibling.parentElement == this.insertParent ? this.insertParent.insertBefore(t, this.insertNextSibling) : this.insertParent.appendChild(t);
	  } });

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*! (C) WebReflection Mit Style License */(function (e, t, n, r) {
	  "use strict";
	  function i(e, t) {
	    for (var n = 0, r = e.length; n < r; n++) {
	      v(e[n], t);
	    }
	  }function s(e) {
	    for (var t = 0, n = e.length, r; t < n; t++) {
	      r = e[t], dt(r, M[u(r)]);
	    }
	  }function o(e) {
	    return function (t) {
	      K(t) && (v(t, e), i(t.querySelectorAll(_), e));
	    };
	  }function u(e) {
	    var t = e.getAttribute("is"),
	        n = e.nodeName.toUpperCase(),
	        r = P.call(O, t ? k + t.toUpperCase() : C + n);return t && -1 < r && !a(n, t) ? -1 : r;
	  }function a(e, t) {
	    return -1 < _.indexOf(e + '[is="' + t + '"]');
	  }function f(e) {
	    var t = e.currentTarget,
	        n = e.attrChange,
	        r = e.prevValue,
	        i = e.newValue;at && t.attributeChangedCallback && e.attrName !== "style" && t.attributeChangedCallback(e.attrName, n === e[w] ? null : r, n === e[S] ? null : i);
	  }function l(e) {
	    var t = o(e);return function (e) {
	      rt.push(t, e.target);
	    };
	  }function c(e) {
	    ut && (ut = !1, e.currentTarget.removeEventListener(T, c)), i((e.target || t).querySelectorAll(_), e.detail === y ? y : g), J && d();
	  }function h(e, t) {
	    var n = this;Y.call(n, e, t), ft.call(n, { target: n });
	  }function p(e, t) {
	    X(e, t), ht ? ht.observe(e, tt) : (ot && (e.setAttribute = h, e[m] = ct(e), e.addEventListener(N, ft)), e.addEventListener(x, f)), e.createdCallback && at && (e.created = !0, e.createdCallback(), e.created = !1);
	  }function d() {
	    for (var e, t = 0, n = Q.length; t < n; t++) {
	      e = Q[t], D.contains(e) || (Q.splice(t, 1), v(e, y));
	    }
	  }function v(e, t) {
	    var n,
	        r = u(e);-1 < r && (pt(e, M[r]), r = 0, t === g && !e[g] ? (e[y] = !1, e[g] = !0, r = 1, J && P.call(Q, e) < 0 && Q.push(e)) : t === y && !e[y] && (e[g] = !1, e[y] = !0, r = 1), r && (n = e[t + "Callback"]) && n.call(e));
	  }if (r in t) return;var m = "__" + r + (Math.random() * 1e5 >> 0),
	      g = "attached",
	      y = "detached",
	      b = "extends",
	      w = "ADDITION",
	      E = "MODIFICATION",
	      S = "REMOVAL",
	      x = "DOMAttrModified",
	      T = "DOMContentLoaded",
	      N = "DOMSubtreeModified",
	      C = "<",
	      k = "=",
	      L = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
	      A = ["ANNOTATION-XML", "COLOR-PROFILE", "FONT-FACE", "FONT-FACE-SRC", "FONT-FACE-URI", "FONT-FACE-FORMAT", "FONT-FACE-NAME", "MISSING-GLYPH"],
	      O = [],
	      M = [],
	      _ = "",
	      D = t.documentElement,
	      P = O.indexOf || function (e) {
	    for (var t = this.length; t-- && this[t] !== e;) {}return t;
	  },
	      H = n.prototype,
	      B = H.hasOwnProperty,
	      j = H.isPrototypeOf,
	      F = n.defineProperty,
	      I = n.getOwnPropertyDescriptor,
	      q = n.getOwnPropertyNames,
	      R = n.getPrototypeOf,
	      U = n.setPrototypeOf,
	      z = !!n.__proto__,
	      W = n.create || function vt(e) {
	    return e ? (vt.prototype = e, new vt()) : this;
	  },
	      X = U || (z ? function (e, t) {
	    return e.__proto__ = t, e;
	  } : q && I ? function () {
	    function e(e, t) {
	      for (var n, r = q(t), i = 0, s = r.length; i < s; i++) {
	        n = r[i], B.call(e, n) || F(e, n, I(t, n));
	      }
	    }return function (t, n) {
	      do {
	        e(t, n);
	      } while ((n = R(n)) && !j.call(n, t));return t;
	    };
	  }() : function (e, t) {
	    for (var n in t) {
	      e[n] = t[n];
	    }return e;
	  }),
	      V = e.MutationObserver || e.WebKitMutationObserver,
	      $ = (e.HTMLElement || e.Element || e.Node).prototype,
	      J = !j.call($, D),
	      K = J ? function (e) {
	    return e.nodeType === 1;
	  } : function (e) {
	    return j.call($, e);
	  },
	      Q = J && [],
	      G = $.cloneNode,
	      Y = $.setAttribute,
	      Z = $.removeAttribute,
	      et = t.createElement,
	      tt = V && { attributes: !0, characterData: !0, attributeOldValue: !0 },
	      nt = V || function (e) {
	    ot = !1, D.removeEventListener(x, nt);
	  },
	      rt,
	      it = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
	    setTimeout(e, 10);
	  },
	      st = !1,
	      ot = !0,
	      ut = !0,
	      at = !0,
	      ft,
	      lt,
	      ct,
	      ht,
	      pt,
	      dt;U || z ? (pt = function pt(e, t) {
	    j.call(t, e) || p(e, t);
	  }, dt = p) : (pt = function pt(e, t) {
	    e[m] || (e[m] = n(!0), p(e, t));
	  }, dt = pt), J ? (ot = !1, function () {
	    var e = I($, "addEventListener"),
	        t = e.value,
	        n = function n(e) {
	      var t = new CustomEvent(x, { bubbles: !0 });t.attrName = e, t.prevValue = this.getAttribute(e), t.newValue = null, t[S] = t.attrChange = 2, Z.call(this, e), this.dispatchEvent(t);
	    },
	        r = function r(e, t) {
	      var n = this.hasAttribute(e),
	          r = n && this.getAttribute(e),
	          i = new CustomEvent(x, { bubbles: !0 });Y.call(this, e, t), i.attrName = e, i.prevValue = n ? r : null, i.newValue = t, n ? i[E] = i.attrChange = 1 : i[w] = i.attrChange = 0, this.dispatchEvent(i);
	    },
	        i = function i(e) {
	      var t = e.currentTarget,
	          n = t[m],
	          r = e.propertyName,
	          i;n.hasOwnProperty(r) && (n = n[r], i = new CustomEvent(x, { bubbles: !0 }), i.attrName = n.name, i.prevValue = n.value || null, i.newValue = n.value = t[r] || null, i.prevValue == null ? i[w] = i.attrChange = 0 : i[E] = i.attrChange = 1, t.dispatchEvent(i));
	    };e.value = function (e, s, o) {
	      e === x && this.attributeChangedCallback && this.setAttribute !== r && (this[m] = { className: { name: "class", value: this.className } }, this.setAttribute = r, this.removeAttribute = n, t.call(this, "propertychange", i)), t.call(this, e, s, o);
	    }, F($, "addEventListener", e);
	  }()) : V || (D.addEventListener(x, nt), D.setAttribute(m, 1), D.removeAttribute(m), ot && (ft = function ft(e) {
	    var t = this,
	        n,
	        r,
	        i;if (t === e.target) {
	      n = t[m], t[m] = r = ct(t);for (i in r) {
	        if (!(i in n)) return lt(0, t, i, n[i], r[i], w);if (r[i] !== n[i]) return lt(1, t, i, n[i], r[i], E);
	      }for (i in n) {
	        if (!(i in r)) return lt(2, t, i, n[i], r[i], S);
	      }
	    }
	  }, lt = function lt(e, t, n, r, i, s) {
	    var o = { attrChange: e, currentTarget: t, attrName: n, prevValue: r, newValue: i };o[s] = e, f(o);
	  }, ct = function ct(e) {
	    for (var t, n, r = {}, i = e.attributes, s = 0, o = i.length; s < o; s++) {
	      t = i[s], n = t.name, n !== "setAttribute" && (r[n] = t.value);
	    }return r;
	  })), t[r] = function (e, n) {
	    v = e.toUpperCase(), st || (st = !0, V ? (ht = function (e, t) {
	      function n(e, t) {
	        for (var n = 0, r = e.length; n < r; t(e[n++])) {}
	      }return new V(function (r) {
	        for (var i, s, o = 0, u = r.length; o < u; o++) {
	          i = r[o], i.type === "childList" ? (n(i.addedNodes, e), n(i.removedNodes, t)) : (s = i.target, at && s.attributeChangedCallback && i.attributeName !== "style" && s.attributeChangedCallback(i.attributeName, i.oldValue, s.getAttribute(i.attributeName)));
	        }
	      });
	    }(o(g), o(y)), ht.observe(t, { childList: !0, subtree: !0 })) : (rt = [], it(function m() {
	      while (rt.length) {
	        rt.shift().call(null, rt.shift());
	      }it(m);
	    }), t.addEventListener("DOMNodeInserted", l(g)), t.addEventListener("DOMNodeRemoved", l(y))), t.addEventListener(T, c), t.addEventListener("readystatechange", c), t.createElement = function (e, n) {
	      var r = et.apply(t, arguments),
	          i = "" + e,
	          s = P.call(O, (n ? k : C) + (n || i).toUpperCase()),
	          o = -1 < s;return n && (r.setAttribute("is", n = n.toLowerCase()), o && (o = a(i.toUpperCase(), n))), at = !t.createElement.innerHTMLHelper, o && dt(r, M[s]), r;
	    }, $.cloneNode = function (e) {
	      var t = G.call(this, !!e),
	          n = u(t);return -1 < n && dt(t, M[n]), e && s(t.querySelectorAll(_)), t;
	    });if (-2 < P.call(O, k + v) + P.call(O, C + v)) throw new Error("A " + e + " type is already registered");if (!L.test(v) || -1 < P.call(A, v)) throw new Error("The type " + e + " is invalid");var r = function r() {
	      return h ? t.createElement(p, v) : t.createElement(p);
	    },
	        f = n || H,
	        h = B.call(f, b),
	        p = h ? n[b].toUpperCase() : v,
	        d = O.push((h ? k : C) + v) - 1,
	        v;return _ = _.concat(_.length ? "," : "", h ? p + '[is="' + e.toLowerCase() + '"]' : p), r.prototype = M[d] = B.call(f, "prototype") ? f.prototype : W($), i(t.querySelectorAll(_), g), r;
	  };
	})(window, document, Object, "registerElement"), function (e) {
	  function t(e) {
	    var t = [],
	        n = [],
	        r = [],
	        s = Object.is || function (e, t) {
	      return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
	    },
	        o = function o(e) {
	      if (e != e || e === 0) for (var t = this.length; t-- && !s(this[t], e);) {} else t = [].indexOf.call(this, e);return t;
	    },
	        u = function u(t, n) {
	      var r = 0;return Object.create({}, { next: { value: function value() {
	            if (r < t.items().length) switch (n) {case "keys":
	                return t.keys()[r++];case "values":
	                return t.values()[r++];case "keys+values":
	                return [].slice.call(t.items()[r++]);default:
	                throw new TypeError("Invalid iterator type");}throw new Error("Stop Iteration");
	          } }, iterator: { value: function value() {
	            return this;
	          } }, toString: { value: function value() {
	            return "[object Map Iterator]";
	          } } });
	    },
	        a = function a(e, i) {
	      var s = o.call(n, e);s > -1 ? (t[s][1] = i, r[s] = i) : (t.push([e, i]), n.push(e), r.push(i));
	    },
	        f = function f(e) {
	      if (e.length !== 2) throw new TypeError("Invalid iterable passed to Map constructor");a(e[0], e[1]);
	    };if (Array.isArray(e)) e.forEach(f);else if (e !== undefined) throw new TypeError("Invalid Map");return Object.create(i, { items: { value: function value() {
	          return [].slice.call(t);
	        } }, keys: { value: function value() {
	          return [].slice.call(n);
	        } }, values: { value: function value() {
	          return [].slice.call(r);
	        } }, has: { value: function value(e) {
	          var t = o.call(n, e);return t > -1;
	        } }, get: { value: function value(e) {
	          var t = o.call(n, e);return t > -1 ? r[t] : undefined;
	        } }, set: { value: a }, size: { get: function get() {
	          return t.length;
	        } }, clear: { value: function value() {
	          n.length = r.length = t.length = 0;
	        } }, "delete": { value: function value(e) {
	          var i = o.call(n, e);return i > -1 ? (n.splice(i, 1), r.splice(i, 1), t.splice(i, 1), !0) : !1;
	        } }, forEach: { value: function value(e) {
	          function t() {
	            try {
	              return n.next();
	            } catch (e) {
	              return undefined;
	            }
	          }if (typeof e != "function") throw new TypeError("Invalid callback function given to forEach");var n = this.iterator(),
	              r = t(),
	              i = t();while (r !== undefined) {
	            e.apply(arguments[1], [r[1], r[0], this]), r = i, i = t();
	          }
	        } }, iterator: { value: function value() {
	          return new u(this, "keys+values");
	        } }, toString: { value: function value() {
	          return "[Object Map]";
	        } } });
	  }var n = e == "undefined",
	      r = n ? this : global,
	      e = n ? {} : exports,
	      i = t.prototype;t.prototype = i = t(), r.Map = e.Map = r.Map || t;
	}.call(undefined,  false ? "undefined" : _typeof(exports));
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function () {
	  (function (root, factory) {
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	      module.exports = factory();
	    } else if (true) {
	      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	      var globalAlias = '__16';
	      var namespace = globalAlias.split('.');
	      var parent = root;
	      for (var i = 0; i < namespace.length - 1; i++) {
	        if (parent[namespace[i]] === undefined) parent[namespace[i]] = {};
	        parent = parent[namespace[i]];
	      }
	      parent[namespace[namespace.length - 1]] = factory();
	    }
	  })(this, function () {
	    function _requireDep(name) {
	      return {}[name];
	    }

	    var _bundleExports = undefined;NovaExports.__fixedUglify = "script>";NovaExports.exports = { "template": "\n        <a href=\"#!{{link}}\">{{text}}</a>\n    " };
	    NovaExports({
	      is: 'nova-link',
	      props: {
	        link: {
	          type: String,
	          value: ''
	        },
	        text: {
	          type: String,
	          value: 'text'
	        }
	      },
	      createdHandler: function createdHandler() {}
	    });

	    return _bundleExports;
	  });
	}).call(window);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function () {
	    (function (root, factory) {
	        if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	            module.exports = factory();
	        } else if (true) {
	            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	        } else {
	            var globalAlias = '__17';
	            var namespace = globalAlias.split('.');
	            var parent = root;
	            for (var i = 0; i < namespace.length - 1; i++) {
	                if (parent[namespace[i]] === undefined) parent[namespace[i]] = {};
	                parent = parent[namespace[i]];
	            }
	            parent[namespace[namespace.length - 1]] = factory();
	        }
	    })(this, function () {
	        function _requireDep(name) {
	            return {}[name];
	        }

	        var _bundleExports = undefined;NovaExports.__fixedUglify = "script>";NovaExports.exports = { "template": "\n    " };
	        NovaExports({
	            is: 'nova-test-view',
	            props: {
	                content: {
	                    type: String,
	                    value: ''
	                },
	                loadingRouteData: {
	                    type: Boolean,
	                    value: false
	                }
	            },
	            createdHandler: function createdHandler() {
	                console.log("nova-test-view " + this.content + " created");
	            },
	            attachedHandler: function attachedHandler() {
	                console.log("nova-test-view " + this.content + " attached");
	            },
	            detachedHandler: function detachedHandler() {
	                console.log("nova-test-view " + this.content + " detached");
	            },
	            attributeChangedHandler: function attributeChangedHandler(attrName, oldVal, newVal) {
	                console.log("nova-test-view " + this.content + " attributeChanged");
	            }
	        });

	        return _bundleExports;
	    });
	}).call(window);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _util = __webpack_require__(6);

	var util = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	describe('Util', function (argument) {
	    it('resolvePath', function () {
	        expect(util.resolvePath('/a', 'b')).toBe('/b');
	        expect(util.resolvePath('/a/', 'b')).toBe('/a/b');
	        expect(util.resolvePath('/a', '/b')).toBe('/b');
	        expect(util.resolvePath('/a/', '/b')).toBe('/a/b');
	        // append mode
	        expect(util.resolvePath('/a', 'b', true)).toBe('/a/b');
	        expect(util.resolvePath('/a/', 'b', true)).toBe('/a/b');
	        expect(util.resolvePath('/a', '/b', true)).toBe('/a/b');
	        expect(util.resolvePath('/a/', '/b', true)).toBe('/a/b');
	        // relative query
	        expect(util.resolvePath('/a', '?b=1')).toBe('/a?b=1');
	        expect(util.resolvePath('/a/', '?b=1')).toBe('/a/?b=1');
	    });

	    it('mapParams', function () {
	        expect(util.mapParams('/a/:id', { id: 'b' })).toBe('/a/b');
	        expect(util.mapParams('/a/:id/', { id: 'b' })).toBe('/a/b/');
	        expect(util.mapParams('/a/:id/c/:d', { id: 'b', d: 'd' })).toBe('/a/b/c/d');
	        expect(util.mapParams('/a/:id/c/:d', { id: 'b', d: 'd' }, { e: 123 })).toBe('/a/b/c/d?e=123');
	    });
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setNovaProperty = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.resolvePath = resolvePath;
	exports.isPromise = isPromise;
	exports.isObject = isObject;
	exports.warn = warn;
	exports.mapParams = mapParams;
	exports.inBrowser = inBrowser;
	exports.initialCaps = initialCaps;

	var _routeRecognizer = __webpack_require__(7);

	var _routeRecognizer2 = _interopRequireDefault(_routeRecognizer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var genQuery = _routeRecognizer2.default.prototype.generateQueryString;
	/**
	* Resolve a relative path.
	* 根据相对路径拼接出绝对路径
	*
	* @param {String} base
	* @param {String} relative
	* @param {Boolean} append ?是否要拼接
	* @return {String}
	*/
	function resolvePath(base, relative, append) {
	    var query = base.match(/(\?.*)$/);
	    if (query) {
	        query = query[1];
	        base = base.slice(0, -query.length);
	    }
	    // a query!
	    if (relative.charAt(0) === '?') {
	        return base + relative;
	    }
	    var stack = base.split('/');
	    // remove trailing segment if:
	    // - not appending
	    // - appending to trailing slash (last segment is empty)
	    if (!append || !stack[stack.length - 1]) {
	        stack.pop();
	    }
	    // resolve relative path
	    var segments = relative.replace(/^\//, '').split('/');
	    for (var i = 0; i < segments.length; i++) {
	        var segment = segments[i];
	        if (segment === '.') {
	            continue;
	        } else if (segment === '..') {
	            stack.pop();
	        } else {
	            stack.push(segment);
	        }
	    }
	    // ensure leading slash
	    if (stack[0] !== '') {
	        stack.unshift('');
	    }
	    return stack.join('/');
	}

	/**
	* 判断是否是promise
	* @param  {[type]}  p [description]
	* @return {Boolean}   [description]
	*/
	function isPromise(p) {
	    return p && typeof p.then === 'function';
	}

	/**
	* 判断是不是object
	* @param  {[type]}  val [description]
	* @return {Boolean}     [description]
	*/
	function isObject(val) {
	    return val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && Array.isArray(val) === false;
	};

	/**
	* 通用warn函数
	* @param  {[type]} msg [description]
	* @return {[type]}     [description]
	*/
	function warn(msg) {
	    /* istanbul ignore next */
	    if (typeof console !== 'undefined') {
	        console.error('[nova-router] ' + msg);
	    }
	}

	/**
	* Map the dynamic segments in a path to params.
	* 将动态片段置换为相应数值
	*
	* @param {String} path
	* @param {Object} params
	* @param {Object} query
	*/

	function mapParams(path) {
	    var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var query = arguments[2];

	    path = path.replace(/:([^\/]+)/g, function (_, key) {
	        var val = params[key];
	        /* istanbul ignore if */
	        if (!val) {
	            warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	        }
	        return val || '';
	    });
	    if (query) {
	        path += genQuery(query);
	    }
	    return path;
	}

	function inBrowser() {
	    var test = window || null;
	    return Object.prototype.toString.call(test) === "[object Window]";
	}

	function setNovaProperty(component, key, _value) {
	    if (component.hasProperty(key)) {
	        component.set(key, _value);
	    } else {
	        component.addProperty(key, {
	            type: initialCaps(typeof _value === 'undefined' ? 'undefined' : _typeof(_value)),
	            value: function value() {
	                return _value;
	            }
	        });
	    }
	}

	exports.setNovaProperty = setNovaProperty;
	function initialCaps(str) {
	    return str.replace(/^\S/, function (s) {
	        return s.toUpperCase();
	    });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {(function() {
	    "use strict";
	    function $$route$recognizer$dsl$$Target(path, matcher, delegate) {
	      this.path = path;
	      this.matcher = matcher;
	      this.delegate = delegate;
	    }

	    $$route$recognizer$dsl$$Target.prototype = {
	      to: function(target, callback) {
	        var delegate = this.delegate;

	        if (delegate && delegate.willAddRoute) {
	          target = delegate.willAddRoute(this.matcher.target, target);
	        }

	        this.matcher.add(this.path, target);

	        if (callback) {
	          if (callback.length === 0) { throw new Error("You must have an argument in the function passed to `to`"); }
	          this.matcher.addChild(this.path, target, callback, this.delegate);
	        }
	        return this;
	      }
	    };

	    function $$route$recognizer$dsl$$Matcher(target) {
	      this.routes = {};
	      this.children = {};
	      this.target = target;
	    }

	    $$route$recognizer$dsl$$Matcher.prototype = {
	      add: function(path, handler) {
	        this.routes[path] = handler;
	      },

	      addChild: function(path, target, callback, delegate) {
	        var matcher = new $$route$recognizer$dsl$$Matcher(target);
	        this.children[path] = matcher;

	        var match = $$route$recognizer$dsl$$generateMatch(path, matcher, delegate);

	        if (delegate && delegate.contextEntered) {
	          delegate.contextEntered(target, match);
	        }

	        callback(match);
	      }
	    };

	    function $$route$recognizer$dsl$$generateMatch(startingPath, matcher, delegate) {
	      return function(path, nestedCallback) {
	        var fullPath = startingPath + path;

	        if (nestedCallback) {
	          nestedCallback($$route$recognizer$dsl$$generateMatch(fullPath, matcher, delegate));
	        } else {
	          return new $$route$recognizer$dsl$$Target(startingPath + path, matcher, delegate);
	        }
	      };
	    }

	    function $$route$recognizer$dsl$$addRoute(routeArray, path, handler) {
	      var len = 0;
	      for (var i=0; i<routeArray.length; i++) {
	        len += routeArray[i].path.length;
	      }

	      path = path.substr(len);
	      var route = { path: path, handler: handler };
	      routeArray.push(route);
	    }

	    function $$route$recognizer$dsl$$eachRoute(baseRoute, matcher, callback, binding) {
	      var routes = matcher.routes;

	      for (var path in routes) {
	        if (routes.hasOwnProperty(path)) {
	          var routeArray = baseRoute.slice();
	          $$route$recognizer$dsl$$addRoute(routeArray, path, routes[path]);

	          if (matcher.children[path]) {
	            $$route$recognizer$dsl$$eachRoute(routeArray, matcher.children[path], callback, binding);
	          } else {
	            callback.call(binding, routeArray);
	          }
	        }
	      }
	    }

	    var $$route$recognizer$dsl$$default = function(callback, addRouteCallback) {
	      var matcher = new $$route$recognizer$dsl$$Matcher();

	      callback($$route$recognizer$dsl$$generateMatch("", matcher, this.delegate));

	      $$route$recognizer$dsl$$eachRoute([], matcher, function(route) {
	        if (addRouteCallback) { addRouteCallback(this, route); }
	        else { this.add(route); }
	      }, this);
	    };

	    var $$route$recognizer$$specials = [
	      '/', '.', '*', '+', '?', '|',
	      '(', ')', '[', ']', '{', '}', '\\'
	    ];

	    var $$route$recognizer$$escapeRegex = new RegExp('(\\' + $$route$recognizer$$specials.join('|\\') + ')', 'g');

	    function $$route$recognizer$$isArray(test) {
	      return Object.prototype.toString.call(test) === "[object Array]";
	    }

	    // A Segment represents a segment in the original route description.
	    // Each Segment type provides an `eachChar` and `regex` method.
	    //
	    // The `eachChar` method invokes the callback with one or more character
	    // specifications. A character specification consumes one or more input
	    // characters.
	    //
	    // The `regex` method returns a regex fragment for the segment. If the
	    // segment is a dynamic of star segment, the regex fragment also includes
	    // a capture.
	    //
	    // A character specification contains:
	    //
	    // * `validChars`: a String with a list of all valid characters, or
	    // * `invalidChars`: a String with a list of all invalid characters
	    // * `repeat`: true if the character specification can repeat

	    function $$route$recognizer$$StaticSegment(string) { this.string = string; }
	    $$route$recognizer$$StaticSegment.prototype = {
	      eachChar: function(currentState) {
	        var string = this.string, ch;

	        for (var i=0; i<string.length; i++) {
	          ch = string.charAt(i);
	          currentState = currentState.put({ invalidChars: undefined, repeat: false, validChars: ch });
	        }

	        return currentState;
	      },

	      regex: function() {
	        return this.string.replace($$route$recognizer$$escapeRegex, '\\$1');
	      },

	      generate: function() {
	        return this.string;
	      }
	    };

	    function $$route$recognizer$$DynamicSegment(name) { this.name = name; }
	    $$route$recognizer$$DynamicSegment.prototype = {
	      eachChar: function(currentState) {
	        return currentState.put({ invalidChars: "/", repeat: true, validChars: undefined });
	      },

	      regex: function() {
	        return "([^/]+)";
	      },

	      generate: function(params) {
	        return params[this.name];
	      }
	    };

	    function $$route$recognizer$$StarSegment(name) { this.name = name; }
	    $$route$recognizer$$StarSegment.prototype = {
	      eachChar: function(currentState) {
	        return currentState.put({ invalidChars: "", repeat: true, validChars: undefined });
	      },

	      regex: function() {
	        return "(.+)";
	      },

	      generate: function(params) {
	        return params[this.name];
	      }
	    };

	    function $$route$recognizer$$EpsilonSegment() {}
	    $$route$recognizer$$EpsilonSegment.prototype = {
	      eachChar: function(currentState) {
	        return currentState;
	      },
	      regex: function() { return ""; },
	      generate: function() { return ""; }
	    };

	    function $$route$recognizer$$parse(route, names, specificity) {
	      // normalize route as not starting with a "/". Recognition will
	      // also normalize.
	      if (route.charAt(0) === "/") { route = route.substr(1); }

	      var segments = route.split("/");
	      var results = new Array(segments.length);

	      // A routes has specificity determined by the order that its different segments
	      // appear in. This system mirrors how the magnitude of numbers written as strings
	      // works.
	      // Consider a number written as: "abc". An example would be "200". Any other number written
	      // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	      // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	      // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	      // leading symbol, "1".
	      // The rule is that symbols to the left carry more weight than symbols to the right
	      // when a number is written out as a string. In the above strings, the leading digit
	      // represents how many 100's are in the number, and it carries more weight than the middle
	      // number which represents how many 10's are in the number.
	      // This system of number magnitude works well for route specificity, too. A route written as
	      // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	      // `x`, irrespective of the other parts.
	      // Because of this similarity, we assign each type of segment a number value written as a
	      // string. We can find the specificity of compound routes by concatenating these strings
	      // together, from left to right. After we have looped through all of the segments,
	      // we convert the string to a number.
	      specificity.val = '';

	      for (var i=0; i<segments.length; i++) {
	        var segment = segments[i], match;

	        if (match = segment.match(/^:([^\/]+)$/)) {
	          results[i] = new $$route$recognizer$$DynamicSegment(match[1]);
	          names.push(match[1]);
	          specificity.val += '3';
	        } else if (match = segment.match(/^\*([^\/]+)$/)) {
	          results[i] = new $$route$recognizer$$StarSegment(match[1]);
	          specificity.val += '1';
	          names.push(match[1]);
	        } else if(segment === "") {
	          results[i] = new $$route$recognizer$$EpsilonSegment();
	          specificity.val += '2';
	        } else {
	          results[i] = new $$route$recognizer$$StaticSegment(segment);
	          specificity.val += '4';
	        }
	      }

	      specificity.val = +specificity.val;

	      return results;
	    }

	    // A State has a character specification and (`charSpec`) and a list of possible
	    // subsequent states (`nextStates`).
	    //
	    // If a State is an accepting state, it will also have several additional
	    // properties:
	    //
	    // * `regex`: A regular expression that is used to extract parameters from paths
	    //   that reached this accepting state.
	    // * `handlers`: Information on how to convert the list of captures into calls
	    //   to registered handlers with the specified parameters
	    // * `types`: How many static, dynamic or star segments in this route. Used to
	    //   decide which route to use if multiple registered routes match a path.
	    //
	    // Currently, State is implemented naively by looping over `nextStates` and
	    // comparing a character specification against a character. A more efficient
	    // implementation would use a hash of keys pointing at one or more next states.

	    function $$route$recognizer$$State(charSpec) {
	      this.charSpec = charSpec;
	      this.nextStates = [];
	      this.charSpecs = {};
	      this.regex = undefined;
	      this.handlers = undefined;
	      this.specificity = undefined;
	    }

	    $$route$recognizer$$State.prototype = {
	      get: function(charSpec) {
	        if (this.charSpecs[charSpec.validChars]) {
	          return this.charSpecs[charSpec.validChars];
	        }

	        var nextStates = this.nextStates;

	        for (var i=0; i<nextStates.length; i++) {
	          var child = nextStates[i];

	          var isEqual = child.charSpec.validChars === charSpec.validChars;
	          isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

	          if (isEqual) {
	            this.charSpecs[charSpec.validChars] = child;
	            return child;
	          }
	        }
	      },

	      put: function(charSpec) {
	        var state;

	        // If the character specification already exists in a child of the current
	        // state, just return that state.
	        if (state = this.get(charSpec)) { return state; }

	        // Make a new state for the character spec
	        state = new $$route$recognizer$$State(charSpec);

	        // Insert the new state as a child of the current state
	        this.nextStates.push(state);

	        // If this character specification repeats, insert the new state as a child
	        // of itself. Note that this will not trigger an infinite loop because each
	        // transition during recognition consumes a character.
	        if (charSpec.repeat) {
	          state.nextStates.push(state);
	        }

	        // Return the new state
	        return state;
	      },

	      // Find a list of child states matching the next character
	      match: function(ch) {
	        var nextStates = this.nextStates,
	            child, charSpec, chars;

	        var returned = [];

	        for (var i=0; i<nextStates.length; i++) {
	          child = nextStates[i];

	          charSpec = child.charSpec;

	          if (typeof (chars = charSpec.validChars) !== 'undefined') {
	            if (chars.indexOf(ch) !== -1) { returned.push(child); }
	          } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	            if (chars.indexOf(ch) === -1) { returned.push(child); }
	          }
	        }

	        return returned;
	      }
	    };

	    // Sort the routes by specificity
	    function $$route$recognizer$$sortSolutions(states) {
	      return states.sort(function(a, b) {
	        return b.specificity.val - a.specificity.val;
	      });
	    }

	    function $$route$recognizer$$recognizeChar(states, ch) {
	      var nextStates = [];

	      for (var i=0, l=states.length; i<l; i++) {
	        var state = states[i];

	        nextStates = nextStates.concat(state.match(ch));
	      }

	      return nextStates;
	    }

	    var $$route$recognizer$$oCreate = Object.create || function(proto) {
	      function F() {}
	      F.prototype = proto;
	      return new F();
	    };

	    function $$route$recognizer$$RecognizeResults(queryParams) {
	      this.queryParams = queryParams || {};
	    }
	    $$route$recognizer$$RecognizeResults.prototype = $$route$recognizer$$oCreate({
	      splice: Array.prototype.splice,
	      slice:  Array.prototype.slice,
	      push:   Array.prototype.push,
	      length: 0,
	      queryParams: null
	    });

	    function $$route$recognizer$$findHandler(state, path, queryParams) {
	      var handlers = state.handlers, regex = state.regex;
	      var captures = path.match(regex), currentCapture = 1;
	      var result = new $$route$recognizer$$RecognizeResults(queryParams);

	      result.length = handlers.length;

	      for (var i=0; i<handlers.length; i++) {
	        var handler = handlers[i], names = handler.names, params = {};

	        for (var j=0; j<names.length; j++) {
	          params[names[j]] = captures[currentCapture++];
	        }

	        result[i] = { handler: handler.handler, params: params, isDynamic: !!names.length };
	      }

	      return result;
	    }

	    function $$route$recognizer$$decodeQueryParamPart(part) {
	      // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	      part = part.replace(/\+/gm, '%20');
	      var result;
	      try {
	        result = decodeURIComponent(part);
	      } catch(error) {result = '';}
	      return result;
	    }

	    // The main interface

	    var $$route$recognizer$$RouteRecognizer = function() {
	      this.rootState = new $$route$recognizer$$State();
	      this.names = {};
	    };


	    $$route$recognizer$$RouteRecognizer.prototype = {
	      add: function(routes, options) {
	        var currentState = this.rootState, regex = "^",
	            specificity = {},
	            handlers = new Array(routes.length), allSegments = [], name;

	        var isEmpty = true;

	        for (var i=0; i<routes.length; i++) {
	          var route = routes[i], names = [];

	          var segments = $$route$recognizer$$parse(route.path, names, specificity);

	          allSegments = allSegments.concat(segments);

	          for (var j=0; j<segments.length; j++) {
	            var segment = segments[j];

	            if (segment instanceof $$route$recognizer$$EpsilonSegment) { continue; }

	            isEmpty = false;

	            // Add a "/" for the new segment
	            currentState = currentState.put({ invalidChars: undefined, repeat: false, validChars: "/" });
	            regex += "/";

	            // Add a representation of the segment to the NFA and regex
	            currentState = segment.eachChar(currentState);
	            regex += segment.regex();
	          }
	          var handler = { handler: route.handler, names: names };
	          handlers[i] = handler;
	        }

	        if (isEmpty) {
	          currentState = currentState.put({ invalidChars: undefined, repeat: false, validChars: "/" });
	          regex += "/";
	        }

	        currentState.handlers = handlers;
	        currentState.regex = new RegExp(regex + "$");
	        currentState.specificity = specificity;

	        if (name = options && options.as) {
	          this.names[name] = {
	            segments: allSegments,
	            handlers: handlers
	          };
	        }
	      },

	      handlersFor: function(name) {
	        var route = this.names[name];

	        if (!route) { throw new Error("There is no route named " + name); }

	        var result = new Array(route.handlers.length);

	        for (var i=0; i<route.handlers.length; i++) {
	          result[i] = route.handlers[i];
	        }

	        return result;
	      },

	      hasRoute: function(name) {
	        return !!this.names[name];
	      },

	      generate: function(name, params) {
	        var route = this.names[name], output = "";
	        if (!route) { throw new Error("There is no route named " + name); }

	        var segments = route.segments;

	        for (var i=0; i<segments.length; i++) {
	          var segment = segments[i];

	          if (segment instanceof $$route$recognizer$$EpsilonSegment) { continue; }

	          output += "/";
	          output += segment.generate(params);
	        }

	        if (output.charAt(0) !== '/') { output = '/' + output; }

	        if (params && params.queryParams) {
	          output += this.generateQueryString(params.queryParams, route.handlers);
	        }

	        return output;
	      },

	      generateQueryString: function(params, handlers) {
	        var pairs = [];
	        var keys = [];
	        for(var key in params) {
	          if (params.hasOwnProperty(key)) {
	            keys.push(key);
	          }
	        }
	        keys.sort();
	        for (var i = 0; i < keys.length; i++) {
	          key = keys[i];
	          var value = params[key];
	          if (value == null) {
	            continue;
	          }
	          var pair = encodeURIComponent(key);
	          if ($$route$recognizer$$isArray(value)) {
	            for (var j = 0; j < value.length; j++) {
	              var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	              pairs.push(arrayPair);
	            }
	          } else {
	            pair += "=" + encodeURIComponent(value);
	            pairs.push(pair);
	          }
	        }

	        if (pairs.length === 0) { return ''; }

	        return "?" + pairs.join("&");
	      },

	      parseQueryString: function(queryString) {
	        var pairs = queryString.split("&"), queryParams = {};
	        for(var i=0; i < pairs.length; i++) {
	          var pair      = pairs[i].split('='),
	              key       = $$route$recognizer$$decodeQueryParamPart(pair[0]),
	              keyLength = key.length,
	              isArray = false,
	              value;
	          if (pair.length === 1) {
	            value = 'true';
	          } else {
	            //Handle arrays
	            if (keyLength > 2 && key.slice(keyLength -2) === '[]') {
	              isArray = true;
	              key = key.slice(0, keyLength - 2);
	              if(!queryParams[key]) {
	                queryParams[key] = [];
	              }
	            }
	            value = pair[1] ? $$route$recognizer$$decodeQueryParamPart(pair[1]) : '';
	          }
	          if (isArray) {
	            queryParams[key].push(value);
	          } else {
	            queryParams[key] = value;
	          }
	        }
	        return queryParams;
	      },

	      recognize: function(path) {
	        var states = [ this.rootState ],
	            pathLen, i, l, queryStart, queryParams = {},
	            isSlashDropped = false;

	        queryStart = path.indexOf('?');
	        if (queryStart !== -1) {
	          var queryString = path.substr(queryStart + 1, path.length);
	          path = path.substr(0, queryStart);
	          queryParams = this.parseQueryString(queryString);
	        }

	        path = decodeURI(path);

	        if (path.charAt(0) !== "/") { path = "/" + path; }

	        pathLen = path.length;
	        if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	          path = path.substr(0, pathLen - 1);
	          isSlashDropped = true;
	        }

	        for (i=0; i<path.length; i++) {
	          states = $$route$recognizer$$recognizeChar(states, path.charAt(i));
	          if (!states.length) { break; }
	        }

	        var solutions = [];
	        for (i=0; i<states.length; i++) {
	          if (states[i].handlers) { solutions.push(states[i]); }
	        }

	        states = $$route$recognizer$$sortSolutions(solutions);

	        var state = solutions[0];

	        if (state && state.handlers) {
	          // if a trailing slash was dropped and a star segment is the last segment
	          // specified, put the trailing slash back
	          if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	            path = path + "/";
	          }
	          return $$route$recognizer$$findHandler(state, path, queryParams);
	        }
	      }
	    };

	    $$route$recognizer$$RouteRecognizer.prototype.map = $$route$recognizer$dsl$$default;

	    $$route$recognizer$$RouteRecognizer.VERSION = '0.1.11';

	    var $$route$recognizer$$default = $$route$recognizer$$RouteRecognizer;

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(9)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return $$route$recognizer$$default; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = $$route$recognizer$$default;
	    } else if (typeof this !== 'undefined') {
	      this['RouteRecognizer'] = $$route$recognizer$$default;
	    }
	}).call(this);

	//# sourceMappingURL=route-recognizer.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(11);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Core', function () {
	    var router = void 0,
	        el = void 0;

	    beforeEach(function () {
	        el = document.createElement('router-view');
	        document.body.appendChild(el);
	        spyOn(console, 'error');
	        spyOn(window, 'scrollTo');
	    });

	    afterEach(function () {
	        var el = router && router.routerView;
	        if (el && document.body.contains(el)) {
	            document.body.removeChild(el);
	        }
	        router = null;
	    });

	    it('try to create a nova-view', function () {
	        expect(function () {
	            document.createElement('nova-view');
	        }).not.toThrow();
	    });

	    it('matching views', function (done) {
	        router = new _index2.default({ abstract: true });
	        var guide = assertRoutes([['/a', 'a'], ['/b', 'b'],
	        // relative
	        ['a', 'a'], ['b', 'b'],
	        // relative with traversal
	        ['../a', 'a', '/a'], ['./../b', 'b', '/b'],
	        // no match
	        ['/c', '']], done, function (matches) {
	            var content = router.routerView.children.length > 0 ? router.routerView.children[0].content : '';
	            expect(content).toBe(matches[0][1]);
	        });
	        var aView = createNovaView({ content: 'a' });
	        var bView = createNovaView({ content: 'b' });
	        router.map({
	            '/a': {
	                component: aView
	            },
	            '/b': {
	                component: bView
	            }
	        });
	        var cb = jasmine.createSpy();
	        router.afterEach(function () {
	            guide.check();
	            guide.next();
	        });
	        router.start(el, function () {
	            expect(router.routerView).toBeTruthy();
	            cb();
	        });
	        expect(cb).toHaveBeenCalled();
	    });

	    it('go() with object', function (done) {
	        router = new _index2.default({ abstract: true });
	        var aView = createNovaView({ content: 'a' });
	        var bView = createNovaView({ content: 'b' });
	        var cView = createNovaView({ content: 'c' });
	        var guide = assertRoutes([[{ path: '/a/A' }, 'aA'], [{ path: '/b/B' }, 'bB'],
	        // relative
	        [{ path: '../a/A' }, 'aA'], [{ path: '../b/B' }, 'bB'],
	        // relative with append: true
	        [{ path: 'c', append: true }, 'bBc'],
	        // named routes
	        [{ name: 'a', params: { msg: 'A' } }, 'aA'], [{ name: 'b', params: { msg: 'B' }, query: { msg: 'B' } }, 'bBB']], done, function (matches) {
	            var parent = router.routerView.children[0];
	            if (parent) {
	                var content = parent.content || '';
	                content += parent.$route.params.msg || '';
	                content += parent.$route.query.msg || '';
	                content += parent.children.length > 0 ? parent.children[0].content : '';
	                expect(content).toBe(matches[0][1]);
	            }
	        });
	        router.map({
	            '/a/:msg': {
	                name: 'a',
	                component: aView
	            },
	            '/b/:msg': {
	                name: 'b',
	                component: bView,
	                subRoutes: {
	                    '/c': {
	                        component: cView
	                    }
	                }
	            }
	        });
	        router.afterEach(function () {
	            guide.check();
	            guide.next();
	        });
	        router.start(el);
	    });

	    it('go() querystring code', function (done) {
	        router = new _index2.default({ abstract: true });
	        var aView = createNovaView({ content: 'a' });
	        var bView = createNovaView({ content: 'b' });
	        var cView = createNovaView({ content: 'c' });
	        var query = { msg: 'https://www.google.com/#q=novajs' };
	        var guide = assertRoutes([
	        // object with path
	        [{ path: '/a', query: query }, 'a' + query.msg],
	        // object with named route
	        [{ name: 'b', query: query }, 'b' + query.msg],
	        // special char
	        ['/c?msg=%!!!', 'c%!!!']], done, function (matches) {
	            var parent = router.routerView.children[0];
	            if (parent) {
	                var content = parent.content || '';
	                // content += parent.$route.params.msg || ''
	                content += parent.$route.query.msg || '';
	                // content += parent.children.length>0 ? parent.children[0].content : ''
	                expect(content).toBe(matches[0][1]);
	            }
	        });
	        router.map({
	            '/a': {
	                component: aView
	            },
	            '/b': {
	                component: bView,
	                name: 'b'
	            },
	            "/c": {
	                component: cView
	            }
	        });
	        router.afterEach(function () {
	            guide.check();
	            guide.next();
	        });
	        router.start(el);
	    });

	    it('matching nested views', function (done) {
	        var aView = createNovaView({ content: 'a' });
	        var adView = createNovaView({ content: 'ad' });
	        var a1View = createNovaView({ content: 'a1' });
	        var a2View = createNovaView({ content: 'a2' });
	        var bView = createNovaView({ content: 'b' });
	        var b1View = createNovaView({ content: 'b1' });
	        router = new _index2.default({ abstract: true });
	        var guide = assertRoutes([['/a', 'aad'], ['/a/sub-a', 'aa1'], ['/a/sub-a-2', 'aa2'], ['/b/sub-b', 'bb1'], ['/b', 'b'],
	        // no match
	        ['/b/sub-a', '']], done, function (matches) {
	            var parent = router.routerView.children[0];
	            if (parent) {
	                var content = parent.content || '';
	                // content += parent.$route.params.msg || ''
	                // content += parent.$route.query.msg || ''
	                content += parent.children.length > 0 ? parent.children[0].content : '';
	                expect(content).toBe(matches[0][1]);
	            }
	        });
	        router.map({
	            '/a': {
	                component: aView,
	                subRoutes: {
	                    '/': {
	                        component: adView
	                    },
	                    "/sub-a": {
	                        component: a1View
	                    },
	                    "/sub-a-2": {
	                        component: a2View
	                    }
	                }
	            },
	            '/b': {
	                component: bView,
	                subRoutes: {
	                    '/sub-b': {
	                        component: b1View
	                    }
	                }
	            }
	        });
	        router.afterEach(function () {
	            guide.check();
	            guide.next();
	        });
	        router.start(el);
	    });

	    it('matching nested views and canReuse', function (done) {
	        router = new _index2.default({ abstract: true });
	        var aView = createNovaView({ content: 'a' });
	        var spya = jasmine.createSpy();
	        aView.attachedHandler = spya;
	        var adView = createNovaView({ content: 'ad' });
	        var a1View = createNovaView({ content: 'a1' });
	        var a2View = createNovaView({ content: 'a2' });
	        var spya2 = jasmine.createSpy();
	        a2View.attachedHandler = spya2;
	        var bView = createNovaView({ content: 'b' });
	        var b1View = createNovaView({ content: 'b1' });
	        var guide = assertRoutes([['/a', 'aad'], ['/a/sub-a', 'aa1'], ['/a/sub-a-2', 'aa2'], ['/b/sub-b', 'bb1'], ['/b', 'b'],
	        // no match
	        ['/b/sub-a', '']], function () {
	            expect(spya.calls.count()).toBe(1);
	            expect(spya2.calls.count()).toBe(1);
	            done();
	        }, function (matches) {
	            var parent = router.routerView.children[0];
	            if (parent) {
	                var content = parent.content || '';
	                // content += parent.$route.params.msg || ''
	                // content += parent.$route.query.msg || ''
	                content += parent.children.length > 0 ? parent.children[0].content : '';
	                expect(content).toBe(matches[0][1]);
	            }
	        });
	        router.map({
	            '/a': {
	                component: aView,
	                subRoutes: {
	                    '/': {
	                        component: adView
	                    },
	                    "/sub-a": {
	                        component: a1View
	                    },
	                    "/sub-a-2": {
	                        component: a2View
	                    }
	                }
	            },
	            '/b': {
	                component: bView,
	                subRoutes: {
	                    '/sub-b': {
	                        component: b1View
	                    }
	                }
	            }
	        });
	        router.afterEach(function () {
	            guide.check();
	            guide.next();
	        });
	        router.start(el);
	    });

	    it('route context', function (done) {
	        router = new _index2.default({ abstract: true });
	        var aView = createNovaView({ content: "a" });
	        router.map({
	            '/a/:id': {
	                customeField: 'custom',
	                component: aView
	            }
	        });
	        var guide = assertRoutes([
	        // no param, no match (only view-b)
	        ['/a', '/a,,,|'],
	        // params only
	        ['/a/123', '/a/123,123,,custom|/a/123,123,,custom'],
	        // params + query
	        ['/a/123?id=234', '/a/123?id=234,123,234,custom|/a/123?id=234,123,234,custom'],
	        // relative query
	        ['?id=345', '/a/123?id=345,123,345,custom|/a/123?id=345,123,345,custom']], done, function (matches) {
	            var parent = router.routerView.children[0];
	            var content = (router.routerView.$route.path || '') + ',';
	            content += (router.routerView.$route.params && router.routerView.$route.params.id || '') + ',';
	            content += (router.routerView.$route.query && router.routerView.$route.query.id || '') + ',';
	            content += (router.routerView.$route.customeField || '') + '|';
	            if (parent) {
	                content += (parent.$route.path || '') + ',';
	                content += (parent.$route.params.id || '') + ',';
	                content += (parent.$route.query.id || '') + ',';
	                content += parent.$route.customeField || '';
	                // content += parent.children.length>0 ? parent.children[0].content : ''
	            }
	            expect(content).toBe(matches[0][1]);
	        }, { defaultMatch: '/,,,|' });
	        router.afterEach(function () {
	            guide.check();
	            guide.next();
	        });
	        router.start(el);
	    });

	    it('alias', function (done) {
	        router = new _index2.default({ abstract: true });
	        var aView = createNovaView({ content: 'a' });
	        var bView = createNovaView({ content: 'b' });
	        router.map({
	            '/a': {
	                component: aView
	            },
	            '/b': {
	                component: bView
	            }
	        });
	        router.alias({
	            '/c/a': '/a',
	            '/c/b': '/b'
	        });
	        var guide = assertRoutes([['/a', 'a'], ['/b', 'b'], ['/c/a', 'a'], ['/c/b', 'b']], done, function (matches) {
	            var content = router.routerView.children[0] ? router.routerView.children[0].content : '';
	            expect(content).toBe(matches[0][1]);
	        });
	        router.afterEach(function () {
	            guide.check();
	            guide.next();
	        });
	        router.start(el);
	    });

	    it('multi-variable alias', function (done) {
	        router = new _index2.default({ abstract: true });
	        var aView = createNovaView({ content: 'a' });
	        var bView = createNovaView({ content: 'b' });
	        router.map({
	            '/a/:foo': {
	                component: aView,
	                subRoutes: {
	                    '/b/:bar': {
	                        component: bView
	                    }
	                }
	            }
	        });
	        router.alias({ '/c/a/:foo/b/:bar': '/a/:foo/b/:bar' });
	        var guide = assertRoutes([['/c/a/123/b/456', '123456'], ['/c/a/234/b/567', '234567']], done, function (matches) {
	            var content = router.routerView.children[0] ? router.routerView.children[0].$route.params.foo + router.routerView.children[0].$route.params.bar : '';
	            expect(content).toBe(matches[0][1]);
	        });
	        router.afterEach(function () {
	            guide.check();
	            guide.next();
	        });
	        router.start(el);
	    });

	    it('redirect', function (done) {
	        router = new _index2.default({ abstract: true });
	        var aView = createNovaView({ content: 'a' });
	        var bView = createNovaView({ content: 'b' });
	        var cView = createNovaView({ content: 'c' });
	        router.map({
	            '/a': {
	                component: aView,
	                subRoutes: {
	                    '/b': {
	                        component: bView
	                    },
	                    '/c': {
	                        component: cView
	                    }
	                }
	            }
	        });
	        router.redirect({
	            '/whatever': '/a/b',
	            '/ok': '/a/c',
	            '*': '/a/b'
	        });
	        var guide = assertRoutes([['/whatever', 'a'], ['/ok?msg=world', 'world'], ['/fesfsefsef', 'a']], done, function (matches) {
	            var content = router.routerView.children[0] ? router.routerView.children[0].$route.query && router.routerView.children[0].$route.query.msg || router.routerView.children[0].content : '';
	            expect(content).toBe(matches[0][1]);
	        }, { defaultMatch: false });
	        router.afterEach(function () {
	            guide.check();
	            guide.next();
	        });
	        router.start(el);
	    });

	    it('redirect without notfound', function (done) {
	        router = new _index2.default({ abstract: true });
	        var aView = createNovaView({ content: 'a' });
	        var bView = createNovaView({ content: 'b' });
	        var cView = createNovaView({ content: 'c' });
	        router.map({
	            '/a': {
	                component: aView,
	                subRoutes: {
	                    '/b': {
	                        component: bView
	                    },
	                    '/c': {
	                        component: cView
	                    }
	                }
	            }
	        });
	        router.redirect({
	            '/whatever': '/a/b',
	            '/ok': '/a/c'
	        });
	        var guide = assertRoutes([['/whatever', 'a'], ['/ok?msg=world', 'world'], ['/fesfsefsef', '']], done, function (matches) {
	            var content = router.routerView.children[0] ? router.routerView.children[0].$route.query.msg || router.routerView.children[0].content : '';
	            expect(content).toBe(matches[0][1]);
	        });
	        router.afterEach(function () {
	            guide.check();
	            guide.next();
	        });
	        router.start(el);
	    });

	    it('multi-variable redirect', function (done) {
	        router = new _index2.default({ abstract: true });
	        var aView = createNovaView({ content: 'a' });
	        var bView = createNovaView({ content: 'b' });
	        router.map({
	            '/a/:foo': {
	                component: aView,
	                subRoutes: {
	                    '/b/:bar': {
	                        component: bView
	                    }
	                }
	            }
	        });
	        router.redirect({ '/c/a/:foo/b/:bar': '/a/:foo/b/:bar' });
	        var guide = assertRoutes([['/c/a/123/b/456', '123456'], ['/c/a/234/b/567', '234567']], done, function (matches) {
	            var content = router.routerView.children[0] ? router.routerView.children[0].$route.params.foo + router.routerView.children[0].$route.params.bar : '';
	            expect(content).toBe(matches[0][1]);
	        });
	        router.afterEach(function () {
	            guide.check();
	            guide.next();
	        });
	        router.start(el);
	    });

	    it('notfound', function (done) {
	        router = new _index2.default({ abstract: true });
	        var aView = createNovaView({ content: "a" });
	        router.map({
	            '*': {
	                component: aView
	            }
	        });
	        var guide = assertRoutes([['/notfound', 'a'], ['/notagain', 'a']], done, function (matches) {
	            var content = router.routerView.children[0].content;
	            expect(content).toBe(matches[0][1]);
	        }, { defaultMatch: 'a' });
	        router.afterEach(function () {
	            guide.check();
	            guide.next();
	        });
	        router.start(el);
	    });

	    it('global before', function (done) {
	        router = new _index2.default({ abstract: true });
	        var noView = createNovaView({ content: 'no' });
	        var redirectView = createNovaView({ content: 'redirect' });
	        var toView = createNovaView({ content: 'to' });
	        var notFoundView = createNovaView({ content: 'notfound' });
	        router.map({
	            '/no': {
	                component: noView
	            },
	            '/redirect/:id': {
	                component: redirectView
	            },
	            '/to/:id': {
	                component: toView
	            },
	            '*': {
	                component: notFoundView
	            }
	        });

	        var spy1 = jasmine.createSpy('before hook 1');
	        router.beforeEach(function (transition) {
	            spy1();
	            setTimeout(function () {
	                transition.next();
	            }, wait);
	        });

	        var spy2 = jasmine.createSpy('before hook 2');
	        router.beforeEach(function (transition) {
	            spy2();
	            if (transition.to.path === '/no') {
	                setTimeout(function () {
	                    transition.abort();
	                    next();
	                }, wait);
	            } else if (transition.to.path.indexOf('/redirect') > -1) {
	                setTimeout(function () {
	                    transition.redirect('/to/:id');
	                    next2();
	                }, wait);
	            } else {
	                transition.next();
	            }
	        });

	        var spy3 = jasmine.createSpy('before hook 3');
	        router.beforeEach(function () {
	            spy3();
	        });

	        router.start(el);
	        expect(spy1).toHaveBeenCalled();
	        expect(spy2).not.toHaveBeenCalled();
	        expect(spy3).not.toHaveBeenCalled();
	        expect(router.routerView.children.length).toBe(0);

	        setTimeout(function () {
	            expect(spy2).toHaveBeenCalled();
	            expect(spy3).toHaveBeenCalled();
	            expect(router.routerView.children[0].content).toBe('notfound');
	            router.go('/no');
	        }, wait * 2);

	        function next() {
	            expect(spy1.calls.count()).toBe(2);
	            expect(spy2.calls.count()).toBe(2);
	            expect(spy3.calls.count()).toBe(1); // aborted at 2
	            expect(router.routerView.children[0].content).toBe('notfound');
	            router.go('/redirect/12345');
	        }

	        function next2() {
	            expect(spy1.calls.count()).toBe(4); // go + redirect
	            expect(spy2.calls.count()).toBe(3); // only go at this moment
	            expect(spy3.calls.count()).toBe(1); // still 1
	            setTimeout(function () {
	                expect(spy1.calls.count()).toBe(4);
	                expect(spy2.calls.count()).toBe(4);
	                expect(spy3.calls.count()).toBe(2); // after redirect
	                expect(router.routerView.children[0].content).toBe('to');
	                done();
	            }, wait * 2);
	        }
	    });

	    it('global after', function (done) {
	        router = new _index2.default({ abstract: true });
	        var aView = createNovaView({ content: "a" });
	        router.map({
	            '/a': {
	                component: aView
	            }
	        });
	        var callCount = 0;
	        router.afterEach(function (transition) {
	            if (callCount === 0) {
	                expect(transition.from.path).toBeUndefined();
	                expect(transition.to.path).toBe('/');
	            } else {
	                expect(transition.from.path).toBe('/');
	                expect(transition.to.path).toBe('/a');
	                done();
	            }
	            callCount++;
	        });
	        router.start(el);
	        router.go('/a');
	    });

	    if (!window.isIE9) {
	        it('saveScrollPosition', function (done) {
	            router = new _index2.default({
	                history: true,
	                saveScrollPosition: true
	            });
	            var aView = createNovaView({ content: "a" });
	            router.map({
	                '/a': {
	                    component: aView
	                },
	                '*': {
	                    component: aView
	                }
	            });

	            router.start(el);
	            var x = window.pageXOffset;
	            var y = window.pageYOffset;
	            router.go('/a');
	            window.addEventListener('popstate', function onPop() {
	                setTimeout(function () {
	                    expect(window.scrollTo.calls.count()).toBe(1);
	                    expect(window.scrollTo).toHaveBeenCalledWith(x, y);
	                    window.removeEventListener('popstate', onPop);
	                    router.stop();
	                    done();
	                }, 0);
	            });
	            history.back();
	        });
	    }

	    function assertRoutes() {
	        var routes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	        var done = arguments.length <= 1 || arguments[1] === undefined ? function () {
	            return true;
	        } : arguments[1];

	        var _check = arguments.length <= 2 || arguments[2] === undefined ? function () {
	            return true;
	        } : arguments[2];

	        var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	        var _ref$defaultMatch = _ref.defaultMatch;
	        var defaultMatch = _ref$defaultMatch === undefined ? '' : _ref$defaultMatch;

	        var matches = routes;
	        // default start from none
	        if (defaultMatch !== false) {
	            matches.unshift(['/', defaultMatch]);
	        }
	        return {
	            next: function next() {
	                if (matches.length) {
	                    router.go(matches[0][0]);
	                } else {
	                    done();
	                }
	            },
	            check: function check() {
	                _check(matches);
	                matches.shift();
	            }
	        };
	    }

	    function createNovaView(_ref2) {
	        var content = _ref2.content;
	        var next = _ref2.next;
	        var method = _ref2.method;

	        var tmp = document.createElement('nova-test-view');
	        tmp.content = content;
	        return tmp;
	    }
	});
	describe('Stringify Path', function () {

	    var router = void 0;
	    beforeEach(function () {
	        router = new _index2.default({ abstract: true });
	    });

	    it('plain string', function () {
	        expect(router.stringifyPath('a')).toBe('a');
	    });

	    it('object path', function () {
	        expect(router.stringifyPath({ path: '/hi' })).toBe('/hi');
	        expect(router.stringifyPath({ path: '/hi', query: { a: 1 } })).toBe('/hi?a=1');
	        expect(router.stringifyPath({ path: '/hi', query: { a: 1, b: 2 } })).toBe('/hi?a=1&b=2');
	        expect(router.stringifyPath({ path: '/hi?c=3', query: { a: 1, b: 2 } })).toBe('/hi?c=3&a=1&b=2');
	        expect(router.stringifyPath({ path: '/hi', query: { a: '/c' } })).toBe('/hi?a=%2Fc');
	    });

	    it('named route', function () {
	        router.map({
	            '/test/:id': {
	                name: 'a',
	                component: {}
	            }
	        });
	        expect(router.stringifyPath({ name: 'a' })).toBe('/test/undefined');
	        expect(router.stringifyPath({ name: 'a', params: { id: 0 } })).toBe('/test/0');
	        expect(router.stringifyPath({ name: 'a', params: { id: 'hi' } })).toBe('/test/hi');
	        expect(router.stringifyPath({ name: 'a', params: { id: '你好' } })).toBe('/test/' + encodeURIComponent('你好'));
	        expect(router.stringifyPath({ name: 'a', params: { id: 'hi' }, query: { b: '/c' } })).toBe('/test/hi?b=%2Fc');
	    });

	    it('named route not found should throw error', function () {
	        expect(function () {
	            router.stringifyPath({
	                name: 'a'
	            });
	        }).toThrow();
	    });

	    it('encodeURI', function () {
	        router.map({
	            '/test/:id': {
	                name: 'a',
	                component: {}
	            }
	        });
	        expect(router.stringifyPath('/hi/你好')).toBe(encodeURI('/hi/你好'));
	        expect(router.stringifyPath({ path: '/hi/你好' })).toBe(encodeURI('/hi/你好'));
	        expect(router.stringifyPath({ name: 'a', params: { id: '你好' } })).toBe(encodeURI('/test/你好'));
	    });
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _hash = __webpack_require__(12);

	var _hash2 = _interopRequireDefault(_hash);

	var _abstract = __webpack_require__(13);

	var _abstract2 = _interopRequireDefault(_abstract);

	var _html = __webpack_require__(14);

	var _html2 = _interopRequireDefault(_html);

	__webpack_require__(15);

	var _routeRecognizer = __webpack_require__(7);

	var _routeRecognizer2 = _interopRequireDefault(_routeRecognizer);

	var _route = __webpack_require__(16);

	var _route2 = _interopRequireDefault(_route);

	var _transition = __webpack_require__(17);

	var _transition2 = _interopRequireDefault(_transition);

	var _util = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var historyBackends = {
	    abstract: _abstract2.default,
	    hash: _hash2.default,
	    html5: _html2.default
	};

	var Router = function () {
	    function Router() {
	        var _this = this;

	        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        var _ref$hashbang = _ref.hashbang;
	        var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	        var _ref$abstract = _ref.abstract;
	        var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	        var _ref$history = _ref.history;
	        var history = _ref$history === undefined ? false : _ref$history;
	        var _ref$saveScrollPositi = _ref.saveScrollPosition;
	        var saveScrollPosition = _ref$saveScrollPositi === undefined ? false : _ref$saveScrollPositi;
	        var _ref$suppressTransiti = _ref.suppressTransitionError;
	        var //used in history
	        suppressTransitionError = _ref$suppressTransiti === undefined ? false : _ref$suppressTransiti;
	        var _ref$root = _ref.root;
	        var root = _ref$root === undefined ? null : _ref$root;

	        _classCallCheck(this, Router);

	        // route recognizer
	        this._recognizer = new _routeRecognizer2.default();
	        this._guardRecognizer = new _routeRecognizer2.default();

	        // state
	        this._started = false;
	        this._startCb = null;
	        this._currentRoute = {};
	        this._currentTransition = null;
	        this._previousTransition = null;
	        this._notFoundHandler = null;
	        this._notFoundRedirect = null;
	        this._beforeEachHooks = [];
	        this._afterEachHooks = [];
	        this._rendered = false;

	        // history mode
	        this._root = root;
	        this._hashbang = hashbang;
	        this._abstract = abstract;

	        // check if HTML5 histroy is available
	        var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	        this._history = history && hasPushState;
	        this._historyFallBack = history && !hasPushState;

	        // create history object
	        this.mode = !_util.inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';
	        var History = historyBackends[this.mode];
	        this.history = new History({
	            root: root,
	            hashbang: this._hashbang,
	            onChange: function onChange(path, state, anchor) {
	                _this._match(path, state, anchor);
	            }
	        });

	        this._saveScrollPosition = saveScrollPosition;
	        this._suppress = suppressTransitionError;
	        this._components = [];
	    }

	    // API ===================================================
	    /**
	     * register the map
	     * @param  {[type]} map [description]
	     * @return {[type]}     [description]
	     */


	    _createClass(Router, [{
	        key: 'map',
	        value: function map(_map) {
	            for (var route in _map) {
	                this.on(route, _map[route]);
	            }
	            return this;
	        }

	        /**
	         * register each route
	         * @param  {[type]} rootPath [description]
	         * @param  {[type]} handler  [description]
	         * @return {[type]}          [description]
	         */

	    }, {
	        key: 'on',
	        value: function on(rootPath, handler) {
	            if (rootPath === '*') {
	                this._notFound(handler);
	            } else {
	                this._addRoute(rootPath, handler, []);
	            }
	            return this;
	        }

	        /**
	         * set redirects
	         * @param  {[type]} map [description]
	         * @return {[type]}     [description]
	         */

	    }, {
	        key: 'redirect',
	        value: function redirect(map) {
	            for (var path in map) {
	                this._addRedirect(path, map[path]);
	            }
	            return this;
	        }
	    }, {
	        key: 'alias',
	        value: function alias(map) {
	            for (var path in map) {
	                this._addAlias(path, map[path]);
	            }
	            return this;
	        }

	        /**
	         * set global before hook
	         * @param  {Function} fn [description]
	         * @return {[type]}      [description]
	         */

	    }, {
	        key: 'beforeEach',
	        value: function beforeEach(fn) {
	            this._beforeEachHooks.push(fn);
	            return this;
	        }

	        /**
	         * set global after hook
	         * @param  {Function} fn [description]
	         * @return {[type]}      [description]
	         */

	    }, {
	        key: 'afterEach',
	        value: function afterEach(fn) {
	            this._afterEachHooks.push(fn);
	            return this;
	        }

	        /**
	         * go to a new path
	         * @param  {[type]} path [description]
	         * @return {[type]}      [description]
	         */

	    }, {
	        key: 'go',
	        value: function go(path) {
	            var replace = false;
	            var append = false;
	            if ((0, _util.isObject)(path)) {
	                replace = path.replace;
	                append = path.append;
	            }
	            path = this.stringifyPath(path);
	            if (path) {
	                this.history.go(path, replace, append);
	            }
	        }

	        /**
	         * replace current path
	         * @param  {[type]} path [description]
	         * @return {[type]}      [description]
	         */

	    }, {
	        key: 'replace',
	        value: function replace(path) {
	            if (typeof path === "string") {
	                path = { path: path };
	            }
	            path.replace = true;
	            this.go(path);
	        }

	        /**
	         * 启动路由
	         * @param  {[type]}   router [description]
	         * @param  {Function} cb     [description]
	         * @return {[type]}          [description]
	         */

	    }, {
	        key: 'start',
	        value: function start(routerView, cb) {
	            if (this._started) {
	                (0, _util.warn)("already started.");
	                return;
	            }
	            if (!this.routerView) {
	                if (!routerView) {
	                    throw new Error("Must start router with router view");
	                    return;
	                }
	            }
	            if (typeof routerView === 'string') {
	                routerView = document.querySelector(routerView);
	            }
	            this.routerView = routerView;
	            this._components.unshift(routerView);
	            this._started = true;
	            this._startCb = cb;
	            this.history.start();
	        }

	        /**
	         * Stop listening to route changes.
	         */

	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.history.stop();
	            this._started = false;
	        }

	        /**
	         * normalize named route object into string
	         * @param  {[type]} path [description]
	         * @return {[type]}      [description]
	         */

	    }, {
	        key: 'stringifyPath',
	        value: function stringifyPath(path) {
	            var generatePath = '';
	            if (path && (typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object') {
	                if (path.name) {
	                    // 具名路径
	                    generatePath = encodeURI(this._recognizer.generate(path.name, path.params || {}));
	                } else if (path.path) {
	                    generatePath = encodeURI(path.path);
	                }
	                if (path.query) {
	                    var query = this._recognizer.generateQueryString(path.query);
	                    if (generatePath.indexOf('?') > -1) {
	                        generatePath += '&' + query.slice(1);
	                    } else {
	                        generatePath += query;
	                    }
	                }
	            } else {
	                generatePath = encodeURI(path ? path + '' : '');
	            }
	            return generatePath;
	        }

	        // Internal methods ======================================
	        /**
	         * set the not found router handler
	         * @param  {[type]} handler [description]
	         * @return {[type]}         [description]
	         */

	    }, {
	        key: '_notFound',
	        value: function _notFound(handler) {
	            this._notFoundHandler = [{ handler: handler }];
	        }

	        /**
	         * add route and at the same time add the subroute
	         * @param {[type]} path     [description]
	         * @param {[type]} handler  [description]
	         * @param {[type]} segments [description]
	         */

	    }, {
	        key: '_addRoute',
	        value: function _addRoute(path, handler, segments) {
	            handler.path = path;
	            handler.fullPath = segments.reduce(function (path, segment) {
	                return path + segment.path;
	            }, '') + path;
	            segments.push({
	                path: path,
	                handler: handler
	            });
	            this._recognizer.add(segments, {
	                as: handler.name
	            });
	            if (handler.component && !this._components.includes(handler.component)) {
	                this._components.push(handler.component);
	                handler.component.$route = this._currentRoute;
	            }
	            // handle sub router
	            if (handler.subRoutes) {
	                for (var subPath in handler.subRoutes) {
	                    // pass a copy of segments to avoid mutating
	                    this._addRoute(subPath, handler.subRoutes[subPath], segments.slice());
	                }
	            }
	        }

	        /**
	         * add redirect record
	         * @param {[type]} path         [description]
	         * @param {[type]} redirectPath [description]
	         */

	    }, {
	        key: '_addRedirect',
	        value: function _addRedirect(path, redirectPath) {
	            if (path === '*') {
	                this._notFoundRedirect = redirectPath;
	            } else {
	                this._addGuard(path, redirectPath, this.replace);
	            }
	        }

	        /**
	         * add alias record
	         * @param {[type]} path      [description]
	         * @param {[type]} aliasPath [description]
	         */

	    }, {
	        key: '_addAlias',
	        value: function _addAlias(path, aliasPath) {
	            this._addGuard(path, aliasPath, this._match);
	        }

	        /**
	         * add a guard to pass the path into the real path
	         * @param {[type]} path       [description]
	         * @param {[type]} mappedPath [description]
	         * @param {[type]} handler    [description]
	         */

	    }, {
	        key: '_addGuard',
	        value: function _addGuard(path, mappedPath, _handler) {
	            var _this2 = this;

	            this._guardRecognizer.add([{
	                path: path,
	                handler: function handler(match, query) {
	                    var realPath = (0, _util.mapParams)(mappedPath, match.params, query);
	                    _handler.call(_this2, realPath);
	                }
	            }]);
	        }

	        /**
	         * check if  the path match redirect records
	         * @param  {[type]} path [description]
	         * @return {[type]}      [description]
	         */

	    }, {
	        key: '_checkGuard',
	        value: function _checkGuard(path) {
	            var matched = this._guardRecognizer.recognize(path, true);
	            if (matched) {
	                matched[0].handler(matched[0], matched.queryParams);
	                return true;
	            } else if (this._notFoundRedirect) {
	                matched = this._recognizer.recognize(path);
	                if (!matched) {
	                    this.replace(this._notFoundRedirect);
	                    return true;
	                }
	            }
	        }

	        /**
	         * match the url path and move to the correct view
	         * @param  {[type]} path   [description]
	         * @param  {[type]} state  [description]
	         * @param  {[type]} anchor [description]
	         * @return {[type]}        [description]
	         */

	    }, {
	        key: '_match',
	        value: function _match(path, state, anchor) {
	            var _this3 = this;

	            // check if it redirect
	            if (this._checkGuard(path)) {
	                return;
	            }

	            var currentRoute = this._currentRoute;
	            var currentTransition = this._currentTransition;

	            if (currentTransition) {
	                if (currentTransition.to.path === path) {
	                    // we have an transition doing that thing so ignore the request
	                    return;
	                } else if (currentRoute.path === path) {
	                    // we are going to the same place
	                    // but that transition do not work well
	                    // so we abort it and reset
	                    currentTransition.aborted = true;
	                    this._currentTransition = this._previousTransition;
	                    return;
	                } else {
	                    // we are going to different place so abort the current one
	                    currentTransition.aborted = true;
	                }
	            }

	            // construct an new route and the new transition
	            var route = new _route2.default(path, this);
	            var transition = new _transition2.default(this, route, currentRoute);

	            this._previousTransition = currentTransition;
	            this._currentTransition = transition;

	            var beforeHooks = this._beforeEachHooks;
	            var startTransition = function startTransition() {
	                transition.start(function () {
	                    _this3._postTransition(transition, state, anchor);
	                });
	            };
	            if (beforeHooks.length) {
	                transition.callHooks(beforeHooks, null, startTransition);
	            } else {
	                startTransition();
	            }
	        }

	        /**
	         * called when we validate the transition can run
	         * @param  {[type]} transition [description]
	         * @return {[type]}            [description]
	         */

	    }, {
	        key: '_onTransitionValidated',
	        value: function _onTransitionValidated(transition) {
	            var _this4 = this;

	            this._currentRoute = transition.to;
	            // copy one in case of the user change our route
	            this._components.forEach(function (each) {
	                (0, _util.setNovaProperty)(each, "$route", _this4._currentRoute);
	            });
	        }

	        /**
	         * called when we finished transition
	         * @return {[type]} [description]
	         */

	    }, {
	        key: '_postTransition',
	        value: function _postTransition(transition, state, anchor) {
	            // the first time catch change we call the started callback
	            if (!this._rendered && this._startCb) {
	                this._rendered = true;
	                this._startCb.call(null);
	            }
	            this._currentTransition.done = true;
	            var pos = state && state.pos;
	            if (pos && this._saveScrollPosition) {
	                setTimeout(function () {
	                    window && window.scrollTo(pos.x, pos.y);
	                }, 0);
	            } else if (anchor) {
	                setTimeout(function () {
	                    var el = document.getElementById(anchor.slice(1));
	                    if (el) {
	                        window && window.scrollTo(window.scrollX, el.offsetTop);
	                    }
	                }, 0);
	            }
	            if (this._afterEachHooks.length) {
	                this._afterEachHooks.forEach(function (hook) {
	                    return hook.call(null, {
	                        to: transition.to,
	                        from: transition.from
	                    });
	                });
	            }
	        }
	    }]);

	    return Router;
	}();

	exports.default = Router;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HashHistory = function () {
	    function HashHistory(_ref) {
	        var hashbang = _ref.hashbang;
	        var onChange = _ref.onChange;

	        _classCallCheck(this, HashHistory);

	        this.hashbang = hashbang;
	        this.onChange = onChange;
	    }

	    _createClass(HashHistory, [{
	        key: 'start',
	        value: function start() {
	            var self = this;
	            this.listener = function () {
	                var path = location.hash;
	                var raw = path.replace(/^#!?/, '');
	                if (raw.charAt(0) !== '/') {
	                    raw = '/' + raw;
	                }
	                var formattedPath = self.formatPath(raw);
	                if (formattedPath !== path) {
	                    location.replace(formattedPath);
	                    return;
	                }
	                // 此处vue-router有一个将query拼接上去的步骤
	                // 没有搞懂为什么这么做
	                // 先不加上
	                // const query = location.search && path.indexOf('?') > -1
	                //   ? '&' + location.search.slice(1)
	                //   : location.search
	                self.onChange(path.replace(/^#!?/, ''));
	            };
	            // 监听hashchange
	            window.addEventListener('hashchange', this.listener);
	            this.listener();
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            window.removeEventListener('hashchange', this.listener);
	        }
	    }, {
	        key: 'go',
	        value: function go(path, replace, append) {
	            path = this.formatPath(path, append);
	            if (replace) {
	                location.replace(path);
	            } else {
	                location.hash = path;
	            }
	        }

	        /**
	         * format to absolute path
	         * 格式化为绝对路径
	         */

	    }, {
	        key: 'formatPath',
	        value: function formatPath(path, append) {
	            var isAbsolute = path.charAt(0) === '/';
	            var prefix = '#' + (this.hashbang ? '!' : '');
	            return isAbsolute ? prefix + path : prefix + (0, _util.resolvePath)(location.hash.replace(/^#!?/, ''), path, append);
	        }
	    }]);

	    return HashHistory;
	}();

	exports.default = HashHistory;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AbstractHistory = function () {
	    function AbstractHistory(_ref) {
	        var onChange = _ref.onChange;

	        _classCallCheck(this, AbstractHistory);

	        this.onChange = onChange;
	        this.currentPath = '/';
	    }

	    _createClass(AbstractHistory, [{
	        key: 'start',
	        value: function start() {
	            this.onChange('/');
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            // nothing to do
	        }
	    }, {
	        key: 'go',
	        value: function go(path, replace, append) {
	            path = this.currentPath = this.formatPath(path, append);
	            this.onChange(path);
	        }
	    }, {
	        key: 'formatPath',
	        value: function formatPath(path, append) {
	            return path.charAt(0) === '/' ? path : (0, _util.resolvePath)(this.currentPath, path, append);
	        }
	    }]);

	    return AbstractHistory;
	}();

	exports.default = AbstractHistory;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var hashRegExp = /#.*$/;

	var HTML5History = function () {
	    function HTML5History(_ref) {
	        var root = _ref.root;
	        var onChange = _ref.onChange;

	        _classCallCheck(this, HTML5History);

	        if (root && root !== '/') {
	            // make sure the startting
	            if (root.charAt(0) !== '/') {
	                root = '/' + root;
	            }
	            // remove trailing
	            this.root = root.replace(/\/$/, '');
	            this.rootRegExp = new RegExp('^\\' + this.root);
	        } else {
	            this.root = null;
	        }
	        this.onChange = onChange;
	        // check the base
	        var baseEl = document.querySelector('base');
	        this.base = baseEl && baseEl.getAttribute('href');
	    }

	    _createClass(HTML5History, [{
	        key: 'start',
	        value: function start() {
	            var _this = this;

	            this.listener = function (e) {
	                var url = location.pathname + location.search;
	                if (_this.root) {
	                    url = url.replace(_this.rootRegExp, '') || '/';
	                }
	                _this.onChange(url, e && e.state, location.hash);
	            };
	            window.addEventListener('popstate', this.listener);
	            this.listener();
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            window.removeEventListener('popstate', this.listener);
	        }
	    }, {
	        key: 'go',
	        value: function go(path, replace, append) {
	            var url = this.formatPath(path, append);
	            if (replace) {
	                history.replaceState({}, '', url);
	            } else {
	                // record scroll position by replacing current state
	                history.replaceState({
	                    pos: {
	                        x: window.pageXOffset,
	                        y: window.pageYOffset
	                    }
	                }, '', location.href);
	                // then push new state
	                history.pushState({}, '', url);
	            }

	            var hashMatch = path.match(hashRegExp);
	            var hash = hashMatch && hashMatch[0];
	            path = url
	            // strip hash so it doesn't mess up params
	            .replace(hashRegExp, '')
	            // remove root before matching
	            .replace(this.rootRegExp, '');
	            this.onChange(path, null, hash);
	        }
	    }, {
	        key: 'formatPath',
	        value: function formatPath(path, append) {
	            return path.charAt(0) === '/' ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : (0, _util.resolvePath)(this.base || location.pathname, path, append);
	        }
	    }]);

	    return HTML5History;
	}();

	exports.default = HTML5History;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function () {
	  (function (root, factory) {
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	      module.exports = factory();
	    } else if (true) {
	      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	      var globalAlias = '__0';
	      var namespace = globalAlias.split('.');
	      var parent = root;
	      for (var i = 0; i < namespace.length - 1; i++) {
	        if (parent[namespace[i]] === undefined) parent[namespace[i]] = {};
	        parent = parent[namespace[i]];
	      }
	      parent[namespace[namespace.length - 1]] = factory();
	    }
	  })(this, function () {
	    function _requireDep(name) {
	      return {}[name];
	    }

	    var _bundleExports = undefined;NovaExports.__fixedUglify = "script>";NovaExports.exports = { "template": "\n    " };
	    NovaExports({
	      is: 'router-view',
	      props: {
	        content: {
	          type: String,
	          value: ''
	        }
	      },
	      createdHandler: function createdHandler() {},
	      attachedHandler: function attachedHandler() {},
	      detachedHandler: function detachedHandler() {},
	      attributeChangedHandler: function attributeChangedHandler(attrName, oldVal, newVal) {}
	    });

	    return _bundleExports;
	  });
	}).call(window);

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var internalKeysRegExp = /^(component|subRoutes|fullPath)$/;

	var Route = function Route(path, router) {
	    var _this = this;

	    _classCallCheck(this, Route);

	    var matched = router._recognizer.recognize(path);
	    if (matched) {
	        [].forEach.call(matched, function (match) {
	            for (var key in match.handler) {
	                if (!internalKeysRegExp.test(key)) {
	                    _this[key] = match.handler[key];
	                }
	            }
	        });
	        // set query and params
	        this.query = matched.queryParams;
	        this.params = [].reduce.call(matched, function (prev, cur) {
	            if (cur.params) {
	                for (var key in cur.params) {
	                    prev[key] = cur.params[key];
	                }
	            }
	            return prev;
	        }, {});
	    }

	    this.path = path;
	    // set some property for internal use
	    this.matched = matched || router._notFoundHandler;
	    Object.defineProperty(this, 'router', {
	        enumeralbe: false,
	        value: router
	    });
	    Object.freeze(this);
	};

	exports.default = Route;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(6);

	var _pipeline = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Transition = function () {
	    function Transition(router, to, from) {
	        _classCallCheck(this, Transition);

	        this.router = router;
	        this.to = to;
	        this.from = from;
	        this.next = null;
	        this.aborted = false;
	        this.done = false;
	    }

	    /**
	     * abort current transition and return to previous location
	     * @return {[type]} [description]
	     */


	    _createClass(Transition, [{
	        key: 'abort',
	        value: function abort() {
	            if (!this.aborted) {
	                this.aborted = true;
	                // 防止根路径加载失败时候的无限循环
	                var abortingOnLoad = !this.from.path && this.to.path === '/';
	                if (!abortingOnLoad) {
	                    this.router.replace(this.from.path || '/');
	                }
	            }
	        }

	        /**
	         * abort current transition and go to the new path
	         * path can be string or object
	         * @param  {[type]} path [description]
	         * @return {[type]}      [description]
	         */

	    }, {
	        key: 'redirect',
	        value: function redirect(path) {
	            if (!this.aborted) {
	                this.aborted = true;
	                if (typeof path === 'string') {
	                    path = (0, _util.mapParams)(path, this.to.params, this.to.query);
	                } else {
	                    path.params = path.params || this.to.params;
	                    path.query = path.query || this.to.query;
	                }
	                this.router.replace(path);
	            }
	        }

	        /**
	         * 开始一次转换
	         * @param  {Function} cb [description]
	         * @return {[type]}      [description]
	         */

	    }, {
	        key: 'start',
	        value: function start() {
	            var cb = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

	            var transition = this;

	            var deactivateQueue = this.from.matched ? [].map.call(this.from.matched, function (each) {
	                return each;
	            }) : [];
	            var activateQueue = this.to.matched ? [].map.call(this.to.matched, function (each) {
	                return each;
	            }) : [];
	            var reverseDeactivateQueue = deactivateQueue.slice().reverse();

	            // 获取重用队列
	            transition.reuseQueue = (0, _pipeline.getReuseQueue)(deactivateQueue, activateQueue, this);

	            // 此处有一个检测是否可以重用的部分
	            transition.runQueue(reverseDeactivateQueue, _pipeline.canDeactivate, { factor: 1 }, function () {
	                transition.runQueue(activateQueue, _pipeline.canActivate, { factor: -1 }, function () {
	                    // now we validate it can run
	                    // so i inform the router that i start a new transition
	                    transition.router._onTransitionValidated(transition);
	                    transition.runQueue(reverseDeactivateQueue, _pipeline.deactivate, { factor: 1 }, function () {
	                        transition.runQueue(activateQueue, _pipeline.activate, { factor: -1 }, cb);
	                    });
	                });
	            });
	        }
	        /**
	         * 递归执行队列里要求的函数
	         * @param  {[type]}   queue [description]
	         * @param  {Function} fn    [description]
	         * @param  {Function} cb    [description]
	         * @return {[type]}         [description]
	         */

	    }, {
	        key: 'runQueue',
	        value: function runQueue(queue, fn, _ref) {
	            var _ref$factor = _ref.factor;
	            var factor = _ref$factor === undefined ? 0 : _ref$factor;
	            var _ref$start = _ref.start;
	            var start = _ref$start === undefined ? 0 : _ref$start;
	            var _ref$end = _ref.end;
	            var end = _ref$end === undefined ? queue.length : _ref$end;
	            var _ref$fnArgs = _ref.fnArgs;
	            var fnArgs = _ref$fnArgs === undefined ? [] : _ref$fnArgs;
	            var cb = arguments.length <= 3 || arguments[3] === undefined ? function () {} : arguments[3];

	            var transition = this;
	            step(start);
	            function step(index) {
	                if (index >= end) {
	                    cb();
	                } else {
	                    var Args = void 0;
	                    if (!factor) {
	                        Args = [queue[index]];
	                    } else {
	                        Args = [queue[index + factor], queue[index]];
	                    }
	                    Args = Args.concat([transition, function () {
	                        step(index + 1);
	                    }]).concat(fnArgs);
	                    fn.apply(transition, Args);
	                }
	            }
	        }

	        /**
	         * 调用钩子函数专用
	         * @param  {[type]}   hook                  [description]
	         * @param  {[type]}   context               [description]
	         * @param  {Function} cb                    [description]
	         * @param  {Boolean}  options.expectBoolean [description]
	         * @param  {Boolean}  options.postActivate  [description]
	         * @param  {[type]}   options.processData   [description]
	         * @param  {Object}   options.cleanup                       } [description]
	         * @return {[type]}                         [description]
	         */

	    }, {
	        key: 'callHook',
	        value: function callHook(hook, context, cb) {
	            var _ref2 = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	            var _ref2$expectBoolean = _ref2.expectBoolean;
	            var expectBoolean = _ref2$expectBoolean === undefined ? false : _ref2$expectBoolean;
	            var _ref2$postActivate = _ref2.postActivate;
	            var postActivate = _ref2$postActivate === undefined ? false : _ref2$postActivate;
	            var // 必定触发激活
	            processData = _ref2.processData;
	            var cleanup = _ref2.cleanup;

	            var transition = this;
	            var nextCalled = false;
	            var aborted = false;

	            // abort the transition
	            var abort = function abort() {
	                aborted = true;
	                cleanup && cleanup();
	                transition.abort();
	            };

	            // handle errors
	            var onError = function onError(err) {
	                postActivate ? next() : abort();
	                if (err && !transition.router._suppress) {
	                    (0, _util.warn)('Uncaught error during transition: ');
	                    throw err instanceof Error ? err : new Error(err);
	                }
	            };

	            // promise will swallows errors?
	            // it seems i use resolve can sovle this problem
	            // but resolve means wrap a new promise=--=
	            // let me do a test
	            var onPromiseError = function onPromiseError(err) {
	                try {
	                    onError(err);
	                } catch (e) {
	                    setTimeout(function () {
	                        throw e;
	                    }, 0);
	                }
	            };
	            // 没有返回的下一步
	            var next = function next() {
	                if (nextCalled) {
	                    (0, _util.warn)('transition.next() should be called only once.');
	                    return;
	                }
	                nextCalled = true;
	                if (transition.aborted) {
	                    cleanup && cleanup();
	                    return;
	                }
	                cb && cb();
	            };

	            // 需要处理正确错误的下一步
	            var nextWithBoolean = function nextWithBoolean(res) {
	                if (typeof res === 'boolean') {
	                    res ? next() : abort();
	                } else if ((0, _util.isPromise)(res)) {
	                    res.then(function (ok) {
	                        ok ? next() : abort();
	                    }, onPromiseError);
	                } else if (!hook.length) {
	                    // 如果没有参数
	                    onError("must return Boolean or Promise in " + hook);
	                }
	            };

	            // 需要处理数据的下一步
	            var nextWithData = function nextWithData(data) {
	                var res = void 0;
	                try {
	                    res = processData(data);
	                } catch (err) {
	                    return onError(err);
	                }
	                if ((0, _util.isPromise)(res)) {
	                    res.then(next, onPromiseError);
	                } else {
	                    next();
	                }
	            };

	            // expose a clone of transition so that would not mix up
	            var exposed = {
	                to: transition.to,
	                from: transition.from,
	                abort: postActivate ? function () {
	                    return true;
	                } : abort,
	                next: processData ? nextWithData : next,
	                redirect: function redirect() {
	                    transition.redirect.apply(transition, arguments);
	                }
	            };

	            // actually call the hook
	            var res = void 0;
	            try {
	                res = hook.call(context, exposed);
	            } catch (err) {
	                return onError(err);
	            }
	            if (expectBoolean) {
	                nextWithBoolean(res);
	            } else if ((0, _util.isPromise)(res)) {
	                if (processData) {
	                    res.then(nextWithData, onPromiseError);
	                } else {
	                    res.then(next, onPromiseError);
	                }
	            } else if (processData && isPlainOjbect(res)) {
	                nextWithData(res);
	            } else if (!hook.length) {
	                // 没有传入参数的情况下
	                next();
	            }
	        }

	        /**
	         * call single hook or array of hooks
	         * @param  {[type]}   hooks   [description]
	         * @param  {[type]}   context [description]
	         * @param  {Function} cb      [description]
	         * @param  {[type]}   options [description]
	         * @return {[type]}           [description]
	         */

	    }, {
	        key: 'callHooks',
	        value: function callHooks(hooks, context, cb, options) {
	            var _this = this;

	            if (Array.isArray(hooks)) {
	                this.runQueue(hooks, function (hook, transition, next) {
	                    if (!_this.aborted) {
	                        _this.callHook(hook, context, next, options);
	                    }
	                }, {}, cb);
	            } else {
	                this.callHook(hooks, context, cb, options);
	            }
	        }
	    }]);

	    return Transition;
	}();

	exports.default = Transition;


	function isPlainOjbect(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	}

	function toArray(val) {
	    return val ? Array.prototype.slice.call(val) : [];
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getReuseQueue = getReuseQueue;
	exports.deactivate = deactivate;
	exports.activate = activate;
	exports.canActivate = canActivate;
	exports.canDeactivate = canDeactivate;
	exports.canReuse = canReuse;
	exports.data = data;
	exports.isChildNode = isChildNode;

	var _util = __webpack_require__(6);

	function getReuseQueue(deactivateQueue, activateQueue, transition) {
	    var depth = Math.min(deactivateQueue.length, activateQueue.length);
	    var reuseQueue = [];
	    for (var i = 0; i < depth; i++) {
	        var deactivateComponent = deactivateQueue[i].handler.component;
	        var activateComponent = activateQueue[i].handler.component;
	        if (Object.is(deactivateComponent, activateComponent)) {
	            var canComponentReuse = deactivateComponent.route ? typeof deactivateComponent.route.canReuse === 'function' ? deactivateComponent.route.canReuse({ to: transition.to, from: transition.from }) : deactivateComponent.route.canReuse : true;
	            if (canComponentReuse === false) {
	                i--;
	                break;
	            }
	            reuseQueue.push(deactivateQueue[i]);
	        } else {
	            i--;
	            break;
	        }
	    }
	    return reuseQueue;
	}

	function deactivate(parent, child, transition, cb) {
	    parent = parent || { handler: { component: transition.router.routerView } };
	    if (isChildNode(parent.handler.component, child.handler.component)) {
	        if (canReuse(child, transition)) {
	            cb && cb && cb();
	            return;
	        }
	        var component = child.handler.component;
	        var fn = component.route && component.route.deactivate || function () {
	            return true;
	        };
	        transition.callHook(fn, component, function () {
	            parent.handler.component.removeChild(child.handler.component);
	            cb && cb();
	        }, { postActivate: true });
	    } else {
	        cb && cb && cb();
	    }
	}

	function activate(parent, child, transition, cb) {
	    parent = parent || { handler: { component: transition.router.routerView } };
	    var component = child.handler.component;
	    if (!isChildNode(parent.handler.component, child.handler.component)) {
	        var fn = component.route && component.route.activate || function () {
	            return true;
	        };
	        transition.callHook(fn, component, function () {
	            parent.handler.component.appendChild(child.handler.component);
	            data(component, transition);
	            cb && cb();
	        }, { postActivate: true });
	    } else {
	        data(component, transition);
	        cb && cb();
	    }
	}

	function canActivate(parent, child, transition, cb) {
	    parent = parent || { handler: { component: transition.router.routerView } };
	    if (!isChildNode(parent.handler.component, child.handler.component)) {
	        var component = child.handler.component;
	        var fn = component.route && component.route.canActivate || function () {
	            return true;
	        };
	        transition.callHook(fn, component, cb, { expectBoolean: true });
	    } else {
	        cb && cb();
	    }
	}

	function canDeactivate(parent, child, transition, cb) {
	    parent = parent || { handler: { component: transition.router.routerView } };
	    if (parent.handler.component.contains(child.handler.component)) {
	        if (canReuse(child, transition)) {
	            cb && cb();
	            return;
	        }
	        var component = child.handler.component;
	        var fn = component.route && component.route.canDeactivate || function () {
	            return true;
	        };
	        transition.callHook(fn, component, cb, { expectBoolean: true });
	    } else {
	        cb && cb();
	    }
	}

	function canReuse(child, transition) {
	    for (var i = transition.reuseQueue.length - 1; i > -1; i--) {
	        if (Object.is(child.handler.component, transition.reuseQueue[i].handler.component)) {
	            return true;
	        }
	    }
	    return false;
	}

	function data(component, transition) {
	    (0, _util.setNovaProperty)(component, 'loadingRouteData', true);
	    var fn = component.route && component.route.data || function () {
	        return {};
	    };
	    transition.callHook(fn, component, function () {
	        (0, _util.setNovaProperty)(component, 'loadingRouteData', false);
	    }, {
	        postActivate: true,
	        // 处理data语法糖
	        processData: function processData(data) {
	            var promises = [];
	            if (isPlainObject(data)) {
	                Object.keys(data).forEach(function (key) {
	                    var val = data[key];
	                    if ((0, _util.isPromise)(val)) {
	                        promises.push(val.then(function (resolvedData) {
	                            (0, _util.setNovaProperty)(component, key, resolvedData);
	                        }));
	                    } else {
	                        (0, _util.setNovaProperty)(component, key, val);
	                    }
	                });
	            }
	            if (promises.length) {
	                return promises[0].constructor.all(promises);
	            }
	        }
	    });
	}

	function isChildNode(parent, child) {
	    if (!parent || !child || !parent.hasChildNodes()) {
	        return false;
	    }
	    var nodes = parent.childNodes;
	    for (var i = nodes.length - 1; i > -1; i--) {
	        if (nodes[i].isSameNode(child)) {
	            return true;
	        }
	    }
	    return false;
	}

	/**
	 * Check plain object.
	 *
	 * @param {*} val
	 */

	function isPlainObject(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _hash = __webpack_require__(12);

	var _hash2 = _interopRequireDefault(_hash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Hash History', function (argument) {
	    it('notify change', function (done) {
	        var history = new _hash2.default({ onChange: step1 });
	        history.start();
	        // init
	        function step1(path) {
	            expect(location.hash).toBe('#/');
	            expect(path).toBe('/');
	            history.onChange = step2;
	            history.go('/what/the');
	        }
	        // root path & hash
	        function step2(path) {
	            expect(location.hash).toBe('#/what/the');
	            expect(path).toBe('/what/the');
	            history.onChange = step3;
	            history.go('huh', true);
	        }
	        // relative path
	        function step3(path) {
	            expect(location.hash).toBe('#/what/huh');
	            expect(path).toBe('/what/huh');
	            history.stop();
	            window.addEventListener('hashchange', function onChange() {
	                window.removeEventListener('hashchange', onChange);
	                done();
	            });
	            location.hash = '';
	        }
	    });

	    it('hashbang option', function (done) {
	        var history = new _hash2.default({
	            onChange: step1,
	            hashbang: true
	        });
	        history.start();
	        // init
	        function step1(path) {
	            expect(path).toBe('/');
	            history.onChange = step2;
	            history.go('/what/the');
	        }
	        // root path & hash
	        function step2(path) {
	            expect(location.hash).toBe('#!/what/the');
	            expect(path).toBe('/what/the');
	            history.onChange = step3;
	            history.go('huh', true);
	        }
	        // relative path
	        function step3(path) {
	            expect(location.hash).toBe('#!/what/huh');
	            expect(path).toBe('/what/huh');
	            history.stop();
	            location.hash = '';
	            done();
	        }
	    });
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _html = __webpack_require__(14);

	var _html2 = _interopRequireDefault(_html);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (!window.isIE9) {
	    describe('HTML5 history', function () {
	        var url = location.href;
	        var pathname = location.pathname;
	        var history = void 0;
	        afterEach(function (done) {
	            history.stop();
	            window.history.replaceState({}, '', url);
	            setTimeout(done, 0);
	        });

	        it('notify change', function (done) {
	            history = new _html2.default({
	                onChange: step1
	            });
	            history.start();
	            // init
	            function step1(path) {
	                expect(path).toBe(pathname);
	                history.onChange = step2;
	                history.go('/what/the#lol');
	            }
	            // root path & hash
	            function step2(path, state, hash) {
	                expect(location.pathname).toBe('/what/the');
	                expect(path).toBe('/what/the');
	                expect(state).toBeNull();
	                expect(hash).toBe('#lol');
	                history.onChange = step3;
	                history.go('huh', true);
	            }
	            // relative path
	            function step3(path) {
	                expect(location.pathname).toBe('/what/huh');
	                expect(path).toBe('/what/huh');
	                done();
	            }
	        });

	        it('root option', function (done) {
	            history = new _html2.default({
	                onChange: step1,
	                root: 'root/'
	            });
	            expect(history.root).toBe('/root');
	            history.start();
	            function step1() {
	                history.onChange = step2;
	                history.go('/haha');
	            }
	            function step2(path) {
	                expect(location.pathname).toBe('/root/haha');
	                expect(path).toBe('/haha');
	                done();
	            }
	        });

	        it('popstate with root', function (done) {
	            history = new _html2.default({
	                onChange: step1,
	                root: 'root/'
	            });
	            expect(history.root).toBe('/root');
	            history.start();
	            function step1() {
	                history.onChange = step2;
	                history.go('/');
	            }
	            function step2(path) {
	                expect(location.pathname).toBe('/root/');
	                expect(path).toBe('/');
	                history.onChange = step3;
	                history.go('/haha');
	            }
	            function step3(path) {
	                expect(location.pathname).toBe('/root/haha');
	                expect(path).toBe('/haha');
	                history.onChange = step4;
	                window.history.back();
	            }
	            function step4(path) {
	                expect(location.pathname).toBe('/root/');
	                expect(path).toBe('/');
	                done();
	            }
	        });

	        it('respect <base>', function (done) {
	            var base = document.createElement('base');
	            base.setAttribute('href', '/base/');
	            document.head.appendChild(base);
	            history = new _html2.default({
	                onChange: step1
	            });
	            history.start();
	            function step1(path) {
	                history.onChange = step2;
	                history.go('test');
	            }
	            function step2(path) {
	                expect(location.pathname).toBe('/base/test');
	                expect(path).toBe('/base/test');
	                document.head.removeChild(base);
	                done();
	            }
	        });
	    });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _pipelineTestUtil = __webpack_require__(22);

	var _util = __webpack_require__(6);

	var routerUtil = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	describe('activate', function () {
	    beforeEach(function () {
	        spyOn(routerUtil, 'warn');
	    });

	    it('sync', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                activate: function activate(transition) {
	                    transition.next();
	                }
	            }
	        }, function (router, calls, emitter) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate']);
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('sync (no arg)', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                activate: function activate() {}
	            }
	        }, function (router, calls, emitter) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate']);
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('async', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                activate: function activate(transition) {
	                    setTimeout(function () {
	                        transition.next();
	                    }, wait);
	                }
	            }
	        }, function (router, calls, emitter) {
	            router.go('/a');
	            expect(router.routerView.children.length).toBe(0);
	            setTimeout(function () {
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate']);
	                expect(router.routerView.children[0].content).toBe('a');
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait);
	        });
	    });

	    it('abort sync', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                activate: function activate(transition) {
	                    // abort should have no effect now
	                    // it will be next
	                    transition.abort();
	                    transition.next();
	                }
	            }
	        }, function (router, calls, emitter) {
	            router.go('/a');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate']);
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(router._currentRoute.path).toBe('/a');
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('promise', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                activate: function activate(transition) {
	                    return new Promise(function (resolve, reject) {
	                        setTimeout(resolve, wait);
	                    });
	                }
	            }
	        }, function (router, calls, emitter) {
	            router.go('/a');
	            expect(router.routerView.children.length).toBe(0);
	            setTimeout(function () {
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate']);
	                expect(router.routerView.children[0].content).toBe('a');
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });

	    it('promise reject', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                activate: function activate(transition) {
	                    return new Promise(function (resolve, reject) {
	                        setTimeout(reject, wait);
	                    });
	                }
	            }
	        }, function (router, calls, emitter) {
	            router.go('/a');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate']);
	            expect(router.routerView.children.length).toBe(0);
	            expect(router._currentRoute.path).toBe('/a');
	            setTimeout(function () {
	                // should continue transition
	                expect(router._currentRoute.path).toBe('/a');
	                expect(router.routerView.children[0].content).toBe('a');
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });

	    it('error', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                activate: function activate(transition) {
	                    throw new Error('i throw an error');
	                }
	            }
	        }, function (router, calls, emitter) {
	            var errorThrown = jasmine.createSpy();
	            try {
	                router.go('/a');
	            } catch (e) {
	                errorThrown();
	            }
	            expect(routerUtil.warn).toHaveBeenCalled();
	            expect(errorThrown).toHaveBeenCalled();
	            // should continue transition
	            expect(router._currentRoute.path).toBe('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            done();
	        });
	    });
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.test = test;
	exports.assertCalls = assertCalls;

	var _index = __webpack_require__(11);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Emitter = __webpack_require__(23).EventEmitter;


	/**
	 * setup a router for testing with two nested routes:
	 *
	 * - /a/b
	 * - /c/d
	 *
	 * configs: - an object that contains the route configs for each component
	 * cb
	 */

	function test(configs, cb) {
	    var emitter = new Emitter();
	    var router = new _index2.default({ abstract: true });
	    var el = document.createElement('router-view');
	    var calls = [];
	    // wrap hooks
	    Object.keys(configs).forEach(function (route) {
	        var config = configs[route];
	        Object.keys(config).forEach(function (hook) {
	            var fn = config[hook];
	            if (Array.isArray(fn) || hook === 'mixins') {
	                return;
	            }
	            // sort the funciton by arguments number
	            if (fn.length) {
	                config[hook] = function (transition) {
	                    var event = route + '.' + hook;
	                    calls.push(event);
	                    var res = typeof fn === 'function' ? fn(transition) : fn;
	                    emitter.emit(event);
	                    return res;
	                };
	            } else {
	                config[hook] = function () {
	                    var event = route + '.' + hook;
	                    calls.push(event);
	                    var res = typeof fn === 'function' ? fn() : fn;
	                    emitter.emit(event);
	                    return res;
	                };
	            }
	        });
	    });
	    var aView = createNovaView('a', configs.a);
	    var bView = createNovaView('b', configs.b);
	    var cView = createNovaView('c', configs.c);
	    var dView = createNovaView('d', configs.d);
	    var eView = createNovaView('e', configs.e);
	    var dataView = createNovaView('data', configs.data);

	    router.map({
	        '/a': {
	            component: aView,
	            subRoutes: {
	                '/b': {
	                    component: bView
	                },
	                '/e': {
	                    component: eView
	                }
	            }
	        },
	        '/c': {
	            component: cView,
	            subRoutes: {
	                '/d': {
	                    component: dView
	                }
	            }
	        },
	        '/data/:msg': {
	            component: dataView
	        }
	    });

	    router.start(el, function () {
	        cb(router, calls, emitter);
	    });
	}
	function createNovaView(content, route) {
	    var tmp = document.createElement('nova-test-view');
	    tmp.content = content;
	    tmp.route = route;
	    return tmp;
	}

	function assertCalls(calls, expects) {
	    expects.forEach(function (each, index) {
	        expect(calls[index]).toBe(each);
	    });
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _pipelineTestUtil = __webpack_require__(22);

	var _util = __webpack_require__(6);

	var routerUtil = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	describe('canActivate', function () {
	    beforeEach(function () {
	        spyOn(routerUtil, 'warn');
	    });

	    it('sync allow', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canActivate: function canActivate() {
	                    return true;
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.canActivate']);
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('sync allow with transition.next', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canActivate: function canActivate(transition) {
	                    transition.next();
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a');
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            expect(router.routerView.children[0].content).toBe('a');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.canActivate']);
	            done();
	        });
	    });

	    it('async allow with transition.next', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canActivate: function canActivate(transition) {
	                    setTimeout(function () {
	                        transition.next(true);
	                    }, wait);
	                }
	            }
	        }, function (router, calls) {
	            // i would like that use promise
	            // in case i don't know whether the user forget to return boolean
	            // so that i will take a warn here
	            router.go('/a');
	            expect(router.routerView.children.length).toBe(0);
	            setTimeout(function () {
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                expect(router.routerView.children[0].content).toBe('a');
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.canActivate']);
	                expect(router._currentRoute.path).toBe('/a');
	                done();
	            }, wait);
	        });
	    });

	    it('sync reject', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canActivate: function canActivate() {
	                    return false;
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a');
	            expect(router.routerView.children.length).toBe(0);
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.canActivate']);
	            expect(router._currentRoute.path).toBe('/');
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('sync reject with transition.abort', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canActivate: function canActivate(transition) {
	                    transition.abort();
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a');
	            expect(router.routerView.children.length).toBe(0);
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.canActivate']);
	            expect(router._currentRoute.path).toBe('/');
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('async reject with transition', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canActivate: function canActivate(transition) {
	                    setTimeout(function () {
	                        transition.abort();
	                    }, wait);
	                }
	            }
	        }, function (router, calls) {
	            // i would like that use promise
	            // in case i don't know whether the user forget to return boolean
	            // so that i will take a warn here
	            router.go('/a');
	            expect(router.routerView.children.length).toBe(0);
	            setTimeout(function () {
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                expect(router.routerView.children.length).toBe(0);
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.canActivate']);
	                expect(router._currentRoute.path).toBe('/');
	                done();
	            }, wait);
	        });
	    });

	    it('promise allow', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canActivate: function canActivate(transition) {
	                    return new Promise(function (resolve, reject) {
	                        setTimeout(function () {
	                            resolve(true);
	                        }, wait);
	                    });
	                }
	            }
	        }, function (router, calls) {
	            // i would like that use promise
	            // in case i don't know whether the user forget to return boolean
	            // so that i will take a warn here
	            router.go('/a');
	            expect(router.routerView.children.length).toBe(0);
	            setTimeout(function () {
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                expect(router.routerView.children[0].content).toBe('a');
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.canActivate']);
	                expect(router._currentRoute.path).toBe('/a');
	                done();
	            }, wait * 2);
	        });
	    });

	    it('promise resolve false', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canActivate: function canActivate(transition) {
	                    return new Promise(function (resolve, reject) {
	                        setTimeout(function () {
	                            resolve(false);
	                        }, wait);
	                    });
	                }
	            }
	        }, function (router, calls) {
	            // i would like that use promise
	            // in case i don't know whether the user forget to return boolean
	            // so that i will take a warn here
	            router.go('/a');
	            expect(router.routerView.children.length).toBe(0);
	            setTimeout(function () {
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                expect(router.routerView.children.length).toBe(0);
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.canActivate']);
	                expect(router._currentRoute.path).toBe('/');
	                done();
	            }, wait * 2);
	        });
	    });

	    it('promise reject', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canActivate: function canActivate(transition) {
	                    return new Promise(function (resolve, reject) {
	                        setTimeout(function () {
	                            reject();
	                        }, wait);
	                    });
	                }
	            }
	        }, function (router, calls) {
	            // i would like that use promise
	            // in case i don't know whether the user forget to return boolean
	            // so that i will take a warn here
	            router.go('/a');
	            expect(router.routerView.children.length).toBe(0);
	            setTimeout(function () {
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                expect(router.routerView.children.length).toBe(0);
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.canActivate']);
	                expect(router._currentRoute.path).toBe('/');
	                done();
	            }, wait * 2);
	        });
	    });

	    it('sync with transition but do noting', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canActivate: function canActivate(transition) {
	                    // do nothing
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a');
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            expect(router.routerView.children.length).toBe(0);
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.canActivate']);
	            done();
	        });
	    });
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _pipelineTestUtil = __webpack_require__(22);

	var _util = __webpack_require__(6);

	var routerUtil = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	describe('canDeactivate', function () {
	    beforeEach(function () {
	        spyOn(routerUtil, 'warn');
	    });

	    it('sync allow', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canDeactivate: function canDeactivate() {
	                    return true;
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            router.go('/c');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.canDeactivate']);
	            expect(router.routerView.children[0].content).toBe('c');
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('sync allow with transition', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canDeactivate: function canDeactivate(transition) {
	                    transition.next();
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            router.go('/c');
	            expect(router.routerView.children[0].content).toBe('c');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.canDeactivate']);
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('async allow with transition', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canDeactivate: function canDeactivate(transition) {
	                    setTimeout(function () {
	                        transition.next();
	                    }, wait);
	                }
	            }
	        }, function (router, calls) {
	            // i would like that use promise
	            // in case i don't know whether the user forget to return boolean
	            // so that i will take a warn here
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(router._currentRoute.path).toBe('/a');
	            router.go('/c');
	            setTimeout(function () {
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.canDeactivate']);
	                expect(router.routerView.children[0].content).toBe('c');
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait);
	        });
	    });

	    it('sync reject', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canDeactivate: function canDeactivate() {
	                    return false;
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(router._currentRoute.path).toBe('/a');
	            router.go('/c');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.canDeactivate']);
	            expect(router._currentRoute.path).toBe('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('sync reject with transition.abort', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canDeactivate: function canDeactivate(transition) {
	                    transition.abort();
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            router.go('/c');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.canDeactivate']);
	            expect(router._currentRoute.path).toBe('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('async reject with transition.abort', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canDeactivate: function canDeactivate(transition) {
	                    setTimeout(function () {
	                        transition.abort();
	                    }, wait);
	                }
	            }
	        }, function (router, calls) {
	            // i would like that use promise
	            // in case i don't know whether the user forget to return boolean
	            // so that i will take a warn here
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(router._currentRoute.path).toBe('/a');
	            router.go('/c');
	            setTimeout(function () {
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.canDeactivate']);
	                expect(router.routerView.children[0].content).toBe('a');
	                expect(router._currentRoute.path).toBe('/a');
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait);
	        });
	    });

	    it('promise allow', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canDeactivate: function canDeactivate(transition) {
	                    return new Promise(function (resolve, reject) {
	                        setTimeout(function () {
	                            resolve(true);
	                        }, wait);
	                    });
	                }
	            }
	        }, function (router, calls) {
	            // i would like that use promise
	            // in case i don't know whether the user forget to return boolean
	            // so that i will take a warn here
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(router._currentRoute.path).toBe('/a');
	            router.go('/c');
	            setTimeout(function () {
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.canDeactivate']);
	                expect(router.routerView.children[0].content).toBe('c');
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });

	    it('promise resolve false', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canDeactivate: function canDeactivate(transition) {
	                    return new Promise(function (resolve, reject) {
	                        setTimeout(function () {
	                            resolve(false);
	                        }, wait);
	                    });
	                }
	            }
	        }, function (router, calls) {
	            // i would like that use promise
	            // in case i don't know whether the user forget to return boolean
	            // so that i will take a warn here
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(router._currentRoute.path).toBe('/a');
	            router.go('/c');
	            setTimeout(function () {
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.canDeactivate']);
	                expect(router.routerView.children[0].content).toBe('a');
	                expect(router._currentRoute.path).toBe('/a');
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });

	    it('promise reject', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canDeactivate: function canDeactivate(transition) {
	                    return new Promise(function (resolve, reject) {
	                        setTimeout(function () {
	                            reject();
	                        }, wait);
	                    });
	                }
	            }
	        }, function (router, calls) {
	            // i would like that use promise
	            // in case i don't know whether the user forget to return boolean
	            // so that i will take a warn here
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(router._currentRoute.path).toBe('/a');
	            router.go('/c');
	            setTimeout(function () {
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.canDeactivate']);
	                expect(router.routerView.children[0].content).toBe('a');
	                expect(router._currentRoute.path).toBe('/a');
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });

	    it('sync with transition but do nothing', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canDeactivate: function canDeactivate(transition) {
	                    // transition.next(true)
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a');
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            expect(router.routerView.children[0].content).toBe('a');
	            router.go('/c');
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            expect(router.routerView.children[0].content).toBe('a');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.canDeactivate']);
	            done();
	        });
	    });
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _pipelineTestUtil = __webpack_require__(22);

	var _util = __webpack_require__(6);

	var routerUtil = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	describe('canReuse', function () {
	    beforeEach(function () {
	        spyOn(routerUtil, 'warn');
	    });

	    it('allow', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canReuse: true,
	                activate: function activate(transition) {
	                    // just for loggin
	                    transition.next();
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a/b');
	            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ab');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate']);
	            var a = router.routerView.children[0];
	            router.go('/a/e');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate', 'a.canReuse']);
	            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ae');
	            expect(router.routerView.children[0]).toBe(a);
	            done();
	        });
	    });

	    it('not set', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canReuse: '',
	                activate: function activate(transition) {
	                    // just for loggin
	                    transition.next();
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a/b');
	            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ab');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate']);
	            var a = router.routerView.children[0];
	            router.go('/a/e');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate', 'a.canReuse']);
	            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ae');
	            expect(router.routerView.children[0]).toBe(a);
	            done();
	        });
	    });

	    it('deny', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canReuse: false,
	                activate: function activate(transition) {
	                    // just for loggin
	                    transition.next();
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a/b');
	            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ab');
	            // assertCalls(calls, ['a.activate'])
	            var a = router.routerView.children[0];
	            router.go('/a/e');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate', 'a.canReuse', 'a.activate']);
	            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ae');
	            // actually though i detach and attach
	            // it still that component
	            expect(router.routerView.children[0]).toBe(a);
	            done();
	        });
	    });

	    it('function allow', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canReuse: function canReuse() {
	                    return true;
	                },
	                activate: function activate(transition) {
	                    // just for loggin
	                    transition.next();
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a/b');
	            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ab');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate']);
	            var a = router.routerView.children[0];
	            router.go('/a/e');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate', 'a.canReuse']);
	            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ae');
	            expect(router.routerView.children[0]).toBe(a);
	            done();
	        });
	    });

	    it('function deny', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                canReuse: function canReuse() {
	                    return false;
	                },
	                activate: function activate(transition) {
	                    // just for loggin
	                    transition.next();
	                }
	            }
	        }, function (router, calls) {
	            router.go('/a/b');
	            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ab');
	            // assertCalls(calls, ['a.activate'])
	            var a = router.routerView.children[0];
	            router.go('/a/e');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.activate', 'a.canReuse', 'a.activate']);
	            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ae');
	            // actually though i detach and attach
	            // it still that component
	            expect(router.routerView.children[0]).toBe(a);
	            done();
	        });
	    });
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _pipelineTestUtil = __webpack_require__(22);

	var _util = __webpack_require__(6);

	var routerUtil = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	describe('data', function () {
	    beforeEach(function () {
	        spyOn(routerUtil, 'warn');
	    });

	    it('initial load', function (done) {
	        (0, _pipelineTestUtil.test)({
	            data: {
	                data: function data(transition) {
	                    setTimeout(function () {
	                        transition.next({
	                            msg: transition.to.params.msg
	                        });
	                    }, wait);
	                }
	            }
	        }, function (router, calls) {
	            router.go('/data/hello');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['data.data']);
	            expect(router.routerView.children[0].content).toBe('data');
	            expect(router.routerView.children[0].loadingRouteData).toBe(true);
	            setTimeout(function () {
	                expect(router.routerView.children[0].loadingRouteData).toBe(false);
	                expect(router.routerView.children[0].$route.params.msg).toBe('hello');
	                expect(router.routerView.children[0].msg).toBe('hello');
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });

	    it('reload', function (done) {
	        (0, _pipelineTestUtil.test)({
	            data: {
	                data: function data(transition) {
	                    setTimeout(function () {
	                        transition.next({
	                            msg: transition.to.params.msg
	                        });
	                    }, wait);
	                },
	                activate: function activate() {
	                    // just for logging
	                }
	            }
	        }, function (router, calls) {
	            router.go('/data/hello');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['data.activate', 'data.data']);
	            expect(router.routerView.children[0].loadingRouteData).toBe(true);
	            setTimeout(function () {
	                expect(router.routerView.children[0].loadingRouteData).toBe(false);
	                expect(router.routerView.children[0].$route.params.msg).toBe('hello');
	                expect(router.routerView.children[0].msg).toBe('hello');
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                router.go('/data/reload');
	                (0, _pipelineTestUtil.assertCalls)(calls, ['data.activate', 'data.data', 'data.data']);
	                expect(router.routerView.children[0].loadingRouteData).toBe(true);
	                setTimeout(function () {
	                    expect(router.routerView.children[0].loadingRouteData).toBe(false);
	                    expect(router.routerView.children[0].$route.params.msg).toBe('reload');
	                    expect(router.routerView.children[0].msg).toBe('reload');
	                    expect(routerUtil.warn).not.toHaveBeenCalled();
	                    done();
	                }, wait * 2);
	            }, wait * 2);
	        });
	    });

	    it('promise reslove', function (done) {
	        (0, _pipelineTestUtil.test)({
	            data: {
	                data: function data(transition) {
	                    return new Promise(function (reslove, reject) {
	                        setTimeout(function () {
	                            reslove();
	                        }, wait);
	                    });
	                }
	            }
	        }, function (router, calls) {
	            router.go('/data/hello');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['data.data']);
	            expect(router.routerView.children[0].content).toBe('data');
	            expect(router.routerView.children[0].loadingRouteData).toBe(true);
	            setTimeout(function () {
	                expect(router.routerView.children[0].loadingRouteData).toBe(false);
	                expect(router.routerView.children[0].$route.params.msg).toBe('hello');
	                expect(router.routerView.children[0].msg).toBe(undefined);
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });

	    it('promise reslove with msg', function (done) {
	        (0, _pipelineTestUtil.test)({
	            data: {
	                data: function data(transition) {
	                    return new Promise(function (reslove, reject) {
	                        setTimeout(function () {
	                            reslove(transition.to.params.msg);
	                        }, wait);
	                    });
	                }
	            }
	        }, function (router, calls) {
	            router.go('/data/hello');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['data.data']);
	            expect(router.routerView.children[0].content).toBe('data');
	            expect(router.routerView.children[0].loadingRouteData).toBe(true);
	            setTimeout(function () {
	                expect(router.routerView.children[0].loadingRouteData).toBe(false);
	                expect(router.routerView.children[0].$route.params.msg).toBe('hello');
	                expect(router.routerView.children[0].msg).toBe(undefined);
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });

	    it('promise reject', function (done) {
	        (0, _pipelineTestUtil.test)({
	            data: {
	                data: function data(transition) {
	                    return new Promise(function (reslove, reject) {
	                        setTimeout(function () {
	                            reject();
	                        }, wait);
	                    });
	                }
	            }
	        }, function (router, calls) {
	            router.go('/data/hello');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['data.data']);
	            expect(router.routerView.children[0].content).toBe('data');
	            expect(router.routerView.children[0].loadingRouteData).toBe(true);
	            setTimeout(function () {
	                expect(router.routerView.children[0].loadingRouteData).toBe(false);
	                expect(router.routerView.children[0].$route.params.msg).toBe('hello');
	                expect(router.routerView.children[0].msg).toBe(undefined);
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });

	    it('return object containing promise', function (done) {
	        var date = new Date();
	        (0, _pipelineTestUtil.test)({
	            data: {
	                data: function data(transition) {
	                    return {
	                        msg: new Promise(function (reslove, reject) {
	                            setTimeout(function () {
	                                reslove(transition.to.params.msg);
	                            }, wait);
	                        })
	                    };
	                }
	            }
	        }, function (router, calls) {
	            router.go('/data/hello');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['data.data']);
	            expect(router.routerView.children[0].content).toBe('data');
	            expect(router.routerView.children[0].loadingRouteData).toBe(true);
	            setTimeout(function () {
	                expect(router.routerView.children[0].loadingRouteData).toBe(false);
	                expect(router.routerView.children[0].$route.params.msg).toBe('hello');
	                expect(router.routerView.children[0].msg).toBe('hello');
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });

	    it('return object with many types of data', function (done) {
	        var date = new Date();
	        var arr = [4, 5, 6];
	        var obj = { test: { test: 'i am a test' } };
	        (0, _pipelineTestUtil.test)({
	            data: {
	                data: function data(transition) {
	                    return {
	                        booleanTest: true,
	                        numberTest: 10,
	                        stringTest: "test",
	                        dateTest: date,
	                        arrayTest: arr,
	                        objectTest: obj
	                    };
	                }
	            }
	        }, function (router, calls) {
	            router.go('/data/hello');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['data.data']);
	            expect(router.routerView.children[0].content).toBe('data');
	            expect(router.routerView.children[0].loadingRouteData).toBe(false);
	            expect(router.routerView.children[0].$route.params.msg).toBe('hello');
	            expect(router.routerView.children[0].booleanTest).toBe(true);
	            expect(router.routerView.children[0].numberTest).toBe(10);
	            expect(router.routerView.children[0].dateTest).toBe(date);
	            expect(router.routerView.children[0].dateTest instanceof Date).toBe(true);
	            expect(router.routerView.children[0].arrayTest).toBe(arr);
	            expect(router.routerView.children[0].objectTest).toBe(obj);
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('return object containing promise reject', function (done) {
	        (0, _pipelineTestUtil.test)({
	            data: {
	                data: function data(transition) {
	                    return {
	                        msg: new Promise(function (reslove, reject) {
	                            setTimeout(function () {
	                                reject();
	                            }, wait);
	                        })
	                    };
	                }
	            }
	        }, function (router, calls) {
	            router.go('/data/hello');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['data.data']);
	            expect(router.routerView.children[0].content).toBe('data');
	            expect(router.routerView.children[0].loadingRouteData).toBe(true);
	            setTimeout(function () {
	                expect(router.routerView.children[0].loadingRouteData).toBe(false);
	                expect(router.routerView.children[0].$route.params.msg).toBe('hello');
	                expect(router.routerView.children[0].msg).toBe(undefined);
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _pipelineTestUtil = __webpack_require__(22);

	var _util = __webpack_require__(6);

	var routerUtil = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	describe('deactivate', function () {
	    beforeEach(function () {
	        spyOn(routerUtil, 'warn');
	    });

	    it('sync', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                deactivate: function deactivate(transition) {
	                    transition.next();
	                }
	            }
	        }, function (router, calls, emitter) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            router.go('/b');
	            expect(router.routerView.children.length).toBe(0);
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.deactivate']);
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('sync (no arg)', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                deactivate: function deactivate() {}
	            }
	        }, function (router, calls, emitter) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            router.go('/b');
	            expect(router.routerView.children.length).toBe(0);
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.deactivate']);
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('async', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                deactivate: function deactivate(transition) {
	                    setTimeout(function () {
	                        transition.next();
	                    }, wait);
	                }
	            }
	        }, function (router, calls, emitter) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            router.go('/b');
	            expect(router.routerView.children[0].content).toBe('a');
	            setTimeout(function () {
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.deactivate']);
	                expect(router.routerView.children.length).toBe(0);
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait);
	        });
	    });

	    it('abort sync', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                deactivate: function deactivate(transition) {
	                    // abort should have no effect now
	                    // it will be next
	                    transition.abort();
	                    transition.next();
	                }
	            }
	        }, function (router, calls, emitter) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            router.go('/b');
	            expect(router.routerView.children.length).toBe(0);
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.deactivate']);
	            expect(routerUtil.warn).not.toHaveBeenCalled();
	            done();
	        });
	    });

	    it('promise', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                deactivate: function deactivate(transition) {
	                    return new Promise(function (resolve, reject) {
	                        setTimeout(resolve, wait);
	                    });
	                }
	            }
	        }, function (router, calls, emitter) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(router._currentRoute.path).toBe('/a');
	            router.go('/b');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(router._currentRoute.path).toBe('/b');
	            setTimeout(function () {
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.deactivate']);
	                expect(router.routerView.children.length).toBe(0);
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });

	    it('promise reject', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                deactivate: function deactivate(transition) {
	                    return new Promise(function (resolve, reject) {
	                        setTimeout(reject, wait);
	                    });
	                }
	            }
	        }, function (router, calls, emitter) {
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(router._currentRoute.path).toBe('/a');
	            router.go('/b');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(router._currentRoute.path).toBe('/b');
	            setTimeout(function () {
	                (0, _pipelineTestUtil.assertCalls)(calls, ['a.deactivate']);
	                expect(router.routerView.children.length).toBe(0);
	                expect(routerUtil.warn).not.toHaveBeenCalled();
	                done();
	            }, wait * 2);
	        });
	    });

	    it('error', function (done) {
	        (0, _pipelineTestUtil.test)({
	            a: {
	                deactivate: function deactivate(transition) {
	                    throw new Error('i throw an error');
	                }
	            }
	        }, function (router, calls, emitter) {
	            var errorThrown = jasmine.createSpy();
	            router.go('/a');
	            expect(router.routerView.children[0].content).toBe('a');
	            expect(router._currentRoute.path).toBe('/a');
	            try {
	                router.go('/b');
	            } catch (e) {
	                errorThrown();
	            }
	            expect(router._currentRoute.path).toBe('/b');
	            (0, _pipelineTestUtil.assertCalls)(calls, ['a.deactivate']);
	            expect(router.routerView.children.length).toBe(0);
	            expect(routerUtil.warn).toHaveBeenCalled();
	            done();
	        });
	    });
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _pipelineTestUtil = __webpack_require__(22);

	var _util = __webpack_require__(6);

	var routerUtil = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	describe('full', function () {

	    beforeEach(function () {
	        spyOn(routerUtil, 'warn');
	    });

	    it('should call hooks in correct order', function (done) {
	        function makeConfig() {
	            return {
	                canActivate: function canActivate() {
	                    // sync boolean
	                    return true;
	                },
	                activate: function activate(transition) {
	                    setTimeout(function () {
	                        transition.next();
	                        // multiple call should warn
	                        transition.next();
	                    }, wait);
	                },
	                canDeactivate: function canDeactivate() {
	                    // promise boolean
	                    return new Promise(function (resolve, rejct) {
	                        setTimeout(function () {
	                            resolve(true);
	                        }, wait);
	                    });
	                },
	                deactivate: function deactivate(transition) {
	                    // promise next
	                    return new Promise(function (resolve, rejct) {
	                        setTimeout(resolve, wait);
	                    });
	                }
	            };
	        }

	        (0, _pipelineTestUtil.test)({
	            a: makeConfig(),
	            b: makeConfig(),
	            c: makeConfig(),
	            d: makeConfig()
	        }, function (router, calls, emitter) {
	            router.go('/a/b');
	            emitter.once('b.activate', function () {
	                (0, _pipelineTestUtil.assertCalls)(calls, [
	                // initial render
	                'a.canActivate', 'b.canActivate', 'a.activate', 'b.activate']);
	                expect(router.routerView.children[0].content).toBe('a');
	                expect(router.routerView.children[0].children.length).toBe(0);
	                setTimeout(function () {
	                    expect(routerUtil.warn.calls.count()).toBe(2);
	                    expect(routerUtil.warn).toHaveBeenCalledWith('transition.next() should be called only once.');
	                    // expect(router.routerView.children[0].content).toBe('a')
	                    expect(router.routerView.children[0].children[0].content).toBe('b');
	                    router.go('/c/d');
	                    // done()
	                }, wait);
	            });

	            emitter.once('d.activate', function () {
	                (0, _pipelineTestUtil.assertCalls)(calls, [
	                // initial render
	                'a.canActivate', 'b.canActivate', 'a.activate', 'b.activate',
	                // check can deactivate current views from bottom up
	                'b.canDeactivate', 'a.canDeactivate',
	                // check can activate new views from top down
	                'c.canActivate', 'd.canActivate',
	                // deactivate old views from bottom up
	                'b.deactivate', 'a.deactivate',
	                // activate new views from top down
	                'c.activate', 'd.activate']);
	                expect(router.routerView.children[0].content).toBe('c');
	                expect(router.routerView.children[0].children.length).toBe(0);
	                // wait until activation to assert render content
	                setTimeout(function () {
	                    expect(routerUtil.warn.calls.count()).toBe(4);
	                    expect(router.routerView.children[0].content).toBe('c');
	                    expect(router.routerView.children[0].children[0].content).toBe('d');
	                    done();
	                }, wait);
	            });
	        });
	    });
	});

/***/ }
/******/ ]);