import { injectReducer } from '../../store/reducers'
import requireAuth from '../Login/utils'

export default (store) => ({
  path: 'check-out',
  getComponent (nextState, cb) {
    require.ensure(
      [
        './containers/CheckOutContainer',
        './modules/check-out',
      ], (require) => {
      const CheckOut = require('./containers/CheckOutContainer').default
      const reducer = require('./modules/check-out').default

      injectReducer(store, {
        key: 'checkOut',
        reducer,
      })

      cb(null, CheckOut)
    }, 'check-out')
  },
  onEnter: requireAuth(store),
})

