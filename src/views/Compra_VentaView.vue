<template>
  <div class="home">
    <Compra_Venta />
  </div>
</template>
<script>
// @ is an alias to /src
import Compra_Venta from "@/components/NuevaCompra_Venta.vue";

export default {
  name: "Compra_VentaView",
  components: {
    Compra_Venta,
  },
};
</script>
