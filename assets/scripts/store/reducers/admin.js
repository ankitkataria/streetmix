import {HANDLE_ADMIN_INPUT, SHOW_ADMIN_ERRORS, SET_ADMIN_AUTHENTICATED} from '../actions'

const initialState = {
  adminEmail: null,
  adminName: null,
  adminDOB: null,
  errors: {},
  isAuthenticated: false
}

const admin = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_ADMIN_INPUT:
      return {
        ...state,
        ...action.formInput
      }
    case SHOW_ADMIN_ERRORS:
      return {
        ...state,
        ...action.errors
      }
    case SET_ADMIN_AUTHENTICATED:
      return {
        ...state,
        ...action.authenticated
      }
    default:
      return state
  }
}

export default admin
