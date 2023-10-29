<template>
  <div class="sm:p-10 p-4">
    <div class="flex flex-col-reverse sm:flex-row justify-end gap-4 mb-4">
      <!-- <RouterLink to="/staff/clients"><div class="btn hover:bg-sky-500 hover:!text-gray-200"><span class="material-icons md-36 translate-y-3 -mt-6">arrow_back</span>Back</div></RouterLink> -->
      <!-- <div class="flex gap-4"> -->
        <input v-model="query.search" type="text" placeholder="Search" class="border-1 px-4 h-12" />
        <RouterLink to="/staff/clients/add-edit"><div class="btn"><span class="material-icons md-30 translate-y-2 -mt-6">add</span>Add Client</div></RouterLink>
      <!-- </div> -->
    </div>
    <div class="">
      <table class="w-full bg-white border-1 border-gray-300 table-fixed">
        <thead class="bg-gray-100 border-b-1 border-gray-300">
          <tr class="w-full">
            <td>Client</td>
            <td class="hidden md:table-cell truncate whitespace-nowrap overflow-hidden">Company</td>
            <td class="hidden sm:table-cell truncate whitespace-nowrap overflow-hidden">Phone</td>
            <td class="hidden sm:table-cell truncate whitespace-nowrap overflow-hidden">Email</td>
            <td class="hidden xs:table-cell">Campaigns</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100 border-b-1 border-gray-300" v-for="client in clients" :key="client._id">
            <td class="truncate whitespace-nowrap overflow-hidden">
              {{ `${client.firstName} ${client.lastName}` }}
            </td>
            <td class="hidden md:table-cell truncate whitespace-nowrap overflow-hidden">
              {{ client.company }}
            </td>
            <td class="hidden sm:table-cell truncate whitespace-nowrap overflow-hidden">
              {{ client.phone }}
            </td>
            <td class="hidden sm:table-cell truncate whitespace-nowrap overflow-hidden">
              {{ client.email }}
            </td>
            <td class="hidden xs:table-cell">
              <span class="font-semibold">{{ client.activeCampaigns }}</span> | <span>{{ client.totalCampaigns }}</span>
            </td>
            <td class="flex gap-2">
              <div class="cursor-pointer material-icons md-24 action" title="New Campaign" @click="newCampaign(client)">add_circle</div>
              <div class="cursor-pointer material-icons md-24 action" title="View Dashboard">visibility</div>
              <div class="cursor-pointer material-icons md-24 action" title="Edit Client Information">edit</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCampaignStore } from '@/stores/campaign';
import { useRouter } from 'vue-router';

const auth = useAuthStore()
const campaign = useCampaignStore()

const router = useRouter()

const clients = ref([] as {
  company: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  _id: string;
  activeCampaigns: number;
  totalCampaigns: number;
}[])

const query = ref({
  search: '',
  perPage: 10,
  page: 1
})

const getClients = async () => {
  try {
    const { search, perPage, page } = query.value
    const res = await auth.api.get(`/clients?search=${search}&page=${page}&perPage=${perPage}`)
    clients.value = res.data
  } catch(err: any) {
    console.log(err.message)
  }
}

watch(query, () => {
  getClients()
}, { deep: true })

const newCampaign = (client: any) => {
  // console.log(campaign)
  campaign.setClient(client)
  router.push('/staff/campaigns/add-edit')
}

onMounted(() => {
  getClients()
})

</script>


<style scoped>

thead {
  @apply py-4 font-semibold text-gray-700
}

tbody {
  @apply text-gray-600
}

td {
  @apply py-2 px-4
}


</style>