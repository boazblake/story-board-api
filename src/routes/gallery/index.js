import { Router } from 'express'
import { getGallery } from './model.js'
const router = Router()

router.get('/', (_, res) => {
  const onSuccess = (blogs) => res.json(({ results: blogs }))
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return getGallery().fork(onError, onSuccess)
})

export default router
