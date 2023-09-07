<template>
  <div class="borde">
    {{ accionesIniciales }}
    <h3>Datos de la acción</h3>
    <p>{{ infoAccion + calcularPrecio }}</p>
    <p>{{ FechaActual }}</p>
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

    accionesIniciales(){
      this.consultarAPI(this.getCoin);//le paso por parametro el coin del state de criptoYa
      this.monto = this.getMonto;
    },
    FechaActual() {
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