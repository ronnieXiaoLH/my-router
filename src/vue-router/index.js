import { createMatcher } from './create-matcher'
import HashHistory from './history/hash'
import HTML5History from './history/html5'
import install from './install'

class VueRouter {
  constructor (options = {}) {
    this.mode = options.mode || 'hash'
    this.options = options
    this.beforeHooks = []
    this.afterHooks = []

    this.matcher = createMatcher(options.routes || [])

    switch (this.mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break
      case 'history':
        this.history = new HTML5History(this)
        break
      default:
        break
    }
    // console.log(this.history)
  }

  init (app) {
    const history = this.history

    const setUpListener = () => {
      history.setUpListener()
    }

    history.transitionTo(history.getCurrentLocation(), setUpListener)

    // listen 方法内部会先保存回调，当 current 发生变化后调用回调
    history.listen((route) => {
      // 当 current 变化时，修改 _route 触发组件重新渲染(_route 是响应式的)
      app._route = route
    })
  }

  match (path) {
    return this.matcher.match(path)
  }

  push (path) {
    this.history.transitionTo(path, () => {
      this.history.pushState(path)
    })
  }

  beforeEach (fn) {
    this.beforeHooks.push(fn)
  }

  afterEach (fn) {
    this.afterHooks.push(fn)
  }
}

VueRouter.install = install

export default VueRouter
