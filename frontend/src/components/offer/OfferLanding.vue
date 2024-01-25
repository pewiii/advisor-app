<!-- <div class="w-screen h-screen fixed" :style="`background-image: url(${headerImage}); background-size: cover;`"> -->
<template>
  <div class="min-w-full min-h-screen  relative flex items-center justify-center"
    :style="backgroundImage && `background-image: url(${backgroundImage}); background-size: cover;`">
    <div class="flex min-w-full justify-center flex-wrap" style="{}">

      <div class="p-8 lg:max-w-xl w-full"
        :style="{ color: config.firstPanelTextColor, backgroundColor: config.firstPanelColor }">
        <div class="mb-4 capitalize text-xl flex justify-center font-[500]">
          <div>
            Hello {{ person.firstName.toLowerCase() }}
          </div>
        </div>
        <div>
          <!-- <div class="w-32 h-32 bg-stone-500 float-left mr-6"></div> -->
          <div v-if="panelImage" class="float-left mr-4">
            <img :src="panelImage" width="200" height="200" />
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Sed euismod nisi porta lorem mollis. Volutpat odio facilisis mauris sit. Tellus mauris a diam
            maecenas sed enim ut sem. Eget felis eget nunc lobortis mattis aliquam. Sed adipiscing diam donec adipiscing
            tristique risus nec feugiat. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl. At auctor
            urna nunc id cursus. Amet porttitor eget dolor morbi non arcu risus quis varius. Lorem ipsum dolor sit amet.
            Viverra ipsum nunc aliquet bibendum enim. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit
            lectus. Sed elementum tempus egestas sed sed. Eget est lorem ipsum dolor sit amet consectetur adipiscing.
            Felis imperdiet proin fermentum leo vel orci. Scelerisque varius morbi enim nunc faucibus a pellentesque.</p>
        </div>
      </div>




      <div class="p-8 lg:max-w-xl w-full"
        :style="{ color: config.secondPanelTextColor, backgroundColor: config.secondPanelColor }">

        <div v-if="!success">
          <div class="text-2xl">
            Registration
          </div>

          <div class="mt-4">
            Please select an event
          </div>

          <div v-if="events" class="flex gap-4 flex-col">
            <label v-for="(event) in events" :key="event._id"
              class="flex align-items-center items-center p-4 gap-4 cursor-pointer"
              :style="{ backgroundColor: config.optionBgColor, color: config.optionTextColor }"
              :class="selectedEvent === event ? 'bg-opacity-60' : 'hover:bg-opacity-60'">
              <pvRadioButton v-model="selectedEvent" :disabled="success" :inputId="event._id" name="dynamic"
                :value="event" />
              <div class="font-semibold opacity-90">
                {{ moment(event.eventDate).tz(event.timezone).format('MMMM Do YYYY,h: mm a') }}
              </div>
              <div v-if="eventLocations.length > 1">
                <div>{{ event.locationName }}</div>
                <div>{{ event.address1 }}</div>
                <div v-if="event.address2">{{ event.address2 }}</div>
                <div>{{ event.city }}, {{ event.state }} {{ event.zip }}</div>
              </div>
            </label>
          </div>

          <div v-if="eventLocations.length === 1" class="flex justify-between mt-4 h-32 items-center">

            <div class="ml-4 font-semibold text-lg opacity-70 whitespace-nowrap mr-4">
              <div>{{ eventLocations[0].locationName }}</div>
              <div>{{ eventLocations[0].address1 }}</div>
              <div v-if="eventLocations[0].address2">{{ eventLocations[0].address2 }}</div>
              <div>{{ eventLocations[0].city }}, {{ eventLocations[0].state }} {{ eventLocations[0].zip }}</div>
            </div>

            <div>
              <Modal :header="eventLocations[0].locationName">
                <template #trigger="{ open }">
                  <!-- <div @click="open" class="w-32 h-32 bg-red-300">
                    <GMap :addresses="eventLocations"/>
                  </div> -->
                  <pvButton v-ripple class="p-ripple" icon="pi pi-map" v-tooltip.top="'View Map'" label="View Map"
                    @click="open" :style="{ 'background-color': config.btnColor, 'color': config.btnTextColor }">
                  </pvButton>
                  <!-- <pvButton @click="open" icon="pi pi-map" v-tooltip.top="'View Map'"/> -->
                </template>
                <template #content="{ maximized }">
                  <div class="w-full" :class="maximized ? 'h-full' : 'h-96'">
                    <GMap :addresses="eventLocations" />
                  </div>
                </template>
              </Modal>
            </div>
          </div>

          <div v-if="questions.length" class="mt-4">

            <div class="text-2xl">Question<span v-if="questions.length > 1">s</span></div>
            <div class="flex flex-col gap-4">
              <div v-for="(question, idx) in questions" :key="`question-${idx}`" class="p-4 flex gap-4 flex-wrap"
                :style="{ backgroundColor: config.optionBgColor, color: config.optionTextColor }">
                <div>{{ question.text }}</div>
                <div v-if="question.answerType === 'phone'">
                  <pvInputMask v-model="answers[idx].answer" :disabled="success" mask="(999) 999-9999" class="!py-0 h-8"
                    placeholder="(999) 999-999" />
                  <FieldError :error="formErrors[idx]"></FieldError>
                </div>
                <div v-else-if="question.answerType === 'email'">
                  <pvInputText v-model="answers[idx].answer" :disabled="success" placeholder="youremail@email.com"
                    class="!py-0 h-8" />
                  <FieldError :error="formErrors[idx]"></FieldError>
                  <!-- <pvInputMask v-model="answers[idx].answer" mask="(999) 999-9999" class="!py-0 h-8" placeholder="(999) 999-999"/> -->
                </div>
                <div v-else>
                  <component :is="component[question.answerType]" v-model="answers[idx].answer" :disabled="success" binary
                    :options="question.options" :placeholder="question.placeholder" class="!py-0 h-8" />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 flex justify-center">
            <pvButton raised :label="'Submit'" class="w-1/2" :disabled="submitDisabled" @click="submit" :loading="loading"
              :style="{ 'background-color': config.btnColor, 'color': config.btnTextColor }" />
          </div>

        </div>
        <div v-else class="h-full flex flex-col">
          <div class="text-xl text-center">
            Thank you<span class="capitalize">{{ person.firstName ? ` ${person.firstName.toLowerCase()}` : `` }}</span>
            for registering.
          </div>

          <div v-if="selectedEvent" class="text-center mt-8 flex flex-col gap-4 flex-1">
            <div class="text-xl">
              {{ moment(selectedEvent.eventDate).tz(selectedEvent.timezone).format('MMMM Do YYYY, h:mm:a') }}
            </div>
            <div>At</div>
            <div class="ml-4 text-xl whitespace-nowrap mr-4">
              <div>{{ selectedEvent.locationName }}</div>
              <div>{{ selectedEvent.address1 }}</div>
              <div v-if="selectedEvent.address2">{{ selectedEvent.address2 }}</div>
              <div>{{ selectedEvent.city }}, {{ selectedEvent.state }} {{ selectedEvent.zip }}</div>
            </div>
            <div>
              <Modal :header="eventLocations[0].locationName">
                <template #trigger="{ open }">
                  <!-- <div @click="open" class="w-32 h-32 bg-red-300">
                    <GMap :addresses="eventLocations"/>
                  </div> -->
                  <pvButton v-ripple class="p-ripple" icon="pi pi-map" v-tooltip.top="'View Map'" label="View Map"
                    @click="open" :style="{ 'background-color': config.btnColor, 'color': config.btnTextColor }">
                  </pvButton>
                  <!-- <pvButton @click="open" icon="pi pi-map" v-tooltip.top="'View Map'"/> -->
                </template>
                <template #content="{ maximized }">
                  <div class="w-full" :class="maximized ? 'h-full' : 'h-96'">
                    <GMap :addresses="eventLocations" />
                  </div>
                </template>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- <template>
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
    </div>
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
  </div>
</template> -->

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'

// // import image from '@/assets/tempimage.jpg'
// import { ref, onMounted, computed, watch } from 'vue'
import moment from 'moment-timezone'
import { useAuth } from '@/stores/auth'
import GMap from '@/components/common/GMap.vue'
import Modal from '@/components/common/Modal.vue'
import FieldError from '@/components/common/FieldError.vue'

const props = defineProps(['templateData'])

watch(() => props.templateData, () => {
  console.log(props.templateData)
}, { deep: true, immediate: true })

const auth = useAuth()

const selectedEvent = ref(null as any)
const answers = ref([] as any)

const loading = ref(false)
const success = ref(false)

const isValidEmail = (email: string) => {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber: string) => {
  // Phone number validation regex without country code
  const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phoneNumber);
};


const formErrors = computed(() => {
  const required = (field: string) => `${field} is required`
  const result = questions.value.map((question: any, idx: number) => {
    if (answers.value[idx].answer) {
      if (question.answerType === 'phone' && !isValidPhoneNumber(answers.value[idx].answer)) {
        return required('Valid phone number')
      }
      if (question.answerType === 'email' && !isValidEmail(answers.value[idx].answer)) {
        return required('Valid email')
      }
    }
  })
  return result
})


const component = {
  'select': 'pvDropdown',
  'checkbox': 'pvCheckbox',
  'text': 'pvInputText',
  'number': 'pvInputNumber'
} as any

const backgroundImage = computed(() => {
  if (props.templateData.config && props.templateData.config.backgroundImage) {
    return props.templateData.config.backgroundImage.url
  }
  return ''
})

const panelImage = computed(() => {
  if (props.templateData.config && props.templateData.config.panelImage) {
    return props.templateData.config.panelImage.url
  }
  return ''
})

const person = computed(() => {
  return props.templateData.person || {
    firstName: 'Friend'
  }
})

const events = computed(() => {
  return props.templateData.events || []
})

const eventLocations = computed(() => {
  const locations = new Set()
  events.value.forEach((event: any) => {
    const { locationName, address1, address2, city, state, zip } = event
    locations.add(JSON.stringify({
      locationName,
      address1,
      address2,
      city,
      state,
      zip
    }))
  })

  return Array.from(locations.keys()).map((locationJson: any) => JSON.parse(locationJson))
})

const questions = computed(() => {
  return props.templateData.config.questions || []
})

const config = computed(() => {
  return props.templateData.config
})

const submitDisabled = computed(() => {
  if (success.value) {
    return true
  }
  return questions.value.find((question: any, idx: number) => {
    const answer = answers.value[idx].answer
    if (question.answerType === 'phone') {
      return !isValidPhoneNumber(answer)
    }
    if (question.answerType === 'email') {
      return !isValidEmail(answer)
    }
    if (question.answerType === 'select') {
      return !answer
    }
  })


  // if (answers.value) {
  //   for (let i = 0; i < questions.value.length; i++) {
  //     const question = questions.value[i]
  //     if (question.answerType === 'checkbox' || !answers.value[i]) {
  //       continue
  //     }

  //     if (question.answerType === 'number') {
  //       if (Object.is(answers.value[i].answer, null)) {
  //         return true
  //       }
  //     } else if (!answers.value[i].answer) {
  //       return true
  //     }
  //   }
  // }
  // return false
})

const submit = async () => {
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
  } catch (err) {
    console.log(err)
  }
  loading.value = false
}


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
}, { immediate: true, deep: true })


// onMounted(() => {
//   let interval = null
//   const timeout = setTimeout(() => {

//     interval = setInterval(() => {
//       arrowDown.value = !arrowDown.value
//     }, 1000)
//   }, 3000);

//   document.addEventListener('scroll', () => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     if (interval) {
//       clearInterval(interval)
//     }
//     arrowDown.value = false
//   })
// })

</script>