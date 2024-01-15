<template>
  <div v-if="client" class="bg-white p-6 shadow-lg">
    <ClientForm v-model="client" @onCancel="cancel" @onSubmit="submitClient" />
  </div>
  <div v-else class="flex justify-center">
    <VueLoader />
  </div>
</template>

<script lang="ts" setup>
import ClientForm from '@/components/admin/ClientForm.vue'
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
  router.replace({ name: 'admin-clients' })
}

const client = ref(null as any)

const getClient = async (clientId: any) => {
  client.value = null
  try {
    const res = await auth.api.get(`admin/clients/${clientId}`)

    client.value = res.data
  } catch(err) {
    error.value = true
  }
}

const submitClient = async () => {
  try {
    const data = JSON.parse(JSON.stringify(client.value))
    const info = {
      path: data._id ? `/admin/clients/${data._id}` : '/admin/clients',
      title: data._id ? 'Updated' : 'Created',
      text: data._id ? 'Client updated successfully' : 'Client created successfully'
    }
    const res = await auth.api.post(info.path, data)
    // client.value = res.data
    notify({
      title: info.title,
      text: info.text,
      type: 'success'
    })
    if (route.name === 'admin-clients-add') {
      router.replace({ name: 'admin-clients-edit', params: { clientId: res.data._id }})
    }

    getClient(res.data._id)

  } catch(err: any) {
    console.log(err)
    console.log(err.message)
  }
}

onMounted(() => {
  if (route.params.clientId) {
    getClient(route.params.clientId)
  } else {
    client.value = {
      ...objects.emptyClient
    }
  }
})

</script>