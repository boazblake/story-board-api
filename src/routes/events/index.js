import { Router } from 'express'
import { getEvents } from './model.js'
const router = Router()

router.get('/', (_, res) => {
  const onSuccess = (events) => res.json(({ results: events }))
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return getEvents().fork(onError, onSuccess)
})

export default router
