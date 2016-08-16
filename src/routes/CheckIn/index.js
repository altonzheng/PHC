import { injectReducer } from '../../store/reducers'
import requireAuth from '../Login/utils'

export default (store) => ({
  path: 'check-in',
  getComponent (nextState, cb) {
    require.ensure([
        './containers/CheckInContainer',
        './modules/check-in',
      ], (require) => {
      const CheckIn = require('./containers/CheckInContainer').default
      const reducer = require('./modules/check-in').default

      injectReducer(store, {
        key: 'checkIn',
        reducer
      })

      cb(null, CheckIn)
    }, 'check-in')
  },
  onEnter: requireAuth(store),
})
