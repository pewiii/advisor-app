<template>
  <pvDataTable :value="items" >
    <pvColumn :field="fields[tableType][0]" :header="fields[tableType][0]">
      <template #header>abc</template>
      <!-- <template #body>
      </template> -->
    </pvColumn>

  </pvDataTable>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()

const fields = {
  campaign: ['title', 'client', 'createdAt', 'updatedAt']
} as any

// const tableType = computed(() => {
//   const routeName = route.name?.toString() || ''
//   if (routeName.includes('campaign')) {
//     return 'campaign'
//   }
//   if (routeName.includes('client')) {
//     return 'client'
//   }
//   if (routeName.includes('template')) {
//     return 'template'
//   }
//   if (routeName.includes('user')) {
//     return 'user'
//   }
// })

const props = defineProps(['items', 'loading', 'tableType'])

</script>