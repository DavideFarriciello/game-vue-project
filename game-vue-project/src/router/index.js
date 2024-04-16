import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Cart from '../pages/Cart.vue'
import Favorite from '../pages/Favorite.vue'
import Contact from '../pages/Contact.vue'
import GameDetails from '../pages/GameDetails.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Favorite
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/game/:name',
      name: 'GameDetails',
      component: GameDetails,
      props: true
    }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router
