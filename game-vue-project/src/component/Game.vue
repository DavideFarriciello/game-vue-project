<template>

  <div class="flex flex-wrap justify-center p-5">
    <div v-for="game in games" :key="game" @click="showDetails(game)"
      class="bg-white-game rounded-lg w-64 ml-7 mb-20 shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer">
      <img :src="game.image" :alt="game.name" class="pt-1 px-1">
      <h2 class="text-xl text-center my-4">{{ formatName(game.name) }}</h2>
      <p class="text-xl text-center my-4">Price: {{ game.price }}€</p>
      <div class="flex flex-row">
        <button @click.stop="addToCart(game)"
        :class="['bg-slate-950 text-white font-bold py-2 w-32 ml-2 mb-2 rounded-lg shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out', cartIds.has(game.id) ? '!bg-fuchsia-900' : 'hover:bg-fuchsia-900 ']">
        {{ cartIds.has(game.id) ? 'Added ' : 'Add to Cart' }}
      </button>
      <i
          @click.stop="addToFavorites(game)"
          :class="['pi pi-heart ml-8 text-4xl bg-white-game hover:-translate-y-1 transition duration-300 ease-in-out', favoritedIds.has(game.id) ? 'text-fuchsia-900' : 'hover:text-fuchsia-900']">
        </i>
      </div>
    </div>
  </div>

</template>

<script setup>
import 'primeicons/primeicons.css'
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router'
import { inject, reactive } from 'vue';

const props = defineProps({
  games: Array
});

const toast = useToast();

const cartStore = inject('cartStore');
const cartIds = reactive(new Set(cartStore.cart.map(item => item.id)));
const favoritedIds = reactive(new Set(cartStore.favorites.map(item => item.id)));


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

const router = useRouter();

const showDetails = (game) => {
  const gameParam = JSON.stringify(game);
  const gamesParam = JSON.stringify(props.games);
  router.push({ name: 'GameDetails', query: { game: gameParam, games: gamesParam } });
}

const formatName = (name) => {
  return name.length > 23 ? `${name.substring(0, 20)}...` : name;
};
</script>
