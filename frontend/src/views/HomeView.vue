<template>
  <NavBar />
  <!-- <div class="bg-gray-300 flex flex-col min-h-screen">
    <nav class="bg-gray-800 p-4">
    <RouterLink :to="{ name: 'home' }">
      <a href="#" class="text-white hover:bg-gray-700 px-4 py-2 rounded">Home</a>
    </RouterLink>
    <RouterLink :to="{ name: 'login' }">
      <a href="#login" class="text-white hover:bg-gray-700 px-4 py-2 rounded">Log In</a>
    </RouterLink>
    <RouterLink :to="{ name: 'admin-login'}">
      <a href="#admin-login" class="text-white hover:bg-gray-700 px-4 py-2 rounded">Admin</a>
    </RouterLink>
  </nav>
    <RouterView />
  </div> -->
  <RouterView />
</template>

<script lang="ts" setup>
import NavBar from '@/components/common/NavBar.vue'


</script>