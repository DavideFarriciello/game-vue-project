<template>
  <div class="flex flex-wrap justify-center p-5">
    <div
      class="bg-white-game rounded-lg w-[40%] h-[520px] mt-10 shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover-shadow-red">

      <form @submit.prevent="handleSubmit" class="flex flex-col p-4">
        <h2 class="text-5xl flex justify-center pb-7 font-bold text-gradient-from-fucsia">{{ formType }}</h2>


        <input type="text" v-model="user.username" placeholder="Username" class="mb-5 p-4 rounded-lg ">


        <input type="password" v-model="user.password" placeholder="Password" class="mb-5 p-4 rounded-lg">

        <div v-if="formType === 'Register'">
          <input type="password" v-model="user.confirmPassword" placeholder="Confirm Password" class="mb-5 p-4 rounded-lg w-full">
        </div>

        <div v-if="formType === 'Register'">
          <input type="email" v-model="user.email" placeholder="Email" class="mb-3 p-4 rounded-lg w-full">
        </div>


        <button type="submit"
          class="bg-gradient-to-r from-fuchsia-900 to-slate-950 text-white font-bold text-xl w-full py-2 ml-2 mt-5 mb-3 rounded-3xl shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
          {{ formType }}
        </button>


        <p class="text-center mt-1">
          <span @click="toggleFormType" class="text-xl text-gradient-from-fucsia hover:-translate-y-1  cursor-pointer">
            {{ formType === 'Login' ? 'No account? Register' : 'Have an account? Login' }}
          </span>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formType = ref('Login'); // Toggle between 'Login' and 'Register'
const user = ref({
  username: '',
  password: '',
  confirmPassword:'',
  email: ''

});

function handleSubmit() {
  // Here you would typically handle the form submission to your backend
  console.log(`Form Type: ${formType.value}`, user.value);
  alert(`Submitted ${formType.value} Form`);
}

function toggleFormType() {
  formType.value = formType.value === 'Login' ? 'Register' : 'Login';
}
</script>