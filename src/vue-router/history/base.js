function createRoute (record, location) {
  const matched = []
  while (record) {
    matched.unshift(record)
    record = record.parent
  }
  return {
    ...location,
    matched
  }
}

export default class History {
  constructor (router) {
    this.router = router
    this.current = createRoute(null, { path: '/' })
  }

  // 先保存回调，当 current 发生变化后，调用回调(回调修改了 Vue 实例的 _route, _route 是响应式的)
  listen (cb) {
    this.cb = cb
  }

  // 路由跳转
  transitionTo (path, cb) {
    const record = this.router.match(path)
    const route = createRoute(record, { path })
    // 首先匹配到组件，然后修改了 hash，会再次触发 transitionTo，所以加一个判断，如果跳转前后的 path 一样，且不是初始值，跳过
    if (path === this.current.path && route.matched.length === this.current.matched.length) return

    const queue = this.router.beforeHooks
    const itor = (hook, next) => {
      hook(route, this.current, next)
    }
    runQueue(queue, itor, () => {
      this.updateRoute(route)
      // 第一次注册事件，第二次修改 hash
      cb && cb()
      // 后置钩子
      this.router.afterHooks.forEach(fn => {
        fn(route, this.current)
      })
    })
  }

  // 更新 current 和 _route ，更新渲染
  updateRoute (route) {
    this.current = route
    this.cb && this.cb(route)
  }
}

// 依次执行 beforeHooks ，next 控制 beforeHooks 是否继续执行
function runQueue (queue, iterator, cb) {
  function step (index) {
    if (index >= queue.length) return cb()
    const hook = queue[index]
    const next = () => step(index + 1)
    iterator(hook, next)
  }
  step(0)
}
