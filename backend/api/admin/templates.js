import models from '../../db/models.js'


const getList = async (req, res) => {
  try {
    const { search = '', page = 1, perPage = 10, sortField, sortOrder } = req.query;

    const order = parseInt(sortOrder, 10);
    const limit = parseInt(perPage, 10);
    const skip = page * limit;
    const query = {};

    if (search) {
      query.title = new RegExp(search, 'i');
    }

    const [paginatedResults, totalCount] = await Promise.all([
      models.Template.aggregate([
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
      models.Template.countDocuments(query).exec(),
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


const get = async (req, res) => {
  try {
    const { templateId } = req.params

    const template = await models.Template.findById(templateId)

    if (template) {
      res.send(template)
    } else {
      res.status(404).send({ message: 'Template not found' })
    }

  } catch(err) {
    res.sendStatus(500)
  }
}

const create = async (req, res) => {
  try {
    const data = req.body
    const template = await models.Template.create(data)
    res.status(201).send(template)
  } catch(err) {
    res.status(400).send({ message: err.message })
    console.log(err)
  }
}

const update = async (req, res) => {
  try {
    const { templateId } = req.params
    const data = req.body
    const template = await models.Template.findOneAndUpdate({ _id: templateId }, data)
    res.send(template)
  } catch(err) {
    console.log(err)
    res.status(400).send({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const { templateId } = req.params
    await models.Template.findByIdAndDelete(templateId)
    res.sendStatus(204)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
}

export default {
  getList,
  get,
  create,
  update,
  delete: remove
}