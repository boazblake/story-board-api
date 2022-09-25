import http from '../../http.js'
import { prop, } from 'ramda'

const getEventsTask = () => http.back4App.getTask({ url: `Classes/Events` }).map(prop('results'))

const updateEventByIdTask = (eventId, event) =>
  http.back4App.putTask({ url: `Classes/Events/${eventId}`, body: JSON.stringify(event) })

const deleteEventByIdTask = (eventId) =>
  http.back4App.deleteTask({ url: `Classes/Events/${eventId}`, })

const createEventTask = (event) =>
  http.back4App.postTask({ url: `Classes/Events/`, body: JSON.stringify(event) })

export { updateEventByIdTask, getEventsTask, deleteEventByIdTask, createEventTask }
