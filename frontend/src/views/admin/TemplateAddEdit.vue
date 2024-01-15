<template>
  <div class="shadow-lg p-4 bg-white">
    <TemplateForm v-model="template" @onCancel="cancel" @onSubmit="submitTemplate"/>
  </div>
</template>

<script lang="ts" setup>
import TemplateForm from '@/components/admin/TemplateForm.vue'
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

const submitTemplate = async () => {
  try {
    const data = JSON.parse(JSON.stringify(template.value))
    data.user = auth.user
    console.log(data)
    const info = {
      path: data._id ? `/admin/templates/${data._id}` : '/admin/templates',
      title: data._id ? 'Updated' : 'Created',
      text: data._id ? 'Template updated successfully' : 'Template created successfully'
    }
    const res = await auth.api.post(info.path, data)
    notify({
      title: info.title,
      text: info.text,
      type: 'success'
    })

    if (route.name === 'admin-templates-add') {
      router.replace({ name: 'admin-templates-edit', params: { templateId: res.data._id } })
    }
    getTemplate(res.data._id)

  } catch(err: any) {
    console.log(err.message)
  }
}

onMounted(() => {
  if (route.params.templateId) {
    getTemplate(route.params.templateId)
  }
})



</script>