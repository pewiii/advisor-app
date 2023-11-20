import { createRouter, createWebHistory } from 'vue-router'
// import ClientView from '@/views/client/ClientView.vue'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/user/DashboardView.vue'
import LoginView from '@/views/user/LoginView.vue'
import SetupView from '@/views/user/SetupView.vue'

import AdminHome from '@/views/admin/AdminHome.vue'
// import AdminDashboard from '@/views/admin/AdminDashboard.vue'
// import AdminCampaigns from '@/views/admin/AdminCampaigns.vue'
// import AdminClients from '@/views/admin/AdminClients.vue'
// import AdminTemplates from '@/views/admin/AdminTemplates.vue'
// import AdminUsers from '@/views/admin/AdminUsers.vue'
import AdminLogin from '@/views/admin/AdminLogin.vue'

import CampaignHome from '@/views/admin/campaigns/CampaignHome.vue'
import CampaignList from '@/views/admin/campaigns/CampaignList.vue'
import CampaignAddEdit from '@/views/admin/campaigns/CampaignAddEdit.vue'

import ClientList from '@/views/admin/clients/ClientList.vue'
import ClientAddEdit from '@/views/admin/clients/ClientAddEdit.vue'

import TemplateList from '@/views/admin/templates/TemplateList.vue'
import TemplateAddEdit from '@/views/admin/templates/TemplateAddEdit.vue'

import UserList from '@/views/admin/users/UserList.vue'
import UserAddEdit from '@/views/admin/users/UserAddEdit.vue'

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
              path: 'campaigns',
              component: CampaignHome,
              children: [
                {
                  path: '/',
                  name: 'admin-campaigns',
                  component: CampaignList
                },
                {
                  path: 'add/:clientId',
                  name: 'admin-campaigns-add',
                  component: CampaignAddEdit
                },
                {
                  path: 'edit/:campaignId',
                  name: 'admin-campaigns-edit',
                  component: CampaignAddEdit
                }
              ]
            },
            {
              path: 'clients',
              name: 'admin-clients',
              component: ClientList,
              children: [
                {
                  path: '/:id',
                  name: 'admin-client-addEdit',
                  component: ClientAddEdit
                }
              ]
            },
            {
              path: 'templates',
              name: 'admin-templates',
              component: TemplateList,
              children: [
                {
                  path: '/:id',
                  name: 'admin-template-addEdit',
                  component: TemplateAddEdit
                }
              ]
            },
            {
              path: 'users',
              name: 'admin-users',
              component: UserList,
              children: [
                {
                  path: '/:id',
                  name: 'admin-user-addEdit',
                  component: UserAddEdit
                }
              ]
            },
            // {
            //   path: 'dashboard',
            //   name: 'admin-dashboard',
            //   component: AdminDashboard,
            //   children: [
                // {
                //   path: 'clients',
                //   name: 'admin-clients',
                //   component: AdminClients,
                // },
                // {
                //   path: 'templates',
                //   name: 'admin-templates',
                //   component: AdminTemplates,
                // },
                // {
                //   path: 'users',
                //   name: 'admin-users',
                //   component: AdminUsers,
                // }
              // ]
            // },
          ]
        }
      ]
    },
  ]
})
    
router.beforeEach(async (to, from) => {
  const auth = useAuthStore()
  const name = to.name?.toString() || ''

  // if (name.includes('admin') && !auth.user) {
  //   return { name: 'admin-login' }
  // }

  // if (!name.includes('login') && name !== 'home' && !auth.user) {
  //   return { name: 'home' }
  // }

  // if (name === 'admin-dashboard') {
  //   return { name: 'admin-campaigns' }
  // }


  // if (name.includes('admin') && name !== 'admin-login') {
  //   if (!auth.isAuthenticated || !auth.isAdmin) {
  //     return { name: 'admin-login' }
  //   }
  // }

  // if (auth.isAuthenticated && auth.isAdmin && !name.includes('admin')) {
  //   return { name: 'admin-dashboard' }
  // }


  // if (name === 'dashboard' && !auth.isAuthenticated) {
  //   return { name: 'login'}
  // }





})

export default router
