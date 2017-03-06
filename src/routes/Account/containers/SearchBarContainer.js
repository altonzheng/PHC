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
  loadAccountData: (id, nextUrl) => dispatch(loadAccountData(id, nextUrl)),
  loadEventRegistration: (id, nextUrl) => dispatch(loadEventRegistration(id, nextUrl)),
  searchForAccount: (name) => dispatch(searchForAccount(name)),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchBar)
