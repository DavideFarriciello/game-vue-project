import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Cart from '../pages/Cart.vue'
import Favorites from '../pages/Favorites.vue'
import Contact from '../pages/Contact.vue'
import GameDetails from '../pages/GameDetails.vue'
import Login from '../pages/Login.vue'
import { store } from '../useStore.js';

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
    path: '/game-details/:gameId',
    name: 'GameDetails',
    component: GameDetails
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

router.afterEach((to, from) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

export default router
