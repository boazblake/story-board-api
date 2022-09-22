import { Router } from 'express'
import { getGalleryTask, saveImageTask, saveImagesTask, deleteImageTask, getAlbumByEncodedNameTask, deleteImagesTask, getImageByIdTask } from './model.js'
const router = Router()

router.get('/', (_, res) => {
  const onSuccess = (albums) => res.json(({ results: albums }))
  const onError = (error) => {
    console.log('error on getting gallery', error)
    return res.body = error
  }

  return getGalleryTask().fork(onError, onSuccess)
})

router.get('/:albumName', (req, res) => {
  const album = req.params.albumName
  const encodedName = encodeURI(`where={"album":"${album}"}`)
  const onSuccess = (album) => res.json(({ results: album }))
  const onError = (error) => {
    console.log('error on getting gallery', error)
    return res.body = error
  }

  return getAlbumByEncodedNameTask(encodedName).fork(onError, onSuccess)
})

router.post('/', (req, res) => {
  const { album, image } = req.body

  const onSuccess = (image) => res.json(({ results: image }))
  const onError = (error) => {
    console.log('error on saving images', error)
    return res.body = error
  }

  return saveImageTask(album, image).fork(onError, onSuccess)
})


router.post('/:album', (req, res) => {
  const images = req.body
  const album = req.params.album

  const onSuccess = (image) => res.json(({ results: image }))
  const onError = (error) => {
    console.log('error on saving images', error)
    return res.body = error
  }

  return saveImagesTask(album, images).fork(onError, onSuccess)
})

router.delete('/:imageId', (req, res) => {
  const imageId = req.params.imageId


  const onSuccess = (image) => res.json(({ results: image }))
  const onError = (error) => {
    console.log('error on deleteing image', error)
    return res.body = error
  }

  return deleteImageTask(imageId).fork(onError, onSuccess)
})

router.get('/album/:imageId', (req, res) => {
  const imageId = req.params.imageId

  const onSuccess = (image) => res.json(({ results: image }))
  const onError = (error) => {
    console.log('error on fetching image', error)
    return res.body = error
  }

  return getImageByIdTask(imageId).fork(onError, onSuccess)
})

router.delete('/album/:album', (req, res) => {
  const album = req.params.album
  const encodedName = encodeURI(`where={"album":"${album}"}`)

  const onSuccess = (image) => res.json(({ results: image }))
  const onError = (error) => {
    console.log('error on deleteing image', error)
    return res.body = error
  }

  console.log(album, encodedName)
  return deleteImagesTask(encodedName).fork(onError, onSuccess)
})




export default router
