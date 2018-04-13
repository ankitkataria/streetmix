import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleAdminInput, showAdminErrors, setAdminAuthenticated } from '../store/actions/admin'
import axios from 'axios'

class AdminLoginForm extends React.Component {
  static propTypes = {
    handleAdminInput: PropTypes.func,
    showAdminErrors: PropTypes.func,
    setAdminAuthenticated: PropTypes.func,
    errors: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)

    /*
      Making errors, and all the inputs controlled components
    */
    this.state = {
      adminName: '',
      adminEmail: '',
      adminDOB: '',
      errors: null
    }
  }

  /*
    Change in Input handlers
  */
  handleChangeInName (event) {
    this.setState({
      adminName: event.target.value
    })
  }

  handleChangeInEmail (event) {
    this.setState({
      adminEmail: event.target.value
    })
  }

  handleChangeInDOB (event) {
    this.setState({
      adminDOB: event.target.value
    })
  }

  /*
    To handle the form submit event, makes post request to API and
    sets state with the authenticated user. In case error occurs errors state is set
    and the errors are displayed
  */
  handleSubmit (event) {
    event.preventDefault()

    axios.post('/api/v1/admin', {
      adminEmail: this.state.adminEmail,
      adminDOB: this.state.adminDOB,
      adminName: this.state.adminName
    }).then((response) => {
      // Admin credentials validated
      this.props.setAdminAuthenticated({isAuthenticated: true})
      this.props.handleAdminInput({
        adminName: this.state.adminName,
        adminDOB: this.state.adminDOB,
        adminEmail: this.state.adminEmail
      })
    }).catch((err) => {
      this.props.showAdminErrors({errors: err.response})
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      errors: nextProps.errors.data
    })
  }

  render () {
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
        <div className="admin-login-errors"> {this.state.errors} </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginForm)
