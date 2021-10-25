# vue-router

## install 方法

1. 通过 Vue.mixin() 给所有组件混入 `_routerRoot`
  + 根组件的 _router 是传给 Vue 的 VueRouter 的实例，_routerRoot 是 Vue 的实例
  + 子组件 _routerRoot 是父组件的 _routerRoot
  + 所有组件都可以通过 _routerRoot._router 获取到 VueRouter 的实例
2. 通过 Vue.mixin() 在根组件里执行 VueRouter 的 init 方法，init 方法注册事件来监听路由的变化(hash模式hashchange事件，history模式popstate事件)，并且在路由变化后可以更新渲染
3. 在 VueRouter 初始化的时候，history 的实例的 current 记录了当前的路由，通过 Vue.util.defineReactive 方法，给 Vue 实例设置一个响应式的属性 _route，后续 current 变化时，修改 _route 就可以更新渲染了
4. 通过 Object.defineProperty 给 Vue.prototype 添加了 `$router` 和 `$route`，值分别是 `_routerRoot._router` `_routerRoot._route`

补充：pushState 和 replaceState 的区别是，pushState 会新增一条记录，replaceState 是改变当前记录

## VueRouter 类

1. 对传入的配置项建立映射表(递归)，path -> component，目的是当路由变化时，可以根据路径拿到要渲染的组件，对于children里的配置是根据完整的 path 建立映射表(比如：`/about/a` -> component)
2. 不管是 hash 还是 history 模式，都应该对外暴露同样的一些方法(比如路由跳转)，所以创建一个 history 的实例，实例内部的 current 属性用来记录当前路由

## 嵌套路由原理

1. 对用户传入的配置项建立映射表记录了父子之间的层级关系(比如：`/about/a` 的父级 `/about`)
2. 对于嵌套路由，在匹配到自己的同时，会向上去找它的父级，最终用一个 matched 数组来存储嵌套路由匹配到的自己和它的父级(比如：[{path:'/about', ...}, {path:'/about/a', ...}])
3. router-view 组件在渲染的时候，根据 router-view 的层级关系(每一个 router-view 的组件渲染的时候会增加一个 routerView 的属性，router-view 组件渲染的，一直向上查找它的 parent，如果 parent 的 vnode 上有 router-view 属性，则表示层级 +1 )，依次渲染 matched 数组里对应的组件

## 动态路由原理

对于动态路由根据新增的路由扩展原有的映射表

## beforeEach的实现原理

实现难点：如何通过 next 控制 beforeEach 的回调是否执行

1. router 内部通过 beforeHooks 数组存储 beforeEach 所有回调函数
2. 执行 beforeHooks 里的回调函数需要传递 to,from,next，实现一个 runQueue 方法，首先执行 beforeHooks 里的第一个回调(索引为 0)，传递一个 next 方法，next 内部控制 beforeHooks 其他回调是否执行，执行时索引 +1
3. beforeHooks 的所有回调都执行完了之后再执行页面的重新渲染

## afterEach的实现原理

1. router 内部通过 afterHooks 数组存储 afterEach 所有回调函数
2. 执行完页面的重新渲染逻辑后依次执行 afterHooks 里的回调，并传递 to,from