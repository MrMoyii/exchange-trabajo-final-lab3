import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginView.vue";
import Trade from "../views/TradeView.vue";
import Movimientos from "../views/MovimientosView.vue";
import EstadoActual from "../views/EstadoActualView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    props: true,
    component: Login,
  },
  {
    path: "/trade",
    name: "trade",
    props: true,
    component: Trade,
  },
  {
    path: "/movimientos",
    name: "Movimientos",
    props: true,
    component: Movimientos,
  },
  {
    path: "/estadoActual",
    name: "EstadoActual",
    props: true,
    component: EstadoActual,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
