<template>
  <div v-if="person" class="dark:text-stone-400 text-stone-800 p-3 flex flex-col justify-between h-full">
    <div>
      <ul>
        <li>Name: <span class="capitalize person-info">{{ person.firstName.toLowerCase() }} {{ person.lastName.toLowerCase() }}</span></li>
        <li>Address 1: <span class="capitalize person-info">{{ person.address1.toLowerCase() }}</span></li>
        <li v-if="person.address2">Address 2: <span class="capitalize person-info">{{ person.address2.toLowerCase() }}</span></li>
        <li>City, State Zip: <span class="capitalize person-info">{{ person.city.toLowerCase() }},</span> <span class="uppercase person-info">{{ person.state }}</span> <span class="person-info">{{ person.zip }}</span></li>
      </ul>
      <div>
        <ul class="flex flex-wrap gap-x-3 mt-4">
          <template v-for="info in Object.keys(person.extraInfo)" :key="`person-${info}`">
            <li v-if="person.extraInfo[info]">
              <span class="capitalize">{{ info.toLowerCase() }}:</span> <span class="person-info">{{ person.extraInfo[info] }}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <Modal :header="`${person.firstName} ${person.lastName}`">
      <template #trigger="{ open }">
        <button @click="open" :style="{color: color.primary}">Show Map</button>
      </template>
      <template #content="{maximized}">
        <div :class="maximized ? 'h-full' : 'h-96'">
          <GMap class="h-full" :campaign="campaign" :addresses="[{address1: person.address1, address2: person.address2, city: person.city, state: person.state, zip: person.zip}]"/>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useSettings } from '@/stores/settings';
import { storeToRefs } from 'pinia';
import GMap from '@/components/common/GMap.vue'
import Modal from '@/components/common/Modal.vue'

const { isDark, color } = storeToRefs(useSettings())

const props = defineProps({
  person: Object,
  campaign: Object
})

</script>

<style scoped>

.person-info {
  color: v-bind('color.primary');
}
</style>