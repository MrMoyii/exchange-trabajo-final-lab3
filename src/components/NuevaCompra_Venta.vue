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
        <!-- <input
          class="btn"
          type="submit"
          value="mostrar"
          @click="mostrar"
          onsubmit="return false"
        /> -->
        <div></div>
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
    };
  },
  methods: {
    // mostrar() {
    //   console.log(this.compra_vent);
    // },
  },
};
</script>

<style>
.cuerpo {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 97.5vh;
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
</style>
