(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["NovaRouter"] = factory();
	else
		root["NovaRouter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _hash = __webpack_require__(1);
	
	var _hash2 = _interopRequireDefault(_hash);
	
	var _abstract = __webpack_require__(6);
	
	var _abstract2 = _interopRequireDefault(_abstract);
	
	var _html = __webpack_require__(7);
	
	var _html2 = _interopRequireDefault(_html);
	
	__webpack_require__(8);
	
	var _routeRecognizer = __webpack_require__(3);
	
	var _routeRecognizer2 = _interopRequireDefault(_routeRecognizer);
	
	var _route = __webpack_require__(9);
	
	var _route2 = _interopRequireDefault(_route);
	
	var _transition = __webpack_require__(10);
	
	var _transition2 = _interopRequireDefault(_transition);
	
	var _util = __webpack_require__(2);
	
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
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
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
/* 2 */
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
	
	var _routeRecognizer = __webpack_require__(3);
	
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
/* 3 */
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
	    if ("function" === 'function' && __webpack_require__(5)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return $$route$recognizer$$default; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = $$route$recognizer$$default;
	    } else if (typeof this !== 'undefined') {
	      this['RouteRecognizer'] = $$route$recognizer$$default;
	    }
	}).call(this);
	
	//# sourceMappingURL=route-recognizer.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
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
/* 8 */
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
	      is: 'router-view'
	    });
	
	    return _bundleExports;
	  });
	}).call(window);

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
	var _pipeline = __webpack_require__(11);
	
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

/***/ },
/* 11 */
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
	
	var _util = __webpack_require__(2);
	
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=nova-router.dev.js.map