<template>
    <div>
        <h1>Bienvenido a tu perfil {{ this.usuario.username }}</h1>
        <button @click="logout">Logout</button>
        <ManejarSaldo :listaContactos="contactos" />
        <ListaContactos @lista-contactos="onListaContactos" />
    </div>
</template>

<script>
import { useUserStore } from '@/store/authStore'

import ManejarSaldo from '../components/ManejarSaldo.vue';
import ListaContactos from '../components/ListaContactos.vue';

export default {
    components: {
        ManejarSaldo,
        ListaContactos
    },
    data() {
        return {
            usuario: {
                username: '',
                email: '',
                password: ''
            },
            contactos: []
        }
    },
    methods: {
        logout() {
            useUserStore().logout()
            this.$router.push({ name: 'Home' })
        },
        onListaContactos(contactos) {
            this.contactos = contactos;
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
