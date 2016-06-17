(function() {(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  }
  else if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  else {
    var globalAlias = '__0';
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
            is: 'router-view',
            props: {
                content: {
                    type: String,
                    value: ''
                },
            },
            createdHandler: function() {
            },
            attachedHandler: function() {
            },
            detachedHandler: function() { 
            },
            attributeChangedHandler: function(attrName, oldVal, newVal) { 
            },
        });
    

  return _bundleExports;
}));}).call(window)