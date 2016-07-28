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
  // if (!values.firstName) {
  //   errors.firstName = 'Required'
  // }
  //
  // if (!values.lastName) {
  //   errors.lastName = 'Required'
  // }
  //
  // if (!values.dateOfBirth) {
  //   errors.dateOfBirth = 'Required'
  // }

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
