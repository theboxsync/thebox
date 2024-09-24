import React from 'react'
import { useNavigate } from 'react-router-dom'


function UserHome() {
    const navigate = useNavigate();

  return (
    <div className='container w-100 d-flex align-items-center justify-content-center' style={{height: '100vh'}}>
      <button className='btn btn-primary btn-lg m-5' onClick={() => window.location.href = `${process.env.REACT_APP_ADMIN_URL_CLIENT}`}>Admin</button>
      <button className='btn btn-primary btn-lg m-5' onClick={() => window.location.href = `${process.env.REACT_APP_MANAGER_URL_CLIENT}`}>Manager</button>
    </div>
  )
}

export default UserHome
