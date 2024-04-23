<template>
  <div>
    <div
      class="sticky top-0 z-50 flex justify-between items-center bg-gradient-to-r from-fuchsia-900 to-slate-950 h-16 px-10 py-2 shadow-md">
      <router-link :to="{ name: 'Home' }"
        class="text-4xl font-bold text-white transition duration-300 ease-in-out hover:text-fuchsia-200 hover:-translate-y-1">Game
        Shop</router-link>

      <div class="space-x-8 flex items-center">
        <router-link :to="{ name: 'Login' }" @click.prevent="handleLogout"
          class="text-xl text-white transition duration-300 ease-in-out hover:text-fuchsia-200 hover:-translate-y-1">Logout</router-link>
        <router-link :to="{ name: 'Cart' }"
          class="text-xl text-white transition duration-300 ease-in-out hover:text-fuchsia-200 hover:-translate-y-1">Cart</router-link>
        <router-link :to="{ name: 'Favorites' }"
          class="text-xl text-white transition duration-300 ease-in-out hover:text-fuchsia-200 hover:-translate-y-1">Favorites</router-link>
        <router-link :to="{ name: 'Contact' }"
          class="text-xl text-white transition duration-300 ease-in-out hover:text-fuchsia-200 hover:-translate-y-1">Contact
          us</router-link>
      </div>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { logout } from '../useCartStore';

const router = useRouter();

function handleLogout() {
  if (confirm('Are you sure you want to log out?')) {
    logout();
    router.push('/login');
  }
}
</script>
