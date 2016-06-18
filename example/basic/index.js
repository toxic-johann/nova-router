import './libs/nova.1.0.1.js'
import './libs/nova_polyfills.1.0.1.js'
import './component/nova-link/main.js'
import Router from '../../dist/nova-router.js'
import './component/nova-view/main.js'
window.router = new Router();
window.fooView = document.createElement("nova-view");
fooView.content = 'foo';

window.barView = document.createElement("nova-view");
barView.content = "bar";

window.bazView = document.createElement("nova-view");
bazView.content = "baz";

window.bayView = document.createElement("nova-view");
bayView.content = "bay";

window.userView = document.createElement("nova-view");
userView.content = "user"

router.map({
    '/foo': {
        component: fooView,
        // 在/foo下设置一个子路由
        subRoutes: {
            '/bar': {
                // 当匹配到/foo/bar时，会在Foo's <router-view>内渲染
                // 一个Bar组件
                component: barView
            },
                '/baz': {
                // Baz也是一样，不同之处是匹配的路由会是/foo/baz
                component: bazView
            }
        }
    },
    '/bar': {
        component:barView,
        subRoutes :{
            '/foo':{
                component:fooView,
                auth: true,
            },
            '/bay':{
                component:bayView
            }
        }
    },
    '/user/:username':{
        name:"user",
        component:userView
    },
    '/melon/:id/:code':{
        name:"melon",
        component:userView
    },
    '/test/*any/bar':{
        component:barView,
    }
})

router.beforeEach((transition)=>{
    // console.log(transition)
    // console.log("beforeEach",transition.from,transition.to)
    return true
})

router.beforeEach((transition)=>{
    // console.log("called")
    return new Promise((resolve,reject)=>{
        // console.log("promise beforeEach",transition.from,transition.to);
        resolve(true)
    })
})

router.afterEach((transition)=>{
    // console.log("afterEach",transition.from,transition.to)
})

router.afterEach((transition)=>{
    return new Promise((resolve,reject)=>{
        // console.log("promise afterEach",transition.from,transition.to);
        resolve()
    })
})

let routerView = document.querySelector('router-view');

// console.log(routerView)


Nova.ready([routerView], function() {
    router.start(routerView)
    // router.go('/bar/bay')

//     console.log("createing")
//     window.fooView = document.createElement("nova-view");
//     fooView.content = 'foo';

//     window.barView = document.createElement("nova-view");
//     barView.content = "bar";

//     console.log("appending")
//     routerView.appendChild(fooView)
//     routerView.appendChild(barView)

//     console.log("removing")

//     routerView.removeChild(fooView)
//     routerView.removeChild(barView)

//     console.log("reappending")
//     routerView.appendChild(fooView)

//     console.log("replacing")
//     routerView.replaceChild(barView,fooView)

//     console.log("reappending")
//     routerView.appendChild(fooView)
});

    