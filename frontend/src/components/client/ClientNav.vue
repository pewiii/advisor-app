<template>


  <div class="p-1 items-center px-4 flex justify-between bg-primary h-12" :class="route.path.includes('login') ? 'bg-opacity-0 fixed w-full' : ''">
    
    <div class="text-white hidden sm:block">

      <span class="font-bold">P</span><span class="font-thin text-gray-200">ack</span><span class="font-bold">T</span><span class="font-thin text-gray-200">hem</span><span class="font-bold">I</span><span class="font-thin text-gray-200">n</span>

    </div>

    
    <div class="flex gap-4 items-center">
      <nav class="p-2 flex gap-4">



      </nav>


      <div class="flex gap-4">

        <div>
          <input type="text" placeholder="Search" class="h-8 ml-4 bg-gray-200 px-2 md:w-96" v-model="searchText" />
        </div>

        <UserMenu />

        <!-- <Modal header="User" size="medium">

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

        </Modal> -->

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
// import { useAuthStore } from '@/stores/auth'
import { useSearch } from '@/stores/search';
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import Modal from '@/components/common/Modal.vue'
import UserMenu from '@/components/common/UserMenu.vue'

// const props = defineProps(['modelValue'])
// const emit = defineEmits(['update:modelValue'])

const router = useRouter()
const route = useRoute()

// watch(route, () => {
//   console.log(route)
// }, { deep: true })

// const search = computed({
//   get() {
//     return props.modelValue
//   },
//   set(search) {
//     emit('update:modelValue', search)
//   }
// })

// const auth = useAuthStore()
const search = useSearch()
const { searchText } = storeToRefs(search)

// const showMenu = ref(false)

// const isAdmin = computed(() => {
//   return auth.user && auth.user.userType === 'admin'
// })

// const logout = () => {
//   auth.logout()
//   router.go(0)
// }

</script>

<style scoped>
.router-link-active {
  @apply bg-sky-800 py-1 rounded
}
.nav-btn {
  @apply text-white hover:bg-black hover:bg-opacity-25 px-4 py-2 rounded
}
</style>