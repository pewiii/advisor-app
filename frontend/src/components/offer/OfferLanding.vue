<template>
  <div class="relative w-full max-h-screen overflow-hidden lg:min-h-screen lg:flex items-center justify-center" :style="{'background-image': `url(${headerImage})`, 'background-size': 'cover', 'background-position': 'center', 'background-attachment': 'fixed' }">
    <div class="flex w-full h-full lg:max-w-2xl ">
      <div class="bg-white p-8" :style="{ 'background-color': `${templateData.config.headerPanelBgColor}`, 'color': `${templateData.config.headerPanelTextColor}` }">
        <div class="font-bold text-2xl capitalize">
          Hello {{ person.firstName.toLowerCase() }}
        </div>
        <div class="text-xl mt-4">
          {{ config.headerPanelText }}
        </div>
      </div>
      <!-- <div v-if="arrowDown" class="absolute z-20 bottom-0 mb-8 text-white">
        <span class="material-icons md-56 font-bold">arrow_downward</span>
      </div> -->
    </div>
    <!-- <img :src="headerImage" class="bg-cover w-full"/> -->
  </div>
  <div class="p-20 flex flex-col justify-center items-center" :style="{ 'background-color': `${config.headingSectionBgColor}`, 'color': `${config.headingSectionTextColor}` }">
    <div class="text-center max-w-7xl">
      <div class="text-3xl font-semibold">{{ config.headingSectionHeading }}</div>
      <div class="mt-6">{{ config.headingSectionText }}</div>
    </div>
  </div>
  <div class="flex min-h-screen lg:justify-center lg:items-center" :style="{'background-image': `url(${infoImage})`, 'background-size': 'cover', 'background-position': 'center' }">
    <div class="bg-white p-6 w-full lg:max-w-3xl" :style="{ 'background-color': `${config.infoPanelBgColor}`, 'color': `${config.infoPanelTextColor}` }">
      <div v-if="success" class="text-center">
        <div class="font-semibold text-4xl">
          Success
        </div>
        <div>
          You have been registered, Thank You!
        </div>
      </div>
      <div v-else>
        <div class="font-bold text-4xl">{{ config.infoPanelHeading }}</div>
        <div>
          {{ config.infoPanelText }}
        </div>
        <div>
          <div v-if="events" class="flex gap-4 flex-col mt-8">
            <div v-for="(event) in events" :key="event._id" class="flex align-items-center bg-white bg-opacity-20 p-4" :class="selectedEvent === event ? 'border-2' : ''">
              <div class="flex items-center">
                <pvRadioButton v-model="selectedEvent" :inputId="event._id" name="dynamic" :value="event"/>
              </div>
              <label :for="event._id" class="ml-2 w-full">
                <div>{{ event.locationName }}</div>
                <div>{{ event.address1 }}</div>
                <div v-if="event.address2">{{ event.address2 }}</div>
                <div>{{ event.city }}, {{ event.state }} {{ event.zip }}</div>
                <div>{{ moment(event.eventDate).tz(event.timezone).format('MMMM Do YYYY, h:mm a') }}</div>
              </label>
            </div>        
          </div>
          <div v-if="questions.length" class="mt-4">
            <div class="font-semibold text-lg">Question<span v-if="questions.length > 1">s</span></div>
            <div class="flex flex-col gap-4">
              <div v-for="(question, idx) in questions" :key="`question-${idx}`" class="bg-white bg-opacity-20 p-4 flex gap-4 flex-wrap">
                <div>{{ question.text }}</div>
                <component :is="component[question.answerType]" v-model="answers[idx].answer" binary :options="question.options" :placeholder="question.placeholder" class="!py-0 h-8"/>
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-center">
            <pvButton  raised :label="config.submitBtnText" class="w-1/2" :disabled="submitDisabled" @click="submit" :loading="loading" :style="{ 'background-color': config.submitBtnColor, 'color': config.submitBtnTextColor }"/>
          </div>
        </div>
      </div>
    </div>
    <!-- <img :src="infoImage" class="bg-cover w-full" /> -->
  </div>
</template>

<script lang="ts" setup>
// import image from '@/assets/tempimage.jpg'
import { ref, onMounted, computed, watch } from 'vue'
import topImage from '@/assets/tempimage.jpg'
import bottomImage from '@/assets/steak.jpg'
import moment from 'moment-timezone'
import { useAuth } from '@/stores/auth'

const props = defineProps(['templateData'])

onMounted(() => {
  console.log(props.templateData)
})

const auth = useAuth()

const selectedEvent = ref(null)
const answers = ref([] as any)

const loading = ref(false)
const success = ref(false)


const component = {
  'select': 'pvDropdown',
  'checkbox': 'pvCheckbox',
  'text': 'pvInputText',
  'number': 'pvInputNumber'
} as any

const headerImage = computed(() => {
  if (props.templateData.config && props.templateData.config.headerImage) {
    console.log(props.templateData.config.headerImage.url)
    return props.templateData.config.headerImage.url
  }
  return topImage
})

const infoImage = computed(() => {
  if (props.templateData.config && props.templateData.config.infoImage) {
    return props.templateData.config.infoImage.url
  }
  return bottomImage
})

// watch(() => props.templateData, () => {
//   console.log(props.templateData)
// }, { deep: true })

const person = computed(() => {
  return props.templateData.person || {
    firstName: 'Friend'
  }
})

const events = computed(() => {
  return props.templateData.events || []
})

const questions = computed(() => {
  return props.templateData.questions || []
})

const config = computed(() => {
  return props.templateData.config
})

const submitDisabled = computed(() => {
  if (success.value) {
    return true
  }
  if (answers.value) {
    for (let i = 0; i < questions.value.length; i++) {
      const question = questions.value[i]
      if (question.answerType === 'checkbox' || !answers.value[i]) {
        continue
      }

      if (question.answerType === 'number') {
        if (Object.is(answers.value[i].answer, null)) {
          return true
        }
      } else if (!answers.value[i].answer) {
        return true
      }
    }
  }
  return false
})

const submit = async () => {
  console.log(answers.value)
  console.log(submitDisabled.value)
  if (!person.value._id) return
  loading.value = true
  const data = {
    personId: person.value._id,
    event: selectedEvent.value,
    answers: answers.value
  }
  try {
    const res = await auth.api.post('/rsvp', data)
    success.value = true
  } catch(err) {
    console.log(err)
  }
  loading.value = false
}

const arrowDown = ref(false)


watch(events, () => {
  selectedEvent.value = events.value[0]
}, { immediate: true, deep: true })

watch(questions, () => {
  answers.value = questions.value.map((question: any) => {
    let answer = '' as any
    if (question.answerType === 'checkbox') {
      answer = false
    }
    if (question.answerType === 'select') {
      if (question.options && question.options.length) {
        answer = question.options[0]
      } else {
        answer = ''
      }
    }
    if (question.answerType === 'number') {
      answer = null
    }
    return {
      label: question.label,
      answer
    }
  })
}, { immediate: true, deep: true})


// onMounted(() => {
  // let interval = null
  // const timeout = setTimeout(() => {
    
  //   interval = setInterval(() => {
  //     arrowDown.value = !arrowDown.value
  //   }, 1000)
  // }, 3000);

  // document.addEventListener('scroll', () => {
  //   if (timeout) {
  //     clearTimeout(timeout)
  //   }
  //   if (interval) {
  //     clearInterval(interval)
  //   }
  //   arrowDown.value = false
  // })
// })

</script>