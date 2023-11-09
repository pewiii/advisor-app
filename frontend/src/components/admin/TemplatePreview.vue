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

const props = defineProps(['selectedTemplate'])

const templateData = computed(() => {
  return {
    campaign: {},
    events: [],
    config: props.selectedTemplate.config,
    person: {
      firstName: 'First'
    }
  }
})


</script>