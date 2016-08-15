import Q from 'q'
import jsforce from 'jsforce'
import logger from '../../lib/logger'

const fetchAccountsQuery = 'SELECT Id, FirstName, LastName FROM Account'

export function fetchAccounts(connection) {
  const deferred = Q.defer()
  const records = []

  logger.debug('Started fetching records.')
  connection.bulk.query(fetchAccountsQuery)
    .on('record', (record) => {
      logger.debug(record)
      records.push(record)
    })
    .on('end', () => {
      logger.debug('Finished fetching records.')
      deferred.resolve({
        message: 'Successfully fetched ' + records.length + ' records!',
        records: records
      })
    })
    .on('error', (err) => {
      logger.warn('Error fetching records.')
      deferred.reject({
        message: 'Error fetching records.',
        error: err
      })
    })

  return deferred.promise
}

export function getAccount(connection, id) {
  if (connection.limitInfo.apiUsage) {
    logger.verbose('API Limit: ' + connection.limitInfo.apiUsage.limit);
    logger.verbose('API Used: ' + connection.limitInfo.apiUsage.used);
  }

  const deferred = Q.defer()

  connection.sobject('Account').retrieve(id, function(err, account) {
    if (err) {
      logger.warn(`Error fetching account ${id}.`)
      deferred.reject({
        message: `Error fetching account ${id}.`,
        error: err
      })
    }

    deferred.resolve({
      message: `Successfully retrieved account ${id}`,
      account: account
    })
  })

  return deferred.promise
}
