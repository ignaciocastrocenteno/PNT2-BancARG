<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <label>Username:</label>
            <input type="text" v-model="username" />
            <br />
            <label>Password:</label>
            <input type="password" v-model="password" />
            <br />
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a @click="showCreateAccountForm">Create one</a></p>

        <h2 v-if="showCreateAccountForm">Create Account</h2>
        <form @submit.prevent="handleCreateAccount" v-if="showCreateAccountForm">
            <label>Username:</label>
            <input type="text" v-model="newUsername" />
            <br />
            <label>Password:</label>
            <input type="password" v-model="newPassword" />
            <br />
            <button type="submit">Create Account</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

export default {
    setup() {
        const username = ref('');
        const password = ref('');
        const newUsername = ref('');
        const newPassword = ref('');
        const showCreateAccountForm = ref(false);
        const userStore = useUserStore();

        const handleSubmit = async () => {
            try {
                const user = await userStore.authenticate(username.value, password.value);
                // login successful, redirect to protected route
            } catch (error) {
                console.error(error);
            }
        };

        const handleCreateAccount = async () => {
            try {
                await userStore.register(newUsername.value, newPassword.value);
                // create account successful, redirect to login form
            } catch (error) {
                console.error(error);
            }
        };

        return {
            username,
            password,
            newUsername,
            newPassword,
            showCreateAccountForm,
            handleSubmit,
            handleCreateAccount,
        };
    },
};
</script>