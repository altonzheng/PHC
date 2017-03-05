import { reduxForm } from 'redux-form'

import CheckOutForm from '../components/CheckOutForm'
import { updateInfo } from '../modules/check-out'

const validate = (values) => {
  const errors = {}
  return errors
}

const mapStateToProps = (state) => ({
  initialValues: state.account && state.account.currentEventRegistration,
  currentEventRegistration: state.account && state.account.currentEventRegistration,
  requesting: state.checkOut.requesting,
})

const mapDispatchToProps = (dispatch) => ({
  updateInfo: (fields, id) => dispatch(updateInfo({ fields, id })),
})

export default reduxForm({
  form: 'checkOut',
  validate,
},
mapStateToProps,
mapDispatchToProps
)(CheckOutForm)
