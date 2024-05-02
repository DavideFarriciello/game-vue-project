<template>
  <div id="app">
    <Header v-if="store.isLoggedIn"></Header>
    <Login v-if="!store.isLoggedIn"></Login>
  </div>
</template>

<script setup>
import Header from './component/Header.vue';
import { store } from './useStore.js';
import Login from './pages/Login.vue';


defineExpose({
  store
});
</script>
