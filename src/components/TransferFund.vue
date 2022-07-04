<template>
  <section class="transfer-fund flex column">
    <h3>Transfer coins to {{ contact.name }}</h3>
    <form @submit.prevent="transfer" class="flex ">
        <input v-model.number="amount" type="number" />
        <button>Transfer</button>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    contact: Object,
  },
  data() {
    return {
      amount: null,
    }
  },
  methods: {
      transfer() {
          this.$emit('transfer-coins', this.amount)
      }
  }
};
</script>

<style>
</style>