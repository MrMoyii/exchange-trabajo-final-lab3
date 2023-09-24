<template>
  <div v-if="datosHistorial == null">
    <Loader></Loader>
  </div>
  <div v-if="estaHistorialVacio">
    <h4>Historial Vacio</h4>
  </div>
  <div class="cuerpo" v-else>
    <div class="container" v-if="datosHistorial">
      <table class="tftable">
        <tr>
          <th>Moneda</th>
          <th>Operación</th>
          <th>Fecha</th>
          <th>Cantidad</th>
          <th>Monto</th>
          <th>Ver/Editar/Borrar</th>
        </tr>
        <tr v-for="transaccion in datosHistorial" :key="transaccion.id">
          <td>{{ transaccion.crypto_code }}</td>
          <td>{{ transaccion.action }}</td>
          <td>{{ formateoFecha(transaccion.datetime) }}</td>
          <td>{{ transaccion.crypto_amount }}</td>
          <td>$ {{ transaccion.money }}</td>
          <!---------------todo--------------->
          <td>
            <button class="btn" @click="Ver(transaccion)">Ver</button>
            <button class="btn" @click="Editar(transaccion)">Editar</button>
            <button class="btn" @click="Borrar(transaccion._id)">Borrar</button>
          </td>
          <!---------------todo--------------->
        </tr>
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
      datosHistorial: null,
      estaHistorialVacio: false,
    }
  },
  components: {
    Loader,
  },
  computed: {
    ...mapGetters(["getHistorial"]),
  },
  mounted() {
    if(this.$store.state.username == ""){
      this.$router.push("/")
    }
    else this.ObtenerHistorial();
  },
  methods: {
    formateoFecha,
    Ver(id){
      // this.$store.dispatch("BorrarPorID", id);
    },
    Editar(id){
      // this.$store.dispatch("BorrarPorID", id);
    },
    Borrar(id){
      this.datosHistorial = null;
      this.$store.dispatch("BorrarPorID", id)
      .then(() => {
        this.ObtenerHistorial();
      });
    },
    ObtenerHistorial(){
      this.datosHistorial = null;
      this.estaHistorialVacio = false;
      this.$store.dispatch("GetHistorial")
      .then(() => {
        if(this.$store.state.historial.length < 1)
          this.estaHistorialVacio = true;
        this.datosHistorial = this.$store.state.historial;
      });
    }
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
