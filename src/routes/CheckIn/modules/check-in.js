// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_PRIMARY_INFO = 'UPDATE_PRIMARY_INFO'
export const UPDATE_PRIMARY_INFO_SUCCESS = 'UPDATE_PRIMARY_INFO_SUCCESS'
export const UPDATE_PRIMARY_INFO_FAIL = 'UPDATE_PRIMARY_INFO_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function updatePrimaryInfo (fields) {
  return {
    type: UPDATE_PRIMARY_INFO,
    payload: fields,
  }
}


export const actions = {
  updatePrimaryInfo,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_PRIMARY_INFO]: (state, action) => {
    const fields = action.payload

    return Object.assign({}, state, {
      ...fields
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

export default function checkInReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
