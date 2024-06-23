<template lang="">
  <header>
    <h1>Hola, bienvenido a BancArg</h1>
    <h3 class="lemaEmpresa"><em>La mejor app para manejar tu plata</em></h3>
    <button class="btn btn-success" @click="irALogin">Acceder al homebanking</button>
  </header>
  <main>
    <section id="tituloCalculadoraDeMonedas">
      <h3>Utilizá nuestra calculadora de monedas extranjeras a pesos!</h3>
    </section>
    <section id="valoresCalculadoraDeMonedas">
      <h4>Cotizaciones por tipo de cambio</h4>
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
          <span class="montoMoneda">${{ this.monedasExtranjeras.dolarMEP }}</span> pesos el dólar
          MEP
        </li>
        <li>
          <span class="montoMoneda">${{ this.monedasExtranjeras.dolarCCL }}</span> pesos el dólar
          CCL
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
      <h4>Ingresa la cantidad de pesos y la cantidad que quiere convertir</h4>
      <h6 for="monedas">Agrega el monto</h6>
      <input
        v-model="pesosArgentinos"
        type="text"
        placeholder="Monto en $ARS"
        autocomplete="off"
        min-length="1"
        required
        size="1"
        class="form-control"
      />
      <h6 for="monedas">Elegí la moneda</h6>
      <select id="moneda" name="moneda" v-model="monedaSeleccionada" required class="form-select">
        <option :value="this.monedasExtranjeras.dolarOficial">Dolar Oficial</option>
        <option :value="this.monedasExtranjeras.dolarBlue">Dolar Blue</option>
        <option :value="this.monedasExtranjeras.dolarMEP">Dolar MEP (Bolsa)</option>
        <option :value="this.monedasExtranjeras.dolarCCL">
          Dolar CCL (Contacto con Liquidación)
        </option>
        <option :value="this.monedasExtranjeras.realOficial">Real</option>
        <option :value="this.monedasExtranjeras.euroOficial">Euro</option>
      </select>
      <div class="btn-group botonesCalculadora" role="group" aria-label="Basic example">
        <button @click="calcularResultado" type="button" class="btn btn-success">Calcular</button>
        <button @click="restablecerResultado" type="button" class="btn btn-danger">
          Restablecer
        </button>
      </div>
      <input
        type="text"
        placeholder="Resultado"
        v-model="resultado"
        readonly
        class="form-control"
      />
    </section>
  </main>
</template>
<script>
export default {
  name: 'homeScreen',
  data() {
    return {
      pesosArgentinos: 0,
      monedaSeleccionada: 0,
      resultado: 0,
      monedasExtranjeras: {
        dolarOficial: 0,
        dolarBlue: 0,
        dolarMEP: 0,
        dolarCCL: 0,
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
      this.monedasExtranjeras.dolarMEP = data[2].venta
      this.monedasExtranjeras.dolarCCL = data[3].venta

      const secondResponse = await fetch('https://dolarapi.com/v1/cotizaciones')
      const secondData = await secondResponse.json()

      this.monedasExtranjeras.euroOficial = secondData[1].venta
      this.monedasExtranjeras.realOficial = secondData[2].venta
    },
    async calcularResultado() {
      let valorARS = this.pesosArgentinos
      let tipoDeCambio = this.monedaSeleccionada

      while (valorARS === 0 || tipoDeCambio === 0) {
        while (valorARS === 0 || valorARS === '') {
          valorARS = prompt('Se debe ingresar un monto en ARS para convertir')
        }

        while (tipoDeCambio === 0 || tipoDeCambio === '') {
          alert("Como ninguna moneda fue seleccionada, se utilizó la cotización 'Dólar Oficial'")
          const response = await fetch('https://dolarapi.com/v1/dolares')
          const data = await response.json()

          tipoDeCambio = data[0].venta
        }
      }

      this.resultado = valorARS / tipoDeCambio
    },
    restablecerResultado() {
      this.pesosArgentinos = 0
      this.resultado = 0
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

main {
  color: white;
  padding: 3rem;
  background-color: #0541d6;
  height: 80vh;
}

#tituloCalculadoraDeMonedas {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#valoresCalculadoraDeMonedas {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

#cotizacionesActualesMonedas {
  margin-top: 0.3rem;
  width: 100%;
  font-size: 1.5rem;
}

#cotizacionesActualesMonedas li {
  text-decoration: none;
  display: flex;
  justify-content: center;
  font-weight: bold;
}

.montoMoneda {
  display: inline-block;
  margin-right: 0.35rem;
  font-weight: bold;
  font-style: italic;
  color: gold;
}

#montoConvertible {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

#montoConvertible h4 {
  margin-bottom: 1rem;
}

#montoConvertible input {
  width: 10%;
  margin: 0 auto;
  margin-bottom: 0.5rem;
}

.botonesCalculadora {
  margin: 1.5rem 0;
}

select[name='moneda'] {
  width: 10%;
}
</style>
