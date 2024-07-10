<template>
  <header>
    <h1>Hola, bienvenido a BancArg</h1>
    <h3 class="lemaEmpresa"><em>La mejor app para manejar tu plata</em></h3>
    <button class="btn btn-success" @click="irALogin">Acceder al homebanking</button>
  </header>
  <div>
    <CalculadoraMonedas />
  </div>
</template>
<script>
import CalculadoraMonedas from '../components/CalculadoraMonedas.vue'

export default {
  name: 'HomeScreen',
  components: {
    CalculadoraMonedas
  },
  methods: {
    irALogin() {
      this.$router.push({ name: 'Login' })
    }
  },
}
</script>
<style scoped>
.lemaEmpresa {
  color: grey;
  font-style: italic;
  font-size: 1rem;
  margin-bottom: 2rem;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 30vh;
}
</style>
