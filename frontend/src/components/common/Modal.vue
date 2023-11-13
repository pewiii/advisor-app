<template>
  <slot name="trigger" :open="open"></slot>

  <pvDialog v-model:visible="showModal" :header="header" :style="{ width: width }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" maximizable :keepInViewPort="false" :autoZIndex="false" :appendTo="windowArea">

    <slot name="content"></slot>
    <!-- <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p> -->
  </pvDialog>
      
      <!-- <div class="bg-gray-200 py-2 px-2">
        <slot name="footer" :close="close"></slot>
      </div> -->
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const props = defineProps(['header', 'size' ,'windowArea'])

const showModal = ref(false)

const open = () => {
  showModal.value = true
}

const width = computed(() => {
  const sizes = {
    small: '20rem',
    medium: '30rem',
    large: '50rem'
  } as any

  return sizes[props.size] || sizes.large

})

// const close = () => {
//   showModal.value = false
// }

</script>

<style scoped>
/* .modal-background { 
  background-color: rgba(0, 0, 0, 0.5);
} */

/* Mobile screens (up to 767px wide) */
/* @media screen and (max-width: 767px) {
  .modal {
    min-width: 320px;
  }
} */

/* Tablets and larger screens (768px and above) */
/* @media screen and (min-width: 768px) {
  .modal {
    min-width: 600px;
  }
} */
</style>