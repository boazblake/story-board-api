import http from '../../http.js'
import { prop, } from 'ramda'
import { log } from '../../utils.js'

const getBlogsTask = () => http.back4App.getTask({ url: `Classes/Blogs` }).map(prop('results'))

const findBlogByBlogIdTask = (blogId) => http.back4App.getTask({ url: `Classes/Blogs/${blogId}` })
  // .map(prop('results'))
  .map(log('blog??'))

const deleteBlogTask = (blogId) => http.back4App.deleteTask({ url: `Classes/Blogs/${blogId}` })
  // .map(prop('results'))
  .map(log('delete??'))

export { findBlogByBlogIdTask, getBlogsTask, deleteBlogTask }
