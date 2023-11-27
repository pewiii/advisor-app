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
          Login
        </div>
        <div class="material-icons md-30">key</div>
      </div>
      <div class="md:pl-4">
        <label for="user-email" class="">
          Email
        </label>
        <div class="pl-2">
          <pvInputText id="user-email" v-model="user.email" placeholder="Email Address" class="w-full h-9"/>
        </div>
      </div>
      <div class="md:pl-4">
        <label for="user-password" class="">
          Password
        </label>
        <div class="pl-2">
          <pvInputText id="user-password" v-model="user.password" placeholder="Password" class="w-full h-9"/>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
        <div class="text-lg">
          Permission
        </div>
        <div class="material-icons md-30">key</div>
      </div>
      <div class="md:pl-4 flex">
        <label for="user-email" class="">
          Admin
        </label>
        <div class="pl-2 -translate-y-1">
          <pvCheckbox id="user-email" v-model="user.isAdmin" binary class="h-9"/>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-16 gap-4 flex-wrap">
      <pvButton v-ripple class="p-ripple" label="Cancel" icon="pi pi-times" iconPos="right" severity="secondary" @click="cancel" raised />
      <pvButton v-ripple class="p-ripple" label="Submit" icon="pi pi-check" iconPos="right" @click="submitUser" raised />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth';
import { notify } from '@kyvg/vue3-notification';
import { useRouter } from 'vue-router';

const auth = useAuthStore()
const router = useRouter()
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

const submitUser = async () => {
  try {
    const data = JSON.parse(JSON.stringify(user.value))
    const info = {
      path: data._id ? `/admin/users/${data._id}` : '/admin/users',
      title: data._id ? 'Updated' : 'Created',
      text: data._id ? 'User updated successfully' : 'User created successfully'
    }

    await auth.api.post(info.path, data)
    notify({
      title: info.title,
      text: info.text,
      type: 'success'
    })
    // user.value = null
    router.replace({ name: 'admin-users' })
  } catch(err: any) {
    console.log(err)
    console.log(err.message)
  }
}

</script>

<style scoped>
input {
  @apply px-4 bg-gray-100 hover:bg-white
}
</style>