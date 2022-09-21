import http from '../../http.js'
import { prop, } from 'ramda'

export const getAccountByUserId = (encodedId) => http.back4App.getTask({ url: `Classes/Accounts?${encodedId}` }).map(prop('results'))
