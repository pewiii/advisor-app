const emptyClient = {
  firstName: '',
  lastName: '',
  company: '',
  phone: '',
  email: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: ''
}

const emptyCampaign = {
  title: '',
  client: {
    firstName: '',
    lastName: '',
    fullName: '',
    _id: '',
  },
  landingTemplate: '',
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
  // eventDate: ''
  date: '',
  time: '',
  timezone: 'America/New_York'
}

const emptyQuestion = {
  text: '',
  answerType: 'text',
  options: [],
  placeholder: ''
}

export default {
  emptyClient,
  emptyCampaign,
  emptyEvent,
  emptyQuestion
}