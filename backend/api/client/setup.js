import models from '../../db/models.js'
import auth from '../../auth/index.js'

const validResetToken = async (client, resetToken) => {
  const currentTime = new Date()
  if (client.resetToken === resetToken && client.resetTokenExpiration && currentTime <= client.resetTokenExpiration) {
    return true
  }
  client.resetToken = null
  client.resetTokenExpiration = null
  await client.save()
  return false
}

const getSetupClient = async (req, res) => {
  const { clientId, resetToken } = req.params
  const client = await models.Client.findById(clientId)
  if (client && !client.password && await validResetToken(client, resetToken)) {
    res.status(200).send(client)
  } else {
    res.status(404).send({ message: 'Invalid Token' })
  }
}

const setupClient = async (req, res) => {
  try {
    const { clientId, resetToken } = req.params
    const { password, passwordMatch } = req.body
    const validPassword = password && (password === passwordMatch)
    const client = await models.Client.findById(clientId)

    if (validPassword && client && !client.password && await validResetToken(client, resetToken)) {
      client.password = await auth.hashPassword(password)
      client.resetToken = null
      client.resetTokenExpiration = null
      await client.save()
      res.status(201).send({ message: 'Setup success' })
    } else {
      res.status(400).send({ message: 'Invalid password' })
    }
  } catch(err) {
    console.log(err.message)
    res.status(500).send({ message: 'Server error'})
  }
}

export default {
  getSetupClient,
  setupClient
}