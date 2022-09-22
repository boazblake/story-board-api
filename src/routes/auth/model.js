import http from '../../http.js'
import Task from 'data.task'
import { model } from '../../model.js'
import { compose, map, chain } from 'ramda'
import { findAccountByUserIdTask } from '../accounts/model.js'
import { findUserDuesByIdTask } from '../dues/model.js'

const updateState = (user) => {
  model.sessionToken = user.sessionToken
  model.user.role = user.role
  return user
}

const getUserInfoTask = (user) => {
  const encodeId = encodeURI(`where={"userId":"${user.objectId}"}`)
  return Task.of((account) => (dues) => ({ user, account, dues }))
    .ap(findAccountByUserIdTask(encodeId))
    .ap(findUserDuesByIdTask(encodeId))
}


const logUserInTask = (loginDto) => http.back4App.getTask({ url: `login?${loginDto}` })

const toLoginDto = (LoginData) => encodeURI(`username=${LoginData.email}&password=${LoginData.password}`)

const loginTask = compose(
  chain(getUserInfoTask),
  map(updateState),
  logUserInTask,
  toLoginDto)

const getUserTask = () => http.back4App.getTask({ url: `users/me` }).map(updateState).chain(getUserInfoTask)

const registerTask = user => http.back4App.postTask({ url: `users`, body: JSON.stringify(user) })


// const profileTask = id => getUserAccountTask

// const findUserAcountProfileByIdTask = userId => {
//   let id = encodeURI(`where={"userId":"${userId}"}`)
//   return Task.of((profile) => (dues) => (messages) => (addresses) => {
//     return {
//       profile,
//       dues,
//       messages,
//       addresses,
//     }
//   })
//     .ap(profileTask(id))
//     .ap(findDuesTask(id))
//     .ap(findMessagesTask(id))
//     .ap(findAddressesTask(mdl)(mdl.data.account.addressIds))
// }


export {
  loginTask,
  getUserTask,
  getUserInfoTask,
  registerTask,
}
