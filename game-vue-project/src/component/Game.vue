<template>
  <div>
    <div class="flex justify-center">
      <input v-if="isHome" type="text" placeholder="Search games"
        class="lg:text-xl pl-5 py-2 mt-5 lg:w-96 rounded-full shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 outline-none xs:w-72 xs:text-base"
        v-model="search">
    </div>
    <div v-if="filteredGames.length > 0">
      <div class="flex flex-wrap justify-center p-5">

        <div v-for="game in filteredGames" :key="game._id" @click="showDetails(game)"
          class="bg-white-game rounded-lg lg:w-64 xs:w-[139px] ml-7 lg:mb-20 xs:mb-8 shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer">
          <img :src="game.image" :alt="game.name" class="pt-1 px-1">
          <h2 class="lg:text-xl xs:text-base text-center lg:my-4 xs:my-2">{{ formatName(game.name) }}</h2>
          <p class="lg:text-xl xs:text-base text-center lg:my-4 xs:my-2">Price: {{ game.price }}€</p>
          <div class="flex flex-row">
            <button @click.stop="addToCart(game)"
              :class="['bg-slate-950 text-white font-bold py-2 lg:w-32 xs:w-[90px] lg:text-lg xs:text-sm lg:ml-6 xs:ml-2 mb-2 rounded-lg shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out', isCarted(game.id) ? '!bg-fuchsia-900' : 'hover:bg-fuchsia-900']">
              {{ isCarted(game.id) ? 'Added' : 'Add to Cart' }}
            </button>
            <i @click.stop=""
              class="pi pi-heart lg:ml-8 xs:ml-3 mr-2 lg:text-4xl xs:text-3xl bg-white-game hover:-translate-y-1 transition duration-300 ease-in-out">
            </i>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="lg:text-3xl xs:text-xl flex justify-center lg:mt-10 xs:mt-3 font-bold text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">No games matched your search. Try something new!</p>
    </div>
  </div>


</template>

<script setup>
import 'primeicons/primeicons.css'
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router'
import { inject, reactive, computed, ref, onMounted } from 'vue';

const props = defineProps({
  games: Array
});

const cart = ref(new Map());
const userId = localStorage.getItem('userId');

const search = ref('');
const filteredGames = computed(() => {
  return props.games.filter(game => game.name && game.name.toLowerCase().includes(search.value.toLowerCase()));
});


const toast = useToast();

const addToCart = async (game) => {
  console.log("Game object:", game); 
  // Check what the game object contains
  const payload = {
    userId: userId,
    gameId: game.id, // This is where it seems to be undefined
    quantity: 1
  };
  console.log("Sending to add-to-cart:", payload);



  console.log("Sending to add-to-cart:", payload);

  try {
    const response = await fetch('http://localhost:3000/add-to-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Failed to add to cart with status: ${response.status}`);
    }

    cart.value.set(game._id, (cart.value.get(game._id) || 0) + 1);
    toast.success('Added to cart successfully');
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error('Failed to add to cart');
  }
};

const isCarted = (gameId) => cart.value.has(gameId);

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

onMounted(async () => {
  const response = await fetch('http://localhost:3000/games');
  const games = await response.json();
  console.log("Fetched games:", games); // This should show the structure of game objects
});


</script>