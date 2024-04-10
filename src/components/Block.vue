<template>
  <div class="block">
    click me
  </div>
</template>

<script>
export default {
  props:['delay']
}
</script>

<style>
  .block{
    width: 400px;
    border-radius: 20px;
    background: green;
    color: white;
    text-align: center;
    padding: 100px;
    margin: 40px auto;
  }
</style>