<template>
  <div>
    <div class="flex justify-center bg-gradient-to-r from-slate-950 to-fuchsia-900 transition-all duration-300 ease-in-out hover:scale-105">
      <h1 class="lg:text-3xl my-4 xs:text-xl text-white">Free shipping if you spend over then 50€</h1>
    </div>
    <div class="relative w-[100%] h-80 overflow-hidden mt-0 cursor-pointer">
      <button @click="navigateToGameMinecraft" class="absolute top-52 left-32 z-10 bg-slate-950 text-white font-bold lg:text-xl lg:w-52 xs:w-28 xs:text-sm xs:py-2 lg:py-3 ml-2 mt-5 mb-2 rounded-3xl shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
        Buy Now
      </button>
      <video src="/gallery/minecraft-banner.mp4" autoplay muted loop style="width: 100%; height: 100%; object-fit:cover;"></video>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToGameMinecraft() {
  const gameDetails = {
    id: 19,
    name: 'Minecraft',
    subName: 'Microsoft',
    console: 'XboxONE',
    image: 'https://static-it.gamestop.it/images/products/259624/3max.jpg',
    price: 15.99,
    type: 'Action/Adventure',
    dateGame: '28/11/2014',
    pegi: 'recommended age 7 and over',
    pic1: '/gallery/minecraft-pic1.jpg',
    pic2: '/gallery/minecraft-pic2.jpg',
    pic3: '/gallery/minecraft-pic3.jpg',
    pic4: '/gallery/minecraft-pic4.jpg',
    description: 'Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine deep into the world in survival mode, crafting weapons and armour to fend off the dangerous mobs. This version will let you play together across different devices, access a multitude of content through the in-game Store and get all future game updates.'
  };

  const query = encodeURIComponent(JSON.stringify(gameDetails));
  router.push(`/game-details/2?game=${query}`);
}
</script>
