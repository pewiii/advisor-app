<template>
  <div class="h-full w-full">
    <pvDataTable v-model:selection="campaignSelect" selectionMode="single" v-model:expandedRows="expandedRows" :value="campaigns" dataKey="_id"
          @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" tableStyle="">
      <template #header>
          <div class="flex flex-wrap justify-content-end gap-2">
              <!-- <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" /> -->
              <!-- <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" /> -->
          </div>
      </template>
      <pvColumn expander style="width: 5rem" />
      <pvColumn field="title" header="Campaign"></pvColumn>
      <pvColumn field="reach" header="Reach"></pvColumn>
      <pvColumn field="respondents" header="Respondents">
        <template #body="{data}">
          {{ data.respondents.length }}
        </template>
      </pvColumn>
      <pvColumn field="status" header="Status"></pvColumn>


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


      <template #expansion="slotProps">
          <div class="p-3">
            <h5>Respondents</h5>
            <pvDataTable v-model:selection="respondentSelect" selectionMode="single" :value="slotProps.data.respondents">
                <pvColumn field="fullName" header="Name" sortable>
                  <template #body="{ data }"><div class="capitalize">{{ (data.fullName ? data.fullName : `${data.firstName} ${data.lastName}`).toLowerCase() }}</div></template>
                </pvColumn>
                <pvColumn field="createdAt" header="Registered" sortable>
                  <template #body="{data}">
                    {{ format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm') }}
                  </template>
                </pvColumn>

            </pvDataTable>
          </div>
      </template>
    </pvDataTable>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useAuth } from '@/stores/auth';
import format from 'date-fns/format';

const auth = useAuth()

const props = defineProps(['selectedCampaign', 'selectedRespondent', 'search'])

const emit = defineEmits(['update:selectedCampaign', 'update:selectedRespondent'])

const loading = ref(false)
const campaigns = ref([])

const page = ref(0)
const perPage = ref(5)
const totalRecords = ref(0)
const sortField = ref('updatedAt')
const sortOrder = ref(-1)

const campaignSelect = computed({
  get() {
    return props.selectedCampaign
  },
  set(selectedCampaign: any) {
    if (props.selectedCampaign === selectedCampaign) {
      emit('update:selectedCampaign', null)
    } else {
      emit('update:selectedCampaign', selectedCampaign)
    }
  }
})

const respondentSelect = computed({
  get() {
    return props.selectedRespondent
  },
  set(selectedRespondent) {
    if (props.selectedRespondent === selectedRespondent) {
      emit('update:selectedRespondent', null)
    } else {
      emit('update:selectedRespondent', selectedRespondent)
    }
  }
})

const getCampaigns = async () => {
  loading.value = true
  try {
    // const res = await auth.api.get('/client/campaigns')
    const res = await auth.api.get(
      `/client/campaigns?search=${props.search}&page=${page.value}&perPage=${perPage.value}&sortField=${sortField.value}&sortOrder=${sortOrder.value}`)
    console.log(res.data)
    campaigns.value = res.data.data
    totalRecords.value = res.data.total
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