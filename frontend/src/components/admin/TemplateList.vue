<template>
  <pvDataTable :value="templates" :loading="loading" @sort="sort">
    <template #header>
      <div class="flex flex-wrap align-items-center justify-content-between gap-2 justify-between items-center">
        <div>
          <span class="text-xl font-bold">Templates</span>
        </div>
        <div class="flex gap-4">
          <pvButton v-ripple class="p-ripple" icon="pi pi-refresh" rounded raised @click="refresh" />
          <RouterLink :to="{ name: 'admin-templates-add'}">
            <pvButton v-ripple class="p-ripple" icon="pi" rounded raised><span class="material-icons">add</span></pvButton>
          </RouterLink>
        </div>
          </div>
    </template>
    <template #loading>
      <VueLoader />
    </template>
    <pvColumn field="title" header="Title" sortable></pvColumn>
    <pvColumn field="createdAt" sortable header="Created">
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
        <!-- <div class="cursor-pointer material-icons md-30 hover:text-sky-600 text-gray-600">visibility</div> -->
        <RouterLink :to="{ name: 'admin-templates-edit', params: { templateId: data._id }}">
          <div class="cursor-pointer material-icons md-30 hover:text-sky-600 text-gray-600">edit</div>
        </RouterLink>
        <Modal :header="'Delete Template'" v-if="auth.user.isAdmin">
          <template v-slot:trigger="{ open }">
            <div class="cursor-pointer material-icons md-30 hover:text-red-600 text-gray-600" @click="open">delete</div>
          </template>
          <template v-slot:content="{ close }">
            <div v-if="!deleteLoading">
              <div>Are you sure you want to delete this template?</div>
              <div class="text-red-600">{{ data.title }}</div>
              <div class="flex justify-end mt-4">
                <pvButton label="Delete" severity="danger" @click="deleteTemplate(data, close)"/>
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
          Total Templates: {{ totalRecords }}
        </div>
        <div class="hidden md:block">
          <pvPaginator ref="templatePaginator" :rows="perPage" :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="totalRecords" template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" @page="handlePage" />
        </div>
        <div class="md:hidden">
          <pvPaginator ref="campaignPaginator" :rows="perPage" :totalRecords="totalRecords" template="PrevPageLink CurrentPageReport NextPageLink" @page="handlePage" />
        </div>
      </div>
    </template>
  </pvDataTable>
</template>
  
  
<script lang="ts" setup>
import { onMounted, computed, ref, watch } from 'vue'
import { format } from 'date-fns'
import { useAuth } from '@/stores/auth'
import VueLoader from '@/components/common/VueLoader.vue'
import Modal from '@/components/common/Modal.vue'

const auth = useAuth()

const props = defineProps(['search'])
// const emit = defineEmits(['update:modelValue'])

const templatePaginator = ref(null as any)
const templates = ref([])
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
  getTemplates()
}

// const selectedTemplate = computed({
//   get() {
//     return props.modelValue
//   },
//   set(template) {
//     if (props.modelValue === template) {
//       emit('update:modelValue', null)
//     } else {
//       emit('update:modelValue', template)
//     }
//   }
// })

const getTemplates = async () => {
  loading.value = true
  try {
    const res = await auth.api.get(
      `/admin/templates?search=${props.search}&page=${page.value}&perPage=${perPage.value}&sortField=${sortField.value}&sortOrder=${sortOrder.value}`)

    templates.value = res.data.paginatedResults
    totalRecords.value = res.data.totalCount
  } catch(err: any) {
    console.log(err.message)
  }
  loading.value = false
}
  
watch(() => props.search, getTemplates)

onMounted(getTemplates)

const refresh = (e: any) => {
  if (templatePaginator.value) {
    if (templatePaginator.value.page !== 0) {
      templatePaginator.value.changePageToFirst(e)
    } else {
      getTemplates()
    }
  }
}

const handlePage = (pagination: any) => {
  perPage.value = pagination.rows
  page.value = pagination.page
  getTemplates()
}

const deleteTemplate = async (template: any, closeModal: any) => {
  deleteLoading.value = true
  try {
    await auth.api.delete(`/admin/templates/${template._id}`)
    templates.value = templates.value.filter(t => t !== template)
    totalRecords.value = totalRecords.value - 1
  } catch(err: any) {
    console.log(err.message)
  }
  closeModal()
  deleteLoading.value = false
}

</script>
  
  
  <style scoped>
  
  </style>