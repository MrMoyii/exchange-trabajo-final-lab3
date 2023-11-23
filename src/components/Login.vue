<template>
  <div class="cuerpo">
    <div class="container bounceAnimation">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="guardarUsuario">
        <div class="input-group">
          <label for="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            v-model="username"
            required
          />
          <p v-show="error" class="error">
            El usuario debe tener letras y numeros
          </p>
        </div>
        <input class="btn" type="submit" value="Iniciar Sesión" />
        <!-- solo para ver que este bien  -->
        <!-- <p>{{ datosVuex }}</p> -->
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import validarStringAlfaNum from "@/tools/validaciones.js";
import Swal from 'sweetalert2';
export default {
  name: "Login",
  data(){
    return {
      username: '',
      error: false,
    }
  },
  // ---- Traigo los datos de vuex para comprobar que este bien
  // computed: {
  //   datosVuex() {
  //     return this.$store.state.username;
  //   }
  // },
  methods: {
    guardarUsuario(){
      if(validarStringAlfaNum(this.username))
      {
        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          showConfirmButton: false,
          timer: 1500
        })
        this.error = false
        this.$store.commit('guardarUsername', this.username);
        this.$router.push('trade');
      }
      else this.error = true
    }
  }
};
</script>

<style scoped>
  .error {
    color: #d02323;
  }

  .cuerpo {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #e3e3e3;
  }

  .container {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
    padding: 20px;
    width: 100%;
    max-width: 400px;
    text-align: center;
  }

  .container h2 {
    margin-bottom: 20px;
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
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    max-width: 300px;
  }

  .input-group input:focus {
    outline: none;
    border-color: #007bff;
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