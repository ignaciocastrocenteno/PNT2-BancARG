<template lang="">
  <div>
    <h1>Iniciá sesión o creá una cuenta en BancARG</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" v-if="isRegister" type="email" placeholder="Correo electrónico" />
      <input v-model="username" type="text" placeholder="Nombre de usuario" />
      <input v-model="password" type="password" placeholder="contraseña" />
      <button type="submit" @click="irAPerfil">
        {{ isRegister ? 'Registrarse' : 'Iniciar sesión' }}
      </button>
      <p v-if="isRegister">
        Ya tenés una cuenta?
        <strong @click="cambiarFormulario" style="cursor: pointer">Iniciá sesión</strong>
      </p>
      <p v-else>
        No tenés una cuenta?
        <strong @click="cambiarFormulario" style="cursor: pointer">Registrate</strong>
      </p>
    </form>
  </div>
</template>
<script>
import { useUserStore } from '@/store/authStore'

export default {
  name: "userLogin",
  data() {
    return {
      isRegister: false,
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    cambiarFormulario() {
      this.isRegister = !this.isRegister
    },
    irAPerfil() {
      const userStore = useUserStore()
      if (this.isRegister) {
        const nuevoUsuario = {
          username: this.username,
          password: this.password,
          email: this.email
        }
        if (userStore.register(nuevoUsuario)) {
          this.$router.push({ name: 'Perfil' })
        }
      } else {
        const resultado = userStore.login(this.username, this.password)
        if (resultado) {
          this.$router.push({ name: 'Perfil' })
        }
      }
    }
  }
}
</script>
<style lang=""></style>
