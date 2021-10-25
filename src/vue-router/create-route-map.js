export function createRouteMap (routes, oldPathMap) {
  const pathMap = oldPathMap || {}

  routes.forEach(route => {
    addRouteRecord(route, pathMap)
  })

  return pathMap
}

function addRouteRecord (route, pathMap, parent) {
  const path = parent ? `${parent.path}/${route.path}` : route.path
  const record = {
    path,
    component: route.component,
    parent
  }
  pathMap[path] = record
  route.children && route.children.forEach(childRoute => {
    addRouteRecord(childRoute, pathMap, record)
  })
}
