let Emitter = require('events').EventEmitter
import Router from '../../../src/index.js'

/**
 * setup a router for testing with two nested routes:
 *
 * - /a/b
 * - /c/d
 *
 * configs: - an object that contains the route configs for each component
 * cb
 */

export function test (configs,cb) {
    const emitter = new Emitter()
    let router = new Router({abstract:true})
    let el = document.createElement('router-view')
    let calls = []
    // wrap hooks
    Object.keys(configs).forEach(route=>{
        let config = configs[route]
        Object.keys(config).forEach(hook=>{
            let fn = config[hook]
            if(Array.isArray(fn) || hook === 'mixins') {
                return
            }
            // sort the funciton by arguments number
            if(fn.length) {
                config[hook] = function(transition) {
                    let event = route + '.' + hook
                    calls.push(event)
                    let res = typeof fn === 'function'?fn(transition):fn
                    emitter.emit(event)
                    return res
                }
            } else {
                config[hook] = function() {
                    let event = route + '.' + hook
                    calls.push(event)
                    let res = typeof fn === 'function'?fn():fn
                    emitter.emit(event)
                    return res
                }
            }
        })
    })
    let aView = createNovaView('a',configs.a)
    let bView = createNovaView('b',configs.b)
    let cView = createNovaView('c',configs.c)
    let dView = createNovaView('d',configs.d)
    let eView = createNovaView('e',configs.e)
    let dataView = createNovaView('data',configs.data)

    router.map({
        '/a':{
            component:aView,
            subRoutes: {
                '/b':{
                    component:bView
                },
                '/e':{
                    component:eView
                }
            }
        },
        '/c':{
            component:cView,
            subRoutes:{
                '/d':{
                    component:dView
                }
            }
        },
        '/data/:msg':{
            component:dataView
        }
    })

    router.start(el,()=>{
        cb(router, calls, emitter)
    })

    

}
function createNovaView(content,route){
    let tmp = document.createElement('nova-test-view')
    tmp.content = content
    tmp.route = route
    return tmp
}

export function assertCalls (calls, expects) {
    expects.forEach((each, index)=>{
        expect(calls[index]).toBe(each)
    })
}
