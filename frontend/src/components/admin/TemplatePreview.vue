<template>
  <!-- <div>
    Template Preview
  </div> -->
  <div>
    <LandingTemplate v-if="selectedTemplate" :templateData="templateData"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import LandingTemplate from '@/components/template/LandingTemplate.vue'

const props = defineProps(['selectedTemplate', 'previewCampaign'])


const templateData = ref({
  campaign: {},
  events: [],
  questions: [],
  config: {},
  person: {
    firstName: '{First}'
  }
})

watch(() => props.selectedTemplate, () => {
  if (props.selectedTemplate) {
    templateData.value.config = props.selectedTemplate.config
  } else {
    templateData.value.config = {}
  }
}, { deep: true, immediate: true })

watch(() => props.previewCampaign, () => {
  if (props.previewCampaign) {
    templateData.value.events = props.previewCampaign.events
    templateData.value.questions = props.previewCampaign.questions
  } else {
    templateData.value.events = []
    templateData.value.questions = []
  }
}, { deep: true, immediate: true })

watch(templateData, () => {
  console.log(templateData.value)
}, { deep: true })


// const templateData = computed(() => {
//   const data = {
//     campaign: {},
//     events: [],
//     questions: [],
//     config: props.selectedTemplate.config,
//     person: {
//       firstName: 'First'
//     }
//   }
//   console.log(props.selectedCampaign.questions)
//   if (props.selectedCampaign) {
//     console.log(props.selectedCampaign)
//     data.events = props.selectedCampaign.events
//     data.questions = props.selectedCampaign.questions
//   }

//   return data
// })



</script>