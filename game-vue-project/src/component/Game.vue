<template>
  <div class="flex flex-wrap justify-center p-5">
    <div v-for="game in games" :key="game"
      class="bg-white rounded-lg w-64 ml-7 mb-20 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out ">
      <h2 class="text-3xl text-center my-4">{{ game.name }}</h2>
      <h2 class="text-xl text-center my-4">by{{ game.subName }}</h2>
      <img :src="game.image" :alt="game.name">
      <p class="text-3xl text-center my-4">Price: {{ game.price }}</p>
      <button
        class="bg-red-500 text-white font-bold py-2 px-4 ml-2 mb-2 rounded-lg shadow hover:bg-red-600 hover:shadow-lg transition duration-300 ease-in-out">
        Add to Cart
      </button>

    </div>
  </div>
</template>

<script setup>


const games = [
  { name: 'Fifa24', subName:'Rockstar Games', image: 'https://assets.target.com.au/transform/03bd2aa4-6ceb-41df-8196-aa73322de9cd/68771409-IMG-001?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', price: '44,00$' },
  { name: 'GTA V', subName:'EA Sports', image: 'https://static-it.gamestop.it/images/products/304447/3max.jpg', price: '50,00$' },

];
</script>
