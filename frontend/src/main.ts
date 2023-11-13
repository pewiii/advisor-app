import './assets/main.css'
import './assets/theme.css'
import 'primeicons/primeicons.css'
// import '@/assets/main.css'
// import 'primevue/resources/themes/lara-light-teal/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Notifications from '@kyvg/vue3-notification'

import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog'
import Galleria from 'primevue/galleria'
import FileUpload from 'primevue/fileupload'
import Paginator from 'primevue/paginator'
import ColorPicker from 'primevue/colorpicker'
import Slider from 'primevue/slider'
import InputNumber from 'primevue/inputnumber'
import TextArea from 'primevue/textarea'
import RadioButton from 'primevue/radiobutton'
import Checkbox from 'primevue/checkbox'
import InlineMessage from 'primevue/inlinemessage'
import Tooltip from 'primevue/tooltip'


// import Row from 'primevue/row'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Notifications)
// app.use(PrimeVue)

app.directive('ripple', Ripple)
app.directive('tooltip', Tooltip)
app.use(PrimeVue, { ripple: true })

app.component('pvDataTable', DataTable)
// app.component('pvRow', Row)
app.component('pvColumn', Column)
app.component('pvButton', Button)
app.component('pvInputText', InputText)
app.component('pvCalendar', Calendar)
app.component('pvDropdown', Dropdown)
app.component('pvDialog', Dialog)
app.component('pvGalleria', Galleria)
app.component('pvFileUpload', FileUpload)
app.component('pvPaginator', Paginator)
app.component('pvColorPicker', ColorPicker)
app.component('pvSlider', Slider)
app.component('pvInputNumber', InputNumber)
app.component('pvTextArea', TextArea)
app.component('pvRadioButton', RadioButton)
app.component('pvCheckbox', Checkbox)
app.component('pvInlineMessage', InlineMessage)


const modules: {[key: string]: any} = import.meta.glob("@/components/dynamic/**/*.vue", { eager: true })
for (const path in modules) {
  const splitFileName = path.split('/')
  const componentName = splitFileName[splitFileName.length - 1].split('.')[0]
  app.component(componentName, modules[path].default)
}

app.mount('#app')
