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
          <label for="client-first" class="">
            First Name
            <FieldError :error="formErrors.firstName"></FieldError>
          </label>
          <div class="pl-2">
            <pvInputText id="client-first" v-model="client.firstName" placeholder="First Name" class="w-full h-9"/>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-last" class="">
            Last Name
            <FieldError :error="formErrors.lastName"></FieldError>
          </label>
          <div class="pl-2">
            <pvInputText id="client-last" v-model="client.lastName" placeholder="Last Name" class="w-full h-9"/>
          </div>
        </div>
      </div>
      <div class="mt-6">
        <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
          <div class="text-lg">
            Company
          </div>
          <div class="material-icons md-30">apartment</div>
        </div>
        <div class="md:pl-4">
          <label for="client-company" class="">
            Company Name
            <FieldError :error="formErrors.company"></FieldError>
          </label>
          <div class="pl-2">
            <pvInputText id="client-company" v-model="client.company" placeholder="Company Name" class="w-full h-9"/>
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
          <label for="client-phone" class="">
            Phone Number
          </label>
          <div class="pl-2">
            <pvInputText id="client-phone" v-model="client.phone" placeholder="Phone Number" class="w-full h-9"/>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-email" class="">
            Email
            <FieldError :error="formErrors.email"></FieldError>
          </label>
          <div class="pl-2">
            <pvInputText id="client-email" v-model="client.email" placeholder="Email Address" class="w-full h-9"/>
          </div>
        </div>
      </div>
      <div class="mt-6">
        <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
          <div class="text-lg">
            Address
          </div>
          <div class="material-icons md-30">location_on</div>
        </div>
        <div class="md:pl-4">
          <label for="client-address1" class="">
            Address 1
          </label>
          <div class="pl-2">
            <pvInputText id="client-address1" v-model="client.address.address1" placeholder="Primary Address" class="w-full h-9"/>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-address2 " class="">
            Address 2
          </label>
          <div class="pl-2">
            <pvInputText id="client-address2" v-model="client.address.address2" placeholder="Secondary Address" class="w-full h-9"/>
          </div>
        </div>
        <div class="flex gap-x-2 flex-col md:flex-row">
          <div class="md:pl-4 flex-1 sm:min-w-2">
            <label for="client-city " class="">
              City
            </label>
            <div class="pl-2">
              <pvInputText id="client-city" v-model="client.address.city" placeholder="City" class="w-full h-9"/>
            </div>
          </div>
          <div class="md:pl-4 md:w-32 w-full">
            <label for="client-state" class="">
              State
            </label>
            <div class="pl-2">
              <pvInputText id="client-state" v-model="client.address.state" placeholder="State" class="w-full h-9"/>
            </div>
          </div>
          <div class="md:pl-4 flex-0">
            <label for="client-zip" class="">
              Zip Code
            </label>
            <div class="pl-2">
              <pvInputText id="client-zip" v-model="client.address.zip" placeholder="Zip Code" class="w-full h-9"/>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8" v-if="client._id">
        <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
          <div class="text-lg">
            Status
          </div>
          <div class="material-icons md-30">key</div>
        </div>
        <div class="md:pl-4 flex gap-x-4 flex-wrap">
          <div>
            <span>
              Access
            </span>
            <span v-if="client.usablePassword" class="material-icons text-green-600 font-bold translate-y-1">check</span>
            <span v-else class="text-red-600 material-icons font-bold translate-y-1">close</span>
          </div>
          <div>
            <span>
              Link Sent
            </span>
            <div class="inline text-green-600" v-if="client.emailSentAt">
              <span class="material-icons font-bold translate-y-1">check</span>
              <span class="">{{ format(new Date(client.emailSentAt), 'dd/MM/yyyy HH:mm') }}</span>
            </div>
            <div v-else class="inline text-red-600">
              <span class="material-icons font-bold translate-y-1">close</span>
            </div>
            <Modal v-if="!client.usablePassword" :header="'Password Setup Link'" :size="'medium'"> 
              <template v-slot:trigger="{open}">
                <span @click="open" class="ml-2 text-primary font-semibold cursor-pointer hover:text-opacity-75">{{ client.emailSentAt ? 'Resend?' : 'Send?' }}</span>
              </template>
              <template v-slot:content>
                <div v-if="emailLoading" class="flex justify-center">
                  <VueLoader />
                </div>
                <div v-else-if="emailSuccess">Email sent successfully</div>
                <div v-else>
                  <div>
                    Send {{ client.fullName }} a password setup email?
                  </div>
                  <div class="flex justify-end mt-4">
                    <pvButton label="Send" size="small" @click="emailClient"/>
                  </div>
                </div>
              </template>
            </Modal>
          </div>
          <!-- <div class="md:pl-4">
            <span>
              Active Campaigns
            </span>
            <span v-if="client.status === 'active'" class="material-icons text-green-600 font-bold translate-y-1">check</span>
            <span v-else class="material-icons font-bold translate-y-1 text-red-600">close</span>
          </div> -->
        </div>
      </div>
      <div class="flex justify-center mt-16 gap-4 flex-wrap">
        <pvButton v-ripple class="p-ripple" label="Cancel" icon="pi pi-times" iconPos="right" severity="secondary" @click="cancel" raised />
        <pvButton v-ripple class="p-ripple" label="Submit" icon="pi pi-check" iconPos="right" @click="submitClient" raised :disabled="formErrors.hasErrors" />
      </div>
    </form>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import Modal from '@/components/common/Modal.vue'
import { useAuth } from '@/stores/auth';
import { notify } from '@kyvg/vue3-notification';
import { format } from 'date-fns'
import VueLoader from '@/components/common/VueLoader.vue'
import FieldError from '@/components/common/FieldError.vue'
// import router from '@/router';
import { useRouter } from 'vue-router';

const auth = useAuth()
const router = useRouter()
const props = defineProps(['modelValue', 'cancel'])

const emit = defineEmits(['update:modelValue'])

const client = computed({
  get() {
    return props.modelValue
  },
  set(client) {
    emit('update:modelValue', client)
  }
})

// validation
const formErrors = ref({} as any)
watch(client, () => {
  const required = (field: string) => `${field} is required`;
  const isValidEmail = (email: string) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  let errors = {
    ...client.value.firstName ? {} : { firstName: required('First Name') },
    ...client.value.lastName ? {} : { lastName: required('Last Name') },
    ...client.value.company ? {} : { company: required('Company') },
    ...client.value.email ? {} : { email: required('Email') }
  } as any;
  if (client.value.email && !isValidEmail(client.value.email)) {
    errors.email = 'Invalid email'
  }
  errors.hasErrors = Boolean(Object.keys(errors).length);
  formErrors.value = errors
}, { deep: true, immediate: true })

const emailSuccess = ref(false)
const emailLoading = ref(false)

const emailClient = async () => {
  emailLoading.value = true
  try {
    const res = await auth.api.post('admin/clients/setup', { clientId: client.value._id })
    client.value = res.data
    emailSuccess.value = true
    notify({
      title: 'Email',
      text: 'Email sent successfully',
      type: 'success'
    })
  } catch(err: any) {
    console.log(err.message)
  }
  emailLoading.value = false
}

const submitClient = async () => {
  try {
    const data = JSON.parse(JSON.stringify(client.value))
    const info = {
      path: data._id ? `/admin/clients/${data._id}` : '/admin/clients',
      title: data._id ? 'Updated' : 'Created',
      text: data._id ? 'Client updated successfully' : 'Client created successfully'
    }
    await auth.api.post(info.path, data)
    notify({
      title: info.title,
      text: info.text,
      type: 'success'
    })
    router.replace({ name: 'admin-clients' })
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