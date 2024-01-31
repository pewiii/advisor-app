<template>
  <div v-if="person" class="dark:text-stone-300 text-stone-800 p-6">
    <ul>
      <!-- <li>First Name: <span class="capitalize person-info">{{ person.firstName.toLowerCase() }}</span></li>
      <li>Last Name: <span class="capitalize person-info">{{ person.lastName.toLowerCase() }}</span></li> -->
      <li>Name: <span class="capitalize person-info">{{ person.firstName.toLowerCase() }} {{ person.lastName.toLowerCase() }}</span></li>
      <li>Address 1: <span class="capitalize person-info">{{ person.address1.toLowerCase() }}</span></li>
      <li v-if="person.address2">Address 2: <span class="capitalize person-info">{{ person.address2.toLowerCase() }}</span></li>
      <li>City, State Zip: <span class="capitalize person-info">{{ person.city.toLowerCase() }}</span>, <span class="uppercase person-info">{{ person.state }}</span> <span class="person-info">{{ person.zip }}</span></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useSettings } from '@/stores/settings';

const { isDark, color } = useSettings()

const props = defineProps({
  person: Object
})
</script>

<style scoped>

.person-info {
  color: v-bind('color.primary');
  @apply font-bold text-lg;
}
</style>