<template>
  <Navbar />
  <main>
    <h1><em>Bienvenido a tu perfil,</em> {{ this.usuario.username }}</h1>
    <ManejarSaldo :listaContactos="contactos" />
    <ListaContactos @lista-contactos="onListaContactos" />
    <ListaServicios :usuario="this.usuario" />
  </main>
</template>

<script>
import ManejarSaldo from '../components/ManejarSaldo.vue'
import ListaContactos from '../components/ListaContactos.vue'
import Navbar from '../components/Navbar.vue'
import ListaServicios from '@/components/ListaServicios.vue'
import { useUserStore } from '@/store/authStore'

export default {
  name: 'PerfilUsuario',
  components: {
    ManejarSaldo,
    ListaContactos,
    Navbar,
    ListaServicios
  },
  data() {
    return {
      contactos: [],
      usuario: {
        username: '',
        email: '',
        password: '',
        services: []
      }
    }
  },
  methods: {
    onListaContactos(contactos) {
      this.contactos = contactos
    },
    logout() {
      useUserStore().logout()
      this.$router.push({ name: 'Login' })
    },
    deleteAccount() {
      useUserStore().deleteAccount()
      this.$router.push({ name: 'Home' })
    },
    editarDatos() {
      const nuevoUsername = prompt('ingresa tu nuevo nombre de usuario: ')
      const nuevoEmail = prompt('ingresa tu nuevo mail: ')
      useUserStore().editUserData(this.usuario.username, nuevoUsername, nuevoEmail)
      this.usuario = useUserStore().getCurrentUser()
    },
    redirectPaginaPrincipal() {
      this.$router.push({ name: 'Perfil' })
    },
    redirectTransferencias() {
      this.$router.push({ name: 'Transferencias' })
    },
    redirectListaContactos() {
      this.$router.push({ name: 'Agenda' })
    }
  },
  mounted() {
    const usuarioActual = useUserStore().getCurrentUser()
    if (usuarioActual == null) {
      alert('Illegal Access Detected - HTTP 403 Forbidden')
      this.$router.push({ name: 'Login' })
    } else {
      this.usuario = usuarioActual
    }
  }
}
</script>

<style scoped>
/* main {
  padding: 4rem;
  margin: 0 15%;
  margin-bottom: 2%;
} */
</style>
