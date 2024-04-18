<template>
  <div>
    <h2 class="text-5xl flex justify-center mt-10 font-bold text-gradient-from-fucsia">Cart</h2>
    <div v-if="cartStore.cart.length > 0">
      <div v-for="item in cartStore.cart" :key="item.id">
        <div
          class="flex flex-row space-x-4 bg-white-game mt-8 pt-2 p-4 mx-24 rounded-lg shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 w-[90%] h-[150px] ">
          <img :src="item.image" :alt="item.name" class="rounded-md ">
          <div class="flex flex-col pl-6 mt-4">
            <h2 class="text-4xl font-bold mb-3">{{ item.name }}</h2>
            <div class="flex flex-row">
              <h2 class="text-3xl mt-5">Price: {{ item.price }}€</h2>
              <button @click="removeFromCart(item.id)"
                class="bg-slate-950 text-white font-bold h-14 px-4 ml-6 mt-3 rounded-lg shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
                Remove</button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col float-end my-12 p-3 mr-24">
        <h2 class="text-3xl mb-5 ml-44">Sub Total: {{ totalPrice }}€</h2>
        <div class="relative flex items-center">
          <i class="pi pi-info-circle text-3xl left-32 bottom-3 hover:-translate-y-1 transition-all duration-300 ease-in-out hover:text-fuchsia-900 relative"
            @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
          </i>
          <span v-if="showTooltip"
            class="absolute bottom-16 mr-60 text-xl bg-white-game rounded px-2 py-1 transition-all duration-300 ease-in-out">
            Free shipping if you spend more than €50.
          </span>
          <h2 class="text-3xl mb-5 pl-36">Shipping: {{ shippingCost }}€</h2>
        </div>
        <h2 class="text-4xl font-bold mb-5 ml-44">Total: {{ finalTotal }}€</h2>
        <button
          class="bg-slate-950 text-white font-bold h-14 px-4 mt-3 ml-44 text-xl rounded-lg shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out hover:cursor-not-allowed">
          Pay Now</button>
      </div>
    </div>
    <div v-else>
      <h2 class="text-5xl flex justify-center mt-10 pb-2 text-gradient-from-fucsia">Any item is being added to the cart
      </h2>
    </div>
  </div>
</template>

<script setup>
import { inject, computed, ref } from 'vue';

const cartStore = inject('cartStore');

const removeFromCart = (id) => {
  cartStore.removeFromCart(id);
};


const totalPrice = computed(() => {
  const total = cartStore.cart.reduce((sum, item) => sum + (item.price * 100), 0) / 100;
  return Number(total.toFixed(2));
});

const shippingCost = computed(() => {
  return totalPrice.value < 50.00 ? 10.00 : 0.00;
});

const finalTotal = computed(() => {
  return (Number(totalPrice.value) + Number(shippingCost.value)).toFixed(2);
});

const showTooltip = ref(false);
</script>
