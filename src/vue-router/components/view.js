export default {
  functional: true,
  render (h, { parent, data }) {
    const route = parent.$route
    // console.log('matched', route.path, route.matched)
    let depth = 0
    // 嵌套路由，如何判断是第几层的 router-view
    // 第一层是 0，取 matched 里的第一项，在渲染 router-view 的时候，添加 routerView 标记是 router-view 组件
    // 组件渲染是由父到子，在渲染 router-view 的时候，依次遍历 parent，看看之前有几层 router-view
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      parent = parent.$parent
    }
    const record = route.matched[depth]
    if (record) {
      data.routerView = true
      return h(record.component, data)
    } else {
      return h()
    }
  }
}
