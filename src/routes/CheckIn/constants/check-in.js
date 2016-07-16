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

export const MEDICAL_CHOICES = [
  'Acupuncture',
  'Addiction and Harm Reduction Services',
  'Dental',
  'HIV, STI, and Hepatitis C Testing',
  'Mammograms',
  'Massage',
  'Medical',
  'Mental Health',
  'Needle Exchange',
  'Podiatry',
  'Vision Readers',
  'Vision Prescription (voucher required)',
]

export const SUPPORT_CHOICES = [
  'Adult Probation',
  'Banking',
  'Books and Library Cards',
  'CAAP (GA/PAES, CalFresh)',
  'Disability Services',
  'DMV ID (Must have previous CA ID or copy of Birth Cert., Passport or Military ID)',
  'Employment',
  'Family Services',
  'Foot Washing',
  'Haircuts',
  'Homeward Bound',
  'Housing and Shelter Info',
  'Legal',
  'Lifeline Cell Phones (Tag Mobile)',
  'Pet Care (outside in Plaza)',
  'Phone Calls and Voicemail (Sprint and Google)',
  'Photo Portraits',
  'Senior Services',
  'Showers (Lava Mae)',
  'SSI/SSDI/Medi-Cal',
  'Veteran Services',
  'Wheelchair Repair',
  'Women\'s and Domestic Violence Services',
  'Youth Services (up to age 24)',
]
