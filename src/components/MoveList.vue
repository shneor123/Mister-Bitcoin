<template>
  <section class="move-list">
    <h3>{{ title }}</h3>
    <template class="move-preview-container flex column">
      <div v-for="(move, idx) in moves" :key="idx">
        <MovePreview :move="move" :fromHomeView="fromHomeView" />
      </div>
    </template>
  </section>
</template>

<script>
import MovePreview from "@/components/MovePreview.vue";

export default {
  props: {
    title: String,
    moves: Array,
    fromHomeView: Boolean
  },
  components: {
    MovePreview,
  },
};
</script>

<style>
</style>