<template lang="">
  <main>
    <h1>Tus servicios</h1>
    <p v-if="usuario.services.length === 0">No pagaste ningún servicio todavía</p>
    <div v-else class="servicios-tabla">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Monto (ARS)</th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(service, index) in usuario.services" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ service.nombre }}</td>
            <td>$ {{ service.monto }}</td>
            <td>{{ service.fecha }}</td>
            <td class="celda-acciones">
              <button @click="editarServicio(index)" class="boton-accion">Editar</button>
              <button @click="eliminarServicio(index)" class="boton-accion">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="mostrarFormulario" class="servicio">
      {{ mostrarFormServicio ? 'Cancelar' : 'Agregar servicio' }}
    </button>
    <input
      v-model="servicio.nombre"
      v-if="mostrarFormServicio"
      type="text"
      placeholder="Nombre del servicio"
    />
    <input
      v-model="servicio.monto"
      v-if="mostrarFormServicio"
      type="number"
      placeholder="Monto del servicio"
    />
    <input v-model="servicio.fecha" v-if="mostrarFormServicio" type="date" />
    <button v-if="mostrarFormServicio" @click="agregarServicio">Agregar</button>
  </main>
</template>
<script>
import { useUserStore } from '@/store/authStore'

export default {
  props: {
    usuario: {
      type: Object
    }
  },
  data() {
    return {
      mostrarFormServicio: false,
      servicio: {
        nombre: '',
        monto: '',
        fecha: ''
      }
    }
  },
  methods: {
    mostrarFormulario() {
      this.mostrarFormServicio = !this.mostrarFormServicio
    },
    agregarServicio() {
      if (
        this.servicio.nombre.trim() === '' ||
        this.servicio.monto <= 0 ||
        this.servicio.fecha.trim() === ''
      ) {
        alert('completa todos los campos')
      } else {
        useUserStore().addService(this.servicio) // Usar el método de la tienda para agregar el servicio
        this.servicio = { nombre: '', monto: '', fecha: '' } // Reiniciar el objeto servicio
      }
    },
    editarServicio(index) {
      const nuevoNombre = prompt('Ingresa el nuevo nombre del servicio')
      const nuevoMonto = prompt('Ingresa el nuevo monto del servicio')
      const nuevaFecha = prompt('Ingresa la nueva fecha del servicio')

      if (nuevoNombre == '' || nuevoMonto == '' || nuevaFecha == '') {
        alert('Completá todos los campos')
      } else {
        const nuevoServicio = {
          nombre: nuevoNombre,
          monto: nuevoMonto,
          fecha: nuevaFecha
        }

        useUserStore().editService(index, nuevoServicio) // Usar el método de la tienda para editar el servicio
      }
    },
    eliminarServicio(index) {
      useUserStore().removeService(index) // Usar el método de la tienda para eliminar el servicio
    }
  }
}
</script>

<style scoped>
main {
  margin: 0 25%;
  margin-bottom: 3rem;
}
.servicios-tabla {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
}
.celda-acciones {
  position: relative;
  left: 1rem;
}
.filaServicio {
  display: block;
}
</style>
