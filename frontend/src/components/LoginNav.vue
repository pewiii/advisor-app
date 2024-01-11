<template>


  <div class="p-1 items-center px-4 flex justify-between bg-primary h-12 overflow-hidden shadow-lg" :class="route.path.includes('login') ? 'bg-opacity-0 fixed w-full' : ''">
    <div class="text-white hidden sm:block">
      <NavLogo />
    </div>
    <div class="flex gap-4 items-center">
      <nav class="p-2 flex gap-4">
        <RouterLink :to="{ name: 'admin-login' }" v-if="route.name === 'user-login'">
          <a href="#admin-login" class="nav-btn">Admin</a>
        </RouterLink>
        <RouterLink :to="{ name: 'home' }">
          <a href="#home" class="nav-btn">Home</a>
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavLogo from '@/components/common/NavLogo.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

</script>

<style scoped>
/* .router-link-active {
  @apply bg-sky-800 py-1 rounded
} */
.nav-btn {
  @apply text-white hover:bg-black hover:bg-opacity-25 px-4 py-2 rounded
}
</style>