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
      path: '/userAccount',
      name: 'userAccount',
      component: () => import('@/views/userAccount.vue')
    },
    {
      path: '/evenements',
      name: 'evenements',
      component: () => import('@/views/listeEvenements.vue')
    },
    {
      path: '/evenements/:id',
      name: 'singleEvenement',
      component: () => import('@/views/singleEvenement.vue')
    },
    {
      path: '/evenements/creation',
      name: 'creationEvenement',
      component: () => import('@/views/creationEvenement.vue')
    },
    {
      path: '/utilisateurs/:id/inscriptions',
      name: 'evenementsUtilisateurs',
      component: () => import('@/views/evenementsUtilisateurs.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/accueil'
    },
  ]
})


/**
 * Permet de fermer le menu responsive lors d'un changement de route
 */
router.beforeEach((to, from, next) => {
  const menu = document.querySelector('.menu-responsive')
  if (menu && menu.style.display === 'flex') {
    menu.style.display = 'none'
  }
  next()
})


export default router
