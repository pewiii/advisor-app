<template>
  <div>
    <OfferLanding v-if="template" :templateData="templateData"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import OfferLanding from '@/components/offer/OfferLanding.vue'

const props = defineProps(['template', 'previewCampaign'])


const templateData = ref({
  campaign: {},
  events: [],
  questions: [],
  config: {},
  person: {
    firstName: '{First}'
  }
})

watch(() => props.template, () => {
  if (props.template) {
    templateData.value.config = props.template.config
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

// watch(templateData, () => {
//   console.log(templateData.value)
// }, { deep: true })

</script>