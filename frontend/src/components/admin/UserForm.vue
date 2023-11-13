<template>
  <form class="">
    <div>
      <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
        <div class="text-lg">
          Name
        </div>
        <div class="material-icons md-30">person</div>
      </div>
      <div class="md:pl-4">
        <label for="user-first" class="">
          First Name
        </label>
        <div class="pl-2">
          <pvInputText id="user-first" v-model="user.firstName" placeholder="First Name" class="w-full h-9"/>
        </div>
      </div>
      <div class="md:pl-4">
        <label for="user-last" class="">
          Last Name
        </label>
        <div class="pl-2">
          <pvInputText id="user-last" v-model="user.lastName" placeholder="Last Name" class="w-full h-9"/>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
        <div class="text-lg">
          Contact Info
        </div>
        <div class="material-icons md-30">phone</div>
      </div>
      <div class="md:pl-4">
        <label for="user-email" class="">
          Email
        </label>
        <div class="pl-2">
          <pvInputText id="user-email" v-model="user.email" placeholder="Email Address" class="w-full h-9"/>
        </div>
      </div>
    </div>

    <div class="mt-8" v-if="user._id">
      <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
        <div class="text-lg">
          Status
        </div>
        <div class="material-icons md-30">key</div>
      </div>
      <div class="md:pl-4 flex gap-x-4 justify-between flex-wrap">

      </div>
    </div>
    <div class="flex justify-center mt-16 gap-4 flex-wrap">
      <pvButton v-ripple class="p-ripple" label="Cancel" icon="pi pi-times" iconPos="right" severity="secondary" @click="user = null" raised />
      <pvButton v-ripple class="p-ripple" label="Submit" icon="pi pi-check" iconPos="right" @click="submitUser" raised />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
// import { useAuthStore } from '@/stores/auth'
// import { notify } from "@kyvg/vue3-notification"
// import { useRouter } from 'vue-router';
// import router from '@/router';
import Modal from '@/components/common/Modal.vue'
import { useAuthStore } from '@/stores/auth';
import { notify } from '@kyvg/vue3-notification';
import { format } from 'date-fns'
import VueLoader from '@/components/common/VueLoader.vue'

const auth = useAuthStore()

const props = defineProps(['modelValue', 'cancel'])

const emit = defineEmits(['update:modelValue'])

const user = computed({
get() {
  return props.modelValue
},
set(user) {
  emit('update:modelValue', user)
}
})

// const emailSuccess = ref(false)
// const emailLoading = ref(false)

// const emailUser = async () => {
// emailLoading.value = true
// try {
//   const res = await auth.api.post('/clients/setup', { clientId: user.value._id })
//   user.value = res.data
//   emailSuccess.value = true
//   notify({
//     title: 'Email',
//     text: 'Email sent successfully',
//     type: 'success'
//   })
// } catch(err: any) {
//   console.log(err.message)
// }
// emailLoading.value = false
// }

const submitUser = async () => {
try {
  const data = JSON.parse(JSON.stringify(user.value))
  // delete data.campaigns
  const info = {
    path: data._id ? '/users/update' : '/users/add',
    title: data._id ? 'Updated' : 'Created',
    text: data._id ? 'User updated successfully' : 'User created successfully'
  }
  const res = await auth.api.post(info.path, data)
  // console.log(res)
  notify({
    title: info.title,
    text: info.text,
    type: 'success'
  })
  user.value = null
} catch(err: any) {
  console.log(err)
  console.log(err.message)
}
}

const deleteUser = async () => {
try {
  await auth.api.post('/users/delete', { userId: user.value._id })
  props.cancel()
  // getClients()
  // editClient.value = null
} catch(err: any) {
  console.log(err.message)
}
}



</script>

<style scoped>
input {
  @apply px-4 bg-gray-100 hover:bg-white
}
</style>