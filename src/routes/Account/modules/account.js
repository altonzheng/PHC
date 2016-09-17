/* @flow */
import { push } from 'react-router-redux'

// ------------------------------------
// Constants
// ------------------------------------
const SEARCH_FOR_ACCOUNT_REQUEST = 'SEARCH_FOR_ACCOUNT_REQUEST'
const SEARCH_FOR_ACCOUNT_SUCCESS = 'SEARCH_FOR_ACCOUNT_SUCCESS'
const SEARCH_FOR_ACCOUNT_FAILURE = 'SEARCH_FOR_ACCOUNT_FAILURE'

const LOAD_ACCOUNT_DATA_REQUEST = 'LOAD_ACCOUNT_DATA_REQUEST'
const LOAD_ACCOUNT_DATA_SUCCESS = 'LOAD_ACCOUNT_DATA_SUCCESS'
const LOAD_ACCOUNT_DATA_FAILURE = 'LOAD_ACCOUNT_DATA_FAILURE'

const CLEAR_CURRENT_ACCOUNT = 'CLEAR_CURRENT_ACCOUNT'

// ------------------------------------
// Actions
// ------------------------------------
export function searchForAccountRequest(name) {
  return {
    type: SEARCH_FOR_ACCOUNT_REQUEST,
    name: name
  }
}

export function searchForAccountSuccess(accounts) {
  return {
    type: SEARCH_FOR_ACCOUNT_SUCCESS,
    payload: {
      accounts
    }
  }
}

export function searchForAccountFailure(error) {
  return {
    type: SEARCH_FOR_ACCOUNT_FAILURE,
    error
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

export function searchForAccount(name) {
  return (dispatch) => {
    dispatch(searchForAccountRequest(name))
    return fetch(`/api/accounts/search?name=${name}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw "Account search error!"
        }
      })
      .then(data => dispatch(searchForAccountSuccess(data.payload.accounts)))
      .catch(err => dispatch(searchForAccountFailure(err)));
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
          throw "Load account data error!"
        }
      })
      .then(data => dispatch(loadAccountDataSuccess(data.payload.account)))
      .then(res => dispatch(push('/check-in')))
      .catch(err => dispatch(loadAccountDataFailure(err)))
  }
}

export const actions = {
  loadAccountData,
  searchForAccount
}

const ACTION_HANDLERS = {
  [SEARCH_FOR_ACCOUNT_REQUEST]: (state) => {
    return ({
      ...state,
      searchResults: [],
      searching: true,
      error: null,
    })
  },
  [SEARCH_FOR_ACCOUNT_SUCCESS]: (state, action) => {
    return ({
      ...state,
      searchResults: action.payload.accounts,
      searching: false,
      error: null,
    })
  },
  [SEARCH_FOR_ACCOUNT_FAILURE]: (state, action) => {
    return ({
      ...state,
      searchResults: [],
      searching: false,
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
  currentAccount: null,
  fetching: false,
  error: null,
  searching: false,
  searchResults: []
}
export default function accountReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
