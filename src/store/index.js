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
    historial: [],
    cargaCompleta: false,
  },
  mutations: {
    guardarUsername(state, username) {
      state.username = username;
    },
    guardarEnCartera(state, data) {
      state.cartera.find(x => x.symbol === data.crypto_code).sales += parseFloat(data.money);
      state.cartera.find(x => x.symbol === data.crypto_code).amount -= parseFloat(data.crypto_amount);
    },
    guardarHistorial(state, data) {
      state.historial.push(data);
    }
  },
  actions: {
    async postDatos({ commit }, payload) {
      try {
        const respuesta = await apiTransacciones.post('transactions', payload);
        console.log(respuesta.data);

        const transaccionRegistrada = {
          "_id": respuesta.data["_id"],
          "crypto_code": respuesta.data["crypto_code"],
          "crypto_amount": respuesta.data["crypto_amount"],
          "user_id": respuesta.data["user_id"],
          "action": respuesta.data["action"],
          "datetime": respuesta.data["datetime"],
          "money": respuesta.data["money"],
        }
        
        commit("guardarHistorial", transaccionRegistrada);
        commit("guardarEnCartera", payload);
      } catch (error) {
        console.error("Error al enviar la solicitud POST...:", error);
      }
    },
  },
  modules: {
    criptoYa,
  },
});
