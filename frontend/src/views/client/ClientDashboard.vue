<template>
  <div class="min-h-screen grid w-full dark:bg-stone-950" :class="showSidebar ? 'grid-cols-custom grid-rows-custom-sidebar' : 'grid-cols-1 grid-rows-custom-nosidebar'">
    <div class="bg-stone-200 text-white dark:bg-stone-900 pr-6 items-center flex topbar justify-between">
      <!-- <div @click="showSidebar = true" v-if="!showSidebar" class="ml-4 pi pi-arrow-right">Show</div> -->
      <!-- <pvButton class="h-8 !text-cyan-500" icon="pi pi-arrow-right" outlined raised v-if="!showSidebar" @click="showSidebar = true"/> -->
      <div class="flex items-center">
              <!-- <div class="text-right p-2 rounded-md cursor-pointer" @click="showSidebar = false">
        <span class="pi pi-arrow-left hover:opacity-100 transition-opacity duration-200 sidebar-close-open opacity-75"></span>
      </div> -->
        <div class="text-center cursor-pointer flex items-center justify-center px-2 bg-stone-100 dark:bg-stone-800 sidepanel-tab" @click="showSidebar = !showSidebar">
          <span class="pi sidebar-close-open" :class="showSidebar ? 'pi-arrow-left' : 'pi-arrow-right'"></span>
        </div>
        <p class="ml-10 tracking-widest font-extrabold text-3xl text-stone-400 dark:text-stone-600">PACK<span :style="`color: ${color.primary}`">THEM</span>IN</p>
      </div>
      <div class="flex gap-4">
        <div>
          <pvSidebar v-model:visible="sidebarVisible" position="right" class="" :pt="getSidebarPassthrough()">
            <template #header>
              {{ auth.user && auth.user.email }}
            </template>
            <div class="flex flex-col gap-4 text-stone-600 dark:text-stone-400">
              <div class="text-center">
                <!-- <div>{{ auth.user && auth.user.email }}</div> -->
                <div class="mt-2 user-logout cursor-pointer" @click="logout">Log Out <span class="pi pi-sign-out ml-2"></span></div>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <div class="bg-stone-300 dark:bg-stone-600 w-full" :style="{ height: '2px' }"></div>
                  <p>Theme</p>
                  <div class="bg-stone-300 dark:bg-stone-600 w-full" :style="{ height: '2px' }"></div>
                </div>
                <div class="flex flex-wrap gap-3 mt-2 justify-center">
                  <div v-for="mode in ([ 'dark', 'light', 'os' ])" :key="`setting-${mode}`" class="flex align-items-center">
                    <pvRadioButton v-model="theme" :pt="getRadioPassthrough(mode)" :inputId="`setting-${mode}`" name="theme" :value="mode" />
                    <label :for="`setting-${mode}`" class="ml-2 capitalize">{{ mode === 'os' ? 'OS' : mode }}</label>
                  </div>
                  <!-- <div class="flex align-items-center">
                      <pvRadioButton v-model="theme" :pt="radioPassthrough" inputId="setting-dark" name="theme" value="dark" />
                      <label for="setting-dark" class="ml-2">Dark</label>
                  </div>text-stone-600 dark:text-stone-400
                  <div class="flex align-items-center">
                      <pvRadioButton v-model="theme" :pt="radioPassthrough" inputId="setting-light" name="theme" value="light" />
                      <label for="setting-light" class="ml-2">Light</label>
                  </div>
                  <div class="flex align-items-center">
                      <pvRadioButton v-model="theme" :pt="radioPassthrough" inputId="setting-os" name="theme" value="os" />
                      <label for="setting-os" class="ml-2">OS</label>
                  </div> -->
              </div>
              </div>
              <div class="">
                <div class="flex items-center gap-2">
                  <div class="bg-stone-300 dark:bg-stone-600 w-full" :style="{ height: '2px' }"></div>
                  <p>Color</p>
                  <div class="bg-stone-300 dark:bg-stone-600 w-full" :style="{ height: '2px' }"></div>
                </div>
                <div class="flex flex-wrap gap-2 mt-2">
                  <div v-for="colorChoice in settings.colorChoices" :key="`setting-${colorChoice}`">
                    <div class="w-8 h-8 hover:border-2 cursor-pointer" :style="{ backgroundColor: colorChoice }" @click="settings.setColor(colorChoice)"></div>
                  </div>
                </div>
              </div>
            </div>
          </pvSidebar>
          <div
          class="w-8 h-8 rounded-full flex justify-center items-center dark:bg-stone-900 bg-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer"
          :style="{ border: `1px solid ${color.primary}`}"
          @click="sidebarVisible = true"
          >
            <div class="pi pi-user" :style="{ fontSize: '1rem', color: color.primary}"></div>
          </div>
        </div>
      </div>
    </div>

    <div ref="sidebar" class="col-span-1 md:row-span-2 bg-stone-100 pt-1 md:order-first dark:bg-stone-800 sidebar left-0" :class="showSidebar ? '' : 'absolute h-full sidebar-collapse'" @mouseenter="showHideSidebar = true" @mouseleave="showHideSidebar = false">
      <!-- <pvButton class="h-8 !text-cyan-500" icon="pi pi-arrow-left" raised @click="showSidebar = false"/> -->
      <!-- <div class="text-right p-2 rounded-md cursor-pointer" @click="showSidebar = false">
        <span class="pi pi-arrow-left hover:opacity-100 transition-opacity duration-200 sidebar-close-open opacity-75"></span>
      </div> -->
      <div class="p-8">
        <ul class="text-stone-500 font-semibold flex flex-col gap-2 text-right">
          <RouterLink :to="{ name: 'client-overview' }" class="router-link">
            <li class="border-stone-700 rounded">Overview</li>
          </RouterLink>
          <RouterLink :to="'/login'" class="router-link">
            <li class="border-stone-700 rounded">Item 2</li>
          </RouterLink>
          <RouterLink :to="'/login'" class="router-link">
            <li class="border-stone-700 rounded">Item 3</li>
          </RouterLink>
          <RouterLink :to="'/login'" class="router-link">
            <li class="border-stone-700 rounded">Item 4</li>
          </RouterLink>
        </ul>
      </div>
    </div>

    <RouterView />
    <!-- <div class="grid gap-4 grid-cols-12 p-4 lg:grid-rows-6">
      <div class="grid col-span-12 lg:col-span-6 row-span-2 gap-4 grid-rows-1 grid-cols-2">
        <div class="col-span-1 row-span-1 panel bg-white dark:bg-stone-800 border-1 border-cyan-900 border-opacity-0 hover:border-opacity-100"></div>
        <div class="col-span-1 row-span-1 panel bg-white dark:bg-stone-800 border-1 border-cyan-900 border-opacity-0 hover:border-opacity-100"></div>
      </div>
      <div class="col-span-12 lg:col-span-6 row-span-2 bg-white panel dark:bg-stone-800 border-1 border-cyan-900 border-opacity-0 hover:border-opacity-100"></div>
      <div class="col-span-12 lg:col-span-6 row-span-4 bg-white panel dark:bg-stone-800 border-1 border-cyan-900 border-opacity-0 hover:border-opacity-100">
        <CampaignList v-model="selectedCampaign" :search="search" />
      </div>
      <div class="col-span-12 lg:col-span-6 row-span-4 bg-white panel dark:bg-stone-800 border-1 border-cyan-900 border-opacity-0 hover:border-opacity-100"></div>
    </div> -->


  </div>
  <!-- <ClientNav />
  <div class="p-8 grid grid-cols-6 flex-wrap gap-4">
    <div class="bg-white col-span-3 p-4 flex h-80 justify-center">
      <PieChart :element="'pie-1'" :title="'Net Worth'"/>
      <div class="h-full bg-stone-100 w-1"></div>
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
import { onMounted, ref, computed, watch } from 'vue'
// import NavBar from '@/components/common/NavBar.vue'
// import PieChart from '@/components/client/PieChart.vue'
// import AreaChart from '@/components/client/AreaChart.vue'
// import { useAuth } from '@/stores/auth'
// import GMap from '@/components/common/GMap.vue'
import CampaignList from '@/components/client/CampaignList.vue'
// import RespondentView from '@/components/client/RespondentView.vue'
// import ClientNav from '@/components/client/ClientNav.vue'
import { useSettings } from '@/stores/settings';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuth } from '@/stores/auth';

const selectedCampaign = ref(null)
// const selectedRespondent = ref(null)

// const auth = useAuth()

const sidebarVisible = ref(false)

const settings = useSettings()
const auth = useAuth()
const { theme, color, isDark } = storeToRefs(settings)
const search = ref('')
const route = useRoute()
const router = useRouter()

const showSidebar = ref(true)
const showHideSidebar = ref(false)
const sidebar = ref(null as any)

const getSidebarPassthrough = () => {
  return {
    root: {
      class: 'bg-stone-100 dark:bg-stone-800'
    },
    header: {
      style: `color: ${color.value.primary}`,
      class: 'text-lg'
    },
    closeButton: {
      style: `color: ${color.value.primary}`
    }
  }
}

// const sidebarPassthrough = ref({
// })

const getRadioPassthrough = (mode: string) => {
  return {
    input: {
      class: isDark.value ? '!bg-stone-600' : '',
      style: {
        borderColor: theme.value === mode ? color.value.primary : '',
      }
    },
    icon: {
      style: {
        backgroundColor: color.value.primary,
        // backgroundColor: 'red',
        shadow: 'none'
      },
    },
    box: {
      style: {
        // color: color.value.primary,
        // backgroundColor: color.value.primary,
      }
    }
  }
}

const logout = () => {
  auth.logout()
  router.push({ name: 'home' })
  // router.go(0)
}

// const radioPassthrough = computed(() => {
//   return {
//     input: ({ props }: { props: any }) => {
//       console.log(props.modelValue)
//       return {
//         class: isDark.value ? '!bg-stone-600' : '',
//         style: {
//           borderColor: props.modelValue === theme.value ? 'red' : ''
//         }
//       }
//     },
//     icon: {
//       style: {
//         backgroundColor: color.value.primary,
//       }
//     },
//     box: {
//       style: {
//         color: 'red',
//         backgroundColor: 'red',
//       }
//     }
//   }
// })

// const getNavStyle = (routeName: string) => {
//   if (routeName === route.name) {
//     return {
//       color: theme.primaryColor
//     }
//   }
//   return {
//     hover: {
//       color: theme.primaryColor
//     }
//   }
// }

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
// const color = 'red'

// document.documentElement.classList.toggle('dark', dark);


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

.router-link-active {
  color: v-bind('color.primary');
}

.router-link:hover {
  color: v-bind('color.primary');
}

.sidebar-close-open {
  font-size: 1.5rem;
  color: v-bind('color.primary');
}

.sidebar-close-open:hover {
  opacity: 100;
}

.sidepanel-tab {
  margin-left: -1px;
  margin-top: -1px;
  border-color: v-bind('color.primaryAlpha3');
  border-width: 0px 1px 1px 0px;
  height: 3rem;
}

.sidepanel-tab:hover {
  background-color: v-bind('color.primaryAlpha3');
}

.sidebar {
  border-right: 1px solid v-bind('color.primaryAlpha3');
}

.topbar {
  border-bottom: 1px solid v-bind('color.primaryAlpha3');
}


div >>> table {
  color: v-bind('color.primary');
  text-align: left;
  @apply w-full mt-2;
}

div >>> tbody tr[data-p-highlight="false"]:hover {
  background-color: v-bind('color.primaryAlpha2');
  cursor: pointer;
}

div >>> thead {
  border-width: 0px 0px 2px 0px;
  border-color: v-bind('color.primaryAlpha3');
}

div >>> .p-column-header-content {
  @apply flex gap-2 items-center;
}

div >>> .p-column-header-content span[data-pc-section="sort"] {
  color: v-bind('color.primaryAlpha6');
  cursor: pointer;
}

div >>> .p-column-header-content span[data-pc-section="sort"]:hover {
  color: v-bind('color.primary');
}

div >>> td, div >>> th {
  @apply py-1 px-2;
}

div >>> tr[data-p-highlight="true"] {
  background-color: v-bind('color.primaryAlpha8');
  @apply text-stone-900 font-semibold;
}

div >>> .p-paginator {
  background-color: v-bind('color.primaryAlpha0');
}

div >>> .p-paginator .p-paginator-first, div >>> .p-paginator-last, div >>> .p-paginator-prev, div >>> .p-paginator-next, div >>> .p-paginator-current {
  color: v-bind('color.primary');
}

/* .user-logout {
  color: v-bind('color.primary');
  cursor: pointer;
} */

</style>

<style>

</style>