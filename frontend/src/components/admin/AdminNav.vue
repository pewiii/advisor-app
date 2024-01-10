<template>
  <div class="p-1 items-center px-4 flex justify-between bg-primary h-12" :class="route.path.includes('login') ? 'bg-opacity-0 fixed w-full' : ''">
    <div class="text-white hidden sm:block">
      <span class="font-bold">P</span><span class="font-thin text-gray-200">ack</span><span class="font-bold">T</span><span class="font-thin text-gray-200">hem</span><span class="font-bold">I</span><span class="font-thin text-gray-200">n</span>
    </div>
    <div class="flex gap-4 items-center">
      <nav class="p-2 flex gap-4">
        <RouterLink :to="{ name: 'admin-campaigns' }" class="nav-btn">
          <a href="#" >Campaigns</a>
        </RouterLink>
        <RouterLink :to="{ name: 'admin-clients' }" class="nav-btn">
          <a href="#" >Clients</a>
        </RouterLink>
        <RouterLink :to="{ name: 'admin-templates' }" class="nav-btn">
          <a href="#" >Templates</a>
        </RouterLink>
        <RouterLink :to="{ name: 'admin-users' }" class="nav-btn">
          <a href="#" >Users</a>
        </RouterLink>
      </nav>
      <div class="flex gap-4">
        <SearchInput />
        <UserMenu />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSearch } from '@/stores/search';
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import UserMenu from '@/components/common/UserMenu.vue'
import SearchInput from '@/components/common/SearchInput.vue'
const route = useRoute()

</script>

<style scoped>
.router-link-active {
  @apply bg-black bg-opacity-25
}
.nav-btn {
  @apply text-white hover:bg-black hover:bg-opacity-25 px-4 py-1 rounded
}
</style>