import logger from '../../logger'
import {
  FORM_FIELD_TO_SALESFORCE_FIELD,
  SALESFORCE_FIELD_TO_FORM_FIELD,
} from './constants'

/**
 * Transforms an ``EventRegistration`` object for the frontend to use.
 *
 * @param {Object} eventRegistration
 */
export function transformFromSalesforce (eventRegistration) {
  const transformed = {}
  for (let attribute in eventRegistration) {
    if (
      attribute in SALESFORCE_FIELD_TO_FORM_FIELD
        // NOTE: This is because we don't want to surface services that were not available,
        && (
          eventRegistration[attribute] !== null
            || attribute === 'Satisfaction__c'
            || attribute === 'Notes__c'
        )
    ) {
      transformed[SALESFORCE_FIELD_TO_FORM_FIELD[attribute]] = eventRegistration[attribute]
    }
  }

  transformed.id = eventRegistration.Id

  return transformed
}

/**
 * Transforms an ``EventRegistration`` from the frontend representation back
 * to one that can be sent straight to Salesforce.
 *
 * @param {Object} eventRegistration
 */
export function transformToSalesforce (eventRegistration) {
  const transformed = {}

  for (let attribute in eventRegistration) {
    if (attribute in FORM_FIELD_TO_SALESFORCE_FIELD) {
      transformed[FORM_FIELD_TO_SALESFORCE_FIELD[attribute]] = eventRegistration[attribute]
    }
  }

  return transformed
}
