import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleAdminInput, showAdminErrors, setAdminAuthenticated } from '../store/actions/admin'
import axios from 'axios'

class AdminLogin extends React.Component {
  static propTypes = {
    handleAdminInput: PropTypes.func,
    showAdminErrors: PropTypes.func,
    setAdminAuthenticated: PropTypes.func,
    errors: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.adminName = ''
    this.adminEmail = ''
    this.adminDOB = ''
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeInName (event) {
    this.adminName = event.target.value
  }

  handleChangeInEmail (event) {
    this.adminEmail = event.target.value
  }

  handleChangeInDOB (event) {
    this.adminDOB = event.target.value
  }

  handleSubmit (event) {
    event.preventDefault()

    axios.post('/api/v1/admin', {
      adminEmail: this.adminEmail,
      adminDOB: this.adminDOB,
      adminName: this.adminName
    }).then((response) => {
      // Admin credentials validated
      this.props.setAdminAuthenticated({isAuthenticated: true})
      this.props.handleAdminInput({
        adminName: this.adminName,
        adminDOB: this.adminDOB,
        adminEmail: this.adminEmail
      })
    }).catch((err) => {
      this.props.showAdminErrors({errors: err.response})
    })
  }

  render () {
    // to display errors in the login form
    var errors
    if (this.props.errors !== null) {
      errors = this.props.errors.data
    }

    return (
      <form onSubmit={this.handleSubmit} className="admin-login-form">
        <div className="street-name  admin-login-form__head" id="street-name">
          <div className="street-name-text">Admin Login</div>
        </div>
        <label className="admin-login-label">
          Name:
          <input type="text" placeholder=" " className="admin-login-input" onChange={e => this.handleChangeInName(e)} />
        </label>
        <label className="admin-login-label">
          Email:
          <input type="email" className="admin-login-input" onChange={e => this.handleChangeInEmail(e)} />
        </label>
        <label className="admin-login-label">
          Date Of Birth:
          <input type="date" className="admin-login-input" onChange={e => this.handleChangeInDOB(e)} />
        </label>
        <input className="admin-login-btn" type="submit" value="Submit" />
        <div className="admin-login-errors"> {errors} </div>
      </form>
    )
  }
}

function mapStateToProps (state) {
  return {
    errors: state.admin.errors
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleAdminInput: (formInput) => { dispatch(handleAdminInput(formInput)) },
    showAdminErrors: (errors) => { dispatch(showAdminErrors(errors)) },
    setAdminAuthenticated: (authenticated) => { dispatch(setAdminAuthenticated(authenticated)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin)
