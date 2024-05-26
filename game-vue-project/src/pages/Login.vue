<template>
  <div>
    <h1
      class="mt-8 text-6xl flex justify-center pb-7 font-bold text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">
      Welcome to</h1>
    <h1
      class="mt-1 text-7xl flex justify-center pb-7 font-bold text-center text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out">
      Game Store</h1>
    <div class="flex justify-center md:p-5">
      <div
        class="bg-white-game rounded-lg lg:w-[40%] xs:w-[80%] lg:h-[480px] xs:h-[450px] mt-7 shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover-shadow-purple">
        <form @submit.prevent="handleSubmitAuthentication" class="flex flex-col p-4">
          <h2 class="text-5xl flex justify-center pb-7 font-bold text-gradient-from-fucsia">{{ formType }}</h2>
          <input type="text" v-model="user.username" placeholder="Username" class="mb-5 p-4 rounded-lg outline-none">
          <input :type="showPassword ? 'text' : 'password'" v-model="user.password" placeholder="Password"
            class="mb-1 p-4 rounded-lg outline-none">
          <div class="flex items-center mb-5">
            <input type="checkbox" id="showPassword" v-model="showPassword" class="hidden">
            <label for="showPassword"
              class="ml-2 text-sm cursor-pointer flex items-center text-gradient-from-fucsia hover:-translate-y-1 transition duration-300 ease-in-out mt-1">
              <span
                :class="{ ' bg-gradient-to-r from-fuchsia-900 to-fuchsia-800': showPassword, 'bg-gray-200': !showPassword }"
                class="inline-block w-5 h-5 rounded-full mr-2 border border-gray-300 cursor-pointer"></span>
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
          <div v-if="formType === 'Login'">
            <p class="text-center text-lg text-slate-950">or use a demo account credential</p>
            <p class="text-center text-xl text-gradient-from-fucsia">Username:demo password:Demo1!</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { store } from '@/useStore';
import Swal from 'sweetalert2'

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

// Authentication 
function handleSubmitAuthentication() {
  isLoading.value = true;
  const baseUrl = 'http://localhost:3000';
  const url = `${baseUrl}${formType.value === 'Login' ? '/login' : '/sign_up'}`;

  axios.post(url, user.value)
    .then(response => {
      if (response.data.message === 'Login successful' || response.data.message === 'Signup successful') {
        localStorage.setItem('userId', response.data.userId);
        store.isLoggedIn = true; // Ensure this is reactive

        // Routing after setting modal visibility
        router.push({ name: 'Home' }).catch(err => {
          console.error("Routing error:", err);
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title: formType.value === 'Login' ? "You have successfully logged in." : "Your account has been successfully registered.",
          showConfirmButton: false,
          timer: 3000
        });

      } else {
        toast.warning(response.data.message || 'Invalid login credentials', { timeout: 4000 });
      }
    })
    .catch(error => {
      const errorMessage = error.response?.data || 'An unexpected error occurred';
      toast.warning(errorMessage, { timeout: 4000 });
      console.error('Error submitting form:', errorMessage);
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
