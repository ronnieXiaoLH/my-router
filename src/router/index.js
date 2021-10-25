import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: 'a',
        name: 'A',
        component: {
          render: (h) => h('h1', 'about a')
        }
      },
      {
        path: 'b',
        name: 'B',
        component: {
          render: (h) => h('h1', 'about b')
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from, 1)
  next()
})

router.beforeEach((to, from, next) => {
  console.log(to, from, 2)
  // next()
})

router.afterEach((to, from) => {
  console.log(to, from, 1)
})

router.afterEach((to, from) => {
  console.log(to, from, 2)
})

export default router
