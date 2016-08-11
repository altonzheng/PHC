import { connect } from 'react-redux'
import { fetchAccounts, loadAccountData } from '../modules/account'

import Account from '../components/Account'

const mapActionCreators = {
  fetchAccounts,
  loadAccountData
}

const mapStateToProps = (state) => ({
  accounts: state.account.accounts,
  fetching: state.account.fetching,
  currentAccount: state.account.currentAccount
})

export default connect(mapStateToProps, mapActionCreators)(Account)
