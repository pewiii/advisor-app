<template>
  <div class="p-10">
    <div class="flex justify-end gap-4 mb-4">
      <!-- <RouterLink to="/staff/clients"><div class="btn hover:bg-sky-500 hover:!text-gray-200"><span class="material-icons md-36 translate-y-3 -mt-6">arrow_back</span>Back</div></RouterLink> -->
      <!-- <div class="flex gap-4"> -->
        <input type="text" placeholder="Search" class="border-1 px-4 rounded-lg h-12" />
        <!-- <RouterLink to="/staff/campaigns/add-edit"><div class="btn"><span class="material-icons md-36 translate-y-3 -mt-6">add</span>Add Campaign</div></RouterLink> -->
      <!-- </div> -->
    </div>
    <div class="">
      <table class="w-full">
        <thead class="bg-gray-100 border-t-1 border-b-1 border-gray-300">
          <tr class="w-full">
            <td>Title</td>
            <td>Client</td>
            <td>Reach</td>
            <td>Respondents</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-white border-b-1 border-gray-300" v-for="campaign in campaigns" :key="campaign._id">
            <td class="">
              <div class="!text-gray-800 font-semibold">{{ campaign.title }}</div>
            </td>
            <td>
              <div class="font-normal">{{ campaign.client.fullName || `${campaign.client.firstName} ${campaign.client.lastName}` }}</div>
            </td>
            <td class="font-normal">
              <div class="">{{ campaign.reach }}</div>
            </td>
            <td class="font-normal">
              <div class="">{{ campaign.respondents }}</div>
            </td>
            <td>
              <span class="font-semibold">{{ campaign.status }}</span>
            </td>
            <td class="flex gap-2">
              <div class="cursor-pointer material-icons md-30 hover:text-sky-600">visibility</div>
              <div class="cursor-pointer material-icons md-30 hover:text-sky-600">edit</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const campaigns = ref([] as any[])

const getCampaigns = async () => {
  try {
    const res = await auth.api.get('/campaigns')
    console.log(res.data)
    campaigns.value = res.data
  } catch(err: any) {
    console.log(err.message)
  }
}

onMounted(() => {
  nextTick(() => {
    getCampaigns()
  })
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