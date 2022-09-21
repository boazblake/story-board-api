import http from '../../http.js'
import Task from 'data.task'
import { compose, head, prop, chain } from 'ramda'

export const createAccountTask = (user) => {
  const account = {
    userId: user.objectId,
    email: user.email,
    name: user.name,
    avatar: "",
    address: "",
    addressIds: [],
    telephone: "",
  }


  return http.back4App
    .postTask({ url: "classes/Accounts", user, body: account })
    .map(({ objectId }) => {
      account.objectId = objectId
      return [account]
    })
}


const getUserAccountTask = (user, encodeId) =>
  http.back4App
    .getTask({ url: `classes/Accounts?${encodeId}`, user })
    .map(prop("results"))
    .chain((account) =>
      account ? Task.of(account) : createAccountTask(user)
    )
    .map(head)

const getUserDuesTask = (user, encodeId) =>
  http.back4App
    .getTask({ url: `classes/Dues?${encodeId}`, user })
    .map(prop("results"))

// const getUserMessagesTask = (mdl) => (encodeId) =>
//   http.back4App
//     .getTask(`classes/Messages?${encodeId}`)
//     .map(prop("results"))
//     .chain((messages) => {
//       return messages.any()
//         ? () => {
//           let hasNotifications = messages.filter(
//             (message) => !message.hasRead
//           )
//           mdl.state.hasNotifications(hasNotifications.any())
//           return Task.of(messages)
//         }
//         : createMessagesTask(mdl)
//     })


const getUserInfoTask = (user) => {
  const encodeId = encodeURI(`where={"userId":"${user.objectId}"}`)
  return Task.of((account) => (dues) => ({ account, dues, user }))
    .ap(getUserAccountTask(user, encodeId))
    .ap(getUserDuesTask(user, encodeId))
}


const logUserInTask = (loginDto) => http.back4App.getTask({ url: `login?${loginDto}` })

const toLoginDto = (LoginData) => encodeURI(`username=${LoginData.email}&password=${LoginData.password}`)

export const loginTask = compose(
  chain(getUserInfoTask),
  logUserInTask,
  toLoginDto)

export const isUserLoggedIn = () => http.back4App.getTask({ url: `users/me` })
