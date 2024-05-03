<template>
  <div class="p-5 flex flex-col items-center justify-center">
    <div v-if="game"
      class="flex flex-row space-x-4 bg-white-game lg:mt-8 xs:mt-2 pt-10 lg:p-4 xs:p-2 rounded-lg shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 lg:w-[70%] lg:h-[550px] xs:w-fit xs:h-fit">
      <img :src="game.image" :alt="game.name" class="lg:w-96 xs:w-40 h-fit rounded-md">
      <div class="flex flex-col lg:pl-16 xs:pl-0">
        <h2 class="lg:text-4xl xs:text-xl font-bold mb-3 xs:mb-1">{{ game.name }}</h2>
        <h2 class="lg:text-xl xs:text-base mb-1">By {{ game.subName }}</h2>
        <h2 class="lg:text-xl xs:text-base">{{ game.console }}</h2>
        <h2 class="lg:text-3xl xs:text-xl mt-8">Price: {{ game.price }}€</h2>
        <div class="flex flex-row ">
          <button @click.stop="addToCart(game)"
            :class="['bg-slate-950 text-white font-bold lg:text-xl lg:w-52 xs:w-24 xs:text-sm  xs:py-4 py-6 ml-2 mt-5 rounded-3xl shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out', cartIds.has(game.id) ? '!bg-fuchsia-900' : 'hover:bg-fuchsia-900 hover:shadow-lg']">
            {{ cartIds.has(game.id) ? 'Added ' : 'Add to Cart' }}
          </button>
          <i @click.stop="addToFavorites(game)"
            :class="['pi pi-heart lg:ml-8 lg:mt-8 xs:mt-7 lg:text-5xl xs:text-4xl xs:ml-2  bg-white-game hover:-translate-y-1 transition duration-300 ease-in-out hover:cursor-pointer', favoritedIds.has(game.id) ? 'text-fuchsia-900' : 'hover:text-fuchsia-900']"></i>
        </div>
        <p class="lg:text-xl mb-1 lg:mt-24 xs:mt-3 xs:text-base">Type: {{ game.type }}</p>
        <p class="lg:text-xl mb-1 xs:text-base">Date: {{ game.dateGame }}</p>
        <p class="lg:text-xl mb-1 xs:text-base">Pegi: {{ game.pegi }}</p>
      </div>
    </div>
    <div v-else class="text-xl">
      Loading Details...
    </div>
    <h2 class="lg:text-4xl xs:text-2xl lg:mt-20 xs:mt-4 xs:mb-2 lg:mb-10 flex justify-center text-gradient-from-fucsia">
      Description</h2>
    <h2 class="lg:text-xl xs:text-base w-[80%]">
      {{ displayDescription }}
      <span v-if="isDescriptionLong" class="text-gradient-from-fucsia cursor-pointer" @click="toggleDescription">
        {{ showFullDescription ? 'show less' : 'show more' }}
      </span>
    </h2>
    <div>
      <h2
        class="lg:text-4xl xs:text-2xl lg:mt-20 xs:mt-4 xs:mb-2 lg:mb-10 flex justify-center text-gradient-from-fucsia">
        Gallery</h2>
      <div class="flex flex-col lg:gap-10 xs:gap-3">
        <div class="flex lg:flex-row xs:flex-col lg:gap-16 xs:gap-3">
          <img :src="game.pic1"
            class="h-fit w-96 rounded-md hover-shadow-red shadow-2xl transition-all duration-300 ease-in-out lg:hover:scale-125">
          <img :src="game.pic2"
            class="w-96 h-fit rounded-md hover-shadow-red shadow-2xl transition-all duration-300 ease-in-out lg:hover:scale-125">
        </div>
        <div class="flex lg:flex-row xs:flex-col lg:gap-16 xs:gap-3">
          <img :src="game.pic3"
            class="w-96 h-fit rounded-md hover-shadow-red shadow-2xl transition-all duration-300 ease-in-out lg:hover:scale-125">
          <img :src="game.pic4"
            class="w-96 h-fit rounded-md hover-shadow-red shadow-2xl transition-all duration-300 ease-in-out lg:hover:scale-125">
        </div>
      </div>
    </div>
    <div>
      <h2 class="lg:text-4xl xs:text-2xl lg:mt-20 xs:mt-5 flex justify-center text-gradient-from-fucsia">Other Games
      </h2>
      <Game :games="games" />
    </div>
  </div>
</template>


<script setup>
import 'primeicons/primeicons.css'
import Game from '@/component/Game.vue';
import { watch, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { inject, reactive } from 'vue';

const games = ref([]);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to fetch games from the backend
const fetchGames = async () => {
  try {
    const response = await fetch('http://localhost:3000/games');
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }
    const data = await response.json();
    shuffleArray(data[0].games);
    games.value = data[0].games.slice(0, 5);
    console.log("Fetched games:", games.value);
  } catch (error) {
    console.error('Error fetching games:', error);
  }
};

onMounted(fetchGames);

const cartStore = inject('store');
const cartIds = reactive(new Set(cartStore.cart.map(item => item.id)));
const favoritedIds = reactive(new Set(cartStore.favorites.map(item => item.id)));

const route = useRoute();
const game = ref(null);

watch(() => route.query, () => {
  if (route.query.game && route.query.games) {
    try {
      game.value = JSON.parse(route.query.game);
      allGames.value = JSON.parse(route.query.games);
    } catch (e) {
      console.error('Error parsing game details:', e);
    }
  }
}, { deep: true });

console.log("Current route query:", route.query);

const toast = useToast();


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

if (route.query.game) {
  game.value = JSON.parse(route.query.game);
} else {
  console.log("No game data available in route query");
}


const showFullDescription = ref(false);

const isDescriptionLong = computed(() => {
  return game.value && game.value.description.split(' ').length > 20;
});

const displayDescription = computed(() => {
  if (showFullDescription.value) {
    return game.value ? game.value.description : '';
  }
  return game.value ? game.value.description.split(' ').slice(0, 20).join(' ') + '...' : '';
});

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};
</script>