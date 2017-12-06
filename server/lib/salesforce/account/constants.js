export const Account = 'Account'
export const FETCH_ACCOUNTS_QUERY = 'SELECT Id, FirstName, LastName, Birthdate__c FROM Account'
export const HousingPicklistValues = {
  HOUSED: 'Housed',
  HOMELESS: 'Homeless',
}

export const AccountUpdateableFields = [
  'FirstName',
  'LastName',
  'SS_Num__c',
  'Birthdate__c',
  'Phone',
  'PersonEmail',
  'Gender__c',
  'Identify_as_GLBT__c',
  'Race__c',
  'Other_Race__c',
  'Primary_Language__c',
  'Other_Language__c',
  'Foster_Care__c',
  'Veteran__c',
  'Where_do_you_usually_go_for_healthcare__c',
  'Housing_Status_New__c',  // TODO: Is this right?
  'How_long_have_you_been_homeless__c',
  'Learned_About_Event__c',
  'Seen_Doctor__c',
  'General_health__c',
  'Skin_Health__c',
  'Dignity_Confidence__c',
  'Dental_Hygiene__c',
  'Hygiene__c',
]
