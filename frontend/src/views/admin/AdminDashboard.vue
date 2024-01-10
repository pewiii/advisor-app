<template>
  <AdminNav />
  <div class="p-8" v-if="auth.user && auth.user.isAdmin">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import AdminNav from '@/components/admin/AdminNav.vue'
import { useAuth } from '@/stores/auth'
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const auth = useAuth()

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.name === 'admin') {
    router.push({ name: 'admin-campaigns' })
  }
})

</script>

<style scoped>

</style>