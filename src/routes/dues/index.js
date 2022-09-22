import { Router } from 'express'
import { saveDuesTask } from './model.js'
const router = Router()

router.post('/', (req, res) => {
  const invoice = req.body
  // const userId = req.param('userId')
  // let encodeId = encodeURI(`where={"userId":"${userId}"}`)

  const onSuccess = (invoice) => res.json(({ results: invoice }))
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return saveDuesTask(invoice).fork(onError, onSuccess)
})

export default router
