<template>
  <form @submit.prevent="onSubmit">
    <div class="container">
      <h2>Seleccionar Compra o Venta</h2>
      <div class="select-wrapper">
        <select id="compra_venta" v-model="compra_vent">
          <option value="" disabled selected>Elige una opción</option>
          <option>Compra</option>
          <option>Venta</option>
        </select>
        <div class="arrow">▼</div>
      </div>
      <div v-if="compra_vent">
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
          step="0.01"
          name="numeroDecimal"
          id="numeroDecimal"
          placeholder="Ingresar monto"
          v-model.number="cantidad_Compra_O_Venta"
        />
      </div>
      <div v-if="montoPermitido">
        {{ mandar }}
        <br />
        <DatosCompraVenta></DatosCompraVenta>
      </div>
      <div v-if="montoPermitido">
        <br />
        <input
          class="btn"
          type="submit"
          :value="btnValue"
          @click="SolicitarOperacion"
          onsubmit="return false"
        />
      </div>
    </div>
  </form>
</template>

<script>
/* eslint-disable */
import DatosCompraVenta from "@/components/DatosCompra_Venta.vue";
import { mapGetters } from "vuex";

export default {
  name: "NuevaCompra-Venta",
  data() {
    return {
      compra_vent: "",
      coin: "",
      cantidad_Compra_O_Venta: null,
      purchaseORSale: "",
    };
  },
  components: {
    DatosCompraVenta,
  },
  computed: {
    ...mapGetters("criptoYa", ["getCoin", "getPrecio", "getMonto", "getMontoAPagar_Vender", "getFecha"]),
    montoPermitido() {
      return this.cantidad_Compra_O_Venta > 0;
    },
    btnValue() {
      return "Efectuar " + this.compra_vent;
    },
    mandar() {
      //guardo en el state de criptoYA la coin seleccionada y el monto
      //porque no podia pasarla por parametros nc why
      this.$store.commit('criptoYa/SetCoin', this.coin);
      this.$store.commit('criptoYa/SetMontoIgresado', this.cantidad_Compra_O_Venta);
      return "";
    },
    compraOVenta(){
      this.purchaseORSale = this.compra_vent == "Compra" ? "purchase" : "sale";
    }
  },
  methods: {
    SolicitarOperacion() {
      const requestBody = {
        user_id: this.$store.username,
        action: this.purchaseORSale,
        crypto_code: this.getCoin,
        crypto_amount: this.getMonto,
        money: this.getMontoAPagar_Vender,
        datetime: this.getFecha,
      };

      console.log(requestBody);

      // Llama a la acción de Vuex para enviar la solicitud POST
      // this.$store.dispatch('crypto/enviarDatos', requestBody)
      //   .then(() => {
      //     // Realiza acciones adicionales después de enviar la solicitud
      //   })
      //   .catch((error) => {
      //     console.error('Error al enviar la solicitud POST:', error);
      //   });
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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
</style>
