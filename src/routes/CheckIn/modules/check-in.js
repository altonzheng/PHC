// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_PRIMARY_INFO = 'UPDATE_PRIMARY_INFO'
export const CLEAR_PRIMARY_INFO = 'CLEAR_PRIMARY_INFO'

// ------------------------------------
// Actions
// ------------------------------------
export function updatePrimaryInfo (fields) {
  return {
    type: UPDATE_PRIMARY_INFO,
    payload: fields,
  }
}

export function clearPrimaryInfo () {
  return {
    type: CLEAR_PRIMARY_INFO,
    payload: null,
  }
}


export const actions = {
  updatePrimaryInfo,
  clearPrimaryInfo,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_PRIMARY_INFO]: (state, action) => {
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
