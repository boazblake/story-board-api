import { Router } from 'express'
import { getRegionsTask, findRegionByRegionIdTask, deleteRegionTask, createRegionPostTask, updateRegionPostTask } from './model.js'
import { getErrorCode } from '../../utils.js'
const router = Router()


router.get('/', (_, res) => {
  const onSuccess = (Regions) => res.json(({ results: Regions }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return getRegionsTask().fork(onError, onSuccess)
})

router.post('/', (req, res) => {
  const Region = req.body
  const onSuccess = (Regions) => res.json(({ results: Regions }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return createRegionPostTask(Region).fork(onError, onSuccess)
})


router.put('/:region_id', (req, res) => {
  const RegionId = req.params.region_id
  const Region = req.body
  const onSuccess = (Regions) => res.json(({ results: Regions }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return updateRegionPostTask(RegionId, Region).fork(onError, onSuccess)
})

router.get('/:region_id', (req, res) => {
  const RegionId = req.params.region_id
  const onSuccess = (Region) => res.json(({ results: Region }))

  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return findRegionByRegionIdTask(RegionId).fork(onError, onSuccess)
})


router.delete('/:region_id', (req, res) => {
  const RegionId = req.params.region_id

  const onSuccess = (Region) => res.json(({ results: Region }))
  const onError = (error) => {
    console.log('error on deleteing Region', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return deleteRegionTask(RegionId).fork(onError, onSuccess)
})

export default router
