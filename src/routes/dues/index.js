import { Router } from 'express'
import { saveDuesTask, getDuesTask } from './model.js'
const router = Router()

router.post('/', (req, res) => {
  const dues = req.body

  const onSuccess = (dues) => res.json(({ results: dues }))
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return saveDuesTask(dues).fork(onError, onSuccess)
})



router.get('/', (_, res) => {

  const onSuccess = (dues) => res.json(({ results: dues }))
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return getDuesTask().fork(onError, onSuccess)
})

export default router
