<template>

  <div>
    <Game :games="games" />
    <transition name="modal">
   
    </transition>
  </div>

</template>

<script setup>
import Game from '@/component/Game.vue';
// Ensure correct path
import { ref, onMounted } from 'vue';

const games = ref([]);

// Function to fetch games from the backend
const fetchGames = async () => {
  try {
    const response = await fetch('http://localhost:3000/games');
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }
    const data = await response.json();
    games.value = data[0].games; // Adjust this line to correctly set the games data
    console.log("Fetched games:", games.value);  // Confirm the data structure
  } catch (error) {
    console.error('Error fetching games:', error);
  }
};

// Use onMounted lifecycle hook to fetch games when the component is mounted
onMounted(fetchGames);
</script>

<style scoped>
/* Transition for the modal background */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.modal-enter,
.modal-leave-to

/* Starting and ending state for the fade */
  {
  opacity: 0;
}
</style>