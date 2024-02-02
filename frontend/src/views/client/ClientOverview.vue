<template>
    <div class="grid gap-4 grid-cols-12 p-4 lg:grid-rows-4">
      <div class="grid col-span-12 lg:col-span-6 row-span-2 gap-4 grid-rows-1 grid-cols-2">
        <div class="col-span-1 row-span-1 panel">
          <PieChart :respondents="respondents" :field="'netWorth'" :title="'Net Worth'"/>
        </div>
        <div class="col-span-1 row-span-1 panel">
          <PieChart :respondents="respondents" :field="'wealthRating'" :title="'Wealth Rating'"/>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-6 row-span-2 panel">
        <PersonInfo v-if="selectedRespondent" :person="selectedRespondent" :campaign="selectedCampaign" />
      </div>
      <div class="col-span-12 lg:col-span-6 row-span-4 panel">
        <CampaignList v-model="selectedCampaign" :search="search" />
      </div>
      <div class="col-span-12 lg:col-span-6 row-span-4 panel">
        <RespondentList v-if="selectedCampaign" v-model="selectedRespondent" v-model:respondentList="respondents" :search="search" :campaign="selectedCampaign"/>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import CampaignList from '@/components/client/CampaignList.vue'
import RespondentList from '@/components/client/RespondentList.vue'
import PersonInfo from '@/components/client/PersonInfo.vue'
import PieChart from '@/components/client/PieChart.vue'
import { useSettings } from '@/stores/settings';
import { storeToRefs } from 'pinia';

const selectedCampaign = ref(null)
const selectedRespondent = ref(null)
const respondents = ref([])

const { color, theme } = storeToRefs(useSettings())

const search = ref('')

const showSidebar = ref(true)
const showHideSidebar = ref(false)
const sidebar = ref(null as any)


</script>

<style scoped>

.grid-cols-custom {
  grid-template-columns: 1fr;
}


.grid-rows-custom-sidebar {
  grid-template-rows: 3rem max-content 1fr;
}

.grid-rows-custom-nosidebar {
  grid-template-rows: 3rem 1fr;
}

@media all and (min-width: 768px) {
  .grid-cols-custom {
    grid-template-columns: max-content 1fr;
  }
  .grid-rows-custom-sidebar {
    grid-template-rows: 3rem 1fr;
  }
};

.sidebar-collapse {
  left: -100%;
  transition: left 2s ease-out
}


.panel {
  border: 1px solid v-bind('color.primaryAlpha0');
  @apply shadow-md rounded-md bg-neutral-200 dark:bg-neutral-800;
}

.panel:hover {
  border: 1px solid v-bind('color.primaryAlpha4');
}

</style>