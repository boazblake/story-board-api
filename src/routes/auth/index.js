import { Router } from 'express';
import { loginTask, getUserTask, registerTask } from './model.js'
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


router.get('/account/:userId', (req, res) => {
  const userId = req.param('userId')
  const onSuccess = ({
    profile,
    dues,
    messages,
    addresses,
  }) => {
    // console.log('success on login', model, { account, user, dues })
    return res.json(({
      results: {
        profile,
        dues,
        messages,
        addresses,
      }
    }))
  }
  const onError = (error) => {
    console.log('errror on login', error)
    return res.body = error
  }

  // return findUserAcountProfileByIdTask(userId).fork(onError, onSuccess)
});



export default router;
