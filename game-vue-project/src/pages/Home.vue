<template>
  <div>
    <Game :games="games" />
  </div>
</template>

<script setup>
import Game from '@/component/Game.vue';

import { ref, onMounted } from 'vue';

const games = ref([]);

//Fetch game from the backend
const fetchGames = async () => {
  try {
    const response = await fetch('http://localhost:3000/games');
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }
    const data = await response.json();
    games.value = data[0].games;
  } catch (error) {
    console.error('Error fetching games:', error);
  }
};

onMounted(fetchGames);
</script>
