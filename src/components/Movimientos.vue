<template>
  <Loader v-if="dataHistorial == null"></Loader>
  <div class="cuerpo" v-else>
    <div class="container" v-if="dataHistorial">
      <table class="tftable">
        <tr>
          <th>Moneda</th>
          <th>Operación</th>
          <th>Fecha</th>
          <th>Cantidad</th>
          <th>Monto</th>
          <th>Ver/Editar/Eliminar</th>
        </tr>
        <tr v-for="transaccion in dataHistorial" :key="transaccion.id">
          <td>{{ transaccion.crypto_code }}</td>
          <td>{{ transaccion.action }}</td>
          <td>{{ formateoFecha(transaccion.datetime) }}</td>
          <td>{{ transaccion.crypto_amount }}</td>
          <td>$ {{ transaccion.money }}</td>
          <td class="buttons">
            <button class="btn" @click="Borrar(transaccion._id)">Ver</button>
            <button class="btn" @click="Borrar(transaccion._id)">Editar</button>
            <button class="btn" @click="Borrar(transaccion._id)">Borrar</button>
            <!-- <button @click="openEditModal(getMovementToEdit(transaccion._id, false))">Editar</button>
            <button @click="deleteMovement(transaccion._id)">Eliminar</button> -->
          </td>
        </tr>
        <input type="submit" @click="algo" />
      </table>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import Loader from "@/components/Loader.vue";
import formateoFecha from "@/tools/formatearFecha.js";

export default {
  name: "MovimientosComponent",
  data() {
    return {
      dataHistorial: null,
    }
  },
  components: {
    Loader,
  },
  computed: {
    ...mapGetters(["getHistorial"]),
  },
  mounted() {
    this.$store.dispatch("GetHistorial")
    .then(() => {
      this.dataHistorial = this.$store.state.historial;
    });
  },
  methods: {
    formateoFecha,
    algo() {
      console.log(this.$store.state.historial[0]);
    },
    Borrar(id){
      this.$store.dispatch("BorrarPorID", id);
    },
  }
};
</script>

<style scoped>
.cuerpo {
  font-family: Arial, sans-serif;
  background-color: #e3e3e3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 97.5vh;
  margin: 0;
}

.container {
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

.btn {
  background-color: #007bff;
  color: #fff;
  padding: 3px 4px 3px 4px;
  border: none;
  cursor: pointer;
  font-size: 15px;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
