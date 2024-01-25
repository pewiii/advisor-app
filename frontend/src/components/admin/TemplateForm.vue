<template>
  <form class="">
    <div class="flex justify-between mb-4">
      <Modal :header="'Edit Template'">
        <template #trigger="{ open }">
          <pvButton v-ripple class="p-ripple" label="Edit" icon="pi pi-web" iconPos="right" severity="warning"
            @click="open" raised />
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
                <FieldError :error="formErrors.title" class="relative" />
              </label>
              <div class="pl-2">
                <pvInputText id="template-title" v-model="template.title" placeholder="Template Title"
                  class="w-full h-9" />
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
                  <ImageSelect v-model="template.config.backgroundImage" />
                </div>
              </div>

              <div class="md:pl-4">
                <label for="client-first" class="">
                  Paragraph Image
                </label>
                <div class="pl-4">
                  <ImageSelect v-model="template.config.panelImage" />
                </div>
              </div>




              <div class="md:pl-4">
                <label for="client-first" class="">
                  Paragraph Text
                </label>
                <div class="pl-4">
                  <Modal :header="'Paragraph Text'">
                    <template v-slot:trigger="{ open }">
                      <pvButton label="Set Text" outlined raised @click="open" />
                    </template>
                    <template v-slot:content>
                      <pvTextArea v-model="template.config.panelText" class="w-full h-80" />
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
                    <template v-slot:trigger="{ open }">
                      <pvButton label="Choose" outlined raised @click="open" />
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.firstPanelColor"
                        @color-change="(color: any) => template.config.firstPanelColor = color.colors.hex" class="" />
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
                    <template v-slot:trigger="{ open }">
                      <pvButton label="Choose" outlined raised @click="open" />
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.firstPanelTextColor"
                        @color-change="(color: any) => template.config.firstPanelTextColor = color.colors.hex" class="" />
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
                    <template v-slot:trigger="{ open }">
                      <pvButton label="Choose" outlined raised @click="open" />
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.secondPanelColor"
                        @color-change="(color: any) => template.config.secondPanelColor = color.colors.hex" class="" />
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
                    <template v-slot:trigger="{ open }">
                      <pvButton label="Choose" outlined raised @click="open" />
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.secondPanelTextColor"
                        @color-change="(color: any) => template.config.secondPanelTextColor = color.colors.hex"
                        class="" />
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
                    <template v-slot:trigger="{ open }">
                      <pvButton label="Choose" outlined raised @click="open" />
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.btnColor"
                        @color-change="(color: any) => template.config.btnColor = color.colors.hex" class="" />
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
                    <template v-slot:trigger="{ open }">
                      <pvButton label="Choose" outlined raised @click="open" />
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.btnTextColor"
                        @color-change="(color: any) => template.config.btnTextColor = color.colors.hex" class="" />
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
                    <template v-slot:trigger="{ open }">
                      <pvButton label="Choose" outlined raised @click="open" />
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.optionBgColor"
                        @color-change="(color: any) => template.config.optionBgColor = color.colors.hex" class="" />
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
                    <template v-slot:trigger="{ open }">
                      <pvButton label="Choose" outlined raised @click="open" />
                    </template>
                    <template v-slot:content>
                      <ColorPicker :color="template.config.optionTextColor"
                        @color-change="(color: any) => template.config.optionTextColor = color.colors.hex" class="" />
                    </template>
                  </Modal>
                </div>
              </div>







            </div>

            <div class="border-t-2 pt-4 border-b-2 pb-4 mt-4">
              <div class="flex items-center justify-between text-primary font-semibold">
                <div class="flex gap-2">
                  <div class="text-lg">
                    Questions
                  </div>
                  <div class="material-icons md-30">question_mark</div>
                </div>
                <div>
                  <pvButton v-ripple class="p-ripple" raised @click="addQuestion" size="small" icon="pi pi-plus"
                    iconPos="right" label="Add Question" outlined />
                </div>
              </div>
              <div>
                <div v-for="(question, idx) in template.config.questions" class="mt-4 bg-gray-100"
                  :key="`template-question-${idx}`">
                  <div
                    class="text-slate-600 flex justify-between bg-primary bg-opacity-20 p-1 hover:bg-opacity-30 border-1 border-primary border-opacity-50"
                    @click="expandQuestion(question)">
                    <div class="flex gap-2">
                      <div class="font-semibold">
                        Question {{ idx + 1 }}
                      </div>
                      <div v-if="template.config.questions.length" class="flex cursor-pointer font-bold text-primary">
                        <div v-if="expandedQuestions.includes(question)" class="flex">
                          <div class="flex items-center justify-center">Collapse</div>
                          <span class="material-icons">expand_less</span>
                        </div>
                        <div v-else class="flex">
                          <div class="flex items-center justify-center">Expand</div>
                          <span class="material-icons">expand_more</span>
                        </div>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <pvButton v-ripple class="p-ripple h-7" icon="pi pi-copy" v-tooltip.top="'Clone Question'"
                        @click="cloneQuestion(question)"></pvButton>
                      <pvButton severity="danger" v-ripple class="p-ripple h-7" icon="pi pi-delete-left"
                        v-tooltip.top="'Delete Question'" @click="removeQuestion(question)"></pvButton>
                    </div>
                  </div>
                  <div v-if="expandedQuestions.includes(question)" class="bg-gray-100 pr-4 pb-2">
                    <div class="md:pl-4">
                      <label :for="`question-${idx}-text`" class="">
                        Question
                        <FieldError :error="formErrors.questions[idx].text" class="relative" />
                      </label>
                      <div class="pl-2">
                        <pvInputText :id="`question-${idx}-text`" v-model="template.config.questions[idx].text"
                          placeholder="Question Text" size="small" class="w-full h-9" />
                      </div>
                    </div>
                    <div class="flex flex-col md:flex-row">
                      <div class="md:pl-4 flex-1">
                        <label :for="`question-${idx}-answertype`" class="">
                          Answer Type
                          <FieldError :error="formErrors.questions[idx].answerType" class="relative" />
                        </label>
                        <div class="pl-2">
                          <pvDropdown :id="`question-${idx}-answertype`"
                            v-model="template.config.questions[idx].answerType" :options="objects.questionTypes"
                            optionLabel="name" optionValue="value" class="w-full h-9 relative" />
                        </div>
                      </div>
                      <div class="md:pl-4 flex-1" v-if="getQuestionType(template.config.questions[idx].answerType).label">
                        <label :for="`question-${idx}-placeholder`" class="">
                          Label
                          <FieldError :error="formErrors.questions[idx].label" class="relative" />
                        </label>
                        <div class="pl-2">
                          <pvInputText :id="`question-${idx}-label`" v-model="template.config.questions[idx].label"
                            placeholder="Label" size="small" class="w-full h-9" />
                        </div>
                      </div>
                      <div class="md:pl-4 flex-1"
                        v-if="getQuestionType(template.config.questions[idx].answerType).placeholder">
                        <label :for="`question-${idx}-placeholder`" class="">
                          Placeholder Text
                        </label>
                        <div class="pl-2">
                          <pvInputText :id="`question-${idx}-placeholder`"
                            v-model="template.config.questions[idx].placeholder" placeholder="Placeholder" size="small"
                            class="w-full h-9" />
                        </div>
                      </div>
                    </div>
                    <div v-if="question.answerType === 'select'" class="w-full md:pl-8">
                      <div class="flex">
                        <label class="label mt-2 mr-2">Options:</label>
                        <div class="">
                          <pvButton v-ripple @click="question.options.push('')" size="small" icon="pi pi-plus"
                            iconPos="right" rounded class="p-ripple !h-7 !w-7 mt-1" />
                        </div>
                      </div>
                      <div class="md:pl-4 w-full" v-for="(option, opIdx) in question.options"
                        :key="`template-queston-${idx}-option-${opIdx}`">
                        <div class="flex justify-between h-8 mt-2">
                          <label :for="`question-${idx}-option-${opIdx}`" class="">
                            Option {{ opIdx + 1 }}
                          </label>
                          <!-- <div class="material-icons text-slate-600 hover:text-red-600 cursor-pointer" @click="removeOption(question.options, idx)">delete</div> -->
                          <pvButton severity="danger" text v-ripple class="p-ripple h-6" icon="pi pi-delete-left"
                            v-tooltip.top="'Delete Option'" @click="removeOption(question.options, idx)"></pvButton>
                        </div>
                        <div class="pl-2 md:flex w-full">
                          <pvInputText :id="`event-${idx}-address1`"
                            v-model="template.config.questions[idx].options[opIdx]" placeholder="Dropdown Option"
                            class="w-full h-9" />
                        </div>
                      </div>
                    </div>
                  </div>
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
        <pvButton v-ripple class="p-ripple" label="Back" icon="pi pi-arrow-left" iconPos="right" severity="secondary"
          @click="emit('onCancel')" raised />
        <pvButton v-ripple class="p-ripple" label="Save" icon="pi pi-check" iconPos="right" @click="emit('onSubmit')"
          raised :disabled="formErrors.hasErrors" />
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
import objects from '@/objects'

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

  const labels = [] as string[]
  const questions = template.value.config.questions.map((question: any) => {
    console.log(getQuestionType(question.answerType))
    const result = {
      ...question.text ? {} : { text: required('Question') },
      ...question.answerType ? {} : { answerType: required('Answer type') },
      ...getQuestionType(question.answerType).label && !question.label ? { label: required('Label') } : {},
      // ...labels.includes(question.label) ? { label: 'Label must be unique' } : {}
    }
    if (labels.includes(question.label)) {
      result.label = 'Label must be unique'
    }
    labels.push(question.label)
    return result
  })

  const hasQuestionErrors = questions.some((question: any) => Object.keys(question).length)
  errors.hasErrors = Boolean(Object.keys(errors).length) || hasQuestionErrors
  // errors.hasErrors = Boolean(Object.keys(errors).length)
  errors.questions = questions
  formErrors.value = errors
}, { deep: true, immediate: true })

const expandedQuestions = ref([] as any[])

const cloneQuestion = (question: any) => {
  const newQuestion = { ...question, options: [...question.options] }
  delete newQuestion._id
  template.value.config.questions.push(newQuestion)
  expandQuestion(newQuestion)
}

const expandQuestion = (question: any) => {
  if (expandedQuestions.value.includes(question)) {
    expandedQuestions.value = expandedQuestions.value.filter(expandedQuestion => expandedQuestion !== question)
  } else {
    expandedQuestions.value.push(question)
  }
}

const addQuestion = () => {
  const question = { ...objects.emptyQuestion, options: [] }
  template.value.config.questions.push(question)
  expandQuestion(question)
}
const removeQuestion = (question: any) => {
  template.value.config.questions = template.value.config.questions.filter((templateQuestion: any) => templateQuestion !== question)
}

const removeOption = (options: string[], idx: number) => {
  if (idx >= 0 && idx < options.length) {
    options.splice(idx, 1)
  } else {
    console.error('Invalid index. Index must be within the range of the array.')
  }
  return options
}

const getQuestionType = (answerType: any) => {
  return objects.questionTypes.find(questionType => questionType.value === answerType) || { label: false, placeholder: false }
}

</script>

<style scoped>input {
  @apply px-4 bg-gray-100 hover:bg-white
}</style>