/*
 * TODO:
 * - Fetch choices from Salesforce directly (or server's database), and
 *   provide an admin tool to let them update these easily.
 * - Convert these into objects with IDs so Salesforce can pick up changes
 *   without doing some string matching bullshit
 */

export const ETHNICITY_CHOICES = [
  'African American',
  'Asian / Pacific Islander',
  'Caucasian',
  'Latino',
  'Native American',
]

export const LANGUAGE_CHOICES = [
  'English',
  'Cantonese / Mandarin',
  'Russian',
  'Spanish',
  'Vietnamese',
]

export const PRIMARY_HEALTHCARE_CHOICES = [
  { value: 'Hospital/Emergency Room', label: 'Hospital/Emergency Room' },
  { value: 'Urgent Care', label: 'Urgent Care' },
  { value: 'Clinic / Primary Care Doctor', label: 'Clinic / Primary Care Doctor' },
  { value: 'VA', label: 'VA' },
  { value: 'Does not go for care', label: 'Does not go for care' },
  { value: 'Other', label: 'Other' },
]

export const LENGTH_OF_HOMELESSNESS_CHOICES = [
  { value: 'Less than 3', label: 'Less than 3' },
  { value: '3-6 months', label: '3-6 months' },
  { value: '6-9 months', label: '6-9 months' },
  { value: '9-12 months', label: '9-12 months' },
  { value: '1-3 years', label: '1-3 years' },
  { value: '3-5 years', label: '3-5 years' },
  { value: '5-7 years', label: '5-7 years' },
  { value: '7-10 years', label: '7-10 years' },
  { value: '10-15 years', label: '10-15 years' },
  { value: '15 years and more', label: '15 years and more' }
]

// TODO: Fetch dynamically.
export const MEDICAL_CHOICES = [
  'Acupuncture',
  'Addiction Services',
  'Bugs and Lice Exams', //Needs salesforce
  'Dental',
  'Healthy SF',
  'Hepatitis A Vaccine', //Needs salesforce
//  'Hearing Tests',
  'HIV, STI, and Hepatitis C Testing',
  'Flu Shots',
  // // 'Mammograms',
  'Massage',
  'Medical',
  'Medical Clinics & Support', //Needs salesforce
  'Mental Health Services',
  //'Needle Exchange',
  'Podiatry',
  'Reading Glasses',
  'TB Testing',
  'Vision Screenings',
  //'Prescription Glasses',
]

// TODO: Fetch dynamically.
export const SUPPORT_CHOICES = [
  'Adult Probation',
  'Banking Services',
  //'Books and Library Cards',
  'CAAP',
  //'CalFresh',
  //'Child Care',
  //'Criminal Record Help',
  'Disability Services',
  'DMV ID',
  'Employment',
  'Food Bank',
  //'Family Services',
  //'Foot Care',
  //'Groceries',
  'Haircuts',
  'Homeward Bound',
  'Housing Info',
  'Legal',
  //'Lunch',
  //'Lifeline Cell Phones',
  'Pet Care',
  'Phone Calls and Voicemail',
  //'Photo Portraits',
  'Senior Services',
  'Showers',
  'SSI/SSDI and Medi-Cal',
  'Veteran Services',
  'Wheelchair/Walker Repairs',
  'Women\'s and Domestic Violence Services',
  'Youth Services (up to age 24)',
]
