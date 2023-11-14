<template>
  <form class="">
    <div>
      <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
        <div class="text-lg">
          Campaign
        </div>
        <div class="material-icons md-30">campaign</div>
      </div>
      <div class="md:pl-4">
        <label for="campaign-title" class="">
            Title
            <FieldError :error="formErrors.title"></FieldError>
        </label>
        <div class="pl-2">
          <pvInputText id="campaign-title" v-model="campaign.title" placeholder="Campaign Title" class="w-full h-9"/>
        </div>
      </div>
      <div class="md:pl-4">
        <label for="campaign-client" class="">
          Client (Select from client list)
          <FieldError :error="formErrors.client"></FieldError>
        </label>
        <div class="pl-2">
          <pvInputText id="campaign-client" :value="clientDisplay" placeholder="Campaign Client" class="h-9 w-full" @change="(e: any) => e.target.value = clientDisplay" />
        </div>
      </div>
      <div class="md:pl-4">
        <label for="campaign-template" class="">
          Template (Select from template list)
        </label>
        <div class="pl-2">
          <pvInputText id="campaign-template" :value="templateDisplay" placeholder="Campaign Template" class="h-9 w-full" @change="(e: any) => e.target.value = templateDisplay" />
        </div>
      </div>
    </div>
    <div class="mt-8" v-if="campaign._id">
      <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
        <div class="text-lg">
          Mailing List
        </div>
        <div class="material-icons md-30">email</div>
      </div>
      <div class="mt-4 flex gap-4 pl-4">
        <div v-if="!campaign.fileName">
          <label></label>
          <input id="choose_file" ref="fileUpload" @change="handleFileChange" type="file" accept=".csv" hidden>
          <pvButton v-ripple class="p-ripple" @click="chooseFiles()" raised :disabled="campaign.fileName" label="Choose File" icon="pi pi-file" iconPos="right" outlined size="small" text/>
        </div>
        <div
        v-else
        class="text-gray-600 truncate font-semibold text-lg flex gap-4"
        >
        <div>
          {{ campaign.fileName }}
        </div>
        <div class="cursor-pointer material-icons hover:text-red-600" @click="removeFile">
          delete
        </div>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <div class="flex items-center mb-2 font-semibold text-primary justify-between">
        <div class="flex gap-2">
          <div class="text-lg">
            Events
          </div>
          <div class="material-icons md-30">location_on</div>
        </div>
        <div>
          <pvButton v-ripple class="p-ripple" raised @click="addEvent" size="small" icon="pi pi-plus" iconPos="right" label="Add Event" outlined />
        </div>
      </div>
      <div>
        <div v-for="(event, idx) in campaign.events" class=" mt-4" :key="`campaign-event-${idx}`">
          <div class="text-slate-600 flex justify-between mt-4 bg-primary bg-opacity-20 p-1 hover:bg-opacity-30 border-1 border-primary border-opacity-50" @click="expandEvent(event)">
            <div class="flex gap-2">
              <div class="font-semibold">
                Event {{ idx + 1 }}
              </div>
              <div v-if="campaign.events.length" class="flex cursor-pointer font-bold text-primary">
                <div v-if="expandedEvents.includes(event)" class="flex">
                  <div class="flex items-center justify-center">Collapse</div>
                  <span class="material-icons">expand_less</span>
                </div>
                <div v-else class="flex">
                  <div class="flex items-center justify-center">Expand</div>
                  <span class="material-icons">expand_more</span>
                </div>
              </div>
            </div>
            <div class="material-icons hover:text-red-600 cursor-pointer" @click="removeEvent(event)">delete</div>
          </div>
          <div v-if="expandedEvents.includes(event)" class="bg-gray-100 pr-4 pb-2">
            <div class="md:pl-4">
              <label :for="`event-${idx}-name`" class="">
                Location Name
                <FieldError :error="formErrors.events[idx].locationName"></FieldError>
              </label>
              <div class="pl-2">
                <pvInputText :id="`event-${idx}-name`" v-model="event.locationName" placeholder="Event Location" class="w-full h-9"/>
              </div>
            </div>
            <div class="md:pl-4">
              <label :for="`event-${idx}-name`" class="">
                Address 1
                <FieldError :error="formErrors.events[idx].address1"></FieldError>
              </label>
              <div class="pl-2">
                <pvInputText :id="`event-${idx}-address1`" v-model="event.address1" placeholder="Event Primary Address" class="w-full h-9"/>
              </div>
            </div>
            <div class="md:pl-4">
              <label :for="`event-${idx}-name`" class="">
                Address 2
              </label>
              <div class="pl-2">
                <pvInputText :id="`event-${idx}-address2`" v-model="event.address2" placeholder="Event Secondary Address" class="w-full h-9"/>
              </div>
            </div>
            <div class="flex flex-col md:flex-row">
              <div class="md:pl-4 w-full">
                <label :for="`event-${idx}-city`" class="">
                  City
                  <FieldError :error="formErrors.events[idx].city"></FieldError>
                </label>
                <div class="pl-2">
                  <pvInputText :id="`event-${idx}-city`" v-model="event.city" placeholder="Event City" class="w-full h-9"/>
                </div>
              </div>
              <div class="md:pl-4">
                <label :for="`event-${idx}-state`" class="">
                  State
                  <FieldError :error="formErrors.events[idx].state"></FieldError>
                </label>
                <div class="pl-2">
                  <pvInputText :id="`event-${idx}-state`" v-model="event.state" placeholder="Event State" class="w-full h-9"/>
                </div>
              </div>
              <div class="md:pl-4">
                <label :for="`event-${idx}-zip`" class="">
                  Zip Code
                  <FieldError :error="formErrors.events[idx].zip"></FieldError>
                </label>
                <div class="pl-2">
                  <pvInputText :id="`event-${idx}-zip`" v-model="event.zip" placeholder="Event Zip Code" class="w-full h-9"/>
                </div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row">
              <div class="md:pl-4">
                <label :for="`event-${idx}-date`" class="">
                  Date
                  <FieldError :error="formErrors.events[idx].date"></FieldError>
                </label>
                <div class="pl-2">
                  <input :id="`event-${idx}-date`" type="date" v-model="event.date" placeholder="Event Date" class="h-9 w-full rounded-md border-1 border-gray-500 pl-4 pr-2 outline-primary" />
                </div>
              </div>
              <div class="md:pl-4">
                <label :for="`event-${idx}-time`" class="">
                  Time
                  <FieldError :error="formErrors.events[idx].time"></FieldError>
                </label>
                <div class="pl-2">
                  <input :id="`event-${idx}-time`" type="time" v-model="event.time" placeholder="Event Date" class="h-9 w-full rounded-md border-1 border-gray-500 pl-4 pr-2 outline-primary" />
                </div>
              </div>
              <div class="md:pl-4 flex-1">
                <label :for="`event-${idx}-time`" class="">
                  Timezone
                  <FieldError :error="formErrors.events[idx].timezone"></FieldError>
                </label>
                <div class="pl-2">
                  <pvDropdown v-model="event.timezone" :options="objects.timezones" optionLabel="name" optionValue="value" class="w-full h-9"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center mb-2 justify-between mt-8 text-primary font-semibold">
      <div class="flex gap-2">
          <div class="text-lg">
            Questions
          </div>
          <div class="material-icons md-30">question_mark</div>
        </div>
      <div>
          <pvButton v-ripple class="p-ripple" raised @click="addQuestion" size="small" icon="pi pi-plus" iconPos="right" label="Add Question" outlined />
        </div>
    </div>
    <div>
      <div v-for="(question, idx) in campaign.questions" class="mt-4 bg-gray-100" :key="`campaign-question-${idx}`">
        <div class="text-slate-600 flex justify-between bg-primary bg-opacity-20 p-1 hover:bg-opacity-30 border-1 border-primary border-opacity-50" @click="expandQuestion(question)">
            <div class="flex gap-2">
              <div class="font-semibold">
                Question {{ idx + 1 }}
              </div>
              <div v-if="campaign.questions.length" class="flex cursor-pointer font-bold text-primary">
                <div v-if="expandedQuestions.includes(question)" class="flex">
                  <div class="flex items-center justify-center">Collapse</div>
                  <span class="material-icons">expand_less</span>
                </div>
                <div v-else class="flex">
                  <div class="flex items-center justify-center">Expand</div>
                  <span class="material-icons">expand_more</span>
                </div>
              </div>
            </div>
            <div class="material-icons hover:text-red-600 cursor-pointer" @click="removeQuestion(question)">delete</div>
          </div>
        <div v-if="expandedQuestions.includes(question)" class="bg-gray-100 pr-4 pb-2">
          <div class="md:pl-4">
            <label :for="`question-${idx}-text`" class="">
              Question
              <FieldError :error="formErrors.questions[idx].text" />
            </label>
            <div class="pl-2">
              <pvInputText :id="`question-${idx}-text`" v-model="campaign.questions[idx].text" placeholder="Question Text" size="small" class="w-full h-9"/>
            </div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="md:pl-4 flex-1">
              <label :for="`question-${idx}-answertype`" class="">
                Answer Type
                <FieldError :error="formErrors.questions[idx].answerType" />
              </label>
              <div class="pl-2">
                <pvDropdown :id="`question-${idx}-answertype`" v-model="campaign.questions[idx].answerType" :options="objects.questionTypes" optionLabel="name" optionValue="value" class="w-full h-9"/>
              </div>
            </div>
            <div class="md:pl-4 flex-1">
              <label :for="`question-${idx}-placeholder`" class="">
                Label
                <FieldError :error="formErrors.questions[idx].label" />
              </label>
              <div class="pl-2">
                <pvInputText :id="`question-${idx}-label`" v-model="campaign.questions[idx].label" placeholder="Label" size="small" class="w-full h-9"/>
              </div>
            </div>
            <div class="md:pl-4 flex-1" v-if="question.answerType !== 'select' && question.answerType !== 'checkbox'">
              <label :for="`question-${idx}-placeholder`" class="">
                Placeholder Text
              </label>
              <div class="pl-2">
                <pvInputText :id="`question-${idx}-placeholder`" v-model="campaign.questions[idx].placeholder" placeholder="Placeholder" size="small" class="w-full h-9"/>
              </div>
            </div>
          </div>
          <div v-if="question.answerType === 'select'" class="w-full md:pl-8">
            <div class="flex">
              <label class="label mt-2 mr-2">Options:</label>
              <div class="">
                <pvButton v-ripple @click="question.options.push('')" size="small" icon="pi pi-plus" iconPos="right" rounded class="p-ripple !h-7 !w-7 mt-1" />
              </div>
            </div>
            <div class="md:pl-4 w-full" v-for="(option, opIdx) in question.options" :key="`campaign-queston-${idx}-option-${opIdx}`">
              <div class="flex justify-between">
                <label :for="`question-${idx}-option-${opIdx}`" class="">
                  Option {{ opIdx + 1 }}
                </label>
                <div class="material-icons text-slate-600 hover:text-red-600 cursor-pointer" @click="removeOption(question.options, idx)">delete</div>
              </div>
              <div class="pl-2 md:flex w-full">
                <pvInputText :id="`event-${idx}-address1`" v-model="campaign.questions[idx].options[opIdx]" placeholder="Dropdown Option" class="w-full h-9"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-16 gap-4 flex-wrap">
      <pvButton v-ripple class="p-ripple" label="Cancel" icon="pi pi-times" iconPos="right" severity="secondary" @click="cancel" raised />
      <pvButton v-ripple class="p-ripple" label="Submit" icon="pi pi-check" iconPos="right" @click="submitCampaign" raised :disabled="formErrors.hasErrors"/>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { notify } from "@kyvg/vue3-notification"
import objects from '@/objects'
import moment from 'moment-timezone'
import FieldError from '@/components/common/FieldError.vue'


const loading = ref(false)

const props = defineProps(['campaign', 'selectedClient', 'selectedTemplate', 'cancel'])
const emit = defineEmits(['update:campaign'])

const auth = useAuthStore()
const fileUpload = ref(null as any)
const expandedEvents = ref([] as any[])
const expandedQuestions = ref([] as any[])

const campaign = computed({
  get() {
    return props.campaign
  },
  set(campaign) {
    emit('update:campaign', campaign)
  }
})

// validation
const formErrors = ref({} as any)
watch(campaign, () => {
  const required = (field: string) => `${field} is required`
  let errors = {
    ...campaign.value.title ? {} : { title: required('Title') },
    ...campaign.value.client ? {} : { client: required('Client') },
  } as any
  const events = campaign.value.events.map((event: any) => {
    return {
      ...event.locationName ? {} : { locationName: required('Location Name') },
      ...event.address1 ? {} : { address1: required('Address 1') },
      ...event.city ? {} : { city: required('City') },
      ...event.state ? {} : { state: required('State') },
      ...event.zip ? {} : { zip: required('Zip Code') },
      ...event.date ? {} : { date: required('Date') },
      ...event.time ? {} : { time: required('Time') },
      ...event.timezone ? {} : { timezone: required('Timezone')}
    }
  })
  const labels = [] as string[]
  const questions = campaign.value.questions.map((question: any) => {
    const result = {
      ...question.text ? {} : { text: required('Question')},
      ...question.answerType ? {} : { answerType: required('Answer type')},
      ...question.label ? {} : { label: required('Label')},
      // ...labels.includes(question.label) ? { label: 'Label must be unique' } : {}
    }
    if (labels.includes(question.label)) {
      result.label = 'Label must be unique'
    }
    labels.push(question.label)
    return result
  })
  const hasEventErrors = events.some((event: any) => Object.keys(event).length)
  const hasQuestionErrors = questions.some((question: any) => Object.keys(question).length)
  errors.hasErrors = Boolean(Object.keys(errors).length) || hasEventErrors || hasQuestionErrors
  errors.events = events
  errors.questions = questions
  formErrors.value = errors
}, { deep: true, immediate: true })

onMounted(() => {
  if (props.selectedTemplate && !campaign.value.template) {
    campaign.value.template = props.selectedTemplate
  }
})


const clientDisplay = computed(() => {
  let result = ''
  if (campaign.value.client) {
    result += campaign.value.client.fullName
    if (campaign.value.client.company) {
      result += ` - ${campaign.value.client.company}`
    }
  }
  return result
})

const templateDisplay = computed(() => {
  return campaign.value.template ? campaign.value.template.title : ''
})

const events = computed(() => campaign.value.events)
watch(events, () => {
  events.value.forEach((event: any) => {
    if (event.eventDate && event.timezone && !(event.date || event.time)) {
      const localEventTime = moment.utc(event.eventDate).tz(event.timezone);
      const localDate = localEventTime.format('YYYY-MM-DD');
      const localTime = localEventTime.format('HH:mm:ss');
      event.date = localDate
      event.time = localTime
    }
  })
}, { deep: true, immediate: true })


const submitCampaign = async () => {
  try {
    loading.value = true
    const data = JSON.parse(JSON.stringify(campaign.value))
    data.user = auth.user._id
    if (data.client) {
      data.client = data.client._id
    }
    if (data.template) {
      data.template = data.template._id
    } else {
      delete data.template
    }
    const info = {
      path: data._id ? '/campaigns/update' : '/campaigns/add',
      title: data._id ? 'Updated' : 'Created',
      text: data._id ? 'Campaign updated successfully' : 'Campaign created successfully'
    }
    await auth.api.post(info.path, data)
    campaign.value = null
    notify({
      title: info.title,
      text: info.text,
      type: 'success'
    })
    // template.value = null
  } catch(err: any) {
    console.log(err)
  }
  loading.value = false
}


watch(() => props.selectedClient, () => {
  campaign.value.client = props.selectedClient
})
watch(() => props.selectedTemplate, () => {
  campaign.value.template = props.selectedTemplate
})



const expandEvent = (event: any) => {
  if (expandedEvents.value.includes(event)) {
    expandedEvents.value = expandedEvents.value.filter(expandedEvent => expandedEvent !== event)
  } else {
    expandedEvents.value.push(event)
  }
}
const addEvent = () => {
  campaign.value.events.push({ ...objects.emptyEvent })
}
const removeEvent = (event: any) => {
  campaign.value.events = campaign.value.events.filter((campaignEvent: any) => campaignEvent !== event)
}



const expandQuestion = (question: any) => {
  if (expandedQuestions.value.includes(question)) {
    expandedQuestions.value = expandedQuestions.value.filter(expandedQuestion => expandedQuestion !== question)
  } else {
    expandedQuestions.value.push(question)
  }
}
const addQuestion = () => {
  campaign.value.questions.push({ ...objects.emptyQuestion })
}
const removeQuestion = (question: any) => {
  campaign.value.questions = campaign.value.questions.filter((campaignQuestion: any) => campaignQuestion !== question)
}
const removeOption = (options: string[], idx: number) => {
  if (idx >= 0 && idx < options.length) {
    options.splice(idx, 1)
  } else {
    console.error('Invalid index. Index must be within the range of the array.')
  }
  return options
}



const chooseFiles = () => {
  if (fileUpload.value) {
    fileUpload.value.click()
  }
}
const uploadFile = async (file: any) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('campaign', campaign.value._id)
  const res = await auth.api.post('/uploads/csv/add', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
  campaign.value = res.data
}
const handleFileChange = async (e: Event) => {
  loading.value = true
  try {
    const inputEl = e.target as HTMLInputElement
    if (inputEl.files && inputEl.files[0]) {
      await uploadFile(inputEl.files[0])
      notify({
      title: 'Mail File',
      text: 'File uploaded successfully',
      type: 'success'
      })
    }
  } catch(err) {
    console.log(err)
  }
  loading.value = false
}
const removeFile = async () => {
  loading.value = true
  try {
    const data = {
      campaign: campaign.value._id
    }
    const res = await auth.api.post('/uploads/csv/delete', data)
    campaign.value = res.data
    notify({
      title: 'Mail File',
      text: 'File removed successfully',
      type: 'success'
    })
  } catch(err: any) {
    console.log(err.message)
  }
  loading.value = false
}

</script>

<style >
  .campaign-dropdown span {
    padding-top: .3rem !important;
  }
</style>