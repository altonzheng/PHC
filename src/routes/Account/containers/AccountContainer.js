import { connect } from 'react-redux'

import Account from '../components/Account'

const mapStateToProps = (state) => ({
  station: state.station.station,
})

export default connect(mapStateToProps)(Account)
