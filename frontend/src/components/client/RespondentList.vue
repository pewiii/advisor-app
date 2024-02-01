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
</div>


</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useAuth } from '@/stores/auth';
import moment from 'moment'

const props = defineProps(['modelValue', 'campaign', 'search'])

const emit = defineEmits(['update:modelValue'])

const auth = useAuth()
const respondents = ref([])
const loading = ref(true)

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
  getRespondents()
}, { immediate: true  })


onMounted(getRespondents)


</script>