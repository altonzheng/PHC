import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import normalizers from '../utils/normalizers'
import stationReducer from '../modules/station.js'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    form: formReducer.normalize({
      checkIn: {
        socialSecurityNumber: normalizers.ssn,
        phoneNumber: normalizers.phone,
        dateOfBirth: normalizers.dob,
      },
    }),
    ...asyncReducers,
    station: stationReducer,
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
