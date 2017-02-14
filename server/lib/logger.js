import winston from 'winston'

// TODO: Use different log levels based on the environment.
const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({ level: 'silly' }),
    new (winston.transports.File)({ filename: 'logfile.log', level: 'silly' }),
  ],
})

export default logger
