import { useAuth } from '@/stores/auth'

export const homeRoutes = [
  {
    path: '/',
    name: 'home',
    beforeEnter: () => {
      console.log(window.location)
      if (window.location.hostname !== 'packthemin.com' && window.location.hostname !== 'localhost')
      return { name: 'offer' }
    },
    component: () => import('@/views/home/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'client-login',
    component: () => import('@/views/client/ClientLogin.vue'),
  },
  {
    path: '/login-admin',
    name: 'admin-login',
    component: () => import('@/views/admin/AdminLogin.vue')
  },
]