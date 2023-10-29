<template>

      <form class="p-8">
        <div>
          <div class="flex items-center mb-2 text-red-950 font-semibold gap-2 ">
            <div class="text-lg">
              Name
            </div>
            <div class="material-icons md-36">person</div>
          </div>
  
  
          <div class="border-b-2 border-gray-300 flex">
            <!-- <span class="material-icons text-gray-600 md-36">edit</span> -->
            <label class="label mt-2 mr-2">
              First:
            </label>
            <input type="text" v-model="client.firstName" placeholder="First Name" class="w-full"/>
            <!-- <input type="text" v-model="campaign.lastName" placeholder="Last Name" class=""/> -->
          </div>
  
          <div class="border-b-2 border-gray-300 flex">
            <!-- <span class="material-icons text-gray-600 md-36">edit</span> -->
            <label class="label mt-2 mr-2">
              Last:
            </label>
            <input type="text" v-model="client.lastName" placeholder="Last Name" class="w-full"/>
            <!-- <input type="text" v-model="campaign.lastName" placeholder="Last Name" class=""/> -->
          </div>
        </div>

        <div class="mt-8">
          <div class="flex items-center mb-2 text-red-950 font-semibold gap-2 ">
            <div class="text-lg">
              Company
            </div>
            <div class="material-icons md-36">apartment</div>
          </div>

          <div class="border-b-2 border-gray-300 flex">
            <!-- <span class="material-icons text-gray-600 md-36">edit</span> -->
            <label class="label mt-2 mr-2">
              Name:
            </label>
            <input type="text" v-model="client.company" placeholder="Company Name" class="w-full"/>
            <!-- <input type="text" v-model="campaign.lastName" placeholder="Last Name" class=""/> -->
          </div>

        </div>


        <div class="mt-8">
          <div class="flex items-center mb-2 text-red-950 font-semibold gap-2 ">
            <div class="text-lg">
              Contact Info
            </div>
            <div class="material-icons md-36">info_outline</div>
          </div>

          <div class="border-b-2 border-gray-300 flex">
            <!-- <span class="material-icons text-gray-600 md-36">edit</span> -->
            <label class="label mt-2 mr-2">
              Phone:
            </label>
            <input type="text" v-model="client.phone" placeholder="Phone Number" class="w-full"/>
            <!-- <input type="text" v-model="campaign.lastName" placeholder="Last Name" class=""/> -->
          </div>

          <div class="border-b-2 border-gray-300 flex">
            <!-- <span class="material-icons text-gray-600 md-36">edit</span> -->
            <label class="label mt-2 mr-2">
              Email:
            </label>
            <input type="text" v-model="client.email" placeholder="Email Address" class="w-full"/>
            <!-- <input type="text" v-model="campaign.lastName" placeholder="Last Name" class=""/> -->
          </div>

        </div>


        <div class="mt-8">
          <div class="flex items-center mb-2 text-red-950 font-semibold gap-2 ">
            <div class="text-lg">
              Address
            </div>
            <div class="material-icons md-36">location_on</div>
          </div>

          <div class="border-b-2 border-gray-300 flex">
            <!-- <span class="material-icons text-gray-600 md-36">edit</span> -->
            <label class="label mt-2 mr-2 whitespace-nowrap">
              Address 1:
            </label>
            <input type="text" v-model="client.address1" placeholder="Address 1" class="w-full"/>
            <!-- <input type="text" v-model="campaign.lastName" placeholder="Last Name" class=""/> -->
          </div>

          <div class="border-b-2 border-gray-300 flex">
            <!-- <span class="material-icons text-gray-600 md-36">edit</span> -->
            <label class="label mt-2 mr-2 whitespace-nowrap">
              Address 2:
            </label>
            <input type="text" v-model="client.address2" placeholder="Address 2" class="w-full"/>
            <!-- <input type="text" v-model="campaign.lastName" placeholder="Last Name" class=""/> -->
          </div>

          <div class="border-b-2 border-gray-300 flex">
            <!-- <span class="material-icons text-gray-600 md-36">edit</span> -->
            <label class="label mt-2 mr-2">
              City:
            </label>
            <input type="text" v-model="client.city" placeholder="City" class="w-full"/>
            <!-- <input type="text" v-model="campaign.lastName" placeholder="Last Name" class=""/> -->
          </div>

          <div class="border-b-2 border-gray-300 flex">
            <!-- <span class="material-icons text-gray-600 md-36">edit</span> -->
            <label class="label mt-2 mr-2">
              State:
            </label>
            <input type="text" v-model="client.state" placeholder="State" class="w-full"/>
            <!-- <input type="text" v-model="campaign.lastName" placeholder="Last Name" class=""/> -->
          </div>

          <div class="border-b-2 border-gray-300 flex">
            <!-- <span class="material-icons text-gray-600 md-36">edit</span> -->
            <label class="label mt-2 mr-2">
              Zip:
            </label>
            <input type="text" v-model="client.zip" placeholder="Zip" class="w-full"/>
            <!-- <input type="text" v-model="campaign.lastName" placeholder="Last Name" class=""/> -->
          </div>

        </div>


        <div class="flex justify-center mt-16 gap-4">
          <div class="admin-btn !bg-slate-800" @click="client = null">Cancel</div>
          <button class="admin-btn" @click.prevent="submitClient">Submit</button>
        </div>
        <!-- <div class="flex justify-end mt-8">
          <button class="admin-btn" @click.prevent="submitClient(client)">Submit</button>
        </div> -->
      </form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
// import { useAuthStore } from '@/stores/auth'
// import { notify } from "@kyvg/vue3-notification"
// import { useRouter } from 'vue-router';
// import router from '@/router';

const props = defineProps(['modelValue', 'submitClient'])

const emit = defineEmits(['update:modelValue'])

const client = computed({
  get() {
    return props.modelValue
  },
  set(client) {
    emit('update:modelValue', client)
  }
})


// const auth = useAuthStore()

// const client = ref({
//   firstName: '',
//   lastName: '',
//   company: '',
//   phone: '',
//   email: '',
//   address1: '',
//   address2: '',
//   city: '',
//   state: '',
//   zip: ''
// })



</script>

<style scoped>
  input {
    @apply px-4 bg-gray-100 hover:bg-white
  }
</style>