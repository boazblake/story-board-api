import { Router } from 'express'
import { getTracksTask, findTrackByTrackIdTask, deleteTrackTask, createTrackPostTask, updateTrackPostTask } from './model.js'
import { getErrorCode } from '../../utils.js'
const router = Router()


router.get('/', (_, res) => {
  const onSuccess = (Tracks) => res.json(({ results: Tracks }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return getTracksTask().fork(onError, onSuccess)
})

router.post('/', (req, res) => {
  const Track = req.body
  console.log(Track)
  const onSuccess = (Tracks) => res.json(({ results: Tracks }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return createTrackPostTask(Track).fork(onError, onSuccess)
})


router.put('/:track_id', (req, res) => {
  const TrackId = req.params.track_id
  const Track = req.body
  const onSuccess = (Tracks) => res.json(({ results: Tracks }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return updateTrackPostTask(TrackId, Track).fork(onError, onSuccess)
})

router.get('/:track_id', (req, res) => {
  const TrackId = req.params.track_id
  const onSuccess = (Track) => res.json(({ results: Track }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return findTrackByTrackIdTask(TrackId).fork(onError, onSuccess)
})


router.delete('/:track_id', (req, res) => {
  const TrackId = req.params.track_id

  const onSuccess = (Track) => res.json(({ results: Track }))
  const onError = (error) => {
    console.log('error on deleteing Track', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return deleteTrackTask(TrackId).fork(onError, onSuccess)
})

export default router
