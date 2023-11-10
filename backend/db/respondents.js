import models from './models.js'

const createRespondent = (data) => {
  const respondent = models.Respondent(data)
  return respondent.save()
}

export default {
  createRespondent,
}