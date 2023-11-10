import db from '../db/index.js'

const handleOfferCode = async (req, res) => {
  try {
    const { offerCode } = req.body
    let record = null
    let campaign = null
    record = await db.records.getByOfferCode(offerCode)

    if (record) {
      campaign = await db.campaigns.getById(record.campaign.toString())
    }



    if (record && campaign) {


      res.send({
        config: campaign.template.config,
        person: {
          firstName: record.firstName,
          _id: record._id
        },
        questions: campaign.questions,
        events: campaign.events,
      })


      // res.send({
      //   // template: {
      //     //   stuff: null
      //     // },
      //   person: {
      //     firstName: record.firstName,
      //     _id: record._id,
      //   },
      //   campaign: {
      //     _id: campaign._id,
      //     questions: campaign.questions,
      //     events: campaign.events,
      //     template: campaign.template
      //   }
      // })
    } else {
      res.sendStatus(404)
    }
  } catch(err) {
    console.log(err.message)
    res.status(500).send({ message: 'Server error' })
  }
}

export default {
  handleOfferCode,
}