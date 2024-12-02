import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/accueil'
    },
    {
      path: '/accueil',
      name: 'accueil',
      component: () => import('@/views/accueil.vue')
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('@/views/connexion.vue')
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('@/views/inscription.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/accueil'
    },
  ]
})

export default router
