<template>
  <div class="p-4 flex justify-between bg-primary">
    <div class="text-white">
      Logo
    </div>
    <div class="flex gap-4">
      <div>
        <input type="text" placeholder="Search" class="h-8 ml-4 bg-gray-200 px-2 md:w-96" v-model="search" />
      </div>
      <div class="relative" @mouseleave="showMenu = false">
        <div
        @click="showMenu = true"
        class="w-8 h-8 rounded-full border-2 border-gray-200 flex justify-center items-center cursor-pointer"
          >
          <span class="material-icons text-gray-200 md-24">person</span>
        </div>
        <div class="top-0 right-0 absolute bg-white text-slate-500 w-56 h-96 rounded-lg z-10" v-if="showMenu">
          <div class="flex gap-4">
            <div class="whitespace-nowrap px-4 py-2">
              User Name
            </div>
          </div>
          
          <div class="">
            <div class="text-center py-4 px-4 cursor-pointer" @click="logout">
              <span class="material-icons md-18 translate-y-1">logout</span> Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const router = useRouter()

const search = computed({
  get() {
    return props.modelValue
  },
  set(search) {
    emit('update:modelValue', search)
  }
})

const auth = useAuthStore()

const showMenu = ref(false)

const isAdmin = computed(() => {
  return auth.user && auth.user.userType === 'admin'
})

const logout = () => {
  auth.logout()
  router.go(0)
}

</script>