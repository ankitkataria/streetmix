import React from 'react'
import AdminLogout from './AdminLogout'

class AdminHome extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className="admin-home"> Admin is authenticated </div>
        <AdminLogout />
      </React.Fragment>
    )
  }
}

export default AdminHome
