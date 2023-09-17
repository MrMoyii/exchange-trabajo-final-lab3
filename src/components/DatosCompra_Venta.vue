<template>
  {{ refrescar }}
  <div class="borde" v-if="this.$store.state.cargaCompleta">
    <h3>Datos de la acción</h3>
    <p>{{ infoAccion + calcularPrecio }}</p>
    <p>{{ fechaActual }}</p>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
import obtenerFechaActual from "@/services/obtenerFechaActual.js";

export default {
  name: "DatosCompraVenta",
  data() {
    return {
      monto: null,
      precio: null,
      fecha: "",
    };
  },
  methods: {
    ...mapActions("criptoYa", ["consultarAPI"]),
  },
  computed: {
    //llamo a los getter para tener acceso a los datos de la store de criptoYa
    ...mapGetters("criptoYa", ["getCoin", "getPrecio", "getMonto"]),

    //Podria poner un mounted, pero solo traeria el precio de la coin al principio.
    //Con la computed consulto a la api cada vez que cambie algo
    //como por ejemplo una moneda y esta vuelve a ejecutar el codigo que esta dentro.
    refrescar(){
      //le paso por parametro el coin del state de criptoYa
      this.$store.state.cargaCompleta = false;
      this.consultarAPI().then(() => {
        this.$store.state.cargaCompleta = true;
      });
      this.monto = this.getMonto;
    },
    fechaActual() {
      this.fecha = obtenerFechaActual();

      //guardo en vuex la fecha para luego obtenerla y hacer el post
      this.$store.commit('criptoYa/SetFecha', this.fecha);

      return this.fecha;
    },
    infoAccion() {
      return `${this.monto} ${this.getCoin} = `;
    },
    calcularPrecio() {
      this.precio = (this.getPrecio.totalAsk * this.monto).toFixed(2);

      this.$store.commit('criptoYa/SetMontoAPagar_Vender', this.precio);

      return `$${this.precio} ARS`;
    },
  }
}
</script>

<style>
.borde{
  border: 1px solid #007bff5c;
  border-radius: 15px;
  min-width: 200px;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.2);
}
</style>