
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const log = (m) => (v) => {
  console.log(m, v);
  return v;
};

const dotEnv = () => {
  const e = dotenv.config()
  return dotenvExpand.expand(e)
}

const formatDate = date => date.split('T')[0]

export {
  log, dotEnv, formatDate
}
