<template>
  <!-- <List :items="campaigns" :loading="loading" :tableType="'campaign'"/> -->
  <CampaignList :search="search.searchText"/>
</template>

<script lang="ts" setup>
import CampaignList from '@/components/admin/CampaignList.vue'
import { useSearchStore } from '@/stores/search';

const search = useSearchStore()
// import { onMounted, ref } from 'vue';
// import { useSearchStore } from '@/stores/search'
// import { useAuthStore } from '@/stores/auth'
// import { storeToRefs } from 'pinia'
// import List from '@/components/admin/List.vue'

// const search = useSearchStore()
// const { searchText } = storeToRefs(search)
// const auth = useAuthStore()


// const loading = ref(false)
// const campaigns = ref([])
// const page = ref(0)
// const perPage = ref(5)
// const totalRecords = ref(0)
// const sortField = ref('updatedAt')
// const sortOrder = ref(-1)

// const getCampaigns = async () => {
//   loading.value = true
//   try {
//     const res = await auth.api.get(
//       `/campaigns?search=${searchText.value}&page=${page.value}&perPage=${perPage.value}&sortField=${sortField.value}&sortOrder=${sortOrder.value}`)
//     campaigns.value = res.data.data
//     totalRecords.value = res.data.total
//   } catch(err: any) {
//     console.log(err.message)
//   }
//   loading.value = false
// }

// onMounted(getCampaigns)

</script>