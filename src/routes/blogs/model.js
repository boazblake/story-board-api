import http from '../../http.js'
import { prop, } from 'ramda'

export const getBlogs = () => http.back4App.getTask({ url: `Classes/Blogs` }).map(prop('results'))
