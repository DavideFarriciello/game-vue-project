<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div class="bg-white rounded-lg shadow-xl p-6 w-[400px] h-[200px] transition-opacity duration-300">
        <p class="text-xl font-semibold text-gray-900 ml-5">You have successfully logged in!</p>
        <i class="pi pi-check-circle text-7xl text-fuchsia-900 flex ml-32 mt-9"></i>
      </div>
    </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import { store } from '../useStore.js';

const isVisible = ref(false);

// Automatically close the modal 2 seconds after it becomes visible
watch(() => store.showLoginSuccessModal, (newVal) => {
  isVisible.value = newVal;
  if (newVal) {
    setTimeout(() => {
      closeModal();
    }, 2000); // 2000 milliseconds = 2 seconds
  }
});

function closeModal() {
  isVisible.value = false;
  store.showLoginSuccessModal = false; // Reset the global state
}
</script>

<style scoped>
/* Transition for the modal background */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s ease;
}
.modal-enter, .modal-leave-to /* Starting and ending state for the fade */ {
  opacity: 0;
}
</style>


