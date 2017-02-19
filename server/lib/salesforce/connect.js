import Q from 'q'
import jsforce from 'jsforce'

import config from '../../../config'
import logger from '../logger.js'

// set the bulk query timeout to 5 minutes; should be plenty of time to fetch
const pollTimeout = 300000

// HACK: Storing the current connection in-memory so we don't need to authenticate multiple times.
let currentConnection

export default function connect () {
  const deferred = Q.defer()

  if (currentConnection) {
    deferred.resolve({
      message: 'Already logged in.',
      connection: currentConnection,
    })
  } else {
    const connection = new jsforce.Connection({ loginUrl: config.salesforce_host })

    connection.login(config.salesforce_username, config.salesforce_password, (error, _) => {
      if (error) {
        logger.warn(error)
        deferred.reject({
          message: 'Unable to authenticate to Salesforce.',
          error,
        })
      } else {
        currentConnection = connection
        currentConnection.bulk.pollTimeout = pollTimeout

        deferred.resolve({
          message: 'Successfully authenticated to Salesforce.',
          connection: currentConnection,
        })
      }
    })
  }

  return deferred.promise
}
