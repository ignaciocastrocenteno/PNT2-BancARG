<template>
  <nav class="navbar navbar-expand-lg text-bg-primary navbar-dark">
    <div class="container d-flex">
      <a class="navbar-brand" href="#" @click="redirectPaginaPrincipal">BancArg</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <!-- <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" @click="redirectPaginaPrincipal"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="redirectTransferencias">Transferir</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="redirectListaContactos">Agenda de Contactos</a>
          </li> -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Perfil
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#" @click="editarDatos">Editar Datos de Perfil</a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="deleteAccount">Eliminar Cuenta</a>
              </li>
              <li><a class="dropdown-item" href="#" @click="logout">Cerrar Sesión</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from '@/store/authStore'

export default {
  name: 'PerfilUsuario',
  data() {
    return {
      contactos: [],
      usuario: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onListaContactos(contactos) {
      this.contactos = contactos
    },
    logout() {
      useUserStore().logout()
      this.$router.push({ name: 'Home' })
    },
    deleteAccount() {
      useUserStore().deleteAccount()
      this.$router.push({ name: 'Home' })
    },
    editarDatos() {
      const nuevoUsername = prompt('ingresa tu nuevo nombre de usuario: ')
      const nuevoEmail = prompt('ingresa tu nuevo mail: ')
      useUserStore().editUserData(this.usuario.username, nuevoUsername, nuevoEmail)
      this.usuario = useUserStore().usuarioActual
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
#navbarNavDropdown {
  margin-right: 8%;
}
.navbar-brand {
  font-style: italic;
}
</style>
