<template>
  <div class="bg-gray-200 h-screen flex justify-center items-center">
    <div v-if="loading">
      <VueLoader />
    </div>
    <div v-else-if="error" class="text-center">
      <div class="font-bold text-lg">Sorry</div>
      Error setting up your account. Please contact us for support.
    </div>
    <form v-else-if="client" class="bg-white p-10 shadow-lg rounded-lg">
      <div class="mb-8 text-lg text-center">
        <p class="font-bold">Welcome {{ client.firstName }},</p>
        <p>Please create a password for your account.</p>
      </div>
      <label class="flex border-b-2 mb-6">
        <div>
          <span class="material-icons text-gray-500 md-36">lock</span>
        </div>
        <div class="pl-2">
          <input v-model="password" type="password" placeholder="Password" class="w-full h-10 text-xl"/>
        </div>
      </label>
      <label class="flex border-b-2 items-end">
        <div>
          <span class="material-icons text-gray-500 md-36">lock</span>
        </div>
        <div class="pl-2">
          <input v-model="passwordMatch" type="password" placeholder="Reenter Password" class="w-full h-10 text-xl"/>
        </div>
      </label>
      <div class="mt-8 text-end">
        <button class="w-full btn" @click.prevent="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import VueLoader from '@/components/common/VueLoader.vue'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const client = ref(null as any)
const loading = ref(false)
const success = ref(false)
const error = ref(false)

const { clientId, token } = route.params

const password = ref('')
const passwordMatch = ref('')

const submit = async () => {
  loading.value = true
  try {
    const res = await auth.api.post(`/client-setup/${clientId}/${token}`, { password: password.value, passwordMatch: passwordMatch.value })
    success.value = true
  } catch(err) {
    error.value = true
    console.log(err)
  }
  loading.value = false
}

onMounted(async () => {
  try {
    const res = await auth.api.get(`/client-setup/${clientId}/${token}`)
    client.value = res.data
  } catch(err: any) {
    console.log(err.message)
    router.push({ name: 'login' })
  }
})

</script>