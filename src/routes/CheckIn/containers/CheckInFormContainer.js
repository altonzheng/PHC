import { reduxForm } from 'redux-form'

import CheckInForm from '../components/CheckInForm'
import { updateInfo, clearInfo } from '../modules/check-in'
import { validEmailRegex } from '../../../utils/regex'

const fields = [
  'firstName',
  'lastName',
  'socialSecurityNumber',
  'dateOfBirth',
  'phoneNumber',
  'emailAddress',

  'gender',
  'isTransexual',
  'isLGBTQ',

  'ethnicity',
  'ethnicityOther',

  'language',
  'languageOther',

  'hasBeenInFosterCare',

  'hasServedInTheMilitary',

  'primaryHealthcareLocation',

  'isHomeless',
  'lengthOfHomelessness',

  'medicalServices',
  'supportServices',
]

const validate = (values) => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  }

  // TODO: Not currently enforced in the Android PHC app, but should we enforce?
  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Required'
  } else if (isNaN(new Date(values.dateOfBirth)) || new Date(values.dateOfBirth) > new Date()) {
    errors.dateOfBirth = 'Invalid'
  }

  if (values.socialSecurityNumber && values.socialSecurityNumber.length < 11) {
    errors.socialSecurityNumber = 'Incomplete'
  }

  if (values.phoneNumber && values.phoneNumber.length < 14) {
    errors.phoneNumber = 'Incomplete'
  }

  if (values.emailAddress && !validEmailRegex.test(values.emailAddress)) {
    errors.emailAddress = 'Invalid'
  }

  return errors
}


const mapStateToProps = (state) => ({
  initialValues: state.checkIn.primaryInfo,
})

const mapDispatchToProps = (dispatch) => ({
  updateInfo: (fields) => dispatch(updateInfo(fields)),
  clearInfo: () => dispatch(clearInfo()),
})

export default reduxForm({
  form: 'checkIn',
  fields,
  validate,
},
mapStateToProps,
mapDispatchToProps
)(CheckInForm)
