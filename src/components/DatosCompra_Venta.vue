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
      //recibir a travez de criptoYaAPi los valores de las cripto
      datosCriptoYa: null,
      monto: null,
    };
  },
  methods: {
    ...mapActions("criptoYa", ["consultarAPI"]),
  },
  computed: {
    //llamo a los getter para tener acceso a los datos de la store de criptoYa
    ...mapGetters("criptoYa", ["getCoin", "datosAPI", "getMonto"]),

    accionesIniciales(){
      this.consultarAPI(this.getCoin);//le paso por parametro el coin del state de criptoYa
      this.monto = this.getMonto;
    },
    FechaActual() {
      return obtenerFechaActual();
    },
    infoAccion() {
      return `${this.monto} ${this.getCoin} = `;
    },
    calcularPrecio() {
      let precio = (this.datosAPI.totalAsk * this.monto).toFixed(2);
      return `$${precio} ARS`;
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