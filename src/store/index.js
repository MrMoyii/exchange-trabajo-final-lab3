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
    actualizarHistorial(state, data) {
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
        else console.log("Ocurrio un error al guardar la compra o venta.");
      } catch (error) {
        console.error("Error al enviar la solicitud POST...:", error);
      }
    },
    async ObtenerHistorial({commit, state}) {
      try {
        const respuesta = await apiTransacciones.get(`/transactions?q={"user_id": "${state.username}"}`);
        commit("actualizarHistorial", respuesta.data);
      } catch (error) {
        console.log("Error al obtener el historial del usuario...:", error)
      }
    },
    async BorrarPorID({commit}, id) {
      try {
        await apiTransacciones.delete(`/transactions/${id}`);
      } catch (error) {
        console.log("Error al enviar la solicitud DELETE...:", error)
      }
    },
    async EditarPorId({commit}, body) {
      try {
        await apiTransacciones.put(`/transactions/${body._id}`, body);
      } catch (error) {
        console.log("Error al enviar la solicitud UPDATE...:", error)
      }
    }
  },
  modules: {
    criptoYa,
  },
});
