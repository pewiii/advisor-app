<template>
  <div class="bg-white p-6 shadow-lg">
    <ClientForm v-model="client" :cancel="cancel"/>
  </div>
</template>

<script lang="ts" setup>
import ClientForm from '@/components/admin/ClientForm.vue'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import objects from '@/objects';
import { useAuth } from '@/stores/auth';

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const error = ref(false)

const cancel = () => {
  router.replace({ name: 'admin-clients' })
}

const client = ref({
  ...objects.emptyClient
})

const getClient = async (clientId: any) => {
  try {
    const res = await auth.api.get(`admin/clients/${clientId}`)
    client.value = res.data
  } catch(err) {
    error.value = true
  }
}

onMounted(() => {
  if (route.params.clientId) {
    getClient(route.params.clientId)
  }
})

</script>