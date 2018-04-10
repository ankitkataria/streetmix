import {HANDLE_ADMIN_INPUT, SHOW_ADMIN_ERRORS, SET_ADMIN_AUTHENTICATED} from './'

export function handleAdminInput (formInput) {
  return {
    type: HANDLE_ADMIN_INPUT,
    formInput
  }
}

export function showAdminErrors (errors) {
  return {
    type: SHOW_ADMIN_ERRORS,
    errors
  }
}

export function setAdminAuthenticated (authenticated) {
  return {
    type: SET_ADMIN_AUTHENTICATED,
    authenticated
  }
}
