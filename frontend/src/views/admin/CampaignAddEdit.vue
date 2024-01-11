<template>
  <div class="bg-white p-6">
    <CampaignForm v-model:campaign="campaign" @onCancel="cancel" @onSubmit="submitCampaign"/>
  </div>
</template>

<script lang="ts" setup>
import CampaignForm from '@/components/admin/CampaignForm.vue'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import objects from '@/objects';
import { useAuth } from '@/stores/auth';
import { useNotification } from '@kyvg/vue3-notification';

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const error = ref(false)
const { notify } = useNotification()

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

const submitCampaign = async () => {
  try {
    const data = JSON.parse(JSON.stringify(campaign.value))
    data.user = auth.user._id
    if (data.client) {
      data.client = data.client._id
    }
    if (data.template) {
      data.template = data.template._id
    } else {
      delete data.template
    }
    const info = {
      path: data._id ? `/admin/campaigns/${data._id}` : '/admin/campaigns',
      title: data._id ? 'Updated' : 'Created',
      text: data._id ? 'Campaign updated successfully' : 'Campaign created successfully'
    }
    await auth.api.post(info.path, data)

    notify({
      title: info.title,
      text: info.text,
      type: 'success'
    })
    
    router.replace({ name: 'admin-campaigns' })
    // template.value = null
  } catch(err: any) {
    console.log(err)
  }
}

onMounted(() => {
  if (route.params.clientId) {
    getClient(route.params.clientId)
  }
  if (route.params.campaignId) {
    getCampaign(route.params.campaignId)
  }
})

</script>