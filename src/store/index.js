import { createStore } from "vuex";
import criptoYa from "./criptoYa";

export default createStore({
  state: {
    username: "",
    compra_venta: [],
  },
  mutations: {
    guardarUsername(state, username) {
      state.username = username;
    },
  },
  modules: {
    criptoYa,
  },
});
