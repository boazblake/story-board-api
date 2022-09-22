import { Router } from 'express'
import { getEventsTask } from './model.js'
const router = Router()

router.get('/', (_, res) => {
  const onSuccess = (events) => res.json(({ results: events }))
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return getEventsTask().fork(onError, onSuccess)
})

export default router
