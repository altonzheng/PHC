import { reduxForm, initialize, reset } from 'redux-form'

import CheckOutForm from '../components/CheckOutForm'
import { updateInfo } from '../modules/check-out'
import { clearCurrentAccount } from '../../Account/modules/account'

const fields = [
  'services',
  'satisfaction',
]

const validate = (values) => {
  const errors = {}
  return errors
}

const mapStateToProps = (state) => ({
  initialValues: state.account && state.account.currentAccount,
  currentAccount: state.account && state.account.currentAccount,
  requesting: state.checkOut.requesting,
})

const mapDispatchToProps = (dispatch) => ({
  updateInfo: (fields, id) => dispatch(updateInfo({ fields, id })),
  clearInfo: () => {
    dispatch(clearCurrentAccount())
    dispatch(initialize('checkOut', {}, fields))
    dispatch(reset('checkOut'))
  },
})

export default reduxForm({
  form: 'checkOut',
  fields,
  validate,
},
mapStateToProps,
mapDispatchToProps
)(CheckOutForm)
