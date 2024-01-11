import models from '../../db/models.js'
import auth from '../../auth/index.js'


// const getList = async (req, res) => {

//   try {
//     const { search = '', page = 0, perPage = 10, sortField, sortOrder } = req.query

//     const limit = parseInt(perPage, 10);
//     const order = parseInt(sortOrder, 10)
//     const skip = page * limit;
//     const query = {};
//     if (search) {
//       query.$or = [
//         { 'firstName': { $regex: search, $options: 'i' } },
//         { 'lastName': { $regex: search, $options: 'i' } },
//         { 'fullName': { $regex: search, $options: 'i' } },
//         { 'email': { $regex: search, $options: 'i' } }
//       ];
//     }

//     const users = await models.User.aggregate([
//       {
//         $match: query,
//       },
//       {
//         $sort: { [sortField]: order }
//       },
//       {
//         $skip: skip,
//       },
//       {
//         $limit: limit,
//       },
//     ]).exec();
//     console.log(users)
//     res.send(users)
//   } catch(err) {
//     console.log(err)
//     res.sendStatus(500)
//   }
// }

const getList = async (req, res) => {
  try {
    const { search = '', page = 0, perPage = 10, sortField, sortOrder } = req.query;

    const limit = parseInt(perPage, 10);
    const order = parseInt(sortOrder, 10);
    const skip = page * limit;
    const query = {};
    if (search) {
      query.$or = [
        { 'firstName': { $regex: search, $options: 'i' } },
        { 'lastName': { $regex: search, $options: 'i' } },
        { 'fullName': { $regex: search, $options: 'i' } },
        { 'email': { $regex: search, $options: 'i' } },
      ];
    }

    const [paginatedResults, totalCount] = await Promise.all([
      models.User.aggregate([
        {
          $match: query,
        },
        {
          $sort: { [sortField]: order },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ]).exec(),
      models.User.countDocuments(query).exec(),
    ]);

    res.json({
      paginatedResults,
      totalCount,
    });

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};


const get = async (req, res) => {
  try {
    const { userId } = req.params

    const user = await models.User.findById(userId)

    if (user) {
      const userObject = user.toObject({ virtuals: true })
      // delete userObject.password
      console.log(userObject)
      res.send(userObject)
    } else {
      res.status(404).send({ message: 'User not found' })
    }

  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
}

const create = async (req, res) => {
  try {
    const data = req.body
    data.password = await auth.hashPassword(data.password)
    const user = await models.User.create(data)
    res.status(201).send(user)
  } catch(err) {
    res.status(400).send({ message: err.message })
    console.log(err)
  }
}
// if (user.password !== data.password) {
  
// }

const update = async (req, res) => {
  try {
    const { userId } = req.params
    const data = req.body
    data.fullName = `${data.firstName} ${data.lastName}`
    const user = await models.User.findById({ _id: userId })

    if (user.password !== data.password) {
      data.password = await auth.hashPassword(data.password)
    }

    const updatedUser = await models.User.findOneAndUpdate({ _id: userId }, data)
    res.send(updatedUser)
  } catch(err) {
    console.log(err)
    res.status(400).send({ message: err.message })
  }
}


const remove = async (req, res) => {
  try {
    const { userId } = req.params
    await models.User.findByIdAndDelete(userId)
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
  delete: remove,
}