<template>

  <NavBar v-model="search" />
  <div class="grid-container gap-6 p-8">

    <div class="grid-item row-span-6 relative">
      <div v-if="loadingCampaigns" class="absolute w-full h-full flex justify-center items-center">
        <div>
          Loading...
        </div>
      </div>
      <div class="flex justify-between text-xl font-semibold mb-5">
        <div>
          {{ editCampaign ? 'Edit Campaign' : 'Campaigns'}}
        </div>
        <div v-if="!editCampaign">
          <div class="admin-add material-icons" @click="addEditCampaign()" title="New Campaign">add</div>
        </div>
      </div>
      <CampaignForm v-if="editCampaign" v-model="editCampaign" :selectedClient="selectedClient" :submitCampaign="submitCampaign" :cancel="cancelCampaign"/>
      <CampaignList v-else :campaigns="campaigns" :editCampaign="addEditCampaign"/>
    </div>
    <div class="grid-item row-span-6">
      <!-- Clients -->
      <div class="flex justify-between text-xl font-semibold mb-5">
        <div>
          Clients
        </div>
        <div v-if="!editClient" class="admin-add material-icons" @click="addEditClient()" title="New Client">add</div>
      </div>
      <ClientForm v-if="editClient" v-model="editClient" :submitClient="submitClient" />
      <ClientList v-else :clients="clients" v-model="selectedClient" :newCampaign="addEditCampaign" :editClient="addEditClient"/>
    </div>
    <!-- <div>Campaigns</div>
    <div>Campaigns</div> -->
  </div>


</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth';
import NavBar from '@/components/common/NavBar.vue'
import CampaignList from '@/components/admin/CampaignList.vue'
import CampaignForm from '@/components/admin/CampaignForm.vue'
import ClientForm from '@/components/admin/ClientForm.vue'
import ClientList from '@/components/admin/ClientList.vue'
import objects from '@/objects'
import { notify } from '@kyvg/vue3-notification';

const auth = useAuthStore()

const search = ref('')

const addEdit = ref('Add')

const campaigns = ref([] as any[])
const loadingCampaigns = ref(false)
const campaignsPage = ref(1)
const campaignsPerPage = ref(10)
const editCampaign = ref(null as any)

const clients = ref([] as any[])
const loadingClients = ref(false)
const clientsPage = ref(1)
const clientsPerPage = ref(10)
const selectedClient = ref(null)
const editClient = ref(null)

const addEditCampaign = (campaign?: any) => {
  if (editCampaign.value) {
    return
  }
  if (!campaign) {
    campaign = JSON.parse(JSON.stringify(objects.emptyCampaign))
  }
  editCampaign.value = campaign
}

const addEditClient = (client?: any) => {
  // if (editCampaign.value) {
  //   return
  // }
  if (!client) {
    client = JSON.parse(JSON.stringify(objects.emptyClient))
  }
  editClient.value = client
  console.log(editClient.value)
}

const getCampaigns = async () => {
  try {
    loadingCampaigns.value = true
    const res = await auth.api.get(
      `/campaigns?search=${search.value}&page=${campaignsPage.value}&perPage=${campaignsPerPage.value}`)
    campaigns.value = res.data
  } catch(err: any) {
    console.log(err.message)
  }
  loadingCampaigns.value = false
}

const getClients = async () => {
  try {
    loadingClients.value = true
    const res = await auth.api.get(
      `/clients?search=${search.value}&page=${clientsPage.value}&perPage=${clientsPerPage.value}`)
    clients.value = res.data
    console.log(res.data)
  } catch(err: any) {
    console.log(err.message)
  }
  loadingClients.value = false
}

const cancelCampaign = () => {
  getCampaigns()
  editCampaign.value = null
}

const submitCampaign = async () => {
  try {
    loadingCampaigns.value = true
    const data = JSON.parse(JSON.stringify(editCampaign.value))
    data.user = auth.user._id
    data.client = data.client._id

    //temp
    delete data.landingTemplate

    const info = {
      path: data._id ? '/campaigns/update' : '/campaigns/add',
      title: data._id ? 'Updated' : 'Created',
      text: data._id ? 'Campaign updated successfully' : 'Campaign created successfully'
    }
    const res = await auth.api.post(info.path, data)
    editCampaign.value = null
    notify({
      title: info.title,
      text: info.text,
      type: 'success'
    })
    getCampaigns()
  } catch(err: any) {
    console.log(err)
  }
  loadingCampaigns.value = false
}

const submitClient = async () => {
  try {
    const data = JSON.parse(JSON.stringify(editClient.value))
    delete data.campaigns
    const info = {
      path: data._id ? '/clients/update' : '/clients/add',
      title: data._id ? 'Updated' : 'Created',
      text: data._id ? 'Client updated successfully' : 'Client created successfully'
    }
    const res = await auth.api.post(info.path, data)
    console.log(res)
    notify({
      title: info.title,
      text: info.text,
      type: 'success'
    })
    getClients()
  } catch(err: any) {
    console.log(err)
    console.log(err.message)
  }
}

watch(search, () => {
  getCampaigns()
  getClients()
})

onMounted(() => {
  getCampaigns()
  getClients()
})

// const clients = ref([] as {
//   company: string;
//   firstName: string;
//   lastName: string;
//   address1: string;
//   address2: string;
//   city: string;
//   state: string;
//   zip: string;
//   phone: string;
//   email: string;
//   _id: string;
//   activeCampaigns: number;
//   totalCampaigns: number;
// }[])

// const query = ref({
//   search: '',
//   perPage: 10,
//   page: 1
// })


</script>

<style scoped>

.grid-item {
  @apply bg-slate-100 rounded-lg p-6
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 13vh 13vh 13vh 13vh 13vh minmax(13vh, auto)

}

</style>