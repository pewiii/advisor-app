<template>
  <div class="h-full w-full dark:text-white flex flex-col justify-between">
    <pvDataTable v-model:selection="selectedCampaign" selectionMode="single" :value="campaigns" dataKey="_id"
          @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" tableStyle="" :unstyled="true" class="client-table">
      <!-- <template #header>
          <div class="flex flex-wrap justify-content-end gap-2">
          </div>
      </template> -->
      <pvColumn field="title" header="Campaign"></pvColumn>
      <pvColumn field="reach" header="Reach" class="hidden md:block"></pvColumn>
      <pvColumn field="respondents" header="Respondents">
        <template #body="{data}">
          {{ data.respondents.length }}
        </template>
      </pvColumn>
      <pvColumn field="status" header="Status" class="hidden md:block"></pvColumn>
      <!-- <pvColumn field="actions" header="Actions"></pvColumn> -->


      <!-- <pvColumn header="Image">
          <template #body="{data}">
              <img :src="`https://primefaces.org/cdn/primevue/images/product/${data.image}`" :alt="data.image" class="shadow-4" width="64" />
          </template>
      </pvColumn> -->


      <!-- <pvColumn field="price" header="Price">
          <template #body="{data}">
          </template>
      </pvColumn> -->


      <!-- <pvColumn field="category" header="Category"></pvColumn> -->


      <!-- <pvColumn field="rating" header="Reviews">
          <template #body="{data}">
          </template>
      </pvColumn> -->


      <!-- <pvColumn header="Status">
          <template #body="{data}">
          </template>
      </pvColumn> -->
    </pvDataTable>


    <div class="flex table-paginator justify-evenly text-cyan-500 mb-3">
      <div class="">
        Total: {{ totalRecords }}
      </div>
        <pvPaginator ref="campaignPaginator" :rows="perPage" :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="totalRecords" template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" @page="handlePage" :unstyled="true"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useAuth } from '@/stores/auth';
import format from 'date-fns/format';

const auth = useAuth()

const props = defineProps(['modelValue', 'selectedRespondent', 'search'])

const emit = defineEmits(['update:modelValue'])


const loading = ref(false)
const campaigns = ref([])

const page = ref(0)
const perPage = ref(5)
const totalRecords = ref(0)
const sortField = ref('updatedAt')
const sortOrder = ref(-1)

const selectedCampaign = computed({
  get() {
    return props.modelValue
  },
  set(selectedCampaign: any) {
    emit('update:modelValue', selectedCampaign)
    // if (props.selectedCampaign === selectedCampaign) {
    //   emit('update:selectedCampaign', null)
    // } else {
    //   emit('update:selectedCampaign', selectedCampaign)
    // }
  }
})

watch(selectedCampaign, () => {
  console.log(selectedCampaign.value)
}, { deep: true })

const handlePage = (pagination: any) => {
  perPage.value = pagination.rows
  page.value = pagination.page
  getCampaigns()
}

const getCampaigns = async () => {
  loading.value = true
  try {
    // const res = await auth.api.get('/client/campaigns')
    const res = await auth.api.get(
      `/client/campaigns?search=${props.search}&page=${page.value}&perPage=${perPage.value}&sortField=${sortField.value}&sortOrder=${sortOrder.value}`)
    console.log(res.data.paginatedResults)
    campaigns.value = res.data.paginatedResults
    if (!selectedCampaign.value && res.data.paginatedResults.length > 0) {
      selectedCampaign.value = res.data.paginatedResults[0]
    }
    totalRecords.value = res.data.totalCount
  } catch(err) {
    console.log(err)
  }
  loading.value = false
}


const expandedRows = ref([])

watch(expandedRows, () => {
  console.log(expandedRows.value)
}, { deep: true })


const onRowExpand = () => {

}

const onRowCollapse = () => {

}

onMounted(getCampaigns)

</script>

<style scoped>
.client-table {
  @apply w-full pt-3
}

.client-table >>> table {
  @apply w-full h-full
}

.client-table >>> thead {
  @apply w-full dark:text-cyan-600;
}

.client-table >>> tbody tr {
  @apply hover:dark:bg-cyan-950 hover:bg-cyan-100 cursor-pointer;
}

/* .client-table >>> tbody >>> tr {
  @apply hover:bg-cyan-800;
} */

.client-table >>> td {
  @apply text-center dark:text-cyan-600;
}

.client-table >>> tr[data-p-highlight="true"] {
  @apply bg-cyan-100 dark:bg-cyan-950;
}

.table-paginator >>> div[data-pc-name="paginator"] {
  @apply flex justify-between gap-2;
}

.table-paginator >>> ul {
  @apply text-red-300
  
}

.table-paginator >>> li[data-p-highlight="true"] {
  @apply text-red-500 cursor-pointer
}

body > div:nth-child(3) {
  @apply !bg-red-500 text-red-500
}

/* <div data-pc-section="wrapper" style="max-height: 200px;"><ul id="pv_id_2_list" class="" role="listbox" data-pc-section="list"><li id="pv_id_2_0" role="option" aria-label="5" aria-selected="true" aria-disabled="false" aria-setsize="4" aria-posinset="1" data-p-highlight="true" data-p-focused="false" data-p-disabled="false" data-pc-section="item" data-pd-ripple="true">5<span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span></li><li id="pv_id_2_1" role="option" aria-label="10" aria-selected="false" aria-disabled="false" aria-setsize="4" aria-posinset="2" data-p-highlight="false" data-p-focused="false" data-p-disabled="false" data-pc-section="item" data-pd-ripple="true">10<span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root" style="height: 24px; width: 24px; top: -12px; left: -7.4375px;"></span></li><li id="pv_id_2_2" role="option" aria-label="20" aria-selected="false" aria-disabled="false" aria-setsize="4" aria-posinset="3" data-p-highlight="false" data-p-focused="false" data-p-disabled="false" data-pc-section="item" data-pd-ripple="true">20<span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span></li><li id="pv_id_2_3" role="option" aria-label="50" aria-selected="false" aria-disabled="false" aria-setsize="4" aria-posinset="4" data-p-highlight="false" data-p-focused="false" data-p-disabled="false" data-pc-section="item" data-pd-ripple="true">50<span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span></li><!----></ul></div> */

</style>