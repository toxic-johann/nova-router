import {
    warn,
    mapParams,
    isPromise
} from './util'

import {
    deactivate,
    activate,
    canDeactivate,
    canActivate,
    getReuseQueue,
} from './pipeline.js'

export default class Transition {
    constructor (router, to, from){
        this.router = router
        this.to = to
        this.from = from
        this.next = null
        this.aborted = false
        this.done = false
    }

    /**
     * abort current transition and return to previous location
     * @return {[type]} [description]
     */
    abort(){
        if(!this.aborted){
            this.aborted = true
            // 防止根路径加载失败时候的无限循环
            const abortingOnLoad = !this.from.path && this.to.path === '/'
            if(!abortingOnLoad) {
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
    redirect (path) {
        if(!this.aborted){
            this.aborted = true
            if(typeof path === 'string'){
                path = mapParams(path, this.to.params, this.to.query)
            } else {
                path.params = path.params || this.to.params
                path.query = path.query || this.to.query
            }
            this.router.replace(path)
        }
    }

    /**
     * 开始一次转换
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    start(cb=(()=>{})){
        const transition = this

        let deactivateQueue = this.from.matched
        ? [].map.call(this.from.matched,each=>{
            return each;
        })
        : [];
        let activateQueue = this.to.matched
        ? [].map.call(this.to.matched,each=>{
            return each;
        })
        : [];
        let reverseDeactivateQueue = deactivateQueue.slice().reverse()

        // 获取重用队列
        transition.reuseQueue = getReuseQueue(deactivateQueue,activateQueue)
        

        // 此处有一个检测是否可以重用的部分
        transition.runQueue(reverseDeactivateQueue,canDeactivate,{factor:1},()=>{
            transition.runQueue(activateQueue,canActivate,{factor:-1},()=>{
                // now we validate it can run
                // so i inform the router that i start a new transition
                transition.router._onTransitionValidated(transition)
                transition.runQueue(reverseDeactivateQueue,deactivate,{factor:1},()=>{
                    transition.runQueue(activateQueue,activate,{factor:-1},cb)
                })
            })
        })
    }
    /**
     * 递归执行队列里要求的函数
     * @param  {[type]}   queue [description]
     * @param  {Function} fn    [description]
     * @param  {Function} cb    [description]
     * @return {[type]}         [description]
     */
    runQueue(queue, fn, {factor=0,start=0, end=queue.length,fnArgs=[]}, cb=(()=>{})){
        const transition = this;
        step(start)
        function step (index) {
            if(index >= end){
                cb()
            } else {
                let Args
                if(!factor){
                    Args = [queue[index]]
                } else {
                    Args = [queue[index+factor],queue[index]]
                }
                Args = Args.concat([transition,()=>{
                    step(index+1)
                }]).concat(fnArgs)
                // console.log(fn,Args)
                fn.apply(transition,Args)
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
    callHook (hook, context, cb, {
        expectBoolean = false,
        postActivate = false, // 必定触发激活
        processData,
        cleanup
    }={}){
        const transition = this;
        let nextCalled = false;
        let aborted = false

        // abort the transition
        const abort = ()=>{
            aborted = true
            cleanup && cleanup()
            transition.abort()
        }

        // handle errors
        const onError = err=>{
            postActivate? next():abort()
            if(err && !transition.router._suppress){
                warn('Uncaught error during transition: ')
                throw err instanceof Error ? err : new Error(err)
            }
        }

        // promise will swallows errors?
        // it seems i use resolve can sovle this problem
        // but resolve means wrap a new promise=--=
        // let me do a test
        const onPromiseError = err=>{
            try {
                onError(err)
            } catch (e) {
                setTimeout(() => {throw e},0)
            }
        }
        // 没有返回的下一步
        const next = ()=>{
            if(nextCalled) {
                warn('transition.next() should be called only once.')
                return
            }
            nextCalled = true
            if(transition.aborted) {
                cleanup && cleanup()
                return
            }
            cb && cb()
        }

        // 需要处理正确错误的下一步
        const nextWithBoolean = res=>{
            if(typeof res === 'boolean'){
                res ? next() : abort()
            } else if (isPromise(res)){
                res.then((ok) => {
                    ok ? next() : abort()
                },onPromiseError)
            } else if(!hook.length) { // 如果没有参数
                onError("must return Boolean or Promise in "+ hook)
            } else if (hook.length && !nextCalled && !aborted){
                // 通过transition提交会二次调用此处
                // 如果使用了transition但是没有进行操作则会出现这种状况
                warn("advice use transition with sycn and add Boolean "+ hook)
            }
            
        }

        // 需要处理数据的下一步
        const nextWithData = data =>{
            let res
            try {
                res = processData(data)
            } catch (err) {
                return onError(err)
            }
            if(isPromise(res)) {
                res.then(next, onPromiseError)
            } else {
                next()
            }
        }

        // expose a clone of transition so that would not mix up
        const exposed = {
            to: transition.to,
            from: transition.from,
            abort:postActivate?(()=>true):abort,
            next:processData ? nextWithData : expectBoolean ? nextWithBoolean :next,
            redirect: function(){
                transition.redirect.apply(transition,arguments)
            }
        }

        // actually call the hook
        let res
        try {
            res = hook.call(context,exposed)
        } catch (err){
            return onError(err)
        }
        if(expectBoolean) {
            nextWithBoolean(res)
        } else if(isPromise(res)) {
            if(processData){
                res.then(nextWithData, onPromiseError)
            } else {
                res.then(next, onPromiseError)
            }
        } else if (processData && isPlainOjbect(res)){
            nextWithData(res)
        } else if (!hook.length) {
            // 没有传入参数的情况下
            next()
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
    callHooks (hooks,context,cb,options) {
        if(Array.isArray(hooks)){
            this.runQueue(hooks,(hook, transition, next) => {
                if(!this.aborted) {
                    this.callHook(hook,context,next,options)
                }
            },{},cb)
        } else {
            this.callHook(hooks,context,cb,options)
        }
    }
}

function isPlainOjbect (val) {
    return Object.prototype.toString.call(val) === '[object Object]'
}

function toArray (val) {
    return val? Array.prototype.slice.call(val): []
}