import React from 'react'
import { Outlet } from 'react-router-dom'

const UnAuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default UnAuthLayout