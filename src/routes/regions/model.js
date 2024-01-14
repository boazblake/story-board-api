import http from '../../http.js'
import { compose, prop, reverse, sortBy, propEq, map, over, lensProp } from 'ramda'
import { formatDate } from '../../utils.js'

const formatLensDate = (prpty) => over(lensProp(prpty), formatDate)

const toViewModel =   result=> result.error ? result :compose(formatLensDate("updatedAt"), formatLensDate("createdAt"))(result)


const getRegionsTask = () => http.back4App.getTask({ url: `Classes/Regions` }).map(prop('results'))
  .map(map(toViewModel))

const findRegionByRegionIdTask = (RegionId) => http.back4App.getTask({ url: `Classes/Regions/${RegionId}` })
  .map(toViewModel)

const deleteRegionTask = (RegionId) => http.back4App.deleteTask({ url: `Classes/Regions/${RegionId}` })

const createRegionPostTask = Region => http.back4App.postTask({ url: `Classes/Regions`, body: JSON.stringify(Region) })

const updateRegionPostTask = (RegionId, Region) =>
  http.back4App.putTask({ url: `Classes/Regions/${RegionId}`, body: JSON.stringify(Region) })

export { findRegionByRegionIdTask, getRegionsTask, deleteRegionTask, createRegionPostTask, updateRegionPostTask }
