<template>
  <form class="">
    <div>
      <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
        <div class="text-lg">
          Template
        </div>
        <div class="material-icons md-30">web</div>
      </div>
      <div class="md:pl-4">
        <label for="template-title" class="">
          Title
        </label>
        <div class="pl-2">
          <pvInputText id="template-title" v-model="template.title" placeholder="Template Title" class="w-full h-9"/>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <div class="flex items-center mb-2 font-semibold gap-2 text-primary">
        <div class="text-lg">
          Config
        </div>
        <div class="material-icons md-30">settings</div>
      </div>
      <div class="md:pl-4">
        <label for="client-first" class="">
          Header Image
        </label>
        <div class="mt-4 flex gap-4 pl-4">
          <!-- <Modal :header="">
            <template v-slot:trigger="{ open }" >
              <pvButton label="Open" @click="open"/>
            </template> -->
            
            <!-- <template v-slot:footer="{ close }" >
              <pvButton label="Close" @click="close" />
            </template> -->
          <!-- </Modal> -->
          <ImageSelect v-model="template.config.headerImage"/>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-16 gap-4">
      <pvButton v-ripple class="p-ripple" label="Cancel" icon="pi pi-times" iconPos="right" severity="secondary" @click="template = null" raised />
      <pvButton v-ripple class="p-ripple" label="Submit" icon="pi pi-check" iconPos="right" @click="submitTemplate()" raised />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
// import Modal from '@/components/common/Modal.vue'
import { useAuthStore } from '@/stores/auth';
import { notify } from '@kyvg/vue3-notification';
import ImageSelect from '@/components/admin/ImageSelect.vue'

const auth = useAuthStore()

const props = defineProps(['modelValue', 'cancel'])

const emit = defineEmits(['update:modelValue'])

const template = computed({
  get() {
    return props.modelValue
  },
  set(template) {
    emit('update:modelValue', template)
  }
})

const submitTemplate = async () => {
  try {
    const data = JSON.parse(JSON.stringify(template.value))
    data.user = auth.user
    const info = {
      path: data._id ? '/templates/update' : '/templates/add',
      title: data._id ? 'Updated' : 'Created',
      text: data._id ? 'Template updated successfully' : 'Template created successfully'
    }

    const res = await auth.api.post(info.path, data)

    notify({
      title: info.title,
      text: info.text,
      type: 'success'
    })

    template.value = null
  } catch(err: any) {
    console.log(err.message)
  }
}

// const submitClient = async () => {
//   try {
//     const data = JSON.parse(JSON.stringify(client.value))
//     const info = {
//       path: data._id ? '/clients/update' : '/clients/add',
//       title: data._id ? 'Updated' : 'Created',
//       text: data._id ? 'Client updated successfully' : 'Client created successfully'
//     }
//     const res = await auth.api.post(info.path, data)
//     notify({
//       title: info.title,
//       text: info.text,
//       type: 'success'
//     })
//     client.value = null
//   } catch(err: any) {
//     console.log(err.message)
//   }
// }

// const deleteClient = async () => {
//   try {
//     await auth.api.post('/clients/delete', { clientId: client.value._id })
//     props.cancel()
//     // getClients()
//     // editClient.value = null
//   } catch(err: any) {
//     console.log(err.message)
//   }
// }

</script>

<style scoped>
  input {
    @apply px-4 bg-gray-100 hover:bg-white
  }
</style>