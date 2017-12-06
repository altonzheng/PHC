import {
  transformArrayForSalesforce,
  transformArrayFromSalesforce,
} from '../array'

import {
  transformDateForSalesforce,
  transformDateFromSalesforce,
  getFormattedBirthdate
} from '../date'

import { HousingPicklistValues } from './constants'

const FORM_FIELD_TO_SALESFORCE_FIELD = {
  firstName: 'FirstName',
  lastName: 'LastName',
  socialSecurityNumber: 'SS_Num__c',
  dateOfBirth: 'Birthdate__c',
  phoneNumber: 'Phone',
  emailAddress: 'PersonEmail',
  gender: 'Gender__c',
  isLGBTQ: 'Identify_as_GLBT__c',
  ethnicity: 'Race__c',
  ethnicityOther: 'Other_Race__c',
  language: 'Primary_Language__c',
  languageOther: 'Other_Language__c',
  hasBeenInFosterCare: 'Foster_Care__c',
  hasServedInTheMilitary: 'Veteran__c',
  primaryHealthcareLocation: 'Where_do_you_usually_go_for_healthcare__c',
  learnedAboutEvent: 'Learned_About_Event__c',
  isHomeless: 'Housing_Status_New__c',  // TODO: Is this right?
  lengthOfHomelessness: 'How_long_have_you_been_homeless__c',
  hasSeenDoctorThisYear: 'Seen_Doctor__c',
  generalHealth: 'General_health__c',
  skinHealth: 'Skin_Health__c',
  dignityAndConfidence: 'Dignity_Confidence__c',
  dentalHygiene: 'Dental_Hygiene__c',
  hygiene: 'Hygiene__c',
}

// Invert the map given above.
const SALESFORCE_FIELD_TO_FORM_FIELD = Object.keys(FORM_FIELD_TO_SALESFORCE_FIELD).reduce((map, key) => {
  map[FORM_FIELD_TO_SALESFORCE_FIELD[key]] = key
  return map
}, {})

// Performs any additional transformations needed to coerce a field so Salesforce will accept it
export function transformFieldForSalesforce (field, value) {
  if (field === 'dateOfBirth') {
    return transformDateForSalesforce(value)
  } else if (field === 'socialSecurityNumber') {
    if (value && value.length === 4) {
      return `00000${value}`
    }
    return value && value.replace(/-/g, '')
  } else if (field === 'isHomeless') {
    return value ? HousingPicklistValues.HOMELESS : HousingPicklistValues.HOUSED
  } else if (value instanceof Array) {
    return transformArrayForSalesforce
  } else {
    return value
  }
}

// Performs any additional transformations needed to coerce a field from Salesforce to its form equivalent
export function transformFieldFromSalesforce (field, value) {
  if (field === 'Birthdate__c') {
    return transformDateFromSalesforce(value)
  } else if (field === 'Race__c') {
    return transformArrayFromSalesforce
  } else if (field === 'SS_Num__c') {
    if (value && value.length === 4) {
      return `00000${value}`
    }
    return value
  } else {
    return value
  }
}

// Maps a Salesforce Account object to the fields we index in Search
export function getSearchIndexFieldsForAccount(account) {
  return {
    name: `${account.FirstName} ${account.LastName}`,
    accountId: account.Id,
    birthdate: getFormattedBirthdate(account.Birthdate__c)
  }
}

// Returns whether or not a form field can be mapped to something in Salesforce
export function isFieldMappableToSalesforce (field) {
  return field in FORM_FIELD_TO_SALESFORCE_FIELD
}

export function isFieldMappableFromSalesforce (field) {
  return field in SALESFORCE_FIELD_TO_FORM_FIELD
}

export function mapSalesforceFieldToFormField (field) {
  return SALESFORCE_FIELD_TO_FORM_FIELD[field]
}

export function mapFormFieldToSalesforceField (field) {
  return FORM_FIELD_TO_SALESFORCE_FIELD[field]
}
