/* eslint-disable */
import { createStore } from "vuex";
import criptoYa from "./criptoYa";
import axios from "axios";

const apiTransacciones = axios.create({
	baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
  headers: {"x-apikey": "60eb09146661365596af552f"}
})

export default createStore({
  state: {
    username: "",
    compra_venta: [],
  },
  mutations: {
    guardarUsername(state, username) {
      state.username = username;
    },
    registrarAcciones(state, data) {
      state.compra_venta.push(data)
    }
  },
  actions: {
    async postDatos({ commit }, payload) {
      try {
        const response = await apiTransacciones.post("transactions", payload);
        commit("registrarAcciones", response.data);
      } catch (error) {
        console.error("Error al enviar la solicitud POST:", error);
      }
    },
  },
  modules: {
    criptoYa,
  },
});
