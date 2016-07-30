import { injectReducer } from '../../store/reducers'
import requireAuth from '../Login/utils'

export default (store) => ({
  path: 'check-in',
  getComponent (nextState, cb) {
    require.ensure([
        './components/CheckIn',
        './modules/check-in',
      ], (require) => {
      const CheckIn = require('./components/CheckIn').default
      const reducer = require('./modules/check-in').default

      injectReducer(store, {
        key: 'checkIn', reducer
      })

      cb(null, CheckIn)
    }, 'check-in')
  }
})
