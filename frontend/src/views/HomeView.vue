<template>
  <div v-if="route.name !== 'home' " class="min-h-screen bg-gray-200">
    <RouterView />
  </div>
  <div v-else class="min-h-screen relative">
    <LandingTemplate v-if="templateData" :templateData="templateData" />
    <div v-else>
      <img :src="image" class="bg-cover w-full h-full absolute"/>
      <div class="absolute z-10 w-full h-full flex justify-center items-center">
        <div class="max-w-3xl flex flex-col">
          <h1 class="text-4xl font-semibold">Welcome!</h1>
          <p class="text-xl">Dui ut ornare lectus sit amet est. Id aliquet risus feugiat in ante metus dictum. Bibendum neque egestas congue quisque egestas. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Est placerat in egestas erat imperdiet sed. Lacus viverra vitae congue eu. Sit amet risus nullam eget felis eget nunc. At augue eget arcu dictum varius duis at consectetur. Velit dignissim sodales ut eu. Senectus et netus et malesuada fames ac turpis egestas. Viverra nam libero justo laoreet sit.</p>
          <div class="flex gap-4 mt-4">
            <input v-model="offerCode" placeholder="Offer Code" class="rounded h-16 w-44 text-3xl text-center" :disabled="loading"/>
            <pvButton raised v-ripple class="h-16 p-ripple !font-semibold !text-xl" label="Submit" icon="pi pi-arrow-right" iconPos="right" :loading="loading" @click="submitCode"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import image from '@/assets/pexels-photo.jpeg'
import { useAuthStore } from '@/stores/auth';
import LandingTemplate from '@/components/template/LandingTemplate.vue'

const route = useRoute()
const auth = useAuthStore()

const loading = ref(false)
const offerCode = ref('')

// const events = ref(null as any)
// const questions = ref(null as any)
// const person = ref(null as any)

const templateData = ref(null)

const submitCode = async () => {
  loading.value = true

  try {

    const { data } = await auth.api.post('/offer-code', { offerCode: offerCode.value })
    templateData.value = data

  } catch(err: any) {
    console.log(err)
  }
  loading.value = false
}

console.log(route)

</script>