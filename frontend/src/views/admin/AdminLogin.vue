<template>
  <LoginNav />
  <div class="flex justify-center h-screen items-center bg-red-950">
    <LoginForm :login="login" :userType="'admin'" />
  </div>
</template>

<script lang="ts" setup>
import LoginForm from '@/components/common/LoginForm.vue'
import router from '@/router';
import { useAuth } from '@/stores/auth';
// import { useRouter } from 'vue-router';
import LoginNav from '@/components/LoginNav.vue'

const auth = useAuth()

const login = async (credentials: { email: string, password: string }) => {
  await auth.login(credentials, 'admin')
  if(auth.user && auth.isAdmin) {
    router.push({ name: 'admin-campaigns' })
  }
}

</script>