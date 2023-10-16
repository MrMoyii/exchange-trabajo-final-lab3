<template>
  <div class="cuerpo">
    <EstadoActual></EstadoActual>
  </div>
</template>

<script>
import EstadoActual from "@/components/EstadoActual.vue";

export default {
  name: "MovimientosView",
  components: {
    EstadoActual,
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
