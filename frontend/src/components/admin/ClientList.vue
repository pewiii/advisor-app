<template>
  <!-- <div class="flex flex-col-reverse sm:flex-row justify-end gap-4 mb-4"> -->
    <!-- <RouterLink to="/staff/clients"><div class="btn hover:bg-sky-500 hover:!text-gray-200"><span class="material-icons md-36 translate-y-3 -mt-6">arrow_back</span>Back</div></RouterLink> -->
    <!-- <div class="flex gap-4"> -->
      <!-- <input v-model="query.search" type="text" placeholder="Search" class="border-1 px-4 h-12" /> -->
      <!-- <RouterLink to="/staff/clients/add-edit"><div class="btn"><span class="material-icons md-30 translate-y-2 -mt-6">add</span>Add Client</div></RouterLink> -->
    <!-- </div> -->
  <!-- </div> -->
  <!-- <div class=""> -->
    <table class="w-full">
      <thead class="bg-gray-200 border-t-1 border-b-1 border-gray-300">
        <tr class="w-full">
          <td>Client</td>
          <td class="hidden md:table-cell truncate whitespace-nowrap overflow-hidden">Company</td>
          <td class="hidden sm:table-cell truncate whitespace-nowrap overflow-hidden">Phone</td>
          <td class="hidden sm:table-cell truncate whitespace-nowrap overflow-hidden">Email</td>
          <!-- <td class="hidden xs:table-cell">Campaigns</td> -->
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr 
        v-for="client in clients" 
        :key="client._id" 
        @click="selectClient(client)" 
        class="border-b-1 border-gray-300 cursor-pointer" 
        :class="selectedClient && client._id === selectedClient._id ? 'bg-red-950 text-white' : 'hover:bg-white'"
        >
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
          <!-- <td class="hidden xs:table-cell">
            <span class="font-semibold">{{ client.activeCampaigns }}</span> | <span>{{ client.totalCampaigns }}</span>
          </td> -->
          <td class="flex gap-2">
            <div class="cursor-pointer material-icons md-24 action" title="New Campaign" @click="newCampaign()">add_circle</div>
            <div class="cursor-pointer material-icons md-24 action" title="View Dashboard">visibility</div>
            <div class="cursor-pointer material-icons md-24 action" title="Edit Client Information" @click="editClient(client)">edit</div>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps(['modelValue', 'clients', 'newCampaign', 'editClient'])
const emit = defineEmits(['update:modelValue'])

const selectedClient = computed({
  get() {
    return props.modelValue
  },
  set(client: any) {
    emit('update:modelValue', client)
  }
})

const selectClient = (client: any) => {
  if (selectedClient.value === client) {
    selectedClient.value = null
  } else {
    selectedClient.value = client
  }
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