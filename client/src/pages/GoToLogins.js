import React from 'react'

const GoToLogins = () => {
  return (
    <div className='container w-100 d-flex align-items-center justify-content-center' style={{height: '100vh'}}>
      <button className='btn btn-primary btn-lg m-5' onClick={() => window.location.href = `${process.env.REACT_APP_ADMIN_URL}/login`}>Admin Panel</button>
      <button className='btn btn-primary btn-lg m-5' onClick={() => window.location.href = `${process.env.REACT_APP_MANAGER_URL}/login`}>Manager Panel</button>
      <button className='btn btn-primary btn-lg m-5' onClick={() => window.location.href = `${process.env.REACT_APP_QSR_URL}/login`}>QSR Panel</button>
      <button className='btn btn-primary btn-lg m-5' onClick={() => window.location.href = `${process.env.REACT_APP_CAPTAIN_URL}/login`}>Captain Panel</button>
    </div>
  )
}

export default GoToLogins
