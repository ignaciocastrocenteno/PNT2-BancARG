<template lang="">
  <div>
    <h1>Tus servicios</h1>
    <p v-if="usuario.services.length === 0">No pagaste ningún servicio todavía</p>
    <table v-else>
      <tr>
        <th>Nombre</th>
        <th>Monto</th>
        <th>Fecha</th>
        <th>Acciones</th>
      </tr>
      <tr v-for="(service, index) in usuario.services" :key="index">
        <td>{{ service.nombre }}</td>
        <td>{{ service.monto }}</td>
        <td>{{ service.fecha }}</td>
        <td>
          <button @click="editarServicio(index)">Editar</button>
          <button @click="eliminarServicio(index)">Eliminar</button>
        </td>
      </tr>
    </table>
    <button @click="mostrarFormulario">
      {{ mostrarFormServicio ? 'Cancelar' : 'Agregar servicio' }}
    </button>
    <input
      v-model="this.servicio.nombre"
      v-if="mostrarFormServicio"
      type="text"
      placeholder="Nombre del servicio"
    />
    <input
      v-model="this.servicio.monto"
      v-if="mostrarFormServicio"
      type="number"
      placeholder="Monto del servicio"
    />
    <input v-model="this.servicio.fecha" v-if="mostrarFormServicio" type="date" />
    <button v-if="mostrarFormServicio" @click="agregarServicio">Agregar</button>
  </div>
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
        useUserStore().addService(this.servicio)
        this.servicio = { nombre: '', monto: '', fecha: '' }
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

        useUserStore().editService(index, nuevoServicio)
      }
    },
    eliminarServicio(index) {
      useUserStore().removeService(index)
    }
  }
}
</script>
<style lang=""></style>
