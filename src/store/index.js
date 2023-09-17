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
    cartera: [
      { id: 0, name: "Bitcoin", symbol: "BTC", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
      { id: 1, name: "DAI", symbol: "DAI", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
      { id: 3, name: "Ethereum", symbol: "ETH", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
      { id: 4, name: "Theter", symbol: "USDT", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
    ],
    historial: null,
    cargaCompleta: false,
  },
  getters: {
    getHistorial(state) {
      return state.historial;
    },
  },
  mutations: {
    guardarUsername(state, username) {
      state.username = username;
    },
    guardarCompra(state, data) {
      state.cartera.find(x => x.symbol === data.crypto_code).purchases += parseFloat(data.money);
      state.cartera.find(x => x.symbol === data.crypto_code).amount += parseFloat(data.crypto_amount);
    },
    guardarVenta(state, data) {
      state.cartera.find(x => x.symbol === data.crypto_code).sales += parseFloat(data.money);
      state.cartera.find(x => x.symbol === data.crypto_code).amount -= parseFloat(data.crypto_amount);
    },
    guardarHistorial(state, data) {
      state.historial = data;
    }
  },
  actions: {
    async PostDatos({ commit }, payload) {
      try {
        await apiTransacciones.post('transactions', payload);
        //llamo a la mutacion dependiendo si es compra o venta
        if(payload.action == "purchase") {
          commit("guardarCompra", payload);
        }
        else if(payload.action == "sale") {
          commit("guardarVenta", payload);
        }
        else console.log("Ocurrio un error al guarsdar la compra o venta.");
      } catch (error) {
        console.error("Error al enviar la solicitud POST...:", error);
      }
    },
    async GetHistorial({commit, state}) {
      const respuesta = await apiTransacciones.get(`/transactions?q={"user_id": "${state.username}"}`);
      commit("guardarHistorial", respuesta.data);
    },
    async BorrarPorID({commit, state}, id) {
      const respuesta = await apiTransacciones.delete(`/transactions/${id}}`);
      console.log(respuesta.data);
      console.log(state.historial);
      // commit("guardarHistorial", respuesta.data);

    },
  },
  modules: {
    criptoYa,
  },
});
