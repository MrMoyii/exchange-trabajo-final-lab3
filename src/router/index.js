import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import Compra_Venta from "../views/Compra_VentaView.vue";
import Movimientos from "../views/MovimientosView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    props: true,
    component: LoginView,
  },
  {
    path: "/compra_venta",
    name: "compra_venta",
    props: true,
    component: Compra_Venta,
  },
  {
    path: "/movimientos",
    name: "Movimientos",
    props: true,
    component: Movimientos,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
