import { createRouter, createWebHistory } from 'vue-router'
// import ClientView from '@/views/client/ClientView.vue'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/user/DashboardView.vue'
import LoginView from '@/views/user/LoginView.vue'
import SetupView from '@/views/user/SetupView.vue'

import AdminHome from '@/views/admin/AdminHome.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminLogin from '@/views/admin/AdminLogin.vue'

//   component: () => import('@/views/staff/campaigns/AddEdit.vue'),

import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'setup/:clientId/:token',
          name: 'setup',
          component: SetupView
        },
        {
          path: 'login',
          name: 'login',
          component: LoginView
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminHome,
      children: [
        {
          path: 'login',
          name: 'admin-login',
          component: AdminLogin
        },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: AdminDashboard
        }
      ]
    }
  ]
})
    
router.beforeEach(async (to, from) => {
  const auth = useAuthStore()
  const name = to.name?.toString() || ''
  if (name.includes('admin') && name !== 'admin-login') {
    if (!auth.isAuthenticated || !auth.isAdmin) {
      return { name: 'admin-login' }
    }
  }

  if (auth.isAuthenticated && auth.isAdmin && !name.includes('admin')) {
    return { name: 'admin-dashboard' }
  }


  if (name === 'dashboard' && !auth.isAuthenticated) {
    return { name: 'login'}
  }


  // if (name !== 'login' && name !== 'setup' && !name.includes('admin') && !auth.isAuthenticated) {
  //   return { name: 'login' }
  // }



})

export default router
