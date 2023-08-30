import { createStore } from "vuex";

export default createStore({
  state: {
    username: "",
  },
  mutations: {
    guardarUsername(state, username) {
      state.username = username;
    },
  },
});
