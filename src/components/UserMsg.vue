<template>
  <Transition name="list">
    <section
      v-if="msg.txt"
      class="user-msg"
      :class="msg.type"
      @mouseover="showBtn = true"
      @mouseleave="showBtn = false"
    >
      <button @click="closeMsg" v-if="showBtn">x</button>
      <p>{{ msg.txt }}</p>
    </section>
  </Transition>
</template>

<script>
import { eventBus } from "@/services/eventBus.service.js";

export default {
  data() {
    return {
      msg: { txt: "" },
      showBtn: false,
      removeEventListener: null,
    };
  },
  created() {
    this.removeEventListener = eventBus.on("show-msg", this.showMsg);
  },
  methods: {
    showMsg(msg) {
      this.msg = msg;
      setTimeout(() => {
        this.msg.txt = "";
      }, 3000);
    },
    closeMsg() {
      clearTimeout(this.timeout);
      this.msg.txt = "";
    },
  },
  destroyed() {
    this.removeEventListener();
  },
};
</script>

<style>
</style>