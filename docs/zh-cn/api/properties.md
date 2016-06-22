# 路由器实例属性

> 这里只列出了公开属性

### `router.routerView`

- 类型: `Nova组件`

  此路由器管理的根 Nova 组件，nova-router提供router-view。这个组件正是 `router.start()` 传入的 Nova 组件。使用的时候，在页面添加`<router-view></router-view`根标签。然后调用如下：

  ```javascript
  // 获取页面中的router-view节点
  let routerView = document.querySelector('router-view');

  //确保节点已生效
  Nova.ready([routerView], function() {
  	// 启动路由  
      router.start(routerView)
  })
  ```

  当然，你也可以使用自己创建的组件作为根节点，之后的路由组件会以此为根节点。

  ```javascript
  // 假设开发者开发了foo-view组件
  let fooView = document.createHandler('foo-view');
  // 将节点插入页面中，当然你也可以不插入=-=
  document.body.appendChild(fooView)

  //确保节点已生效
  Nova.ready([fooView], function() {
  	// 启动路由  
      router.start(fooView)
  })

  ```

  ​

### `router.mode`

- 类型: `String`

  `html5`、`hash` 或者 `abstract`。

  - **`html5`**: 使用 HTML5 history API ，监听 `popstate` 事件。支持 [`saveScrollPosition`](../options.html#savescrollposition) .

  - **`hash`**: 使用 `location.hash` ，监听 `hashchange` 事件。如果创建路由器时声明 `history: true` ，则在不支持 history 模式的路由器下会退化为 hash 模式。

  - **`abstract`**: 不监听任何事件。如果没有 `window` 对象（例如非浏览器环境），则会自动退化到此模式。
