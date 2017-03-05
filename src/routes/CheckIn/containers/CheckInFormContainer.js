import { reduxForm, initialize, reset } from 'redux-form'

import CheckInForm from '../components/CheckInForm'
import { updateInfo } from '../modules/check-in'
import { clearCurrentAccount } from '../../Account/modules/account'
import { validEmailRegex } from '../../../utils/regex'

const fields = [
  'firstName',
  'lastName',
  'socialSecurityNumber',
  'dateOfBirth',
  'phoneNumber',
  'emailAddress',

  'gender',
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

  if (values.socialSecurityNumber) {
    if (
      values.socialSecurityNumber.length < 11 &&
        !(
          values.socialSecurityNumber.length === 4 &&
            values.socialSecurityNumber.replace(/^\D+/g, '').length === 4
        )
    ) {
      errors.socialSecurityNumber = 'Incomplete'
    }
  }

  if (values.phoneNumber && values.phoneNumber.length < 14) {
    errors.phoneNumber = 'Incomplete'
  }

  if (values.emailAddress && !validEmailRegex.test(values.emailAddress)) {
    errors.emailAddress = 'Invalid'
  }

  return errors
}

// TODO: Revise the way data flows here; it doesn't make a whole lot of sense for us to have to know about another state.
const mapStateToProps = (state) => ({
  initialValues: state.account && state.account.currentAccount,
  currentAccount: state.account && state.account.currentAccount,
  requesting: state.checkIn.requesting,
})

const mapDispatchToProps = (dispatch) => ({
  updateInfo: (fields, id) => dispatch(updateInfo({ fields, id })),
  clearInfo: () => {
    dispatch(clearCurrentAccount())
    dispatch(initialize('checkIn', {}, fields))
    dispatch(reset('checkIn'))
  },
})

export default reduxForm({
  form: 'checkIn',
  fields,
  validate,
},
mapStateToProps,
mapDispatchToProps
)(CheckInForm)
