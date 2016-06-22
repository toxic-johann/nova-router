# 基本用法

使用 Nova.js 和 nova-router 创建单页应用非常的简单，使用 Nova.js 开发，整个应用已经被拆分成了独立的组件。在使用 nova-router 时，我们需要做的就是把路由映射到各个组件，nova-router 会把各个组件渲染到正确的地方。下面是个简单的例子：

### HTML

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Nova Router Example</title>
  </head>
  <body>
    <div id="app">
      <p>
        <!-- use nova-link for nabigation -->
        <a href="/foo">Go to Foo</a> 
        <br>
        <a href="/bar">Go to bar</a>
      </p>
      <!-- use router-view element as route outlet -->
      <router-view></router-view>
    </div>
  </body>
  <script type="text/javascript" src="/example/basic/example.js"></script>
</html>
```

### JavaScript

``` javascript
// 定义组件
let fooView = document.createElement("nova-view");

let barView = document.createElement("nova-view");

// 路由器需要一个根组件。
// 这里我们直接使用nova-router提供的router-view对象
// 当然，你甚至可以直接把body作为根组件传入
var App = {}

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
let routerView = document.querySelector('router-view');

// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({
    '/foo': {
        component: fooView
    },
    '/bar': {
        component: barView
    }
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(routerView)
```
