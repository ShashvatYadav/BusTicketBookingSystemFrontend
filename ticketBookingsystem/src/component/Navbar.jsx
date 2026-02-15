import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className='bg-blue-600 text-white p-4 flex justify-between'>
        <Link to= '/' className='font-bold text-xl'>
            BusBooking
        </Link>
        <div className='space-x-4'>
            <Link to='/login'>Login</Link>
            <Link to= '/register'>Register</Link>
        </div>
    </nav>
  )
}

export default Navbar