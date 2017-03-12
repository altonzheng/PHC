import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import CheckOut from '../components/CheckOut'

const mapStateToProps = (state) => ({
  success: state.checkOut.success,
  failure: state.checkOut.failure,
  requesting: state.checkOut.requesting,
  currentEventRegistration: state.account && state.account.currentEventRegistration,
})

const mapDispatchToProps = (dispatch) => ({
  goToHomePage: () => dispatch(push('/')),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOut)
