<template>
  <div v-if="error" class="text-red-600 inline-block absolute ml-1">
    <span v-if="location === 'left'" class="material-icons" v-tooltip.left="settings">error</span>
    <span v-if="location === 'right'" class="material-icons" v-tooltip.right="settings">error</span>
    <span v-if="location === 'bottom'" class="material-icons" v-tooltip.bottom="settings">error</span>
    <span v-else class="material-icons" v-tooltip.top="settings">error</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps(['error', 'location'])

const settings = computed(() => {
  return {
    value: props.error,
    showDelay: 200,
    hideDelay: 200,
  }
})

</script>

<style scoped>

</style>