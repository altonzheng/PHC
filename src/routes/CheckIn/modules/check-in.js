// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_PRIMARY_INFO = 'UPDATE_PRIMARY_INFO'
export const UPDATE_PRIMARY_INFO_SUCCESS = 'UPDATE_PRIMARY_INFO_SUCCESS';
export const UPDATE_PRIMARY_INFO_FAILURE = 'UPDATE_PRIMARY_INFO_FAILURE';
export const CLEAR_PRIMARY_INFO = 'CLEAR_PRIMARY_INFO'

// ------------------------------------
// Actions
// ------------------------------------
export function requestUpdatePrimaryInfo () {
  return {
    type: UPDATE_PRIMARY_INFO,
  }
}

export function updatePrimaryInfoSuccess (fields) {
  return {
    type: UPDATE_PRIMARY_INFO_SUCCESS,
    payload: fields,
  }
}

export function updatePrimaryInfoFailure () {
  return {
    type: UPDATE_PRIMARY_INFO_FAILURE,
  }
}

export function clearPrimaryInfo () {
  return {
    type: CLEAR_PRIMARY_INFO,
    payload: null,
  }
}

export function updatePrimaryInfo (fields) {
  return (dispatch) => {
    dispatch(requestUpdatePrimaryInfo())

    // TODO: Replace this with actual fetch request to server.
    return new Promise((resolve, reject) => {
        window.setTimeout(() => resolve(), 2000)
      }).then(() => {
        dispatch(updatePrimaryInfoSuccess(fields));
      }).catch(() => {
        dispatch(updatePrimaryInfoFailure());
      })
  }
}

export const actions = {
  updatePrimaryInfo,
  clearPrimaryInfo,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

// TODO: Make sure that on network fail, we don't lose all our form data.
// TODO: On network fail, store form state and batch for later submission.
const ACTION_HANDLERS = {
  [UPDATE_PRIMARY_INFO_SUCCESS]: (state, action) => {
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
