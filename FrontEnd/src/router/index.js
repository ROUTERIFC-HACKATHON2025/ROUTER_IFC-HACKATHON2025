import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticationView from '../views/AuthenticationView.vue'
import EquipeView from '@/views/EquipeView.vue'
import SobreNosView from '@/views/SobreNosView.vue'
import RegisterView from '@/views/RegisterView.vue'
import EmpresaView from '@/views/EmpresaView.vue'
import IndySulView from '@/views/IndySulView.vue'
import PassageirosView from '../views/PassageirosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
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
    },
    {
      path: '/SobreNos',
      name: 'SobreNos',
      component: SobreNosView,
    },
    {
      path: '/Register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/Empresa',
      name: 'Empresa',
      component: EmpresaView,
    },
    {
      path: '/IndySul',
      name: 'IndySul',
      component: IndySulView,
    },
    {
      path: '/passageiros',
      name: 'passageiros',
      component: PassageirosView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 } 
    }
  }
})

export default router
