import { connect } from 'react-redux'
import { loadAccountData, searchForAccount } from '../modules/account'
import SearchBar from '../components/SearchBar'

const mapActionCreators = {
  loadAccountData,
  searchForAccount
}

const mapStateToProps = (state) => ({
  fetching: state.account.fetching,
  currentAccount: state.account.currentAccount,
  searching: state.account.searching,
  searchResults: state.account.searchResults
})

export default connect(mapStateToProps, mapActionCreators)(SearchBar)
