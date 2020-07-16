import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../components/Landing'
import Dashboard from '../components/Dashboard'
import ReviewProcessed from '../components/ReviewProcessed'
import Review from '../components/Review'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/review-processed',
    name: 'ReviewProcessed',
    component: ReviewProcessed
  },
  {
    path: '/review',
    name: 'Review',
    component: Review
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
