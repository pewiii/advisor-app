const emptyClient = {
  firstName: '',
  lastName: '',
  company: '',
  phone: '',
  email: '',
  address: {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  }
}

const emptyUser = {
  firstName: '',
  lastName: '',
  email: '',
  isAdmin: false,
}

const emptyCampaign = {
  title: '',
  client: null,
  template: '',
  // extraQuestions: [],
  user: '',
  events: [] as any[],
  questions: [] as any[],
  files: null as any
}

const emptyEvent = {
  locationName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  eventDate: null,
  date: '',
  time: '',
  timezone: 'America/New_York'

}

const emptyQuestion = {
  text: '',
  answerType: 'text',
  options: [],
  label: '',
  placeholder: ''
}

const emptyTemplate = {
  title: '',
  config: {
    headerImage: null,
    headerPanelBgColor: '#fefefebd',
    headerPanelTextColor: '#000',
    headerPanelText: 'Dui ut ornare lectus sit amet est. Id aliquet risus feugiat in ante metus dictum. Bibendum neque egestas congue quisque egestas. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Est placerat in egestas erat imperdiet sed. Lacus viverra vitae congue eu. Sit amet risus nullam eget felis eget nunc. At augue eget arcu dictum varius duis at consectetur. Velit dignissim sodales ut eu. Senectus et netus et malesuada fames ac turpis egestas. Viverra nam libero justo laoreet sit.',
    headingSectionBgColor: '#fefefe',
    headingSectionTextColor: '#000',
    headingSectionHeading: 'Heading Heading Heading',
    headingSectionText: 'Dui ut ornare lectus sit amet est. Id aliquet risus feugiat in ante metus dictum. Bibendum neque egestas congue quisque egestas. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Est placerat in egestas erat imperdiet sed. Lacus viverra vitae congue eu. Sit amet risus nullam eget felis eget nunc. At augue eget arcu dictum varius duis at consectetur. Velit dignissim sodales ut eu. Senectus et netus et malesuada fames ac turpis egestas. Viverra nam libero justo laoreet sit.',
    infoImage: null,
    infoPanelBgColor: '#fefefebd',
    infoPanelTextColor: '#000',
    infoPanelHeading: 'Info',
    infoPanelText: 'Dui ut ornare lectus sit amet est. Id aliquet risus feugiat in ante metus dictum. Bibendum neque egestas congue quisque egestas.',
    submitBtnColor: '#2176aeff',
    submitBtnTextColor: '#fff',
    submitBtnText: 'Submit',
  },
}

const timezones = [
  {
    name: "Eastern Time (ET) - UTC-5", value: "America/New_York"
  },
  {
    name: "Central Time (CT) - UTC-6", value: "America/Chicago"
  },
  {
    name: "Mountain Time (MT) - UTC-7", value: "America/Denver"
  },
  {
    name: "Pacific Time (PT) - UTC-8", value: "America/Los_Angeles"
  },
  {
    name: "Alaska Time (AKT) - UTC-9", value: "America/Anchorage"
  },
  {
    name: "Hawaii Time (HST) - UTC-10", value: "Pacific/Honolulu"
  }
]

const questionTypes = [
  { name: 'Text', value: 'text'},
  { name: 'Number', value: 'number'},
  { name: 'Dropdown', value: 'select'},
  { name: 'Checkbox', value: 'checkbox'},
  // { name: 'Date Picker', value: 'date'},
  // { name: 'Time Picker', value: 'time'},
]

export default {
  emptyClient,
  emptyCampaign,
  emptyEvent,
  emptyQuestion,
  emptyTemplate,
  timezones,
  questionTypes,
  emptyUser,
}