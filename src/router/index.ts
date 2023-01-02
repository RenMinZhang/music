import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import PlayerFull from '../views/PlayerFull.vue'
import Test from '../views/TEst.vue'
import MoreMusic from '../views/MoreMusic.vue'
import SlidesComponent from '../components/SlidesComponent.vue'
import SearchMusic from '../components/SearchMusic.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home/',
    name: 'HomePage',
    component: HomePage,
    children: [
      {
        path: '',
        redirect: '/home/slides'
      },
      {
        path: 'slides',
        component: SlidesComponent
      }, {
        path: "searchMusic",
        component: SearchMusic
      }]

  },
  {
    path: "/playerFull",
    name: 'playerFull',
    component: PlayerFull
  },
  {
    path: "/test",
    component: Test
  },
  {
    path: "/moreMusic",
    component: MoreMusic
  },
  {
    path: "/slidesComponent",
    component: SlidesComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
