import {HANDLE_ADMIN_INPUT} from './'

export function handleAdminInput (formInput) {
  return {
    type: HANDLE_ADMIN_INPUT,
    formInput
  }
}
