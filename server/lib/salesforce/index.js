import connect from './connect'
import logger from '../logger'

function logApiUsage (connection) {
  if (connection.limitInfo.apiUsage) {
    logger.debug('API Limit: ' + connection.limitInfo.apiUsage.limit)
    logger.debug('API Used: ' + connection.limitInfo.apiUsage.used)
  }
}

export {
  connect,
  logApiUsage,
}
