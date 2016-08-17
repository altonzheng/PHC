import { connect } from 'react-redux'
import { fetchAccounts, loadAccountData } from '../modules/account'

import Account from '../components/Account'

const mapActionCreators = {
  fetchAccounts,
  loadAccountData
}

const mapStateToProps = (state) => ({
  accounts: window.accounts,
  accountSearcher: window.accountSearcher,
  fetching: state.account.fetching,
  currentAccount: state.account.currentAccount
})

export default connect(mapStateToProps, mapActionCreators)(Account)
