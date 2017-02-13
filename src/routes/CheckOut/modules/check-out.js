import { LOCATION_CHANGE } from 'react-router-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_INFO_REQUEST = 'check-in/UPDATE_INFO_REQUEST'
export const UPDATE_INFO_SUCCESS = 'check-in/UPDATE_INFO_SUCCESS'
export const UPDATE_INFO_FAILURE = 'check-in/UPDATE_INFO_FAILURE'

export const UPDATE_INFO_RETRY_REQUEST = 'check-in/UPDATE_INFO_RETRY_REQUEST'
export const UPDATE_INFO_RETRY_SUCCESS = 'check-in/UPDATE_INFO_RETRY_SUCCESS'
export const UPDATE_INFO_RETRY_FAILURE = 'check-in/UPDATE_INFO_RETRY_FAILURE'

export const RESET_FORM = 'RESET_FORM'

// ------------------------------------
// Actions
// ------------------------------------

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

export function updateInfoFailure (err, id, info) {
  return {
    type: UPDATE_INFO_FAILURE,
    payload: {
      id,
      info,
    },
  }
}

export function resetForm () {
  return {
    type: RESET_FORM,
  }
}

function _updateInfo ({ fields, id }) {
  let method = id ? 'PUT' : 'POST'
  let endpoint = id ? `/api/accounts/${id}` : '/api/accounts'

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
}

export function updateInfo (info) {
  return dispatch => {
    dispatch(updateInfoRequest())

    _updateInfo(info)
      .then(() => dispatch(updateInfoSuccess()))
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

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
  },
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
