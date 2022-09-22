import http from '../../http.js'
import { prop, } from 'ramda'

export const getEventsTask = () => http.back4App.getTask({ url: `Classes/Events` }).map(prop('results'))
