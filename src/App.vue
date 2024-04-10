<template>
  <h1>{{ title }}</h1>
  <p>Welcome...</p>
  <teleport to="#modals" v-if="showModal">
    <Modal theme="sale" @close="toggleModal">
      <template v-slot:links>
        <a href="#">sign up</a>
        <a href="#">more info</a>
      </template>
      <h1>nija</h1>
      <p>take thi shit</p>
    </Modal>
  </teleport>
  <div v-if="showModalTwo">
    <teleport to="#modals" theme="sale" @close="toggleModalTwo">
      <template v-slot:links>
        <a href="#">disc</a>
        <a href="#">shit</a>
      </template>
      <h1>aglia</h1>
      <p>nn farlo</p>
    </teleport>
  </div>
  <button @click="toggleModal">Open Modal</button>
  <button @click="toggleModalTwo">Open Second Modal</button>
</template>

<script>
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: { Modal },
  data() {
    return {
      title: 'my first vue app',
      showModal: false,
      showModalTwo: false,
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
    toggleModalTwo() {
      this.showModalTwo = !this.showModalTwo
    }
  }
}
</script>

<style>
#app,
#modals {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  border-bottom: 1px solid #ddd;
  display: inline-block;
  padding-bottom: 10px;
}
</style>
