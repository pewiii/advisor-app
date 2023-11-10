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
          Unique Title
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

      <!-- Top Section -->
      <div class="font-semibold text-gray-700">Top Section</div>
      <div class="flex flex-wrap gap-4">
        <div class="md:pl-4">
          <label for="client-first" class="">
            Image
          </label>
          <div class="pl-4">
            <ImageSelect v-model="template.config.headerImage"/>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-first" class="">
            Text Color
          </label>
          <div class="pl-4">
            <Modal :header="'Header Panel Text Color'" :size="'small'">
              <template v-slot:trigger="{open}">
                <pvButton label="Choose" outlined raised @click="open"/>
              </template>
              <template v-slot:content>
                <ColorPicker :color="template.config.headerPanelTextColor" @color-change="(color: any) => template.config.headerPanelTextColor = color.colors.hex" class=""/>
              </template>
            </Modal>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-first" class="">
            Panel Coler
          </label>
          <div class="pl-4">
            <Modal :header="'Header Panel Background Color'" :size="'small'">
              <template v-slot:trigger="{open}">
                <pvButton label="Choose" outlined raised @click="open"/>
              </template>
              <!-- <template v-slot:header>Header Panel Text Color</template> -->
              <template v-slot:content>
                <ColorPicker :color="template.config.headerPanelBgColor" @color-change="(color: any) => template.config.headerPanelBgColor = color.colors.hex" class=""/>
              </template>
            </Modal>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-first" class="">
            Paragraph
          </label>
          <div class="pl-4">
            <Modal :header="'Header Panel Paragraph'">
              <template v-slot:trigger="{open}">
                <pvButton label="Set Text" outlined raised @click="open"/>
              </template>
              <template v-slot:content>
                <pvTextArea v-model="template.config.headerPanelText" class="w-full"/>
              </template>
            </Modal>
          </div>
        </div>
      </div>

      <!-- Center Section -->
      <div class="font-semibold text-gray-700 mt-4">Center Section</div>
      <div class="flex flex-wrap gap-4">
        <div class="md:pl-4">
          <label for="client-first" class="">
            Background Color
          </label>
          <div class="pl-4">
            <Modal :header="'Heading Section Background Color'" :size="'small'">
              <template v-slot:trigger="{open}">
                <pvButton label="Choose" outlined raised @click="open"/>
              </template>
              <!-- <template v-slot:header>Header Panel Text Color</template> -->
              <template v-slot:content>
                <ColorPicker :color="template.config.headingSectionBgColor" @color-change="(color: any) => template.config.headingSectionBgColor = color.colors.hex" class=""/>
              </template>
            </Modal>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-first" class="">
            Text Color
          </label>
          <div class="pl-4">
            <Modal :header="'Heading Section Text Color'" :size="'small'">
              <template v-slot:trigger="{open}">
                <pvButton label="Choose" outlined raised @click="open"/>
              </template>
              <template v-slot:content>
                <ColorPicker :color="template.config.headingSectionTextColor" @color-change="(color: any) => template.config.headingSectionTextColor = color.colors.hex" class=""/>
              </template>
            </Modal>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-first" class="">
            Heading
          </label>
          <div class="pl-4">
            <Modal :header="'Center Section Heading'">
              <template v-slot:trigger="{open}">
                <pvButton label="Set Text" outlined raised @click="open"/>
              </template>
              <template v-slot:content>
                <pvTextArea v-model="template.config.headingSectionHeading" class="w-full"/>
              </template>
            </Modal>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-first" class="">
            Paragraph
          </label>
          <div class="pl-4">
            <Modal :header="'Center Section Paragraph'">
              <template v-slot:trigger="{open}">
                <pvButton label="Set Text" outlined raised @click="open"/>
              </template>
              <template v-slot:content>
                <pvTextArea v-model="template.config.headingSectionText" class="w-full"/>
              </template>
            </Modal>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="font-semibold text-gray-700 mt-4">Bottom Section</div>
      <div class="flex flex-wrap gap-4">
        <div class="md:pl-4">
          <label for="client-first" class="">
            Info Image
          </label>
          <div class="pl-4">
            <ImageSelect v-model="template.config.infoImage"/>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-first" class="">
            Text Color
          </label>
          <div class="pl-4">
            <Modal :header="'Info Panel Text Color'" :size="'small'">
              <template v-slot:trigger="{open}">
                <pvButton label="Choose" outlined raised @click="open"/>
              </template>
              <template v-slot:content>
                <ColorPicker :color="template.config.infoPanelTextColor" @color-change="(color: any) => template.config.infoPanelTextColor = color.colors.hex" class=""/>
              </template>
            </Modal>
          </div>
        </div>        
        <div class="md:pl-4">
          <label for="client-first" class="">
            Panel Coler
          </label>
          <div class="pl-4">
            <Modal :header="'Info Panel Background Color'" :size="'small'">
              <template v-slot:trigger="{open}">
                <pvButton label="Choose" outlined raised @click="open"/>
              </template>
              <template v-slot:content>
                <ColorPicker :color="template.config.infoPanelBgColor" @color-change="(color: any) => template.config.infoPanelBgColor = color.colors.hex" class=""/>
              </template>
            </Modal>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-first" class="">
            Heading
          </label>
          <div class="pl-4">
            <Modal :header="'Info Panel Heading'">
              <template v-slot:trigger="{open}">
                <pvButton label="Set Text" outlined raised @click="open"/>
              </template>
              <template v-slot:content>
                <pvTextArea v-model="template.config.infoPanelHeading" class="w-full"/>
              </template>
            </Modal>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-first" class="">
            Paragraph
          </label>
          <div class="pl-4">
            <Modal :header="'Info Panel Paragraph'">
              <template v-slot:trigger="{open}">
                <pvButton label="Set Text" outlined raised @click="open"/>
              </template>
              <template v-slot:content>
                <pvTextArea v-model="template.config.infoPanelText" class="w-full"/>
              </template>
            </Modal>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-first" class="">
            Button Color
          </label>
          <div class="pl-4">
            <Modal :header="'Submit Button Color'" :size="'small'">
              <template v-slot:trigger="{open}">
                <pvButton label="Choose" outlined raised @click="open"/>
              </template>
              <template v-slot:content>
                <ColorPicker :color="template.config.submitBtnColor" @color-change="(color: any) => template.config.submitBtnColor = color.colors.hex" class=""/>
              </template>
            </Modal>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-first" class="">
            Button Text Color
          </label>
          <div class="pl-4">
            <Modal :header="'Submit Button Text Color'" :size="'small'">
              <template v-slot:trigger="{open}">
                <pvButton label="Choose" outlined raised @click="open"/>
              </template>
              <template v-slot:content>
                <ColorPicker :color="template.config.submitBtnTextColor" @color-change="(color: any) => template.config.submitBtnTextColor = color.colors.hex" class=""/>
              </template>
            </Modal>
          </div>
        </div>
        <div class="md:pl-4">
          <label for="client-first" class="">
            Button Text
          </label>
          <div class="pl-4">
            <Modal :header="'Submit Button Text'" :size="'small'">
              <template v-slot:trigger="{open}">
                <pvButton label="Set Text" outlined raised @click="open"/>
              </template>
              <template v-slot:content>
                <pvInputText v-model="template.config.submitBtnText" />
                <!-- <pvTextArea v-model="template.config.infoPanelText" class="w-full"/> -->
              </template>
            </Modal>
          </div>
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
import Modal from '@/components/common/Modal.vue'
import { useAuthStore } from '@/stores/auth';
import { notify } from '@kyvg/vue3-notification';
import ImageSelect from '@/components/admin/ImageSelect.vue'
import { ColorPicker } from 'vue-accessible-color-picker'

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
    console.log(data)
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