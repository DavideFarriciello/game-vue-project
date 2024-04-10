<template>
  <p>Reaction time: {{ score }} ms </p>
  <p> {{ rank }}</p>
</template>

<script>
export default {
props : ['score'],
data() {
  return {
    rank:null
  }
},
  mounted() {
    if (this.score < 250){
      this.rank = 'bravo ricchio'
    } else if (this.score < 400){
      this.rank = 'ricchio'
    } else {
      this.rank = 'ricchioooon'
    }
  },
}
</script>

<style>

</style>