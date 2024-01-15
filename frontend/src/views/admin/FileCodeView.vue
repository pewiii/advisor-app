<template>
  <div class="bg-white p-6 shadow-lg">
    <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
      <div class="text-lg">
        File
      </div>
      <div class="material-icons md-30">table</div>
    </div>
    <div class="mt-4 flex gap-4 pl-4">
      <div>
        <label></label>
        <input id="choose_file" ref="fileUpload" @change="handleFileChange" type="file" accept=".csv" hidden>
        <pvButton v-ripple class="p-ripple" @click="chooseFiles" raised :disabled="file" label="Choose File" icon="pi pi-file" iconPos="right" outlined size="small" text/>
      </div>
      <div
      v-if="file"
      class="text-gray-600 truncate font-semibold text-lg flex gap-4"
      >
      <div>
        {{ file.name }}
      </div>
      <div class="cursor-pointer material-icons hover:text-red-600" @click="removeFile">
        delete
      </div>
      </div>
    </div>

    <div class="flex items-center mb-2 mt-8 font-semibold gap-2 text-primary">
      <div class="text-lg">
        Code & Save
      </div>
      <div class="material-icons md-30">key</div>
    </div>
    <div class="flex gap-4">
      <div class="mt-4 gap-4 pl-4">
        <pvButton v-ripple class="p-ripple" @click="codeFile" raised :disabled="!file" label="Code" icon="pi pi-key" iconPos="right" outlined size="small" text/>
      </div>
      <div class="-mt-1" v-if="loading">
        <VueLoader />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useAuth } from '@/stores/auth';
import VueLoader from '@/components/common/VueLoader.vue'
import { useNotification } from '@kyvg/vue3-notification';

const auth = useAuth()

const fileUpload = ref(null as any)
const file = ref(null as any)
const loading = ref(false)
const { notify } = useNotification()

const chooseFiles = () => {
  if (fileUpload.value) {
    fileUpload.value.click()
  }
}

const handleFileChange = (e: any) => {
  const inputEl = e.target as HTMLInputElement
    if (inputEl.files && inputEl.files[0]) {
      console.log(inputEl.files[0])
      file.value = inputEl.files[0]
    }
}

const removeFile = () => {
  file.value = null
}



const codeFile = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('file', file.value)
    const res = await auth.api.post('/uploads/csv/code', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    })
  
    const blob = res.data
    const url = URL.createObjectURL(blob)
    
    // const files = res.headers['content-disposition'].split(';')[1]
    // const fileName = files.split('=')[1]
    const downloadLink = document.createElement('a')
    downloadLink.href = url
    downloadLink.download = `coded_${file.value.name}`
    downloadLink.click()
    URL.revokeObjectURL(url)
    file.value = null
  } catch (err) {
    console.log(err)
    notify({
      title: 'File error',
      text: 'Error codeing file',
      type: 'error'
    })
  }
  loading.value = false
}

</script>