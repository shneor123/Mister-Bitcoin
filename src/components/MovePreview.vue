<template>
  <section class="move-preview">
    <p v-if="fromHomeView">To: {{ move.to }}</p>
    <p>At: {{ displayTime }}</p>
    <p>Amount: {{ move.amount }} coins</p>
  </section>
</template>

<script>
export default {
  props: {
    move: Object,
    fromHomeView: Boolean,
  },
  computed: {
    displayTime() {
      return (
        new Date(this.move.at).toDateString(),
        new Date(this.move.at).toLocaleString()
      );
    },
  },
};
</script>

<style>
</style>