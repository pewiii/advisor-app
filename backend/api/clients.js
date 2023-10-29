import db from '../db/index.js'
import auth from '../auth/index.js'

const create = async (req, res) => {
  try {
    const password = `!${await auth.hashPassword('UNUSABLE_PASSWORD')}`

    const client = await db.clients.createClient({ ...req.body, password })
    res.sendStatus(201)
  } catch(err) {
    console.log(err.message)
    res.status(400).send({ message: err.message })
  }
}

const update = async (req, res) => {
  const data = req.body
  console.log(data)

  res.sendStatus(201)
}

const get = async (req, res) => {

}

const getList = async (req, res) => {

  try {
    const { search = '', page = 1, perPage = 10 } = req.query;
    
    const clients = await db.clients.getList(search, page, perPage);
    res.send(clients)

  } catch(err) {
    res.status(400).send({ message: err.message })
  }
}

const destroy = async (req, res) => {

}


export default {
  create,
  update,
  get,
  getList,
  destroy
}