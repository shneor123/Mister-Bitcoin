<template>
  <section class="contact-list">
    <TransitionGroup name="list">
      <div
        v-for="contact in contacts"
        :key="contact._id"
        class="contact-preview-container flex justify-center align-center"
      >
        <RouterLink :to="`/contact/${contact._id}`" class="clean-link">
          <ContactPreview :contact="contact" />
        </RouterLink>
        <button class="remove-btn" @click="remove(contact._id)">Remove</button>
      </div>
    </TransitionGroup>
  </section>
</template>

<script>
import ContactPreview from "@/components/ContactPreview.vue";
export default {
  props: {
    contacts: Array,
  },
  components: {
    ContactPreview,
  },
  methods: {
    remove(id) {
      this.$emit("remove", id);
    },
  },
};
</script>

<style>
</style>