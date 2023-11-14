<template>
  <slot name="trigger" :open="open"></slot>

  <pvDialog v-model:visible="showModal" :header="header" :style="{ width: width }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" maximizable :keepInViewPort="false" :autoZIndex="false" :appendTo="windowArea">

    <slot name="content" :close="close"></slot>
  </pvDialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const props = defineProps(['header', 'size' ,'windowArea'])

const showModal = ref(false)

const open = () => {
  showModal.value = true
}

const close = () => {
  showModal.value = false
}

const width = computed(() => {
  const sizes = {
    small: '20rem',
    medium: '30rem',
    large: '50rem'
  } as any

  return sizes[props.size] || sizes.large

})

</script>

<style scoped>
</style>