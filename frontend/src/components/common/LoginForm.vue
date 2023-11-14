<template>
  <div>
    <form class="bg-white p-10 shadow-lg rounded-lg">
      <label class="flex border-b-2 mb-6">
        <div>
          <span class="material-icons text-gray-500 md-36">person</span>
        </div>
        <div class="pl-2">
          <input v-model="email" type="text" placeholder="Email" class="w-full h-10 text-xl"/>
        </div>
      </label>
      <label class="flex border-b-2 items-end">
        <div>
          <span class="material-icons text-gray-500 md-36">lock</span>
        </div>
        <div class="pl-2">
          <input v-model="password" type="password" placeholder="Password" class="w-full h-10 text-xl"/>
        </div>
      </label>
      <div class="mt-8 text-end">
        <button class="w-full" :class="userType === 'admin' ? 'admin-btn' : 'btn'" @click.prevent="login({ email, password })">Submit</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
  login: {
    type: Function,
    required: true
  },
  userType: {
    type: String,
    required: true
  }
})

const email = ref('')
const password = ref('')

</script>