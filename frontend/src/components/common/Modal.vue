<template>
  <slot name="trigger" :open="open"></slot>
  <div v-if="showModal" class="absolute top-0 left-0 w-screen h-screen flex justify-center items-center modal-background z-50">
    <div class="modal">
      <div :class="userType === 'admin' ? 'bg-red-950' : 'bg-slate-950'" class="text-white p-4">
        <slot name="header">Modal</slot>
      </div>
      <div class="bg-white font-normal p-4">
        <slot name="content"></slot>
      </div>
      <div class="bg-gray-200 py-2 px-2">
        <slot name="footer" :close="close"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps(['userType'])

const showModal = ref(false)

const open = () => {
  console.log("HERE")
  showModal.value = true
}

const close = () => {
  showModal.value = false
}

</script>

<style scoped>
.modal-background { 
  background-color: rgba(0, 0, 0, 0.75);

}

/* Mobile screens (up to 767px wide) */
@media screen and (max-width: 767px) {
  .modal {
    min-width: 320px;
  }
}

/* Tablets and larger screens (768px and above) */
@media screen and (min-width: 768px) {
  .modal {
    min-width: 600px;
  }
}
</style>