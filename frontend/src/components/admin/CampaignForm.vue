<template>
  <form class="p-8 relative">
    <div v-if="fileLoading" class="w-full h-full absolute text-black">
      Uploading...
    </div>
    <div class="flex items-center mb-2 text-red-950 font-semibold gap-2 ">
      <div class="text-lg">
        Campaign
      </div>
      <div class="material-icons md-36">campaign</div>
    </div>
    <div class="border-b-2 border-gray-300 flex">
      <label class="label mt-2 mr-2">
        Title:
      </label>
      <input type="text" v-model="campaign.title" placeholder="Title" class="w-full"/>
    </div>
    <div class="border-b-2 border-gray-300 flex w-full">
      <label class="label mt-2 mr-2">
        Client:
      </label>
      <input type="text" :value="campaign.client && `${campaign.client.fullName || `${campaign.client.firstName} ${campaign.client.lastName}`} ${campaign.client.company ? `- ${campaign.client.company}` : ``}`" placeholder="Client" class="w-full" disabled/>
    </div>
    <div class="border-b-2 border-gray-300 flex w-full">
      <label class="label mt-2 mr-2">
        Template:
      </label>
        <input type="text" v-model="campaign.landingTemplate" placeholder="Landing Page" class="w-full"/>
    </div>

    <div class="mt-8" v-if="campaign._id">
      <div class="flex items-center mb-2 text-red-950 font-semibold gap-2 ">
        <div class="text-lg">
          Mailing List
        </div>
        <div class="material-icons md-36">email</div>
      </div>

      <div class="mt-4 flex gap-4">
        <div v-if="!campaign.fileName">
          <label></label>
          <input id="choose_file" ref="fileUpload" @change="handleFileChange" type="file" accept=".csv" hidden>
          <button 
          @click.prevent="chooseFiles()"
          :disabled="campaign.fileName"
          class="admin-btn btn-sm"
          >Choose File</button>
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
      <div class="flex items-center mb-2 justify-between text-red-950">
        <div class="flex">
          <div class="flex items-center mb-2 text-red-950 font-semibold gap-2 ">
            <div class="text-lg">
              Events
            </div>
            <div class="material-icons md-36">location_on</div>
          </div>
        </div>
        <div class="admin-add" @click="addEvent"><span class="material-icons" title="Add Event">add</span></div>
      </div>
      <div>

        <div v-for="(event, idx) in campaign.events" class=" mt-4 bg-gray-100">

          <div class="text-slate-600 flex justify-between mt-6">
            <div class="flex gap-2">
              <div>
                Event {{ idx + 1 }}
              </div>
              <div v-if="campaign.events.length" class="flex cursor-pointer font-bold text-red-950" @click="expandEvent(event)">
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


          <div v-if="expandedEvents.includes(event)" class="ml-4">
            
            <div class="border-b-2 border-gray-300 flex w-full">
              <label class="label mt-2 mr-2">
                Name:
              </label>
              <input type="text" v-model="event.locationName" placeholder="Location Name" class="w-full h-10"/>
            </div>
  
            <div class="border-b-2 border-gray-300 flex w-full">
              <label class="label mt-2 mr-2">
                Address:
              </label>
              <input type="text" v-model="event.address1" placeholder="Address 1" class="w-full h-10"/>
            </div>
  
            <div class="border-b-2 border-gray-300 flex w-full">
              <label class="label mt-2 mr-2">
                Address:
              </label>
              <input type="text" v-model="event.address2" placeholder="Address 2" class="w-full h-10"/>
            </div>
  
  
            <div class="border-b-2 border-gray-300 flex w-full">
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
            </div>

            <div class="border-b-2 border-gray-300 flex w-full h-11 gap-8">
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center mb-2 justify-between mt-8 text-red-950 font-semibold">
      <div class="flex items-center mb-2 text-red-950 font-semibold gap-2 ">
        <div class="text-lg">
          Questions
        </div>
        <div class="material-icons md-36">question_mark</div>
      </div>
      <div class="admin-add" @click="addQuestion"><span class="material-icons" title="Add Question">add</span></div>
    </div>

    <div>
      <div v-for="(question, idx) in campaign.questions" class="mt-6 bg-gray-100">

        <div class="text-slate-600 flex justify-between">
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
        </div>

        <div v-if="expandedQuestions.includes(question)">
          <div class="border-b-2 border-gray-300 flex w-full">
            <label class="label mt-2 mr-2">
              Question:
            </label>
            <input type="text" v-model="campaign.questions[idx].text" placeholder="Question Text" class="w-full h-10"/>
          </div>

          <div class="border-b-2 border-gray-300 flex w-full">
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
          </div>

          <div v-if="question.answerType === 'select'" class="border-b-2 border-gray-300 w-full">
            <div class="flex">
              <label class="label mt-2 mr-2 mb-3">Options:</label>
              <div class="ml-2 mt-2">
                <div class="admin-add !w-6 !h-6" @click="question.options.push('')"><span class="material-icons">add</span></div>
              </div>
            </div>

            <div v-for="(option, opIdx) in question.options" class="flex">
              <label class="label whitespace-nowrap mt-2 mr-2">Option {{ idx + 1 }}:</label>
              <input type="text" v-model="campaign.questions[idx].options[opIdx]" class="h-10 w-full" placeholder="Option" />
              <div class="material-icons text-slate-600 hover:text-red-600 cursor-pointer" @click="removeOption(question.options, idx)">delete</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-16 gap-4">
      <div class="admin-btn !bg-slate-800" @click="cancel">Cancel</div>
      <button class="admin-btn" @click.prevent="submitCampaign">Submit</button>
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


const fileLoading = ref(false)

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

watch(client, () => {
  campaign.value.client = client.value
})

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
  'text',
  'number',
  'select',
  'checkbox',
  'date',
  'time',
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
  fileLoading.value = true
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
  fileLoading.value = false
}

const removeFile = async () => {
  fileLoading.value = true
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
  fileLoading.value = false
}
</script>

<style scoped>
  input {
    @apply px-4 bg-gray-100 hover:bg-white
  }
  select {
    @apply bg-gray-100
  }
</style>