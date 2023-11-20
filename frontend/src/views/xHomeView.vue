<template>
  <div v-if="route.name !== 'home' " class="min-h-screen bg-gray-200">
    <RouterView />
  </div>
  <div v-else class="min-h-screen relative">
    <LandingTemplate v-if="templateData" :templateData="templateData" />
    <div v-else>
      <!-- <img :src="image" class="bg-cover w-full h-full absolute"/> -->
      <div class="w-full h-full flex justify-center items-center min-h-screen p-10" :style="{'background-image': `url(${image})`, 'background-size': 'cover', 'background-position': 'center', 'background-attachment': 'fixed' }">
        <div class="max-w-3xl flex flex-col">
          <h1 class="text-4xl font-semibold">Welcome!</h1>
          <p class="text-xl">Dui ut ornare lectus sit amet est. Id aliquet risus feugiat in ante metus dictum. Bibendum neque egestas congue quisque egestas. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Est placerat in egestas erat imperdiet sed. Lacus viverra vitae congue eu. Sit amet risus nullam eget felis eget nunc. At augue eget arcu dictum varius duis at consectetur. Velit dignissim sodales ut eu. Senectus et netus et malesuada fames ac turpis egestas. Viverra nam libero justo laoreet sit.</p>
          <form class="flex gap-4 mt-4 items-center flex-wrap" @submit.prevent="submitCode">
            <input v-model="offerCode" placeholder="Offer Code" class="rounded h-16 w-44 text-3xl text-center" :disabled="loading"/>
            <pvButton raised v-ripple class="h-16 p-ripple !font-semibold !text-xl" label="Submit" icon="pi pi-arrow-right" iconPos="right" :loading="loading" @click="submitCode" :disabled="!Boolean(offerCode)"/>
            <div v-if="codeError" class="text-xl text-red-700">Invalid Offer Code</div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import image from '@/assets/pexels-photo.jpeg'
import { useAuthStore } from '@/stores/auth';
import LandingTemplate from '@/components/template/LandingTemplate.vue'

const route = useRoute()
const auth = useAuthStore()

const loading = ref(false)
const offerCode = ref('')
const codeError = ref(false)

const templateData = ref(null)

watch(offerCode, () => {
  codeError.value = false
})

const submitCode = async () => {
  loading.value = true

  try {
    console.log('here')
    const { data } = await auth.api.post('/offer-code', { offerCode: offerCode.value })
    templateData.value = data
    console.log(templateData.value)

  } catch(err: any) {
    codeError.value = true
    console.log(err)
  }
  loading.value = false
}

console.log(route)

</script>