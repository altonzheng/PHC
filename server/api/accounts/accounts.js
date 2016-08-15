import Q from 'q'
import jsforce from 'jsforce'
import logger from '../../lib/logger'
import { transformDateForSalesforce, transformDateFromSalesforce } from './transform'

const Account = 'Account'

const FETCH_ACCOUNTS_QUERY = "SELECT Id, FirstName, LastName FROM Account"

// TODO: Merge these two mapping functions together.
const FORM_FIELD_TO_SALESFORCE_FIELD = {
  firstName: 'FirstName',
  lastName: 'LastName',
  socialSecurityNumber: 'SS_Num__c',
  dateOfBirth: 'Birthdate__c',
  phoneNumber: 'Phone',
  emailAddress: 'PersonEmail',
  gender: 'Gender__c',
  isLGBTQ: 'Identify_as_GLBT__c',
  ethnicity: 'Ethnicity__pc',
  language: 'Primary_Language__c',
  hasBeenInFosterCare: 'Foster_Care__c',
  hasServedInTheMilitary: 'Veteran__c',
  primaryHealthcareLocation: 'Where_do_you_usually_go_for_healthcare__c',
  isHomeless: 'Housing_Status_New__c',  // TODO: Is this right?
  lengthOfHomelessness: 'How_long_have_you_been_homeless__c',
}

// TODO: Wrap any transformation logic in a function called `transformDateFromSalesforce`
function mapSalesforceAccountToPrimaryInfo(account) {
  return {
    firstName: account.FirstName,
    lastName: account.LastName,
    socialSecurityNumber: account.SS_Num__c,
    dateOfBirth: transformDateFromSalesforce(account.Birthdate__c),
    phoneNumber: account.Phone,
    emailAddress: account.PersonEmail,
    gender: 'male',//account.Gender__c.toLowerCase(),
    //isTransexual: account.Gender__c.toLowerCase() === 'transgender',
    isLGBTQ: account.Identify_as_GLBT__c,
    // Salesforce serializes into 'race1;race2;race3 eg. African American;Asian / Pacific Islander'; we pass down array
    ethnicity: account.Race__c && account.Race__c.split(';'),
    ethnicityOther: account.Other_Race__c,
    language: account.Primary_Language__c,
    // This field doesn't exist yet in salesforce so it will be null. @TODO: Recreate in salesforce
    languageOther: account.Other_Language__c,
    hasBeenInFosterCare: account.Foster_Care__c.toString(),
    hasServedInTheMilitary: account.Veteran__c.toString(),
    primaryHealthcareLocation: account.Where_do_you_usually_go_for_healthcare__c,
    isHomeless: (account.Housing_Status_New__c === 'Homeless').toString(),
    lengthOfHomelessness: account.How_long_have_you_been_homeless__c
  }
}

// TODO: Move this to `transform.js`, and only export this function.
// Performs any additional transformations needed to coerce a field so Salesforce will accept it
function transformFieldForSalesforce (value, field) {
  if (field === 'Birthdate__c') {
    return transformDateForSalesforce(value)
  } else if (field === 'SS_Num__c') {
    return value.replace(/-/g, '')
  } else if (value instanceof Array) {
    return value.join(';')
  } else {
    return value
  }
}

export function logApiUsage (connection) {
  if (connection.limitInfo.apiUsage) {
    logger.debug("API Limit: " + connection.limitInfo.apiUsage.limit)
    logger.debug("API Used: " + connection.limitInfo.apiUsage.used)
  }

  return {
    connection,
  }
}

export function fetchAccounts(connection) {
  const deferred = Q.defer()
  const records = []

  logger.debug('Started fetching records.')
  connection.bulk.query(FETCH_ACCOUNTS_QUERY)
    .on('record', (record) => {
      logger.debug(record)
      records.push(record)
    })
    .on('end', () => {
      logger.debug('Finished fetching records.')
      deferred.resolve({
        message: 'Successfully fetched ' + records.length + ' records!',
        payload: {
          accounts: records
        },
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
    logger.verbose('API Limit: ' + connection.limitInfo.apiUsage.limit)
    logger.verbose('API Used: ' + connection.limitInfo.apiUsage.used)
  }

  const deferred = Q.defer()

  connection.sobject(Account).retrieve(id, (err, account) => {
    logger.debug(account)

    if (err) {
      logger.error(`Error fetching account ${id}: ${err}.`)
      deferred.reject({
        message: `Error fetching account ${id}.`,
        error: err,
      })
    } else {
      const payload = {
        account: mapSalesforceAccountToPrimaryInfo(account)
      }

      payload['id'] = account.Id

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

  connection.sobject(Account).create(payload, (err, account) => {
    logger.debug(account)

    if (err || !account.success) {
      logger.error(`Error creating account: ${err}.`)
      deferred.reject({
        message: `Error creating account.`,
        error: err,
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

  connection.sobject(Account).update(payload, (err, account) => {
    logger.debug(account)

    if (err || !account.success) {
      logger.error(`Error updating account ${id}: ${err}.`)
      deferred.reject({
        message: `Error updating account.`,
        error: err,
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

export function createOrUpdateAccount(connection, id, fields) {
  const payload = {}

  logger.debug(fields)

  for (let field in fields) {
    if (field in FORM_FIELD_TO_SALESFORCE_FIELD) {
      const sfColumnName = FORM_FIELD_TO_SALESFORCE_FIELD[field]
      payload[sfColumnName] = transformFieldForSalesforce(fields[field], sfColumnName)
    }
  }

  logger.debug(payload)

  if (id) {
    payload['Id'] = id
    return updateAccount(connection, payload)
  } else {
    return createAccount(connection, payload)
  }
}
