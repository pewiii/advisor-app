import models from '../../db/models.js'
import mongoose from 'mongoose'
import moment from 'moment-timezone'


const getList = async (req, res) => {
  try {
    const { search = '', page = 0, perPage = 10, sortField, sortOrder } = req.query;

    const order = parseInt(sortOrder, 10);
    const limit = parseInt(perPage, 10);
    const skip = page * limit;

    console.log(req.user)
    const currentDate = moment().utc().toDate()
    const id = new mongoose.Types.ObjectId(req.user.userId)
    const query = { client: id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    // const paginatedResults = await models.Campaign.find({client: req.user.userId})
    // console.log(paginatedResults)
    // const totalCount = paginatedResults.length
    // const [paginatedResults, totalCount] = await Promise.all([models.Campaign.findMany({client: id}), models.Campaign.findMany({client: id}).count()])
    const [paginatedResults, totalCount] = await Promise.all([
      models.Campaign.aggregate([
        {
          $lookup: {
            from: 'respondents',
            localField: '_id',
            foreignField: 'campaign',
            as: 'respondents',
          },
        },
        {
          $lookup: {
            from: 'records',
            localField: '_id',
            foreignField: 'campaign',
            as: 'records',
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
            reach: { $size: '$records' }, // Add the 'reach' field counting records
          },
        },
        {
          $project: {
            records: 0, // Exclude the 'records' field
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

    // for (let i = 0; i < paginatedResults.length; i++) {
    //   paginatedResults[i].client = paginatedResults[i].client[0];
    // }

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


export default {
  getList
}