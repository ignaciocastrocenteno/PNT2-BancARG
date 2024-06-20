<template lang="">
  <div>
    <h1 class="display-1">Iniciá sesión o creá una cuenta en BancARG</h1>
    <form>
      <input v-if="isRegister" type="email" placeholder="Correo electrónico" />
      <br />
      <input type="text" placeholder="Nombre de usuario" />
      <br />
      <input type="password" placeholder="contraseña" />
      <br />
      <button @click="irAPerfil">{{ isRegister ? 'Registrarse' : 'Iniciar sesión' }}</button>
      <br />
      <p v-if="isRegister">Ya tenés una cuenta? <strong @click="cambiarFormulario" style="cursor:pointer">Iniciá sesión</strong></p>
      <p v-else>No tenés una cuenta? <strong @click="cambiarFormulario" style="cursor:pointer">Registrate</strong></p>
    </form>
  </div>
</template>
<script>
export default {
  name: "userLogin",
  data() {
    return {
      isRegister: false
    }
  },
  created() {
    this.isRegister = this.modo;
  },
  methods: {
    cambiarFormulario() {
      this.isRegister = !this.isRegister
    },
    irAPerfil() {
      this.$router.push({ name: 'Perfil' })
    }
  }
}
</script>
<style lang=""></style>
