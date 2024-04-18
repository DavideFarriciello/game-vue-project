import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Cart from '../pages/Cart.vue'
import Favorites from '../pages/Favorites.vue'
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
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/game-details',
      name: 'GameDetails',
      component: GameDetails,
      props: route => ({ game: route.query.game, games: route.query.games })
    }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router
