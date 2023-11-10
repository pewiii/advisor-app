<template>
  <pvDataTable v-model:selection="selectedTemplate" selectionMode="single" :value="templates" tableStyle="min-width: 50rem" :loading="loading">
    <template #header>
      <div class="flex flex-wrap align-items-center justify-content-between gap-2 justify-between items-center">
        <div>
          <span class="text-xl font-bold">Templates</span>
        </div>
        <div class="flex gap-4">
          <pvButton v-ripple class="p-ripple" icon="pi pi-refresh" rounded raised @click="refresh" />
          <pvButton v-ripple class="p-ripple" icon="pi" rounded raised @click="addEditTemplate()"><span class="material-icons">add</span></pvButton>
        </div>
          </div>
    </template>
    <template #loading>
      <VueLoader />
    </template>
    <pvColumn field="title" header="Title"></pvColumn>
    <!-- <pvColumn field="client" header="Client">
      <template #body="{ data }">
        {{ data.client.fullName }}
      </template>
    </pvColumn> -->
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
        <!-- Status -->
        <div class="inline px-2 py-1 rounded-lg text-white" :class="data.status === 'active' ? 'bg-green-600' : 'bg-secondary'">
          {{ data.status }}
        </div>
      </template>
    </pvColumn>
    <pvColumn field="actions" header="Actions">
      <template #body="{ data }">
        <!-- <div class="cursor-pointer material-icons md-30 hover:text-sky-600 text-gray-600">visibility</div> -->
        <div class="cursor-pointer material-icons md-30 hover:text-sky-600 text-gray-600" @click="addEditTemplate(data)">edit</div>
      </template>
    </pvColumn>
    <template #footer>
      <div class="h-10 flex justify-between items-center">
        <div>
          Total Templates: {{ totalRecords }}
        </div>
        <pvPaginator ref="templatePaginator" :rows="perPage" :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="totalRecords" template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" @page="handlePage" />
      </div>
    </template>
  </pvDataTable>
    <!-- <table class="w-full bg-green-300">
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
      <tbody class="bg-red-500 overflow-scroll">
        <tr class="hover:bg-white border-b-1 border-gray-300" v-for="campaign in campaigns" :key="campaign._id">
          <td class="">
            <div class="!text-gray-800 font-semibold">{{ campaign.title }}</div>
          </td>
          <td>
            <div class="font-normal">{{ campaign.client.fullName || `${campaign.client.firstName} ${campaign.client.lastName}` }}</div>
          </td>
          <td class="font-normal">
            <div class="">{{ campaign.createdAt && formatDate(campaign.createdAt) }}</div>
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
    </table> -->
  </template>
  
  
  <script lang="ts" setup>
  import { nextTick, onMounted, computed, ref, watch } from 'vue'
  import { format } from 'date-fns'
  import { useAuthStore } from '@/stores/auth'
  import VueLoader from '@/components/common/VueLoader.vue'
  
  const auth = useAuthStore()
  
  const props = defineProps(['modelValue', 'addEditTemplate', 'search'])
  const emit = defineEmits(['update:modelValue'])
  
  const templatePaginator = ref(null as any)
  const templates = ref([])
  const loading = ref(false)
  const page = ref(0)
  const perPage = ref(5)
  const totalRecords = ref(0)


  const selectedTemplate = computed({
    get() {
      return props.modelValue
    },
    set(template) {
      if (props.modelValue === template) {
        emit('update:modelValue', null)
      } else {
        emit('update:modelValue', template)
      }
    }
  })

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

  
  const getTemplates = async () => {
    loading.value = true
    try {
      const res = await auth.api.get(
        `/templates?search=${props.search}&page=${page.value}&perPage=${perPage.value}`)

      templates.value = res.data.data
      totalRecords.value = res.data.total
    } catch(err: any) {
      console.log(err.message)
    }
    loading.value = false
  }
  
  watch(() => props.search, getTemplates)
  
  onMounted(getTemplates)
  
  
  // const refresh = () => {
  //   page.value = 1
  //   perPage.value = 5
  //   getTemplates()
  // }

  const refresh = (e: any) => {
  if (templatePaginator.value) {
    if (templatePaginator.value.page !== 0) {
      templatePaginator.value.changePageToFirst(e)
    } else {
      getTemplates()
    }
  }
  // page.value = 1
  // perPage.value = 5
  // getClients()
}

  const handlePage = (pagination: any) => {
    perPage.value = pagination.rows
    page.value = pagination.page
    getTemplates()
  }

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