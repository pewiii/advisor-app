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


const getList = async (search, page, perPage) => {
  const skip = (page - 1) * perPage;
  const limit = parseInt(perPage, 10);
  
  const query = {};
  
  if (search) {
    query.$or = [
      { 'firstName': { $regex: search, $options: 'i' } },
      { 'lastName': { $regex: search, $options: 'i' } },
      { 'company': { $regex: search, $options: 'i' } },
      // ... (other fields)
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
        // ... (other fields)
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




// const getList = async (search, page, perPage) => {

//   const skip = (page - 1) * perPage; // Calculate the number of documents to skip
//   const limit = parseInt(perPage, 10); // Ensure perPage is an integer

//   const query = {}; // Define an empty query object

//   if (search) {
//     // If a search term is provided, add it to the query to filter results
//     query.$or = [
//       { 'firstName': { $regex: search, $options: 'i' } },
//       { 'lastName': { $regex: search, $options: 'i' } },
//       { 'fullName': { $regex: search, $options: 'i' } },
//       { 'company': { $regex: search, $options: 'i' } },
//       { 'phone': { $regex: search, $options: 'i' } },
//       { 'email': { $regex: search, $options: 'i' } },
//       { 'address.address1': { $regex: search, $options: 'i' } }, // Include address field
//       { 'address.address2': { $regex: search, $options: 'i' } }, // Include address field
//       { 'address.city': { $regex: search, $options: 'i' } }, // Include address field
//       { 'address.state': { $regex: search, $options: 'i' } }, // Include address field
//       { 'address.zip': { $regex: search, $options: 'i' } }, // Include address field
//     ];
//   }

//   const clients = await models.Client.aggregate([
//     {
//       $lookup: {
//         from: 'campaigns',
//         localField: '_id',
//         foreignField: 'client',
//         as: 'campaigns',
//       },
//     },
//     {
//       $match: query,
//     },
//     {
//       $skip: skip,
//     },
//     {
//       $limit: limit,
//     },
//     {
//       $project: {
//         usablePassword: {
//           $cond: {
//             if: { $eq: ['$password', null] },
//             then: false,
//             else: true,
//           },
//         },
//         // Include other fields you want to keep
//         firstName: 1,
//         lastName: 1,
//         fullName: 1,
//         phone: 1,
//         email: 1,
//         company: 1,
//         address: 1, // Include the entire address field
//         campaignCount: { $size: '$campaigns' }, // Count of campaigns
//         emailSentAt: 1,
//         createdAt: 1,
//         updatedAt: 1,
//       },
//     },
//   ]).exec();

//   return clients;
// };




export default {
  getClientById,
  createClient,
  deleteClient,
  getList,
  getFullClient,
}