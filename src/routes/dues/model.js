import http from '../../http.js'
import { prop, map, reverse } from 'ramda'
import { log, formatDate } from '../../utils.js'

const saveDuesTask = (invoice) => http.back4App.postTask({ url: `classes/Dues`, body: invoice }).map(prop('results'))

const toDuesVM = ({ date, createdAt, status, full_name, address, email }) => {
  return date
    ? {
      date: formatDate(date),
      status,
      name: full_name,
      email,
      address,
    }
    : {
      date: formatDate(createdAt),
      status: "ERROR - contact administrator",
      full_name: JSON.stringify(full_name),
      email: JSON.stringify(email),
      address: JSON.stringify(address),
    }
}

const findUserDuesByIdTask = (encodeId) =>
  http.back4App
    .getTask({ url: `classes/Dues?${encodeId}`, })
    .map(prop("results"))
    .map(map(toDuesVM))
    .map(reverse)
    .map(log('?'))


export { saveDuesTask, findUserDuesByIdTask }
