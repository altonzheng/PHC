/* @flow */

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS'
export const REQUEST_ACCOUNTS_SUCCESS = 'REQUEST_ACCOUNTS_SUCCESS'
export const REQUEST_ACCOUNTS_FAILURE = 'REQUEST_ACCOUNTS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function requestAccounts() {
  return {
    type: REQUEST_ACCOUNTS
  }
}

export function requestAccountsSuccess(value) {
  return {
    type: REQUEST_ACCOUNTS_SUCCESS,
    payload: value
  }
}

export function requestAccountsFailure(error) {
  return {
    type: REQUEST_ACCOUNTS_FAILURE,
    error: error
  }
}

export const fetchAccounts = (): Function => {
  return (dispatch: Function): Promise => {
    dispatch(requestAccounts());

    return fetch('/api/accounts')
      .then(data => data.text())
      .then(text => {
        try {
          dispatch(requestAccountsSuccess(JSON.parse(text).records));
        } catch(err) {
          dispatch(requestAccountsFailure(err));
        }
      })
  }
}

export const actions = {
  requestAccounts,
  requestAccountsSuccess,
  requestAccountsFailure,
  fetchAccounts
}

const ACCOUNT_ACTION_HANDLERS = {
  [REQUEST_ACCOUNTS]: (state) => {
    return ({...state, accounts: [], fetching: true})
  },
  [REQUEST_ACCOUNTS_SUCCESS]: (state, action) => {
    return ({...state, accounts: action.payload, fetching: false})
  },
  [REQUEST_ACCOUNTS_FAILURE]: (state, action) => {
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
