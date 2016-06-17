require.config({
    paths:{
        "nova":"http://s1.qhimg.com/static/c70d46df1c829566/nova.1.0.1",
        "nova-polyfill":"http://s0.qhimg.com/static/c194ef77618ac141/nova_polyfills.1.0.1",
        "nova-link":"../component/nova-link/main",
        "nova-view":"../component/nova-view/main",
        "nova-router":"../../../dist/nova-router",
        "example":"../example",
    }
})

require(['nova','nova-polyfill'],function(){
    require(['nova-link','nova-router','example'],function(...args){
        console.log(args)
    })
})