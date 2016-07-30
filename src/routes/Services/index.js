import { injectReducer } from '../../store/reducers'
import requireAuth from '../Login/utils'

export default (store) => ({
  path: 'services',
  getComponent (nextState, cb) {
    require.ensure([
        './containers/ServicesContainer',
        './modules/services',
      ], (require) => {
      const Services = require('./containers/ServicesContainer').default
      const reducer = require('./modules/services').default

      injectReducer(store, {
        key: 'services',
        reducer
      })

      cb(null, Services)
    }, 'services')
  },
  onEnter: requireAuth(store),
})
