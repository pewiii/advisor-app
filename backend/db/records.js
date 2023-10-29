import models from './models.js'


const createMany = async (records) => {
  return models.Record.insertMany(records)
}

const deleteMany = async (campaignId) => {
  return models.Record.deleteMany({ campaign: campaignId });
}

export default {
  createMany,
  deleteMany
}