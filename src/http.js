import Task from "data.task"
import fetch from 'node-fetch'
import { model } from './model.js'
import { dotEnv, log } from './utils.js'
dotEnv()
const env = process.env

const BACK4APP_HEADERS = (cachCall) => ({
  "content-type": "application/json",
  "X-Parse-Application-Id": env.BACK4APP_APPID,
  "X-Parse-REST-API-Key": env.BACK4APP_APIKEY,
  "X-Parse-Revocable-Session": 1,
  "X-Parse-Session-Token": model.sessionToken || "",
  ...cachCall,
  ...(model.user.role == "admin" && {
    "X-Parse-Master-Key": env.BACK4APP_MASTERKEY,
  }),



})

const toError = (url, res, rej) => data => {
  if (url.includes('baca')) {
    return data.code ? rej(data) : res(data)
  }
  if (url.includes('opencagedata')) {
    return data.status.code == 200 ? res(data) : rej(data.status)
  }
  return res(data)
}


const fetchTask = ({ url, _headers, method, body }) => new Task(
  (rej, res) => fetch(url, {
    method,
    headers: {
      ..._headers,
    },
    body,
    withCredentials: false,
  })
    .then(x => x.json())
    .then(toError(url, res, rej), rej))

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

const cachCall = (url) =>
  url == "users/me"
    ? { "Cache-Control": "private" }
    : {
      "If-Modified-Since": new Date(),
      "Cache-Control": "public, max-age=604800",
    }


const toUrl = url => `${env.BACK4APP_BASEURL}/${url}`

const back4appHeaders = url => BACK4APP_HEADERS(cachCall(url))


const back4App = {
  getTask: ({ url }) => fetchTask({ url: toUrl(url), _headers: back4appHeaders(url), method: 'GET', body: null }),
  postTask: ({ url, body }) => fetchTask({ url: toUrl(url), _headers: back4appHeaders(url), method: 'POST', body }),
  putTask: ({ url, body }) => fetchTask({ url: toUrl(url), _headers: back4appHeaders(url), method: 'PUT', body }),
  deleteTask: ({ url }) => fetchTask({ url: toUrl(url), _headers: back4appHeaders(url), method: 'DELETE', body: null }),
}


const formatDeleteUrl = url => url.replace('https://ibb.co/', '').replace('/', '_')
const toImageViewModel = album => ({ data: { delete_url, display_url, thumb: { url } } }) =>
  ({ deleteUrl: formatDeleteUrl(delete_url), image: display_url, thumb: url, album })


const imgBB = {
  deleteTask: (url) => fetchTask({ url, method: "DELETE" }),
  postTask: (album, file) => {
    const image = new URLSearchParams()
    image.append("image", file)
    image.set("key", env.IMGBB_APIKEY)

    return fetchTask({ url: `${env.IMGBB_URL}?key=${env.IMGBB_APIKEY}`, method: "POST", body: image })
      .map(toImageViewModel(album))
  },
}

const OpenCageUrl = (query, encodedBounds) =>
  `${env.OPENCAGE_BASEURL}?key=${env.OPENCAGE_KEY}&q=${query}&pretty=1&countrycode=us&encodedBounds=${encodedBounds}`

const openCageTask = (query, encodedBounds) =>
  fetchTask({
    url: OpenCageUrl(query, encodedBounds)
  })
const http = {
  imgBB,
  openCageTask,
  back4App,
  // paypal,
  lookupLocationTask,
  fetchTask
}

export default http
