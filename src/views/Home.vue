<template lang="">
  <header>
    <h1>Hola, bienvenido a BancArg</h1>
    <h3 class="lemaEmpresa"><em>La mejor app para manejar tu plata</em></h3>
    <div id="loginWrapper">
      <!-- <h3>Para más funciones, ¡inicia sesión!</h3> -->
      <button class="btn btn-success" @click="irALogin">Iniciar Sesión</button>
    </div>
  </header>
  <main>
    <section id="tituloCalculadoraDeMonedas">
      <h3>Utilizá nuestra calculadora de monedas extranjeras a pesos!</h3>
    </section>
    <section id="valoresCalculadoraDeMonedas">
      <h4>Valores de las monedas</h4>
      <div id="cotizacionesActualesMonedas">
        <li>
          <span class="montoMoneda">${{ this.monedasExtranjeras.dolarBlue }}</span> pesos el dólar
          blue
        </li>
        <li>
          <span class="montoMoneda">${{ this.monedasExtranjeras.dolarOficial }}</span> pesos el
          dólar oficial
        </li>
        <li>
          <span class="montoMoneda">${{ this.monedasExtranjeras.realOficial }}</span> pesos el real
          oficial
        </li>
        <li>
          <span class="montoMoneda">${{ this.monedasExtranjeras.euroOficial }}</span> pesos el euro
          oficial
        </li>
      </div>
    </section>
    <section id="montoConvertible">
      <h4>Ingresa la cantidad de pesos que quiere convertir</h4>
      <input
        v-model="pesosArgentinos"
        type="text"
        placeholder="Monto en $ARS"
        autocomplete="off"
        min-length="1"
        required
        size="1"
      />
      <label for="monedas">Elegí la moneda:</label>
      <select id="moneda" name="moneda" v-model="monedaSeleccionada" required>
        <option :value="monedasExtranjeras.dolarOficial">Dolar Oficial</option>
        <option :value="monedasExtranjeras.dolarBlue">Dolar Blue</option>
        <option :value="monedasExtranjeras.realOficial">Real</option>
        <option :value="monedasExtranjeras.euroOficial">Euro</option>
      </select>
    </section>
    <br />
    <button @click="calcularResultado">calcular</button>
    <br />
    <input type="text" placeholder="Resultado" v-model="resultado" />
  </main>
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
    irALogin() {
      this.$router.push({ name: 'Login' })
    }
  },
  async mounted() {
    await this.obtenerValoresDeMonedas()
  }
}
</script>
<style lang=""></style>
