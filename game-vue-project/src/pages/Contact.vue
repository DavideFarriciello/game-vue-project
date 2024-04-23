<template>
  <div>
    <h1
      class="mt-16 text-7xl flex justify-center pb-7 font-bold text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">
      GET IN TOUCH</h1>
    <div class="flex justify-between mx-60 my-10 ">
        <a href="https://www.linkedin.com/in/davide-farriciello" target="_blank"
          class="pi pi-linkedin text-7xl text-blue-600 hover:-translate-y-1 transition duration-300 ease-in-out"></a>
        <a href="https://www.instagram.com/davide_farriciello" target="_blank"
          class="pi pi-instagram text-7xl text-pink-600 hover:-translate-y-1 transition duration-300 ease-in-out"></a>
        <a href="https://wa.me/353830044870" target="_blank"
          class="pi pi-whatsapp text-7xl text-green-500 hover:-translate-y-1 transition duration-300 ease-in-out"></a>
        <div class="flex flex-row">
          <a href="mailto:davide.farriciello@gmail.com" target="_blank" class="pi pi-envelope text-7xl text-red-700 hover:-translate-y-1 transition duration-300 ease-in-out"></a>
        </div>
        <div class="flex flex-row">
          <a href="https://www.davidefarriciello.dev" target="_blank"
          class="pi pi-desktop text-7xl text-fuchsia-800 hover:-translate-y-1 transition duration-300 ease-in-out"></a>
      </div>
    </div>
    <div class="flex flex-wrap justify-center p-5">
      <div
        class="bg-white-game rounded-lg w-[40%] h-[520px] my-10 shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover-shadow-red">

        <form class="flex flex-col p-4">
          <h2 class="text-5xl flex justify-center pb-7 font-bold text-gradient-from-fucsia"></h2>

          <input type="text" placeholder="Username" class="mb-5 p-4 rounded-lg outline-none">

          <input type="email" placeholder="Email" class="mb-3 p-4 rounded-lg w-full outline-none">

          <input type="text" placeholder="Message" class="mb-3 p-4 rounded-lg w-full outline-none">

          <button type="submit"
            class="bg-gradient-to-r from-fuchsia-900 to-slate-950 text-white font-bold text-xl w-full py-2 ml-2 mt-5 mb-3 rounded-3xl shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
            Send
          </button>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
</script>
