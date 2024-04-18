
  <!-- <div class="p-1 items-center px-4 flex justify-between bg-primary overflow-hidden shadow-lg" :class="route.path.includes('login') ? 'bg-opacity-0 fixed w-full' : ''">
    <div class="text-white hidden lg:block">
      <NavLogo />
    </div>
    <div class="flex gap-4 flex-col md:flex-row items-center">
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
        <RouterLink :to="{ name: 'admin-code' }" class="nav-btn">
          <a href="#" >File Coder</a>
        </RouterLink>
      </nav>
      <div class="flex gap-4">
        <SearchInput />
        <UserMenu />
      </div>
    </div>
  </div> -->
<template>
  <!-- Navbar start -->
  <nav class="w-screen bg-primary p-4 xl:px-20 z-5 flex justify-around transition ease-in-out duration-500">
    <!-- Logo start -->
    <div class="flex-col justify-center w-full mt-2">
      <p class="tracking-widest font-extrabold text-2xl lg:text-3xl text-white lg:hidden xl:block">PACK<span
          class="text-cyan-400">THEM</span>IN</p>
    </div>
    <!-- Logo end -->

    <!-- Toggler start -->
    <button role="menubar" class="lg:hidden mr-4" @click="navToggle()">
      <i class="pi pi-align-justify text-white" style="font-size: 2rem"></i>
    </button>
    <!-- Toggler end -->

    <!-- Menu content start -->
    <div ref="menu"
      class="absolute justify-end z-10 left-0 top-1 right-0 translate-y-16 bg-opacity-90 bg-primary lg:bg-none lg:bg-opacity-0 shadow hidden lg:flex flex-col gap-4 items-center p-4 lg:flex-row lg:static lg:shadow-none lg:translate-y-0 text-white"
      role="menu" aria-expanded="false">
      <!-- Links start -->

      <RouterLink :to="{ name: 'admin-campaigns' }" class="" @click="showNav && navToggle()">
        <p class="mx-4">Campaigns</p>
      </RouterLink>

      <RouterLink :to="{ name: 'admin-clients' }" class="" @click="showNav && navToggle()">
        <p class="mx-4">Clients</p>
      </RouterLink>

      <RouterLink :to="{ name: 'admin-templates' }" class="" @click="showNav && navToggle()">
        <p class="mx-4">Templates</p>
      </RouterLink>

      <RouterLink :to="{ name: 'admin-users' }" class="" @click="showNav && navToggle()">
        <p class="mx-4">Users</p>
      </RouterLink>

      <!--<RouterLink :to="{ name: 'admin-code' }" class="" @click="showNav && navToggle()">
        <p class="mx-4">Coder</p>
      </RouterLink>-->

      <div class="flex gap-4 text-black">
        <SearchInput />
        <UserMenu />
      </div>

      <!-- <RouterLink :to="{ name: 'client-login' }" class="btn">
          <a href="#client-login" class="nav-btn">Log In</a>
      </RouterLink> -->
      <!-- Links end -->
    </div>
    <!-- Menu content end -->
  </nav>
  <!-- Navbar end -->
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useSearch } from '@/stores/search';
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import UserMenu from '@/components/common/UserMenu.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import NavLogo from '@/components/common/NavLogo.vue'

const route = useRoute()

const menu = ref(null as any)

const showNav = ref(false)

const navToggle = () => {
  // showNavBg.value = true
  if (menu.value) {
    let isExpanded = menu.value.getAttribute('aria-expanded');
    menu.value.setAttribute('aria-expanded', !isExpanded);
    menu.value.classList.toggle('hidden');
    menu.value.classList.toggle('flex');
    showNav.value = true
  }
}

</script>

<style scoped>
/* .router-link-active {
  @apply bg-black bg-opacity-25
} */
.router-link-active {
  @apply bg-slate-700 rounded-md bg-opacity-40 py-1
}

/* .nav-btn {
  @apply text-white hover:bg-black hover:bg-opacity-25 px-4 py-1 rounded
} */
</style>