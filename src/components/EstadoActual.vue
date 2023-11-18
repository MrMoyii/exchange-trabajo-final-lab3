<template>
  <!-- pantalla cargando -->
  <div v-if="datosHistorial == null">
    <Loader></Loader>
  </div>
  <!-- pantalla historial vacio -->
  <div v-if="estaHistorialVacio">
    <h4>Historial Vacio</h4>
  </div>
  <!-- pantalla historial -->
  <div
    class="containerHistorial bounceAnimation"
    v-else-if="datosHistorial && !cargando"
  >
    <table class="tftable">
      <tr>
        <th>Moneda</th>
        <th>Cantidad</th>
        <th>Dinero</th>
      </tr>
      <tr v-for="transaccion in cartera" :key="transaccion.id">
        <td>{{ transaccion.simbolo }}</td>
        <td>
          {{ transaccion.monto }}
        </td>
        <td>$ {{ transaccion.montoEnDinero }}</td>
      </tr>
      <tr>
        <td>Total</td>
        <td></td>
        <!-- calcular la suma de todas las criptos-->
        <td>$ {{ calcularSumaTotal() }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import Loader from "@/components/Loader.vue";
import { mapGetters } from "vuex";
export default {
  name: "EstadoActualComponent",
  data() {
    return {
      datosHistorial: null,
      estaHistorialVacio: false,
      cartera: [
        { id: 0, simbolo: "BTC", monto: 0, montoEnDinero: 0, },
        { id: 1, simbolo: "DAI", monto: 0, montoEnDinero: 0, },
        { id: 3, simbolo: "ETH", monto: 0, montoEnDinero: 0, },
        { id: 4, simbolo: "USDT", monto: 0, montoEnDinero: 0, },
      ],
      cargando: true,
    };
  },
  components: {
    Loader,
  },
  mounted() {
    if (this.$store.state.username == "") {
      this.$router.push("/");
    } else {
      this.ObtenerHistorial();
      
    }
  },
  computed: {
    ...mapGetters(["getHistorial"]),
  },
  methods: {
    CargarMontos(){
      this.datosHistorial.forEach(transaccion => {
        this.cartera.find(i => i.simbolo === transaccion.crypto_code).monto += transaccion.crypto_amount;
      });
    },
    CargarMontoEnDinero() {
      this.cartera.forEach(e => {
        axios.get(`https://criptoya.com/api/argenbtc/${e.simbolo}/ars`)
          .then(response => {
            let precio = response.data.totalAsk;
            // console.log((precio * e.monto).toFixed(2))
            e.montoEnDinero = (precio * e.monto).toFixed(2);
          })
          .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
      });
    },
    ObtenerHistorial() {
      this.datosHistorial = null;
      this.estaHistorialVacio = false;
      this.$store.dispatch("ObtenerHistorial")
      .then(() => {
        if(this.getHistorial.length < 1)
          this.estaHistorialVacio = true;

        this.datosHistorial = this.getHistorial;
        this.CargarMontos();
        this.CargarMontoEnDinero();
        this.calcularSumaTotal();
      });
    },
    calcularSumaTotal() {
      let sumaTotal = 0;

      for (let i = 0; i < this.cartera.length; i++) {
        sumaTotal += parseFloat(this.cartera[i].montoEnDinero);
      }
      this.cargando = false;
      return sumaTotal;
    }
  }
}
</script>

<style scoped>
.containerHistorial {
  min-width: 800px;
  min-height: 85px;
  max-height: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
  display: flex;
  justify-content: center;
}
.tftable {
  font-size:12px;
  color:#333333;
  width:100%;
  border-width: 1px;
  border-color: #729ea5;
  border-collapse: collapse;
}
.tftable th {
  font-size:14px;
  background-color:#acc8cc;
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #59a9ff;
  text-align:center;
}
.tftable tr {
  background-color:#d4e3e5;
}
.tftable td {
  font-size:14px;
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #fff;
}
.tftable tr:hover {
  background-color:#ffffff;
}
</style>