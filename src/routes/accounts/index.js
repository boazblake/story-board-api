import { Router } from 'express'
import { findAccountByUserIdTask } from './model.js'
const router = Router()

// router.post('/', (req, res) => {
//   const user = req.body

//   const onSuccess = (account) => res.json(({ results: account }))
//   const onError = (error) => {
//     console.log('errror on login', error)
//     return res.body = error
//   }

//   return createNewUserAccountTask(user).fork(onError, onSuccess)
// })


router.get('/:userId', (req, res) => {
  const userId = req.param('userId')
  let encodeId = encodeURI(`where={"userId":"${userId}"}`)

  const onSuccess = (account) => res.json(({ results: account }))
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return findAccountByUserIdTask(encodeId).fork(onError, onSuccess)
})

export default router
