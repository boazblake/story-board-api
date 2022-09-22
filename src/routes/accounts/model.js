import http from '../../http.js'
import { prop, head } from 'ramda'

const findAccountByUserIdTask = (encodedId) =>
  http.back4App.getTask({ url: `Classes/Accounts?${encodedId}` }).map(prop('results')).map(head)

const createNewUserAccountTask = (user) => {
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

const getUserAcountProfileById = (user, encodeId) =>
  http.back4App
    .getTask({ url: `classes/Accounts?${encodeId}`, })
    .map(prop("results"))
    .chain((account) =>
      account ? Task.of(account) : createNewUserAccountTask(user)
    )
    .map(head)

export {
  findAccountByUserIdTask,
  createNewUserAccountTask,
  getUserAcountProfileById
}
