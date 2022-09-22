import { Router } from 'express'
import { getLocationsByLimitTask } from './model.js'
const router = Router()

router.get('/addresses', (req, res) => {
  const limit = req.param('limit')
  // let encodeId = encodeURI(`where={"userId":"${userId}"}`)

  const onSuccess = (invoice) => res.json(({ results: invoice }))
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return getLocationsByLimitTask(limit).fork(onError, onSuccess)
})

export default router
