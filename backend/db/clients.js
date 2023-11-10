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

const deleteClient = (clientId) => {
  return models.Client.findByIdAndDelete(clientId);
}

const updateClient = (clientId, data) => {
  return models.Client.findOneAndUpdate({ _id: clientId }, data)
}

const getClientCount = async (search) => {

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
      $match: query,
    }]).exec()
    return clients.length
}

const getList = async (search, page, perPage) => {
  const limit = parseInt(perPage, 10);
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
      $match: query,
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
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