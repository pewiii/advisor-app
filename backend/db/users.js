import models from './models.js'

const createUser = (data) => {
  const user = models.User(data)
  return user.save()
}

const updateUser = (userId, data) => {
  return models.User.findOneAndUpdate({ _id: userId }, data)
}

const getUser = (query) => {
  return models.User.findOne(query)
}

const getUserCount = async (search) => {

  const query = {};

  if (search) {
    query.$or = [
      { 'firstName': { $regex: search, $options: 'i' } },
      { 'lastName': { $regex: search, $options: 'i' } },
      { 'fullName': { $regex: search, $options: 'i' } },
      { 'email': { $regex: search, $options: 'i' } },
    ];
  }
  const clients = await models.User.aggregate([
    // {
    //   $lookup: {
    //     from: 'campaigns',
    //     localField: '_id',
    //     foreignField: 'user',
    //     as: 'campaigns',
    //   },
    // },
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
      { 'email': { $regex: search, $options: 'i' } },
    ];
  }
  
  const clients = await models.User.aggregate([
    // {
    //   $lookup: {
    //     from: 'campaigns',
    //     localField: '_id',
    //     foreignField: 'user',
    //     as: 'campaigns',
    //   },
    // },
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
        // phone: 1,
        email: 1,
        // address: 1,
        fullName: 1,
        // company: 1,
        emailSentAt: 1,
        createdAt: 1,
        updatedAt: 1,
        password: 1
        // campaignCount: { $size: '$campaigns' },
        // status: {
        //   $cond: {
        //     if: {
        //       $gt: [
        //         {
        //           $size: {
        //             $filter: {
        //               input: '$campaigns',
        //               as: 'campaign',
        //               cond: {
        //                 $gt: [
        //                   {
        //                     $size: {
        //                       $filter: {
        //                         input: '$$campaign.events',
        //                         as: 'event',
        //                         cond: { $gt: [new Date(),'$event.eventDate'] },
        //                       },
        //                     },
        //                   },
        //                   0,
        //                 ],
        //               },
        //             },
        //           },
        //         },
        //         0,
        //       ],
        //     },
        //     then: 'active',
        //     else: 'inactive',
        //   },
        // },
      },
    },
  ]).exec();

  return clients;
};

export default {
  createUser,
  getUser,
  getList,
  getUserCount,
  updateUser,
}