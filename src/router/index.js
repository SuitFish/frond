import Vue from 'vue'
import VueRouter from 'vue-router'
import Show from '../views/Show'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component: Show
  },
]

const router = new VueRouter({
  routes
})

export default router
