import http from '../../http.js'
import { prop, reverse } from 'ramda'

const getBlogsTask = () => http.back4App.getTask({ url: `Classes/Blogs` }).map(prop('results')).map(reverse)

const findBlogByBlogIdTask = (blogId) => http.back4App.getTask({ url: `Classes/Blogs/${blogId}` })

const deleteBlogTask = (blogId) => http.back4App.deleteTask({ url: `Classes/Blogs/${blogId}` })

const createBlogPostTask = blog => http.back4App.postTask({ url: `Classes/Blogs`, body: JSON.stringify(blog) })

const updateBlogPostTask = (blogId, blog) =>
  http.back4App.putTask({ url: `Classes/Blogs/${blogId}`, body: JSON.stringify(blog) })

export { findBlogByBlogIdTask, getBlogsTask, deleteBlogTask, createBlogPostTask, updateBlogPostTask }
