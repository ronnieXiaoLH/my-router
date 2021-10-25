import History from './base'

// 没有 hash 的时候，给 hash 设置初始值 /
function ensureHash () {
  if (!window.location.hash) {
    window.location.hash = '/'
  }
}

/* eslint-disable */
export default class HashHistory extends History {
  constructor (router) {
    super(router)
    ensureHash()
  }

  getCurrentLocation () {
    return window.location.hash.slice(1)
  }

  setUpListener () {
    addEventListener('hashchange', () => {
      // hash 值变化后，再去渲染对应的组件
      this.transitionTo(this.getCurrentLocation())
    })
  }

  pushState (path) {
    window.location.hash = hash
  }
}
