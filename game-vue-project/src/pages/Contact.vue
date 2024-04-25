<template>
  <div>
    <h1
      class="mt-16 text-7xl flex justify-center pb-7 font-bold text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">
      GET IN TOUCH</h1>
    <div class="flex justify-between mx-60 my-10 ">
      <a href="https://www.linkedin.com/in/davide-farriciello" target="_blank"
        class="pi pi-linkedin text-7xl text-blue-600 hover:-translate-y-2 transition duration-300 ease-in-out"></a>
      <a href="https://www.instagram.com/davide_farriciello" target="_blank"
        class="pi pi-instagram text-7xl text-pink-600 hover:-translate-y-2 transition duration-300 ease-in-out"></a>
      <a href="https://wa.me/353830044870" target="_blank"
        class="pi pi-whatsapp text-7xl text-green-500 hover:-translate-y-2 transition duration-300 ease-in-out"></a>
      <div class="flex flex-row">
        <a href="mailto:davide.farriciello@gmail.com" target="_blank"
          class="pi pi-envelope text-7xl text-red-700 hover:-translate-y-2 transition duration-300 ease-in-out"></a>
      </div>
      <div class="flex flex-row">
        <a href="https://www.davidefarriciello.dev" target="_blank"
          class="pi pi-desktop text-7xl text-fuchsia-800 hover:-translate-y-2 transition duration-300 ease-in-out "></a>
      </div>
    </div>
    <div class="flex flex-wrap justify-center p-5">
      <div
        class="bg-white-game rounded-lg w-[40%] h-[390px] my-8 shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover-shadow-red">

        <form class="flex flex-col px-4" @submit="handleSubmit">
          <input type="text" name="name" placeholder="Name" class="mt-3 mb-3 p-4 rounded-lg outline-none">
          <input type="email" name="email" placeholder="Email" class="mb-3 p-4 rounded-lg w-full outline-none">
          <textarea name="message" placeholder="Message" rows="4"
            class="mb-3 p-4 rounded-lg w-full outline-none"></textarea>
          <button
            class="bg-gradient-to-r from-fuchsia-900 to-slate-950 text-white font-bold text-xl w-full py-2 ml-2 mt-2 mb-3 rounded-3xl shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    console.log("Form data:", formProps);

    try {
        const response = await axios.post('http://localhost:3000/contact', formProps);
        console.log('Server response:', response.data);
        toast.success(`${response.data}`, { timeout: 4000 });
        resetForm(event.target);
    } catch (error) {
        console.error('Failed to send message:', error);
        toast.warning(`${error.response.data}`, { timeout: 4000 });
    }
};

const resetForm = (form) => {
    form.reset();
};


</script>
