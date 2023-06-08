import http from '../../http.js'
import { prop, head } from 'ramda'
import { log } from '../../utils.js'
import Task from 'data.task/lib/task.js'

const findAccountByEncodedUserIdOrCreateWithUserTask = (encodedUserId, user) => {
  console.log('here?????')
  return findAccountByEncodedUserIdTask(encodedUserId, user)
}

const findAccountByEncodedUserIdTask = (encodedId, user) =>
  http.back4App.getTask({ url: `Classes/Accounts?${encodedId}` }).map(prop('results')).map(head).chain(x => x == undefined ? createNewUserAccountTask(user) : Task.of(x))

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
    .postTask({ url: "classes/Accounts", user, body: JSON.stringify(account) })
    .map(({ objectId }) => {
      account.objectId = objectId
      return [account]
    })
}

const getUserAcountProfileByEncodedId = (user, encodeId) =>
  http.back4App
    .getTask({ url: `classes/Accounts?${encodeId}`, })
    .map(prop("results"))
    .chain((account) =>
      account ? Task.of(account) : createNewUserAccountTask(user)
    )
    .map(head)

const updateAccountByAccountId = (accountId, account) =>
  http.back4App
    .putTask({ url: `classes/Accounts/${accountId}`, body: JSON.stringify(account) })

export {
  updateAccountByAccountId,
  findAccountByEncodedUserIdTask,
  createNewUserAccountTask,
  getUserAcountProfileByEncodedId,
  findAccountByEncodedUserIdOrCreateWithUserTask
}
