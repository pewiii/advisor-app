<template>


  <div class="p-1 items-center px-4 flex justify-between bg-primary" :class="route.path.includes('login') ? 'bg-opacity-0 fixed w-full' : ''">
    
    <div class="text-white hidden sm:block">
      Logo
    </div>

    
    <div class="flex gap-4 items-center">
      <nav class="p-2 flex gap-4">
        <div v-if="!auth.user" class="flex gap-4">
          <RouterLink :to="{ name: 'home' }">
            <a href="#" class="text-white hover:bg-sky-700 px-4 py-2 rounded">Home</a>
          </RouterLink>
          <div v-if="!route.path.includes('login')" class="flex gap-4">
            <RouterLink :to="{ name: 'login' }">
              <a href="#login" class="text-white hover:bg-sky-700 px-4 py-2 rounded">Log In</a>
            </RouterLink>
            <RouterLink :to="{ name: 'admin-login'}">
              <a href="#admin-login" class="text-white hover:bg-sky-700 px-4 py-2 rounded">Admin</a>
            </RouterLink>
          </div>
        </div>

        <div v-if="auth.user && auth.user.userType === 'admin'" class="flex gap-4 items-center">
          <RouterLink :to="{ name: 'admin-campaigns' }">
            <a href="#" class="text-white hover:bg-sky-700 px-4 py-2 rounded">Campaigns</a>
          </RouterLink>
          <RouterLink :to="{ name: 'admin-clients' }">
            <a href="#" class="text-white hover:bg-sky-700 px-4 py-2 rounded">Clients</a>
          </RouterLink>
          <RouterLink :to="{ name: 'admin-templates' }">
            <a href="#" class="text-white hover:bg-sky-700 px-4 py-2 rounded">Templates</a>
          </RouterLink>
          <RouterLink :to="{ name: 'admin-users' }">
            <a href="#" class="text-white hover:bg-sky-700 px-4 py-2 rounded">Users</a>
          </RouterLink>
        </div>

      </nav>






      <div class="flex gap-4" v-if="auth.user">

        <div>
          <input type="text" placeholder="Search" class="h-8 ml-4 bg-gray-200 px-2 md:w-96" v-model="searchText" />
        </div>

        <Modal header="User" size="medium">

          <template #trigger="{open}">
            <div
            @click="open"
            class="w-8 h-8 rounded-full border-2 border-gray-200 flex justify-center items-center cursor-pointer"
            >
              <span class="material-icons text-gray-200 md-24">person</span>
            </div>            
          </template>

          <template #content>
            <div>
              Logged in as {{ auth.user.email }}
            </div>
            <div class="mt-4 flex justify-between">
              <pvButton label="Chage Password" severity="warning"/>
              <pvButton label="Logout" size="small" @click="logout"/>
            </div>
          </template>

        </Modal>

        <!-- <div class="">
          <div
          @click="showMenu = true"
          class="w-8 h-8 rounded-full border-2 border-gray-200 flex justify-center items-center cursor-pointer"
            >
            <span class="material-icons text-gray-200 md-24">person</span>
          </div>
          <pvSidebar v-model:visible="showMenu" position="right">
            <div class="flex flex-col items-center">
              <div class="flex items-center gap-3">
                <div
                class="w-8 h-8 rounded-full border-2 border-primary flex justify-center items-center"
                >
                  <span class="material-icons text-primary md-24">person</span>
                </div>
                <div class="text-lg">
                  {{ auth.user.email }}
                </div>
              </div>
              <div class="mt-4">
                <div class="text-center py-4 px-4 cursor-pointer" @click="logout">
                  <span class="material-icons md-18 translate-y-1">logout</span> Logout
                </div>
              </div>
            </div>
          </pvSidebar>
        </div> -->
      </div>
    </div>



    
    <!-- <div class="text-white hidden sm:block">
      Logo
    </div>
    <div class="flex gap-4 w-full justify-end">
      <div>
        <slot></slot>
      </div>
      <div>
        <input type="text" placeholder="Search" class="h-8 ml-4 bg-gray-200 px-2 md:w-96" v-model="search" />
      </div>
      <div class="">
        <div
        @click="showMenu = true"
        class="w-8 h-8 rounded-full border-2 border-gray-200 flex justify-center items-center cursor-pointer"
          >
          <span class="material-icons text-gray-200 md-24">person</span>
        </div>
        <pvSidebar v-model:visible="showMenu" position="right">
          <div class="flex flex-col items-center">
            <div class="flex items-center gap-3">
              <div
              class="w-8 h-8 rounded-full border-2 border-primary flex justify-center items-center"
              >
                <span class="material-icons text-primary md-24">person</span>
              </div>
              <div class="text-lg">
                {{ auth.user.email }}
              </div>
            </div>
            <div class="mt-4">
              <div class="text-center py-4 px-4 cursor-pointer" @click="logout">
                <span class="material-icons md-18 translate-y-1">logout</span> Logout
              </div>
            </div>
          </div>
        </pvSidebar>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { useSearchStore } from '@/stores/search';
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import Modal from '@/components/common/Modal.vue'

// const props = defineProps(['modelValue'])
// const emit = defineEmits(['update:modelValue'])

const router = useRouter()
const route = useRoute()

// const search = computed({
//   get() {
//     return props.modelValue
//   },
//   set(search) {
//     emit('update:modelValue', search)
//   }
// })

const auth = useAuthStore()
const search = useSearchStore()
const { searchText } = storeToRefs(search)

// const showMenu = ref(false)

// const isAdmin = computed(() => {
//   return auth.user && auth.user.userType === 'admin'
// })

const logout = () => {
  auth.logout()
  router.go(0)
}

</script>

<style scoped>
.router-link-active {
  @apply bg-sky-800 py-1 rounded
}
</style>