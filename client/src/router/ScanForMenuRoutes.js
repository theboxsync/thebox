import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Menu from '../scanformenu/pages/ManagerManageMenu'

const ScanForMenuRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/:code" element={<Menu />} />
      </Routes>
    </>
  )
}

export default ScanForMenuRoutes
