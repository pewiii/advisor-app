import models from './models.js'

const createClient = (data) => {
  const client = models.Client(data)
  return client.save()
}


const getList = async (search, page, perPage) => {
  const currentDate = new Date();

  const skip = (page - 1) * perPage; // Calculate the number of documents to skip
  const limit = parseInt(perPage, 10); // Ensure perPage is an integer

  const query = {}; // Define an empty query object

  if (search) {
    // If a search term is provided, add it to the query to filter results
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } }, // Case-insensitive search on firstName
      { lastName: { $regex: search, $options: 'i' } }, // Case-insensitive search on lastName
      { fullName: { $regex: search, $options: 'i' } }, // Case-insensitive search on lastName
      { company: { $regex: search, $options: 'i' } }, // Case-insensitive search on company
      { phone: { $regex: search, $options: 'i' } }, // Case-insensitive search on phone
      { email: { $regex: search, $options: 'i' } }, // Case-insensitive search on email
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
      $match: query, // Apply the search query
    },
    {
      $skip: skip, // Skip the specified number of documents
    },
    {
      $limit: limit, // Limit the number of documents returned
    },
    {
      $project: {
        // Exclude the 'password' field from the result
        password: 0,
      },
    },
  ]).exec();

  return clients;
};




// const getList = () => {

//   const currentDate = new Date();

//   return models.Client.aggregate([
//     {
//       $lookup: {
//         from: 'campaigns', // Collection name for campaigns
//         localField: '_id', // Field from 'Client' schema
//         foreignField: 'client', // Field in 'Campaign' schema referencing clients
//         as: 'campaigns', // Name of the field in the result
//       },
//     },
//     {
//       $addFields: {
//         activeCampaigns: {
//           $size: {
//             $filter: {
//               input: '$campaigns',
//               as: 'campaign',
//               cond: {
//                 $anyElementTrue: {
//                   $map: {
//                     input: '$$campaign.events',
//                     as: 'event',
//                     in: { $gte: ['$$event.date', currentDate] },
//                   },
//                 },
//               },
//             },
//           },
//         },
//         totalCampaigns: { $size: '$campaigns' },
//       },
//     },
//   ])
//   .exec()
// }

export default {
  createClient,
  getList
}