import http from '../../http.js'
import { prop, } from 'ramda'

const getAddressByIdTask = (addressId) => {
  let id = encodeURI(`objectId=${addressId}`)
  return http.back4App
    .getTask(`classes/Addresses/${id}`)
    .map(log("address??"))
}

const getLocationsByLimitTask = (limit) =>
  http.back4App.getTask({ url: `classes/Addresses?limit=${limit}` }).map(prop('results'))

const updateLocationByIdTask = (id, address) =>
  http.back4App.getTask({ url: `classes/Addresses/${id}`, body: address }).map(prop('results'))

export {
  getAddressByIdTask,
  getLocationsByLimitTask, updateLocationByIdTask
}
