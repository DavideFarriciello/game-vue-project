<template>
  <div>
    <h2 class="lg:text-5xl xs:text-3xl flex justify-center lg:mt-10 xs:mt-3 font-bold text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">Favorites</h2>
    <div v-if="favoritesStore.favorites.length > 0" class="flex flex-wrap justify-center">
      <div v-for="item in favoritesStore.favorites" :key="item.id" >
        <div
          class="flex flex-row space-x-4 bg-white-game lg:mt-8 xs:mt-3 pt-2 p-4 lg:mx-24 xs:mx-1 rounded-lg shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 lg:w-[90%] xs:w-[97%] h-[150px] ">
          <img :src="item.image" :alt="item.name" class="rounded-md ">
          <div class="flex flex-col pl-6 mt-4">
            <h2 class="lg:text-4xl xs:text-xl font-bold lg:mb-3 xs:mb-1">{{ item.name }}</h2>
            <div class="flex flex-row">
              <h2 class="lg:text-3xl xs:text-xl lg:mt-5 xs:mt-2">Price: {{ item.price }}€</h2>
              <button @click="removeFromFavorites(item.id)"
                class="bg-slate-950 text-white font-bold lg:h-14 xs:h-11 px-4 ml-6 mt-3 rounded-lg shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
                Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 class="lg:text-5xl xs:text-3xl flex justify-center mt-8 pb-2 xs:px-2 text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">Any item is being added to the favorites</h2>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const favoritesStore = inject('cartStore');

const removeFromFavorites = (id) => {
  favoritesStore.removeFromFavorites(id);
};
</script>
