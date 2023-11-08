<template>
  <form class="relative">


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
        </label>
        <div class="pl-2">
          <pvInputText id="campaign-title" v-model="campaign.title" placeholder="Campaign Title" class="w-full h-9"/>
        </div>
      </div>

      <div class="md:pl-4">
        <label for="campaign-client" class="">
          Client (Select from client list)
        </label>
        <div class="pl-2">
          <pvInputText id="campaign-client" :value="campaign.client ? `${campaign.client.fullName}${campaign.client.company ? ` - ${campaign.client.company}` : ''}` : ''" placeholder="Campaign Client" disabled class="w-full h-9 disabled:bg-white !text-gray-900 client-input"/>
        </div>
      </div>

      <div class="md:pl-4">
        <label for="campaign-template" class="">
          Template
        </label>
        <div class="pl-2">
          <pvInputText id="campaign-template" v-model="campaign.landingTemplate" placeholder="Landing Template" class="w-full h-9"/>
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
        <!-- <div v-if="loading" class="w-full h-full text-black">
          <div class="loader"></div>
        </div> -->
        <div v-if="!campaign.fileName">
          <label></label>
          <input id="choose_file" ref="fileUpload" @change="handleFileChange" type="file" accept=".csv" hidden>
          <pvButton v-ripple class="p-ripple" @click="chooseFiles()" raised :disabled="campaign.fileName" label="Choose File" icon="pi pi-file" iconPos="right" outlined size="small" text/>
          <!-- <pvButton label="Cancel" icon="pi pi-times" iconPos="right" severity="secondary" @click="cancel" /> -->
          <!-- <button 
          @click.prevent="chooseFiles()"
          :disabled="campaign.fileName"
          class="admin-btn btn-sm"
          >Choose File</button> -->
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
        <!-- <div class="admin-add" @click="addEvent"><span class="material-icons" title="Add Event">add</span></div> -->
        <div>
          <pvButton v-ripple class="p-ripple" raised @click="addEvent" size="small" icon="pi pi-plus" iconPos="right" label="Add Event" outlined />
          <!-- <pvButton icon="pi" raised @click="addEvent" size="large"></pvButton> -->
        </div>
      </div>
      <!-- <div class="flex items-center mb-2 justify-between text-red-950">
        <div class="flex">
          <div class="flex items-center mb-2 text-red-950 font-semibold gap-2 ">
            <div class="text-lg">
              Events
            </div>
            <div class="material-icons md-36">location_on</div>
          </div>
        </div>
      </div> -->
      <div>

        <div v-for="(event, idx) in campaign.events" class=" mt-4">

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
              </label>
              <div class="pl-2">
                <pvInputText :id="`event-${idx}-name`" v-model="event.locationName" placeholder="Event Location" class="w-full h-9"/>
              </div>
            </div>
            
            <!-- <div class="border-b-2 border-gray-300 flex w-full">
              <label class="label mt-2 mr-2">
                Name:
              </label>
              <input type="text" v-model="event.locationName" placeholder="Location Name" class="w-full h-10"/>
            </div> -->

            <div class="md:pl-4">
              <label :for="`event-${idx}-name`" class="">
                Address 1
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
                </label>
                <div class="pl-2">
                  <pvInputText :id="`event-${idx}-city`" v-model="event.city" placeholder="Event City" class="w-full h-9"/>
                </div>
              </div>
  
              <div class="md:pl-4">
                <label :for="`event-${idx}-state`" class="">
                  State
                </label>
                <div class="pl-2">
                  <pvInputText :id="`event-${idx}-state`" v-model="event.state" placeholder="Event State" class="w-full h-9"/>
                </div>
              </div>
  
              <div class="md:pl-4">
                <label :for="`event-${idx}-zip`" class="">
                  Zip Code
                </label>
                <div class="pl-2">
                  <pvInputText :id="`event-${idx}-zip`" v-model="event.zip" placeholder="Event Zip Code" class="w-full h-9"/>
                </div>
              </div>
            </div>

  
            <!-- <div class="border-b-2 border-gray-300 flex w-full">
              <label class="label mt-2 mr-2">
                Address:
              </label>
              <input type="text" v-model="event.address1" placeholder="Address 1" class="w-full h-10"/>
            </div> -->
  
            <!-- <div class="border-b-2 border-gray-300 flex w-full">
              <label class="label mt-2 mr-2">
                Address:
              </label>
              <input type="text" v-model="event.address2" placeholder="Address 2" class="w-full h-10"/>
            </div> -->
  
  
            <!-- <div class="border-b-2 border-gray-300 flex w-full">
              <label class="label mt-2 mr-2">
                City:
              </label>
              <input type="text" v-model="event.city" placeholder="City" class="w-full h-10"/>
              <label class="label mt-2 mr-2">
                State:
              </label>
              <input type="text" v-model="event.state" placeholder="State" class="w-24"/>
              <label class="label mt-2 mr-2">
                Zip:
              </label>
              <input type="text" v-model="event.zip" placeholder="Zip" class="w-48"/>
            </div> -->

            <div class="flex flex-col md:flex-row">
              <div class="md:pl-4">
                <label :for="`event-${idx}-date`" class="">
                  Date
                </label>
                <div class="pl-2">
                  <!-- <pvInputText :id="`event-${idx}-date`" v-model="event.date" size="small" class="w-full h-9"/> -->
                  <!-- <pvCalendar :id="`event-${idx}-date`" showIcon v-model="event.date" placeholder="Event Date" class="h-9 w-full"/> -->
                  <input :id="`event-${idx}-date`" type="date" v-model="event.date" placeholder="Event Date" class="h-9 w-full rounded-md border-1 border-gray-500 pl-4 pr-2 outline-primary" />
                </div>
              </div>
  
              <div class="md:pl-4">
                <label :for="`event-${idx}-time`" class="">
                  Time
                </label>
                <div class="pl-2">
                  <!-- <pvInputText :id="`event-${idx}-time`" v-model="event.time" size="small" class="w-full h-9"/> -->
                  <!-- <pvCalendar :id="`event-${idx}-time`" showIcon v-model="event.time" timeOnly hourFormat="12" icon="pi pi-clock" placeholder="Event Time" class="h-9 w-full"/> -->
                  <input :id="`event-${idx}-time`" type="time" v-model="event.time" placeholder="Event Date" class="h-9 w-full rounded-md border-1 border-gray-500 pl-4 pr-2 outline-primary" />
                </div>
              </div>
  
              <div class="md:pl-4 flex-1">
                <label :for="`event-${idx}-time`" class="">
                  Timezone
                </label>
                <div class="pl-2">
                  <!-- <pvInputText :id="`event-${idx}-time`" v-model="event.time" size="small" class="w-full h-9"/> -->
                  <!-- <pvCalenar :id="`event-${idx}-time`" class="h-9" showIcon v-model="event.time" timeOnly icon="pi pi-clock"/> -->
                  <pvDropdown v-model="event.timezone" :options="timezones" optionLabel="name" optionValue="value" class="w-full h-9 campaign-dropdown"/>
                </div>
              </div>
            </div>


            <!-- <div class="border-b-2 border-gray-300 flex w-full h-11 gap-8">
              <label class="mt-2 text-gray-500">Date & Time:</label>
              <div>
                <input type="date" v-model="event.date" class="h-10"/>
                <input type="time" v-model="event.time" class="h-10"/>
                <select name="timezone" v-model="event.timezone" class="h-10 bg-white">
                  <option value="America/New_York">Eastern Time (ET) - UTC-5</option>
                  <option value="America/Chicago">Central Time (CT) - UTC-6</option>
                  <option value="America/Denver">Mountain Time (MT) - UTC-7</option>
                  <option value="America/Los_Angeles">Pacific Time (PT) - UTC-8</option>
                  <option value="America/Anchorage">Alaska Time (AKT) - UTC-9</option>
                  <option value="Pacific/Honolulu">Hawaii Time (HST) - UTC-10</option>
                </select>
              </div>
            </div> -->
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
      <!-- <div class="admin-add" @click="addQuestion"><span class="material-icons" title="Add Question">add</span></div> -->
      <div>
          <pvButton v-ripple class="p-ripple" raised @click="addQuestion" size="small" icon="pi pi-plus" iconPos="right" label="Add Question" outlined />
          <!-- <pvButton icon="pi" raised @click="addEvent" size="large"></pvButton> -->
        </div>
    </div>

    <div>
      <div v-for="(question, idx) in campaign.questions" class="mt-4 bg-gray-100">


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


        <!-- <div class="text-slate-600 flex justify-between">
          <div class="flex gap-2">
            <div>
              Question {{ idx + 1 }}
            </div>
            <div v-if="campaign.questions.length" class="flex cursor-pointer font-bold text-red-950" @click="expandQuestion(question)">
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
        </div> -->

        <div v-if="expandedQuestions.includes(question)" class="bg-gray-100 pr-4 pb-2">
          <div class="md:pl-4">
            <label :for="`question-${idx}-text`" class="">
              Question
            </label>
            <div class="pl-2">
              <pvInputText :id="`question-${idx}-text`" v-model="campaign.questions[idx].text" placeholder="Question Text" size="small" class="w-full h-9"/>
            </div>
          </div>
          <!-- <div class="border-b-2 border-gray-300 flex w-full">
            <label class="label mt-2 mr-2">
              Question:
            </label>
            <input type="text" v-model="campaign.questions[idx].text" placeholder="Question Text" class="w-full h-10"/>
          </div> -->

          <div class="flex flex-col md:flex-row">
            <div class="md:pl-4 flex-1">
              <label :for="`question-${idx}-answertype`" class="">
                Answer Type
              </label>
              <div class="pl-2">
                <!-- <pvInputText :id="`question-${idx}-text`" v-model="campaign.questions[idx].text" placeholder="Question Text" size="small" class="h-9"/> -->
                <pvDropdown :id="`question-${idx}-answertype`" v-model="campaign.questions[idx].answerType" :options="questionTypes" optionLabel="name" optionValue="value" class="w-full h-9 campaign-dropdown"/>
              </div>
            </div>

            <div class="md:pl-4 flex-1" v-if="question.answerType !== 'select' && question.answerType !== 'checkbox'">
              <label :for="`question-${idx}-placeholder`" class="">
                Placeholder Text
              </label>
              <div class="pl-2">
                <!-- <pvInputText :id="`question-${idx}-text`" v-model="campaign.questions[idx].text" placeholder="Question Text" size="small" class="h-9"/> -->
                <pvInputText :id="`question-${idx}-placeholder`" v-model="campaign.questions[idx].placeholder" placeholder="Placeholder" size="small" class="w-full h-9"/>
              </div>
            </div>


          </div>

          <!-- <div class="border-b-2 border-gray-300 flex w-full">
            <label class="">
            </label>
            <label class="mt-2 text-gray-500 mr-2 whitespace-nowrap">Answer Type:</label>
            <select class="w-32 bg-white mr-4 h-10" v-model="campaign.questions[idx].answerType">
              <option v-for="questionType in questionTypes">{{questionType}}</option>
            </select>
            <div v-if="question.answerType !== 'select' && question.type !== 'checkbox'" class="flex">
              <label class="mt-2 text-gray-500 mr-2">Placeholder:</label>
              <input type="text" v-model="campaign.questions[idx].placeholder" placeholder="Answer Placeholder" class="h-10 w-full"/>
            </div>
          </div> -->

          <div v-if="question.answerType === 'select'" class="w-full md:pl-8">
            <div class="flex">
              <label class="label mt-2 mr-2">Options:</label>
              <div class="">
                <pvButton v-ripple @click="question.options.push('')" size="small" icon="pi pi-plus" iconPos="right" rounded class="p-ripple !h-7 !w-7 mt-1" />
              </div>
              <!-- <div class="ml-2 mt-2">
                <div class="admin-add !w-6 !h-6" @click="question.options.push('')"><span class="material-icons">add</span></div>
              </div> -->
            </div>


            <div class="md:pl-4 w-full" v-for="(option, opIdx) in question.options">
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


            <!-- <div v-for="(option, opIdx) in question.options" class="flex">
              <label class="label whitespace-nowrap mt-2 mr-2">Option {{ idx + 1 }}:</label>
              <input type="text" v-model="campaign.questions[idx].options[opIdx]" class="h-10 w-full" placeholder="Option" />
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-16 gap-4">
      <pvButton v-ripple class="p-ripple" label="Cancel" icon="pi pi-times" iconPos="right" severity="secondary" @click="campaign = null" raised />
      <pvButton v-ripple class="p-ripple" label="Submit" icon="pi pi-check" iconPos="right" @click="submitCampaign" raised />
      <!-- <div class="admin-btn !bg-slate-800" @click="cancel">Cancel</div>
      <button class="admin-btn" @click.prevent="submitCampaign">Submit</button> -->
    </div>
  </form>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCampaignStore } from '@/stores/campaign';
import { notify } from "@kyvg/vue3-notification"
import { useRouter } from 'vue-router';
import router from '@/router';
import { storeToRefs } from 'pinia';
import objects from '@/objects'
import moment from 'moment-timezone'
// import { parse, addMinutes } from 'date-fns'
// import { format, utcToZonedTime, toDate } from 'date-fns-tz';
// import 'date-time-format-timezone'


// const fileLoading = ref(false)
const loading = ref(false)

const props = defineProps(['modelValue', 'selectedClient', 'submitCampaign', 'cancel'])
const emit = defineEmits(['update:modelValue'])

const client = computed(() => {
  return props.selectedClient
})

const campaign = computed({
  get() {
    return props.modelValue
  },
  set(campaign) {
    emit('update:modelValue', campaign)
  }
})

const events = computed(() => campaign.value.events)

watch(events, () => {
  events.value.forEach((event: any) => {
    if (event.eventDate && event.timezone && !(event.date || event.time)) {
      // const localEventTime = moment.tz(event.eventDate, 'YYYY-MM-DD HH:mm:ss', event.timezone)
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
    // loadingCampaigns.value = true
    loading.value = true
    const data = JSON.parse(JSON.stringify(campaign.value))
    data.user = auth.user._id
    data.client = data.client._id

    //temp
    delete data.landingTemplate

    // data.events.forEach((campaignEvent: any) => {
    //   campaignEvent.date = campaignEvent.date.split('T')[0]
    //   console.log(campaignEvent.date)
    // })

    console.log(data)

    const info = {
      path: data._id ? '/campaigns/update' : '/campaigns/add',
      title: data._id ? 'Updated' : 'Created',
      text: data._id ? 'Campaign updated successfully' : 'Campaign created successfully'
    }
    const res = await auth.api.post(info.path, data)
    campaign.value = null
    notify({
      title: info.title,
      text: info.text,
      type: 'success'
    })
    // getCampaigns()
  } catch(err: any) {
    console.log(err)
  }
  loading.value = false
}





watch(client, () => {
  campaign.value.client = client.value
})

const timezones = [
  {
    name: "Eastern Time (ET) - UTC-5", value: "America/New_York"
  },
  {
    name: "Central Time (CT) - UTC-6", value: "America/Chicago"
  },
  {
    name: "Mountain Time (MT) - UTC-7", value: "America/Denver"
  },
  {
    name: "Pacific Time (PT) - UTC-8", value: "America/Los_Angeles"
  },
  {
    name: "Alaska Time (AKT) - UTC-9", value: "America/Anchorage"
  },
  {
    name: "Hawaii Time (HST) - UTC-10", value: "Pacific/Honolulu"
  }
]

// const { campaign } = storeToRefs(useCampaignStore())

const auth = useAuthStore()

const fileUpload = ref(null as any)

// const showEvents = ref(true)
// const showQuestions = ref(true)

const expandedEvents = ref([] as any[])
const expandedQuestions = ref([] as any[])

const expandEvent = (event: any) => {
  if (expandedEvents.value.includes(event)) {
    expandedEvents.value = expandedEvents.value.filter(expandedEvent => expandedEvent !== event)
  } else {
    expandedEvents.value.push(event)
  }  
}

const expandQuestion = (question: any) => {
  if (expandedQuestions.value.includes(question)) {
    expandedQuestions.value = expandedQuestions.value.filter(expandedQuestion => expandedQuestion !== question)
  } else {
    expandedQuestions.value.push(question)
  }
}

const questionTypes = [
  { name: 'Text', value: 'text'},
  { name: 'Number', value: 'number'},
  { name: 'Dropdown', value: 'select'},
  { name: 'Checkbox', value: 'checkbox'},
  { name: 'Date Picker', value: 'date'},
  { name: 'Time Picker', value: 'time'},
]


const addEvent = () => {
  campaign.value.events.push({ ...objects.emptyEvent })
}

const removeEvent = (event: any) => {
  campaign.value.events = campaign.value.events.filter((campaignEvent: any) => campaignEvent !== event)
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
};

const chooseFiles = () => {
  if (fileUpload.value) {
    fileUpload.value.click()
  }
}

const uploadFile = async (file: any) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('campaign', campaign.value._id)
  const res = await auth.api.post('/uploads/add', formData, {
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
    const res = await auth.api.post('/uploads/delete', data)
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
  /* input {
    @apply px-4 bg-gray-100 hover:bg-white
  }
  select {
    @apply bg-gray-100
  } */

  .campaign-dropdown span {
    padding-top: .3rem !important;
  }


</style>