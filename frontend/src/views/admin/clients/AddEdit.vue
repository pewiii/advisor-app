<template>
  <div class="flex justify-between mb-4 p-10">
    <RouterLink to="/staff/clients"><div class="btn"><span class="material-icons md-36 translate-y-3 -mt-6">arrow_back</span>Back</div></RouterLink>
    <!-- <RouterLink to="/staff/clients/add-edit"><div class="btn hover:bg-sky-500 hover:!text-gray-200"><span class="material-icons md-36 translate-y-3 -mt-6">add</span>Add Client</div></RouterLink> -->
  </div>
  <div class="flex justify-center">
    <div class="bg-white ">
      <div class="bg-slate-700 px-8 py-6 text-xl font-semibold text-gray-200">
        Client Information
      </div>
      <form class="p-8">
        <div class="border-b-2 border-gray-300 flex">
          <span class="material-icons text-gray-600 md-36">person</span>
          <label class="">
          </label>
          <input type="text" v-model="client.firstName" placeholder="First Name" class=""/>
          <label class="">
          </label>
          <input type="text" v-model="client.lastName" placeholder="Last Name" class=""/>
        </div>
        <div class="border-b-2 border-gray-300 flex w-full">
          <span class="material-icons text-gray-600 md-36">apartment</span>
          <label class="">
          </label>
            <input type="text" v-model="client.company" placeholder="Company" class="w-full"/>
        </div>
        <div class="border-b-2 border-gray-300 flex w-full">
          <span class="material-icons text-gray-600 md-36">phone</span>
          <label class="">
          </label>
            <input type="text" v-model="client.phone" placeholder="Phone" class="w-full"/>
        </div>
        <div class="border-b-2 border-gray-300 flex w-full">
          <span class="material-icons text-gray-600 md-36">email</span>
          <label class="">
          </label>
            <input type="text" v-model="client.email" placeholder="Email" class="w-full"/>
        </div>
        <div class="mt-8">
          <div class="flex items-center mb-2">
            <span class="material-icons text-gray-600 md-36">location_on</span>
            <div class="text-lg text-gray-600">
              Address
            </div>
          </div>
          <div class="border-b-2 border-gray-300 flex w-full">
            <label class="">
            </label>
              <input type="text" v-model="client.address1" placeholder="Address 1" class="w-full h-10"/>
          </div>
          <div class="border-b-2 border-gray-300 flex w-full">
            <label class="">
            </label>
              <input type="text" v-model="client.address2" placeholder="Address 2" class="w-full h-10"/>
          </div>
          <div class="border-b-2 border-gray-300 flex w-full">
            <!-- <span class="material-icons text-gray-600 md-36">location_on</span> -->
            <label class="">
            </label>
            <input type="text" v-model="client.city" placeholder="City" class="w-full h-10"/>
            <label class="">
            </label>
            <input type="text" v-model="client.state" placeholder="State" class="w-24"/>
            <label class="">
            </label>
            <input type="text" v-model="client.zip" placeholder="Zip" class="w-48"/>
          </div>
        </div>
        <div class="flex justify-end mt-8">
          <button class="btn" @click.prevent="addClient()">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { notify } from "@kyvg/vue3-notification"
import { useRouter } from 'vue-router';
import router from '@/router';


const auth = useAuthStore()

const client = ref({
  firstName: '',
  lastName: '',
  company: '',
  phone: '',
  email: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: ''
})

const addClient = async () => {
  try {
    console.log(client.value)
    await auth.api.post('/clients/add', client.value)
    notify({
      title: 'Created',
      text: 'Client created successfully',
      type: 'success'
    })
    router.push('/staff/clients')
  } catch(err: any) {
    console.log(err.message)
  }
}


</script>

<style scoped>
  input {
    @apply px-4
  }
</style>