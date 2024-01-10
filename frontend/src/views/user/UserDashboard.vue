<template>
  <!-- <NavBar v-model="search" /> -->
  <UserNav />
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
      <CampaignList v-model:selectedCampaign="selectedCampaign" v-model:selectedRespondent="selectedRespondent" :search="search" />
    </div>
    <!-- <div class="bg-white col-span-3 p-6">Campaign List</div> -->
    <!-- <div class="bg-white col-span-3 row-span-2 p-6">Resondent List</div> -->
    <div class="bg-white col-span-3 map-component">
      <GMap :campaign="selectedCampaign" :respondent="selectedRespondent"/>
    </div>
    <div class="bg-white col-span-3 p-6">
      <!-- Latest Respondents -->
      <RespondentView v-if="selectedRespondent" :respondent="selectedRespondent"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import NavBar from '@/components/common/NavBar.vue'
import PieChart from '@/components/user/PieChart.vue'
import AreaChart from '@/components/user/AreaChart.vue'
import { useAuth } from '@/stores/auth'
import GMap from '@/components/common/GMap.vue'
import CampaignList from '@/components/user/CampaignList.vue'
import RespondentView from '@/components/user/RespondentView.vue'
import UserNav from '@/components/user/UserNav.vue'

const selectedCampaign = ref(null)
const selectedRespondent = ref(null)

const auth = useAuth()


const search = ref('')
</script>

<style>
.map-component {
  min-height: 500px
}
</style>