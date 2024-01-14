import http from '../../http.js'
import { compose, prop, reverse, sortBy, propEq, map, over, lensProp } from 'ramda'
import { formatDate } from '../../utils.js'

const formatLensDate = (prpty) => over(lensProp(prpty), formatDate)

const toViewModel = result => result.error? result : compose(formatLensDate("updatedAt"), formatLensDate("createdAt"))(result)


const getImagesTask = () => http.back4App.getTask({ url: `Classes/Images` }).map(prop('results'))
  .map(map(toViewModel))

const findImageByImageIdTask = (ImageId) => http.back4App.getTask({ url: `Classes/Images/${ImageId}` })
  .map(toViewModel)

const deleteImageTask = (ImageId) => http.back4App.deleteTask({ url: `Classes/Images/${ImageId}` })

const createImagePostTask = Image => http.back4App.postTask({ url: `Classes/Images`, body: JSON.stringify(Image) })

const updateImagePostTask = (ImageId, Image) =>
  http.back4App.putTask({ url: `Classes/Images/${ImageId}`, body: JSON.stringify(Image) })

export { findImageByImageIdTask, getImagesTask, deleteImageTask, createImagePostTask, updateImagePostTask }
