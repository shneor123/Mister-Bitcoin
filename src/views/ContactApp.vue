<template>
  <section class="contact-app main-container full">
    <div class="full">
      <ContactFilter @set-filter="setFilter" />
      <RouterLink to="/contact/edit" class="clean-link">
        <div class="plus flex justify-center align-center">+</div>
      </RouterLink>
      <ContactList :contacts="contactsToShow" @remove="removeContact" />
    </div>
  </section>
</template>

<script>
import { eventBus } from "../services/eventBus.service.js";
import ContactList from "@/components/ContactList.vue";
import ContactFilter from "@/components/ContactFilter.vue";

export default {
  components: {
    ContactFilter,
    ContactList,
  },
  data() {
    return {
      filterBy: null,
    };
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    async removeContact(id) {
      try {
        await this.$store.dispatch({ type: "removeContact", id });
        eventBus.emit("show-msg", {
          type: "success",
          txt: "✔️ Removed successfully",
        });
      } catch (err) {
        console.log("err", err);
        eventBus.emit("show-msg", {
          type: "error",
          txt: "Error. Please try again later",
        })
      }
    },
  },
  computed: {
    contacts() {
      return this.$store.getters.contacts;
    },
    contactsToShow() {
      if (!this.filterBy) return this.contacts;
      const regex = new RegExp(this.filterBy.name, "i");
      return this.contacts.filter((contacts) => regex.test(contacts.name))
    },
  },
}
</script>

<style>
</style>