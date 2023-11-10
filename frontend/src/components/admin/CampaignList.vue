<template>
  <pvDataTable v-model:selection="selectedCampaign" selectionMode="single" :value="campaigns" tableStyle="min-width: 50rem" :loading="loading">
    <template #header>
      <div class="flex flex-wrap align-items-center justify-content-between gap-2 justify-between items-center">
        <div>
          <span class="text-xl font-bold">Campaigns</span>
        </div>
        <div class="flex gap-4">
          <pvButton v-ripple class="p-ripple" icon="pi pi-refresh" rounded raised @click="refresh" />
          <pvButton v-ripple class="p-ripple" icon="pi" rounded raised @click="addEditCampaign()"><span class="material-icons">add</span></pvButton>
        </div>
          </div>
    </template>
    <template #loading>
      <VueLoader />
    </template>
    <pvColumn field="title" header="Title"></pvColumn>
    <pvColumn field="client" header="Client">
      <template #body="{ data }">
        {{ data.client.fullName }}
      </template>
    </pvColumn>
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
    <pvColumn field="actions" header="Actions">
      <template #body="{ data }">
        <div class="cursor-pointer material-icons md-30 hover:text-sky-600 text-gray-600" @click="addEditCampaign(data)">edit</div>
      </template>
    </pvColumn>
    <template #footer>
      <div class="h-10 flex justify-between items-center">
        <div>
          Total Campaigns: {{ totalRecords }}
        </div>
        <pvPaginator ref="campaignPaginator" :rows="perPage" :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="totalRecords" template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" @page="handlePage" />
      </div>
    </template>
  </pvDataTable>
</template>


<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue'
import { format } from 'date-fns'
import { useAuthStore } from '@/stores/auth'
import VueLoader from '@/components/common/VueLoader.vue'

const auth = useAuthStore()

const props = defineProps(['modelValue', 'addEditCampaign', 'search'])


const emit = defineEmits(['update:modelValue'])

const selectedCampaign = computed({
  get() {
    return props.modelValue
  },
  set(campaign: any) {
    console.log("HERE")
    if (props.modelValue === campaign) {
      emit('update:modelValue', null)
    } else {
      emit('update:modelValue', campaign)
    }
  }
})


const campaignPaginator = ref(null as any)
const campaigns = ref([])
const loading = ref(false)
const page = ref(0)
const perPage = ref(5)
const totalRecords = ref(0)

// const search = computed(() => props.search)

const getCampaigns = async () => {
  loading.value = true
  try {
    const res = await auth.api.get(
      `/campaigns?search=${props.search}&page=${page.value}&perPage=${perPage.value}`)
    campaigns.value = res.data.data
    totalRecords.value = res.data.total
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