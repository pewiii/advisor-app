<template>
  <Modal :header="'Image Select'">
    <template v-slot:trigger="{ open }">
      <pvButton label="Select" @click="open" raised outlined icon="pi pi-image" iconPos="right" size="small"/>
    </template>
    <template v-slot:content>

      <pvGalleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="images" :responsiveOptions="responsiveOptions" :numVisible="7"
        containerStyle="max-width: 850px" :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
        <template #header>
          <div class="flex justify-center mb-4 gap-8">
            <pvButton label="Delete Image" severity="danger" @click="deleteImage"/>
            <pvButton label="Use Image" @click="useImage"/>
          </div>
        </template>
        <template #item="slotProps">
            <img :src="slotProps.item.url" :alt="slotProps.item.alt" style="width: 100%; display: block" />
        </template>
      </pvGalleria>


      <div v-if="images" class="flex flex-wrap gap-4">
          <div v-for="(image, index) of images" :key="index" class="w-48 h-48">
              <img :src="image.url" :alt="image.alt" @click="imageClick(index)" class="cursor-pointer" />
          </div>
      </div>

      <div class="">
        <div>
          <label></label>
          <input id="choose_file" ref="imageUpload" @change="handleFileChange" type="file" accept="image/*" hidden>
          <pvButton v-ripple class="p-ripple whitespace-nowrap" @click="chooseFiles()" raised label="Add Image" icon="pi pi-file" iconPos="right" outlined size="small" text/>
        </div>
      </div>
    </template>
  </Modal>

</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Modal from '@/components/common/Modal.vue'
import { useAuthStore } from '@/stores/auth';
import { useImageStore } from '@/stores/images';
import { notify } from '@kyvg/vue3-notification';
import { storeToRefs } from 'pinia';

const auth = useAuthStore()
const imageStore = useImageStore()
const { images } = storeToRefs(imageStore)

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])


const imageUpload = ref(null as any)
const loading = ref(false)
const displayCustom = ref(false)

const activeIndex = ref(0)

const imageClick = (idx: number) => {
  activeIndex.value = idx
  displayCustom.value = true
}

const responsiveOptions = [
  {
      breakpoint: '1024px',
      numVisible: 5
  },
  {
      breakpoint: '768px',
      numVisible: 3
  },
  {
      breakpoint: '560px',
      numVisible: 1
  }
]

const selectedImage = computed({
  get() {
    return props.modelValue
  },
  set(image) {
    emit('update:modelValue', image)
  }
})

const useImage = () => {
  const image = images.value[activeIndex.value]
  selectedImage.value = image
  displayCustom.value = false
}

const deleteImage = () => {
  const image = images.value[activeIndex.value]
  displayCustom.value = false
  imageStore.deleteImage(image)
}

const uploadFile = async (file: any) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await auth.api.post('/uploads/image/add', formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    images.value = [ res.data, ...images.value]
  } catch(err: any) {
    console.log(err)
  }
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
      title: 'Image File',
      text: 'File uploaded successfully',
      type: 'success'
      })
    }
  } catch(err) {
    console.log(err)
  }
  loading.value = false
}


</script>