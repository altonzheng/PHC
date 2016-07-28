import { reduxForm } from 'redux-form'

import CheckInForm from '../components/CheckInForm'
import { updateInfo, clearInfo } from '../modules/check-in'

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

  if (!values.socialSecurityNumber) {
    errors.socialSecurityNumber = 'Required'
  } else if (values.socialSecurityNumber.length < 11) {
    errors.socialSecurityNumber = 'Incomplete'
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required'
  } else if (values.phoneNumber.length < 14) {
    errors.phoneNumber = 'Incomplete'
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
