import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticationView from '../views/AuthenticationView.vue'
import EquipeView from '@/views/EquipeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'authentication',
      component: AuthenticationView,
    },
    {
      path: '/equipe',
      name: 'equipe',
      component: EquipeView,
    }
  ],
})
export default router
