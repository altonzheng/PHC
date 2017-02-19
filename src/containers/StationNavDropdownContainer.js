import { connect } from 'react-redux'

import { actions } from '../modules/station.js'
import StationNavDropdown from '../components/StationNavDropdown'

const mapStateToProps = (state) => ({
  station: state.station.station,
})

const mapDispatchToProps = (dispatch) => ({
  updateStation: (station) => dispatch(actions.updateStation(station)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationNavDropdown)
