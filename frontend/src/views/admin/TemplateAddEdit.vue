<template>
  <div class="">
    <TemplateForm v-model="template" :cancel="cancel" />
  </div>
</template>

<script lang="ts" setup>
import TemplateForm from '@/components/admin/TemplateForm.vue'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import objects from '@/objects';
import { useAuth } from '@/stores/auth';
import TemplatePreview from '@/components/admin/TemplatePreview.vue'
import Modal from '@/components/common/Modal.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const error = ref(false)

const header = "Edit Template"

const cancel = () => {
  router.replace({ name: 'admin-templates' })
}

const template = ref({
  ...objects.emptyTemplate
})

const getTemplate = async (templateId: any) => {
  try {
    const res = await auth.api.get(`admin/templates/${templateId}`)
    template.value = res.data
  } catch(err) {
    error.value = true
  }
}

onMounted(() => {
  if (route.params.templateId) {
    getTemplate(route.params.templateId)
  }
})



</script>