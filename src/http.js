import Task from "data.task"
import fetch from 'node-fetch'
import { model } from './model.js'
import { dotEnv } from './utils.js'
dotEnv()
const env = process.env

const BACK4APP_HEADERS = () => ({
  "content-type": "application/json",
  "X-Parse-Application-Id": env.BACK4APP_APPID,
  "X-Parse-REST-API-Key": env.BACK4APP_APIKEY,
  "X-Parse-Revocable-Session": 1,
  "X-Parse-Session-Token": model.sessionToken || "",
  // ...(user.sessionToken && {
  //   "X-Parse-Session-Token": user.sessionToken,
  // }),
  ...(model.user.role == "admin" && {
    "X-Parse-Master-Key": env.BACK4APP_MASTERKEY,
  }),



})

const fetchTask = ({ url, _headers, method, body }) => new Task(
  (rej, res) => fetch(url, {
    method,
    headers: {
      ..._headers,
    },
    body,
    withCredentials: false,
  }).then(x => x.json()).then(res, rej))

const lookupLocationTask = (query) => {
  return new Task((rej, res) =>
    fetch({
      method: "GET",
      url: `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
    })
      .then(res, rej)
  )
}

// const paypalUrl = `${PAYPAL.sandbox.baseUrl}/`
// const paypal = {
//   getTokenTask: (mdl) =>
//     fetchTask(PAYPAL.sandbox.headers())("POST")(mdl)(
//       paypalUrl + "v1/oauth2/token/"
//     )(`grant_type=client_credentials`).map(updatePayPalAuth(mdl)),
//   getTask: (mdl) => (url) =>
//     fetchTask(PAYPAL.sandbox.headers(PAYPAL))("GET")(mdl)(paypalUrl + url)(null),
//   postTask: (mdl) => (url) => (dto) =>
//     fetchTask(PAYPAL.sandbox.headers(PAYPAL))("POST")(mdl)(paypalUrl + url)(dto),
//   putTask: (mdl) => (url) => (dto) =>
//     fetchTask(PAYPAL.sandbox.headers(PAYPAL))("PUT")(mdl)(paypalUrl + url)(dto),
// }

// const cachCall = (url) =>
//   url == "users/me"
//     ? { "Cache-Control": "private" }
//     : {
//       "If-Modified-Since": new Date(),
//       "Cache-Control": "public, max-age=604800",
//     }
const toUrl = url => `${env.BACK4APP_BASEURL}/${url}`

const back4App = {
  getTask: ({ url }) => fetchTask({ url: toUrl(url), _headers: BACK4APP_HEADERS(), method: 'GET', body: null }),
  postTask: ({ url, body }) => { console.log('dto', body); return fetchTask({ url: toUrl(url), _headers: BACK4APP_HEADERS(), method: 'POST', body }) },
  putTask: ({ url, body }) => fetchTask({ url: toUrl(url), _headers: BACK4APP_HEADERS(), method: 'PUT', body }),
  deleteTask: ({ url }) => fetchTask({ url: toUrl(url), _headers: BACK4APP_HEADERS(), method: 'DELETE', body: null }),
}

// const imgBB = {
//   postTask: (mdl) => (file) => {
//     const image = new FormData()
//     image.append("image", file)
//     image.set("key", IMGBB.apiKey)

//     return fetchTask()("POST")(mdl)(`${IMGBB.url}?key=${IMGBB.apiKey}`)(image)
//   },
// }

// const OpenCageUrl = `${OpenCage.baseUrl}?key=${OpenCage.key}&q=`

// const openCage = {
//   getLocationTask: (mdl) => (query) =>
//     fetchTask(OpenCage.headers())("GET")(mdl)(
//       OpenCageUrl +
//       query +
//       `&pretty=1&countrycode=us&bounds=${encodeURIComponent(
//         mdl.Map.bounds()
//       )}`
//     )(null),
// }

const http = {
  // imgBB,
  // openCage,
  back4App,
  // paypal,
  lookupLocationTask,
  fetchTask
}

export default http
