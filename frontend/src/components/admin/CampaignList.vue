<template>
  <table class="w-full">
    <thead class="bg-gray-200 border-t-1 border-b-1 border-gray-300">
      <tr class="w-full">
        <td>Title</td>
        <td>Client</td>
        <td>Created</td>
        <td>Updated</td>
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
          <div class="">{{ campaign.createdAt && formatDate(campaign.createdAt) }}</div>
          <!-- <div class="">{{ campaign.reach }}</div> -->
        </td>
        <td class="font-normal">
          <div class="">{{ campaign.updatedAt && formatDate(campaign.updatedAt) }}</div>
        </td>
        <td>
          <span class="font-semibold">{{ campaign.status }}</span>
        </td>
        <td class="flex gap-2">
          <div class="cursor-pointer material-icons md-30 hover:text-sky-600">visibility</div>
          <div class="cursor-pointer material-icons md-30 hover:text-sky-600" @click="editCampaign(campaign)">edit</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>


<script lang="ts" setup>
// import { nextTick, onMounted, ref } from 'vue'
// import { useAuthStore } from '@/stores/auth'

// const auth = useAuthStore()

const props = defineProps(['campaigns', 'editCampaign'])

const formatDate = (dateText: string) => {

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  } as Intl.DateTimeFormatOptions

  const date = new Date(dateText)

  return date.toLocaleString('en-US', options);

}

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