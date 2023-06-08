import { Router } from 'express'
import { findAccountByEncodedUserIdTask, updateAccountByAccountId } from './model.js'
import { getErrorCode } from '../../utils.js'
const router = Router()

router.get('/:userId', (req, res) => {
  const userId = req.params.userId
  const encodedId = encodeURI(`where={"userId":"${userId}"}`)

  const onSuccess = (account) => res.json(({ results: account }))
  const onError = (error) => {
    console.log('errror on get account', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return findAccountByEncodedUserIdTask(encodedId).fork(onError, onSuccess)
})

router.put('/:accountId', (req, res) => {
  const accountId = req.params.accountId
  const account = req.body

  const onSuccess = (account) => { console.log('sx', account); res.json(({ results: account })) }
  const onError = (error) => {
    console.log('error on update account', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return updateAccountByAccountId(accountId, account).fork(onError, onSuccess)
})

export default router
