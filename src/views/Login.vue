<template lang="">
  <main>
    <section id="userAccessPanel">
      <h1>Iniciá sesión o creá una cuenta en BancArg</h1>
      <div id="poweringTechnology">
        <h4>Powered by</h4>
        <div>
          <img
            src="https://imgs.search.brave.com/DymJcAvt980sV7TcClrk6i2JOaHNettyKZXaEOquYbI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9sb2dv/c3BuZy5vcmcvZG93/bmxvYWQvc2FudGFu/ZGVyL2xvZ28tc2Fu/dGFuZGVyLTEwMjQu/cG5n"
            alt="santander-rio-logo"
          />
        </div>
      </div>
      <form @submit.prevent="handleSubmit" id="userForm">
        <input
          v-model="email"
          v-if="isRegister"
          type="email"
          placeholder="Correo electrónico"
          class="form-control"
        />
        <input
          v-model="username"
          type="text"
          placeholder="Nombre de usuario"
          class="form-control"
        />
        <input v-model="password" type="password" placeholder="Contraseña" class="form-control" />
        <button type="submit" @click="irAPerfil" id="submitButton" class="btn btn-outline-light">
          {{ isRegister ? 'Registrarse' : 'Iniciar sesión' }}
        </button>
        <p v-if="isRegister" class="bankingFeature">
          Ya tenés una cuenta?
          <strong @click="cambiarFormulario" style="cursor: pointer" class="bankingFeatureFunction"
            >Iniciá sesión</strong
          >
        </p>
        <p v-else class="bankingFeature">
          ¿No tenés una cuenta?
          <strong @click="cambiarFormulario" style="cursor: pointer" class="bankingFeatureFunction"
            >Registrate</strong
          >
        </p>
        <p class="bankingFeature">
          Olvidaste tu contraseña?
          <strong @click="cambiarContrasenia" style="cursor: pointer" class="bankingFeatureFunction"
            >Cambiar contraseña</strong
          >
        </p>
      </form>
    </section>
  </main>
</template>
<script>
import { useUserStore } from '@/store/authStore'

export default {
  name: 'userLogin',
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
    },
    cambiarContrasenia() {
      const username = prompt('ingresa tu nombre de usuario: ')
      const email = prompt('ingrese su email: ')
      useUserStore().changePassword(username, email)
    }
  },
  mounted() {
    const usuarioActual = useUserStore().getCurrentUser()
    if (usuarioActual) {
      this.$router.push({ name: 'Perfil' })
    }
  }
}
</script>
<style scoped>
main {
  width: 100vw;
  height: 100vh;
  background-color: #0541d6;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#userAccessPanel {
  border: 2px solid grey;
  border-radius: 2em;
  padding: 4rem;
  padding-bottom: 0;
  max-height: 35rem;
}

#poweringTechnology {
  margin-top: 0.2rem;
  height: 15%;
  display: flex;
}

#poweringTechnology img {
  margin-left: 0.2rem;
  position: relative;
  bottom: 5.4rem;
  max-height: 12rem;
}

#userForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#userForm input {
  width: 30%;
  margin-top: 1rem;
}

#submitButton {
  margin-top: 1.5rem;
  margin-bottom: 3rem;
}

.bankingFeature {
  margin-top: -0.5rem;
}

.bankingFeatureFunction:hover {
  color: red;
  transition: all 0.5s;
}
</style>
