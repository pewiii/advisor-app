<template>
  <CampaignForm v-model:campaign="campaign" :cancel="() => {}"/>
</template>

<script lang="ts" setup>
import CampaignForm from '@/components/admin/CampaignForm.vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import objects from '@/objects';
import { useAuthStore } from '@/stores/auth';

const route = useRoute()
const auth = useAuthStore()
const error = ref(false)

const campaign = ref({
  ...objects.emptyCampaign
})

const getCampaign = async (campaignId: any) => {
  try {
    const res = await auth.api.get(`admin/campaign/${campaignId}`)
    campaign.value = res.data
  } catch(err) {
    error.value = true
  }
}

onMounted(() => {
  if (route.params.campaignId) {
    getCampaign(route.params.campaignId)
  }
})

</script>