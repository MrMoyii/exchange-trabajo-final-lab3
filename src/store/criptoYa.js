import axios from "axios";

export default {
  namespaced: true,
  state: {
    coinElegida: "",
    precios: [],
  },
  getters: {
    datosAPI(state) {
      return state.precios;
    },
    getCoin(state) {
      return state.coinElegida;
    },
  },
  mutations: {
    SetPrecios(state, precios) {
      state.precios = precios;
    },
    SetCoin(state, coin) {
      state.coinElegida = coin;
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
