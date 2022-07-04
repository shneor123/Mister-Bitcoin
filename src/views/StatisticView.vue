<template>
  <section class="statistic-page main-layout">
    <Chart
      v-if="marketPrices"
      :chartData="marketPrices"
      chartTitle="Bitcoin market price"
      lineColor="orange"
    />
    <Chart
      v-if="tradeVolume"
      :chartData="tradeVolume"
      chartTitle="Bitcoin trade volume"
      lineColor="rgb(255, 136, 0)"
    />
    <Chart
      v-if="avgBlockSize"
      :chartData="avgBlockSize"
      chartTitle="Average Block Size"
      lineColor="orange"
    />
  </section>
  <Loader v-if="isLoading" />
</template>

<script>
import bitcoinService from "@/services/bitcoin.service.js";
import Chart from "@/components/Chart.vue";
import Loader from "@/components/Loader.vue";

export default {
  data() {
    return {
      tradeVolume: null,
      marketPrices: null,
      avgBlockSize: null,
      isLoading: true
    };
  },
  async created() {
    this.marketPrices = await bitcoinService.getMarketPrice();
    this.tradeVolume = await bitcoinService.getConfirmedTransaction();
    this.avgBlockSize = await bitcoinService.getAvgBlockSize();
    this.isLoading = false
  },
  components: {
    Chart,
    Loader
  },
};
</script>

<style>
</style>