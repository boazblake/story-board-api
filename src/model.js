import { dotEnv } from './utils.js'
dotEnv()
const env = process.env


export const model = {
  sessionToken: "",
  user: {
    role: '',
  },
  profile: {},
  getSessionToken: mdl => mdl.sessionToken,
  getUserRole: mdl => mdl.user.role
}


