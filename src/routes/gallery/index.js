import { Router } from 'express'
import { getGalleryTask, saveImageTask, deleteImageTask, getAlbumByEncodedNameTask } from './model.js'
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
  const image = req.body

  const onSuccess = (image) => res.json(({ results: image }))
  const onError = (error) => {
    console.log('error on saving image', error)
    return res.body = error
  }

  return saveImageTask(image).fork(onError, onSuccess)
})

router.delete('/imageId', (req, res) => {
  const imageId = req.params.imageId

  const onSuccess = (image) => res.json(({ results: image }))
  const onError = (error) => {
    console.log('error on deleteing image', error)
    return res.body = error
  }

  return deleteImageTask(imageId).fork(onError, onSuccess)
})




export default router
