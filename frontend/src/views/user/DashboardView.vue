<template>
  <NavBar v-model="search" />
  <div class="p-8 grid grid-cols-6 flex-wrap gap-4">
    <div class="bg-white col-span-3 p-4 flex h-80 justify-center">
      <PieChart :element="'pie-1'" :title="'Net Worth'"/>
      <div class="h-full bg-gray-100 w-1"></div>
      <PieChart :element="'pie-2'" :title="'Wealth Rating'"/>
    </div>
    <div class="bg-white col-span-3 p-4 h-80">
      <AreaChart />
    </div>
    <div class="bg-white col-span-3 row-span-2 p-6">
      Campaigns
      <p>Will contain campaign list and respondent drill down</p>
    </div>
    <!-- <div class="bg-white col-span-3 p-6">Campaign List</div> -->
    <!-- <div class="bg-white col-span-3 row-span-2 p-6">Resondent List</div> -->
    <div class="bg-white col-span-3 map-component">
      <GMap />
    </div>
    <div class="bg-white col-span-3 h-60 p-6">
      Latest Respondents
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NavBar from '@/components/common/NavBar.vue'
import PieChart from '@/components/user/PieChart.vue'
import AreaChart from '@/components/user/AreaChart.vue'
import { useAuthStore } from '@/stores/auth'
import GMap from '@/components/common/GMap.vue'

const auth = useAuthStore()


const search = ref('')
</script>

<style>
.map-component {
  min-height: 500px
}
</style>