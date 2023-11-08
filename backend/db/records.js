import models from './models.js'


const createMany = async (records) => {
  return models.Record.insertMany(records)
}

const deleteMany = async (campaignId) => {
  return models.Record.deleteMany({ campaign: campaignId });
}

const getByOfferCode = (offerCode) => {
  console.log(offerCode)
  return models.Record.findOne({ offerCode: offerCode })
}

export default {
  createMany,
  deleteMany,
  getByOfferCode,
}