(function() {(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  }
  else if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  else {
    var globalAlias = '__2';
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

  var _bundleExports = undefined;NovaExports.__fixedUglify="script>";NovaExports.exports={"template":"\n    "};
        NovaExports({
            is: 'nova-test-view',
            props: {
                content: {
                    type: String,
                    value: ''
                },
                loadingRouteData:{
                    type:Boolean,
                    value:false
                },
            },
            createdHandler: function() {
                console.log("nova-test-view "+ this.content + " created");
            },
            attachedHandler: function() {
                console.log("nova-test-view "+ this.content + " attached"); 
            },
            detachedHandler: function() { 
                console.log("nova-test-view "+ this.content + " detached");
            },
            attributeChangedHandler: function(attrName, oldVal, newVal) { 
                console.log("nova-test-view "+ this.content + " attributeChanged");
            },
        });
    

  return _bundleExports;
}));}).call(window)