<template>
  <div>
    <div
      class="sticky top-0 z-50 flex items-center lg:justify-between bg-gradient-to-r from-fuchsia-900 to-slate-950 px-10 py-2 shadow-md">
      <router-link :to="{ name: 'Home' }"
        class=" text-4xl font-bold text-white transition duration-300 ease-in-out hover:text-fuchsia-200 hover:-translate-y-1">Game
        Shop</router-link>
      <span v-if="!isLargeScreen" @click="menuOpen" class="cursor-pointer text-4xl absolute right-6 top-2"
        :class="open ? 'pi pi-times-circle text-white rotate-180 transform transition-transform duration-500 ease-in-out' : 'pi pi-bars text-white transition-transform duration-500 ease-in-out'"></span>
      <div
        :class="['flex items-end lg:opacity-100 gap-16', open ? 'flex-col absolute top-full right-0 w-full bg-gradient-to-r from-fuchsia-900 to-slate-950 px-8 py-2 gap-2 transition-opacity duration-700 ease-in opacity-85 lg:hidden' : 'lg:flex hidden transition-opacity duration-700 ease-out xs:opacity-0']">
        <router-link :to="{ name: 'Login' }" @click.prevent="handleLogout"
          class="text-xl text-white transition duration-300 ease-in-out hover:text-fuchsia-200 hover:-translate-y-1">Logout</router-link>
        <router-link :to="{ name: 'Cart' }" @click.prevent="handleLinkClick"
          class="text-xl text-white transition duration-300 ease-in-out hover:text-fuchsia-200 hover:-translate-y-1">Cart</router-link>
        <router-link :to="{ name: 'Favorites' }" @click.prevent="handleLinkClick"
          class="text-xl text-white transition duration-300 ease-in-out hover:text-fuchsia-200 hover:-translate-y-1">Favorites</router-link>
        <router-link :to="{ name: 'Contact' }" @click.prevent="handleLinkClick"
          class="text-xl text-white transition duration-300 ease-in-out hover:text-fuchsia-200 hover:-translate-y-1">Contact
          us</router-link>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="page-slide" mode="out-in">
        <component :is="Component" :key="$route.fullPath"/>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '../useStore';

const open = ref(false);
const router = useRouter();

function handleLogout() {
  if (confirm('Are you sure you want to log out?')) {
    logout();
    router.push('/login');
  }
}

function menuOpen() {
  open.value = !open.value;
}

function handleLinkClick() {
  open.value = false;
}

const screenWidth = ref(window.innerWidth);
const isLargeScreen = computed(() => screenWidth.value >= 1024);

function updateWidth() {
  screenWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});
</script>

<style>
.page-slide-enter-from,
.page-slide-leave-to{
  opacity: 0;
  transform: translateX(60px);
}

.page-slide-enter-active,
.page-slide-leave-active{
  transition: 400ms ease all;
}
</style>
