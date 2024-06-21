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
      if (nuevoUsuario.username.trim() === '') {
        alert('nombre de usuario inválido')
      } else if (nuevoUsuario.password.trim() === '') {
        alert('contraseña inválida')
      } else if (nuevoUsuario.email.trim() === '') {
        alert('correo inválido')
      } else {
        localStorage.setItem(nuevoUsuario.username, JSON.stringify(nuevoUsuario))
        this.usuarioActual = nuevoUsuario
        return true
      }
    },
    logout() {
      this.usuarioActual = null
    }
  }
})
