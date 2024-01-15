import models from '../../db/models.js'
import sgMail from '@sendgrid/mail'
import auth from '../../auth/index.js'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const FRONTEND_URL = process.env.FRONTEND_URL

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
//         { 'company': { $regex: search, $options: 'i' } },
//         { 'campaigns.title': { $regex: search, $options: 'i' } },
//       ];
//     }

//     const clients = await models.Client.aggregate([
//       {
//         $lookup: {
//           from: 'campaigns',
//           localField: '_id',
//           foreignField: 'client',
//           as: 'campaigns',
//         },
//       },
//       {
//         $project: {
//           email: 1,
//           fullName: 1,
//           company: 1,
//           createdAt: 1,
//           updatedAt: 1,
//           // campaignCount: { $size: '$campaigns' },
//         },
//       },
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


//     res.send(clients)

//   } catch(err) {
//     console.log(err)
//     res.sendStatus(500)
//   }

// }

// const getList = async (req, res) => {
//   try {
//     const { search = '', page = 0, perPage = 10, sortField, sortOrder } = req.query;

//     const limit = parseInt(perPage, 10);
//     const order = parseInt(sortOrder, 10);
//     const skip = page * limit;
//     const query = {};
//     if (search) {
//       query.$or = [
//         { 'firstName': { $regex: search, $options: 'i' } },
//         { 'lastName': { $regex: search, $options: 'i' } },
//         { 'fullName': { $regex: search, $options: 'i' } },
//         { 'company': { $regex: search, $options: 'i' } },
//         { 'campaigns.title': { $regex: search, $options: 'i' } },
//       ];
//     }

//     const [paginatedResults, totalCount] = await Promise.all([
//       models.Client.aggregate([
//         {
//           $lookup: {
//             from: 'campaigns',
//             localField: '_id',
//             foreignField: 'client',
//             as: 'campaigns',
//           },
//         },
//         {
//           $project: {
//             email: 1,
//             fullName: 1,
//             company: 1,
//             createdAt: 1,
//             updatedAt: 1,
//           },
//         },
//         {
//           $match: query,
//         },
//         {
//           $sort: { [sortField]: order },
//         },
//         {
//           $skip: skip,
//         },
//         {
//           $limit: limit,
//         },
//       ]).exec(),
//       models.Client.countDocuments(query).exec(),
//     ]);

//     res.json({
//       paginatedResults,
//       totalCount,
//     });

//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// };

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
        { 'company': { $regex: search, $options: 'i' } },
        { 'campaigns.title': { $regex: search, $options: 'i' } },
      ];
    }

    const [paginatedResults, totalCount] = await Promise.all([
      models.Client.aggregate([
        {
          $lookup: {
            from: 'campaigns',
            localField: '_id',
            foreignField: 'client',
            as: 'campaigns',
          },
        },
        {
          $addFields: {
            campaignCount: { $size: '$campaigns' }, // Add a new field representing the count of campaigns
          },
        },
        {
          $project: {
            email: 1,
            fullName: 1,
            company: 1,
            createdAt: 1,
            updatedAt: 1,
            campaignCount: 1, // Include the campaign count in the result
          },
        },
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
      models.Client.countDocuments(query).exec(),
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
    const { clientId } = req.params

    const client = await models.Client.findById(clientId)

    if (client) {
      const clientObject = client.toObject({ virtuals: true })
      delete clientObject.password
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
    data.fullName =  `${data.firstName} ${data.lastName}`
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
    await models.Campaign.deleteMany({ client: clientId })
    await models.Client.findByIdAndDelete(clientId)
    res.sendStatus(204)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
}

const passwordSetup = async (req, res) => {
  try {
    const { clientId } = req.params
    const client = await models.Client.findById(clientId)
    // const client = await db.clients.getClientById(clientId)
    if (!client) {
      res.status(404).send({ message: 'Client not found'})
    } else if (client.password) {
      res.status(400).send({ message: 'Client already setup' })
    } else {
      client.resetToken = auth.generateResetToken()
      client.resetTokenExpiration = new Date(Date.now() + 3600000 * 24);
      // await client.save()
      //send email
      await sgMail.send({
        to: client.email,
        from: 'support@packthemin.com',
        template_id: 'd-2be5ab3f1d4e446cbca734e855b8e81f',
        dynamic_template_data: {
          username: client.firstName,
          resetLink: `${FRONTEND_URL}/setup/${client._id}/${client.resetToken}`
        }
      })
      client.emailSentAt = new Date()
      await client.save()
      res.status(200).send(client)
    }
  } catch(err) {
    console.log(err.response.body.errors)
    res.status(500).send({ message: err.message })
  }
}

export default {
  getList,
  get,
  create,
  update,
  delete: remove,
  passwordSetup,
}