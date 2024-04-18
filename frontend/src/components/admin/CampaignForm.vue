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

      <div class="md:pl-4 mt-2">
        <label for="campaign-title" class="">
            Job Number
            <FieldError :error="formErrors.jobNumber"></FieldError>
        </label>
        <div class="pl-2">
          <pvInputText id="campaign-job" v-model="campaign.jobNumber" placeholder="Job Number" class="w-full h-9"/>
        </div>
      </div>
      <!-- <div class="md:pl-4">
        <label for="campaign-client" class="">
          Client
          <FieldError :error="formErrors.client"></FieldError>
        </label>
        <div class="pl-2">
          <pvInputText id="campaign-client" :value="clientDisplay" placeholder="Campaign Client" class="h-9 w-full" @change="(e: any) => e.target.value = clientDisplay" />
        </div>
      </div> -->
      <!-- <div class="md:pl-4">
        <label for="campaign-template" class="">
          Template
        </label>
        <div class="pl-2 flex">
          <pvInputText id="campaign-template" :value="templateDisplay" placeholder="Campaign Template" class="h-9 w-full" @change="(e: any) => e.target.value = templateDisplay" />
        </div>
      </div> -->
    </div>

    <div class="mt-4 border-t-2 pt-4">
      <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
        <div class="text-lg">
          Client
        </div>
        <div class="material-icons md-30">person</div>
      </div>
      <div class="mt-4 flex gap-4 pl-4 text-gray-600 truncate font-semibold text-lg">
        {{ clientDisplay }}
      </div>
    </div>


    <div class="mt-4 border-t-2 py-4">
      <div class="flex items-center font-semibold text-primary justify-between">
        <div class="flex gap-2">
          <div class="text-lg">
            Template
          </div>
          <div class="material-icons md-30">web</div>
        </div>
        <div>
          <TemplateSelect v-model="campaign.template" />
        </div>
      </div>
      <div class="flex gap-4 pl-4 text-gray-600 truncate font-semibold text-lg">
        {{ templateDisplay }}
      </div>
    </div>

    <div class="border-t-2 py-4">
      <!-- <div class="flex items-center font-semibold gap-2 text-primary">
        <div class="text-lg">
          Mailing List
        </div>
        <div class="material-icons md-30">email</div>
      </div> -->
      <!-- <div>
        <label></label>
          <input id="choose_file" ref="fileUpload" @change="handleFileChange" type="file" accept=".csv" hidden>
          <pvButton v-ripple class="p-ripple" @click="chooseFiles()" raised :disabled="campaign.fileName" label="Choose File" icon="pi pi-file" iconPos="right" outlined size="small" text/>
      </div> -->
      <!-- <div v-if="!campaign._id" class="mt-4 flex gap-4 pl-4">
        Save the campaign to add a mailing list
      </div> -->
      <div class="flex items-center font-semibold text-primary justify-between">
        <div>
          <div class="flex gap-2">
            <div class="text-lg">
              Mailing List
            </div>
            <div class="material-icons md-30">email</div>
          </div>
        </div>
        <div>
          <!-- <pvButton v-ripple class="p-ripple" raised @click="addEvent" size="small" icon="pi pi-plus" iconPos="right" label="Add Event" outlined /> -->
          <!-- <div v-if="fileLoading" class="h-16">
          </div> -->
          <div v-if="campaign._id">
            <div v-if="campaign.file && !fileLoading" class="flex gap-4">
              <div v-if="fileExpired" class="text-red-600">
                Expired
              </div>
              <div>
                {{ campaign.file.name }}
              </div>
              <div class="text-secondary">
                {{ campaign.file.recordCount }} Records
              </div>
              <pvButton v-ripple class="p-ripple h-7" icon="pi pi-download" v-tooltip.top="'Download Coded File'" @click="downloadFile"></pvButton>
              <modal>
                <template #trigger="{open}">
                  <pvButton severity="danger" v-ripple class="p-ripple h-7" icon="pi pi-delete-left" v-tooltip.top="'Delete File'" @click="open"></pvButton>
                </template>
                <template #content>
                  Are you sure you want to delete this file?
                  <div class="flex justify-end mt-4">
                    <pvButton label="Delete" severity="danger" @click="removeFile"/>
                  </div>
                </template>
              </modal>
            </div>
            <div v-if="!campaign.file && !fileLoading">
              <MailingListSelect v-model="campaign.file" :campaign="campaign"/>
            </div>
            <div v-if="fileLoading">
              <VueLoader />
            </div>
          </div>
          <div v-else>
            <div>Save the campaign to add a mailing list</div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t-2 py-4">
      <div class="flex items-center font-semibold text-primary justify-between">
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
          <div class="text-slate-600 flex justify-between mt-4 bg-primary bg-opacity-20 p-1 hover:bg-opacity-30 border-1 border-primary border-opacity-50">
            <div class="flex gap-2">
              <div class="font-semibold">
                Event {{ idx + 1 }}
              </div>
              <div v-if="campaign.events.length" class="flex cursor-pointer font-bold text-primary" @click="expandEvent(event)">
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
            <div class="flex gap-2">
              <!-- <div class="material-icons hover:text-red-600 cursor-pointer" @click="cloneEvent(event)" title="Clone">content_copy</div> -->
              <pvButton v-ripple class="p-ripple h-7" icon="pi pi-copy" v-tooltip.top="'Clone Event'" @click="cloneEvent(event)"></pvButton>
              <pvButton severity="danger" v-ripple class="p-ripple h-7" icon="pi pi-delete-left" v-tooltip.top="'Delete Event'" @click="removeEvent(event)"></pvButton>
              <!-- <div class="material-icons hover:text-red-600 cursor-pointer" @click="removeEvent(event)" title="Delete">delete</div> -->
            </div>
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

    <div class="flex justify-center mt-16 gap-4 flex-wrap">
      <Modal :header="'Landing Preview'">
        <template #trigger="{open}">
          <pvButton v-ripple class="p-ripple" label="Preview" icon="pi pi-web" iconPos="right" severity="warning" @click="open" raised :disabled="!Boolean(campaign.template)"/>
        </template>
        <template #content="{}">
          <!-- <div :class="maximized ? 'h-screen' : ''"> -->
            <TemplatePreview :template="campaign.template" :previewCampaign="campaign"/>
          <!-- </div> -->
        </template>
      </Modal>
      <pvButton v-ripple class="p-ripple" label="Back" icon="pi pi-arrow-left" iconPos="right" severity="secondary" @click="emit('onCancel')" raised />
      <pvButton v-ripple class="p-ripple" label="Save" icon="pi pi-check" iconPos="right" @click="emit('onSubmit')" raised :disabled="formErrors.hasErrors"/>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useAuth } from '@/stores/auth'
import { notify } from "@kyvg/vue3-notification"
import objects from '@/objects'
import FieldError from '@/components/common/FieldError.vue'
import Modal from '@/components/common/Modal.vue'
import TemplatePreview from '@/components/admin/TemplatePreview.vue'
import TemplateSelect from '@/components/admin/TemplateSelect.vue'
import MailingListSelect from '@/components/admin/MailingListSelect.vue'
import VueLoader from '@/components/common/VueLoader.vue'
import moment from 'moment-timezone'

const fileLoading = ref(false)

const props = defineProps(['campaign'])
const emit = defineEmits(['update:campaign', 'onSubmit', 'onCancel'])

const auth = useAuth()
const expandedEvents = ref([] as any[])
// const expandedQuestions = ref([] as any[])


const campaign = computed({
  get() {
    return props.campaign
  },
  set(campaign) {
    emit('update:campaign', campaign)
  }
})

const downloadFile = async () => {
  try {
    // app.get('/uploads/csv/:campaignId', auth.verifyToken, api.admin.uploads.csvGet)
    const res = await auth.api.get(`/uploads/csv/${campaign.value._id}`, { responseType: 'blob' })

    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `coded_${campaign.value.jobNumber}.csv`)
    link.click()
  } catch(err) {
    console.log(err)
    notify({ type: 'error', text: 'Failed to download coded records' })
  }
}

const fileExpired = computed(() => {
  if (campaign.value.file) {
    const expirationDate = moment.utc(campaign.value.file.expirationDate)
    const now = moment().utc()
    if (expirationDate < now) {
      return true
    }
    // console.log(expirationDate)
  }
  return false
})

// const nonUniqueTitles = {} as any
// const uniqueTitles = {} as any


// validation
const formErrors = ref({} as any)
watch(campaign, async () => {
  const required = (field: string) => `${field} is required`
  let errors = {
    ...campaign.value.title ? {} : { title: required('Title') },
    ...campaign.value.jobNumber ? {} : { jobNumber: required('Job Number') },
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

  // if (campaign.value.title && !uniqueTitles[campaign.value.title]) {
  //   try {
  //     const res = await auth.api.get(`/admin/campaigns/title/${campaign.value.title}`)
  //     if (res.data.campaign && res.data.campaign !== campaign.value._id) {
  //       nonUniqueTitles[campaign.value.title] = res.data.campaign
  //     } else {
  //       uniqueTitles[campaign.value.title] = true
  //     }
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  // if (nonUniqueTitles[campaign.value.title]) {
  //   errors.title = 'Title must be unique'
  // }

  const hasEventErrors = events.some((event: any) => Object.keys(event).length)
  errors.hasErrors = Boolean(Object.keys(errors).length) || hasEventErrors
  errors.events = events
  formErrors.value = errors
}, { deep: true, immediate: true })


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


const expandEvent = (event: any) => {
  if (expandedEvents.value.includes(event)) {
    expandedEvents.value = expandedEvents.value.filter(expandedEvent => expandedEvent !== event)
  } else {
    expandedEvents.value.push(event)
  }
}
const addEvent = () => {
  const event = { ...objects.emptyEvent }
  campaign.value.events.push(event)
  expandEvent(event)
}
const removeEvent = (event: any) => {
  campaign.value.events = campaign.value.events.filter((campaignEvent: any) => campaignEvent !== event)
}

const cloneEvent = (event: any) => {
  const newEvent = { ...event }
  delete newEvent._id
  campaign.value.events.push(newEvent)
  expandEvent(newEvent)
}

const removeFile = async () => {
  fileLoading.value = true
  try {
    await auth.api.delete(`/uploads/csv/${campaign.value._id}`)
    campaign.value.file = null
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
  .campaign-dropdown span {
    padding-top: .3rem !important;
  }

.max-height-preview {
  max-height: 80vh; /* Adjust the value as needed */
  overflow-y: auto; /* Add scrollbars if content exceeds the maximum height */
}
</style>