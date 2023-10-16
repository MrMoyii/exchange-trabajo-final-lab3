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
  <div class="containerHistorial bounceAnimation" v-else-if="datosHistorial">
    <table class="tftable">
      <tr>
        <th>Moneda</th>
        <th>Cantidad</th>
        <th>Dinero</th>
      </tr>
      <tr v-for="transaccion in datosHistorial" :key="transaccion.id">
        <td>{{ transaccion.key }}</td>
        <td>
          {{ ObtenerCantidadCoin(transaccion.key) }}
        </td>
        <td>$ {{ CalcularValor(transaccion) }}</td>
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
import Loader from "@/components/Loader.vue";
import { mapGetters } from "vuex";
export default {
  name: "EstadoActualComponent",
  data() {
    return {
      datosHistorial: null,
      estaHistorialVacio: false,
    };
  },
  components: {
    Loader,
  },
  mounted() {
    if (this.$store.state.username == "") {
      this.$router.push("/");
    } else this.ObtenerHistorial();
  },
  computed: {
    ...mapGetters(["getHistorial"]),
  },
  methods: {
    ObtenerHistorial() {
      this.datosHistorial = null;
      this.estaHistorialVacio = false;
      this.$store.dispatch("ObtenerHistorial")
      .then(() => {
        if(this.getHistorial.length < 1)
          this.estaHistorialVacio = true;
        //ordeno por coin
        let coinsObj = Object.groupBy(this.getHistorial, (coin) => {
          return coin.crypto_code;
        });
        this.datosHistorial = coinsObj;
      });
    },
    ObtenerCantidadCoin(nombreCoin) {
      console.log(this.datosHistorial);
      console.log(nombreCoin);

      let sumaCoin = 0;
      let historial = this.datosHistorial;

      for (let i = 0; i < historial[nombreCoin].length; i++) {
        sumaCoin += historial[nombreCoin].crypto_amount;
      }
      return sumaCoin;
    },
    CalcularValor(coinElegida) {
      let sumaCoin = 0;
      let historial = this.datosHistorial;

      for (let i = 0; i < historial[coinElegida].length; i++) {
        if(historial[coinElegida].action == "purchase")
          sumaCoin += historial[coinElegida].money;
        if(historial[coinElegida].action == "sale")
          sumaCoin -= historial[coinElegida].money;
      }
      return sumaCoin;
    },
    calcularSumaTotal() {
      let historial = this.getHistorial;

      let sumaTotal = 0;
      for (let i = 0; i < historial.length; i++) {
        sumaTotal += historial[i].money; 
      }
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