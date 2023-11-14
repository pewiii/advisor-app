import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { notify } from "@kyvg/vue3-notification"
import { useRouter } from 'vue-router'
import { useAuthStore } from './auth'

export const useImageStore = defineStore('images', () => {
  
  const auth = useAuthStore()

  const images = ref([] as any[])

  const getImages = async () => {
    try {
      const res = await auth.api.get('/images')
      images.value = res.data
    } catch(err: any) {
      console.log(err.message)
    }
  }

  const deleteImage = async (image: any) => {
    try {
      // const image = images.value[activeIndex.value]
      await auth.api.post('/uploads/image/delete', image)
      // displayCustom.value = false
      images.value = images.value.filter((i) => {
        console.log(i === image)
        return i !== image
      })
    } catch(err) {
      console.log(err)
    }
  }

  
  onMounted(getImages)

  return {
    images,
    getImages,
    deleteImage,
  }

})