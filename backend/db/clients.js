import models from './models.js'

const getClientById = (clientId) => {
  return models.Client.findById(clientId).select('-password')
}

const getFullClient = (query) => {
  return models.Client.findOne(query)
}

const createClient = (data) => {
  const client = models.Client(data)
  return client.save()
}

const deleteClient = async (clientId) => {

  const campaigns = await models.Campaign.find({ client: clientId })
  const campaignIds = []
  
  for (let i = 0; i < campaigns.length; i++) {
    campaignIds.push(campaigns[i]._id.toString())
  }

  console.log(campaignIds)
  
  await models.Record.deleteMany({ campaign: { $in: campaignIds } })
  await models.Campaign.deleteMany({ _id: { $in: campaignIds } } )

  return models.Client.findByIdAndDelete(clientId)
  
  // for (let i = 0; i < campaigns.length; i++) {
  //   const campaign = campaigns[i]
  //   await models.Record.deleteMany({ campaign: campaign._id.toString() })
  //   await campaign.remove()
  // }
}
// const deleteClient = async (clientId) => {
//   // Aggregate campaigns and records IDs
//   const result = await models.Campaign.aggregate([
//     {
//       $match: { client: clientId }
//     },
//     {
//       $group: {
//         _id: null,
//         campaignIds: { $push: '$_id' },
//         recordIds: { $push: '$records' } // Assuming 'records' is the field containing record IDs in Campaign
//       }
//     }
//   ]).exec();

//   const campaignIds = result[0]?.campaignIds || [];
//   const recordIds = result[0]?.recordIds.flat() || [];
  
//   // Delete records and campaigns
//   await models.Record.deleteMany({ _id: { $in: recordIds } });
//   await models.Campaign.deleteMany({ _id: { $in: campaignIds } });
  
//   // Find and delete the client
//   const deletedClient = await models.Client.findByIdAndDelete(clientId);

//   if (!deletedClient) {
//     throw new Error('Client not found');
//   }
// };


const updateClient = (clientId, data) => {
  return models.Client.findOneAndUpdate({ _id: clientId }, data)
}

const getClientCount = async (search) => {
  return models.Client.countDocuments()

  // const query = {};

  // if (search) {
  //   query.$or = [
  //     { 'firstName': { $regex: search, $options: 'i' } },
  //     { 'lastName': { $regex: search, $options: 'i' } },
  //     { 'fullName': { $regex: search, $options: 'i' } },
  //     { 'company': { $regex: search, $options: 'i' } },
  //     { 'campaigns.title': { $regex: search, $options: 'i' } },
  //   ];
  // }
  // const clients = await models.Client.aggregate([
  //   {
  //     $lookup: {
  //       from: 'campaigns',
  //       localField: '_id',
  //       foreignField: 'client',
  //       as: 'campaigns',
  //     },
  //   },
  //   {
  //     $match: query,
  //   }]).exec()
  //   return clients.length
}

const getList = async (search, page, perPage, sortField = 'updatedAt', sortOrder = '-1') => {
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
        usablePassword: {
          $cond: {
            if: { $eq: ['$password', null] },
            then: false,
            else: true,
          },
        },
        firstName: 1,
        lastName: 1,
        phone: 1,
        email: 1,
        address: 1,
        fullName: 1,
        company: 1,
        emailSentAt: 1,
        createdAt: 1,
        updatedAt: 1,
        campaignCount: { $size: '$campaigns' },
        status: {
          $cond: {
            if: {
              $gt: [
                {
                  $size: {
                    $filter: {
                      input: '$campaigns',
                      as: 'campaign',
                      cond: {
                        $gt: [
                          {
                            $size: {
                              $filter: {
                                input: '$$campaign.events',
                                as: 'event',
                                cond: { $gt: [new Date(),'$event.eventDate'] },
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                  },
                },
                0,
              ],
            },
            then: 'active',
            else: 'inactive',
          },
        },
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

  return clients;
};


export default {
  getClientById,
  createClient,
  deleteClient,
  getList,
  getFullClient,
  updateClient,
  getClientCount
}