import { LOCATION_CHANGE } from 'react-router-redux'
import { clearCurrentAccount } from '../../Account/modules/account'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_INFO_REQUEST = 'UPDATE_INFO_REQUEST'
export const UPDATE_INFO_SUCCESS = 'UPDATE_INFO_SUCCESS'
export const UPDATE_INFO_FAILURE = 'UPDATE_INFO_FAILURE'
export const RESET_FORM = 'RESET_FORM'

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

export function resetForm () {
  return {
    type: RESET_FORM,
  }
}

export function updateInfo (fields, id) {
  return (dispatch) => {
    dispatch(updateInfoRequest(name))
    let method = id ? 'PUT' : 'POST'
    let endpoint = id ? `/api/accounts/${id}` : `/api/accounts`

    return fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      body: JSON.stringify({ fields }),
    })
    .then(response => {
      if (!response.ok) {
        throw Error('Unable to update info')
      }
    })
    .then(() => dispatch(updateInfoSuccess()))
    .then(() => dispatch(clearCurrentAccount()))
    .catch(err => dispatch(updateInfoFailure(err)))
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

// TODO: Make sure that on network fail, we don't lose all our form data.
// TODO: On network fail, store form state and batch for later submission.
const ACTION_HANDLERS = {
  [UPDATE_INFO_REQUEST]: (state, action) => {
    return {
      ...state,
      requesting: true,
      success: false,
      failure: false,
    }
  },

  [UPDATE_INFO_FAILURE]: (state, action) => {
    return {
      ...state,
      requesting: false,
      success: false,
      failure: true,
    }
  },

  [UPDATE_INFO_SUCCESS]: (state, action) => {
    return {
      ...state,
      requesting: false,
      success: true,
      failure: false,
    }
  },

  [RESET_FORM]: (state, action) => {
    return {
      ...state,
      requesting: false,
      success: false,
      failure: false,
    }
  },

  [LOCATION_CHANGE]: (state, action) => {
    return {
      ...state,
      success: false,
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  requesting: false,
  success: false,
  failure: false,
}

export default function checkInReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
