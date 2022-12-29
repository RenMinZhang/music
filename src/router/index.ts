import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import PlayerFull from '../views/PlayerFull.vue'
import Test from '../views/Test.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: "/playerFull",
    name: 'playerFull',
    component: PlayerFull
  },
  {
    path: "/test",
    name: 'TEst',
    component: Test
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
