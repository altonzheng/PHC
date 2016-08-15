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

    console.log(account);

    deferred.resolve({
      message: `Successfully retrieved account ${id}`,
      account: mapSalesforceAccountToPrimaryInfo(account)
    })
  })

  return deferred.promise
}

function mapSalesforceAccountToPrimaryInfo(account) {
  return {
    firstName: account.FirstName,
    lastName: account.LastName,
    socialSecurityNumber: account.SS_Num__c,
    dateOfBirth: transformDate(account.Birthdate__c),
    phoneNumber: account.Phone,
    emailAddress: account.PersonEmail,
    gender: 'male',//account.Gender__c.toLowerCase(),
    //isTransexual: account.Gender__c.toLowerCase() === 'transgender',
    isLGBTQ: account.Identify_as_GLBT__c,
    // Salesforce serializes into 'race1;race2;race3 eg. African American;Asian / Pacific Islander'; we pass down array
    ethnicity: account.Race__c.split(';'),
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

// Transforms a date string from `MM-DD-YYYY` to `YYYY-MM-DD`
function transformDate (dateString) {
  const date = new Date(dateString)

  const yyyy = date.getFullYear()

  let mm = date.getMonth() + 1
  mm = mm < 10 ? '0' + mm : mm

  let dd = date.getDate()
  dd = dd < 10 ? '0' + dd : dd

  return [mm, dd, yyyy].join('-')
}
