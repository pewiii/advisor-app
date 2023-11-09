import models from './models.js'

const createMedia = (data) => {
  const media = models.Media(data)
  return media.save()
}

const deleteMedia = (mediaId) => {
  return models.Media.findByIdAndDelete(mediaId)
}


export default {
  createMedia,
  deleteMedia
}