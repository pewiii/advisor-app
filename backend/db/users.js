import models from './models.js'

const createUser = (data) => {
  const user = models.User(data)
  return user.save()
}

const getUser = (query) => {
  return models.User.findOne(query)
}

export default {
  createUser,
  getUser,
}