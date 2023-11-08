<template>
  <NavBar v-model="search" />
  <div class="p-8 grid grid-cols-6 gap-6">
    <div class="bg-white col-span-4 px-4 flex gap-6 overflow-hidden">
      <div>
        <PieChart />
      </div>
      <div class="flex-1">
        <AreaChart />
      </div>
    </div>
    <div class="bg-white col-span-2 p-6">Map</div>
    <div class="bg-white col-span-3 p-6">Campaign List</div>
    <div class="bg-white col-span-3 row-span-2 p-6">Resondent List</div>
    <div class="bg-white col-span-3 p-6">Map</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NavBar from '@/components/common/NavBar.vue'
import PieChart from '@/components/user/PieChart.vue'
import AreaChart from '@/components/user/AreaChart.vue'

const search = ref('')
</script>