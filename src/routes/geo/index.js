import { Router } from 'express'
import { getLocationsByLimitTask, updateLocationByIdTask, getLocationByQuery } from './model.js'
import { getErrorCode } from '../../utils.js'
const router = Router()

router.get('/addresses', (req, res) => {
  const limit = req.params.limit
  // let encodeId = encodeURI(`where={"userId":"${userId}"}`)

  const onSuccess = (addressess) => res.json(({ results: addressess }))
  const onError = (error) => {
    console.log('errror on getting locations', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return getLocationsByLimitTask(limit).fork(onError, onSuccess)
})


router.put('/addresses/:id', (req, res) => {
  const id = req.params.id
  const address = req.body

  const onSuccess = (address) => res.json(({ results: address }))
  const onError = (error) => {
    console.log('errror on updating location', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return updateLocationByIdTask(id, address).fork(onError, onSuccess)
})


router.post('/opencage', (req, res) => {
  const { query, bounds } = req.body
  const encodedBounds = encodeURIComponent(bounds)

  const onSuccess = (locations) => res.json(({ results: locations }))
  const onError = (error) => {
    console.log('errror on fetching opencafe', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return getLocationByQuery(query, encodedBounds).fork(onError, onSuccess)
})

export default router
