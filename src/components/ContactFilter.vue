<template>
  <section class="contact-filter flex justify-center main-container full">
    <input
      type="text"
      placeholder="Search contact by name..."
      v-model="filterBy.name"
      @input="setFilter"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        name: "",
      },
    };
  },
  methods: {
    setFilter() {
      this.$emit("set-filter", this.filterBy);
    },
  },
};
</script>

<style>
</style>