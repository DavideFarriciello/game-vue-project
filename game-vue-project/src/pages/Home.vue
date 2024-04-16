<template>
  <div>
    <Header></Header>
    <Game :games="games"/>
  </div>
</template>

<script setup>
import Header from '../component/Header.vue';
import Game from '@/component/Game.vue';

const games = [
  { name: 'EA SPORTS FC™ 24 ', subName:'EA Sports', image: 'https://static-it.gamestop.it/images/products/315193/3max.jpg', price: '44,00$' },
  { name: 'Grand Theft Auto V', subName:'Rockstar Games', image: 'https://static-it.gamestop.it/images/products/304447/3max.jpg', price: '50,00$' },
  { name: 'Marvel s Spider-Man', subName:'Sony Interactive Entertainment', image: 'https://static-it.gamestop.it/images/products/298902/3max.jpg',price: '60,00$' },
  { name: 'EA SPORTS WRC', subName:'EA Electronic Arts', image: 'https://static-it.gamestop.it/images/products/316265/3max.jpg',price: '50,00$' },
  { name: 'EA SPORTS™ F1® 23', subName:'EA Electronic Arts', image: 'https://static-it.gamestop.it/images/products/314125/3max.jpg',price: '50,00$' },
];
</script>