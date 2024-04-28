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
        <div class="flex flex-row">
        <button @click.stop="addToCart(game)"
        :class="['bg-slate-950 text-white font-bold text-xl w-52 py-6 ml-2 mt-5 rounded-3xl shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out', cartIds.has(game.id) ? '!bg-fuchsia-900' : 'hover:bg-fuchsia-900 hover:shadow-lg']">
        {{ cartIds.has(game.id) ? 'Added ' : 'Add to Cart' }}
      </button>
        <i
        @click.stop="addToFavorites(game)"
        :class="['pi pi-heart ml-8 mt-8 text-5xl bg-white-game hover:-translate-y-1 transition duration-300 ease-in-out hover:cursor-pointer',favoritedIds.has(game.id) ? 'text-fuchsia-900' : 'hover:text-fuchsia-900']"></i>
        </div>
        <p class="text-xl mb-1 mt-24">Type: {{ game.type }}</p>
        <p class="text-xl mb-1">Date: {{ game.dateGame }}</p>
        <p class="text-xl mb-1">Pegi: {{ game.pegi }}</p>
      </div>
    </div>
    <div v-else class="text-xl">
      Loading Details...
    </div>
    <div>
      <h2 class="text-4xl mt-20 mb-10 flex justify-center text-gradient-from-fucsia">Gallery</h2>
      <div class="flex flex-row gap-3">
      <img :src="game.pic1" class="w-96 h-fit rounded-md hover-shadow-red transition-all duration-300 ease-in-out hover:scale-150">
      <img :src="game.pic2" class="w-96 h-fit rounded-md hover-shadow-red transition-all duration-300 ease-in-out hover:scale-150">
      <img :src="game.pic3" class="w-96 h-fit rounded-md hover-shadow-red transition-all duration-300 ease-in-out hover:scale-150">
      <img :src="game.pic4" class="w-96 h-fit rounded-md hover-shadow-red transition-all duration-75 ease-in-out hover:scale-150">
    </div>
    </div>
    <div>
      <h2 class="text-4xl mt-20 flex justify-center text-gradient-from-fucsia">Other Games</h2>
      <Game :games="otherGames" @game-clicked="showDetails"/>
    </div>
  </div>
</template>


<script setup>
import 'primeicons/primeicons.css'
import Game from '@/component/Game.vue';
import { watch, ref, computed , onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { inject, reactive } from 'vue';

const cartStore = inject('cartStore');
const cartIds = reactive(new Set(cartStore.cart.map(item => item.id)));
const favoritedIds = reactive(new Set(cartStore.favorites.map(item => item.id)));


const route = useRoute();
const router = useRouter();

const game = ref(JSON.parse(route.query.game));
const allGames = ref(JSON.parse(route.query.games));
const toast = useToast();

const shuffleAndPickRandomGames = (games, currentGame) => {
  return games
    .filter(g => g.id !== currentGame.id) // Exclude current game
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, 5); // Pick first five
};

const otherGames = ref([]);

onMounted(() => {
  otherGames.value = shuffleAndPickRandomGames(allGames.value, game.value);
});

const addToCart = (game) => {
  const added = cartStore.addToCart(game);
  if (added) {
    cartIds.add(game.id);
    toast.success(`Added ${game.name} to cart!`, { timeout: 4000 });
  } else {
    toast.warning(`${game.name} is already in the cart`, { timeout: 4000 });
  }
};

const addToFavorites = (game) => {
  const added = cartStore.addToFavorites(game);
  if (added) {
    favoritedIds.add(game.id);
    toast.success(`Added ${game.name} to favorites!`, { timeout: 4000 });
  } else {
    toast.warning(`${game.name} is already in the favorites`, { timeout: 4000 });
  }
};

const showDetails = (selectedGame) => {
  game.value = selectedGame;
  const gameParam = JSON.stringify(selectedGame);
  router.push({ name: 'GameDetails', query: { game: gameParam, games: JSON.stringify(allGames.value) } });
};

watch(() => route.query, () => {
  game.value = JSON.parse(route.query.game);
  allGames.value = JSON.parse(route.query.games);
}, { deep: true });
</script>