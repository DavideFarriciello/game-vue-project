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
import { useRouter } from 'vue-router';
import { computed, ref, onMounted } from 'vue';

const props = defineProps({
  games: Array
});

const cart = ref(new Map());
const userId = localStorage.getItem('userId');

const search = ref('');
const filteredGames = computed(() => {
  return props.games.filter(game => game.name.toLowerCase().includes(search.value.toLowerCase()));
});

const toast = useToast();

// Fetch cart contents from the server and update local state
const fetchCartContents = async () => {
  try {
    const response = await fetch(`http://localhost:3000/get-cart?userId=${userId}`);
    if (response.ok) {
      const items = await response.json();
      items.forEach(item => {
        cart.value.set(item.gameId, item.quantity);
      });
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

const addToCart = async (game) => {
  if (cart.value.has(game.id)) {
    toast.info('This game is already in your cart.');
    return;
  }
  
  const payload = {
    userId: userId,
    gameId: game.id,
    gameName: game.name,
    gamePrice: game.price,
    quantity: 1
  };

  try {
    const response = await fetch('http://localhost:3000/add-to-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      cart.value.set(game.id, 1); // Assuming adding one item at a time
      toast.success('Added to cart successfully');
    } else {
      throw new Error(`Failed to add to cart with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error('Failed to add to cart');
  }
};

const isCarted = (gameId) => cart.value.has(gameId);

const router = useRouter();

const showDetails = (game) => {
  router.push({
    name: 'GameDetails',
    params: { gameId: game.id },
    query: { game: JSON.stringify(game) }
  });
};

onMounted(() => {
  fetchCartContents();
});

const formatName = (name) => name.length > 23 ? `${name.substring(0, 20)}...` : name;

const isHome = computed(() => router.currentRoute.value.path === '/home');
</script>
