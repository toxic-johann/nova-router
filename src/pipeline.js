import {
  isPromise,
} from './util'

export function getReuseQueue (deactivateQueue,activateQueue) {
    let depth = Math.min(deactivateQueue.length,activateQueue.length)
    let reuseQueue = [];
    for(let i=0;i<depth;i++){
        let deactivateComponent = deactivateQueue[i].handler.component
        let activateComponent = activateQueue[i].handler.component
        if(Object.is(deactivateComponent,activateComponent)){
            let canComponentReuse = deactivateComponent.route 
            ? typeof deactivateComponent.route.canReuse === 'function' 
                ? deactivateComponent.route.canReuse()
                : deactivateComponent.route.canReuse
            : true
            if(canComponentReuse === false){
                i--;
                break;
            }
            reuseQueue.push(deactivateQueue[i])
        } else {
            i--;
            break;
        }
    }
    return reuseQueue;
}

export function deactivate (parent, child, transition, cb){
    parent = parent || {handler:{component:transition.router.routerView}}
    if(isChildNode(parent.handler.component,child.handler.component)){
        if(canReuse(child,transition)){
            cb && cb && cb()
            return
        }
        let component = child.handler.component
        let fn = (component.route && component.route.deactivate) || (()=>true)
        transition.callHook(fn,component,()=>{
            parent.handler.component.removeChild(child.handler.component)
            cb && cb()
        },{postActivate:true})
    } else {
        cb && cb && cb()
    }
}

export function activate (parent, child, transition, cb){
    parent = parent || {handler:{component:transition.router.routerView}}
    let component = child.handler.component
    // component.$route = {
    //     path:transition.router._currentRoute.path,
    //     params:transition.router._currentRoute.params,
    //     query:transition.router._currentRoute.query,
    // }
    // console.log(component.$route)
    if(!isChildNode(parent.handler.component,child.handler.component)){
        let fn = (component.route && component.route.activate) || (()=>true)
        transition.callHook(fn,component,()=>{
            parent.handler.component.appendChild(child.handler.component)
            data(component,transition)
            cb && cb()
        },{postActivate:true})
    } else {
        data(component,transition)
        cb && cb()
    }
}

export function canActivate(parent,child,transition,cb){
    parent = parent || {handler:{component:transition.router.routerView}}
    if(!isChildNode(parent.handler.component,child.handler.component)){
        let component = child.handler.component
        let fn = (component.route && component.route.canActivate) || (()=>true)
        transition.callHook(fn,component,cb,{expectBoolean:true});
    } else {
        cb && cb()
    }
}

export function canDeactivate(parent,child,transition,cb){
    parent = parent || {handler:{component:transition.router.routerView}}
    if(parent.handler.component.contains(child.handler.component)){
        if(canReuse(child,transition)){
            cb && cb();
            return 
        }
        let component = child.handler.component
        let fn = (component.route && component.route.canDeactivate) || (()=>true)
        transition.callHook(fn,component,cb,{expectBoolean:true});
    } else {
        cb && cb()
    }
        
}

export function canReuse(child,transition){
    for(let i= transition.reuseQueue.length-1;i>-1;i--){
        if(Object.is(child.handler.component,transition.reuseQueue[i].handler.component)){
            return true;
        }
    }
    return false;
}

export function data(component,transition){
    component.loadingRouteData = true;
    let fn = (component.route && component.route.data) || (()=>{return {}})
    transition.callHook(fn,component,()=>{
        component.loadingRouteData = false;
    },{
        postActivate:true,
        // 处理data语法糖
        processData: data=>{
            const promises = []
            if(isPlainObject(data)){
                Object.keys(data).forEach(key => {
                    const val = data[key]
                    if(isPromise(val)) {
                        promises.push(val.then(resolvedData=>{
                            component[key] = resolvedData
                        }))
                    } else {
                        component[key] = val
                    }
                })
            }
            if(promises.length) {
                return promises[0].constructor.all(promises)
            }
        }
    })
}

export function isChildNode(parent,child){
    if(!parent || !child || !parent.hasChildNodes()){
        return false
    }
    let nodes = parent.childNodes
    for(let i=nodes.length-1;i>-1;i--){
        if(nodes[i].isSameNode(child)){
            return true
        }
    }
    return false
}

/**
 * Check plain object.
 *
 * @param {*} val
 */

function isPlainObject (val) {
    return Object.prototype.toString.call(val) === '[object Object]'
}