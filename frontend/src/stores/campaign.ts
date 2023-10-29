import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCampaignStore = defineStore('campaign', () => {

  const campaign = ref({
    title: '',
    client: {
      firstName: '',
      lastName: '',
      fullName: '',
      _id: '',
    },
    landingTemplate: '',
    extraQuestions: [],
    user: '',
    events: [] as any[],
    questions: [] as any[],
    files: null as any
  })

  const setClient = (client: any) => {
    campaign.value.client = client
  } 


  return {
    campaign,
    setClient
  }
})