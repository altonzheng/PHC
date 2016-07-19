import { connect } from 'react-redux'
import { fetchAccounts } from '../modules/account'

import Account from '../components/Account'

const mapActionCreators = {
  fetchAccounts
}

const mapStateToProps = (state) => ({
  accounts: state.account.accounts
})

export default connect(mapStateToProps, mapActionCreators)(Account)
