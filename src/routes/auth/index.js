import { Router } from 'express';
import { loginTask, isUserLoggedIn } from './model.js'
const router = Router();

router.get('/isAuth', (req, res) => {

  const onError = error => {
    console.log('errror on login', error)
    res.body = error
  }

  const onSuccess = data => {
    return res.json(data)
  }

  return isUserLoggedIn().fork(onError, onSuccess)
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

export default router;
