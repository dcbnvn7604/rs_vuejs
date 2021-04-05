import VueRouter from 'vue-router';

import Login from './component/Login.vue';
import Home from './component/Home.vue';

export const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
];

const router = new VueRouter({routes});

export default router;