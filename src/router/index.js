import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import Users from '@/components/Users.vue';
import Assets from '@/components/Assets.vue';
import ChangeLog from '@/components/ChangeLog.vue';
import PQView from '@/components/PQView.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/pqview',
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: { permission: 'add_users' },
    },
    {
      path: '/assets',
      name: 'assets',
      component: Assets,
      meta: { permission: 'manage_assets' },
    },
    {
      path: '/changelog',
      name: 'changelog',
      component: ChangeLog,
      meta: { permission: 'view_changelog' },
    },
    {
      path: '/pqview',
      name: 'pqview',
      component: PQView,
      meta: { permission: 'access_pqview' },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiredPermission = to.meta.permission;
  const userHasPermission = store.getters.hasPermission(requiredPermission);
  if (requiredPermission && !userHasPermission) {
    next('/');
  } else {
    next();
  }
});

export default router;
