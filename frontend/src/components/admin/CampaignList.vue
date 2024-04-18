<template>
  <pvDataTable :value="campaigns" :loading="loading" @sort="sort">
    <template #header>
      <div class="flex flex-wrap align-items-center justify-content-between gap-2 justify-between items-center">
        <div>
          <span class="text-xl font-bold">Campaigns</span>
        </div>
        <div class="flex gap-4">
          <pvButton v-ripple class="p-ripple" icon="pi pi-refresh" rounded raised @click="refresh" />
          <!-- <pvButton v-ripple class="p-ripple" icon="pi" rounded raised @click="addEditCampaign()"><span class="material-icons">add</span></pvButton> -->
        </div>
          </div>
    </template>
    <template #loading>
      <VueLoader />
    </template>
    <pvColumn field="jobNumber" header="Job #" sortable></pvColumn>
    <pvColumn field="title" header="Title" sortable></pvColumn>
    <pvColumn field="client" header="Client" sortable>
      <template #body="{ data }">
        {{ data.client.fullName }} - {{ data.client.company }}
      </template>
    </pvColumn>
    <pvColumn field="createdAt" header="Created" sortable class="hidden lg:table-cell">
      <template #body="{ data }">
        {{ format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm') }}
      </template>
    </pvColumn>
    <pvColumn field="updatedAt" header="Updated" sortable class="hidden lg:table-cell">
      <template #body="{ data }">
        {{ format(new Date(data.updatedAt), 'dd/MM/yyyy HH:mm') }}
      </template>
    </pvColumn>
    <!-- <pvColumn field="status" header="Status" sortable class="hidden sm:table-cell">
      <template #body="{ data }">
        <div class="inline px-2 py-1 rounded-lg text-white" :class="data.status === 'active' ? 'bg-green-600' : 'bg-secondary'">
          {{ data.status }}
        </div>
      </template>
    </pvColumn> -->
    <pvColumn field="actions" header="Actions">
      <template #body="{ data }">
        <template v-if="data.file && !fileExpired(data.file) && data.file.recordCount">
          <div v-tooltip.top="'Download Coded Records'" :class="downloading.includes(data._id) ? 'text-gray-300' : 'cursor-pointer hover:text-green-600 text-gray-600'" class="material-icons md-30"  @click="downloadRecords(data)">download</div>
          <!-- <div class="inline text-xl font-semibold">
            <div class="cursor-pointer material-icons md-30 hover:text-red-600 text-gray-600" v-tooltip.top="'Download Coded Records'" @click="downloadRecords(data)">download</div>
          </div> -->
        </template>
        <RouterLink :to="{ name: 'admin-campaigns-edit', params: { campaignId: data._id }}">
          <div v-tooltip.top="'Edit Campaign'" class="cursor-pointer material-icons md-30 hover:text-sky-600 text-gray-600">edit</div>
        </RouterLink>
        <Modal :header="'Delete Campaign'" v-if="auth.user.isAdmin">
          <template v-slot:trigger="{ open }">
            <div v-tooltip.top="'Delete Campaign'" class="cursor-pointer material-icons md-30 hover:text-red-600 text-gray-600" @click="open">delete</div>
          </template>
          <template v-slot:content="{ close }">
            <!-- <div v-if="!deleteSuccess"> -->
            <div v-if="!deleteLoading">
              <div>Are you sure you want to delete this campaign?</div>
              <div class="text-red-600">{{ data.title }}</div>
              <div class="flex justify-end mt-4">
                <pvButton label="Delete" severity="danger" @click="deleteCampaign(data, close)"/>
              </div>
            </div>
            <div v-else class="flex justify-center">
              <VueLoader />
            </div>
            <!-- </div> -->
            <!-- <div v-else>
              <div>Campaign deleted successfully.</div>
            </div> -->
          </template>
        </Modal>
      </template>
    </pvColumn>
    <template #footer>
      <div class="h-10 flex justify-around md:justify-between items-center" >
        <div class="hidden md:block">
          Total Campaigns: {{ totalRecords }}
        </div>
        <div class="">
          <pvPaginator ref="campaignPaginator" :rows="perPage" :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="totalRecords" template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" @page="handlePage" />
        </div>
        <!-- <div class="md:hidden">
          <pvPaginator ref="campaignPaginator" :rows="perPage" :totalRecords="totalRecords" template="PrevPageLink CurrentPageReport NextPageLink" @page="handlePage" />
        </div> -->
      </div>
    </template>
  </pvDataTable>
</template>


<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue'
import { format } from 'date-fns'
import { useAuth } from '@/stores/auth'
import VueLoader from '@/components/common/VueLoader.vue'
import Modal from '@/components/common/Modal.vue'
import { useNotification } from '@kyvg/vue3-notification'

const auth = useAuth()

const props = defineProps(['search'])

const { notify } = useNotification()

const fileExpired = (file: any) => {
  if (file.expiresAt) {
    return new Date(file.expirationDate) < new Date()
  }
  return false
}

const downloading = ref([] as string[])
const downloadRecords = async (campaign: any) => {
  if (downloading.value.includes(campaign._id)) return
  downloading.value.push(campaign._id)
  try {
    // app.get('/uploads/csv/:campaignId', auth.verifyToken, api.admin.uploads.csvGet)
    const res = await auth.api.get(`/uploads/csv/${campaign._id}`, { responseType: 'blob' })

    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `coded_${campaign.jobNumber}.csv`)
    link.click()
  } catch(err) {
    console.log(err)
    notify({ type: 'error', text: 'Failed to download coded records' })
  }
  downloading.value = downloading.value.filter(id => id !== campaign._id)
}

// const emit = defineEmits(['update:modelValue'])

// const selectedCampaign = computed({
//   get() {
//     return props.modelValue
//   },
//   set(campaign: any) {
//     if (props.modelValue === campaign) {
//       emit('update:modelValue', null)
//     } else {
//       emit('update:modelValue', campaign)
//     }
//   }
// })


const campaignPaginator = ref(null as any)
const campaigns = ref([])
const loading = ref(false)
const page = ref(0)
const perPage = ref(5)
const totalRecords = ref(0)
const deleteLoading = ref(false)
const sortField = ref('updatedAt')
const sortOrder = ref(-1)

const sort = (e: any) => {
  sortField.value = e.sortField
  sortOrder.value = e.sortOrder
  getCampaigns()
}

const getCampaigns = async () => {
  loading.value = true
  try {
    const res = await auth.api.get(
      `/admin/campaigns?search=${props.search}&page=${page.value}&perPage=${perPage.value}&sortField=${sortField.value}&sortOrder=${sortOrder.value}`)

    campaigns.value = res.data.paginatedResults
    console.log(campaigns.value)
    totalRecords.value = res.data.totalCount
  } catch(err: any) {
    console.log(err.message)
  }
  loading.value = false
}

watch(() => props.search, getCampaigns)

onMounted(getCampaigns)



const refresh = (e: any) => {
  if (campaignPaginator.value) {
    if (campaignPaginator.value.page !== 0) {
      campaignPaginator.value.changePageToFirst(e)
    } else {
      getCampaigns()
    }
  }
  // page.value = 1
  // perPage.value = 5
  // getCampaigns()
}

const handlePage = (pagination: any) => {
  perPage.value = pagination.rows
  page.value = pagination.page
  getCampaigns()
}

// const openDelete = (open: any) => {
//   deleteSuccess.value = false
//   open()
// }

const deleteCampaign = async (campaign: any, closeModal: any) => {
  deleteLoading.value = true
  try {
    await auth.api.delete(`/admin/campaigns/${campaign._id}`)
    campaigns.value = campaigns.value.filter(c => c !== campaign)
    totalRecords.value = totalRecords.value - 1
    // deleteSuccess.value = true
  } catch(err: any) {
    console.log(err.message)
  }
  closeModal()
  deleteLoading.value = false
}


// const refresh = () => {
//   page.value = 1
//   perPage.value = 5
//   getCampaigns()
// }
// const formatDate = (dateText: string) => {

//   const options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: '2-digit',
//     hour12: true,
//   } as Intl.DateTimeFormatOptions

//   const date = new Date(dateText)

//   return date.toLocaleString('en-US', options);

// }

</script>


<style scoped>

</style>