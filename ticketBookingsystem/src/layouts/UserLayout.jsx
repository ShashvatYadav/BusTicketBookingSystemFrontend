import React from 'react'
import Navbar from '../component/Navbar'
import { Outlet } from 'react-router'

const UserLayout = () => {
  return (
    <div>
        <Navbar/>
        <div className='p-6'>
            <Outlet/>
        </div>
    </div>
  )
}

export default UserLayout