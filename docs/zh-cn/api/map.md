# `router.map(routeMap)`

定义路由映射的主要方法。

### 参数

- `routeMap: Object`

  结构体，键为路径，值为路由配置对象。对于路径匹配规则，查看[路由匹配](../route.html#route-matching).

### 路由配置对象

路由配置对象包含两个字段：

- `component`: 当路径匹配时，会渲染到顶级 `<router-view>` 的组件中。此字段的值是由`nova`产生的`HTML Object`，可通过`document.createElement`或者`document.querySelector`等方式获得。
- `subRoutes`: 嵌套的子路由映射。对于每一个 `subRoutes` 映射中的子路由对象，路由器在做匹配时会使用其路径拼接到父级路径后得到的全路径。成功匹配的组件会渲染到父级组件中，利用`appendChild`方法。

### 注意

子节点插入在父节点上，并不会影响nova中template的重新绘制。但是在使用时，请尽量减少在子节点后插入`node`，确保router运行效率。

### 例子

``` js
// nova-view为一个nova组件
let aView = document.createElement('nova-view')
let bView = document.createElement('nova-view')
let cView = document.createElement('nova-view')
let dView = document.createElement('nova-view')
let eView = document.createElement('nova-view')
router.map({
  // 组件构造函数
  '/a': {
    component: aView
  },
  // 组件选项对象
  '/b': {
    component: bView,
  },
  // 嵌套的路由
  '/c': {
    component: cView,
    subRoutes: {
      // 当路径是 /c/d 时进行渲染
      '/d': { component: dView},
      // 当路径是 /c/e 时进行渲染
      '/e': { component: eView}
    }
  }
})
```
