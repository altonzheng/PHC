import Q from 'q'
import Fuse from 'fuse.js'

import logger from '../../logger'

import {
  Account,
  FETCH_ACCOUNTS_QUERY
} from './constants'
import {
  isFieldMappableFromSalesforce,
  isFieldMappableToSalesforce,
  transformFieldFromSalesforce,
  transformFieldForSalesforce,
  mapFormFieldToSalesforceField,
  mapSalesforceFieldToFormField
} from './transform'
import { getFormattedBirthdate } from './transform/date'

// Store accounts in memory lol
let fuse = null

function getAllAccounts(connection) {
  const deferred = Q.defer()
  const accounts = []

  logger.debug('Fetching accounts: starting')
  connection.bulk.query(FETCH_ACCOUNTS_QUERY)
    .on('record', (account) => {
      accounts.push(account)
    })
    .on('end', () => {
      logger.debug('Fetching accounts: complete')

      let mappedAccounts = accounts.map((account) => {
        return {
          // TODO: Select their entire name from Salesforce instead of these two separate columns.
          //   Or, return first and last name separately.
          name: `${account.FirstName} ${account.LastName}`,
          id: account.Id,
          birthdate: getFormattedBirthdate(account.Birthdate__c)
        }
      })

      // Use Fuse.js to create a fuzzy searchable index of accounts
      fuse = new Fuse(mappedAccounts, {
        keys: ['name'],
        threshold: 0.2
      })
      logger.debug('Index of ' + accounts.length + ' accounts built.')

      deferred.resolve({
        message: 'Successfully fetched ' + accounts.length + ' accounts!'
      })
    })
    .on('error', (error) => {
      logger.warn('Fetching accounts: error', { error })
      deferred.reject({
        message: 'Error fetching accounts.',
        error
      })
    })

  return deferred.promise
}

function getAccount(connection, id) {
  const deferred = Q.defer()

  logger.debug('Fetching account: requesting', { id })

  connection.sobject(Account).retrieve(id, (error, account) => {
    logger.debug('Fetching account: request complete', account)

    if (error) {
      logger.error('Fetching account: error', { id, error })
      deferred.reject({
        message: `Error fetching account ${id}.`,
        error,
      })
    } else {
      const payload = {
        account: {},
      }

      for (let field in account) {
        if (isFieldMappableFromSalesforce(field)) {
          payload.account[mapSalesforceFieldToFormField(field)] = transformFieldFromSalesforce(field, account[field])
        } else {
          // Commenting this out for less log spam
          // logger.debug(`Fetching account: found unparseable field`, { field })
        }
      }

      payload.account.id = account.Id

      deferred.resolve({
        message: `Successfully retrieved account ${id}`,
        payload,
      })
    }
  })

  return deferred.promise
}

function createAccount(connection, payload) {
  const deferred = Q.defer()

  logger.debug('Creating account: requesting', { payload })

  connection.sobject(Account).create(payload, (error, account) => {
    logger.debug('Creating account: request complete', account)

    if (error || !account.success) {
      logger.error('Creating account: error', { error })
      deferred.reject({
        message: `Error creating account.`,
        error,
      })
    } else {
      deferred.resolve({
        message: `Successfully created account ${account.id}.`,
        payload: {
          account: {
            id: account.id,
          },
        },
      })
    }
  })

  return deferred.promise
}

function updateAccount(connection, payload) {
  const deferred = Q.defer()

  logger.debug('Updating account: requesting', { payload })

  connection.sobject(Account).update(payload, (error, account) => {
    logger.debug('Updating account: request complete', account)

    if (error || !account.success) {
      logger.error('Updating account: error', { error })
      deferred.reject({
        message: 'Error updating account.',
        error
      })
    } else {
      deferred.resolve({
        message: `Successfully updated account ${account.id}.`,
        payload: {
          account: {
            id: account.id,
          },
        },
      })
    }
  })

  return deferred.promise
}

function createOrUpdateAccount(connection, id, fields) {
  const payload = {}

  logger.debug('Creating or updating account: parsing fields', { fields })

  for (let field in fields) {
    if (isFieldMappableToSalesforce(field) && fields[field] != null) {
      payload[mapFormFieldToSalesforceField(field)] = transformFieldForSalesforce(field, fields[field])
    } else {
      logger.debug(`Creating or updating account: found unparseable field`, { field })
    }
  }

  if (id) {
    payload['Id'] = id
    return updateAccount(connection, payload)
  } else {
    return createAccount(connection, payload)
  }
}

function searchForAccountByName(connection, name) {
  return Q.fcall(() => {
      // Initialize fuse if first time calling
      if (fuse === null) {
        return getAllAccounts(connection)
      }
    })
    .then(() => {
      return {
        payload: {
          // Return top 3 results
          accounts: fuse.search(name).slice(0,3)
        }
      }
    })
}

export {
  getAllAccounts,
  getAccount,
  createOrUpdateAccount,
  searchForAccountByName
}
