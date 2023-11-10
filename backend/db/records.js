import models from './models.js'


const createMany = async (records) => {
  return models.Record.insertMany(records)
}

const deleteMany = async (campaignId) => {
  return models.Record.deleteMany({ campaign: campaignId });
}

const deleteRecord = (recordId) => {
  return models.Record.findByIdAndDelete({ _id: recordId })
}

const getByOfferCode = (offerCode) => {
  console.log(offerCode)
  return models.Record.findOne({ offerCode: offerCode })
}

const getById = (personId) => {
  return models.Record.findById(personId)
}

export default {
  createMany,
  deleteMany,
  getByOfferCode,
  getById,
  deleteRecord,
}