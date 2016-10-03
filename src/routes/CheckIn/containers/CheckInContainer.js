import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import CheckIn from '../components/CheckIn'
import { resetForm } from '../modules/check-in'

const mapStateToProps = (state) => ({
  success: state.checkIn.success,
  failure: state.checkIn.failure,
  requesting: state.checkIn.requesting
})

const mapDispatchToProps = (dispatch) => ({
  goToHomePage: () => dispatch(push('/'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckIn)
