import { reduxForm } from 'redux-form'

import CheckInForm from '../components/CheckInForm'
import { updatePrimaryInfo } from '../modules/check-in'

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

})

const mapDispatchToProps = (dispatch) => ({
  updatePrimaryInfo: (fields) => dispatch(updatePrimaryInfo(fields)),
})

export default reduxForm({
  form: 'checkIn',
  fields,
  validate,
},
mapStateToProps,
mapDispatchToProps
)(CheckInForm)
