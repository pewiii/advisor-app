<template>

<div class="h-full w-full dark:text-white flex flex-col justify-between client-table" v-if="auth.user">
  <pvDataTable v-model:selection="selectedRespondent" selectionMode="single" :value="respondents" :dataKey="(respondent: any) => (respondent._id)" :sort="sort" :unstyled="true">
    <pvColumn field="firstName" header="First Name" sortable class="capitalize">
      <template #body="{data}">
        {{ data.firstName.toLowerCase() }}
      </template>
    </pvColumn>
    <pvColumn field="lastName" header="Last Name" sortable class="capitalize">
      <template #body="{data}">
        {{ data.lastName.toLowerCase() }}
      </template>
    </pvColumn>
    <pvColumn field="status" header="Status" sortable></pvColumn>
    <pvColumn field="event" header="Event" sortable>
      <template #body="{data}">
        {{ events[data.event] && moment(`${events[data.event].date} ${events[data.event].time}`, 'YYYY-MM-DD HH:mm').format('MM/DD/YYYY @   h:mm a') }}
      </template>
      <!-- {{ moment(event[data.event]?.date).format('MM/DD/YYYY') }} - {{ moment(event[data.event]?.time) }} -->
    </pvColumn>
  </pvDataTable>

  <div class="flex justify-evenly mb-3 paginator items-center" :style="{ color: color.primary}">
      <div class="hidden sm:block lg:hidden xl:block">
        Total: {{ totalRecords }}
      </div>
        <pvPaginator ref="campaignPaginator" :pt="settings.paginatorPassthrough" class="paginator-element" :rows="perPage" :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="totalRecords" template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" @page="handlePage"/>
    </div>
</div>


</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useAuth } from '@/stores/auth';
import moment from 'moment'
import { useSettings } from '@/stores/settings';
import { storeToRefs } from 'pinia';

const props = defineProps(['modelValue', 'respondentList', 'campaign', 'search'])

const emit = defineEmits(['update:modelValue', 'update:respondentList'])

const auth = useAuth()
// const respondents = ref([])
const loading = ref(true)

const respondents = computed({
  get() {
    return props.respondentList
  },
  set(respondents: any) {
    emit('update:respondentList', respondents)
  }
})

const settings = useSettings()

const { color } = storeToRefs(settings)

const page = ref(0)
const perPage = ref(10)
const totalRecords = ref(0)
const sortField = ref('updatedAt')
const sortOrder = ref(-1)
const events = ref({} as any)

const selectedRespondent = computed({
  get() {
    return props.modelValue
  },
  set(respondent: any) {
    if (respondent !== props.modelValue) {
      emit('update:modelValue', respondent)
    }
  }
})


const eventDate = (eventId: string) => {
  const event = events.value[eventId]
  // console.log(eventId)
  if (event) {

    // return moment(event.date).format('MM/DD/YYYY')
  }
}

const getRespondents = async () => {
  console.log('fetcing respondents')
  loading.value = true
  try {
    const res = await auth.api.get(
      `/client/respondents/${props.campaign._id}?earch=${props.search}&page=${page.value}&perPage=${perPage.value}&sortField=${sortField.value}&sortOrder=${sortOrder.value}`)
    respondents.value = res.data.paginatedResults
    if (!selectedRespondent.value && res.data.paginatedResults.length > 0) {
      selectedRespondent.value = res.data.paginatedResults[0]
    }
    totalRecords.value = res.data.totalCount
  } catch(err) {
    console.log(err)
  }
  loading.value = false
}

const sort = () => {
}

watch(() => props.campaign, () => {
  events.value = {}
  props.campaign.events.forEach((event: any) => {
    events.value[event._id] = event
  })
  respondents.value = []
  selectedRespondent.value = null
  getRespondents()
}, { immediate: true  })


const handlePage = (pagination: any) => {
  perPage.value = pagination.rows
  page.value = pagination.page
  getRespondents()
}


onMounted(getRespondents)


</script>