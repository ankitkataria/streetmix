import React from 'react'
import AdminLogout from './AdminLogout'

class AdminHome extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className="clouds-background--admin">
          <div className="rear-clouds" />
          <div className="front-clouds" />
        </div>
        <div className="admin-home-content">
          <h1>Admin is Authenticated</h1>
          <div> <AdminLogout /> </div>
        </div>
      </React.Fragment>
    )
  }
}

export default AdminHome
