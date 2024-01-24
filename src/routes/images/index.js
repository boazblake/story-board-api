import { Router } from 'express'
import { getImagesTask, findImageByImageIdTask, deleteImageTask, createImagePostTask, updateImagePostTask, findImagesByTrackObjectIdTask } from './model.js'
import { getErrorCode } from '../../utils.js'
const router = Router()


router.get('/', (_, res) => {
  const onSuccess = (Images) => res.json(({ results: Images }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return getImagesTask().fork(onError, onSuccess)
})

router.post('/', (req, res) => {
  const Image = req.body
  const onSuccess = (Images) => res.json(({ results: Images }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return createImagePostTask(Image).fork(onError, onSuccess)
})


router.put('/:image_id', (req, res) => {
  const ImageId = req.params.image_id
  const Image = req.body
  const onSuccess = (Images) => res.json(({ results: Images }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return updateImagePostTask(ImageId, Image).fork(onError, onSuccess)
})

router.get('/:image_id', (req, res) => {
  const ImageId = req.params.image_id
  const onSuccess = (Image) => res.json(({ results: Image }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return findImageByImageIdTask(ImageId).fork(onError, onSuccess)
})

router.get('/byTrackObjectId/:track_object_id', (req, res) => {
  const trackObjectId = req.params.track_object_id

  const onSuccess = (Images) => res.json(({ results: Images }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return findImagesByTrackObjectIdTask(trackObjectId).fork(onError, onSuccess)
})


router.delete('/:image_id', (req, res) => {
  const ImageId = req.params.image_id

  const onSuccess = (Image) => res.json(({ results: Image }))
  const onError = (error) => {
    console.log('error on deleteing Image', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return deleteImageTask(ImageId).fork(onError, onSuccess)
})

export default router
