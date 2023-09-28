<template>
  <div class="cuerpo">
    <Trade />
  </div>
</template>
<script>
// @ is an alias to /src
import Trade from "@/components/Trade.vue";

export default {
  name: "TradeView",
  components: {
    Trade,
  },
};
</script>

<style scoped>
.cuerpo {
  font-family: Arial, sans-serif;
  background-color: #e3e3e3;
  /* background-image: url("../assets/toro-oso.jpeg"); */
  background-size: cover;
  background-repeat: round;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 97.5vh;
  width: auto;
  margin: 0;
}
</style>
