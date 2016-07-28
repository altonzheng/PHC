/* @flow */

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST'
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS'
export const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function fetchAccountsRequest() {
  return {
    type: FETCH_ACCOUNTS_REQUEST,
  }
}

export function fetchAccountsSuccess(value) {
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    payload: value
  }
}

export function fetchAccountsFailure(error) {
  return {
    type: FETCH_ACCOUNTS_FAILURE,
    error: error
  }
}

export const fetchAccounts = (): Function => {
  return (dispatch: Function): Promise => {
    dispatch(fetchAccountsRequest())

    return fetch('/api/accounts')
      .then(data => data.text())
      .then(text => dispatch(fetchAccountsSuccess(JSON.parse(text).records)))
      .catch(err => dispatch(fetchAccountsFailure(err)))
  }
}

export const actions = {
  fetchAccounts
}

const ACCOUNT_ACTION_HANDLERS = {
  [FETCH_ACCOUNTS_REQUEST]: (state) => {
    return ({...state, accounts: [], fetching: true})
  },
  [FETCH_ACCOUNTS_SUCCESS]: (state, action) => {
    return ({...state, accounts: action.payload, fetching: false})
  },
  [FETCH_ACCOUNTS_FAILURE]: (state, action) => {
    return ({...state, error: action.error, fetching: false})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { accounts: [], fetching: false }
export default function accountReducer(state = initialState, action) {
  const handler = ACCOUNT_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
