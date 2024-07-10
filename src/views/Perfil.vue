<template>
  <div>
    <Navbar />
    <div class="perfil-container">
      <h1><em>Bienvenido a tu perfil,</em> {{ usuario.username }}</h1>
      <div class=" perfil-content">
        <ManejarSaldo :listaContactos="contactos" />
        <ListaContactos @lista-contactos="onListaContactos" />
        <ListaServicios :usuario="usuario" />
      </div>
    </div>
  </div>
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
.perfil-container {
  /* background-color: #3f4aeb; */
  /* Fondo azul */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.perfil-content {
  background-color: #3f4aeb;
  text-align: center;
  color: white;
  padding: 2rem;
  /* background: rgba(255, 255, 255, 0.1); */
  /* Fondo transparente para los contenidos */
  border-radius: 8px;
  width: 80%;
  max-width: 900px;
}

h1 {
  margin-bottom: 2rem;
}

button {
  margin: 1rem;
}
</style>
