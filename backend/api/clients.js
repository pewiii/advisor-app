import db from '../db/index.js'
import auth from '../auth/index.js'

const create = async (req, res) => {
  try {
    const password = null

    const client = await db.clients.createClient({ ...req.body, password })
    res.status(201).send(client)
  } catch(err) {
    console.log(err.message)
    res.status(400).send({ message: err.message })
  }
}

const update = async (req, res) => {
  try {
    const data = req.body
    const clientId = data._id
    const client = await db.clients.updateClient(clientId, data)
  
    res.status(201).send(client)
  } catch(err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
}

const get = async (req, res) => {

}

const getList = async (req, res) => {

  try {
    const { search = '', page = 0, perPage = 10 } = req.query;
    
    const clients = await db.clients.getList(search, page, perPage);
    const count = await db.clients.getClientCount(search)
    res.send({
      data: clients,
      page: page,
      perPage: perPage,
      total: count,
    })

  } catch(err) {
    console.log(err.message)
    res.status(400).send({ message: err.message })
  }
}

const destroy = async (req, res) => {
  try {
    const { clientId } = req.body
    await db.clients.deleteClient(clientId)
    // await db.campaigns.deleteMany({ client: clientId })
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
    res.status(400).send({ message: err.message })
  }
}

const resetTokenValid = async (client, resetToken) => {
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
  const client = await db.clients.getClientById(clientId)
  if (client && !client.password && await resetTokenValid(client, resetToken)) {
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
    const client = await db.clients.getClientById(clientId)
    console.log(client)
    if (validPassword && client && !client.password && await resetTokenValid(client, resetToken)) {
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
  create,
  update,
  get,
  getList,
  destroy,
  getSetupClient,
  setupClient
}