import db from '../db/index.js'

// app.post('/templates/add', auth.verifyToken, api.templates.create)
// app.post('/templates/update', auth.verifyToken, api.templates.update)
// app.post('/templates/delete', auth.verifyToken, api.templates.destroy)
// app.get('/templates', auth.verifyToken, api.templates.getList)
// app.get('/templates/:templateId', api.templates.get)

const getList = async (req, res) => {
  try {
    const { search = '', page = 1, perPage = 10 } = req.query;
    const templates = await db.templates.getList(search, page, perPage);
    const count = await db.templates.getTemplateCount()

    res.send({
      data: templates,
      page: page,
      perPage: perPage,
      total: count,
    })
    // res.send(templates)
  } catch(err) {
    console.log(err)
    console.log(err.message)
    res.status(400).send({ message: err.message })
  }
}

const create = async (req, res) => {
  try {
    const template = await db.templates.createTemplate({ ...req.body })
    res.status(201).send(template)
  } catch(err) {
    console.log(err.message)
    res.status(400).send({ message: err.message })
  }
}

const update = async (req, res) => {
  const data = req.body
  console.log(data)

  res.sendStatus(201)
}

export default {
  getList,
  create,
  update,
  
}