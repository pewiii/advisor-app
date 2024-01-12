import { useAuth } from '@/stores/auth'
export const userRoutes = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/UserDashboard.vue'),
    beforeEnter: () => {
      const auth = useAuth()
      if(auth.user.userType !== 'user') {
        return { name: 'home' }
      }
    },
    children: []
  },
  {
    path: '/setup/:clientId/:token',
    name: 'setup',
    component: () => import('@/views/user/UserSetup.vue')
  },
]