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

export function updateInfo (fields) {
  return (dispatch) => {
    dispatch(updateInfoRequest())

    // TODO: Replace this with actual fetch request to server.
    return new Promise((resolve, reject) => {
        window.setTimeout(() => resolve(), 2000)
      }).then(() => {
        dispatch(updateInfoSuccess(fields))
      }).catch(() => {
        dispatch(updateInfoFailure())
      })
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
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

export default function checkInReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
