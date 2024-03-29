import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/CardComponent')
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('./components/CreateComponent')
    },
    {
      path: '/view',
      name: 'view',
      component: () => import('./components/ListComponent')
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('./components/CardComponent')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('./components/EditComponent')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('./components/DetailComponent')
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('./components/Chart.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./components/TestComponent')
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
