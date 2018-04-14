import React from 'react'
import AdminLoginForm from './AdminLoginForm'
import AdminHome from './AdminHome'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Admin extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  render () {
  /*
     Renders the Admin Login form if User is not authenticated as Admin
     else renders Admin home page
  */
    if (!this.props.isAuthenticated) {
      return (
        <React.Fragment>
          <div className="clouds-background--admin">
            <div className="rear-clouds" />
            <div className="front-clouds" />
          </div>
          <AdminLoginForm />
        </React.Fragment>
      )
    } else {
      return (
        <div>
          <AdminHome />
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.admin.isAuthenticated
  }
}

export default connect(mapStateToProps)(Admin)