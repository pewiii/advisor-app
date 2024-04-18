import db from '../db/index.js'
import models from '../db/models.js'

const handleOfferCode = async (req, res) => {
  try {
    const { offerCode } = req.body
    // let record = null
    let campaign = null
    // record = await db.records.getByOfferCode(offerCode)
    const record = await models.Record.findOne({ offerCode })
    if (record) {
      campaign = await models.Campaign.findById(record.campaign)
      .populate('template')
    }
    if (record && campaign) {
      res.send({
        config: campaign.template.config,
        person: {
          firstName: record.data['First Name'],
          _id: record._id
        },
        // questions: campaign.questions,
        events: campaign.events,
      })
    } else {
      res.sendStatus(404)
    }
  } catch(err) {
    console.log(err.message)
    res.status(500).send({ message: 'Server error' })
  }
}

const rsvp = async (req, res) => {
  const data = req.body
  console.log(data)

  try {
    const answerInfo = {}
    let infoCount = 1
    data.answers.forEach(answer => {
      let label = ''
      if (answer.label) {
        label = answer.label
      } else {
        label = `info-${infoCount}`
        infoCount++
      }
      answerInfo[label] = answer.answer
    })

    // const record = await db.records.getById(data.personId)
    // const record = await models.Record.getById(data.personId)
    const record = await models.Record.findById(data.personId)
    const repspondent = await models.Respondent.create({
      data: record.data,
      extraInfo: answerInfo,
      campaign: record.campaign,
      event: data.event,
    })
    await models.Record.deleteOne(record)
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
    res.status(500).send({ message: 'Server error'})
  }
}

export default {
  handleOfferCode,
  rsvp
}