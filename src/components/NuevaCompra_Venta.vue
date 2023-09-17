<template>
  <Loader v-if="componenteCarga"></Loader>
  <form v-else @submit.prevent="SolicitarOperacion">
    <div class="container">
      <h2>Seleccionar Compra o Venta</h2>
      <div class="select-wrapper">
        <select id="acciona" v-model="accion">
          <option value="" disabled selected>Elige una opción</option>
          <option>Compra</option>
          <option>Venta</option>
        </select>
        <div class="arrow">▼</div>
      </div>
      <div v-if="accion">
        {{ compraOVenta }}
        <br />
        <div class="select-wrapper">
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
      <div v-if="coin">
        <br />
        <input
          type="number"
          min="0"
          step="any"
          name="numeroDecimal"
          id="numeroDecimal"
          placeholder="Ingresar monto"
          v-model.number="cantidad_Compra_O_Venta"
        />
      </div>
      <div
        class="centrar"
        v-if="!this.$store.state.cargaCompleta && montoPermitido"
      >
        <Loader></Loader>
      </div>
      <div v-if="montoPermitido">
        {{ mandarCoinYCantidad }}
        <br />
        <DatosCompraVenta></DatosCompraVenta>
      </div>
      <div v-show="this.error && this.accion == 'Venta'">
        <br />
        <p class="error">
          No cuenta con fondos suficientes para efectuar la venta
        </p>
      </div>
      <div v-if="this.$store.state.cargaCompleta">
        <div v-if="montoPermitido && this.accion == 'Compra'">
          <br />
          <input class="btn" type="submit" :value="btnValue" />
        </div>
        <div v-if="montoPermitido && montoVentaValido">
          <br />
          <input class="btn" type="submit" :value="btnValue" />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
/* eslint-disable */
import DatosCompraVenta from "@/components/DatosCompra_Venta.vue";
import Loader from "@/components/Loader.vue";
import { mapGetters } from "vuex";
import swal from 'sweetalert';

export default {
  name: "NuevaCompra-Venta",
  data() {
    return {
      accion: "",
      coin: "",
      cantidad_Compra_O_Venta: null,
      purchaseORSale: "",
      componenteCarga: false,
      error: false,
    };
  },
  components: {
    DatosCompraVenta,
    Loader,
  },
  computed: {
    ...mapGetters("criptoYa", ["getCoin", "getPrecio", "getMonto", "getMontoAPagar_Vender", "getFecha"]),
    montoPermitido() {
      return this.cantidad_Compra_O_Venta > 0;
    },
    montoVentaValido() {
      if(this.accion == "Venta"){
        //consulto en la cartera
        let cartera = this.$store.state.cartera;
        //busco en la cartera si se escunetra un objeto que coincida con la coin seleccionada
        let coinEncontrada = cartera.find(x => x.symbol === this.coin);
        //si la cantidad ingresada no es mayor a la guardada se puede comprar
        if(coinEncontrada.amount >= this.cantidad_Compra_O_Venta) {
          this.error = false;
          return true;
        }
        else {
          this.error = true;
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
      this.$store.commit('criptoYa/SetMontoIgresado', this.cantidad_Compra_O_Venta);
      return "";
    },
    compraOVenta(){
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
          swal("Transacción exitosa",{icon: "success", buttons: false,});
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

.select-wrapper {
  display: inline-block;
  position: relative;
}

select {
  appearance: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  font-size: 16px;
  width: 200px;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: #007bff;
}

.arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
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
