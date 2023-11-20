import models from '../../db/models.js'

const getList = async (req, res) => {

  try {
    const { search = '', page = 0, perPage = 10, sortField, sortOrder } = req.query


    const limit = parseInt(perPage, 10);
    const order = parseInt(sortOrder, 10)
    const skip = page * limit;
    const query = {};
    if (search) {
      query.$or = [
        { 'firstName': { $regex: search, $options: 'i' } },
        { 'lastName': { $regex: search, $options: 'i' } },
        { 'fullName': { $regex: search, $options: 'i' } },
        { 'company': { $regex: search, $options: 'i' } },
        { 'campaigns.title': { $regex: search, $options: 'i' } },
      ];
    }

    const clients = await models.Client.aggregate([
      {
        $lookup: {
          from: 'campaigns',
          localField: '_id',
          foreignField: 'client',
          as: 'campaigns',
        },
      },
      {
        $project: {
          email: 1,
          fullName: 1,
          company: 1,
          createdAt: 1,
          updatedAt: 1,
          // campaignCount: { $size: '$campaigns' },
        },
      },
      {
        $match: query,
      },
      {
        $sort: { [sortField]: order }
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]).exec();


    res.send(clients)

  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }

}

const get = async (req, res) => {
  try {
    const { clientId } = req.params

    const client = await models.Client.findById(clientId)

    if (client) {
      const clientObject = client.toObject({ virtuals: true })
      delete clientObject.password
      console.log(clientObject)
      res.send(clientObject)
    } else {
      res.status(404).send({ message: 'Client not found' })
    }

  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
}

const create = async (req, res) => {
  try {
    const data = req.body
    const client = await models.Client.create(data)
    res.status(201).send(client)
  } catch(err) {
    res.status(400).send({ message: err.message })
    console.log(err)
  }
}

const update = async (req, res) => {
  try {
    const { clientId } = req.params
    const data = req.body
    const client = await models.Client.findOneAndUpdate({ _id: clientId }, data)
    res.send(client)
  } catch(err) {
    console.log(err)
    res.status(400).send({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const { clientId } = req.params
    await models.Client.findByIdAndDelete(clientId)
    res.sendStatus(204)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
}

export default {
  getList,
  get,
  create,
  update,
  delete: remove
}