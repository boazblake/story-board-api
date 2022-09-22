import { Router } from 'express';
import { loginTask, getUserTask, registerTask, getUsersTask, updateUserTask } from './model.js'
const router = Router();

router.get('/isAuth', (req, res) => {

  const onError = error => {
    console.log('errror on login', error)
    res.body = error
  }

  const onSuccess = ({ account, user, dues }) => {
    return res.json({ account, user, dues })
  }

  return getUserTask().fork(onError, onSuccess)
})

router.post('/login', (req, res) => {
  const user = req.body
  const onSuccess = ({ account, user, dues }) => {
    // console.log('success on login', model, { account, user, dues })
    return res.json(({ results: { account, user, dues } }))
  }
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  return loginTask(user).fork(onError, onSuccess)
});

router.post('/register', (req, res) => {
  const user = req.body

  const onSuccess = (user) => {
    // console.log('success on login', user)
    return res.json(({ results: user }))
  }
  const onError = (error) => {
    // console.log('errror on login', error)
    return res.body = error
  }

  return registerTask(user).fork(onError, onSuccess)
});


router.get('/users', (req, res) => {
  const onSuccess = (users) => {
    return res.json(({ results: users }))
  }
  const onError = (error) => {
    return res.body = error
  }

  return getUsersTask().fork(onError, onSuccess)
})

router.put('/users/:userId', (req, res) => {
  const user = req.body
  const userId = req.params.userId

  const onSuccess = (user) => {
    // console.log('success on login', user)
    return res.json(({ results: user }))
  }
  const onError = (error) => {
    // console.log('errror on login', error)
    return res.body = error
  }

  return updateUserTask(userId, user).fork(onError, onSuccess)
})

export default router;
