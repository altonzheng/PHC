import {
  transformArrayForSalesforce,
  transformArrayFromSalesforce,
} from './array'

import {
  transformDateForSalesforce,
  transformDateFromSalesforce,
  getFormattedBirthdate,
} from './date'

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
  isHomeless: 'Housing_Status_New__c',  // TODO: Is this right?
  lengthOfHomelessness: 'How_long_have_you_been_homeless__c',
}

// Invert the map given above.
const SALESFORCE_FIELD_TO_FORM_FIELD = Object.keys(FORM_FIELD_TO_SALESFORCE_FIELD).reduce((map, key) => {
  map[FORM_FIELD_TO_SALESFORCE_FIELD[key]] = key;
  return map;
}, {});

// Performs any additional transformations needed to coerce a field so Salesforce will accept it
export function transformFieldForSalesforce (field, value) {
  if (field === 'dateOfBirth') {
    return transformDateForSalesforce(value)
  } else if (field === 'socialSecurityNumber') {
    return value && value.replace(/-/g, '')
  } else if (value instanceof Array) {
    return value.join(';')
  } else {
    return value
  }
}

// Performs any additional transformations needed to coerce a field from Salesforce to its form equivalent
export function transformFieldFromSalesforce (field, value) {
  if (field === 'Birthdate__c') {
    return transformDateFromSalesforce(value)
  } else if (field === 'Race__c') {
    return value && value.split(';')
  } else {
    return value
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
