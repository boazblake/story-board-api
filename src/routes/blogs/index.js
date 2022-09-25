import { Router } from 'express'
import { getBlogsTask, findBlogByBlogIdTask, deleteBlogTask, createBlogPostTask, updateBlogPostTask } from './model.js'
import { getErrorCode } from '../../utils.js'
const router = Router()


router.get('/', (_, res) => {
  const onSuccess = (blogs) => res.json(({ results: blogs }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return getBlogsTask().fork(onError, onSuccess)
})

router.post('/', (req, res) => {
  const blog = req.body
  const onSuccess = (blogs) => res.json(({ results: blogs }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return createBlogPostTask(blog).fork(onError, onSuccess)
})


router.put('/:blogId', (req, res) => {
  const blogId = req.params.blogId
  const blog = req.body
  const onSuccess = (blogs) => res.json(({ results: blogs }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return updateBlogPostTask(blogId, blog).fork(onError, onSuccess)
})

router.get('/:blogId', (req, res) => {
  const blogId = req.params.blogId
  const onSuccess = (blog) => res.json(({ results: blog }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return findBlogByBlogIdTask(blogId).fork(onError, onSuccess)
})


router.delete('/:blogId', (req, res) => {
  const blogId = req.params.blogId

  const onSuccess = (blog) => res.json(({ results: blog }))
  const onError = (error) => {
    console.log('error on deleteing blog', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return deleteBlogTask(blogId).fork(onError, onSuccess)
})

export default router
