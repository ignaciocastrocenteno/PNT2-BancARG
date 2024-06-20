<template lang="">
  <div>
    <h1>Hola, bienvenido a BancArg</h1>
  </div>
  <div>
    <h3>Utilizá nuestra calculadora de monedas extranjeras a pesos!</h3>
    <h4>Valores de las monedas:</h4>
    <li>${{ this.monedasExtranjeras.dolarBlue }} pesos el dólar blue</li>
    <li>${{ this.monedasExtranjeras.dolarOficial }} pesos el dólar oficial</li>
    <li>${{ this.monedasExtranjeras.realOficial }} pesos el real oficial</li>
    <li>${{ this.monedasExtranjeras.euroOficial }} pesos el euro oficial</li>
    <br />
    <br />
    <input v-model="pesosArgentinos" type="number" placeholder="Ingresá tus pesos" />
    <br />
    <br />
    <label for="monedas">Elegí la moneda:</label>
    <select id="moneda" name="moneda" v-model="monedaSeleccionada">
      <option :value="monedasExtranjeras.dolarOficial">Dolar Oficial</option>
      <option :value="monedasExtranjeras.dolarBlue">Dolar Blue</option>
      <option :value="monedasExtranjeras.realOficial">Real</option>
      <option :value="monedasExtranjeras.euroOficial">Euro</option>
    </select>
    <br />
    <button @click="calcularResultado">calcular</button>
    <br />
    <input type="text" placeholder="Resultado" v-model="resultado" />
  </div>
  <div>
    <h3>Para más funciones, ¡inicia sesión!</h3>
    <button @click="irALogin">Iniciar Sesión</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pesosArgentinos: 0,
      monedaSeleccionada: 0,
      resultado: 0,
      monedasExtranjeras: {
        dolarOficial: 0,
        dolarBlue: 0,
        realOficial: 0,
        euroOficial: 0
      }
    }
  },
  methods: {
    async obtenerValoresDeMonedas() {
      const response = await fetch('https://dolarapi.com/v1/dolares')
      const data = await response.json()

      this.monedasExtranjeras.dolarOficial = data[0].venta
      this.monedasExtranjeras.dolarBlue = data[1].venta

      const secondResponse = await fetch('https://dolarapi.com/v1/cotizaciones')
      const secondData = await secondResponse.json()

      this.monedasExtranjeras.euroOficial = secondData[1].venta
      this.monedasExtranjeras.realOficial = secondData[2].venta
    },
    calcularResultado() {
      this.resultado = this.pesosArgentinos / this.monedaSeleccionada
    },
    irALogin(){
      this.$router.push({name: 'Login'})
    }
  },
  async mounted() {
    await this.obtenerValoresDeMonedas()
  }
}
</script>
<style lang=""></style>
