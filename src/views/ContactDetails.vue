<template>
  <section
    v-if="contact"
    class="contact-details flex column justify-center align-center"
  >
    <div class="contact-actions flex">
      <RouterLink to="/contact" class="clean-link">Back</RouterLink>
      <RouterLink :to="`/contact/edit/${contact._id}`" class="clean-link"
        >Edit</RouterLink
      >
    </div>
    <div class="contact-img"><img :src="contact.imgUrl" /></div>
    <p>{{ contact.name }}</p>
    <p>{{ contact.phone }}</p>
    <p>{{ contact.email }}</p>
    <TransferFund :contact="contact" @transfer-coins="transferCoins" />
    <MoveList :title="getTitle" :moves="getMoves" :fromHomeView="false" />
  </section>
</template>

<script>
import contactService from "@/services/contact.service.js";
import TransferFund from "@/components/TransferFund.vue";
import MoveList from "@/components/MoveList.vue";

export default {
  data() {
    return {
      contact: null,
    };
  },
  components: {
    TransferFund,
    MoveList,
  },
  async created() {
    const { id } = this.$route.params;
    this.contact = await contactService.get(id);
  },
  methods: {
    async transferCoins(amount) {
      try {
        await this.$store.dispatch({
          type: "addMove",
          contact: this.contact,
          amount,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    getMoves() {
      return this.user.moves.filter((move) => move.to === this.contact.name);
    },
    getTitle() {
      const moves = this.getMoves;
      return moves.length ? "Your moves:" : "";
    },
  },
};
</script>

<style>
</style>