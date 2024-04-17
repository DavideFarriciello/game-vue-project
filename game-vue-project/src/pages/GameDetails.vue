<template>
  <div class="p-5 flex flex-col items-center justify-center">
    <div v-if="game"
      class="flex flex-row space-x-4 bg-white-game mt-8 pt-10 p-4 rounded-lg shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 w-[70%] h-[600px] ">
      <img :src="game.image" :alt="game.name" class="w-96 h-fit rounded-md">
      <div class="flex flex-col pl-16">
        <h2 class="text-4xl font-bold mb-3">{{ game.name }}</h2>
        <h2 class="text-xl mb-1">By {{ game.subName }}</h2>
        <h2 class="text-xl">{{ game.console }}</h2>
        <h2 class="text-3xl mt-12">Price: {{ game.price }}€</h2>
        <button @click="addToCart(game)"
          class="bg-slate-950 text-white font-bold text-xl w-52 py-6 ml-2 mt-5 rounded-3xl shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
          Add to Cart
        </button>
        <p class="text-xl mb-1 mt-24">Type: {{ game.type }}</p>
        <p class="text-xl mb-1">Date: {{ game.dateGame }}</p>
        <p class="text-xl mb-1">Pegi: {{ game.pegi }}</p>
      </div>
    </div>
    <div v-else class="text-xl">
      Loading Details...
    </div>
    <div>
      <h2 class="text-4xl mt-20">Other Games</h2>
    </div>
  </div>
</template>


<script setup>
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';

const route = useRoute();
const game = JSON.parse(route.query.game);

const toast = useToast();

const addToCart = (game) => {
  toast.success(`Added ${game.name} to cart!`, {
    timeout: 4000
  });
}
</script>