<template>

  <!-- <NavBar v-model="search">
    <div>
      <pvButton v-if="minimizeList" severity="warning" raised label="List" size="small" class="h-9" icon="pi pi-window-maximize" iconPos="right" @click="minimizeList = false"/>
    </div>
  </NavBar> -->
  <div class="p-8">
    <RouterView />
  </div>



  <!-- <div class="flex gap-6 justify-center md:p-8 flex-wrap xl:flex-nowrap">

    <div class="w-full" v-if="!minimizeList">
      <div class="bg-white flex flex-col p-6 gap-4">
        <div class="">
          <div class="flex flex-wrap gap-3 justify-between">
            <div class="flex gap-4">
              <div class="flex align-items-center">
                <pvRadioButton v-model="currentList" inputId="campaign-list" name="pizza" value="campaigns" />
                <label for="campaign-list" class="ml-2 cursor-pointer">Campaigns</label>
              </div>
              <div class="flex align-items-center">
                <pvRadioButton v-model="currentList" inputId="client-list" name="pizza" value="clients" />
                <label for="client-list" class="ml-2 cursor-pointer">Clients</label>
              </div>
              <div class="flex align-items-center">
                <pvRadioButton v-model="currentList" inputId="template-list" name="pizza" value="templates" />
                <label for="template-list" class="ml-2 cursor-pointer">Templates</label>
              </div>
              <div class="flex align-items-center" v-if="auth.user.isAdmin">
                <pvRadioButton v-model="currentList" inputId="user-list" name="pizza" value="users" />
                <label for="user-list" class="ml-2 cursor-pointer">Users</label>
              </div>
            </div>

            <div class="">

              <span class="pi pi-window-minimize text-gray-600" v-tooltip.top="'Minimize'" @click="minimizeList = true"></span>
            </div>

          </div>
          <div>
            <div v-if="currentList === 'clients'" class="">
              <ClientList :search="search" v-model="selectedClient" :newCampaign="addEditCampaign" :addEditClient="addEditClient"/>
            </div>

            <div v-if="currentList === 'campaigns'" class="">
              <CampaignList v-model="selectedCampaign" :addEditCampaign="addEditCampaign" :search="search"/>
            </div>

            <div v-if="currentList === 'templates'">
              <TemplateList v-model="selectedTemplate" :addEditTemplate="addEditTemplate" :search="search"/>
            </div>

            <div v-if="currentList === 'users' && auth.user.isAdmin" class="align-top">
              <UserList :search="search" v-model="selectedClient" :addEditUser="addEditUser"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col gap-6" v-if="editClient || editCampaign || editTemplate || editUser || previewTemplate">
      <div class="bg-white p-6" v-if="editClient || editCampaign || editTemplate || editUser">
        <div>
          <div v-if="editClient">
            <ClientForm v-model="editClient" />
          </div>
          <div v-if="editCampaign">
            <CampaignForm v-model:campaign="editCampaign" v-model:selectedTemplate="selectedTemplate" :selectedClient="selectedClient" :cancel="cancelEditCampaign"  />
          </div>
          <div v-if="editTemplate">
            <TemplateForm v-model="editTemplate" :cancel="cancelEditTemplate"/>
          </div>
          <div v-if="editUser && auth.user.isAdmin">
            <UserForm v-model="editUser" />
          </div>
        </div>
      </div>
      <div v-if="previewTemplate">
        <TemplatePreview :selectedTemplate="previewTemplate" :previewCampaign="previewCampaign"/>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue'
import NavBar from '@/components/common/NavBar.vue'
import CampaignList from '@/components/admin/CampaignList.vue'
import CampaignForm from '@/components/admin/CampaignForm.vue'
import ClientForm from '@/components/admin/ClientForm.vue'
import ClientList from '@/components/admin/ClientList.vue'
import UserList from '@/components/admin/UserList.vue'
import TemplateList from '@/components/admin/TemplateList.vue'
import TemplateForm from '@/components/admin/TemplateForm.vue'
import TemplatePreview from '@/components/admin/TemplatePreview.vue'
import UserForm from '@/components/admin/UserForm.vue'
import objects from '@/objects'
import { useAuthStore } from '@/stores/auth'
// import { useRoute, useRouter } from 'vue-router'



const auth = useAuthStore()

const search = ref('')

const editCampaign = ref(null as any)
const selectedClient = ref(null)
const editClient = ref(null as any)
const editTemplate = ref(null as any)
const editUser = ref(null as any)
const selectedTemplate = ref(null)
const selectedCampaign = ref(null)
const minimizeList = ref(false)

const reset = () => {
  editCampaign.value = null
  selectedCampaign.value = null
  editClient.value = null
  editTemplate.value = null
  editUser.value = null
  selectedTemplate.value = null
  selectedCampaign.value = null
}

const currentList = ref('campaigns')

const previewTemplate = computed(() => {
  if (editTemplate.value) {
    return editTemplate.value
  } else {
    if (editCampaign.value) {
      return selectedTemplate.value
    }
  }
  return null
})

const previewCampaign = computed(() => {
  if (editCampaign.value) {
    return editCampaign.value
  }
  return selectedCampaign.value
})

const addEditTemplate = (template?: any) => {
  if (editTemplate.value) {
    return
  }
  if (!template) {
    template = JSON.parse(JSON.stringify(objects.emptyTemplate))
  }
  reset()
  editTemplate.value = template
  selectedTemplate.value = editTemplate.value
}

const addEditCampaign = (campaign?: any) => {
  if (editCampaign.value) {
    return
  }
  if (!campaign) {
    campaign = JSON.parse(JSON.stringify(objects.emptyCampaign))
  }
  reset()
  editCampaign.value = campaign
  selectedCampaign.value = editCampaign.value
  if (campaign.template) {
    selectedTemplate.value = campaign.template
  }
}

const addEditClient = (client?: any) => {
  if (!client) {
    client = JSON.parse(JSON.stringify(objects.emptyClient))
  }
  reset()
  editClient.value = client
}

const addEditUser = (user?: any) => {
  if (!user) {
    user = JSON.parse(JSON.stringify(objects.emptyUser))
  }
  reset()
  editUser.value = user
  console.log(editUser.value)
}

const cancelEditTemplate = () => {
  editTemplate.value = null
  selectedTemplate.value = null
}

const cancelEditCampaign = () => {
  editCampaign.value = null
  selectedTemplate.value = null
}

</script>

<style scoped>

</style>