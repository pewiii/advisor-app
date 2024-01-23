import models from '../../db/models.js'

const getList = async (req, res) => {
  try {
    const { search = '', page = 0, perPage = 10, sortField, sortOrder } = req.query;

    const order = parseInt(sortOrder, 10);
    const limit = parseInt(perPage, 10);
    const skip = page * limit;
    
    const userId = req.user._id; // Assuming user object has _id property
    
    const query = {
      client: userId, // Include the client's _id in the query
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
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

export default {
  getList
}