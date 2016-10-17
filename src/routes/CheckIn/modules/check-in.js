import { LOCATION_CHANGE } from 'react-router-redux'
import { clearCurrentAccount } from '../../Account/modules/account'

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

export function updateInfoFailure (err, id, info) {
  return {
    type: UPDATE_INFO_FAILURE,
    payload: {
      id,
      info,
    }
  }
}

function updateInfoRetryRequest () {
  return {
    type: UPDATE_INFO_RETRY_REQUEST,
  }
}

function updateInfoRetrySuccess (id) {
  return {
    type: UPDATE_INFO_RETRY_SUCCESS,
    payload: {
      id,
    },
  }
}

function updateInfoRetryFailure () {
  return {
    type: UPDATE_INFO_RETRY_FAILURE,
  }
}

export function updateInfoRetry (id) {
  return (dispatch, getState) => {
    const state = getState();

    const {
      info,
      attempts
    } = state.checkIn.retries[id];

    dispatch(updateInfoRetryRequest());

    if (attempts >= 3) {
      dispatch(updateInfoRetryFailure())
      throw Error(`Max number of attempts reached for retry`);
    }

    _updateInfo(info)
    .then(() => dispatch(updateInfoRetrySuccess(id)))
    .catch(() => {
      dispatch(updateInfoRetryFailure())
      setTimeout(() => dispatch(updateInfoRetry(id)), 3000)
    })
  }
}

export function resetForm () {
  return {
    type: RESET_FORM,
  }
}

function _updateInfo ({ fields, id }) {
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
  });
}

export function updateInfo (info) {
  return dispatch => {
    _updateInfo(info)
    .then(() => dispatch(updateInfoSuccess()))
    .then(() => dispatch(clearCurrentAccount()))
    .catch(err => {
      const id = generateRandomId()
      console.warn(`Unable to update info, sending to retry queue with id ${id}.`)
      dispatch(updateInfoFailure(err, id, info))
      setTimeout(() => dispatch(updateInfoRetry(id), 3000))
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

function generateRandomId () {
  return Math.floor(Math.random() * 10000000000);
}

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
    const retries = {
      ...state.retries,
    }

    let attempts = 0;
    if (retries[action.payload.id]) {
      attempts = retries[action.payload.id];
    }

    attempts += 1;

    retries[action.payload.id] = {
      info: action.payload,
      attempts: 1,
    };

    return {
      ...state,
      requesting: false,
      success: false,
      failure: true,
      retries,
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

  [UPDATE_INFO_RETRY_SUCCESS]: (state, action) => {
    const retries = {
      ...state.retries,
    }

    delete retries[action.payload.id];

    return {
      ...state,
      retries,
    }
  },

  [UPDATE_INFO_RETRY_FAILURE]: (state, action) => {
    const retries = {
      ...state.retries,
    }

    retries[action.payload.id] = {
      ...retries[action.payload.id],
      attempts: retries[action.payload.id] + 1,
    };

    return {
      ...state,
      retries,
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
  retries: {},
}

export default function checkInReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
