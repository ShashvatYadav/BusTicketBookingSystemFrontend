import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const{user, logout} = useAuth();
  return (
    <nav className='bg-blue-600 text-white p-4 flex justify-between'>
        <Link to= '/' className='font-bold text-xl'>
            BusBooking
        </Link>
        <div className='space-x-4'>
            {
              user ? (
                <>
                  <span className='mr-4'>{user.email}</span>
                  <button onClick={logout}>logout</button>
                </>
              ) : (
                <>
                <Link to='/login'>Login</Link>
                <Link to= '/register'>Register</Link>
                </>
              )
            }
            
        </div>
    </nav>
  )
}

export default Navbar