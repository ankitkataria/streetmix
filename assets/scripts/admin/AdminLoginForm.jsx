import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleAdminInput } from '../store/actions/admin'

class AdminLogin extends React.Component {
  static propTypes = {
    handleAdminInput: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.adminName = ''
    this.adminEmail = ''
    this.adminDOB = ''
    this.handleChangeInName = this.handleChangeInName.bind(this)
    this.handleChangeInEmail = this.handleChangeInEmail.bind(this)
    this.handleChangeInDOB = this.handleChangeInDOB.bind(this)
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
    this.props.handleAdminInput({
      adminName: this.adminName,
      adminDOB: this.adminDOB,
      adminEmail: this.adminEmail
    })
  }

  render () {
    return (
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
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleAdminInput: (formInput) => { dispatch(handleAdminInput(formInput)) }
  }
}

export default connect(null, mapDispatchToProps)(AdminLogin)
