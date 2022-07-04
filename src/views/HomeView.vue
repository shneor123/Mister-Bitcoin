<template>
  <section v-if="user && bitcoinRate" class="home">
    <div class="home-container flex column align-center">
      <h2>
        Welcome to Mister Bitcoin <span>{{ user.name }}</span>
      </h2>
      <p>
        You have <span> ₿ {{ bitcoinRate }}</span>
      </p>
      <p>
        USD:<span> ${{ getUsd }}</span>
      </p>
      <div class="usd-live">
        <h4>Current BTC USD <span class="live-label">live</span></h4>
        <p class="btc-to-usd-balance">${{ getBtcUsd }}</p>
      </div>
    </div>
    <div class="chart-home-page"> 
    <Chart
      v-if="marketPrices"
      :chartData="marketPrices"
      chartTitle="Bitcoin market price"
      lineColor="orange"
    />
    </div>
    <MoveList
      v-if="user.moves.length"
      :title="getTitle"
      :moves="user.moves"
      :fromHomeView="true"
    />
  </section>
</template>

<script>
import bitcoinService from "@/services/bitcoin.service.js";
import SignupView from "@/views/SignupView.vue";
import MoveList from "@/components/MoveList.vue";
import Chart from "@/components/Chart.vue";

export default {
  data() {
    return {
      bitcoinRate: null,
      currCmp: "SignupView",
      marketPrices: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    getUsd() {
      return (this.$store.getters.user.coins / this.bitcoinRate).toLocaleString(
        "en-US"
      );
    },
    bitcoinRate() {
      return this.$store.getters.user.coins.toFixed(3);
    },
    getTitle() {
      const countMoves = this.user.moves.length;
      return `Your last ${countMoves > 3 ? "3" : countMoves} moves:`;
    },
    getBtcUsd() {
      return Math.floor(1 / this.bitcoinRate).toLocaleString("en-US");
    },
  },
  async created() {
    if (this.user)
      this.bitcoinRate = await bitcoinService.getRate(this.user.coins);
    else this.$router.push("/signup");
    this.marketPrices = await bitcoinService.getMarketPrice();
  },
  async beforeUpdate() {
    if (!this.bitcoinRate && this.user)
      this.bitcoinRate = await bitcoinService.getRate(this.user.coins);
  },
  components: {
    SignupView,
    MoveList,
    Chart,
  },
};
</script>

<style>
</style>