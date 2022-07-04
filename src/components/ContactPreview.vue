<template>
  <section class="contact-preview flex justify-center">
    <div class="contact-img"><img :src="contact.imgUrl" /></div>
    <div class="contact-info flex column justify-center">
      <p>{{ contact.name }}</p>
      <p>{{ contact.phone }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    contact: Object,
  },
};
</script>

<style>
</style>