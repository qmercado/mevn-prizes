import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

import { createRouter, createWebHashHistory } from 'vue-router';

import Login from '@/views/Login';
import Register from '@/views/Register';
import Home from '@/views/Home';
import PrizeItemDetails from '@/components/PrizeItemDetails';

import axios from 'axios';

axios.interceptors.request.use((config) => {
    if (config.url.includes('login') || config.url.includes('register')) {
      return config;
    }
    return {
      ...config, 
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    }
  }, (error) => {
    return Promise.reject(error);
});

const beforeEnter = (to, from, next) => {
    const token = localStorage.getItem('token');
    if (token) {
        next()
        return true;
    }
    next({ path: '/' });
    return false
}

const routes = [
    { 
      path: '/',
      name: 'Login',
      component: Login 
    },
    { 
      path: '/register', 
      name: 'Register', 
      component: Register 
    },
    { 
      path: '/home', 
      name: 'Home',
      component: Home, 
      beforeEnter
    },
    { 
      path: '/prizedetails/:id', 
      name: 'PrizeItemdetails', 
      component: PrizeItemDetails,
      beforeEnter
    },
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  

const app = createApp(App);
app.use(router);
app.mount('#app')