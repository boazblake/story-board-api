import Task from "data.task"
import fetch from 'node-fetch'
import { model } from './model.js'
import { dotEnv, log } from './utils.js'
dotEnv()
const env = process.env

const BACK4APP_HEADERS = (cachCall) => ({
  "content-type": "application/json",
  "X-Parse-Application-Id": env.PARSE_APPLICATION_ID,
  "X-Parse-REST-API-Key": env.PARSE_REST_API_KEY,
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

const cachCall = (url) =>
  url == "users/me"
    ? { "Cache-Control": "private" }
    : {
      "If-Modified-Since": new Date(),
      "Cache-Control": "public, max-age=604800",
    }


const toUrl = url => `${env.PARSE_API_URL}/${url}`

const back4appHeaders = url => BACK4APP_HEADERS(cachCall(url))


const back4App = {
  getTask: ({ url }) => fetchTask({ url: toUrl(url), _headers: back4appHeaders(url), method: 'GET', body: null }),
  postTask: ({ url, body }) => fetchTask({ url: toUrl(url), _headers: back4appHeaders(url), method: 'POST', body }),
  putTask: ({ url, body }) => fetchTask({ url: toUrl(url), _headers: back4appHeaders(url), method: 'PUT', body }),
  deleteTask: ({ url }) => fetchTask({ url: toUrl(url), _headers: back4appHeaders(url), method: 'DELETE', body: null }),
}


const http = {
  back4App,
  lookupLocationTask,
  fetchTask
}

export default http
