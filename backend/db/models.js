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
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
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
  }
}, { timestamps: true })

clientSchema.pre('save', function (next) {
  if (!this.fullName) {
    this.fullName = `${this.firstName} ${this.lastName}`
  }
  next()
})

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
  zipCode: String,
  offerCode: String,
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Campaign'
  },
  age: Number,
  netWorth: String,
  homeOwner: Boolean,
  political: String,
  race: String,
  vetInHouse: Boolean,
  wealthRating: String,
}, { timestamps: true })

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
    maxlength: 2,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  email: String,
  phone: {
    type: String,
    required: true
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Campaign'
  }
  // other info
}, { timestamps: true })

const landingTemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
}, { timestamps: true })

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Client'
  },
  landingTemplate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LandingTemplate'
  },
  questions: [
    {
      text: String,
      answerType: String,
      placeholder: String,
      options: [String]
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fileName: String,
  events: [
    {
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
    }
  ]
}, { timestamps: true })


const User = mongoose.model('User', userSchema);
const Client = mongoose.model('Client', clientSchema)
const Record = mongoose.model('Record', recordSchema)
const Respondent = mongoose.model('Respondent', respondentSchema)
const LandingTemplate = mongoose.model('LandingTemplate', landingTemplateSchema)
const Campaign = mongoose.model('Campaign', campaignSchema)

export default {
  User,
  Client,
  Record,
  Respondent,
  LandingTemplate,
  Campaign
}