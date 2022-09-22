import http from '../../http.js'
import { prop, } from 'ramda'

const getGalleryTask = () => http.back4App.getTask({ url: `Classes/Gallery` }).map(prop('results'))

const saveImageTask = (image) => http.back4App.postTask({ url: `Classes/Gallery`, body: JSON.stringify(image) }).map(prop('results'))

const deleteImageTask = imageId => http.back4App.deleteTask({ url: `Classes/Gallery/${imageId}` })

const getAlbumByEncodedNameTask = encodedName => http.back4App.getTask({ url: `Classes/Gallery?${encodedName}` }).map(prop('results'))

export { getGalleryTask, saveImageTask, deleteImageTask, getAlbumByEncodedNameTask }
