<template>
  <div class="cuerpo">
    <NuevaCompra_Venta />
  </div>
</template>
<script>
// @ is an alias to /src
import NuevaCompra_Venta from "@/components/NuevaCompra_Venta.vue";

export default {
  name: "Compra_VentaView",
  components: {
    NuevaCompra_Venta,
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
