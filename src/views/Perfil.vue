<template>
  <div>
    <h1>Bienvenido a tu perfil {{ this.usuario.username }}</h1>
    <ManejarSaldo :listaContactos="contactos" />
    <ListaContactos @lista-contactos="onListaContactos" />
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import ManejarSaldo from '../components/ManejarSaldo.vue';
import ListaContactos from '../components/ListaContactos.vue';
import { useUserStore } from "@/store/authStore";

export default {
  name: "PerfilUsuario",
  components: {
    ManejarSaldo,
    ListaContactos
  },
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
      this.contactos = contactos;
    },
    logout() {
      useUserStore().logout()
      this.$router.push({ name: 'Home' })
    }
  },
  mounted() {
    const usuarioActual = useUserStore().usuarioActual
    if (usuarioActual == null) {
      this.$router.push({ name: 'Login' })
    } else {
      this.usuario = usuarioActual
    }
  }
}
</script>

<style></style>
