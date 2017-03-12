import Q from 'q'

import logger from '../../logger'

import {
  EventRegistration,
  EventPicklistValues,
  FORM_FIELD_TO_SALESFORCE_FIELD,
  PHC_EVENT_ID,
} from './constants'
import { Account } from '../account/constants'
import { PhcEvent } from '../phc-event/constants'
import {
  transformFromSalesforce,
  transformToSalesforce,
} from './transform'

export function createEventRegistration (connection, accountId, fields) {
  const deferred = Q.defer()

  const payload = {}

  for (let field of fields) {
    if (field in FORM_FIELD_TO_SALESFORCE_FIELD) {
      payload[FORM_FIELD_TO_SALESFORCE_FIELD[field]] = EventPicklistValues.APPLIED
    }
  }

  payload['Account__c'] = accountId
  payload['PHC_Event__c'] = PHC_EVENT_ID

  logger.debug('Creating event registration: requesting', { payload })

  connection.sobject(EventRegistration).create(payload, (error, registration) => {
    logger.debug('Creating event registration: request complete', { registration })

    if (error || !registration.success) {
      logger.error('Error creating registration', { error })
      deferred.reject({
        message: 'Error creating registration.',
        error,
      })
    } else {
      deferred.resolve({
        message: `Successfully created registration ${registration.id}.`,
        payload: {
          registration: {
            id: registration.id,
          },
        },
      })
    }
  })
}

export function getEventRegistration (connection, id) {
  const deferred = Q.defer()

  logger.debug('Fetching event registration: requesting', { id })

  connection.sobject(EventRegistration).retrieve(id, (error, eventRegistration) => {
    logger.debug('Fetching event registration: request complete', eventRegistration)

    if (error) {
      logger.error('Fetching event registration: error', { id, error })
      deferred.reject({
        message: `Error fetching event registration ${id}.`,
        error,
      })
    } else {
      deferred.resolve({
        message: `Successfully retrieved event registration ${id}`,
        payload: {
          eventRegistration: transformFromSalesforce(eventRegistration),
        },
      })
    }
  })

  return deferred.promise
}

export function getEventRegistrationByAccount (connection, accountId) {
  const deferred = Q.defer()

  logger.debug(`Searching for account id: ${accountId} at PHC Event: ${PHC_EVENT_ID}`)

  connection.sobject(EventRegistration).find({
    Account__c: accountId,
    [PhcEvent]: PHC_EVENT_ID,
  })
    .sort('-LastModifiedDate') // Sort in descending order of last modified date
    .execute((error, eventRegistrations) => {
      try {
        if (error) {
          logger.error('Fetching event registration: error', { accountId, error })
          deferred.reject({
            message: `Error fetching event registration ${accountId}.`,
            error,
          })
        }

        if (!eventRegistrations.length) {
          deferred.reject({
            message: `Did not find event registration for ${accountId}.`,
            error,
          })
        }

        let eventRegistration = eventRegistrations[0]

        deferred.resolve({
          message: `Successfully retrieved event registration ${eventRegistration.Id} for account ${accountId}`,
          payload: {
            eventRegistration: transformFromSalesforce(eventRegistration),
          },
        })
      } catch (e) {
        logger.error(e)
      }
    })

  return deferred.promise
}

