import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Perfil from '../views/Perfil.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: {
      requireAuth: true,
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
  // const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  // if (to.meta.requireAuth && !isAuthenticated) {
  //   next({ name: "Login" });
  // } else {
  //   next();
  // }
// });

export default router
