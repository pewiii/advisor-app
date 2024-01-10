<template>
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
      <div v-if="auth.user && auth.user.email">
        Logged in as {{ auth.user.email }}
      </div>
      <div class="mt-4 flex justify-between">
        <pvButton label="Chage Password" severity="warning"/>
        <pvButton label="Logout" size="small" @click="logout"/>
      </div>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import Modal from '@/components/common/Modal.vue'
import router from '@/router';
import { useAuth } from '@/stores/auth'
import { useRouter } from 'vue-router';

const auth = useAuth()

const logout = () => {
  auth.logout()
  router.push({ name: 'home' })
  // router.go(0)
}

</script>