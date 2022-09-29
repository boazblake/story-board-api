import http from '../../http.js'
import { compose, prop, reverse, sortBy, propEq, map, over, lensProp } from 'ramda'
import { formatDate } from '../../utils.js'

const formatLensDate = (prpty) => over(lensProp(prpty), formatDate)

const toViewModel = compose(formatLensDate("updatedAt"), formatLensDate("createdAt"))


const getBlogsTask = () => http.back4App.getTask({ url: `Classes/Blogs` }).map(prop('results'))
  .map(map(toViewModel))

const findBlogByBlogIdTask = (blogId) => http.back4App.getTask({ url: `Classes/Blogs/${blogId}` })
  .map(toViewModel)

const deleteBlogTask = (blogId) => http.back4App.deleteTask({ url: `Classes/Blogs/${blogId}` })

const createBlogPostTask = blog => http.back4App.postTask({ url: `Classes/Blogs`, body: JSON.stringify(blog) })

const updateBlogPostTask = (blogId, blog) =>
  http.back4App.putTask({ url: `Classes/Blogs/${blogId}`, body: JSON.stringify(blog) })

export { findBlogByBlogIdTask, getBlogsTask, deleteBlogTask, createBlogPostTask, updateBlogPostTask }
