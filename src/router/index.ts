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
      path: '/:pathMatch(.*)*',
      redirect: '/accueil'
    },
  ]
})

export default router
