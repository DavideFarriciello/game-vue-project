<template>
  <div>
    <h1
      class="mt-8 text-7xl flex justify-center pb-7 font-bold text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">
      Welcome</h1>
    <div class="flex justify-center md:p-5">
      <div
        class="bg-white-game rounded-lg lg:w-[40%] xs:w-[80%] lg:h-[480px] xs:h-[450px] mt-7 shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover-shadow-red">

        <form @submit.prevent="handleSubmit" class="flex flex-col p-4">
          <h2 class="text-5xl flex justify-center pb-7 font-bold text-gradient-from-fucsia">{{ formType }}</h2>


          <input type="text" v-model="user.username" placeholder="Username" class="mb-5 p-4 rounded-lg outline-none">


          <input :type="showPassword ? 'text' : 'password'" v-model="user.password" placeholder="Password" class="mb-1 p-4 rounded-lg outline-none">
          <div class="flex items-center mb-5">
            <input type="checkbox" id="showPassword" v-model="showPassword" class="hidden">
            <label for="showPassword" class="ml-2 text-sm cursor-pointer flex items-center text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out mt-1">
              <span :class="{' bg-gradient-to-r from-fuchsia-900 to-fuchsia-800': showPassword, 'bg-gray-200': !showPassword}" class="inline-block w-5 h-5 rounded-full mr-2 border border-gray-300 cursor-pointer"></span>
              Show password
            </label>
          </div>

          <div v-if="formType === 'Register'">
            <input type="email" v-model="user.email" placeholder="Email"
              class="mb-3 p-4 rounded-lg w-full outline-none">
          </div>


          <button type="submit"
            class="bg-gradient-to-r from-fuchsia-900 to-slate-950 text-white font-bold text-xl w-full py-2 ml-2 mt-3 mb-3 rounded-3xl shadow hover:bg-fuchsia-900 hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out">
            {{ formType }}
          </button>


          <p class="text-center mt-1">
            <span @click="toggleFormType"
              class="text-xl text-gradient-from-fucsia hover:-translate-y-1  cursor-pointer">
              {{ formType === 'Login' ? 'No account? Register' : 'Have an account? Login' }}
            </span>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { store } from '../useStore.js';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const formType = ref('Login');
const user = ref({
  username: '',
  password: '',
  email: ''
});

const showPassword = ref(false);
const isLoading = ref(false);

function handleSubmit() {
  isLoading.value = true;
  const baseUrl = 'http://localhost:3000';
  const url = `${baseUrl}${formType.value === 'Login' ? '/login' : '/sign_up'}`;

axios.post(url, user.value)
    .then(response => {
      console.log(response);
      // Handle response based on the actual JSON data sent from the server
      if (response.data.message === 'Login successful' || response.data.message === 'Signup successful') {
        // Store userId in the client for future use if needed
        localStorage.setItem('userId', response.data.userId); // Save userId to localStorage
        store.isLoggedIn = true;
        router.push({ name: 'Home' });
        if (formType.value === 'Register') {
          alert('Your account has been successfully registered.');
        }
      } else {
        toast.warning(response.data.message || 'Invalid login credentials', { timeout: 4000 });
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      toast.warning(`${error.response?.data || 'An unexpected error occurred'}`, { timeout: 4000 });
    })
    .finally(() => {
      isLoading.value = false;
    });

    // login.vue script
// After successful login
axios.post(url, user.value)
    .then(response => {
      console.log(response);
      if (response.data.message === 'Login successful') {
        localStorage.setItem('userId', response.data.userId);
        store.isLoggedIn = true;
        store.showLoginSuccessModal = true; // Set a flag in the store
        router.push({ name: 'Home' });
      } else {
        toast.warning(response.data.message || 'Invalid login credentials', { timeout: 4000 });
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      toast.warning(`${error.response?.data || 'An unexpected error occurred'}`, { timeout: 4000 });
    })
    .finally(() => {
      isLoading.value = false;
    });

}

function toggleFormType() {
  formType.value = formType.value === 'Login' ? 'Register' : 'Login';
  user.value = { username: '', password: '', email: '' };
}


</script>
