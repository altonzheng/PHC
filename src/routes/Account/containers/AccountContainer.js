import { connect } from 'react-redux'
import {
  closeModal
} from '../modules/account'
import Account from '../components/Account'

const mapStateToProps = (state) => ({
  station: state.station.station,
  showModal: state.account.showModal,
  modalMessage: state.account.modalMessage
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
})


export default connect(mapStateToProps, mapDispatchToProps)(Account)
