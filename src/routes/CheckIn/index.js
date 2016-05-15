import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'check-in',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const CheckIn = require('./containers/CheckInContainer').default
      const reducer = require('./modules/check-in').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'check-in', reducer })

      /*  Return getComponent   */
      cb(null, CheckIn)

    /* Webpack named bundle   */
    }, 'check-in')
  }
})
