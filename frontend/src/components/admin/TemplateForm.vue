<template>
  <form class="">
    <div class="flex justify-between mb-4">
      <Modal :header="'Edit Template'">
        <template #trigger="{open}">
          <pvButton v-ripple class="p-ripple" label="Edit" icon="pi pi-web" iconPos="right" severity="warning" @click="open" raised/>
        </template>
        <template #content>
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
                <FieldError :error="formErrors.title"></FieldError>
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

            <div class="flex flex-wrap gap-4">
              <div class="md:pl-4">
                <label for="client-first" class="">
                  Background Image
                </label>
                <div class="pl-4">
                  <ImageSelect v-model="template.config.backgroundImage"/>
                </div>
              </div>
  
              <div class="md:pl-4">
                <label for="client-first" class="">
                  Paragraph Image
                </label>
                <div class="pl-4">
                  <ImageSelect v-model="template.config.panelImage"/>
                </div>
              </div>

              


              <div class="md:pl-4">
                  <label for="client-first" class="">
                  Paragraph Text
                </label>
                <div class="pl-4">
                  <Modal :header="'Paragraph Text'">
                    <template v-slot:trigger="{open}">
                      <pvButton label="Set Text" outlined raised @click="open"/>
                    </template>
                    <template v-slot:content>
                      <pvTextArea v-model="template.config.panelText" class="w-full h-80"/>
                    </template>
                  </Modal>
                </div>
              </div>

              

              
              
              <div class="md:pl-4">
                <label for="client-first" class="">
                  Panel 1 Coler
                </label>
                <div class="pl-4">
                  <Modal :header="'Panel 1 Color'" :size="'small'">
                    <template v-slot:trigger="{open}">
                      <pvButton label="Choose" outlined raised @click="open"/>
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.firstPanelColor" @color-change="(color: any) => template.config.firstPanelColor = color.colors.hex" class=""/>
                    </template>
                  </Modal>
                </div>
              </div>
              <div class="md:pl-4">
                <label for="client-first" class="">
                  Panel 1 Text Color
                </label>
                <div class="pl-4">
                  <Modal :header="'Panel 1 Text Color'" :size="'small'">
                    <template v-slot:trigger="{open}">
                      <pvButton label="Choose" outlined raised @click="open"/>
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.firstPanelTextColor" @color-change="(color: any) => template.config.firstPanelTextColor = color.colors.hex" class=""/>
                    </template>
                  </Modal>
                </div>
              </div>

              <div class="md:pl-4">
                <label for="client-first" class="">
                  Panel 2 Coler
                </label>
                <div class="pl-4">
                  <Modal :header="'Panel 2 Color'" :size="'small'">
                    <template v-slot:trigger="{open}">
                      <pvButton label="Choose" outlined raised @click="open"/>
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.secondPanelColor" @color-change="(color: any) => template.config.secondPanelColor = color.colors.hex" class=""/>
                    </template>
                  </Modal>
                </div>
              </div>


              <div class="md:pl-4">
                <label for="client-first" class="">
                  Panel 2 Text Color
                </label>
                <div class="pl-4">
                  <Modal :header="'Panel 2 Texts Color'" :size="'small'">
                    <template v-slot:trigger="{open}">
                      <pvButton label="Choose" outlined raised @click="open"/>
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.secondPanelTextColor" @color-change="(color: any) => template.config.secondPanelTextColor = color.colors.hex" class=""/>
                    </template>
                  </Modal>
                </div>
              </div>


              <div class="md:pl-4">
                <label for="client-first" class="">
                  Button Color
                </label>
                <div class="pl-4">
                  <Modal :header="'Button Color'" :size="'small'">
                    <template v-slot:trigger="{open}">
                      <pvButton label="Choose" outlined raised @click="open"/>
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.btnColor" @color-change="(color: any) => template.config.btnColor = color.colors.hex" class=""/>
                    </template>
                  </Modal>
                </div>
              </div>


              <div class="md:pl-4">
                <label for="client-first" class="">
                  Button Text Color
                </label>
                <div class="pl-4">
                  <Modal :header="'Button Text Color'" :size="'small'">
                    <template v-slot:trigger="{open}">
                      <pvButton label="Choose" outlined raised @click="open"/>
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.btnTextColor" @color-change="(color: any) => template.config.btnTextColor = color.colors.hex" class=""/>
                    </template>
                  </Modal>
                </div>
              </div>

              <div class="md:pl-4">
                <label for="client-first" class="">
                  Option Color
                </label>
                <div class="pl-4">
                  <Modal :header="'Option Color'" :size="'small'">
                    <template v-slot:trigger="{open}">
                      <pvButton label="Choose" outlined raised @click="open"/>
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.optionBgColor" @color-change="(color: any) => template.config.optionBgColor = color.colors.hex" class=""/>
                    </template>
                  </Modal>
                </div>
              </div>

              <div class="md:pl-4">
                <label for="client-first" class="">
                  Option Text Color
                </label>
                <div class="pl-4">
                  <Modal :header="'Option Text Color'" :size="'small'">
                    <template v-slot:trigger="{open}">
                      <pvButton label="Choose" outlined raised @click="open"/>
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.optionTextColor" @color-change="(color: any) => template.config.optionTextColor = color.colors.hex" class=""/>
                    </template>
                  </Modal>
                </div>
              </div>





            </div>


  
            <!-- Top Section -->
            <!-- <div class="font-semibold text-gray-700">Top Section</div>
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
            </div> -->
  
            <!-- Center Section -->
            <!-- <div class="font-semibold text-gray-700 mt-4">Center Section</div>
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
            </div> -->
  
            <!-- Bottom Section -->
            <!-- <div class="font-semibold text-gray-700 mt-4">Bottom Section</div>
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
                    </template>
                  </Modal>
                </div>
              </div>
            </div> -->
          </div> 
        </template>
      </Modal>
      
      <div class="flex gap-4">
        <pvButton v-ripple class="p-ripple" label="Back" icon="pi pi-arrow-left" iconPos="right" severity="secondary" @click="emit('onCancel')" raised />
        <pvButton v-ripple class="p-ripple" label="Save" icon="pi pi-check" iconPos="right" @click="emit('onSubmit')" raised :disabled="formErrors.hasErrors" />
      </div>
    </div>
    <div class="h-screen relative">
      <TemplatePreview :template="template" :previewCampaign="previewCampaign" />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import Modal from '@/components/common/Modal.vue'
import ImageSelect from '@/components/admin/ImageSelect.vue'
import { ColorPicker } from 'vue-accessible-color-picker'
import FieldError from '@/components/common/FieldError.vue'
import TemplatePreview from '@/components/admin/TemplatePreview.vue'

const props = defineProps(['modelValue'])

const emit = defineEmits(['update:modelValue', 'onSubmit', 'onCancel'])

const template = computed({
  get() {
    return props.modelValue
  },
  set(template) {
    emit('update:modelValue', template)
  }
})

const previewCampaign = {
  events: [
    {
      locationName: 'Location Name',
      address1: '12405 73rd Ct N',
      address2: '',
      city: 'Largo',
      state: 'FL',
      zip: '33773',
      eventDate: '2024-01-31T05:00:00.000Z',
      timezone: "America/New_York"
    },
    {
      locationName: 'Location Name',
      address1: '12405 73rd Ct N',
      address2: '',
      city: 'Largo',
      state: 'FL',
      zip: '33773',
      eventDate: '2024-02-12T16:00:00.000Z',
      timezone: "America/New_York"
    }
  ],
  questions: [
    {
        "text": "Are you bringing a guest?",
        "answerType": "select",
        "placeholder": "",
        "label": "guest",
        "options": [
            "Yes",
            "No"
        ],
    },
    {
        "text": "What is your phone number?",
        "answerType": "phone",
        "options": [],
    }
  ],
}

// validation
const formErrors = ref({} as any)
watch(template, () => {
  const required = (field: string) => `${field} is required`;
  let errors = {
    ...template.value.title ? {} : { title: required('Title') }
  } as any;
  errors.hasErrors = Boolean(Object.keys(errors).length)
  formErrors.value = errors
}, { deep: true, immediate: true })

</script>

<style scoped>
  input {
    @apply px-4 bg-gray-100 hover:bg-white
  }
</style>