import { injectReducer } from '../../store/reducers'
import requireAuth from '../Login/utils'

export default (store) => ({
  getComponent(nextState, next) {
    require.ensure([
        './components/Account',
        './modules/account',
      ], (require) => {
      const Account = require('./components/Account').default;
      const reducer = require('./modules/account').default;

      injectReducer(store, {
        key: 'account',
        reducer
      })

      next(null, Account)
    }, 'account')
  },
  onEnter: requireAuth(store),
})
