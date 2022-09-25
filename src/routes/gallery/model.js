import http from '../../http.js'
import Task from 'data.task'
import { prop, reverse, uniqWith, eqBy, traverse, pluck } from 'ramda'

const getGalleryTask = () => http.back4App.getTask({ url: `Classes/Gallery` }).map(prop('results'))

const saveImageToImgBBTask = (album) => (img) => http.imgBB.postTask(album, img)

const saveImageToDBTask = image => http.back4App.postTask({ url: `Classes/Gallery`, body: JSON.stringify(image) })

const saveImageTask = (album, img) => saveImageToImgBBTask(album)(img).chain(saveImageToDBTask)

const saveImagesTask = (album, imgs) =>
  traverse(Task.of, saveImageToImgBBTask(album), imgs)
    .chain(traverse(Task.of, saveImageToDBTask))
    .map(prop('results'))

const deleteImageTask = (imageId) => http.back4App.deleteTask({ url: `classes/Gallery/${imageId}` })
const deleteImagesTask = encodedName =>
  getAlbumByEncodedNameTask(encodedName)
    .map(pluck('objectId'))
    .chain(traverse(Task.of, deleteImageTask))

const getAlbumByEncodedNameTask = encodedName =>
  http.back4App.getTask({ url: `Classes/Gallery?${encodedName}` })
    .map(prop('results'))
    .map(reverse)
    .map(uniqWith(eqBy(prop("thumb"))))

const getImageByIdTask = imageId => http.back4App.getTask({ url: `Classes/Gallery/${imageId}` })


export { getGalleryTask, saveImagesTask, saveImageTask, deleteImageTask, getAlbumByEncodedNameTask, deleteImagesTask, getImageByIdTask }
