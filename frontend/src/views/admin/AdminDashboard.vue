<template>

  <NavBar v-model="search" />
  
  <div class="gap-6 p-8 flex overflow-hidden flex-col lg:flex-row flex-wrap">
    
    <div class="flex-1 flex flex-col gap-6">
      <div class="bg-white p-6">
        <ClientForm v-if="editClient" v-model="editClient" />
        <ClientList v-else :search="search" v-model="selectedClient" :newCampaign="addEditCampaign" :addEditClient="addEditClient"/>
      </div>

      <div class="bg-white p-6">
        <TemplateForm v-if="editTemplate" v-model="editTemplate" />
        <TemplateList v-else v-model="selectedTemplate" :addEditTemplate="addEditTemplate" :search="search"/>
      </div>
    </div>
    

    <div class="flex-1 flex flex-col gap-6">


      <div class="bg-white p-6">
        <CampaignForm v-if="editCampaign" v-model="editCampaign" :selectedClient="selectedClient" />
        <CampaignList v-else :addEditCampaign="addEditCampaign" :search="search"/>
      </div>

      <div class="bg-white">
        <!-- <div>Preview</div> -->
        <!-- <TemplateForm v-if="editTemplate" v-model="editTemplate" />
        <TemplateList v-else :addEditTemplate="addEditTemplate" /> -->
        <TemplatePreview :selectedTemplate="previewTemplate"/>
      </div>


    </div>

    

  </div>
    
    <!-- <div class="gap-6 flex overflow-hidden flex-col lg:flex-row flex-wrap px-8">

      <div class="panel flex-1 bg-white p-6">
        Something Else

      </div>
      
  
    </div> -->



</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useAuthStore } from '@/stores/auth';
import NavBar from '@/components/common/NavBar.vue'
import CampaignList from '@/components/admin/CampaignList.vue'
import CampaignForm from '@/components/admin/CampaignForm.vue'
import ClientForm from '@/components/admin/ClientForm.vue'
import ClientList from '@/components/admin/ClientList.vue'
import TemplateList from '@/components/admin/TemplateList.vue'
import TemplateForm from '@/components/admin/TemplateForm.vue'
import TemplatePreview from '@/components/admin/TemplatePreview.vue'
import Modal from '@/components/common/Modal.vue'
import objects from '@/objects'
import { notify } from '@kyvg/vue3-notification';

const auth = useAuthStore()

const search = ref('')

const addEdit = ref('Add')

const editCampaign = ref(null as any)
const selectedClient = ref(null)
const editClient = ref(null as any)
const editTemplate = ref(null as any)
const selectedTemplate = ref(null)

const previewTemplate = computed(() => {
  if (editTemplate.value) {
    return editTemplate.value
  } else {
    return selectedTemplate.value
  }
})

const addEditTemplate = (template?: any) => {
  if (editTemplate.value) {
    return
  }
  if (!template) {
    template = JSON.parse(JSON.stringify(objects.emptyTemplate))
  }
  editTemplate.value = template
}

const addEditCampaign = (campaign?: any) => {
  if (editCampaign.value) {
    return
  }
  if (!campaign) {
    campaign = JSON.parse(JSON.stringify(objects.emptyCampaign))
  }
  editCampaign.value = campaign
}

const addEditClient = (client?: any) => {
  if (!client) {
    client = JSON.parse(JSON.stringify(objects.emptyClient))
  }
  editClient.value = client
}

</script>

<style scoped>

.panel {
  height: 100%;
}

/* .grid-item {
  @apply bg-white rounded-lg p-6
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
} */

</style>