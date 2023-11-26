<template>
  <div v-if="this.$store.state.username == ''"></div>
  <div v-else class="navBar">
    <nav>
      <router-link to="/">Iniciar Sesión</router-link> |
      <router-link to="/trade">Compra/Venta</router-link> |
      <router-link to="/movimientos">Movimientos</router-link> |
      <router-link to="/estadoActual">Estado Actual</router-link>
    </nav>
  </div>

  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navBar {
  width: 100%;
  position: fixed;
  z-index: 100;
}
nav {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0);
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: white;
}

.bounceAnimation {
  animation: swal2-show 0.3s;
}

.select-wrapper {
  display: inline-block;
  position: relative;
}

select {
  appearance: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  font-size: 16px;
  width: 200px;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: #007bff;
}

.arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.cuerpo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #0277ff;
  background-image: linear-gradient(to bottom right, #0277ff, #93edff);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.btn {
  background-color: #0277ff;
  background-image: linear-gradient(to bottom right, #0277ff, #93edff);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.5s ease;
}

.btn:hover {
  background-image: linear-gradient(to bottom left, #0277ff, #93edff);
  transform: scale(0.95);
}

.error {
  color: #d02323;
}
</style>
