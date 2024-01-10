
<template>
  <RouterView />
  <notifications position="bottom left" />
</template>

<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import router from './router';

const auth = useAuth()

onMounted(() => {
  auth.init()
  if (auth.user) {
    if (auth.user.userType === 'user') {
      router.push({ name: 'user' })
    }
    if (auth.user.userType === 'admin') {
      router.push({ name: 'admin' })
    }
  }
})
</script>


<style>

</style>
