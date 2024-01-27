import { useAuth } from '@/stores/auth'
export const clientRoutes = [
  {
    path: '/client',
    name: 'client',
    component: () => import('@/views/client/ClientDashboard.vue'),
    beforeEnter: () => {
      const auth = useAuth()
      if(!auth.user || auth.user.userType !== 'client') {
        return { name: 'home' }
      }
    },
    children: [
      {
        path: 'clientDashboard',
        name: 'client-overview',
        component: () => import('@/views/client/ClientOverview.vue'),
      }
    ]
  },
]