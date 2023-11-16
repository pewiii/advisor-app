<template>
  <div class="w-full ">
    <div class="flex justify-between">
      <h5 class="mb-1 text-xl font-medium text-gray-900">{{ respondent.fullName ? respondent.fullName : `${respondent.firstName} ${respondent.lastName}` }}</h5>
      <div class="relative">
        <pvButton icon="pi pi-ellipsis-v" text rounded aria-label="Filter" @click="showMenu = true"/>
          <div v-if="showMenu" @mouseleave="showMenu=false" class="z-10 absolute text-base list-none divide-y divide-gray-100 rounded-lg shadow-lg w-44 bg-white top-0 right-0">
            <ul class="py-2" aria-labelledby="dropdownButton">
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-primary hover:bg-primary hover:text-white">Edit</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-primary hover:bg-primary hover:text-white">Export Data</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-primary hover:bg-primary hover:text-white">Show on Map</a>
            </li>
            <!-- <li>
                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li> -->
            </ul>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <!-- <h5 class="mb-1 text-xl font-medium text-gray-900">{{ respondent.fullName ? respondent.fullName : `${respondent.firstName} ${respondent.lastName}` }}</h5> -->
      <!-- <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span> -->
      <div class="grid grid-cols-2 gap-x-6">
        <div v-for="(item, idx) in info" :key="`${respondent._id}-info-${idx}`" class="col-span-1">
          <span class="capitalize">{{ item.label }}:</span> <span>{{ item.value }}</span>
        </div>
      </div>
      <div class="flex gap-4 mt-4 md:mt-6">
        <pvButton label="Message" size="small"/>
        <pvButton label="Something" size="small"/>
        <pvButton label="Something" size="small"/>
          <!-- <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">Message</a> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = defineProps(['respondent'])

const info = computed(() => {
  const info = [] as any[]
  const keys = Object.keys(props.respondent.extraInfo)
  for (let i = 0; i < keys.length; i++) {
    const label = keys[i]
    const value = props.respondent.extraInfo[label]
    if (value || value === false || value === 0) {
      info.push({
        label,
        value
      })
    }
  }

  return info
})

const showMenu = ref(false)

</script>