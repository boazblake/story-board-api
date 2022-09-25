import http from '../../http.js'
import { prop, pluck } from 'ramda'
import { log } from '../../utils.js'

const getAddressByIdTask = (addressId) => {
  const id = encodeURI(`objectId=${addressId}`)
  return http.back4App
    .getTask(`classes/Addresses/${id}`)
}

const getLocationsByLimitTask = (limit) =>
  http.back4App.getTask({ url: `classes/Addresses?limit=${limit}` }).map(prop('results'))

const updateLocationByIdTask = (id, address) =>
  http.back4App.getTask({ url: `classes/Addresses/${id}`, body: address }).map(prop('results'))

const getLocationByQuery = (query, encodedBounds) =>
  http.openCageTask(query, encodedBounds)

export {
  getAddressByIdTask,
  getLocationsByLimitTask, updateLocationByIdTask, getLocationByQuery
}
