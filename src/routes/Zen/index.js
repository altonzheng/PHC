import { injectReducer } from '../../store/reducers'
import * as Zen from './containers/ZenContainer'
import * as zenReducer from './modules/zen'

export default (store) => ({
  path: 'zen',

  getComponent (nextState, next) {
    
    injectReducer(store, {
      key: 'zen',
      reducer: zenReducer
    })

    next(null, Zen)
  }
  
})