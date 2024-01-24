import http from '../../http.js'
import { compose, prop, reverse, sortBy, propEq, map, over, lensProp } from 'ramda'
import { formatDate, log } from '../../utils.js'

const formatLensDate = (prpty) => over(lensProp(prpty), formatDate)

const toViewModel = (result) => {
  console.log(result); return result.error ? result : compose(formatLensDate("updatedAt"), formatLensDate("createdAt"))(result)
}

const getImagesTask = () => http.back4App.getTask({ url: `Classes/Images` })
  .map(prop('results'))
  .map(map(toViewModel))

const findImageByImageIdTask = (ImageId) => http.back4App.getTask({ url: `Classes/Images/${ImageId}` })
  .map(toViewModel)

const findImagesByTrackObjectIdTask = (trackObjectId) => {
  console.log('url', `classes/Images?where={%22trackObjectId%22:{%22__type%22:%22Pointer%22,%22className%22:%22Tracks%22,%22objectId%22:%22${trackObjectId}%22}}`); return http.back4App.getTask({ url: `Classes/Images?where={%22trackObjectId%22:{%22__type%22:%22Pointer%22,%22className%22:%22Tracks%22,%22objectId%22:%22${trackObjectId}%22}}` }).map(log('images'))
    .map(prop('results'))
    .map(map(toViewModel))
}
const deleteImageTask = (ImageId) => http.back4App.deleteTask({ url: `Classes/Images/${ImageId}` })

const createImagePostTask = Image => http.back4App.postTask({ url: `Classes/Images`, body: JSON.stringify(Image) })

const updateImagePostTask = (ImageId, Image) =>
  http.back4App.putTask({ url: `Classes/Images/${ImageId}`, body: JSON.stringify(Image) })

export { findImageByImageIdTask, getImagesTask, deleteImageTask, createImagePostTask, updateImagePostTask, findImagesByTrackObjectIdTask }
