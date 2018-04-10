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
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" onChange={e => this.handleChangeInName(e)} />
          </label>
          <label>
            Email:
            <input type="email" onChange={e => this.handleChangeInEmail(e)} />
          </label>
          <label>
            Date Of Birth:
            <input type="date" onChange={e => this.handleChangeInDOB(e)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="errors"> {errors} </div>
      </React.Fragment>
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
