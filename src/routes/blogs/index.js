import { Router } from 'express'
import { getBlogsTask, findBlogByBlogIdTask, deleteBlogTask } from './model.js'
const router = Router()


router.get('/', (_, res) => {
  const onSuccess = (blogs) => res.json(({ results: blogs }))

  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return getBlogsTask().fork(onError, onSuccess)
})


router.get('/:blogId', (req, res) => {
  const blogId = req.params.blogId
  const onSuccess = (blogs) => res.json(({ results: blogs }))

  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return findBlogByBlogIdTask(blogId).fork(onError, onSuccess)
})


router.delete('/blogId', (req, res) => {
  const blogId = req.params.blogId

  const onSuccess = (blog) => res.json(({ results: blog }))
  const onError = (error) => {
    console.log('error on deleteing blog', error)
    return res.body = error
  }

  return deleteBlogTask(blogId).fork(onError, onSuccess)
})

export default router
