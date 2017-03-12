import { connect } from 'react-redux'

import * as STATIONS from '../../../constants/stations'
import {
  loadAccountData,
  loadEventRegistration,
  searchForAccount,
} from '../modules/account'
import SearchBar from '../components/SearchBar'

const mapStateToProps = (state) => ({
  fetching: state.account.fetching,
  currentAccount: state.account.currentAccount,
  currentEventRegistration: state.account.currentEventRegistration,
  searching: state.account.searching,
  searchResults: state.account.searchResults,
  station: state.station.station,
})

const mapDispatchToProps = (dispatch) => ({
  loadAccountData: (id) => dispatch(loadAccountData(id)),
  loadEventRegistration: (id) => dispatch(loadEventRegistration(id)),
  searchForAccount: (name) => dispatch(searchForAccount(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
