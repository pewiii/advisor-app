<template>
  <div v-if="campaign" class="bg-white p-6 shadow-lg">
    <CampaignForm v-model:campaign="campaign" @onCancel="cancel" @onSubmit="submitCampaign"/>
  </div>
  <div v-else class="flex justify-center">
    <VueLoader />
  </div>
</template>

<script lang="ts" setup>
import CampaignForm from '@/components/admin/CampaignForm.vue'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import objects from '@/objects';
import { useAuth } from '@/stores/auth';
import { useNotification } from '@kyvg/vue3-notification';
import VueLoader from '@/components/common/VueLoader.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const error = ref(false)
const { notify } = useNotification()

const cancel = () => {
  router.replace({ name: 'admin-campaigns' })
}

const campaign = ref(null as any)
// const campaign = ref({
//   ...objects.emptyCampaign,
//   events: [],
//   questions: []
// })

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
    return res.data
  } catch(err) {
    console.log(err)
  }
}

const submitCampaign = async () => {
  try {
    const data = JSON.parse(JSON.stringify(campaign.value))
    if (!data.user) {
      data.user = auth.user._id
    }
    if (data.client) {
      data.client = data.client._id
    }
    if (data.template) {
      data.template = data.template._id
    } else {
      delete data.template
    }
    

    data.questions = data.questions.map((question: any) => {
      const newQuestion = {
        ...question
      }
      if (newQuestion.answerType === 'phone') {
        newQuestion.label = 'phone'
        newQuestion.placeholder = 'Phone Number'
      }
      if (newQuestion.answerType === 'email') {
        newQuestion.label = 'email'
        newQuestion.placeholder = 'Email'
      }
      return newQuestion
     })


    const info = {
      path: data._id ? `/admin/campaigns/${data._id}` : '/admin/campaigns',
      title: data._id ? 'Updated' : 'Created',
      text: data._id ? 'Campaign updated successfully' : 'Campaign created successfully'
    }
    const res = await auth.api.post(info.path, data)

    notify({
      title: info.title,
      text: info.text,
      type: 'success'
    })
    
    if (route.name === 'admin-campaigns-add') {
      router.replace({ name: 'admin-campaigns-edit', params: { campaignId: res.data._id } })
    }
    getCampaign(res.data._id)
    
  } catch(err: any) {
    console.log(err)
  }
}

onMounted(async () => {
  if (route.params.clientId) {
      campaign.value = {
      ...objects.emptyCampaign,
      events: [],
      questions: [],
      client: await getClient(route.params.clientId)
    }
    // getClient(route.params.clientId)
  }
  if (route.params.campaignId) {
    getCampaign(route.params.campaignId)
    // getCampaign(route.params.campaignId)
  }
})

</script>