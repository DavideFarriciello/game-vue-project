<template>
  <div>
    <Game :games="games"/>
  </div>
</template>

<script setup>
import Game from '@/component/Game.vue';
import jsonData from '../../data/db.json'

const games = jsonData.games;
</script>