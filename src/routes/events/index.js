import { Router } from 'express'
import { getEventsTask, updateEventByIdTask, deleteEventByIdTask, createEventTask } from './model.js'
const router = Router()

router.get('/', (_, res) => {
  const onSuccess = (events) => res.json(({ results: events }))
  const onError = (error) => {
    console.log('errror on getting all events', error)
    return res.body = error
  }

  return getEventsTask().fork(onError, onSuccess)
})


router.post('/', (req, res) => {
  const event = req.body
  const onSuccess = (events) => res.json(({ results: events }))
  const onError = (error) => {
    console.log('errror on updating event', error)
    return res.body = error
  }

  return createEventTask(event).fork(onError, onSuccess)
})

router.put('/:eventId', (req, res) => {
  const eventId = req.params.eventId
  const event = req.body
  const onSuccess = (events) => res.json(({ results: events }))
  const onError = (error) => {
    console.log('errror on updating event', error)
    return res.body = error
  }

  return updateEventByIdTask(eventId, event).fork(onError, onSuccess)
})


router.delete('/:eventId', (req, res) => {
  const eventId = req.params.eventId
  const onSuccess = (events) => res.json(({ results: events }))
  const onError = (error) => {
    console.log('errror on deleteing event', error)
    return res.body = error
  }

  return deleteEventByIdTask(eventId).fork(onError, onSuccess)
})



export default router
