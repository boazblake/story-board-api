import { dotEnv } from './utils.js'
dotEnv()
const env = process.env


export const model = {
  paypalToken: "",
  sessionToken: "",
  user: {
    role: '',
  },
  account: {},
  profile: {},
  getSessionToken: mdl => mdl.sessionToken,
  getUserRole: mdl => mdl.user.role
}


