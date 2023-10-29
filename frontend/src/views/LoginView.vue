<template>
  <div class="flex justify-center h-screen items-center bg-slate-700">
    <LoginForm :login="login" :userType="'user'"/>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from '@/components/common/LoginForm.vue'
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()

const login = async (credentials: { email: string, password: string }) => {
  try {
    await auth.login(credentials, 'user')
  } catch(err: any) {
    console.log(err.message)
  }
}

</script>