<template>
  <div>
    <h2 class="text-5xl flex justify-center mt-10 font-bold text-gradient-from-fucsia">Cart</h2>
    <div  v-if="cartStore.cart.length > 0">
      <div v-for="item in cartStore.cart" :key="item.id">
        <div
          class="flex flex-row space-x-4 bg-white-game mt-8 pt-2 p-4 ml-8 rounded-lg shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 w-[30%] h-[200px] ">
          <img :src="item.image" :alt="item.name" class="rounded-md ">
          <div class="flex flex-col pl-6 mt-4">
            <h2 class="text-4xl font-bold mb-3">{{ item.name }}</h2>
            <div class="flex flex-row">
              <h2 class="text-3xl mt-1">Price: {{ item.price }}€</h2>
              <button @click="removeFromCart(item.id)"
                class="bg-slate-950 text-white font-bold h-14 px-4 ml-6 mt-3 rounded-lg shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
                Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 class="text-5xl flex justify-center mt-10 text-gradient-from-fucsia">Any item is being added to the cart</h2>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const cartStore = inject('cartStore');

const removeFromCart = (id) => {
  cartStore.removeFromCart(id);
};
</script>
