<template>
    <div>
        <h1>Bienvenido a tu perfil</h1>
        <ManejarSaldo :listaContactos="contactos" />
        <ListaContactos @lista-contactos="onListaContactos" />
    </div>
</template>

<script>
import ManejarSaldo from '../components/ManejarSaldo.vue';
import ListaContactos from '../components/ListaContactos.vue';

export default {
    components: {
        ManejarSaldo,
        ListaContactos
    },
    data() {
        return {
            contactos: []
        }
    },
    methods: {
        onListaContactos(contactos) {
            this.contactos = contactos;
        }
    },
}
</script>

<style>
/* Estilos para Perfil */
</style>
