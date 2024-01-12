import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  fullName: String
}, { timestamps: true })

userSchema.pre('save', function (next) {
  if (!this.fullName) {
    this.fullName = `${this.firstName} ${this.lastName}`
  }
  next()
})

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  fullName: String,
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  // usablePassword: {
  //   type: Boolean,
  //   virtual: true,
  //   get: function () {
  //     return Boolean(this.password)
  //   }
  // },
  company: {
    type: String,
    required: true
  },
  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
  },
  resetToken: {
    type: String
  },
  resetTokenExpiration: {
    type: Date
  },
  emailSentAt: {
    type: Date
  }
}, { timestamps: true })

clientSchema.pre('save', function (next) {
  if (!this.fullName) {
    this.fullName = `${this.firstName} ${this.lastName}`
  }
  next()
})

clientSchema.virtual("usablePassword").get(function () {
  return Boolean(this.password)
});

const recordSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  company: String,
  address1: String,
  address2: String,
  city: String,
  state: {
    type: String,
    maxlength: 2,
  },
  zip: String,
  offerCode: {
    type: String,
    index: true,
    unique: true
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Campaign',
    index: true
  },
  age: Number,
  netWorth: String,
  homeOwner: Boolean,
  political: String,
  race: String,
  vetInHouse: Boolean,
  wealthRating: String,
  expirationDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true })

recordSchema.index({ expirationDate: 1 }, { expireAfterSeconds: 0 });


const respondentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true
  },
  address2: String,
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  extraInfo: {
    type: Object
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Event'
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Campaign',
    index: true
  }
  // other info
}, { timestamps: true })

respondentSchema.pre('save', function (next) {
  if (!this.fullName) {
    this.fullName = `${this.firstName} ${this.lastName}`
  }
  next()
})


const eventSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date
  },
  timezone: {
    type: String
  }
})

const questionSchema = new mongoose.Schema({
  text: String,
  answerType: String,
  placeholder: String,
  label: String,
  options: [String]  
})


const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Client',
    index: true
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  },
  questions: [questionSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fileName: String,
  fileRecords: Number,
  events: [eventSchema]
}, { timestamps: true })


const templateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  config: {
    type: Object,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true })

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema);
const Client = mongoose.model('Client', clientSchema)
const Record = mongoose.model('Record', recordSchema)
const Respondent = mongoose.model('Respondent', respondentSchema)
const Template = mongoose.model('Template', templateSchema)
const Campaign = mongoose.model('Campaign', campaignSchema)
const Image = mongoose.model('Image', imageSchema)

export default {
  User,
  Client,
  Record,
  Respondent,
  Template,
  Campaign,
  Image,
}