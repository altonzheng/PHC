import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'zen',

  getComponent (nextState, next) {

    require.ensure([], (require) => {
      const Zen = require('./containers/ZenContainer').default
      const reducer = require('./modules/zen').default

      injectReducer(store, {
        key: 'zen',
        reducer: reducer
      })

      next(null, Zen)

    }, 'zen')

  }

})
