<template>
  <form @submit.prevent="onSubmit">
    <div class="cuerpo">
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
        <div>
          <br v-if="compra_vent" />
          <div class="select-wrapper" v-if="compra_vent">
            <select id="coin" v-model="coin">
              <option value="" disabled selected>Elige una cripto</option>
              <option>BTC</option>
              <option>DAI</option>
              <option>ETH</option>
              <option>BUSD</option>
            </select>
            <div class="arrow">▼</div>
          </div>
        </div>
        <div>
          <br v-if="coin" />
          <div v-if="coin">
            <input
              type="number"
              step="any"
              name="numeroDecimal"
              id="numeroDecimal"
              placeholder="Ingresar monto"
              v-model.number="cantidad_Compra_O_Venta"
            />
          </div>
        </div>
        <div>
          <br v-if="cantidad_Compra_O_Venta" />
          <input
            v-if="cantidad_Compra_O_Venta"
            class="btn"
            type="submit"
            value="Efectuar acción"
            @click="AlmacenarCompraOVenta"
            onsubmit="return false"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "NuevaCompra-Venta",
  data() {
    return {
      compra_vent: "",
      coin: "",
      cantidad_Compra_O_Venta: null,
    };
  },
  methods: {
    mostrar() {
      console.log(this.compra_vent);
    },
    AlmacenarCompraOVenta() {
      //almacenar en vuex? no estoy seguro je, tal vez sea el sueño
    },
  },
};
</script>

<style scoped>
.cuerpo {
  font-family: Arial, sans-serif;
  /* background-color: #f5f5f5; */
  background-image: url("../assets/toro-oso.jpeg");
  background-size: cover;
  background-repeat: round;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 97.5vh;
  width: auto;
  margin: 0;
}

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
</style>
