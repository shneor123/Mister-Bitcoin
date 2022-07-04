<template>
  <section class="contact-edit">
    <h2>{{ pageTitle }}</h2>
    <form
      v-if="contactToEdit"
      @submit.prevent="save"
      class="flex column align-center"
    >
      <input v-model="contactToEdit.name" type="text" placeholder="Name" />
      <input v-model="contactToEdit.email" type="text" placeholder="Email" />
      <input
        v-model="contactToEdit.phone"
        type="text"
        placeholder="+1 (111) 111-1111"
      />
      <button>Save</button>
      <RouterLink to="/contact">Cancel</RouterLink>
    </form>
  </section>
</template>

<script>
import contactService from "@/services/contact.service.js";

export default {
  data() {
    return {
      contactToEdit: null,
    };
  },
  async created() {
    const { id } = this.$route.params;
    if (id) this.contactToEdit = await contactService.get(id);
    else this.contactToEdit = contactService.getEmptyContact();
  },
  methods: {
    async save() {
      await this.$store.dispatch({
        type: "saveContact",
        contact: this.contactToEdit,
      });
      this.$router.push("/contact");
    },
  },
  computed: {
    pageTitle() {
      const { id } = this.$route.params;
      return id ? "Edit contact" : "Add contact";
    },
  },
};
</script>

<style>
</style>