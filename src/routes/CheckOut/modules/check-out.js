import {LOCATION_CHANGE} from 'react-router-redux'

import {phcFetch} from '../../../utils/fetch'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_EVENT_REGISTRATION_REQUEST = 'check-out/UPDATE_EVENT_REGISTRATION_REQUEST'
export const UPDATE_EVENT_REGISTRATION_SUCCESS = 'check-out/UPDATE_EVENT_REGISTRATION_SUCCESS'
export const UPDATE_EVENT_REGISTRATION_FAILURE = 'check-out/UPDATE_EVENT_REGISTRATION_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

function updateEventRegistrationRequest () {
  return {
    type: UPDATE_EVENT_REGISTRATION_REQUEST,
  }
}

function updateEventRegistrationSuccess () {
  return {
    type: UPDATE_EVENT_REGISTRATION_SUCCESS,
  }
}

function updateEventRegistrationFailure (error) {
  return {
    type: UPDATE_EVENT_REGISTRATION_FAILURE,
    error: error.toString(),
  }
}

export function updateEventRegistration ({ fields, id }) {
  return dispatch => {
    dispatch(updateEventRegistrationRequest())

    // Transform form values
    const payload = {}
    for (const field in fields) {
      payload[field] = fields[field].value
    }

    JSON.stringify({fields: payload})

    return phcFetch(`/api/event-registrations/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        fields: payload,
      }),
    })
      .then(() => dispatch(updateEventRegistrationSuccess()))
      .catch(error => dispatch(updateEventRegistrationFailure(error)))
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [UPDATE_EVENT_REGISTRATION_REQUEST]: (state, action) => {
    return {
      ...state,
      requesting: true,
      success: false,
      failure: false,
    }
  },

  [UPDATE_EVENT_REGISTRATION_FAILURE]: (state, action) => {
    return {
      ...state,
      requesting: false,
      success: false,
      failure: true,
    }
  },

  [UPDATE_EVENT_REGISTRATION_SUCCESS]: (state, action) => {
    return {
      ...state,
      requesting: false,
      success: true,
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
