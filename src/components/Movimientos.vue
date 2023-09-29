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
  <div class="containerHistorial bounceAnimation" v-if="datosHistorial">
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

  <!-- Pantalla de detalles del campo elegido -->
  <div v-if="estaModalVistaActivo" class="modal" id="modal">
    <div class="modal-content">
      <h2>Detalles de la transacción</h2>
      <table>
        <tr>
          <td><strong>Acción:</strong></td>
          <td>{{ transaccionElegida.action }}</td>
        </tr>
        <tr>
          <td><strong>Crypto:</strong></td>
          <td>{{ transaccionElegida.crypto_code }}</td>
        </tr>
        <tr>
          <td><strong>Cantidad:</strong></td>
          <td>{{ transaccionElegida.crypto_amount }}</td>
        </tr>
        <tr>
          <td><strong>Dinero:</strong></td>
          <td>${{ transaccionElegida.money }}</td>
        </tr>
        <tr>
          <td><strong>Fecha:</strong></td>
          <td>{{ formateoFecha(transaccionElegida.datetime) }}</td>
        </tr>
      </table>
      <input
        type="submit"
        class="btn_cerrar"
        value="Cerrar"
        @click="estaModalVistaActivo = false"
      />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import Loader from "@/components/Loader.vue";
import formateoFecha from "@/tools/formatearFecha.js";
import Swal from "sweetalert2";

export default {
  name: "MovimientosComponent",
  data() {
    return {
      datosHistorial: null,
      transaccionElegida: null,
      estaHistorialVacio: false,
      estaModalVistaActivo: false,
      estaModalEditarActivo: false, 
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
    Ver(transaccion){
      this.transaccionElegida = transaccion;
      this.estaModalVistaActivo = true;
    },
    Editar(id){
      // this.$store.dispatch("BorrarPorID", id);
    },
    Borrar(id){
      Swal.fire({
        title: 'Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: '¡Sí, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) { //si acepta
          this.datosHistorial = null; //setteo los dato en null para que aparezca el loader
          this.$store.dispatch("BorrarPorID", id) // lo borro
          .then(() => { //cuando finalice 
            this.ObtenerHistorial();
            Swal.fire(
            '¡Borrado!',
            'Tu transaccion ha sido borrada',
            'success'
            )
          });
        }
      })
    },
    ObtenerHistorial(){
      this.datosHistorial = null;
      this.estaHistorialVacio = false;
      this.$store.dispatch("ObtenerHistorial")
      .then(() => {
        if(this.getHistorial.length < 1)
          this.estaHistorialVacio = true;
        this.datosHistorial = this.getHistorial;
      });
    }
  }
};
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  max-width: 80%;
  position: relative;

  animation: swal2-show .3s;
}

.btn_cerrar {
  background-color: rgb(221, 51, 51);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 13px;
}
.btn_cerrar:hover {
  background-color: rgb(194, 51, 51);
}
</style>
