<template>
  <div v-if="!templateData" class="flex justify-center">
    <VueLoader />
  </div>
  <div v-else>
    <OfferLanding :templateData="templateData"/>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import OfferLanding from '@/components/offer/OfferLanding.vue'
import { useAuth } from '@/stores/auth';
import VueLoader from '@/components/common/VueLoader.vue'
import CampaignAddEdit from '@/views/admin/CampaignAddEdit.vue';
import { useNotification } from '@kyvg/vue3-notification';

const auth = useAuth()
const { notify } = useNotification()
const props = defineProps(['template', 'previewCampaign'])

const templateData = ref(null as any)

const setTemplateData = async () => {
  const data = {
    campaign: {},
    events: [],
    questions: [],
    config: null,
    person: {
      firstName: '{First}'
    }
  }
  if (props.template.config) {
    data.config = props.template.config
  } else {
    try {
      const res = await auth.api.get(`/admin/templates/${props.template._id}`)
      data.config = res.data.config
    } catch(err) {
      console.log('Error fetching template')
      notify({
      title: 'Template',
      text: 'Error fetching template',
      type: 'error'
      })
    }
  }

  if (props.previewCampaign) {
    data.events = props.previewCampaign.events
    data.questions = props.previewCampaign.questions
    data.campaign = props.previewCampaign
  }

  if (data.config) {
    templateData.value = data
  }
}

watch(() => props.template, setTemplateData)
watch(() => props.previewCampaign, setTemplateData)

onMounted(setTemplateData)


// const landingTemplate = ref(null)

// const templateData = computed(async () => {
//   const data = {
//     campaign: {},
//     events: [],
//     questions: [],
//     config: {},
//     person: {
//       firstName: '{First}'
//     }
//   }

//   if (props.template.config) {
//     data.config = props.template.config
//   } else {
//     const res = await auth.api.get(`/admin/templates/${props.template._id}`)
//     data.config = res.data
//   }

//   if (props.previewCampaign) {
//     data.events = props.previewCampaign.events
//     data.questions = props.previewCampaign.questions
//     data.campaign = props.previewCampaign
//   }
//   return data
// })

// watch(templateData, () => {
//   if (templateData.value.config) {

//   }
// }, { deep: true })



// onMounted(async () => {
//   if (props.template.config) {
//     landingTemplate.value = props.template
//   } else {
//     const res = await auth.api.get(`/admin/templates/${props.template._id}`)
//     landingTemplate.value = res.data
//   }
//   if (landingTemplate.value) {
//     console.log(landingTemplate.value.config)
//     loading.value = false
//   }
// })

// watch(() => props.template, () => {
//   if (props.template) {
//     templateData.value.config = props.template.config
//   } else {
//     templateData.value.config = {}
//   }
// }, { deep: true, immediate: true })

// watch(() => props.previewCampaign, () => {
//   if (props.previewCampaign) {
//     templateData.value.events = props.previewCampaign.events
//     templateData.value.questions = props.previewCampaign.questions
//   } else {
//     templateData.value.events = []
//     templateData.value.questions = []
//   }
// }, { deep: true, immediate: true })

// watch(templateData, () => {
//   console.log(templateData.value)
// }, { deep: true })

</script>