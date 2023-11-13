import db from '../db/index.js'
import auth from '../auth/index.js'

const getList = async (req, res) => {
  try {
    const { search = '', page = 0, perPage = 10 } = req.query;
    
    const users = await db.users.getList(search, page, perPage);
    const count = await db.users.getUserCount(search)
    res.send({
      data: users,
      page: page,
      perPage: perPage,
      total: count,
    })

  } catch(err) {
    console.log(err.message)
    res.status(400).send({ message: err.message })
  }
}

// const create = async (req, res) => {
  
//   res.send(201)
// }

const update = async (req, res) => {
  res.send(201)
}

const destroy = async (req, res) => {
  res.send(201)
}

export default {
  getList,
  // create,
  update,
  destroy,
}