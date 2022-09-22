import { Router } from 'express'
import { getLocationsByLimitTask, updateLocationByIdTask } from './model.js'
const router = Router()

router.get('/addresses', (req, res) => {
  const limit = req.params.limit
  // let encodeId = encodeURI(`where={"userId":"${userId}"}`)

  const onSuccess = (invoice) => res.json(({ results: invoice }))
  const onError = (error) => {
    console.log('errror on getting locations', error)
    return res.body = error
  }

  return getLocationsByLimitTask(limit).fork(onError, onSuccess)
})


router.put('/addresses/:id', (req, res) => {
  const id = req.params.id
  const address = req.body

  const onSuccess = (invoice) => res.json(({ results: invoice }))
  const onError = (error) => {
    console.log('errror on updating location', error)
    return res.body = error
  }

  return updateLocationByIdTask(id, address).fork(onError, onSuccess)
})

export default router
