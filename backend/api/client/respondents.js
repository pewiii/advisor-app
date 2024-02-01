import models from "../../db/models.js";
import mongoose from "mongoose";

const getList = async (req, res) => {
  try {
    const {
      search = "",
      page = 0,
      perPage = 10,
      sortField,
      sortOrder,
    } = req.query;
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const campaignId = new mongoose.Types.ObjectId(req.params.campaignId);
    const limit = parseInt(perPage, 10);
    const order = parseInt(sortOrder, 10);
    const skip = page * limit;
    const query = { campaign: campaignId };

    const campaign = await models.Campaign.findById(campaignId);

    if (campaign.client.toString() !== userId.toString()) {
      return res.sendStatus(401);
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { "campaigns.title": { $regex: search, $options: "i" } },
      ];
    }

    const [paginatedResults, totalCount] = await Promise.all([
      models.Respondent.aggregate([
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
      models.Respondent.countDocuments(query).exec(),
    ]);

    res.json({
      paginatedResults,
      totalCount,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export default {
  getList,
};
