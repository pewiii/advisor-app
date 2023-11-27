import { createRouter, createWebHistory } from 'vue-router'
// import ClientView from '@/views/client/ClientView.vue'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/user/DashboardView.vue'
import LoginView from '@/views/user/LoginView.vue'
import SetupView from '@/views/user/SetupView.vue'

import AdminHome from '@/views/admin/AdminHome.vue'

import AdminLogin from '@/views/admin/AdminLogin.vue'

import CampaignAddEdit from '@/views/admin/CampaignAddEdit.vue'
import ClientAddEdit from '@/views/admin/ClientAddEdit.vue'
import TemplateAddEdit from '@/views/admin/TemplateAddEdit.vue'
import UserAddEdit from '@/views/admin/UserAddEdit.vue'

import ListView from '@/views/admin/Listview.vue'

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
              children: [
                {
                  path: '/',
                  name: 'admin-campaigns',
                  component: ListView
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
              children: [
                {
                  path: '/',
                  name: 'admin-clients',
                  component: ListView
                },
                {
                  path: 'add',
                  name: 'admin-clients-add',
                  component: ClientAddEdit
                },
                {
                  path: 'edit/:clientId',
                  name: 'admin-clients-edit',
                  component: ClientAddEdit
                }
              ]
            },
            {
              path: 'templates',
              children: [
                {
                  path: '/',
                  name: 'admin-templates',
                  component: ListView
                },
                {
                  path: 'add',
                  name: 'admin-templates-add',
                  component: TemplateAddEdit
                },
                {
                  path: 'edit/:templateId',
                  name: 'admin-templates-edit',
                  component: TemplateAddEdit
                }
              ]
            },
            {
              path: 'users',
              children: [
                {
                  path: '/',
                  name: 'admin-users',
                  component: ListView
                },
                {
                  path: 'add',
                  name: 'admin-users-add',
                  component: UserAddEdit
                },
                {
                  path: 'edit/:userId',
                  name: 'admin-users-edit',
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

  if (!auth.user && !['home', 'setup', 'login', 'admin-login'].includes(name)) {
    return { name: 'home' }
  }

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
