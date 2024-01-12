<template>
  <div v-if="templateData">
    <OfferLanding :templateData="templateData" />
  </div>
  <div v-else>
    <div class="p-10">
      <p class="tracking-widest font-extrabold text-3xl text-primary">800<span class="text-cyan-400">RSVP</span></p>
    </div>
    <div class="lg:h-screen px-12 lg:px-72 py-32">
      <div class="w-full md:w-1/2 h-full flex flex-col md:justify-center">
      <!-- Main text start -->
      <!-- <div class="bg-slate-900 p-6 bg-opacity-90 rounded-lg hover:bg-opacity-100 transition	ease-in-out"> -->
      <div class="">
        <h1 class="uppercase text-2xl lg:text-5xl xl:text-7xl mb-4 font-semibold text-primary">
          Welcome to 800RSVP
        </h1>
        <p class="capitalize w-full text-stone-700 text-lg">
          Please enter your offer code below to confirm your registration
        </p>
        <!-- Main text end -->
        <form class="flex gap-4 mt-4 items-center flex-wrap" @submit.prevent="submitCode">
          <input v-model="offerCode" placeholder="Offer Code" class="rounded h-16 w-44 text-3xl text-center border-2 " :disabled="loading"/>
          <pvButton raised v-ripple class="h-16 p-ripple !font-semibold !text-xl" label="Submit" icon="pi pi-arrow-right" iconPos="right" :loading="loading" @click="submitCode" :disabled="!Boolean(offerCode)"/>
          <div v-if="codeError" class="text-xl text-red-700">Invalid Offer Code</div>
        </form>
      </div>
    </div>
		</div>



    <!-- <div>800RSVP</div>
    <div class="max-w-3xl flex flex-col">
      <h1 class="text-4xl font-semibold">Welcome!</h1>
      <p class="text-xl">Dui ut ornare lectus sit amet est. Id aliquet risus feugiat in ante metus dictum. Bibendum neque egestas congue quisque egestas. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Est placerat in egestas erat imperdiet sed. Lacus viverra vitae congue eu. Sit amet risus nullam eget felis eget nunc. At augue eget arcu dictum varius duis at consectetur. Velit dignissim sodales ut eu. Senectus et netus et malesuada fames ac turpis egestas. Viverra nam libero justo laoreet sit.</p>
      <form class="flex gap-4 mt-4 items-center flex-wrap" @submit.prevent="submitCode">
        <input v-model="offerCode" placeholder="Offer Code" class="rounded h-16 w-44 text-3xl text-center" :disabled="loading"/>
        <pvButton raised v-ripple class="h-16 p-ripple !font-semibold !text-xl" label="Submit" icon="pi pi-arrow-right" iconPos="right" :loading="loading" @click="submitCode" :disabled="!Boolean(offerCode)"/>
        <div v-if="codeError" class="text-xl text-red-700">Invalid Offer Code</div>
      </form>
    </div> -->

    <div class="absolute right-0 top-0 -z-50 w-screen">
      <img :src="image" alt="img" class="min-w-full min-h-screen object-cover">
		</div>

  </div>
  
</template>

<script lang="ts" setup>
import image from '@/assets/herobg.webp'
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/stores/auth';
import OfferLanding from '@/components/offer/OfferLanding.vue';

const route = useRoute()
const auth = useAuth()

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
    const { data } = await auth.api.post('/offer-code', { offerCode: offerCode.value })
    templateData.value = data
  } catch(err: any) {
    codeError.value = true
    console.log(err)
  }
  loading.value = false
}
</script>