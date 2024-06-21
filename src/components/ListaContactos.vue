<template>
  <div>
    <h2>Lista de Contactos</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Alias</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contacto in contactos" :key="contacto.cuenta">
          <td>{{ contacto.nombre }}</td>
          <td>{{ contacto.alias }}</td>
          <td>
            <button @click="iniciarEditar(contacto.cuenta)">Editar</button>
            <button @click="eliminarContacto(contacto.cuenta)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="iniciarAgregar">Agregar Contacto</button>

    <div v-if="agregandoContacto">
      <h3>Agregar Contacto</h3>
      <input v-model="nuevoContacto.nombre" placeholder="Nombre">
      <input v-model="nuevoContacto.alias" placeholder="Alias">
      <input v-model="nuevoContacto.cuenta" placeholder="Cuenta">
      <button @click="agregarContacto">Agregar</button>
      <button @click="cancelarAgregar">Cancelar</button>
    </div>

    <div v-if="contactoEditadoOriginal">
      <h3>Editar Contacto</h3>
      <input v-model="contactoEditadoNuevo.nombre" placeholder="Nombre">
      <input v-model="contactoEditadoNuevo.alias" placeholder="Alias">
      <button @click="editarContacto">Guardar</button>
      <button @click="cancelarEditar">Cancelar</button>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      contactos: [],
      nuevoContacto: { nombre: '', alias: '', cuenta: '' },
      agregandoContacto: false,
      contactoEditadoNuevo: { nombre: '', alias: '' },
      contactoEditadoOriginal: null
    }
  },

  methods: {
    // OBTENER CONTACTOS
    async getContactos() {
      try {
        const response = await fetch('https://667360316ca902ae11b407a5.mockapi.io/api/v1/users/contactos')
        const data = await response.json()
        this.contactos = data
      } catch (error) {
        console.error('Error al obtener los contactos:', error)
      }
    },

    // AGREGAR CONTACTOS
    iniciarAgregar() {
      this.agregandoContacto = true
    },

    cancelarAgregar() {
      this.nuevoContacto.nombre = ''
      this.nuevoContacto.alias = ''
      this.nuevoContacto.cuenta = ''
      this.agregandoContacto = false
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
        this.contactos.push(data)
        this.cancelarAgregar()
      } catch (error) {
        console.error('Error al agregar contacto:', error)
        this.cancelarAgregar()
      }
    },

    // EDITAR CONTACTOS
    iniciarEditar(cuenta) {
      const contacto = this.contactos.find(contacto => contacto.cuenta === cuenta)
      if (contacto) {
        this.contactoEditadoOriginal = cuenta
        this.contactoEditadoNuevo = { ...contacto }
      }
    },

    cancelarEditar() {
      this.contactoEditadoNuevo = { nombre: '', alias: '' }
      this.contactoEditadoOriginal = null
    },

    async editarContacto() {
      const contacto = this.contactos.find(contacto => contacto.cuenta === this.contactoEditadoOriginal)

      try {
        const response = await fetch(`https://667360316ca902ae11b407a5.mockapi.io/api/v1/users/contactos/${contacto.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.contactoEditadoNuevo)
        })
        const data = await response.json()
        const index = this.contactos.findIndex(contacto => contacto.cuenta === this.contactoEditadoOriginal)
        if (index !== -1) {
          this.contactos[index] = data;
        }
        this.cancelarEditar()
      } catch (error) {
        console.error('Error al editar contacto:', error)
      }
    },

    // ELIMINAR CONTACTOS
    async eliminarContacto(cuenta) {
      const contacto = this.contactos.find(contacto => contacto.cuenta === cuenta)
      const confirmacion = window.confirm(`¿Estás seguro de eliminar a ${contacto.nombre}?`)

      if (confirmacion) {
        try {
          const response = await fetch(`https://667360316ca902ae11b407a5.mockapi.io/api/v1/users/contactos/${contacto.id}`, {
            method: 'DELETE'
          })
          if (response.ok) {
            this.contactos = this.contactos.filter(contacto => contacto.cuenta !== cuenta)
          } else {
            console.error('Error al eliminar contacto:', response.status)
          }
        } catch (error) {
          console.error('Error al eliminar contacto:', error)
        }
      }
    }
  },
  async mounted() {
    await this.getContactos()
    this.$emit('lista-contactos', this.contactos);
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid black;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>
