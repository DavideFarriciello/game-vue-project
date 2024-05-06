<template>
  <div>
    <h2
      class="lg:text-5xl xs:text-3xl flex justify-center lg:mt-10 xs:mt-3 font-bold text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">
      Cart</h2>
    <div v-if="cart.length > 0">
      <div v-for="item in cart" :key="item.id">
        <div
          class="flex flex-row space-x-4 bg-white-game lg:mt-8 xs:mt-3 pt-2 p-4 lg:mx-20 xs:mx-1 rounded-lg shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 lg:w-[90%] xs:w-[97%] h-[170px] ">
          <img :src="item.image" :alt="item.name" class="rounded-md ">
          <div class="flex flex-col pl-6 lg:mt-4 xs:mt-0">
            <h2 class="lg:text-4xl xs:text-xl font-bold lg:mb-3 xs:mb-1">{{ item.name }}</h2>
            <div class="flex flex-row">
              <h2 class="lg:text-3xl xs:text-xl lg:mt-5 xs:mt-2">Price: {{ item.price }}€</h2>
              <button @click="removeFromCart(item.id)"
                class="bg-slate-950 text-white font-bold lg:h-14 xs:h-11 px-4 ml-6 mt-3 rounded-lg shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
                Remove</button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col lg:float-end xs:float-end my-12 p-3 lg:mr-24 xs:mr-1">
        <h2 class="lg:text-3xl xs:text-xl mb-5 ml-44">Sub Total: {{ totalPrice }}€</h2>
        <div class="relative flex items-center">
          <i class="pi pi-info-circle text-3xl left-32 bottom-3 hover:-translate-y-1 transition-all duration-300 ease-in-out hover:text-fuchsia-900 relative"
            @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
          </i>
          <span v-if="showTooltip"
            class="absolute lg:bottom-16 xs:bottom-20 lg:mr-60 xs:mr-52 text-xl bg-white-game rounded px-2 py-1 transition-all duration-300 ease-in-out">
            Free shipping if you spend more than €50.
          </span>
          <h2 class="lg:text-3xl xs:text-xl mb-5 pl-36">Shipping: {{ shippingCost }}€</h2>
        </div>
        <h2 class="text-4xl font-bold mb-5 ml-44">Total: {{ finalTotal }}€</h2>
        <button
          class="bg-slate-950 text-white font-bold h-14 px-4 mt-3 ml-44 text-xl rounded-lg shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out hover:cursor-not-allowed">
          Pay Now</button>
      </div>
    </div>
    <div v-else>
      <h2
        class="lg:text-5xl xs:text-3xl flex justify-center mt-10 pb-2 xs:px-2 lg:px-0 text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">
        Any item is being added to the cart
      </h2>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import axios from 'axios';

const cart = ref([]);
const totalPrice = ref(0);

const fetchCart = async () => {
  const userId = localStorage.getItem('userId');  // Get userId from local storage
  if (!userId) {
    console.error("No user ID found, user might not be logged in");
    return; // Prevents making the request if no userId is found
  }

  try {
    const response = await axios.get(`http://localhost:3000/cart`, {
      params: { userId }  // Include userId in the GET request
    });
    console.log("Cart response:", response.data);
    cart.value = response.data.items;
    calculateTotalPrice();
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
  }
};


const calculateTotalPrice = () => {
  totalPrice.value = cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
};

const shippingCost = computed(() => {
  return totalPrice.value < 50.00 ? 10.00 : 0.00;
});

const finalTotal = computed(() => {
  return (Number(totalPrice.value) + Number(shippingCost.value)).toFixed(2);
});

const showTooltip = ref(false);

onMounted(fetchCart);
</script>
