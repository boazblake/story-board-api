import expressWinston from 'express-winston'
import winston from 'winston'

const date = new Date().toISOString();
const logFormat = winston.format.printf((info) => {
  // console.warn(info)
  return `${date}-${info.level}: ${JSON.stringify(info.message, null, 4)};\n query: ${JSON.stringify(info.meta.req.query, null, 4)};\n status: ${JSON.stringify(info.meta.res.statusCode, null, 4)};\n responseTime: ${JSON.stringify(info.meta.responseTime, null, 4)}\n`
}
);

export default () =>
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.combine(winston.format.colorize(), logFormat)
      })
    ],
  })

