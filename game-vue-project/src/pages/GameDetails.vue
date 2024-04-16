<template>
  <div>
    <img :src="game.image" :alt="game.name" class="pt-1 px-1">
      <h2 class="text-xl text-center my-4">{{ game.name }}</h2>
      <p class="text-xl text-center my-4">Price: {{ game.price }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const game = route.params;
</script>