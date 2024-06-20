<template lang="">
  <div>
    <h1>Bienvenido a tu perfil {{ this.usuario.username }}</h1>
    <button @click="logout">Logout</button>
  </div>
</template>
<script>
import { useUserStore } from '@/store/authStore'

export default {
  data() {
    return {
      usuario: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
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
<style lang=""></style>
