import http from '../../http.js'
import Task from 'data.task'
import { model } from '../../model.js'
import { compose, map, chain, prop } from 'ramda'
import { findAccountByEncodedIdTask } from '../accounts/model.js'
import { findUserDuesByEncodedIdTask } from '../dues/model.js'

const updateState = (user) => {
  model.sessionToken = user.sessionToken
  model.user.role = user.role
  return user
}

const getUserInfoTask = (user) => {
  const encodeId = encodeURI(`where={"userId":"${user.objectId}"}`)
  return Task.of((account) => (dues) => ({ user, account, dues }))
    .ap(findAccountByEncodedIdTask(encodeId))
    .ap(findUserDuesByEncodedIdTask(encodeId))
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


const getUsersTask = () => http.back4App.getTask({ url: `users` }).map(prop('results'))

const updateUserTask = (userId, user) => http.back4App.putTask({ url: `users/${userId}`, body: JSON.stringify(user) })

const resetPassword = (email) => http.back4App.postTask({ url: `requestPasswordReset`, body: JSON.stringify(email) })


export {
  loginTask,
  getUserTask,
  getUserInfoTask,
  registerTask, getUsersTask, updateUserTask, resetPassword
}
