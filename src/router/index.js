import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import Compra_Venta from "../views/Compra_VentaView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/compra_venta",
    name: "compra_venta",
    component: Compra_Venta,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
