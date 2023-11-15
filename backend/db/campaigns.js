import db from './index.js'
import models from './models.js'

const create = (data) => {
  const campaign = models.Campaign(data)
  return campaign.save()
}

const update = async (objectId, data) => {
  return models.Campaign.findByIdAndUpdate(objectId, data, { new: true })
  .populate('client')
  .exec()
  // const campaign = await models.Campaign.findById(objectId)
  // if (campaign) {
  //   Object.keys(data).forEach()
  // }
}

// const getCampaignCount = () => {
//   return models.Campaign.find().count()
// }

const getCampaignCount = async (search) => {
  return models.Campaign.countDocuments()

  // const query = {};

  // if (search) {
  //   query.$or = [
  //     { title: { $regex: search, $options: 'i' } },
  //     // Add other fields you want to search for in campaigns
  //     { 'client.firstName': { $regex: search, $options: 'i' } },
  //     { 'client.lastName': { $regex: search, $options: 'i' } },
  //     { 'client.fullName': { $regex: search, $options: 'i' } },
  //     { 'client.company': { $regex: search, $options: 'i' } },
  //     { 'client.phone': { $regex: search, $options: 'i' } },
  //     { 'client.email': { $regex: search, $options: 'i' } },
  //   ];
  // }

  // const campaigns = await models.Campaign.aggregate([
  //   {
  //     $lookup: {
  //       from: 'clients',
  //       localField: 'client',
  //       foreignField: '_id',
  //       as: 'client',
  //     },
  //   },
  //   {
  //     $match: query, // Apply the search query
  //   },
  // ])
  // return campaigns.length
}

const getList = async (search, page, perPage, sortField = 'updatedAt', sortOrder = '-1') => {
  try {
    const currentDate = new Date();
    const order = parseInt(sortOrder, 10)
    const limit = parseInt(perPage, 10);
    const skip = page * limit;
    // console.log(sortOrder)
    // console.log(order)

    const query = {}; // Define an empty query object

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        // Add other fields you want to search for in campaigns
        { 'client.firstName': { $regex: search, $options: 'i' } },
        { 'client.lastName': { $regex: search, $options: 'i' } },
        { 'client.fullName': { $regex: search, $options: 'i' } },
        { 'client.company': { $regex: search, $options: 'i' } },
        { 'client.phone': { $regex: search, $options: 'i' } },
        { 'client.email': { $regex: search, $options: 'i' } },
      ];
    }

    const campaigns = await models.Campaign.aggregate([
      {
        $lookup: {
          from: 'clients',
          localField: 'client',
          foreignField: '_id',
          as: 'client',
        },
      },
      {
        $lookup: {
          from: 'templates',
          localField: 'template',
          foreignField: '_id',
          as: 'template',
        },
      },
      {
        $addFields: {
          status: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: '$events',
                        as: 'event',
                        cond: { $gt: ['$$event.eventDate', currentDate] },
                      },
                    },
                  },
                  0, // Check if there are events in the future
                ],
              },
              then: 'active', // Set to "active" if there are future events
              else: 'inactive', // Set to "complete" if there are no future events
            },
          },
        },
      },
      {
        $match: query, // Apply the search query
      },
      {
        $sort: { [sortField]: order }
      },
      {
        $skip: skip, // Skip the specified number of documents
      },
      {
        $limit: limit, // Limit the number of documents returned
      },
    ]).exec();

    // Create an array to store results with the count of respondents
    const campaignsWithRespondentCount = [];

    // Iterate through the campaigns and add the count of respondents
    for (const campaign of campaigns) {
      const respondentCount = await models.Respondent.countDocuments({ campaign: campaign._id });
      campaign.client = campaign.client[0]; // Unwrap the client from the array
      campaign.template = campaign.template[0]
      campaign.respondents = respondentCount;
      campaignsWithRespondentCount.push(campaign);
    }

    return campaignsWithRespondentCount;
  } catch (error) {
    throw error;
  }
};

// const getById = (id) => {
//   return models.Campaign.findById(id)
//   .populate('template')
//   .exec()
// }

const getById = (id) => {
  return models.Campaign.findById(id)
    .populate('template')
    .exec();
}

const deleteMany = (criteria) => {
  return models.Campaign.deleteMany(criteria);
}

const deleteOne = (criteria) => {
  return models.Campaign.deleteOne(criteria);
}


const updateMany = (criteria, data) => {
  return models.Campaign.updateMany(criteria, data)
}

const getMany = (criteria) => {
  return models.Campaign.find(criteria)
}

export default {
  create,
  update,
  getList,
  getById,
  getCampaignCount,
  deleteMany,
  deleteOne,
  updateMany,
  getMany
}
