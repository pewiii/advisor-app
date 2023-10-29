<template>
  <div class="flex justify-between mb-4 p-10">
    <RouterLink to="/staff/clients"><div class="btn"><span class="material-icons md-36 translate-y-3 -mt-6">arrow_back</span>Back</div></RouterLink>
    <!-- <RouterLink to="/staff/clients/add-edit"><div class="btn hover:bg-sky-500 hover:!text-gray-200"><span class="material-icons md-36 translate-y-3 -mt-6">add</span>Add Client</div></RouterLink> -->
  </div>
  <div class="flex justify-center">
    <div class="bg-white w-full max-w-3xl">
      <div class="bg-slate-700 px-8 py-6 text-xl font-semibold text-gray-200">
        Campaign
      </div>
      <form class="p-8">

        <div class="flex items-center mb-2">
          <span class="material-icons text-gray-600 md-36">campaign</span>
          <div class="text-lg text-gray-600">
            Campaign
          </div>
        </div>
        <div class="border-b-2 border-gray-300 flex">
          <!-- <span class="material-icons text-gray-600 md-36">edit</span> -->
          <label class="label mt-2 mr-2">
            Title:
          </label>
          <input type="text" v-model="campaign.title" placeholder="Title" class="w-full"/>
          <!-- <input type="text" v-model="campaign.lastName" placeholder="Last Name" class=""/> -->
        </div>
        <div class="border-b-2 border-gray-300 flex w-full">
          <!-- <span class="material-icons text-gray-600 md-36">person</span> -->
          <label class="label mt-2 mr-2">
            Client:
          </label>
          <input type="text" :value="campaign.client. fullName || `${campaign.client.firstName} ${campaign.client.lastName}`" placeholder="Client" class="w-full" disabled/>
          <!-- <select v-model="campaign.client" placeholder="Client" class="w-full">
            <option v-for="client in clients" :value="client._id">{{ `${client.firstName} ${client.lastName}` }}</option>
          </select> -->
            <!-- <input type="text" v-model="campaign.client" placeholder="Client" class="w-full"/> -->
        </div>
        <div class="border-b-2 border-gray-300 flex w-full">
          <!-- <span class="material-icons text-gray-600 md-36">web</span> -->
          <label class="label mt-2 mr-2">
            Template:
          </label>
            <input type="text" v-model="campaign.landingTemplate" placeholder="Landing Page" class="w-full"/>
        </div>

        <div class="mt-8">
          <div class="flex items-center mb-2">
            <span class="material-icons text-gray-600 md-36">email</span>
            <div class="text-lg text-gray-600">
              Mailing List
            </div>
          </div>

          <!-- <span class="material-icons text-gray-600 md-36">list</span> -->
          <div class="mt-4 flex gap-4">
            <label></label>
            <input id="choose_file" ref="fileUpload" @change="handleFileChange" type="file" accept=".csv" hidden>
            <button 
            @click.prevent="chooseFiles()" 
            class="whitespace-nowrap bg-slate-700 px-2 py-1 text-white rounded-md shadow-md hover:bg-gray-600 -translate-y-3 ml-2 "
            >Choose File</button>
            <div 
            v-if="fileDisplay" 
            class="text-gray-400 -translate-y-2 truncate cursor-pointer"
            >
            {{ fileDisplay }}
            </div>
          </div>
        </div>

        <div class="mt-8">
          <div class="flex items-center mb-2 justify-between">
            <div class="flex">
              <span class="material-icons text-gray-600 md-36">location_on</span>
              <div class="text-lg text-gray-600">
                Events
              </div>
              <div class="ml-4">
                <div class="rounded-full bg-slate-700 w-8 h-8 flex items-center justify-center text-white font-semibold shadow-lg hover:bg-slate-600 cursor-pointer" @click="addEvent"><span class="material-icons">add</span></div>
              </div>
            </div>
            <div v-if="campaign.events.length" class="ml-4">
              <div class="h-8 flex items-center justify-center text-slate-700 font-semibold cursor-pointer" @click="showEvents = !showEvents">{{ showEvents ? 'Collapse' : 'Expand'}}</div>
            </div>
          </div>
          <div v-if="showEvents">

            <div v-for="(event, idx) in campaign.events" class=" mt-4 bg-gray-100">
  
              <div class="text-slate-600 flex justify-between mt-6">
                <div>Event {{ idx + 1 }}</div>
                <div class="material-icons hover:text-red-600 cursor-pointer" @click="removeEvent(event)">delete</div>
              </div>
              <div class="ml-4">
                
                <div class="border-b-2 border-gray-300 flex w-full">
                  <!-- <span class="material-icons text-gray-600 md-36"></span> -->
                  <label class="label mt-2 mr-2">
                    Name:
                  </label>
                  <input type="text" v-model="event.locationName" placeholder="Location Name" class="w-full h-10"/>
                </div>
      
                <div class="border-b-2 border-gray-300 flex w-full">
                  <!-- <span class="material-icons text-gray-600 md-36"></span> -->
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
                  <!-- <span class="material-icons text-gray-600 md-36">location_on</span> -->
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
                    <!-- <label></label> -->
                    <input type="time" v-model="event.time" class="h-10"/>
                    <!-- <label for="timezone">Time Zone:</label> -->
                    <select name="timezone" class="h-10 bg-white">
                      <option value="America/New_York">Eastern Time (ET) - UTC-5</option>
                      <option value="America/Chicago">Central Time (CT) - UTC-6</option>
                      <option value="America/Denver">Mountain Time (MT) - UTC-7</option>
                      <option value="America/Los_Angeles">Pacific Time (PT) - UTC-8</option>
                      <option value="America/Anchorage">Alaska Time (AKT) - UTC-9</option>
                      <option value="Pacific/Honolulu">Hawaii Time (HST) - UTC-10</option>
                      <!-- You can add more time zones as needed -->
                    </select>
                  </div>
                </div>
              </div>
  
              
              
            </div>
          </div>
          
        </div>

        <div class="flex items-center mb-2 justify-between mt-8">
          <div class="flex">
            <span class="material-icons text-gray-600 md-36">question_mark</span>
            <div class="text-lg text-gray-600">
              Questions
            </div>
            <div class="ml-4">
              <div class="rounded-full bg-slate-700 w-8 h-8 flex items-center justify-center text-white font-semibold shadow-lg hover:bg-slate-600 cursor-pointer" @click="addQuestion"><span class="material-icons">add</span></div>
            </div>
          </div>
            <div v-if="campaign.questions.length" class="ml-4">
              <div class="h-8 flex items-center justify-center text-slate-700 font-semibold cursor-pointer" @click="showQuestions = !showQuestions">{{ showQuestions ? 'Collapse' : 'Expand'}}</div>
            </div>
        </div>

        <div v-if="showQuestions">
          <div v-for="(question, idx) in campaign.questions" class="mt-6 bg-gray-100">

            <div class="text-slate-600 flex justify-between">
              <div>Question {{ idx + 1 }}</div>
              <div class="material-icons hover:text-red-600 cursor-pointer" @click="removeQuestion(question)">delete</div>
            </div>

            <div class="border-b-2 border-gray-300 flex w-full">
              <!-- <span class="material-icons text-gray-600 md-36"></span> -->
              <label class="label mt-2 mr-2">
                Question:
              </label>
              <input type="text" v-model="question.text" placeholder="Question Text" class="w-full h-10"/>
            </div>

            <div class="border-b-2 border-gray-300 flex w-full">
              <!-- <span class="material-icons text-gray-600 md-36"></span> -->
              <label class="">
              </label>
              <label class="mt-2 text-gray-500 mr-2 whitespace-nowrap">Answer Type:</label>
              <select class="w-32 bg-white mr-4 h-10" v-model="question.type">
                <option v-for="questionType in questionTypes">{{questionType}}</option>
              </select>
              <div v-if="question.type !== 'select' && question.type !== 'checkbox'" class="flex">
                <label class="mt-2 text-gray-500 mr-2">Placeholder:</label>
                <input type="text" v-model="question.placeholder" placeholder="Answer Placeholder" class="h-10 w-full"/>
              </div>
            </div>

            <div v-if="question.type === 'select'" class="border-b-2 border-gray-300 w-full">
              <div class="flex">
                <label class="label mt-2 mr-2 mb-3">Options:</label>
                <div class="ml-2 mt-2">
                  <div class="rounded-full bg-slate-700 w-6 h-6 flex items-center justify-center text-white font-semibold shadow-lg hover:bg-slate-600 cursor-pointer" @click="question.options.push('')"><span class="material-icons">add</span></div>
                </div>
              </div>

              <div v-for="(option, idx) in question.options" class="flex">
                <label class="label whitespace-nowrap mt-2 mr-2">Option {{ idx + 1 }}:</label>
                <input type="text" v-model="question.options[idx]" class="h-10 w-full" placeholder="Option" />
                <div class="material-icons text-slate-600 hover:text-red-600 cursor-pointer" @click="removeOption(question.options, idx)">delete</div>
              </div>

            </div>

          </div>
        </div>



        <div class="flex justify-end mt-8">
          <button class="btn" @click.prevent="addCampaign()">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCampaignStore } from '@/stores/campaign';
import { notify } from "@kyvg/vue3-notification"
import { useRouter } from 'vue-router';
import router from '@/router';
import { storeToRefs } from 'pinia';

const { campaign } = storeToRefs(useCampaignStore())

const auth = useAuthStore()

const fileUpload = ref(null as any)

const showEvents = ref(true)
const showQuestions = ref(true)

const emptyEvent = {
  locationName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  // eventDate: ''
  date: '',
  time: '',
  timezone: 'America/New_York'
}

const emptyQuestion = {
  text: '',
  type: 'text',
  options: [],
  placeholder: ''
}

const questionTypes = [
  'text',
  'number',
  'select',
  'checkbox',
  'date',
  'time',
]

// const campaign = ref({
//   title: '',
//   client: '',
//   landingTemplate: '',
//   extraQuestions: [],
//   user: '',
//   events: []
// })

// const clients = ref([])


const addCampaign = async () => {
  try {
    console.log(campaign.value)
    const data = JSON.parse(JSON.stringify(campaign.value))
    data.user = auth.user._id
    data.client = data.client._id

    //temp
    delete data.landingTemplate

    console.log(data)

    await auth.api.post('/campaigns/add', data)
    notify({
      title: 'Created',
      text: 'Campaign created successfully',
      type: 'success'
    })
    router.push('/staff/campaigns')
  } catch(err: any) {
    console.log(err.message)
  }
}


const addEvent = () => {
  campaign.value.events.push({ ...emptyEvent })
}

const removeEvent = (event: any) => {
  campaign.value.events = campaign.value.events.filter(campaignEvent => campaignEvent !== event)
}

const addQuestion = () => {
  campaign.value.questions.push({ ...emptyQuestion })
}

const removeQuestion = (question: any) => {
  campaign.value.questions = campaign.value.questions.filter(campaignQuestion => campaignQuestion !== question)
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

const handleFileChange = (e: Event) => {
  const inputEl = e.target as HTMLInputElement
  if (inputEl.files && inputEl.files[0]) {
    campaign.value.files = inputEl.files
    // emit('update:modelValue', inputEl.files)
  }
}

const fileDisplay = computed(() => {
  if (campaign.value.files && campaign.value.files.length) {
    return campaign.value.files[0].name
  }
  return null
})

onMounted(() => {
  console.log(campaign.value.client)
  if (!campaign.value.client._id) {
    router.push('/staff/clients')
  }
})

</script>

<style scoped>
  input {
    @apply px-4
  }
</style>