import { LOAD_ACCOUNT_DATA_SUCCESS } from '../../Account/modules/account'
import { clearCurrentAccount } from '../../Account/modules/account'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_INFO_REQUEST = 'UPDATE_INFO_REQUEST'
export const UPDATE_INFO_SUCCESS = 'UPDATE_INFO_SUCCESS'
export const UPDATE_INFO_FAILURE = 'UPDATE_INFO_FAILURE'
export const CLEAR_PRIMARY_INFO = 'CLEAR_PRIMARY_INFO'

// ------------------------------------
// Actions
// ------------------------------------

// TODO: Change this from Primary Info to just Info or something
export function updateInfoRequest () {
  return {
    type: UPDATE_INFO_REQUEST,
  }
}

export function updateInfoSuccess (fields) {
  return {
    type: UPDATE_INFO_SUCCESS,
    payload: fields,
  }
}

export function updateInfoFailure () {
  return {
    type: UPDATE_INFO_FAILURE,
  }
}

export function clearInfo () {
  return {
    type: CLEAR_PRIMARY_INFO,
    payload: null,
  }
}

export function updateInfo (fields, id) {
  return (dispatch) => {
    console.log("UPDATE INFO");

    let method = id ? 'PUT' : 'POST'
    let endpoint = id ? `/api/accounts/${id}` : `/api/accounts`

    return fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      body: JSON.stringify({ fields }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        dispatch(updateInfoFailure())
      }
    })
    .then(data => dispatch(updateInfoSuccess(fields, data.payload.account)))
    .then(() => dispatch(clearCurrentAccount()))
    .catch(() => dispatch(updateInfoFailure()))
  }
}

export const actions = {
  updateInfo,
  clearInfo,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

// TODO: Make sure that on network fail, we don't lose all our form data.
// TODO: On network fail, store form state and batch for later submission.
const ACTION_HANDLERS = {
  [UPDATE_INFO_SUCCESS]: (state, action) => {
    const fields = action.payload

    // primaryInfo: { ... } - contains personal identifying information
    return Object.assign({}, state, {
      primaryInfo: {
        ...fields
      },
    })
  },
  [CLEAR_PRIMARY_INFO]: (state, action) => {
    const newState = Object.assign({}, state)
    delete newState.primaryInfo
    return newState
  },
  [LOAD_ACCOUNT_DATA_SUCCESS]: (state, action) => {
    // Action dispatched when we successfully fetched an account's info
    // We prepopulate the form with personal details
    return Object.assign({}, state, {
      primaryInfo: action.payload.account
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { primaryInfo: {} }

export default function checkInReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
