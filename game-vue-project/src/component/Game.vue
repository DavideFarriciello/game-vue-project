<template>

  <div class="flex flex-wrap justify-center p-5">
    <div v-for="game in games" :key="game" @click="showDetails(game)"
      class="bg-white-game rounded-lg w-64 ml-7 mb-20 shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer">
      <img :src="game.image" :alt="game.name" class="pt-1 px-1">
      <h2 class="text-xl text-center my-4">{{ game.name }}</h2>
      <p class="text-xl text-center my-4">Price: {{ game.price }}€</p>
      <button @click.stop="addToCart(game)"
        class="bg-slate-950 text-white font-bold py-2 px-4 ml-2 mb-2 rounded-lg shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
        Add to Cart
      </button>
    </div>
  </div>

</template>

<script setup>
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router'
import { defineProps } from 'vue';

const props = defineProps({
  games: {
    type: Array,
    required: true
  }
})

const toast = useToast();

const addToCart = (game) => {
  console.log(`Added ${game.name} to cart`);

  toast.success(`Added ${game.name} to cart!`, {
    timeout: 4000
  });
}


const router = useRouter();

const showDetails = (game) => {
  const gameParam = JSON.stringify(game);
  router.push({ name: 'GameDetails', query: { game: gameParam } });
}
</script>
