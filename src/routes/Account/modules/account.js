/* @flow */
import { push } from 'react-router-redux'
import Fuse from 'fuse.js'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST'
const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS'
const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE'

const LOAD_ACCOUNT_DATA_REQUEST = 'LOAD_ACCOUNT_DATA_REQUEST'
const LOAD_ACCOUNT_DATA_SUCCESS = 'LOAD_ACCOUNT_DATA_SUCCESS'
const LOAD_ACCOUNT_DATA_FAILURE = 'LOAD_ACCOUNT_DATA_FAILURE'

const CLEAR_CURRENT_ACCOUNT = 'CLEAR_CURRENT_ACCOUNT'

// ------------------------------------
// Actions
// ------------------------------------
export function fetchAccountsRequest() {
  return {
    type: FETCH_ACCOUNTS_REQUEST
  }
}

export function fetchAccountsSuccess(accounts) {
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    payload: {
      accounts,
    },
  }
}

export function fetchAccountsFailure(error) {
  return {
    type: FETCH_ACCOUNTS_FAILURE,
    error,
  }
}

export function loadAccountDataRequest(id) {
  return {
    type: LOAD_ACCOUNT_DATA_REQUEST,
    payload: {
      id,
    },
  }
}

export function loadAccountDataSuccess(account) {
  return {
    type: LOAD_ACCOUNT_DATA_SUCCESS,
    payload: {
      account,
    },
  }
}

export function loadAccountDataFailure(error) {
  return {
    type: LOAD_ACCOUNT_DATA_FAILURE,
    error,
  }
}

export function clearCurrentAccount() {
  return {
    type: CLEAR_CURRENT_ACCOUNT,
    payload: null,
  }
}

export function fetchAccounts(id) {
  return (dispatch) => {
    dispatch(fetchAccountsRequest(id))
    return fetch('/api/accounts')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          dispatch(fetchAccountsFailure())
        }
      })
      .then(data => {
        // Use Fuse.js to create a fuzzy searchable index of accounts
        const fuse = new Fuse(data.payload.accounts, {
          keys: ["name"],
          threshold: 0.5
        })

        // Attach Fuse to window, because it slows down redux.
        // There is definitely a better way to do this.
        window.accountSearcher = fuse
        window.accounts = data.payload.accounts

        dispatch(fetchAccountsSuccess(data.payload.accounts))
      })
      // .catch(err => dispatch(fetchAccountsFailure(err)))
  }
}

export function loadAccountData(id) {
  return (dispatch) => {
    dispatch(loadAccountDataRequest(id))
    return fetch(`/api/accounts/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          dispatch(loadAccountDataFailure())
        }
      })
      .then(data => dispatch(loadAccountDataSuccess(data.payload.account)))
      .then(res => dispatch(push('/check-in')))
      .catch(err => dispatch(loadAccountDataFailure(err)))
  }
}

export const actions = {
  fetchAccounts,
  loadAccountData
}

const ACTION_HANDLERS = {
  [FETCH_ACCOUNTS_REQUEST]: (state) => {
    return ({
      ...state,
      accounts: [],
      fetching: true,
      error: null,
    })
  },
  [FETCH_ACCOUNTS_SUCCESS]: (state, action) => {
    return ({
      ...state,
      // accounts: action.payload.accounts,
      fetching: false,
      error: null,
    })
  },
  [FETCH_ACCOUNTS_FAILURE]: (state, action) => {
    return ({
      ...state,
      accounts: [],
      fetching: false,
      error: action.error.message,
    })
  },
  [LOAD_ACCOUNT_DATA_REQUEST]: (state, action) => {
    return ({
      ...state,
      currentAccount: null,
      fetching: true,
      error: null,
    })
  },
  [LOAD_ACCOUNT_DATA_SUCCESS]: (state, action) => {
    return ({
      ...state,
      currentAccount: action.payload.account,
      fetching: false,
      error: null,
    })
  },
  [LOAD_ACCOUNT_DATA_FAILURE]: (state, action) => {
    return ({
      ...state,
      currentAccount: null,
      fetching: false,
      error: action.error.message,
    })
  },
  [CLEAR_CURRENT_ACCOUNT]: (state, action) => {
    return ({
      ...state,
      currentAccount: null,
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  accounts: [],
  currentAccount: null,
  fetching: false,
  error: null,
}
export default function accountReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
