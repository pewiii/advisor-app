import models from './models.js'

const createImage = (data) => {
  const image = models.Image(data)
  return image.save()
}

const deleteImage = (imageId) => {
  return models.Image.findByIdAndDelete(imageId)
}

const getList = () => {
  return models.Image.find()
}


export default {
  createImage,
  deleteImage,
  getList
}