import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'account',

  getComponent(nextState, next) {

    require.ensure([
        './containers/AccountContainer',
        './modules/account'
      ], (require) => {
      const Account = require('./containers/AccountContainer').default;
      const reducer = require('./modules/account').default;

      injectReducer(store, {
        key: 'account',
        reducer: reducer
      })

      next(null, Account)

    }, 'account')

  }

})
