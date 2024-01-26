<template>
  <LoginNav />
  <div class="flex justify-center h-screen items-center bg-slate-700">
    <LoginForm :login="login" :userType="'client'"/>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from '@/components/common/LoginForm.vue'
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';
import LoginNav from '@/components/LoginNav.vue'

const auth = useAuth()
const router = useRouter()

const login = async (credentials: { email: string, password: string }) => {
  try {
    await auth.login(credentials, 'client')
    router.push({ name: 'client' })
  } catch(err: any) {
    console.log(err.message)
  }
}

</script>