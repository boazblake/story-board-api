import http from '../../http.js'
import { prop, } from 'ramda'

export const getGallery = () => http.back4App.getTask({ url: `Classes/Gallery` }).map(prop('results'))
