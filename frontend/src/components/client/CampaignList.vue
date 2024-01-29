<template>
  <div class="h-full w-full dark:text-white flex flex-col justify-between client-table" v-if="auth.user">
    <pvDataTable v-model:selection="selectedCampaign" selectionMode="single" :value="campaigns" :dataKey="(campaign: any) => (campaign._id)" :sort="sort" :unstyled="true">
      <!-- <template #header>
          <div class="flex flex-wrap justify-content-end gap-2">
          </div>
      </template> -->
      <pvColumn field="title" header="Campaign" sortable></pvColumn>
      <pvColumn field="reach" header="Reach" class="hidden md:block" sortable></pvColumn>
      <pvColumn field="respondents" header="Respondents" sortable>
        <template #body="{data}">
          {{ data.respondents.length }}
        </template>
      </pvColumn>
      <pvColumn field="status" header="Status" class="hidden md:block" sortable></pvColumn>
      <!-- <pvColumn field="actions" header="Actions"></pvColumn> -->


      <!-- <pvColumn header="Image">
          <template #body="{data}">
              <img :src="`https://primefaces.org/cdn/primevue/images/product/${data.image}`" :alt="data.image" class="shadow-4" width="64" />
          </template>
      </pvColumn> -->


      <!-- <pvColumn field="price" header="Price">
          <template #body="{data}">
          </template>
      </pvColumn> -->


      <!-- <pvColumn field="category" header="Category"></pvColumn> -->


      <!-- <pvColumn field="rating" header="Reviews">
          <template #body="{data}">
          </template>
      </pvColumn> -->


      <!-- <pvColumn header="Status">
          <template #body="{data}">
          </template>
      </pvColumn> -->
    </pvDataTable>


    <div class="flex justify-evenly text-cyan-500 mb-3 paginator items-center">
      <div class="hidden sm:block lg:hidden xl:block">
        Total: {{ totalRecords }}
      </div>
        <pvPaginator ref="campaignPaginator" :pt="theme.paginatorPassthrough" class="paginator-element" :rows="perPage" :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="totalRecords" template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" @page="handlePage"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useAuth } from '@/stores/auth';
import { useSettings } from '@/stores/settings';
import format from 'date-fns/format';
import { storeToRefs } from 'pinia';

const auth = useAuth()
const { theme, colors } = storeToRefs(useSettings())

const props = defineProps(['modelValue', 'selectedRespondent', 'search'])
const emit = defineEmits(['update:modelValue'])


// const dataTablePassthrough = computed(() => {
//   return {
//     root: {
//       class: `pt-4 px-4` // changed color from cyan to green
//     },
//     // rowExpansion: {
//     //   class: `!bg-red-800`
//     // },
//     // tbody: {
//     //   class: '!bg-none'
//     // },
//     // table: {
//     //   class: '!border-separate',
//     // },
//     table: {
//       class: `w-full text-[${theme.primaryColor}]`
//     },
//     header: {
//       class: 'text-left'
//     },
//     // bodyRow: {
//     //   class: `hover:bg-${theme.primaryColor}-600 !bg-opacity-10 ${selectedCampaign.value._id === }`
//     // },
//     rowHighlight: {
//       class: `bg-red-500`
//     },
//     // rowGroup: {
//     //   selection: {
//     //     class: `bg-red-300`
//     //   }
//     // },
//     column: {
//       root: {
//       },
//       headerCell: {
//         class: 'text-left px-2'
//       },
//       bodyCell: {
//         class: `px-2`
//       }
//     },
//   //   row: {
//   //     root: {
//   //       class: '!bg-red-200'
//   //     },
//   //     hooks: {
//   //       selected: {
//   //         class: '!bg-green-500'
//   //       }
//   //     }
//   //     // root: {
//   //     // }
//   //   },
//   //   column: {
//   //     root: {
//   //       class: '!bg-red-500'
//   //     },
//   //     headerCell: {
//   //       class: '!dark:bg-red-500'
//   //     },
//   //     bodyCell: {
//   //       class: `bg-none`
//   //     }
//   //   },
//   }
// })


// const rowClass = (row: any) => {
//   if (row === selectedCampaign.value) {
//     return `!bg-${theme.primaryColor}-500 text-stone-950`
//     // return `!bg-${theme.primaryColor}-500`
//   }
//   return `cursor-pointer hover:bg-${theme.primaryColor}-600 !bg-opacity-10`
// }


// <tbody role="rowgroup" data-pc-section="tbody" class=""><!----><tr class="" tabindex="-1" role="row" aria-selected="true" data-pc-section="bodyrow" data-p-selectable-row="true" data-p-highlight="true" draggable="false"><td class="!text-cyan-500 !bg-none" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-cell-editing="false"><!---->Test Campaign 2</td><td class="hidden md:block !text-cyan-500 !bg-none" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-cell-editing="false"><!---->0</td><td class="!text-cyan-500 !bg-none" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false"><!---->0</td><td class="hidden md:block !text-cyan-500 !bg-none" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-cell-editing="false"><!---->active</td></tr><!----><!----><!----><tr class="" tabindex="-1" role="row" aria-selected="false" data-pc-section="bodyrow" data-p-selectable-row="true" data-p-highlight="false"><td class="!text-cyan-500 !bg-none" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-cell-editing="false"><!---->Test Campaign</td><td class="hidden md:block !text-cyan-500 !bg-none" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-cell-editing="false"><!---->7708</td><td class="!text-cyan-500 !bg-none" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false"><!---->1</td><td class="hidden md:block !text-cyan-500 !bg-none" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-cell-editing="false"><!---->active</td></tr><!----><!----></tbody>



// const columnPassthrough = computed(() => {
//   return {
//     root: {
//       class: '!bg-none' // changed color from none to gray
//     },
//     headerCell: {
//       class: '!bg-none !text-cyan-500' // changed color from none to gray
//     },
//     bodyCell: {
//       class: `!text-cyan-500 !bg-none`
//     }
//   }
// })


// const dataTablePassthrough = computed(() => {
//   return {
//     root: {
//       class: `!text-cyan-500`
//       // class: 'bg-white'
//     },
//     rowgroup: {
//       class: '!bg-red-500',
//       root: {
//         class: '!bg-red-500'
//       }
//     },
//     headerCell: {
//       class: '!bg-red-500',
//       root: {
//         class: '!bg-red-500'
//       }
//     },
        

//   }
// })

// const columnPassthrough = computed(() => {
//   return {
//     root: {
//       class: '!bg-none'
//     },
//   }
// })




const loading = ref(false)
const campaigns = ref([])

const page = ref(0)
const perPage = ref(10)
const totalRecords = ref(0)
const sortField = ref('updatedAt')
const sortOrder = ref(-1)

const selectedCampaign = computed({
  get() {
    return props.modelValue
  },
  set(selectedCampaign: any) {
    emit('update:modelValue', selectedCampaign)
    // if (props.selectedCampaign === selectedCampaign) {
    //   emit('update:selectedCampaign', null)
    // } else {
    //   emit('update:selectedCampaign', selectedCampaign)
    // }
  }
})

const sort = (e: any) => {
  sortField.value = e.sortField
  sortOrder.value = e.sortOrder
  getCampaigns()
}

watch(selectedCampaign, () => {
  console.log(selectedCampaign.value)
}, { deep: true })

const handlePage = (pagination: any) => {
  perPage.value = pagination.rows
  page.value = pagination.page
  getCampaigns()
}

const getCampaigns = async () => {
  loading.value = true
  try {
    // const res = await auth.api.get('/client/campaigns')
    const res = await auth.api.get(
      `/client/campaigns?search=${props.search}&page=${page.value}&perPage=${perPage.value}&sortField=${sortField.value}&sortOrder=${sortOrder.value}`)
    campaigns.value = res.data.paginatedResults
    if (!selectedCampaign.value && res.data.paginatedResults.length > 0) {
      selectedCampaign.value = res.data.paginatedResults[0]
    }
    totalRecords.value = res.data.totalCount
  } catch(err) {
    console.log(err)
  }
  loading.value = false
}


const expandedRows = ref([])


const onRowExpand = () => {

}

const onRowCollapse = () => {

}

onMounted(getCampaigns)

</script>

<style scoped>



/* .client-table {
  @apply w-full pt-3
}

.client-table >>> table {
  @apply w-full h-full
}

.client-table >>> thead {
  @apply w-full dark:text-cyan-600;
}

.client-table >>> tbody tr {
  @apply hover:dark:bg-cyan-950 hover:bg-cyan-100 cursor-pointer;
}

.client-table >>> td {
  @apply text-center dark:text-cyan-600;
}

.client-table >>> tr[data-p-highlight="true"] {
  @apply bg-cyan-100 dark:bg-cyan-950;
} */

</style>