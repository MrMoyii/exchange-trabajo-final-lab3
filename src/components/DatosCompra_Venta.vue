<template>
  <div class="borde">
    <h3>Datos de la acción</h3>
    <p>{{ obtenerFechaActual }}</p>
    <p>'precioCoin' 'coin' = $'precio' ARS</p>
    <input
      class="btn"
      type="submit"
      value="consultar"
      @click="calcularPrecio"
      onsubmit="return false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
/* eslint-disable */
export default {
  name: "DatosCompraVenta",
  data() {
    return {
      //recibir a travez de criptoYaAPi los valores de las cripto
      datosCriptoYa: null,
    };
  },
  methods: {
    ...mapActions("criptoYa", ["consultarAPI"]),
    calcularPrecio() {
      console.log(this.datosAPI)
      console.log(this.getCoin)
    },
  },
  computed: {
    ...mapGetters("criptoYa", ["getCoin"]), //llamo al getter para tener acceso al coin seleccionado
    ...mapGetters("criptoYa", ["datosAPI"]),
    obtenerFechaActual() {
      //
      this.consultarAPI(this.getCoin);//le paso por parametro el coin del state de criptoYa

      var fechaActual = new Date();
      var dia = fechaActual.getDate();
      // obtengo el mes actual (0-11, donde 0 es enero y 11 es diciembre)
      var mes = fechaActual.getMonth() + 1; // Sumamos 1 para obtener el mes correcto
      var año = fechaActual.getFullYear();
      var hora = fechaActual.getHours();
      var minutos = fechaActual.getMinutes();

      return dia + '/' + mes + '/' + año + ' ' + hora + ':' + minutos;
      //ejemplo, "02/09/2023 15:30"
    }
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