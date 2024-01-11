export const homeRoutes = [
  {
    path: '/',
    name: 'home',
    beforeEnter: () => {
      console.log(window.location)
      if (window.location.hostname !== 'packthemin' && window.location.hostname !== 'localhost')
      return { name: 'offer' }
    },
    component: () => import('@/views/home/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'user-login',
    component: () => import('@/views/user/UserLogin.vue'),
  },
  {
    path: '/login-admin',
    name: 'admin-login',
    component: () => import('@/views/admin/AdminLogin.vue')
  },
]