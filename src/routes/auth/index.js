import { Router } from 'express';
import { loginTask, getUserTask, registerTask, getUsersTask, updateUserTask, resetPassword } from './model.js'
import { getErrorCode } from '../../utils.js'
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
    console.log('error on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
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
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return registerTask(user).fork(onError, onSuccess)
});

router.post('/resetpassword', (req, res) => {
  const email = req.body

  const onSuccess = () => {
    // console.log('success on login', user)
    return res.json(({ results: { message: 'A password reset request was sent to the email provided, please check your email to reset your password.' } }))
  }
  const onError = (error) => {
    res.status(getErrorCode(error))
    return res.json(error)
  }
  console.log('email', email)
  return resetPassword(email).fork(onError, onSuccess)
});


router.get('/users', (req, res) => {
  const onSuccess = (users) => {
    return res.json(({ results: users }))
  }
  const onError = (error) => {
    console.log('error on registr', error)
    res.status(getErrorCode(error))
    return res.json(error)
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
    console.log('error on updating user', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return updateUserTask(userId, user).fork(onError, onSuccess)
})

export default router;
