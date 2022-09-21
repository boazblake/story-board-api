import { Router } from 'express'
import { getAccountByUserId } from './model.js'
const router = Router()

router.get('/:userId', (req, res) => {
  const userId = req.param('userId')
  let encodeId = encodeURI(`where={"userId":"${userId}"}`)

  const onSuccess = (account) => res.json(({ results: account }))
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return getAccountByUserId(encodeId).fork(onError, onSuccess)
})

export default router
