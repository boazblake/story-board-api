import http from '../../http.js'
import { compose, prop, map, over, lensProp } from 'ramda'
import { formatDate } from '../../utils.js'

const formatLensDate = (prpty) => over(lensProp(prpty), formatDate)

const toViewModel = result => {
  return result.error ? result :
    compose(formatLensDate("updatedAt"), formatLensDate("createdAt"))(result)
}


const getTracksTask = () => http.back4App.getTask({ url: `Classes/Tracks` }).map(prop('results'))
  .map(map(toViewModel))

const findTrackByTrackIdTask = (TrackId) => http.back4App.getTask({ url: `Classes/Tracks/${TrackId}` })
  .map(toViewModel)

const deleteTrackTask = (TrackId) => http.back4App.deleteTask({ url: `Classes/Tracks/${TrackId}` })

const createTrackPostTask = Track => http.back4App.postTask({ url: `Classes/Tracks`, body: JSON.stringify(Track) })

const updateTrackPostTask = (TrackId, Track) =>
  http.back4App.putTask({ url: `Classes/Tracks/${TrackId}`, body: JSON.stringify(Track) })

export { findTrackByTrackIdTask, getTracksTask, deleteTrackTask, createTrackPostTask, updateTrackPostTask }
