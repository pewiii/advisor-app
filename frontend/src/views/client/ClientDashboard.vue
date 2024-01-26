<template>
  <div class="min-h-screen grid w-full dark:bg-stone-950" :class="showSidebar ? 'grid-cols-custom grid-rows-custom-sidebar' : 'grid-cols-1 grid-rows-custom-nosidebar'">

    <div class="bg-primary text-white dark:bg-stone-950 border-b-1 dark:border-cyan-950 pl-1 dark:text-cyan-500 items-center flex">
      <!-- <div @click="showSidebar = true" v-if="!showSidebar" class="ml-4 pi pi-arrow-right">Show</div> -->
      <!-- <pvButton class="h-8 !text-cyan-500" icon="pi pi-arrow-right" outlined raised v-if="!showSidebar" @click="showSidebar = true"/> -->
      <div class="text-center" @click="showSidebar = true" v-if="!showSidebar">
        <span class="pi pi-arrow-right" style="font-size: 1.5rem"></span>
      </div>
    </div>

    <div ref="sidebar" class="col-span-1 md:row-span-2 bg-gray-100 text-primary dark:text-cyan-500 pt-1 md:order-first dark:bg-stone-950 border-r-1 dark:border-cyan-950 left-0" :class="showSidebar ? '' : 'absolute h-full sidebar-collapse'" @mouseenter="showHideSidebar = true" @mouseleave="showHideSidebar = false">
      <!-- <pvButton class="h-8 !text-cyan-500" icon="pi pi-arrow-left" raised @click="showSidebar = false"/> -->
      <div class="text-right p-2 rounded-md" @click="showSidebar = false">
        <span class="pi pi-arrow-left hover:opacity-100 transition-opacity duration-300" :class="showHideSidebar ? 'opacity-75' : 'opacity-50'" style="font-size: 1.5rem"></span>
      </div>
      <div class="p-8">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      </div>
    </div>


    <div class="grid gap-4 grid-cols-12 p-4 lg:grid-rows-6">
      <div class="grid col-span-12 lg:col-span-6 row-span-2 gap-4 grid-rows-1 grid-cols-2">
        <div class="col-span-1 row-span-1 panel bg-white dark:bg-stone-800 border-1 border-cyan-900 border-opacity-0 hover:border-opacity-100"></div>
        <div class="col-span-1 row-span-1 panel bg-white dark:bg-stone-800 border-1 border-cyan-900 border-opacity-0 hover:border-opacity-100"></div>
      </div>
      <div class="col-span-12 lg:col-span-6 row-span-2 bg-white panel dark:bg-stone-800 border-1 border-cyan-900 border-opacity-0 hover:border-opacity-100"></div>
      <div class="col-span-12 lg:col-span-6 row-span-4 bg-white panel dark:bg-stone-800 border-1 border-cyan-900 border-opacity-0 hover:border-opacity-100">
        <CampaignList v-model="selectedCampaign" :search="search" />
      </div>
      <div class="col-span-12 lg:col-span-6 row-span-4 bg-white panel dark:bg-stone-800 border-1 border-cyan-900 border-opacity-0 hover:border-opacity-100"></div>
    </div>


  </div>
  <!-- <ClientNav />
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
    <div class="bg-white col-span-3 map-component">
      <GMap :campaign="selectedCampaign" :respondent="selectedRespondent"/>
    </div>
    <div class="bg-white col-span-3 p-6">
      <RespondentView v-if="selectedRespondent" :respondent="selectedRespondent"/>
    </div>
  </div> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import NavBar from '@/components/common/NavBar.vue'
// import PieChart from '@/components/client/PieChart.vue'
// import AreaChart from '@/components/client/AreaChart.vue'
// import { useAuth } from '@/stores/auth'
// import GMap from '@/components/common/GMap.vue'
import CampaignList from '@/components/client/CampaignList.vue'
// import RespondentView from '@/components/client/RespondentView.vue'
// import ClientNav from '@/components/client/ClientNav.vue'

const selectedCampaign = ref(null)
// const selectedRespondent = ref(null)

// const auth = useAuth()


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
  @apply shadow-md rounded-md;
}

</style>