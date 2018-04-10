import React from 'react'
import { setAdminAuthenticated, showAdminErrors } from '../store/actions/admin'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class AdminLogout extends React.Component {
  static propTypes = {
    setAdminAuthenticated: PropTypes.func,
    showAdminErrors: PropTypes.func
  }

  /*
    Sets the state such that Admin Component is re-rendered but this time with
    Admin login form instead of the home page
  */
  handleClick (e) {
    e.preventDefault()
    this.props.setAdminAuthenticated({isAuthenticated: false})
    this.props.showAdminErrors({errors: {}})
  }

  render () {
    return (
      <button className="admin-logout-btn" onClick={e => this.handleClick(e)}>
        Logout
      </button>
    )
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.admin.isAuthenticated
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setAdminAuthenticated: (authenticated) => dispatch(setAdminAuthenticated(authenticated)),
    showAdminErrors: (errors) => dispatch(showAdminErrors(errors))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogout)
