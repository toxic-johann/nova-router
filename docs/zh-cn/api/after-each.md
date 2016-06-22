# `router.afterEach(hook)`

添加一个全局的后置钩子函数，该函数会在每次路由切换**结束**时被调用。

也就是所有 `canDeactivate` 、`canActivate`、`deactivate`、`activate`等 钩子函数都成功的被断定( resolved )后，但是不确保所有`attachedHanlder`均被调用。

你可以注册多个全局的后置钩子函数，这些函数将会按照注册的顺序被同步调用。

### 参数

- `hook {Function}`

  此钩子函数一个类型为[切换对象](../pipeline/hooks.html#transition-object)的参数，但是你只能访问此参数的 `to` 和 `from` 属性, 这两个属性都是路由对象。在这个后置钩子函数里**不能**调用任何切换函数。

### Example

``` js
router.afterEach(function (transition) {
  console.log('成功浏览到: ' + transition.to.path)
})
```
