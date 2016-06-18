import HashHistory from './history/hash'
import './component/router-view/main.js'
import RouteRecognizer from 'route-recognizer'
import Route from './route.js'
import Transition from './transition.js'
import { warn, mapParams,isObject } from './util'

const historyBackends = {
    // abstract: AbstractHistory,
    hash: HashHistory,
    // html5: HTML5History
}

export default class Router {
    constructor ({
        hashbang = true,
        abstract = false,
        history = false,
        saveScrollPosition = false, //used in history
        suppressTransitionError = false,
        root = null,
    } = {}) {
        // route recognizer
        this._recognizer = new RouteRecognizer();

        // state
        this._started = false
        this._startCb = null
        this._currentRoute = {}
        this._currentTransition = null
        this._previousTransition = null
        this._notFoundHandler = null
        this._notFoundRedirect = null
        this._beforeEachHooks = []
        this._afterEachHooks = []

        this._hashbang = hashbang;
        this.mode = 'hash';
        const History = historyBackends[this.mode];
        this.history = new History({
            root:root,
            hashbang:this._hashbang,
            onChange:(path,state,anchor) =>{
                this._match(path,state,anchor)
            }
        });

        this._suppress = suppressTransitionError
    }

    // API ===================================================
    /**
     * register the map
     * @param  {[type]} map [description]
     * @return {[type]}     [description]
     */
    map (map) {
        for(let route in map){
            this.on(route,map[route])
        }
        return this
    }

    /**
     * register each route
     * @param  {[type]} rootPath [description]
     * @param  {[type]} handler  [description]
     * @return {[type]}          [description]
     */
    on (rootPath,handler){
        if(rootPath === '*'){
            this._notFound(handler)
        } else {
            this._addRoute(rootPath,handler,[])
        }
        return this;
    }

    /**
     * set global before hook
     * @param  {Function} fn [description]
     * @return {[type]}      [description]
     */
    beforeEach (fn) {
        this._beforeEachHooks.push(fn)
        return this;
    }

    /**
     * set global after hook
     * @param  {Function} fn [description]
     * @return {[type]}      [description]
     */
    afterEach (fn){
        this._afterEachHooks.push(fn)
        return this;
    }

    /**
     * go to a new path
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    go (path){
      let replace = false;
      let append = false;
      if(isObject(path)){
          replace = path.replace
          append = path.append
      }
      path = this.stringifyPath(path)
      if(path){
          this.history.go(path,replace,append)
      }
    }

    /**
     * replace current path
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    replace (path) {
      if (typeof path === "string"){
          path = {path}
      }
      path.replace = true;
      this.go(path)
    }

    /**
     * 启动路由
     * @param  {[type]}   router [description]
     * @param  {Function} cb     [description]
     * @return {[type]}          [description]
     */
    start (routerView, cb){
        if(this._started){
            warn("already started.")
            return
        }
        this._started = true
        this._startCb = cb
        if(!this.routerView){
            if(!routerView){
                throw new Error("Must start router with router view")
            }
        }
        this.routerView = routerView
        this.history.start()
    }

    /**
     * Stop listening to route changes.
     */

    stop () {
        this.history.stop()
        this._started = false
    }

    /**
     * normalize named route object into string
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    stringifyPath (path) {
      let generatePath = ''
      if(path && typeof path === 'object'){
        if(path.name) { 
            // 具名路径
            generatePath = encodeURI(this._recognizer.generate(path.name, path.params))
        } else if(path.path){
            generatePath = encodeURI(path.path)
        }

        if(path.query){
            const query = this._recognizer.generateQueryString(path.query)
            if(generatePath.indexOf('?') > -1){
                generatePath += '&'+query.slice(1);
            } else {
                generatePath += query
            }
        }
      } else {
          generatePath = encodeURI(path?path+'':'')
      }
      return generatePath
    }

    // Internal methods ======================================
    /**
     * set the not found router handler
     * @param  {[type]} handler [description]
     * @return {[type]}         [description]
     */
    _notFound (handler) {
        this._notFoundHandler = [{ handler: handler }]
    }

    /**
     * add route and at the same time add the subroute
     * @param {[type]} path     [description]
     * @param {[type]} handler  [description]
     * @param {[type]} segments [description]
     */
    _addRoute (path,handler,segments){
        handler.path = path
        handler.fullPath = (segments.reduce((path,segment)=>{
            return path+segment.path
        },'') + path)
        segments.push({
            path: path,
            handler: handler
        })
        this._recognizer.add(segments,{
            as:handler.name
        })
        // handle sub router
        if(handler.subRoutes){
            for (let subPath in handler.subRoutes){
                // pass a copy of segments to avoid mutating
                this._addRoute(subPath,handler.subRoutes[subPath],segments.slice())
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
    _match (path,state,anchor) {
        // 这里有一个检查路径的操作
        const currentRoute = this._currentRoute
        const currentTransition = this._currentTransition

        if(currentTransition){
            if (currentTransition.to.path === path){
                // we have an transition doing that thing so ignore the request
                return
            } else if(currentRoute.path === path) {
                // we are going to the same place
                // but that transition do not work well
                // so we abort it and reset
                currentTransition.aborted = true;
                this._currentTransition = this._previousTransition
                return
            } else {
                // we are going to different place so abort the current one
                currentTransition.aborted = true
            }
        }

        // construct an new route and the new transition
        const route = new Route(path, this)
        const transition = new Transition(this, route, currentRoute)

        this._previousTransition = currentTransition
        this._currentTransition = transition

        const beforeHooks = this._beforeEachHooks
        const startTransition = (()=>{
            transition.start(()=>{
                this._postTransition(transition)
            })
        })
        if(beforeHooks.length) {
            transition.callHooks(beforeHooks,null,startTransition,{expectBoolean:true})
            // transition.runQueue(beforeHooks,(hook,_,next)=>{
            //     console.log("called")
            //     if(Object.is(transition, this._currentTransition)) {
            //         transition.callHook(hook,null,next,{exceptBoolean:true})
            //     }
            // },{},startTransition)
        } else {
            startTransition()
        }
    }

    /**
     * called when we vaildate the transition can run
     * @param  {[type]} transition [description]
     * @return {[type]}            [description]
     */
    _onTransitionValidated (transition) {
        this._currentRoute = transition.to
    }

    /**
     * called when we finished transition
     * @return {[type]} [description]
     */
    _postTransition(transition){
        this._currentTransition.done = true
        if(this._afterEachHooks.length) {
            this._afterEachHooks.forEach(hook =>hook.call(null,{
                to:transition.to,
                from:transition.from
            }))
        }
    }
}