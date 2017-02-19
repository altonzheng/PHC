// ------------------------------------
// Constants
// ------------------------------------
const UPDATE_STATION = 'station/UPDATE_STATION'

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
  updateStation: function(station) {
    return {
      type: UPDATE_STATION,
      payload: {
        station,
      },
    }
  },
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_STATION]: (state, action) => {
    return {
      ...state,
      station: action.payload.station,
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  station: 'check-in',
}

export default function stationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
