import { push } from 'react-router-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
function loginRequest () {
  return {
    type: LOGIN_REQUEST,
  }
}

function loginSuccess () {
  return {
    type: LOGIN_SUCCESS,
  }
}

function loginFailure () {
  return {
    type: LOGIN_FAILURE,
  }
}

export function login (password) {
  return (dispatch) => {
    dispatch(loginRequest())

    return fetch(
      '/api/login',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ password })
      }
    )
    .then(response => {
      if (response.ok) {
        dispatch(loginSuccess())

        // Redirect to home after successful login
        // @TODO: Redirect to the page that you were on before this
        dispatch(push('/'))
      } else {
        dispatch(loginFailure())
      }
    })
    .catch(() => {
      dispatch(loginFailure())
    })
  }
}

export const actions = {
  login
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_REQUEST]: (state) => ({
    ...state,
    isAuthenticating: true,
    authenticated: false,
  }),
  [LOGIN_SUCCESS]: (state) => ({
    ...state,
    isAuthenticating: false,
    authenticated: true,
  }),
  [LOGIN_FAILURE]: (state) => ({
    ...state,
    isAuthenticating: false,
    authenticated: false,
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isAuthenticating: false,
  authenticated: false,
}

export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
