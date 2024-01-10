<template>
  <div class="bg-white p-6">
    <CampaignForm v-model:campaign="campaign" :cancel="cancel"/>
  </div>
</template>

<script lang="ts" setup>
import CampaignForm from '@/components/admin/CampaignForm.vue'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import objects from '@/objects';
import { useAuth } from '@/stores/auth';

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const error = ref(false)

const cancel = () => {
  router.replace({ name: 'admin-campaigns' })
}

const campaign = ref({
  ...objects.emptyCampaign
})

const getCampaign = async (campaignId: any) => {
  try {
    const res = await auth.api.get(`admin/campaigns/${campaignId}`)
    campaign.value = res.data
  } catch(err) {
    error.value = true
  }
}

const getClient = async (clientId: any) => {
  try {
    const res = await auth.api.get(`admin/clients/${clientId}`)
    campaign.value.client = res.data
  } catch(err) {
    console.log(err)
  }
}

onMounted(() => {
  if (route.params.campaignId) {
    getCampaign(route.params.campaignId)
  }
  if (route.params.clientId) {
    getClient(route.params.clientId)
  }
})

</script>