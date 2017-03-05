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
  _station: state.station.station,
})

const mapDispatchToProps = (dispatch) => ({
  _loadAccountData: (id, nextUrl) => dispatch(loadAccountData(id, nextUrl)),
  _loadEventRegistration: (id, nextUrl) => dispatch(loadEventRegistration(id, nextUrl)),
  searchForAccount: (name) => dispatch(searchForAccount(name)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const props = {}
  Object.assign(props, ownProps, stateProps, dispatchProps)

  if (props._station === STATIONS.CHECK_IN) {
    props.load = (id) => dispatchProps._loadAccountData(id, '/check-in')
  } else if (props._station === STATIONS.CHECK_OUT) {
    props.load = (id) => dispatchProps._loadEventRegistration(id, '/check-out')
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchBar)
