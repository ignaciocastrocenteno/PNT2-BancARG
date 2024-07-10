<template>
  <div>
    <section id="saldoDisponible">
      <h1>Saldo disponible: ${{ saldoTotal }}</h1>
    </section>
    <section id="cargaDeSaldo">
      <h2>Cargar saldo</h2>
      <input v-model.number="agregarSaldo" type="number" placeholder="Monto a sumar" min="0" />
      <button @click="sumarSaldo">Cargar</button>
    </section>
    <section id="transferencias">
      <h2>Transferir saldo</h2>
      <input v-model.number="montoTransferencia" type="number" placeholder="Monto a transferir" min="0" />
      <div>
        <label for="contacto">Selecciona un contacto:</label>
      </div>
      <div>
        <select id="contacto" v-model="contactoSeleccionado">
          <option v-for="contacto in listaContactos" :key="contacto.cuenta" :value="contacto.cuenta">
            {{ contacto.nombre }}
          </option>
        </select>
      </div>
      <button @click="transferirSaldo" id="submitTransferencia">Transferir</button>
      <p>{{ mensaje }}</p>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    listaContactos: Array
  },
  data() {
    return {
      saldoTotal: 0,
      agregarSaldo: 0,
      montoTransferencia: 0,
      contactoSeleccionado: null,
      mensaje: ''
    }
  },
  methods: {
    sumarSaldo() {
      if (this.agregarSaldo <= 0) {
        this.mensaje = 'El monto debe ser mayor a $0'
        return
      }
      this.saldoTotal += this.agregarSaldo
      this.agregarSaldo = 0
      this.guardarSaldo()
    },

    async transferirSaldo() {
      if (this.montoTransferencia <= 0) {
        this.mensaje = 'El monto a transferir debe ser mayor que $0'
        return
      }

      if (this.montoTransferencia > this.saldoTotal) {
        this.mensaje = 'Transferencia fallida: Saldo insuficiente'
        return
      }

      const contacto = this.listaContactos.find(
        (contacto) => contacto.cuenta === this.contactoSeleccionado
      )
      if (!contacto) {
        this.mensaje = 'Contacto no encontrado'
        return
      }

      try {
        this.saldoTotal -= this.montoTransferencia
        contacto.saldo += this.montoTransferencia
        this.guardarSaldo();

        const response = await fetch(
          `https://667360316ca902ae11b407a5.mockapi.io/api/v1/users/contactos/${contacto.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(contacto)
          }
        )

        if (!response.ok) {
          throw new Error('Error al actualizar el contacto')
        }

        this.mensaje = `Transferencia exitosa: $${this.montoTransferencia} a ${contacto.nombre}`
        this.montoTransferencia = 0
      } catch (error) {
        this.mensaje = 'Error al realizar la transferencia'
        console.error(this.mensaje, error)
      }
    },
    actualizarSaldo() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.saldo !== undefined) {
        this.saldoTotal = currentUser.saldo;
      }
    },
    guardarSaldo() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if (currentUser) {
        currentUser.saldo = this.saldoTotal
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
      }
    }
  },
  mounted() {
    this.actualizarSaldo();
  },
}
</script>

<style scoped>
main {
  margin-left: 25%;
}

#saldoDisponible {
  margin-bottom: 2.5rem;
}

#cargaDeSaldo {
  margin-bottom: 2rem;
}

#submitTransferencia {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
</style>
