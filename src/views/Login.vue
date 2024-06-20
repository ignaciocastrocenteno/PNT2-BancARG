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
export default {
  data() {
    return {
      isRegister: false,
      email: '',
      username: '',
      password: ''
    }
  },
  created() {
    this.isRegister = this.modo
  },
  methods: {
    cambiarFormulario() {
      this.isRegister = !this.isRegister
    },
    irAPerfil() {
      if (this.isRegister) {
        //hacer el register
        const nuevoUser = {
          email: this.email,
          username: this.username,
          password: this.password
        }

        localStorage.setItem(nuevoUser.username, JSON.stringify(nuevoUser))
        this.$router.push({ name: 'Perfil' })
      } else {
        //hacer el login
        const usuario = JSON.parse(localStorage.getItem(this.username))
        if (usuario != null) {
          if (usuario.password != this.password) {
            alert('contraseña incorrecta')
          } else {
            this.$router.push({ name: 'Perfil' })
          }
        } else {
          alert('usuario invalido')
        }
      }
    }
  }
}
</script>
<style lang=""></style>
