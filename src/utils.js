
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

const getErrorCode = ({ code }) =>
  [-1, 1, 2, 4].includes(code) ? 500 : 400

export {
  log, dotEnv, formatDate, getErrorCode
}


export const chunkString = str => chunk(str.split(), str.length)

export const unchunkString = matrix => matrix.flat().join('')