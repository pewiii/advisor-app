<template>
  <div class="bg-white p-6">
    <UserForm v-model="user" :cancel="cancel"/>
  </div>
</template>

<script lang="ts" setup>
import UserForm from '@/components/admin/UserForm.vue'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import objects from '@/objects';
import { useAuth } from '@/stores/auth';

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const error = ref(false)

const cancel = () => {
  router.replace({ name: 'admin-users' })
}

const user = ref({
  ...objects.emptyUser
})

const getUser = async (userId: any) => {
  try {
    const res = await auth.api.get(`admin/users/${userId}`)
    user.value = res.data
  } catch(err) {
    error.value = true
  }
}

onMounted(() => {
  if (route.params.userId) {
    getUser(route.params.userId)
  }
})

</script>