# `canReuse: Boolean | canReuse(transition) -> Boolean`

决定组件是否可以被重用。如果一个组件不可以重用，当前组件会被移除，并且重新插入。就是说如果一个被重用的组件将不会触发Nova生命周期中的`attachedHanlder`和`detachedHandler`方法。并且也不会触发nova-router中的`activate`和`deactivate`方法。

此路由配置参数可以是一个 Boolean 值或者一个返回同步的返回 Boolean 值的函数。**默认值为 `true` **.

### 参数

- [`transition {Transition}`](hooks.md#transition-object)

  在 `canReuse` 钩子中只能访问 `transition.to` 和 `transition.from` 。

### 预期返回值

- 必须返回 Boolean 类型，否则都会当做`true`来作处理。

### 详情

`canReuse` 会同步调用，而且从上至下对所有可能重用的组件都会调用。

如果组件可以重用，它的 `data` 钩子在激活阶段仍然会被调用。
