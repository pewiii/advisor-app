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
  }
]