/* @flow */
import { push, LOCATION_CHANGE } from 'react-router-redux'

import { UPDATE_INFO_REQUEST } from '../../CheckIn/modules/check-in'
import { phcFetch } from '../../../utils/fetch'

// ------------------------------------
// Constants
// ------------------------------------
const SEARCH_FOR_ACCOUNT_REQUEST = 'SEARCH_FOR_ACCOUNT_REQUEST'
const SEARCH_FOR_ACCOUNT_SUCCESS = 'SEARCH_FOR_ACCOUNT_SUCCESS'
const SEARCH_FOR_ACCOUNT_FAILURE = 'SEARCH_FOR_ACCOUNT_FAILURE'

const LOAD_ACCOUNT_DATA_REQUEST = 'LOAD_ACCOUNT_DATA_REQUEST'
const LOAD_ACCOUNT_DATA_SUCCESS = 'LOAD_ACCOUNT_DATA_SUCCESS'
const LOAD_ACCOUNT_DATA_FAILURE = 'LOAD_ACCOUNT_DATA_FAILURE'

const LOAD_EVENT_REGISTRATION_REQUEST = 'LOAD_EVENT_REGISTRATION_REQUEST'
const LOAD_EVENT_REGISTRATION_SUCCESS = 'LOAD_EVENT_REGISTRATION_SUCCESS'
const LOAD_EVENT_REGISTRATION_FAILURE = 'LOAD_EVENT_REGISTRATION_FAILURE'

const CLEAR_CURRENT_ACCOUNT = 'CLEAR_CURRENT_ACCOUNT'

const CLOSE_MODAL = 'CLOSE_MODAL'

// ------------------------------------
// Actions
// ------------------------------------
export function searchForAccountRequest(name) {
  return {
    type: SEARCH_FOR_ACCOUNT_REQUEST,
    name: name,
  }
}

export function searchForAccountSuccess(accounts) {
  return {
    type: SEARCH_FOR_ACCOUNT_SUCCESS,
    payload: {
      accounts,
    },
  }
}

export function searchForAccountFailure(error) {
  return {
    type: SEARCH_FOR_ACCOUNT_FAILURE,
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

export function searchForAccount(name) {
  return (dispatch) => {
    dispatch(searchForAccountRequest(name))
    return fetch(`/api/accounts/search?name=${name}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error('Account search error!')
        }
      })
      .then(data => dispatch(searchForAccountSuccess(data.payload.accounts)))
      .catch(err => dispatch(searchForAccountFailure(err)))
  }
}

export function loadAccountData(id) {
  return (dispatch) => {
    dispatch(loadAccountDataRequest(id))
    return phcFetch(`/api/accounts/${id}`)
      .then(data => {
        // redux-form expects string-like inputs, so convert booleans to their string representations
        const account = data.payload.account

        for (const key in account) {
          if (typeof account[key] === 'boolean') {
            account[key] = account[key].toString()
          }
        }

        return account
      })
      .then(data => dispatch(loadAccountDataSuccess(data)))
      .then(_ => dispatch(push('/check-in')))
      .catch(err => dispatch(loadAccountDataFailure(err)))
  }
}

function loadEventRegistrationRequest(id) {
  return {
    type: LOAD_EVENT_REGISTRATION_REQUEST,
    payload: {
      id,
    },
  }
}

function loadEventRegistrationSuccess(eventRegistration) {
  return {
    type: LOAD_EVENT_REGISTRATION_SUCCESS,
    payload: {
      eventRegistration,
    },
  }
}

function loadEventRegistrationFailure(error) {
  return {
    type: LOAD_EVENT_REGISTRATION_FAILURE,
    error,
  }
}

export function loadEventRegistration(accountId) {
  return dispatch => {
    dispatch(loadEventRegistrationRequest(accountId))
    return phcFetch(`/api/event-registrations/?accountId=${accountId}`)
      .then(data => {
        const eventRegistration = data.payload.eventRegistration
        dispatch(loadEventRegistrationSuccess(eventRegistration))
      })
      .then(_ => dispatch(push('/check-out')))
      .catch(error => dispatch(loadEventRegistrationFailure(error)))
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export const actions = {
  loadAccountData,
  loadEventRegistration,
  searchForAccount,
  closeModal
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
  [LOAD_EVENT_REGISTRATION_REQUEST]: (state, action) => {
    return ({
      ...state,
      currentEventRegistration: null,
      fetching: true,
      error: null,
    })
  },
  [LOAD_EVENT_REGISTRATION_SUCCESS]: (state, action) => {
    return ({
      ...state,
      currentEventRegistration: action.payload.eventRegistration,
      fetching: false,
      error: null
    })
  },
  [LOAD_EVENT_REGISTRATION_FAILURE]: (state, action) => {
    return ({
      ...state,
      currentEventRegistration: null,
      fetching: false,
      error: action.error.message,
      showModal: true,
      modalMessage: "Event registration not found for this account 😞"
    })
  },
  [CLEAR_CURRENT_ACCOUNT]: (state, action) => {
    return ({
      ...state,
      currentAccount: null,
    })
  },
  [UPDATE_INFO_REQUEST]: (state, action) => {
    return ({
      ...state,
      searchResults: [],
    })
  },
  [LOCATION_CHANGE]: (state, action) => {
    if (action.payload.hash === '#new') {
      return ({
        ...state,
        currentAccount: null,
      })
    }
    return state
  },
  [CLOSE_MODAL]: (state, action) => {
    return ({
      ...state,
      showModal: false,
      modalMessage: '',
      error: null
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentAccount: null,
  currentEventRegistration: null,
  fetching: false,
  error: null,
  searching: false,
  searchResults: [],
  showModal: false,
  modalMessage: ''
}
export default function accountReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
