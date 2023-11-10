<template>
  <!-- <div>
    Template Preview
  </div> -->
  <div>
    <LandingTemplate v-if="selectedTemplate" :templateData="templateData"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import LandingTemplate from '@/components/template/LandingTemplate.vue'

const props = defineProps(['selectedTemplate', 'selectedCampaign'])

const templateData = computed(() => {
  const data = {
    campaign: {},
    events: [],
    questions: [],
    config: props.selectedTemplate.config,
    person: {
      firstName: 'First'
    }
  }

  if (props.selectedCampaign) {
    console.log(props.selectedCampaign)
    data.events = props.selectedCampaign.events
    data.questions = props.selectedCampaign.questions
  }

  return data
})



</script>