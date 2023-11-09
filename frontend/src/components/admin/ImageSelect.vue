<template>
  <Modal :header="'Image Select'">
    <template v-slot:trigger="{ open }">
      <pvButton label="Select" @click="open"/>
    </template>
    <template v-slot:content>

        <pvGalleria v-if="images.length" :value="images" :numVisible="5" containerStyle="max-width: 640px">
          <template #item="slotProps">
              <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%" />
          </template>
          <template #thumbnail="slotProps">
              <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
          </template>
        </pvGalleria>

          <!-- Upload Image -->
          <!-- <pvButton v-if="!showFileUpload" label="Upload" icon="pi pi-upload" iconPos="right" @click="showFileUpload = true"/> -->
        <div>
          <label></label>
          <input id="choose_file" ref="imageUpload" @change="handleFileChange" type="file" accept="image/*" hidden>
          <pvButton v-ripple class="p-ripple" @click="chooseFiles()" raised label="Choose File" icon="pi pi-file" iconPos="right" outlined size="small" text/>
          <!-- <pvButton label="Cancel" icon="pi pi-times" iconPos="right" severity="secondary" @click="cancel" /> -->
          <!-- <button 
          @click.prevent="chooseFiles()"
          :disabled="campaign.fileName"
          class="admin-btn btn-sm"
          >Choose File</button> -->
        </div>

    </template>
    <!-- <template v-slot:content>
      <div>
        Image select content
      </div>
    </template> -->
  </Modal>

</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import Modal from '@/components/common/Modal.vue'
import { useAuthStore } from '@/stores/auth';
import { notify } from '@kyvg/vue3-notification';

const auth = useAuthStore()

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])


const imageUpload = ref(null as any)
const loading = ref(false)

const selectedImage = computed({
  get() {
    return props.modelValue
  },
  set(image) {
    emit('update:modelValue', image)
  }
})

const images = ref([])

const getImages = async () => {
  try {
    const res = await auth.api.get('/images')

    images.value = res.data

  } catch(err: any) {
    console.log(err.message)
  }

}

const uploadFile = async (file: any) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await auth.api.post('/uploads/media/add', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
  console.log(res)
}


const chooseFiles = () => {
  if (imageUpload.value) {
    imageUpload.value.click()
  }
}

const handleFileChange = async (e: Event) => {
  loading.value = true
  try {
    const inputEl = e.target as HTMLInputElement
    if (inputEl.files && inputEl.files[0]) {
      await uploadFile(inputEl.files[0])
      notify({
      title: 'Media File',
      text: 'File uploaded successfully',
      type: 'success'
      })
    }
  } catch(err) {
    console.log(err)
  }
  loading.value = false
}

onMounted(getImages)


</script>