<template>
  <div class="relative w-full max-h-screen overflow-hidden">
    <div class="absolute z-10 flex w-full h-full items-center justify-center">
      <div class="bg-white p-8 ml-64 max-w-2xl" :style="{ 'background-color': `${templateData.config.headerPanelBgColor}`, 'color': `${templateData.config.headerPanelTextColor}` }">
        <div class="font-bold text-2xl capitalize">
          Hello {{ templateData.person.firstName.toLowerCase() }}
        </div>
        <div class="text-xl mt-4">
          {{ templateData.config.headerPanelText }}
        </div>
      </div>
      <div v-if="arrowDown" class="absolute z-20 bottom-0 mb-8 text-white">
        <span class="material-icons md-56 font-bold">arrow_downward</span>
      </div>
    </div>
    <img :src="headerImage" class="bg-cover w-full"/>
  </div>
  <div class="p-20 flex flex-col justify-center items-center" :style="{ 'background-color': `${templateData.config.headingSectionBgColor}`, 'color': `${templateData.config.headingSectionTextColor}` }">
    <div class="text-center max-w-7xl">
      <div class="text-3xl font-semibold">{{ templateData.config.headingSectionHeading }}</div>
      <div class="mt-6">{{ templateData.config.headingSectionText }}</div>
    </div>
  </div>
  <div class="relative flex items-center">
    <div class="absolute bg-white ml-40 max-w-3xl p-6" :style="{ 'background-color': `${templateData.config.infoPanelBgColor}`, 'color': `${templateData.config.infoPanelTextColor}` }">
      <div class="font-bold text-4xl">{{ templateData.config.infoPanelHeading }}</div>
      <div>
        {{ templateData.config.infoPanelText }}
      </div>
    </div>
    <img :src="infoImage" class="bg-cover w-full" />
  </div>
</template>

<script lang="ts" setup>
// import image from '@/assets/tempimage.jpg'
import { ref, onMounted, computed, watch } from 'vue'
import topImage from '@/assets/tempimage.jpg'
import bottomImage from '@/assets/steak.jpg'

const props = defineProps(['templateData'])


const headerImage = computed(() => {
  if (props.templateData.config && props.templateData.config.headerImage) {
    return props.templateData.config.headerImage.url
  }
  return topImage
})

const infoImage = computed(() => {
  if (props.templateData.config && props.templateData.config.infoImage) {
    return props.templateData.config.infoImage.url
  }
  return bottomImage
})

watch(() => props.templateData, () => {
  console.log(props.templateData)
}, { deep: true })


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

const getOpacity = (number:number) => {
  number = number / 1500
  const _opacity = Math.round(Math.min(Math.max(number, 0), 1) * 255);
  let opacityHex = _opacity.toString(16).toUpperCase()
  return opacityHex
}

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