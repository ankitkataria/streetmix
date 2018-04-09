import React from 'react'
import { connect } from 'react-redux'

class Admin extends React.Component {
  render () {
    return (
      <div> Admin Component </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    locale: state.locale
  }
}

export default connect(mapStateToProps)(Admin)
