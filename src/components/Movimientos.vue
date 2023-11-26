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
        <th>Operación</th>
        <th>Fecha</th>
        <th>Cantidad</th>
        <th>Monto</th>
        <th>Botones</th>
      </tr>
      <tr
        v-for="transaccion in datosHistorial"
        :key="transaccion.id"
        :class="obtenerClassPorSimbolo(transaccion.crypto_code)"
      >
        <td>{{ transaccion.crypto_code }}</td>
        <td>{{ transaccion.action }}</td>
        <td>{{ formateoFecha(transaccion.datetime) }}</td>
        <td>{{ transaccion.crypto_amount }}</td>
        <td>$ {{ transaccion.money }}</td>
        <td>
          <button class="btn-accion" @click="ModalVer(transaccion)">Ver</button>
          <button class="btn-accion" @click="ModalEditar(transaccion)">
            Editar
          </button>
          <button class="btn-accion" @click="Borrar(transaccion._id)">
            Borrar
          </button>
        </td>
      </tr>
    </table>
  </div>

  <!-- Modal para ver los datos de la transaccion -->
  <div v-if="estaModalVistaActivo" class="modal" id="modal">
    <div class="modal-content">
      <h2>Detalles de la transacción</h2>
      <div class="itemsCentrados">
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
      </div>
      <br />
      <input
        type="submit"
        class="btn_cerrar"
        value="Cerrar"
        @click="estaModalVistaActivo = false"
      />
    </div>
  </div>

  <!-- Modal para editar transacción -->
  <div v-if="estaModalEditarActivo" class="modal" id="modal">
    <div class="modal-content">
      <h2>Editar transacción</h2>
      <div class="input-group">
        <table>
          <tr>
            <td><strong>Acción:</strong></td>
            <td>{{ transaccionElegida.action }}</td>
            <td>
              <div class="select-wrapper bounceAnimation">
                <select v-model="transaccionAEditar.action">
                  <option disabled selected>
                    {{ transaccionElegida.action }}
                    <!-- {{
                      transaccionElegida.action == "purchase"
                        ? "Compra"
                        : "Venta"
                    }} -->
                  </option>
                  <option>Compra</option>
                  <option>Venta</option>
                </select>
                <div class="arrow">▼</div>
              </div>
            </td>
          </tr>
          <tr>
            <td><strong>Crypto:</strong></td>
            <td>{{ transaccionElegida.crypto_code }}</td>
            <td>
              <div class="select-wrapper bounceAnimation">
                <select v-model="transaccionAEditar.crypto_code">
                  <option disabled selected>
                    {{ transaccionElegida.crypto_code }}
                  </option>
                  <option>BTC</option>
                  <option>DAI</option>
                  <option>ETH</option>
                  <option>USDT</option>
                </select>
                <div class="arrow">▼</div>
              </div>
            </td>
          </tr>
          <tr>
            <td><strong>Cantidad:</strong></td>
            <td>{{ transaccionElegida.crypto_amount }}</td>
            <td>
              <div class="bounceAnimation">
                <input
                  type="number"
                  min="0"
                  step="any"
                  name="numeroDecimal"
                  id="numeroDecimal"
                  placeholder="Ingresar monto"
                  v-model.number="transaccionAEditar.crypto_amount"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td><strong>Dinero:</strong></td>
            <td>${{ transaccionElegida.money }}</td>
            <td>
              <div class="bounceAnimation">
                <input
                  v-model="transaccionAEditar.money"
                  type="number"
                  step="0.01"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td><strong>Fecha:</strong></td>
            <td>{{ formateoFecha(transaccionElegida.datetime) }}</td>
          </tr>
        </table>
      </div>
      <input
        type="submit"
        class="btn_editar"
        value="Guardar"
        @click="GuardarCambiosEditados"
      />
      <input
        type="submit"
        class="btn_cerrar"
        value="Cerrar"
        @click="estaModalEditarActivo = false"
      />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import Loader from "@/components/Loader.vue";
import formateoFecha from "@/tools/formatearFecha.js";
import obtenerFechaActual from "@/tools/obtenerFechaActual.js";
import Swal from "sweetalert2";

export default {
  name: "MovimientosComponent",
  data() {
    return {
      datosHistorial: null,
      transaccionElegida: null,
      transaccionAEditar: {
        _id: "",
        crypto_code: "",
        crypto_amount: "",
        money: "",
        user_id: "",
        action: "",
        datetime: ""
      },
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
    ModalVer(transaccion) {
      this.transaccionElegida = transaccion;
      this.estaModalVistaActivo = true;
    },
    ModalEditar(transaccion) {
      this.transaccionElegida = transaccion;
      this.transaccionAEditar = {...transaccion};
      this.estaModalEditarActivo = true;
    },
    Borrar(id) {
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
    ObtenerHistorial() {
      this.datosHistorial = null;
      this.estaHistorialVacio = false;
      this.$store.dispatch("ObtenerHistorial")
      .then(() => {
        if(this.getHistorial.length < 1)
          this.estaHistorialVacio = true;
        this.datosHistorial = this.getHistorial;
      });
    },
    GuardarCambiosEditados() {
      this.estaModalEditarActivo = false
      
      if(this.transaccionAEditar.action == "Compra") this.transaccionAEditar.action = "purchase";
      if(this.transaccionAEditar.action == "Venta") this.transaccionAEditar.action = "sale";
      
      //seteo la fecha de modificacion
      this.transaccionAEditar.datetime = obtenerFechaActual();
      
      //comparar si los dos objetos son iguales
      if(JSON.stringify(this.transaccionElegida) === JSON.stringify(this.transaccionAEditar)){
        Swal.fire({
          icon: 'warning',
          title: 'No hay cambios realizados',
        })
      }
      else {
        this.datosHistorial = null;
        this.$store.dispatch("EditarPorId", this.transaccionAEditar)
        .then(() => {
          this.ObtenerHistorial();
          Swal.fire(
          '¡Editado!',
          'La transaccion ha sido editada',
          'success'
          )
        })
      }
    },
    obtenerClassPorSimbolo(simbolo) {
      if (simbolo === 'DAI') {
        return 'fondo-DAI';
      } else if (simbolo === 'BTC') {
        return 'fondo-BTC';
      } else if (simbolo === 'ETH'){
        return 'fondo-ETH';
      } else if (simbolo === 'USDT'){
        return 'fondo-USDT';
      } else '';
    },
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
  /*border-color: white;*/
  text-align:center;
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

.btn-accion {
  background-color: #007bff;
  color: #fff;
  padding: 3px 4px 3px 4px;
  border: none;
  cursor: pointer;
  font-size: 15px;
}

.btn-accion:hover {
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

.btn_editar {
  background-color: rgb(10, 160, 35);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 15px;
}
.btn_editar:hover {
  background-color: rgb(6, 104, 22);
}

.btn_cerrar {
  background-color: rgb(221, 51, 51);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}
.btn_cerrar:hover {
  background-color: rgb(194, 51, 51);
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.input-group input {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 5px;
  font-size: 16px;
  width: 180px;
}

.input-group input:focus {
  outline: none;
  border-color: #007bff;
}

.itemsCentrados {
  display: grid;
  place-items: center;
}

.fondo-DAI {
  background-color: #ccffcc;
}
.fondo-BTC {
  background-color: #b3e0ff;
}
.fondo-ETH {
  background-color: #f2b3ff;
}
.fondo-USDT {
  background-color: #e6ffb3;
}
</style>
