<template>
  <Loader v-if="componenteCarga"></Loader>
  <form v-else @submit.prevent="SolicitarOperacion">
    <div class="container">
      <!-- accion a realizar -->
      <h2>Seleccionar Compra o Venta</h2>
      <div class="select-wrapper bounceAnimation">
        <select id="acciona" v-model="accion">
          <option value="" disabled selected>Elige una opción</option>
          <option>Compra</option>
          <option>Venta</option>
        </select>
        <div class="arrow">▼</div>
      </div>
      <!-- seleccion de coin a comprar o vender -->
      <div v-if="accion">
        {{ guardarAccionSeleccionada }}
        <br />
        <div class="select-wrapper bounceAnimation">
          <select id="coin" v-model="coin">
            <option value="" disabled selected>Elige una cripto</option>
            <option>BTC</option>
            <option>DAI</option>
            <option>ETH</option>
            <option>USDT</option>
          </select>
          <div class="arrow">▼</div>
        </div>
      </div>
      <!-- monto a ingresar -->
      <div v-if="coin" class="bounceAnimation">
        <br />
        <input
          type="number"
          min="0"
          step="any"
          name="numeroDecimal"
          id="numeroDecimal"
          placeholder="Ingresar monto"
          v-model.number="montoIngresado"
        />
      </div>
      <!-- muestra el componente Loader mientras carga el resumen -->
      <div
        class="centrar"
        v-if="!this.$store.state.cargaCompleta && esMontoPermitido"
      >
        <Loader></Loader>
      </div>
      <!-- muertra el resumen de la accion a realizar -->
      <div v-if="esMontoPermitido" class="bounceAnimation">
        {{ mandarCoinYCantidad }}
        <br />
        <Resumen></Resumen>
      </div>
      <!-- mensaje de error -->
      <div v-show="this.errorVenta && this.accion == 'Venta'">
        <br />
        <p class="error">
          No cuenta con fondos suficientes para efectuar la venta
        </p>
      </div>
      <!-- botones -->
      <div v-if="this.$store.state.cargaCompleta" class="bounceAnimation">
        <div v-if="esMontoPermitido && this.accion == 'Compra'">
          <br />
          <input class="btn" type="submit" :value="btnValue" />
        </div>
        <div v-if="esMontoPermitido && esMontoVentaValido">
          <br />
          <input class="btn" type="submit" :value="btnValue" />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
/* eslint-disable */
import Resumen from "@/components/ResumenTrade.vue";
import Loader from "@/components/Loader.vue";
import { mapGetters } from "vuex";
import Swal from 'sweetalert2';

export default {
  name: "TradeComponent",
  data() {
    return {
      accion: "",
      coin: "",
      montoIngresado: null,
      purchaseORSale: "",
      componenteCarga: false,
      errorVenta: false,
    };
  },
  components: {
    Resumen,
    Loader,
  },
  mounted() {
    if(this.$store.state.username == ""){
      this.$router.push("/")
    }
    else this.$store.dispatch("ObtenerHistorial");
  },
  computed: {
    ...mapGetters(["getHistorial"]),
    ...mapGetters("criptoYa", ["getCoin", "getPrecio", "getMonto", "getMontoAPagar_Vender", "getFecha"]),
    
    esMontoPermitido() {
      return this.montoIngresado > 0;
    },
    esMontoVentaValido() {
      if(this.accion == "Venta"){
        //consulto el historial
        let historial = this.getHistorial;
        //busco si se escunetra un objeto que coincida con la coin seleccionada
        let coinEncontrada = historial.find(x => x.crypto_code == this.coin);
        //si la cantidad ingresada no es mayor a la guardada se puede vender
        if(coinEncontrada.crypto_amount >= this.montoIngresado) {
          this.errorVenta = false;
          return true;
        }
        else {
          this.errorVenta = true;
          return false;
        }
      }
    },
    btnValue() {
      return "Efectuar " + this.accion;
    },
    mandarCoinYCantidad() {
      //guardo en el state de criptoYA la coin seleccionada y el monto
      //porque no podia pasarla por parametros nc why
      this.$store.commit('criptoYa/SetCoin', this.coin);
      this.$store.commit('criptoYa/SetMontoIgresado', this.montoIngresado);
    },
    guardarAccionSeleccionada(){
      this.purchaseORSale = this.accion == "Compra" ? "purchase" : "sale";
    }
  },
  methods: {
    SolicitarOperacion() {
      const requestBody = {
        user_id: this.$store.state.username,
        action: this.purchaseORSale,
        crypto_code: this.getCoin,
        crypto_amount: this.getMonto,
        money: this.getMontoAPagar_Vender,
        datetime: this.getFecha,
      };
      
      this.componenteCarga = true;
      // Llama a la acción de Vuex para enviar la solicitud POST
      this.$store.dispatch('PostDatos', requestBody)
        .then(() => {
          this.componenteCarga = false;
          Swal.fire({
            icon: 'success',
            title: 'Transacción exitosa',
            showConfirmButton: false,
            timer: 1500
          })
        });
    },
  },
};
</script>

<style scoped>
.centrar {
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 20px;
  height: 120px;
}

.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
}

#numeroDecimal {
  appearance: none;
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  font-size: 16px;
  width: 185px;
  height: 25px;
  cursor: pointer;
}

.btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.btn:hover {
  background-color: #0056b3;
}

.error {
  color: #d02323;
  max-width: 322px;
}
</style>
