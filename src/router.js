import VueRouter from 'vue-router';

import Login from './component/Login';
import Register from './component/Register';
import ListEntry from './component/ListEntry';
import EditEntry from './component/EditEntry';

export const routes = [
  { path: '/login', component: Login },
  { path: '/entry', component: ListEntry, alias: '/' },
  { path: '/entry/create', component: EditEntry },
  { path: '/register', component: Register},
];

const router = new VueRouter({routes});

export default router;