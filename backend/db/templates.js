import models from './models.js'

const createTemplate = (data) => {
  const template = models.Template(data)
  return template.save()
}

const deleteTemplate = (templateId) => {
  return models.Template.findByIdAndDelete(templateId);
}

const getTemplateById = (clientId) => {
  return models.Client.findById(clientId)
}

const getList = async (search, page, perPage) => {
  
  const limit = parseInt(perPage, 10);
  const skip = (page - 1) * limit;

  const query = {};
  if (search && search.title) {
    query.title = new RegExp(search.title, 'i');
  }

  return models.Template
    .find(query)
    .skip(skip)
    .limit(limit)
    .exec();
}



export default {
  getList,
  createTemplate,
  deleteTemplate,
  getTemplateById,
}