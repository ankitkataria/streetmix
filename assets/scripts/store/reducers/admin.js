import {HANDLE_ADMIN_INPUT} from '../actions'

const initialState = {
  adminEmail: null,
  adminName: null,
  adminDOB: null
}

const admin = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_ADMIN_INPUT:
      return {
        ...state,
        ...action.formInput
      }
    default:
      return state
  }
}

export default admin
