<template>
  <pvDataTable v-model:selection="selectedClient" selectionMode="single" :value="clients" :loading="loading">
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
    <template #loading>
      <VueLoader />
    </template>
    <pvColumn field="fullName" header="Name"></pvColumn>
    <pvColumn field="company" header="Company"></pvColumn>
    <pvColumn field="createdAt" header="Created" class="hidden lg:table-cell">
      <template #body="{ data }">
        {{ format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm') }}
      </template>
    </pvColumn>
    <pvColumn field="updatedAt" header="Updated" class="hidden lg:table-cell">
      <template #body="{ data }">
        {{ format(new Date(data.updatedAt), 'dd/MM/yyyy HH:mm') }}
      </template>
    </pvColumn>
    <pvColumn field="status" header="Status" class="hidden sm:table-cell">
      <template #body="{ data }">
        <div class="inline px-2 py-1 rounded-lg text-white" :class="data.status === 'active' ? 'bg-green-600' : 'bg-secondary'">
          {{ data.status }}
        </div>
      </template>
    </pvColumn>
    <pvColumn field="actions" header="Actions">
      <template #body="{ data }">
        <div class="cursor-pointer material-icons md-30 hover:text-sky-600 text-gray-600" @click="addEditClient(data)">edit</div>
        <Modal :header="'Delete Client'" v-if="auth.user.isAdmin">
          <template v-slot:trigger="{ open }">
            <div class="cursor-pointer material-icons md-30 hover:text-red-600 text-gray-600" @click="open">delete</div>
          </template>
          <template v-slot:content="{ close }">
            <!-- <div>{{ data }}</div> -->
            <div v-if="!deleteLoading">
              <div>Are you sure you want to delete this client?</div>
              <div class="text-red-600">{{ data.fullName }}</div>
              <div>This client has {{ data.campaignCount }} campaign{{ data.campaignCount === 1 ? '' : 's' }} that will be deleted also.</div>
              <div class="flex justify-end mt-4">
                <pvButton label="Delete" severity="danger" @click="deleteClient(data, close)"/>
              </div>
            </div>
            <div v-else class="flex justify-center">
              <VueLoader />
            </div>
          </template>
        </Modal>
      </template>
    </pvColumn>

    <template #footer>
      <div class="h-10 flex justify-around md:justify-between items-center" >
        <div class="hidden md:block">
          Total Clients: {{ totalRecords }}
        </div>
        <div class="">
          <pvPaginator ref="clientPaginator" :rows="perPage" :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="totalRecords" template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" @page="handlePage" />
        </div>
      </div>
    </template>
  </pvDataTable>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { format } from 'date-fns'
import { useAuthStore } from '@/stores/auth';
import VueLoader from '@/components/common/VueLoader.vue'
import Modal from '@/components/common/Modal.vue'

const auth = useAuthStore()

const props = defineProps(['modelValue', 'search', 'addEditClient'])
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

const loading = ref(false)
const clients = ref([])
const page = ref(0)
const perPage = ref(5)
const totalRecords = ref(0)
const clientPaginator = ref(null as any)
const deleteLoading = ref(false)

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
    if (clientPaginator.value.page !== 0) {
      clientPaginator.value.changePageToFirst(e)
    } else {
      getClients()
    }
  }
}

const handlePage = (pagination: any) => {
  perPage.value = pagination.rows
  page.value = pagination.page
  getClients()
}

const deleteClient = async (client: any, closeModal: any) => {
  deleteLoading.value = true
  try {
    await auth.api.post(`/clients/delete`, { clientId: client._id })
    clients.value = clients.value.filter(c => c !== client)
    totalRecords.value = totalRecords.value - 1
  } catch(err: any) {
    console.log(err.message)
  }
  closeModal()
  deleteLoading.value = false
} 

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