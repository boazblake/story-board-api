import { Router } from 'express'
import { getBlogs } from './model.js'
const router = Router()


router.get('/', (_, res) => {
  const onSuccess = (blogs) => res.json(({ results: blogs }))

  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return getBlogs().fork(onError, onSuccess)
})

export default router
