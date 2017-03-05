import { connect } from 'react-redux'
import { loadAccountData, searchForAccount } from '../modules/account'
import SearchBar from '../components/SearchBar'

const mapStateToProps = (state) => ({
  fetching: state.account.fetching,
  currentAccount: state.account.currentAccount,
  searching: state.account.searching,
  searchResults: state.account.searchResults,
  station: state.station.station,
})

const mapDispatchToProps = (dispatch) => ({
  loadAccountData: (id, nextUrl) => dispatch(loadAccountData(id, nextUrl)),
  searchForAccount: (name) => dispatch(searchForAccount(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
