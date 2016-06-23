(function() {(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  }
  else if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  else {
    var globalAlias = '__3';
    var namespace = globalAlias.split('.');
    var parent = root;
    for ( var i = 0; i < namespace.length-1; i++ ) {
      if ( parent[namespace[i]] === undefined ) parent[namespace[i]] = {};
      parent = parent[namespace[i]];
    }
    parent[namespace[namespace.length-1]] = factory();
  }
}(this, function() {
  function _requireDep(name) {
    return {}[name];
  }

  var _bundleExports = undefined;NovaExports.__fixedUglify="script>";NovaExports.exports={"template":"\n        <div>{{content}} attached</div>\n        <div>\n            {{JSON.stringify($route.params)}}\n            {{$route.path}}\n            {{JSON.stringify($route.query)}}\n        </div>\n        <template-if if=\"{{loadingRouteData}}\">\n            <div> {{content}} loading....</div>\n        </template-if>\n        <template-if if=\"{{!loadingRouteData}}\">\n            <div>{{content}} loaded</div>\n        </template-if>\n    "};
        NovaExports({
            is: 'nova-view',
            props: {
                content: {
                    type: String,
                    value: ''
                },
                loadingRouteData:{
                    type:Boolean,
                    value:false
                },
                $route:{
                    type:Object,
                    value:function(){
                        return {
                            params:"",
                            path:"",
                            query:"",
                        }
                    }
                }
            },
            route:{
                waitForData:false,
                // canReuse:false,
                data:function(){
                    return new Promise(function(resolve,reject){
                        setTimeout(function(){
                            resolve()
                        },1000)
                    })
                },
                // data:function(){return {test:true}},
                activate:function(){
                    console.log("activate",this.content)
                    return new Promise(function(resolve,reject){
                        setTimeout(function(){
                            resolve()
                        },1000)
                    })
                },
                deactivate:function(){
                    console.log("deactivate",this.content)
                },
                canActivate:function(transition){
                    console.log("canactivate",this.content)
                    // return true
                    // console.log(this.contents.hellow)
                    if(this.content == 'baz'){
                        return false;
                    }
                    return true
                    // const self = this
                    // console.log("called")
                    // return new Promise(function(resolve,reject){
                    //     if(self.content == 'baz'){
                    //         console.log("reject")
                    //         return reject()

                    //     }
                    //     return resolve(true)
                    // })
                    // transition.abort()
                },
                canDeactivate:function(transition){
                    console.log("candeactivate",this.content)
                    return true
                }
            },
            createdHandler: function() {
                console.log("nova-view "+ this.content + " created");
            },
            attachedHandler: function() {
                console.log("nova-view "+ this.content + " attached"); 
            },
            detachedHandler: function() { 
                console.log("nova-view "+ this.content + " detached");
            },
            attributeChangedHandler: function(attrName, oldVal, newVal) { 
                console.log("nova-view "+ this.content + " attributeChanged");
            },
        });
    

  return _bundleExports;
}));}).call(window)