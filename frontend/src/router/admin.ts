import { useAuth } from '@/stores/auth'

export const adminRoutes = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminDashboard.vue'),
    beforeEnter: () => {
      const auth = useAuth()
      if(!auth.user || auth.user.userType !== 'admin') {
        return { name: 'home' }
      }
    },
    children: [
      {
        path: 'campaigns',
        children: [
          {
            path: '',
            name: 'admin-campaigns',
            component: () => import('@/views/admin/Listview.vue')
          },
          {
            path: 'add/:clientId',
            name: 'admin-campaigns-add',
            component: () => import('@/views/admin/CampaignAddEdit.vue')
          },
          {
            path: 'edit/:campaignId',
            name: 'admin-campaigns-edit',
            component: () => import('@/views/admin/CampaignAddEdit.vue')
          }
        ]
      },
      {
        path: 'clients',
        children: [
          {
            path: '',
            name: 'admin-clients',
            component: () => import('@/views/admin/Listview.vue')
          },
          {
            path: 'add',
            name: 'admin-clients-add',
            component: () => import('@/views/admin/ClientAddEdit.vue')
          },
          {
            path: 'edit/:clientId',
            name: 'admin-clients-edit',
            component: () => import('@/views/admin/ClientAddEdit.vue')
          }
        ]
      },
      {
        path: 'templates',
        children: [
          {
            path: '',
            name: 'admin-templates',
            component: () => import('@/views/admin/Listview.vue')
          },
          {
            path: 'add',
            name: 'admin-templates-add',
            component: () => import('@/views/admin/TemplateAddEdit.vue')
          },
          {
            path: 'edit/:templateId',
            name: 'admin-templates-edit',
            component: () => import('@/views/admin/TemplateAddEdit.vue')
          }
        ]
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            name: 'admin-users',
            component: () => import('@/views/admin/Listview.vue')
          },
          {
            path: 'add',
            name: 'admin-users-add',
            component: () => import('@/views/admin/UserAddEdit.vue')
            // component: UserAddEdit
          },
          {
            path: 'edit/:userId',
            name: 'admin-users-edit',
            component: () => import('@/views/admin/UserAddEdit.vue')
          }
        ]
      },
      {
        path: 'code',
        name: 'admin-code',
        component: () => import('@/views/admin/FileCodeView.vue')
      }
    ]
  },
]