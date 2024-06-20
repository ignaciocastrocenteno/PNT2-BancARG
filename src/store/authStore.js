import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    usuarioActual: null
  }),
  actions: {
    login(nombreUsuario, passwordIngresada) {
      const usuario = JSON.parse(localStorage.getItem(nombreUsuario))
      if (usuario != null) {
        if (passwordIngresada == usuario.password) {
          this.usuarioActual = usuario
          return true
        } else {
          alert('contraseña incorrecta')
        }
      } else {
        alert('usuario invalido')
      }
    },
    register(nuevoUsuario) {
      localStorage.setItem(nuevoUsuario.username, JSON.stringify(nuevoUsuario))
    },
    logout() {},
    getActualUser() {}
  }
})
