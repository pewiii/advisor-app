import db from '../db/index.js'
import moment from 'moment-timezone'


const convertDatetime = (date, time, timezone) => {
  // const dateTimeStr = date + 'T' + time + ':00'
  // const originalDate = new Date(dateTimeStr)
  // const offsetMinutes = moment.tz(timezone).utcOffset()
  // const offsetMilliseconds = offsetMinutes * 60 * 1000
  // const utcDate = new Date(originalDate.getTime() + offsetMilliseconds)
  // return utcDate
  const userDateTime = moment.tz(`${date} ${time}`, 'YYYY-MM-DD HH:mm', timezone);
  const utcDateTime = userDateTime.utc();
  return utcDateTime.toDate()
}


// const outputDatetime = (mongoDate, timezone) => {
//   const utcDate = new Date(mongoDate)
//   const offsetMinutes = moment.tz(timezone).utcOffset()
//   utcDate.setMinutes(utcDate.getMinutes() + offsetMinutes)
//   const date = utcDate.toISOString().split('T')[0]
//   const time = utcDate.toISOString().split('T')[1].slice(0, 5)
//   return { date, time }
// }

const convertEventDates = (events) => {
  if (!events) return
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    if (event.date && event.time && event.timezone) {
      const userDateTime = moment.tz(`${event.date} ${event.time}`, 'YYYY-MM-DD HH:mm', event.timezone)
      const utcDateTime = userDateTime.utc()
      event.eventDate = utcDateTime.toDate()
    }
  }
}


const create = async (req, res) => {
  try {
    const data = req.body
    convertEventDates(data.events)
    const campaign = await db.campaigns.create(req.body)
    res.status(201).send(campaign)
  } catch(err) {
    console.log(err)
    res.status(400).send({ message: err.message })
    return
  }
}


const update = async (req, res) => {
  try {
    let data = req.body
    convertEventDates(data.events)
    const campaign = await db.campaigns.update(data._id, data)
    res.status(201).send(campaign)
  } catch(err) {
    console.log(err)
    res.status(400).send({ message: err.message })
  }
}

const get = async (req, res) => {

}

const getList = async (req, res) => {

  try {
    const { search = '', page = 1, perPage = 10 } = req.query;
    
    const campaigns = await db.campaigns.getList(search, page, perPage);
    // campaigns.forEach(campaign => {
    //   campaign.events.forEach(event => {
    //     if (event.eventDate && event.timezone) {
    //       const datetime = outputDatetime(event.eventDate, event.timezone)
    //       event.date = datetime.date
    //       event.time = datetime.time
    //     }
    //   })
    // })
    res.send(campaigns)

  } catch(err) {
    console.log(err)
    res.status(400).send({ message: err.message })
  }
}

const destroy = async (req, res) => {

}


export default {
  create,
  update,
  get,
  getList,
  destroy
}