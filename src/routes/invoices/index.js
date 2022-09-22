import { Router } from 'express'
import { getAllInvoicesTask, findInvoicesByUserIdTask } from './model.js'
const router = Router()


router.get('/', (req, res) => {
  const onSuccess = (invoices) => res.json(({ results: invoices }))
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return getAllInvoicesTask().fork(onError, onSuccess)
})


router.get('/:userId', (req, res) => {
  const userId = req.param('userId')
  let encodeId = encodeURI(`where={"userId":"${userId}"}`)

  const onSuccess = (invoices) => res.json(({ results: invoices }))
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return findInvoicesByUserIdTask(encodeId).fork(onError, onSuccess)
})

export default router
