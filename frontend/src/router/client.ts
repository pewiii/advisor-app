import { useAuth } from '@/stores/auth'
export const clientRoutes = [
  {
    path: '/client',
    name: 'client',
    component: () => import('@/views/client/ClientDashboard.vue'),
    beforeEnter: () => {
      const auth = useAuth()
      if(auth.user.userType !== 'client') {
        return { name: 'home' }
      }
    },
    children: []
  },
]