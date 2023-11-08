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

const getList = async (search, page, perPage) => {
  try {
    const currentDate = new Date();
    const skip = (page - 1) * perPage;
    const limit = parseInt(perPage, 10);

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
        $sort: { updatedAt: -1 }
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
      campaign.respondents = respondentCount;
      campaignsWithRespondentCount.push(campaign);
    }

    return campaignsWithRespondentCount;
  } catch (error) {
    throw error;
  }
};

const getById = (id) => {
  return models.Campaign.findById(id)
}

export default {
  create,
  update,
  getList,
  getById,
}
