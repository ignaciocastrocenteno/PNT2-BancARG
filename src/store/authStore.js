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
          localStorage.setItem('currentUser', JSON.stringify(this.usuarioActual))
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
        localStorage.setItem('currentUser', JSON.stringify(nuevoUsuario))
        return true
      }
    },
    logout() {
      this.usuarioActual = null
      localStorage.removeItem('currentUser')
    },
    deleteAccount() {
      const usuarioABorrar = JSON.parse(localStorage.getItem('currentUser'))
      this.usuarioActual = null
      localStorage.removeItem(usuarioABorrar.username)
      localStorage.removeItem('currentUser')
    },
    changePassword(username, email) {
      const usuario = JSON.parse(localStorage.getItem(username))
      if (usuario != null) {
        if (usuario.email == email) {
          const nuevaContrasenia = prompt('ingresa tu nueva contrasenia: ')
          usuario.password = nuevaContrasenia
          localStorage.setItem(usuario.username, JSON.stringify(usuario))
          localStorage.setItem('currentUser', JSON.stringify(usuario))
          alert('contraseña cambiada')
        } else {
          alert('email incorrecto')
        }
      } else {
        alert('no hay ningun usuario con esas credenciales')
      }
    },
    editUserData(usernameActual, nuevoUsername, nuevoEmail) {
      const usuario = JSON.parse(localStorage.getItem(usernameActual))
      usuario.email = nuevoEmail
      usuario.username = nuevoUsername
      this.usuarioActual = usuario
      localStorage.removeItem(usernameActual)
      localStorage.setItem(nuevoUsername, JSON.stringify(this.usuarioActual))
      localStorage.setItem('currentUser', JSON.stringify(this.usuarioActual))
    },
    getCurrentUser() {
      let usuarioARetornar = this.usuarioActual;
      if(usuarioARetornar == null){
        usuarioARetornar = JSON.parse(localStorage.getItem('currentUser'))
      }
      return usuarioARetornar
    }
  }
})
