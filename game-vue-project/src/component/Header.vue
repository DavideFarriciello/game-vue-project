<template>
  <div class="flex justify-between align-middle bg-red-400 h-16 pl-40 py-4">
    <router-link :to="{ name: 'Home' }" class="text-3xl">Game Shop</router-link>
    <div class="w-[600px] flex justify-between">
      <router-link :to="{ name: 'Cart' }" class="text-2xl">Cart</router-link>
      <router-link :to="{ name: 'Favorite' }" class="text-2xl">Favorite</router-link>
      <router-link :to="{ name: 'Contact' }" class="text-2xl">Contact us</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script setup>

</script>