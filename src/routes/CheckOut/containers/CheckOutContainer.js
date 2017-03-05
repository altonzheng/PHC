import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import CheckOut from '../components/CheckOut'

const mapStateToProps = (state) => ({
  success: state.checkOut.success,
  failure: state.checkOut.failure,
  requesting: state.checkOut.requesting,

  // TODO: Use this event registration to determine which fields need to be surfaced on
  //       the checkout form.
  currentEventRegistration: state.account && state.account.currentEventRegistration,
})

const mapDispatchToProps = (dispatch) => ({
  goToHomePage: () => dispatch(push('/')),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOut)
