<template>
  <div>
    <h2
      class="text-5xl text-center mt-10 font-bold text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">
      Cart
    </h2>
    <div v-if="cartItems.length > 0">
      <div v-for="item in cartItems" :key="item.gameId"
        class="flex flex-row space-x-4 bg-white-game lg:mt-8 xs:mt-3 pt-2 p-4 lg:mx-20 xs:mx-1 rounded-lg shadow-2xl hover-shadow-red transition-all duration-300 ease-in-out hover:scale-105 lg:w-[90%] xs:w-[97%] h-[170px] ">
        <img :src="item.gameImage" :alt="item.gameName" class="rounded-md">
        <div class="flex flex-col pl-6 lg:mt-4 xs:mt-0">
          <h2 class="lg:text-4xl xs:text-xl font-bold lg:mb-3 xs:mb-1">{{ item.gameName }}</h2>
          <div class="flex flex-row">
            <p class="lg:text-3xl xs:text-xl lg:mt-5 xs:mt-2">Price: €{{ item.gamePrice.toFixed(2) }}</p>
            <button @click="removeFromCart(item.gameId)"
              class="bg-slate-950 text-white font-bold lg:h-14 xs:h-11 px-4 ml-6 mt-3 rounded-lg shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
              Remove
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col lg:float-end xs:float-end my-12 p-3 lg:mr-24 xs:mr-1">
        <h2 class="lg:text-3xl xs:text-xl mb-5 ml-44">Sub Total: €{{ totalPrice }}</h2>
        <div class="relative flex items-center">
          <i class="pi pi-info-circle text-3xl left-32 bottom-3 hover:-translate-y-1 transition-all duration-300 ease-in-out hover:text-fuchsia-900 relative"
            @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
          </i>
          <span v-if="showTooltip"
            class="absolute lg:bottom-16 xs:bottom-20 lg:mr-64 xs:mr-52 text-xl bg-white-game rounded px-2 py-1 transition-all duration-300 ease-in-out">
            Free shipping if you spend more than €50.
          </span>
          <p class="lg:text-3xl xs:text-xl mb-5 pl-36">Shipping: €{{ shippingCost }}</p>
        </div>
        <h2 class="text-4xl font-bold mb-5 ml-44">Total: €{{ finalTotal }}</h2>
        <button
          class="bg-slate-950 text-white font-bold h-14 px-4 mt-3 ml-44 text-xl rounded-lg shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out hover:cursor-not-allowed">
          Pay Now
        </button>
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
import { ref, onMounted } from 'vue';

const userId = localStorage.getItem('userId');
const cartItems = ref([]);

const totalPrice = ref(0);
const shippingCost = ref(10);
const finalTotal = ref(0);
const showTooltip = ref(false);

onMounted(async () => {
  await fetchCartItems();
});

async function fetchCartItems() {
  try {
    const response = await fetch(`http://localhost:3000/get-cart?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cart items with status: ${response.status}`);
    }
    const data = await response.json();
    cartItems.value = data;
    updateTotals();
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
}

function updateTotals() {
  let subtotal = 0;
  cartItems.value.forEach(item => {
    subtotal += item.quantity * item.gamePrice;
  });

  totalPrice.value = parseFloat(subtotal.toFixed(2));

  if (subtotal > 50) {
    shippingCost.value = 0;
  } else {
    shippingCost.value = 10;
  }

  finalTotal.value = parseFloat((subtotal + shippingCost.value).toFixed(2));
}


async function removeFromCart(gameId) {
  try {
    const response = await fetch('http://localhost:3000/remove-from-cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, gameId })
    });

    if (!response.ok) {
      throw new Error(`Failed to remove item from cart with status: ${response.status}`);
    }

    // Update local cart state after removal
    const index = cartItems.value.findIndex(item => item.gameId === gameId);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
      updateTotals();
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
}
</script>
