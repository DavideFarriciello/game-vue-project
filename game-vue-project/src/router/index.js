import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Cart from '../pages/Cart.vue'
import Favorites from '../pages/Favorites.vue'
import Contact from '../pages/Contact.vue'
import GameDetails from '../pages/GameDetails.vue'
import Login from '../pages/Login.vue'
import { store } from '../useCartStore.js';

const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/home',
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

  router.beforeEach((to, from, next) => {
    if (to.meta.requiresGuest && store.isLoggedIn) {
      next({ name: 'Home' }); 
    } else {
      next();
    }
  });

export default router
