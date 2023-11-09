<template>
  <div class="relative w-full max-h-screen overflow-hidden">
    <div class="absolute z-10 flex w-full h-full items-center justify-center">
      <div class="bg-white p-8 bg-opacity-80 ml-64 max-w-2xl">
        <div class="font-bold text-2xl capitalize">
          Hello {{ templateData.person.firstName.toLowerCase() }}
        </div>
        <div class="text-xl mt-4">
          Dui ut ornare lectus sit amet est. Id aliquet risus feugiat in ante metus dictum. Bibendum neque egestas congue quisque egestas. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Est placerat in egestas erat imperdiet sed. Lacus viverra vitae congue eu. Sit amet risus nullam eget felis eget nunc. At augue eget arcu dictum varius duis at consectetur. Velit dignissim sodales ut eu. Senectus et netus et malesuada fames ac turpis egestas. Viverra nam libero justo laoreet sit.
        </div>
      </div>
      <div v-if="arrowDown" class="absolute z-20 bottom-0 mb-8 text-white">
        <span class="material-icons md-56 font-bold">arrow_downward</span>
      </div>
    </div>
    <img :src="headerImage" class="bg-cover w-full"/>
  </div>
  <div class="p-20 flex flex-col justify-center items-center">
    <div class="text-center max-w-7xl">
      <div class="text-3xl font-semibold">Heading Heading Heading</div>
      <div class="mt-6">Dui ut ornare lectus sit amet est. Id aliquet risus feugiat in ante metus dictum. Bibendum neque egestas congue quisque egestas. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Est placerat in egestas erat imperdiet sed. Lacus viverra vitae congue eu. Sit amet risus nullam eget felis eget nunc. At augue eget arcu dictum varius duis at consectetur. Velit dignissim sodales ut eu. Senectus et netus et malesuada fames ac turpis egestas. Viverra nam libero justo laoreet sit.</div>
    </div>
  </div>
  <div class="relative flex items-center">
    <div class="absolute bg-white ml-40 max-w-3xl p-6">
      <div class="font-bold text-4xl">Info</div>
      <div>
        Dui ut ornare lectus sit amet est. Id aliquet risus feugiat in ante metus dictum. Bibendum neque egestas congue quisque egestas.
      </div>
    </div>
    <img :src="steakImage" class="bg-cover w-full" />
  </div>
</template>

<script lang="ts" setup>
// import image from '@/assets/tempimage.jpg'
import { ref, onMounted, computed } from 'vue'
import headerImage from '@/assets/tempimage.jpg'
import steakImage from '@/assets/steak.jpg'

const props = defineProps(['templateData'])


const events = computed(() => {
  return props.templateData.campaign.events
})

const questions = computed(() => {
  return props.templateData.campaign.questions
})

const config = computed(() => {
  return props.templateData.config
})

const arrowDown = ref(false)

onMounted(() => {
  let interval = null
  const timeout = setTimeout(() => {
    
    interval = setInterval(() => {
      arrowDown.value = !arrowDown.value
    }, 1000)
  }, 3000);

  document.addEventListener('scroll', () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (interval) {
      clearInterval(interval)
    }
    arrowDown.value = false
  })
})

</script>