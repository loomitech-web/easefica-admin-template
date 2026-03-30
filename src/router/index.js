import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Home',
      event: 'navigate_home'
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Login',
      event: 'navigate_login'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: 'About',
      event: 'navigate_about'
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/search',
    name: 'Search',
    meta: {
      title: 'Search',
      event: 'navigate_search'
    },
    component: () => import('../views/Search.vue')
  },
  {
    path: '/services',
    name: 'Services',
    meta: {
      title: 'Services',
      event: 'navigate_services'
    },
    component: () => import('../views/Services.vue')
  },
  {
    path: '/outstanding-issues',
    name: 'Outstanding Issues',
    meta: {
      title: 'Outstanding Issues',
      event: 'navigate_outstanding_issues'
    },
    component: () => import('../views/OutstandingIssues.vue')
  },
  {
    path: '/manage-users',
    name: 'Users',
    meta: {
      title: 'Users',
      event: 'navigate_users'
    },
    component: () => import('../views/ManageUsers.vue')
  },
  {
    path: '/manage-ai',
    name: 'Manage AI',
    meta: {
      title: 'Manage AI',
      event: 'navigate_manage_ai'
    },
    component: () => import('../views/ManageAI.vue')
  },
  {
    path: '/incomplete',
    name: 'Incomplete',
    meta: {
      title: 'Incomplete',
      event: 'navigate_incomplete'
    },
    component: () => import('../views/Incomplete.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !Vue.prototype.$authLock.isAuthorised()) {
    next({ name: 'Login' });
  }
  else if(to.path == '/') {
    next({ path : '/services'});
  }
  else { 
    next();
  }
})

const DEFAULT_TITLE = "easefica";

router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
      document.title = to.meta.title || DEFAULT_TITLE;
      if(Vue.prototype.$analytics) {
        Vue.prototype.$analytics.setCurrentScreen(to.meta.title);
        Vue.prototype.$analytics.logEvent(to.meta.event);
      }
  });
});

export default router
