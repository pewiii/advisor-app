<template>
    <div class="grid gap-4 grid-cols-12 p-4 lg:grid-rows-4">
      <div class="grid col-span-12 lg:col-span-6 row-span-2 gap-4 grid-rows-1 grid-cols-2">
        <div class="col-span-1 lg:hidden xl:block row-span-1 panel hidden sm:block relative">
          <div class="absolute right-0 mr-2 mt-2 text-gray-400 cursor-pointer z-10" @click="chartMenu1 = true">
            <div class="pi pi-bars" v-if="!chartMenu1"></div>
            <div v-if="chartMenu1" class="bg-gray-800" @mouseleave="chartMenu1 = false">
              <ul>
                <li v-for="field in pieFields" :key="field" class="hover:bg-gray-700 p-2" :class="field === chartField1 ? 'bg-gray-700' : ''" @click="chartField1 = field">{{ field }}</li>
              </ul>
            </div>
          </div>
          <PieChart v-if="chartField1" :respondents="respondents" :field="chartField1" :title="camelCaseToTitleCase(chartField1)"/>
        </div>
        <div class="col-span-2 lg:col-span-2 sm:col-span-1 xl:col-span-1 row-span-1 panel relative">
          <div class="absolute right-0 mr-2 mt-2 text-gray-400 cursor-pointer z-10" @click="chartMenu2 = true">
            <div class="pi pi-bars" v-if="!chartMenu2"></div>
            <div v-if="chartMenu2" class="bg-gray-800" @mouseleave="chartMenu2 = false">
              <ul>
                <li v-for="field in pieFields" :key="field" class="hover:bg-gray-700 p-2" :class="field === chartField2 ? 'bg-gray-700' : ''" @click="chartField2 = field">{{ field }}</li>
              </ul>
            </div>
          </div>
          <PieChart v-if="chartField2" :respondents="respondents" :field="chartField2" :title="camelCaseToTitleCase(chartField2)"/>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-6 row-span-2 panel">
        <PersonInfo v-if="selectedRespondent && selectedCampaign" :person="selectedRespondent" :campaign="selectedCampaign" />
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
import { ref, watch, computed } from 'vue'
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

const chartMenu1 = ref(false)
const chartMenu2 = ref(false)

const pieFields = computed(() => {
  const fields = new Set()
  respondents.value.forEach((respondent: any) => {
    Object.keys(respondent.extraInfo).forEach((field: string) => {
      if (field.toLowerCase().includes('phone') || field.toLowerCase().includes('email')) return
      fields.add(field)
    })
  })
  return Array.from(fields) as string[]
})

const chartField1Ref = ref('')
const chartField1 = computed({
  get: () => {
    if (chartField1Ref.value) return chartField1Ref.value
    if (pieFields.value.includes('netWorth')) return 'netWorth'
    return pieFields.value[0]
  },
  set: (value: string) => {
    chartField1Ref.value = value
    chartMenu1.value = false
  }
})

const chartField2Ref = ref('')
const chartField2 = computed({
  get: () => {
    if (chartField2Ref.value) return chartField2Ref.value
    if (pieFields.value.includes('wealthRating')) return 'wealthRating'
    return pieFields.value[0]
  },
  set: (value: string) => {
    chartField2Ref.value = value
    chartMenu2.value = false
  }
})

function camelCaseToTitleCase(str: string) {
    // Replace every uppercase letter with a space followed by the uppercase letter
    // and then capitalize the first letter of the resulting string
    return str.replace(/([A-Z])/g, ' $1')
              .replace(/^./, function(str){ return str.toUpperCase(); });
}

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