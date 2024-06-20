<template>
  <div>
    <div>
      <h1>Saldo disponible: ${{ saldoDisponible }}</h1>
    </div>
    <div>
      <h2>Cargar saldo</h2>
      <input v-model.number="montoASumar" type="number" placeholder="Monto a sumar" min="0" />
      <br />
      <button @click="sumarSaldo">Cargar</button>
    </div>
    <br />
    <br />
    <div>
      <h2>Transferir saldo</h2>
      <input v-model.number="montoTransferencia" type="number" placeholder="Monto a transferir" min="0" />
      <br />
      <br />
      <label for="contacto">Selecciona un contacto:</label>
      <br />
      <select id="contacto" v-model="contactoSeleccionado">
        <option v-for="contacto in contactos" :key="contacto.id" :value="contacto.id">
          {{ contacto.nombre }}
        </option>
      </select>
      <br />
      <br />
      <button @click="transferirMonto">Transferir</button>
      <br />
      <p>{{ mensaje }}</p>
    </div>
    <br />
    <br />
    <div>
      <h2>Agregar Contacto</h2>
      <input v-model="nuevoContacto.nombre" type="text" placeholder="Insertar Nombre" />
      <input v-model="nuevoContacto.cuenta" type="number" placeholder="Nro Cuenta" />
      <br />
      <button @click="agregarContacto">Agregar Contacto</button>
      <br />
      <br />

    </div>

    <div>
      <h2>Editar Contacto</h2>
      <select v-model="contactoEditarId">
        <option v-for="contacto in contactos" :key="contacto.id" :value="contacto.id">
          {{ contacto.nombre }}
        </option>
      </select>
      <input v-model="contactoEditado.nombre" type="text" placeholder="Insertar Nombre" />
      <br />
      <button @click="editarContacto">Editar Contacto</button>
      <br />
      <br />
    </div>

    <div>
      <h2>Eliminar Contacto</h2>
      <select v-model="contactoEliminarId">
        <option v-for="contacto in contactos" :key="contacto.id" :value="contacto.id">
          {{ contacto.nombre }}
        </option>
      </select>
      <br />
      <button @click="eliminarContacto">Eliminar Contacto</button>
      <br />
      <br />
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      saldoDisponible: 1000,
      montoASumar: 0,
      montoTransferencia: 0,
      contactoSeleccionado: null,
      contactos: [],
      mensaje: '',
      nuevoContacto: { nombre: '', cuenta: '' },
      contactoEditarId: null,
      contactoEditado: { nombre: '' },
      contactoEliminarId: null
    }
  },
  methods: {
    // async obtenerSaldo() {
    //   try {
    //     const response = await fetch('https://667360316ca902ae11b407a5.mockapi.io/api/v1/users/users/1')
    //     const data = await response.json()
    //     console.log(data)
    //     this.saldoDisponible = data.money
    //   } catch (error) {
    //     console.error('Error al obtener el saldo:', error)
    //   }
    // },
    async obtenerContactos() {
      try {
        const response = await fetch('https://667360316ca902ae11b407a5.mockapi.io/api/v1/users/contactos')
        const data = await response.json()
        console.log(data)
        this.contactos = data
      } catch (error) {
        console.error('Error al obtener los contactos:', error)
      }
    },
    transferirMonto() {
      if (this.montoTransferencia <= 0) {
        this.mensaje = 'El monto a transferir debe ser mayor que $0'
        return
      }

      if (this.montoTransferencia > this.saldoDisponible) {
        this.mensaje = 'Transferencia fallida: Saldo insuficiente'
        return
      }

      this.saldoDisponible -= this.montoTransferencia
      this.mensaje = `Transferencia exitosa: $${this.montoTransferencia} a ${this.obtenerNombreContacto(this.contactoSeleccionado)}`
      this.montoTransferencia = 0
    },
    obtenerNombreContacto(id) {
      const contacto = this.contactos.find(contacto => contacto.id === id)
      console.log('CONTACTO', contacto.nombre);
      return contacto.nombre
    },
    sumarSaldo() {
      if (this.montoASumar <= 0) {
        this.mensajeSuma = 'El monto debe ser mayor a $0'
        return
      }
      this.saldoDisponible += this.montoASumar
      this.montoASumar = 0
    },
    async agregarContacto() {
      try {
        const response = await fetch('https://667360316ca902ae11b407a5.mockapi.io/api/v1/users/contactos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.nuevoContacto)
        })
        const data = await response.json()
        console.log('Nuevo contacto agregado:', data)
        this.contactos.push(data)
        this.nuevoContacto.nombre = ''
        this.nuevoContacto.cuenta = ''
      } catch (error) {
        console.error('Error al agregar contacto:', error)
      }
    },

    async editarContacto() {
      if (!this.contactoEditarId) {
        console.error('ID de contacto a editar no especificado')
        return
      }

      try {
        const response = await fetch(`https://667360316ca902ae11b407a5.mockapi.io/api/v1/users/contactos/${this.contactoEditarId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.contactoEditado)
        })
        const data = await response.json()
        console.log('Contacto editado:', data)
        const index = this.contactos.findIndex(contacto => contacto.id === this.contactoEditarId)
        if (index !== -1) {
          this.contactos[index] = data
        }
        this.contactoEditarId = null
        this.contactoEditado.nombre = ''
      } catch (error) {
        console.error('Error al editar contacto:', error)
      }
    },

    async eliminarContacto() {
      if (!this.contactoEliminarId) {
        console.error('ID de contacto a eliminar no especificado')
        return
      }

      try {
        const response = await fetch(`https://667360316ca902ae11b407a5.mockapi.io/api/v1/users/contactos/${this.contactoEliminarId}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          console.log('Contacto eliminado')
          this.contactos = this.contactos.filter(contacto => contacto.id !== this.contactoEliminarId)
          this.contactoEliminarId = null
        } else {
          console.error('Error al eliminar contacto:', response.status)
        }
      } catch (error) {
        console.error('Error al eliminar contacto:', error)
      }
    }
  },
  async mounted() {
    // await this.obtenerSaldo()
    await this.obtenerContactos()
  }
}
</script>

<style scoped>
/* Agrega estilos aquí si es necesario */
</style>