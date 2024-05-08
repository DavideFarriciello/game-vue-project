<template>
  <div>
    <h1
      class="lg:mt-16 xs:mt-8 lg:text-7xl xs:text-5xl flex justify-center pb-7 font-bold text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">
      GET IN TOUCH</h1>
    <div class="flex justify-between lg:mx-60 xs:mx-2 lg:my-10 xs:my-4 ">
      <a href="https://www.linkedin.com/in/davide-farriciello" target="_blank"
        class="pi pi-linkedin lg:text-7xl xs:text-5xl text-blue-600 hover:-translate-y-2 transition duration-300 ease-in-out"></a>
      <a href="https://www.instagram.com/davide_farriciello" target="_blank"
        class="pi pi-instagram lg:text-7xl xs:text-5xl text-pink-600 hover:-translate-y-2 transition duration-300 ease-in-out"></a>
      <a href="https://wa.me/353830044870" target="_blank"
        class="pi pi-whatsapp lg:text-7xl xs:text-5xl text-green-500 hover:-translate-y-2 transition duration-300 ease-in-out"></a>
      <div class="flex flex-row">
        <a href="mailto:davide.farriciello@gmail.com" target="_blank"
          class="pi pi-envelope lg:text-7xl xs:text-5xl text-red-700 hover:-translate-y-2 transition duration-300 ease-in-out"></a>
      </div>
      <div class="flex flex-row">
        <a href="https://www.davidefarriciello.dev" target="_blank"
          class="pi pi-desktop lg:text-7xl xs:text-5xl text-fuchsia-800 hover:-translate-y-2 transition duration-300 ease-in-out "></a>
      </div>
    </div>
    <div class="flex flex-wrap justify-center p-5">
      <div
        class="bg-white-game rounded-lg lg:w-[40%] xs:w-[90%] lg:h-[390px] xs:[370px] lg:my-8 xs:my-1 shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover-shadow-purple">

        <form class="flex flex-col px-4" @submit="handleSubmitForm">
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

// Sumbit Form 
const handleSubmitForm = async (event) => {
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

// reset the form after submited
const resetForm = (form) => {
    form.reset();
};


</script>
