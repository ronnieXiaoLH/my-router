/* eslint-disable */
import { createRouteMap } from './create-route-map'

export function createMatcher (routes) {
  const pathMap = createRouteMap(routes)

  function addRoutes (routes, pathMap) {
    createRouteMap(routes, pathMap)
  }

  // 动态路由添加，将新增的路由配置添加到映射表中
  addRoutes([
    {
      path: 'xxx',
      component: (h) => h('span', 'xxx')
    }
  ], pathMap)

  console.log('pathMap', pathMap)

  function match (path) {
    return pathMap[path]
  }
  
  return {
    addRoutes,
    match
  }
}
