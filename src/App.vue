<template>
  <div v-if="this.$store.state.username == ''"></div>
  <div v-else>
    <nav>
      <router-link to="/">Login</router-link> |
      <router-link to="/trade">Compra/Venta</router-link> |
      <router-link to="/movimientos">Movimientos</router-link> |
      <router-link to="/estadoActual">Estado Actual</router-link> |
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #007bff;
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
  font-family: Arial, sans-serif;
  background-color: #e3e3e3;
  /* background-image: url("../assets/toro-oso.jpeg"); */
  background-size: cover;
  background-repeat: round;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: auto;
  margin: 0;
}
</style>
