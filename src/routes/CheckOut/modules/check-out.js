import { LOCATION_CHANGE } from 'react-router-redux'

import { phcFetch } from '../../../utils/fetch'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_INFO_REQUEST = 'check-out/UPDATE_INFO_REQUEST'
export const UPDATE_INFO_SUCCESS = 'check-out/UPDATE_INFO_SUCCESS'
export const UPDATE_INFO_FAILURE = 'check-out/UPDATE_INFO_FAILURE'

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

export function updateInfoFailure (error) {
  return {
    type: UPDATE_INFO_FAILURE,
    error,
  }
}

export function resetForm () {
  return {
    type: RESET_FORM,
  }
}

export function updateInfo ({ fields, id }) {
  return dispatch => {
    dispatch(updateInfoRequest())

    return phcFetch(`/api/event-registrations/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ fields }),
    })
      .then(() => dispatch(updateInfoSuccess()))
      .catch(error => dispatch(updateInfoFailure(error)))
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
