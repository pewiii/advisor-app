import models from './models.js'

const createTemplate = (data) => {
  const template = models.Template(data)
  return template.save()
}

const deleteTemplate = (templateId) => {
  return models.Template.findByIdAndDelete(templateId);
}

const updateTemplate = (templateId, data) => {
  return models.Template.findOneAndUpdate({ _id: templateId }, data)
}

const getTemplateById = (clientId) => {
  return models.Client.findById(clientId)
}

const getTemplateCount = () => {
  // return models.Template.find().count()
  return models.Template.countDocuments()
}

const getList = async (search, page, perPage) => {
  const limit = parseInt(perPage, 10);
  const skip = page * limit;

  const query = {};
  if (search) {
    query.title = new RegExp(search, 'i');
  }

  const templates = await models.Template.aggregate([
    {
      $match: query
    },
    {
      $lookup: {
        from: 'campaigns',
        localField: '_id',
        foreignField: 'template',
        as: 'campaigns'
      }
    },
    {
      $addFields: {
        status: {
          $cond: {
            if: { $gt: [{ $size: '$campaigns' }, 0] },
            then: 'active',
            else: 'inactive'
          }
        }
      }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    }
  ]);

  return templates;
};


// const getList = async (search, page, perPage) => {
  
//   const limit = parseInt(perPage, 10);
//   const skip = page * limit;

//   const query = {};
//   if (search && search.title) {
//     query.title = new RegExp(search.title, 'i');
//   }

//   return models.Template
//     .find(query)
//     .skip(skip)
//     .limit(limit)
//     .exec();
// }


export default {
  getList,
  createTemplate,
  deleteTemplate,
  getTemplateById,
  getTemplateCount,
  updateTemplate,
  // updateMany
}