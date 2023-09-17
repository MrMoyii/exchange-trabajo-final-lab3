<template>
  <div class="cuerpo">
    <Movimientos></Movimientos>
  </div>
</template>

<script>
import Movimientos from "@/components/Movimientos.vue";

export default {
  name: "MovimientosView",
  components: {
    Movimientos,
  },
};
</script>

<style scoped>
.cuerpo {
  font-family: Arial, sans-serif;
  background-color: #e3e3e3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 97.5vh;
  margin: 0;
}
</style>
