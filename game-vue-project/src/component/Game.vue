<template>
  <div>
    <div class="flex justify-center">
      <input v-if="isHome" type="text" placeholder="Search games"
      class="lg:text-xl pl-5 py-2 mt-5 lg:w-96 rounded-full shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 outline-none xs:w-72 xs:text-base"
        v-model="search">
    </div>
    <div class="flex flex-wrap justify-center p-5">

      <div v-for="game in filteredGames" :key="game._id" @click="showDetails(game)"
        class="bg-white-game rounded-lg lg:w-64 xs:w-[139px] ml-7 lg:mb-20 xs:mb-8 shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer">
        <img :src="game.image" :alt="game.name" class="pt-1 px-1">
        <h2 class="lg:text-xl xs:text-base text-center lg:my-4 xs:my-2">{{ formatName(game.name) }}</h2>
        <p class="lg:text-xl xs:text-base text-center lg:my-4 xs:my-2">Price: {{ game.price }}€</p>
        <div class="flex flex-row">
          <button @click.stop="addToCart(game)"
            :class="['bg-slate-950 text-white font-bold py-2 lg:w-32 xs:w-[90px] lg:text-lg xs:text-sm lg:ml-6 xs:ml-2 mb-2 rounded-lg shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out', cartIds.has(game.id) ? '!bg-fuchsia-900' : 'hover:bg-fuchsia-900 ']">
            {{ cartIds.has(game.id) ? 'Added ' : 'Add to Cart' }}
          </button>
          <i @click.stop="addToFavorites(game)"
            :class="['pi pi-heart lg:ml-8 xs:ml-3 mr-2 lg:text-4xl xs:text-3xl bg-white-game hover:-translate-y-1 transition duration-300 ease-in-out', favoritedIds.has(game.id) ? 'text-fuchsia-900' : 'hover:text-fuchsia-900']">
          </i>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import 'primeicons/primeicons.css'
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router'
import { inject, reactive, computed, ref, watch ,onMounted} from 'vue';

const props = defineProps({
  games: Array
});

const search = ref('');
const filteredGames = computed(() => {
  return props.games.filter(game => game.name && game.name.toLowerCase().includes(search.value.toLowerCase()));
});


const toast = useToast();

const cartStore = inject('cartStore');
const cartIds = reactive(new Set(cartStore.cart.map(item => item.id)));
const favoritedIds = reactive(new Set(cartStore.favorites.map(item => item.id)));


const addToCart = (game) => {
  try {
    const added = cartStore.addToCart(game);
    if (added) {
      cartIds.add(game.id);
      toast.success(`Added ${game.name} to cart!`, { timeout: 4000 });
    } else {
      toast.warning(`${game.name} is already in the cart`, { timeout: 4000 });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
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
  if (game && game.id) {
    try {
      const gameParam = JSON.stringify(game);
      router.push({
        name: 'GameDetails',
        params: { gameId: game.id },
        query: { game: gameParam }
      });
    } catch (error) {
      console.error('Error serializing game data:', error);
    }
  } else {
    console.error('Invalid game data or missing game ID');
  }
};

onMounted(() => {
  console.log("Games received in Game component:", props.games);
});

//format the name is the lenght is over 23
const formatName = (name) => {
  return name.length > 23 ? `${name.substring(0, 20)}...` : name;
};

//to show the search input only if the url is /home
const isHome = computed(() => {
  return router.currentRoute.value.path === '/home';
});


</script>