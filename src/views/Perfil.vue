<template lang="">
  <div>
    <h1>Bienvenido a tu perfil {{this.usuario.username}}</h1>
  </div>
</template>
<script>
import { useUserStore } from '@/store/authStore';

export default {
  data() {
    return {
      usuario:useUserStore().usuarioActual
    }
  }
}
</script>
<style lang=""></style>
