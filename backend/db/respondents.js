import models from './models.js'

const createRespondent = (data) => {
  const respondent = models.Respondent(data)
  return respondent.save()
}

const deleteMany = (criteria) => {
  return models.Respondent.deleteMany(criteria);
}

export default {
  createRespondent,
  deleteMany,
}