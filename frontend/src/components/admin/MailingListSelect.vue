<template>

  <Modal header="Mailing List" size="">
    <template #trigger="{open}">
      <pvButton v-ripple class="p-ripple" @click="open" raised :label="'Choose'" icon="pi pi-file" iconPos="right" outlined size="small" text/>
    </template>
    <template #content>
      <div v-if="loading" class="flex justify-center">
        <VueLoader />
      </div>
      <div v-else-if="message" class="flex justify-center">
       {{ message }}
      </div>
      <form v-else>
        <div>
          <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
            <div class="text-lg">
              Expiration
            </div>
          </div>
          <div class="md:pl-4">
            <label for="list-expire" class="">
                Records expire after
                <!-- <FieldError :error="formErrors.title"></FieldError> -->
            </label>
            <div class="pl-2">
              <!-- <pvInputText id="campaign-title" v-model="campaign.title" placeholder="Campaign Title" class="w-full h-9"/> -->
              <div class="pl-2">
                <pvDropdown :id="`list-expire`" v-model="expireMonths" :options="objects.listExpirationMonths" optionLabel="name" optionValue="value" class="w-full h-9"/>
              </div>
            </div>
          </div>
        </div>
  
        <div>
          <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
            <div class="text-lg">
              File
            </div>
          </div>
          <div class="md:pl-4 flex gap-4">
            <input id="choose_file" ref="fileUpload" @change="handleFileChange" type="file" accept=".csv" hidden>
            <pvButton v-ripple class="p-ripple" @click="chooseFiles" raised label="Choose" icon="pi pi-file" iconPos="right" outlined size="small" text/>
            <div v-if="file" class="font-bold text-secondary">
              {{ file.name }}
            </div>
          </div>
        </div>
  
        <div>
          <div class="flex justify-center mt-16 gap-4 flex-wrap">
            <pvButton v-ripple class="p-ripple" label="Upload" icon="pi pi-upload" iconPos="right" @click="uploadFile" raised :disabled="!file"/>
          </div>          
        </div>
      </form>
      
    </template>
  </Modal>


</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Modal from '@/components/common/Modal.vue'
import objects from '@/objects'
import VueLoader from '@/components/common/VueLoader.vue'
import { useAuth } from '@/stores/auth';
import { useNotification } from '@kyvg/vue3-notification';
import moment from 'moment-timezone'

const auth = useAuth()
const { notify } = useNotification()

const props = defineProps(['modelValue', 'campaign'])

const emit = defineEmits(['update:modelValue'])

const loading = ref(false)
const message = ref(null as null | string)

const expireMonths = ref(3)

const fileUpload = ref(null as any)

const file = ref(null as any)


const chooseFiles = () => {
  if (fileUpload.value) {
    fileUpload.value.click()
  }
}
const uploadFile = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('campaign', props.campaign._id)
    formData.append('months', expireMonths.value.toString())
    const res = await auth.api.post('/uploads/csv/add', formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    emit('update:modelValue', res.data)
    message.value = 'File uploaded'
    notify({
      title: 'Mail File',
      text: 'File uloaded successfully',
      type: 'success'
    })
  } catch(err: any) {
    console.log(err)
    if (err.response) {
      message.value = err.response.data.message
    }
  }
  // console.log(res)
  // campaign.value = res.data
  // console.log(res.data)
  loading.value = false
}

const handleFileChange = async (e: Event) => {
  const inputEl = e.target as HTMLInputElement

  if (inputEl && inputEl.files && inputEl.files[0]) {
    file.value = inputEl.files[0]
  }

  // loading.value = true
  // try {
  //   const inputEl = e.target as HTMLInputElement
  //   if (inputEl.files && inputEl.files[0]) {
  //     await uploadFile(inputEl.files[0])
  //     notify({
  //     title: 'Mail File',
  //     text: 'File uploaded successfully',
  //     type: 'success'
  //     })
  //   }
  // } catch(err) {
  //   console.log(err)
  // }
  // loading.value = false
}

</script>