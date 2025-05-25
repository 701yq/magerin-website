import { createRouter, createWebHistory } from 'vue-router'

// Views
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Users from '@/views/Users.vue'
import Reports from '@/views/Reports.vue'
import ReportsPending from '@/views/ReportsPending.vue'
import ReportsCompleted from '@/views/ReportsCompleted.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    meta: { requiresAuth: true }
  },
  {
    path: '/reports/pending',
    name: 'ReportsPending',
    component: ReportsPending,
    meta: { requiresAuth: true }
  },
  {
    path: '/reports/completed',
    name: 'ReportsCompleted',
    component: ReportsCompleted,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Middleware auth check
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('adminToken')
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
