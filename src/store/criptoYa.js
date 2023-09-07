import axios from "axios";

export default {
  namespaced: true,
  state: {
    coinElegida: "",
    precioCoinElegida: [],
    montoIngresado: null,
    montoAPagar_Vender: null,
    fecha: null,
  },
  getters: {
    getPrecio(state) {
      return state.precioCoinElegida;
    },
    getCoin(state) {
      return state.coinElegida;
    },
    getMonto(state) {
      return state.montoIngresado;
    },
    getMontoAPagar_Vender(state) {
      return state.montoAPagar_Vender;
    },
    getFecha(state) {
      return state.fecha;
    },
  },
  mutations: {
    SetPrecios(state, precios) {
      state.precioCoinElegida = precios;
    },
    SetCoin(state, coin) {
      state.coinElegida = coin;
    },
    SetMontoIgresado(state, monto) {
      state.montoIngresado = monto;
    },
    SetMontoAPagar_Vender(state, monto) {
      state.montoAPagar_Vender = monto;
    },
    SetFecha(state, fecha) {
      state.fecha = fecha;
    },
  },
  actions: {
    async consultarAPI({ commit }, coin) {
      try {
        const response = await axios.get(
          `https://criptoya.com/api/argenbtc/${coin}/ars`
        );
        const precios = response.data;
        commit("SetPrecios", precios);
      } catch (error) {
        console.error("Error al consultar la API:", error);
      }
    },
  },
};
