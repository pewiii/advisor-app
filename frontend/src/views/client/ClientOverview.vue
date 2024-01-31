<template>
    <div class="grid gap-4 grid-cols-12 p-4 lg:grid-rows-6">
      <div class="grid col-span-12 lg:col-span-6 row-span-2 gap-4 grid-rows-1 grid-cols-2">
        <div class="col-span-1 row-span-1 panel bg-white dark:bg-stone-800"></div>
        <div class="col-span-1 row-span-1 panel bg-white dark:bg-stone-800"></div>
      </div>
      <div class="col-span-12 lg:col-span-6 row-span-2 bg-white panel dark:bg-stone-800">
        <PersonInfo v-if="selectedRespondent" :person="selectedRespondent" />
      </div>
      <div class="col-span-12 lg:col-span-6 row-span-4 bg-white panel dark:bg-stone-800">
        <CampaignList v-model="selectedCampaign" :search="search" />
      </div>
      <div class="col-span-12 lg:col-span-6 row-span-4 bg-white panel dark:bg-stone-800">
        <RespondentList v-if="selectedCampaign" v-model="selectedRespondent" :search="search" :campaign="selectedCampaign"/>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
// import NavBar from '@/components/common/NavBar.vue'
// import PieChart from '@/components/client/PieChart.vue'
// import AreaChart from '@/components/client/AreaChart.vue'
// import { useAuth } from '@/stores/auth'
// import GMap from '@/components/common/GMap.vue'
import CampaignList from '@/components/client/CampaignList.vue'
import RespondentList from '@/components/client/RespondentList.vue'
import PersonInfo from '@/components/client/PersonInfo.vue'
// import RespondentView from '@/components/client/RespondentView.vue'
// import ClientNav from '@/components/client/ClientNav.vue'
import { useSettings } from '@/stores/settings';
import { storeToRefs } from 'pinia';

const selectedCampaign = ref(null)
const selectedRespondent = ref(null)

watch(selectedRespondent, () => {
  console.log(selectedRespondent.value)

})

// const auth = useAuth()

const { color, theme } = storeToRefs(useSettings())

const search = ref('')

const showSidebar = ref(true)
const showHideSidebar = ref(false)
const sidebar = ref(null as any)

// const toggleSidebar = () => {
//   if (sidebar.value) {
//     // console.log(sidebar.value)
//     if (showSidebar.value) {
//       showSidebar.value = false
//       sidebar.value.classList.add('absolute', 'h-full', 'right-0')
//     } else {
//       //
//     }
//   }
// }


// const primaryColorAlpha = ref(`${color..value}00`)
// console.log(primaryColorAlpha.value)
</script>

<style scoped>
/* .map-component {
  min-height: 500px
} */

/* .grid-rows-2-custom {
  grid-template-rows: 3rem 1fr;

}
.grid-cols-2-custom {
  grid-template-columns: max-content 1fr
} */

.grid-cols-custom {
  grid-template-columns: 1fr;
  /* @media (min-width: 640px) {
    grid-template-columns: 1fr
  } */
}


.grid-rows-custom-sidebar {
  grid-template-rows: 3rem max-content 1fr;
  /* @media (min-width: 768) {
    grid-template-rows: 3rem 1fr;
  } */
}

.grid-rows-custom-nosidebar {
  grid-template-rows: 3rem 1fr;
}

@media all and (min-width: 768px) {
  /* grid-template-columns: max-content 1fr; */
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
  @apply shadow-md rounded-md;
}

.panel:hover {
  border: 1px solid v-bind('color.primaryAlpha4');
}

</style>