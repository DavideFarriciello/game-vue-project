<template>
  <div>
    <h2
      class="lg:text-5xl xs:text-3xl flex justify-center lg:mt-10 xs:mt-3 font-bold text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">
      Favorites</h2>
    <div v-if="favoritesItems.length > 0" class="flex flex-wrap justify-center">
      <div v-for="item in favoritesItems" :key="item.gameId">
        <div
          class="flex flex-row space-x-4 bg-white-game lg:mt-8 xs:mt-3 pt-2 p-4 lg:mx-24 xs:mx-1 rounded-lg shadow-2xl hover-shadow-purple transition-all duration-300 ease-in-out hover:scale-105 lg:w-[90%] xs:w-[97%] h-[170px] ">
          <img :src="item.gameImage" :alt="item.gameName" class="rounded-md ">
          <div class="flex flex-col pl-6 lg:mt-4 xs:mt-0">
            <h2 class="lg:text-4xl xs:text-xl font-bold lg:mb-3 xs:mb-1">{{ item.gameName }}</h2>
            <div class="flex flex-row">
              <h2 class="lg:text-3xl xs:text-xl lg:mt-5 xs:mt-2">Price: {{ item.gamePrice }}€</h2>
              <button @click="removeFromFavorites(item.gameId)"
                class="bg-slate-950 text-white font-bold lg:h-14 xs:h-11 px-4 ml-6 mt-3 rounded-lg shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
                Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2
        class="lg:text-5xl xs:text-3xl flex justify-center mt-8 pb-2 xs:px-2 text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">
        Any item is being added to the favorites</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userId = localStorage.getItem('userId');
const favoritesItems = ref([]);

// Fetch Favorites Items
async function fetchFavoritesItems() {
  try {
    const response = await fetch(`http://localhost:3000/get-favorites?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch favorites items with status: ${response.status}`);
    }
    const data = await response.json();
    favoritesItems.value = data;
  } catch (error) {
    console.error('Error fetching favorites items:', error);
  }
}

onMounted(async () => {
  await fetchFavoritesItems();
});

//Remove Item from Favorites
async function removeFromFavorites(gameId) {
  try {
    const response = await fetch('http://localhost:3000/remove-from-favorites', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, gameId })
    });

    if (!response.ok) {
      throw new Error(`Failed to remove item from favorites with status: ${response.status}`);
    }

    // Update local cart state after removal
    const index = favoritesItems.value.findIndex(item => item.gameId === gameId);
    if (index !== -1) {
      favoritesItems.value.splice(index, 1);

    }
  } catch (error) {
    console.error('Error removing item from favorites:', error);
  }
}
</script>
