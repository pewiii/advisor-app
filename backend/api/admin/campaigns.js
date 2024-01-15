// import db from '../db/index.js'
import moment from 'moment-timezone'

import models from '../../db/models.js'


const getList = async (req, res) => {
  try {
    const { search = '', page = 0, perPage = 10, sortField, sortOrder } = req.query;

    const order = parseInt(sortOrder, 10);
    const limit = parseInt(perPage, 10);
    const skip = page * limit;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'client.firstName': { $regex: search, $options: 'i' } },
        { 'client.lastName': { $regex: search, $options: 'i' } },
        { 'client.fullName': { $regex: search, $options: 'i' } },
        { 'client.company': { $regex: search, $options: 'i' } },
        { 'client.phone': { $regex: search, $options: 'i' } },
        { 'client.email': { $regex: search, $options: 'i' } },
      ];
    }

    const [paginatedResults, totalCount] = await Promise.all([
      models.Campaign.aggregate([
        {
          $lookup: {
            from: 'clients',
            localField: 'client',
            foreignField: '_id',
            as: 'client',
          },
        },
        {
          $project: {
            title: 1,
            updatedAt: 1,
            createdAt: 1,
            'client.fullName': 1,
            'client.company': 1,
            'client._id': 1,
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
      models.Campaign.countDocuments(query).exec(),
    ]);

    for (let i = 0; i < paginatedResults.length; i++) {
      paginatedResults[i].client = paginatedResults[i].client[0];
    }

    res.json({
      paginatedResults,
      totalCount,
      page,
      perPage,
      sortField,
      sortOrder
    });

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

// const getList = async (req, res) => {
//   try {
//     const { search = '', page = 0, perPage = 10, sortField, sortOrder } = req.query;
  
//     const order = parseInt(sortOrder, 10)
//     const limit = parseInt(perPage, 10);
//     const skip = page * limit;
  
//     const query = {}
  
//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { 'client.firstName': { $regex: search, $options: 'i' } },
//         { 'client.lastName': { $regex: search, $options: 'i' } },
//         { 'client.fullName': { $regex: search, $options: 'i' } },
//         { 'client.company': { $regex: search, $options: 'i' } },
//         { 'client.phone': { $regex: search, $options: 'i' } },
//         { 'client.email': { $regex: search, $options: 'i' } },
//       ]
//     }
  
//     const campaigns = await models.Campaign.aggregate([
//       {
//         $lookup: {
//           from: 'clients',
//           localField: 'client',
//           foreignField: '_id',
//           as: 'client',
//         },
//       },
//       {
//         $project: {
//           title: 1,
//           updatedAt: 1,
//           createdAt: 1,
//           'client.fullName': 1,
//           'client.company': 1,
//           'client._id': 1
//         }
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

//     for (let i = 0; i < campaigns.length; i++) {
//       campaigns[i].client = campaigns[i].client[0]
//     }

//     res.send(campaigns)

//   } catch(err) {
//     console.log(err)
//     res.sendStatus(500)
//   }
// }

const eventsToUTC = (events) => {
  return events.map(event => {
    const eventResult = {
      ...event
    }
    if (event.date && event.time) {
      const inputDateTime = `${event.date} ${event.time}`;
      eventResult.eventDate = moment.tz(inputDateTime, event.timezone).utc().format();
    }
    return eventResult
  })
}

const eventsToDateTime = (events) => {
  return events.map(event => {
    const eventResult = {
      ...event
    }
    if (event.eventDate && event.timezone) {
      // Assuming storedDateTime is the UTC time retrieved from MongoDB
      // const userTimeZone = 'user-input-timezone'; // Replace with the user's timezone
      const convertedDateTime = moment.tz(event.eventDate, event.timezone).format();
      let [date, time] = convertedDateTime.split('T')
      time = time.split(':')
      time = [time[0],time[1]].join(':')
      eventResult.date = date
      eventResult.time = time
    }

    return eventResult
  })
}

const get = async (req, res) => {
  try {
    const { campaignId } = req.params

    const campaign = await models.Campaign.findById(campaignId)
      .populate('client template')

    if (campaign) {
      const campaignObject = campaign.toObject()
      campaignObject.events = eventsToDateTime(campaignObject.events)
      res.send(campaignObject)
    } else {
      res.status(404).send({ message: 'Campaign not found' })
    }

  } catch(err) {
    res.sendStatus(500)
  }
}

const create = async (req, res) => {
  try {
    const data = req.body
    data.events = eventsToUTC(data.events)
    const campaign = await models.Campaign.create(data)
    // const campaignObject = campaign.toObject()
    // campaignObject.events = eventsToDateTime(campaignObject.events)
    // campaignObject.template = await models.Template.findById(data.template)
    // campaignObject.client = await models.Client.findById(data.client)
    res.status(201).send(campaign)
  } catch(err) {
    res.status(400).send({ message: err.message })
    console.log(err)
  }
}

const update = async (req, res) => {
  try {
    const { campaignId } = req.params
    const data = req.body
    data.events = eventsToUTC(data.events)
    const campaign = await models.Campaign.findOneAndUpdate({ _id: campaignId }, data)
    res.send(campaign)
  } catch(err) {
    console.log(err)
    res.status(400).send({ message: err.message })
  }
}


// const convertDatetime = (date, time, timezone) => {
//   const userDateTime = moment.tz(`${date} ${time}`, 'YYYY-MM-DD HH:mm', timezone);
//   const utcDateTime = userDateTime.utc();
//   return utcDateTime.toDate()
// }


// const outputDatetime = (mongoDate, timezone) => {
//   const utcDate = new Date(mongoDate)
//   const offsetMinutes = moment.tz(timezone).utcOffset()
//   utcDate.setMinutes(utcDate.getMinutes() + offsetMinutes)
//   const date = utcDate.toISOString().split('T')[0]
//   const time = utcDate.toISOString().split('T')[1].slice(0, 5)
//   return { date, time }
// }

// const convertEventDates = (events) => {
//   if (!events) return
//   for (let i = 0; i < events.length; i++) {
//     const event = events[i]
//     if (event.date && event.time && event.timezone) {
//       const userDateTime = moment.tz(`${event.date} ${event.time}`, 'YYYY-MM-DD HH:mm', event.timezone)
//       const utcDateTime = userDateTime.utc()
//       event.eventDate = utcDateTime.toDate()
//     }
//   }
// }


// const create = async (req, res) => {
//   try {
//     const data = req.body
//     convertEventDates(data.events)
//     const campaign = await db.campaigns.create(req.body)
//     res.status(201).send(campaign)
//   } catch(err) {
//     console.log(err)
//     res.status(400).send({ message: err.message })
//     return
//   }
// }


// const update = async (req, res) => {
//   try {
//     let data = req.body
//     convertEventDates(data.events)
//     const campaign = await db.campaigns.update(data._id, data)
//     res.status(201).send(campaign)
//   } catch(err) {
//     console.log(err)
//     res.status(400).send({ message: err.message })
//   }
// }

// const get = async (req, res) => {
// }

// const getList = async (req, res) => {

//   try {
//     const { search = '', page = 0, perPage = 10, sortField, sortOrder } = req.query;
    
//     const campaigns = await db.campaigns.getList(search, page, perPage, sortField, sortOrder);
//     const count = await db.campaigns.getCampaignCount(search)
//     res.send({
//       data: campaigns,
//       page: page,
//       perPage: perPage,
//       total: count,
//     })
//   } catch(err) {
//     console.log(err)
//     res.status(400).send({ message: err.message })
//   }
// }

// const destroy = async (req, res) => {
//   try {
//     const { campaignId } = req.body
//     console.log(campaignId)
//     await db.campaigns.deleteOne({ _id: campaignId })
//     await db.records.deleteMany(campaignId)
//     await db.respondents.deleteMany({ campaign: campaignId })
//     res.sendStatus(201)
//   } catch(err) {
//     res.status(400).send({ message: err.message })
//   }
// }

// const getClientCampaigns = async (req, res) => {
//   try {

//     const clientId = req.user.userId

//     const { search = '', page = 0, perPage = 10, sortField, sortOrder } = req.query;
    
//     const campaigns = await db.campaigns.getClientCampaigns(clientId, search, page, perPage, sortField, sortOrder);
//     const count = await db.campaigns.getClientCampaignCount(clientId)
//     res.send({
//       data: campaigns,
//       page: page,
//       perPage: perPage,
//       total: count,
//     })

//   } catch(err) {
//     console.log(err)
//     res.status(500).send({ message: 'Server error' })
//   }
// }

const remove = async (req, res) => {
  try {
    const { campaignId } = req.params
    await models.Record.deleteMany({ campaign: campaignId })
    await models.Campaign.findByIdAndDelete(campaignId)
    res.sendStatus(204)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
}

const checkTitle = async (req, res) => {
  try {
    const { campaignTitle } = req.params
    const campaign = await models.Campaign.findOne({ title: campaignTitle })
    if (campaign) {
      res.send({ campaign: campaign._id })
    } else {
      res.send({ campaign: null })
    }
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
}

export default {
  get,
  getList,
  create,
  update,
  delete: remove,
  checkTitle
}