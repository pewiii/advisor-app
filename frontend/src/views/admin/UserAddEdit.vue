<template>
  <div class="bg-white p-6 shadow-lg">
    <UserForm v-model="user" @onCancel="cancel" @onSubmit="submitUser" />
  </div>
</template>

<script lang="ts" setup>
import UserForm from '@/components/admin/UserForm.vue'
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

const submitUser = async () => {
  try {
    const data = JSON.parse(JSON.stringify(user.value))
    const info = {
      path: data._id ? `/admin/users/${data._id}` : '/admin/users',
      title: data._id ? 'Updated' : 'Created',
      text: data._id ? 'User updated successfully' : 'User created successfully'
    }

    const res = await auth.api.post(info.path, data)
    notify({
      title: info.title,
      text: info.text,
      type: 'success'
    })

    if (route.name === 'admin-users-add') {
      router.replace({ name: 'admin-users-edit', params: { userId: res.data._id } })
    }
    getUser(res.data._id)
    // user.value = null
    // router.replace({ name: 'admin-users' })
  } catch(err: any) {
    console.log(err)
    console.log(err.message)
  }
}

onMounted(() => {
  if (route.params.userId) {
    getUser(route.params.userId)
  }
})

</script>