import { createRouter, createWebHistory } from 'vue-router'
import { adminRoutes } from './admin'
import { homeRoutes } from './home'
import { userRoutes } from './user'
// import ClientView from '@/views/client/ClientView.vue'
// import HomeView from '@/views/HomeView.vue'
// import DashboardView from '@/views/user/DashboardView.vue'
// import LoginView from '@/views/user/LoginView.vue'
// import SetupView from '@/views/user/SetupView.vue'

// import AdminHome from '@/views/admin/AdminHome.vue'

// import AdminLogin from '@/views/admin/AdminLogin.vue'

// import CampaignAddEdit from '@/views/admin/CampaignAddEdit.vue'
// import ClientAddEdit from '@/views/admin/ClientAddEdit.vue'
// import TemplateAddEdit from '@/views/admin/TemplateAddEdit.vue'
// import UserAddEdit from '@/views/admin/UserAddEdit.vue'
// import OfferView from '@/views/offer/OfferView.vue'

// import ListView from '@/views/admin/Listview.vue'

//   component: () => import('@/views/staff/campaigns/AddEdit.vue'),

// import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRoutes,
    ...adminRoutes,
    ...userRoutes,
      //   {
      //     path: 'setup/:clientId/:token',
      //     name: 'setup',
      //     component: SetupView
      //   },
      //   {
      //     path: 'dashboard',
      //     name: 'dashboard',
      //     component: DashboardView
      //   },
    {
      path: '/offer',
      name: 'offer',
      component: () => import('@/views/offer/OfferView.vue'),
    }
  ]
})
    
// router.beforeEach(async (to, from) => {
//   const auth = useAuthStore()
//   const name = to.name?.toString() || ''

//   if (!auth.user && !['home', 'setup', 'login', 'admin-login'].includes(name)) {
//     return { name: 'home' }
//   }

//   // if (name.includes('admin') && !auth.user) {
//   //   return { name: 'admin-login' }
//   // }

//   // if (!name.includes('login') && name !== 'home' && !auth.user) {
//   //   return { name: 'home' }
//   // }

//   // if (name === 'admin-dashboard') {
//   //   return { name: 'admin-campaigns' }
//   // }


//   // if (name.includes('admin') && name !== 'admin-login') {
//   //   if (!auth.isAuthenticated || !auth.isAdmin) {
//   //     return { name: 'admin-login' }
//   //   }
//   // }

//   // if (auth.isAuthenticated && auth.isAdmin && !name.includes('admin')) {
//   //   return { name: 'admin-dashboard' }
//   // }


//   // if (name === 'dashboard' && !auth.isAuthenticated) {
//   //   return { name: 'login'}
//   // }





// })

export default router
