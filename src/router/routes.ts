import { RouteConfig } from 'vue-router';
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('src/pages/Index.vue'),
    meta: {
      requiresAuth: true,
      permission: 'user'
    }
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('src/pages/Success.vue'),
    meta: {
      requiresAuth: true,
      permission: 'user'
    }
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
