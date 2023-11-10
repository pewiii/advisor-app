<template>
    <pvDataTable v-model:selection="selectedClient" selectionMode="single" :value="clients" tableStyle="min-width: 50rem" :loading="loading">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2 justify-between items-center">
          <div>
            <span class="text-xl font-bold">Clients</span>
          </div>
          <div class="flex gap-4">
            <pvButton v-ripple class="p-ripple" icon="pi pi-refresh" rounded raised @click="refresh" />
            <pvButton v-ripple class="p-ripple" icon="pi" rounded raised @click="addEditClient()"><span class="material-icons">add</span></pvButton>
          </div>
            </div>
      </template>
      <template #loading><div class="loader"></div></template>
      <pvColumn field="fullName" header="Name"></pvColumn>
      <pvColumn field="company" header="Company"></pvColumn>
      <pvColumn field="createdAt" header="Created">
        <template #body="{ data }">
          {{ format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm') }}
        </template>
      </pvColumn>
      <pvColumn field="updatedAt" header="Updated">
        <template #body="{ data }">
          {{ format(new Date(data.updatedAt), 'dd/MM/yyyy HH:mm') }}
        </template>
      </pvColumn>
      <pvColumn field="status" header="Status">
        <template #body="{ data }">
          <div class="inline px-2 py-1 rounded-lg text-white" :class="data.status === 'active' ? 'bg-green-600' : 'bg-secondary'">
            {{ data.status }}
          </div>
        </template>
      </pvColumn>
      <!-- <pvColumn field="status" header="Status">
        <template #body="{ data }">
          {{ data.status }}
        </template>
      </pvColumn> -->
      <pvColumn field="actions" header="Actions">
        <template #body="{ data }">
          <!-- <div class="cursor-pointer material-icons md-30 hover:text-sky-600 text-gray-600">visibility</div> -->
          <div class="cursor-pointer material-icons md-30 hover:text-sky-600 text-gray-600" @click="addEditClient(data)">edit</div>
        </template>
      </pvColumn>

      <template #footer>
        <div class="h-10 flex justify-between items-center">
          <div>
            Total Clients: {{ totalRecords }}
          </div>
          <pvPaginator ref="clientPaginator" :rows="perPage" :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="totalRecords" template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" @page="handlePage" />
        </div>
      </template>

    </pvDataTable>
    <!-- <table class="w-full">
      <thead class="bg-gray-200 border-t-1 border-b-1 border-gray-300">
        <tr class="w-full">
          <td>Client</td>
          <td class="hidden md:table-cell truncate whitespace-nowrap overflow-hidden">Company</td>
          <td class="hidden sm:table-cell truncate whitespace-nowrap overflow-hidden">Phone</td>
          <td class="hidden sm:table-cell truncate whitespace-nowrap overflow-hidden">Email</td>  
          <td class="hidden sm:table-cell truncate whitespace-nowrap overflow-hidden">Status</td>  
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr 
        v-for="client in clients" 
        :key="client._id" 
        @click="selectClient(client)" 
        class="border-b-1 border-gray-300 cursor-pointer" 
        :class="selectedClient && client._id === selectedClient._id ? 'bg-red-950 text-white' : 'hover:bg-slate-100'"
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
          <td class="hidden sm:table-cell whitespace-nowrap">
            <span v-if="client.usablePassword" class="material-icons font-bold text-green-500" title="Has access">check</span>
            <div
            v-else
            class=""
            title="No access" 
            >
              <span class="material-icons text-red-500 font-bold">block</span>
            </div>
          </td>
          <td class="flex gap-2">
            <div class="cursor-pointer material-icons md-24 action" title="New Campaign" @click="newCampaign()">add_circle</div>
            <div class="cursor-pointer material-icons md-24 action" title="View Dashboard">visibility</div>
            <div class="cursor-pointer material-icons md-24 action" title="Edit Client Information" @click="editClient(client)">edit</div>
          </td>
        </tr>
      </tbody>
    </table> -->
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { format } from 'date-fns'
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()

const props = defineProps(['modelValue', 'search', 'newCampaign', 'addEditClient'])
const emit = defineEmits(['update:modelValue'])

const selectedClient = computed({
  get() {
    return props.modelValue
  },
  set(client: any) {
    if (props.modelValue === client) {
      emit('update:modelValue', null)
    } else {
      emit('update:modelValue', client)
    }
  }
})

// const showEmailMenu = ref(false)
const loading = ref(false)
const clients = ref([])
const page = ref(0)
const perPage = ref(5)
const totalRecords = ref(0)
const clientPaginator = ref(null as any)
// const selectedClient = computed({
//   get() {

//   },
//   set() {

//   }
// })

const getClients = async () => {
  try {
    loading.value = true
    const res = await auth.api.get(
      `/clients?search=${props.search}&page=${page.value}&perPage=${perPage.value}`)
    clients.value = res.data.data
    totalRecords.value = res.data.total
  } catch(err: any) {
    console.log(err.message)
  }
  loading.value = false
}

watch(() => props.search, getClients)

const refresh = (e: any) => {
  if (clientPaginator.value) {
    console.log(clientPaginator.value)
    if (clientPaginator.value.page !== 0) {
      clientPaginator.value.changePageToFirst(e)
    } else {
      getClients()
    }
  }
  // page.value = 1
  // perPage.value = 5
  // getClients()
}

const handlePage = (pagination: any) => {
  console.log(pagination)
  perPage.value = pagination.rows
  page.value = pagination.page
  getClients()
}

// const selectClient = (client: any) => {
//   if (selectedClient.value === client) {
//     selectedClient.value = null
//   } else {
//     selectedClient.value = client
//   }
// }

onMounted(getClients)

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