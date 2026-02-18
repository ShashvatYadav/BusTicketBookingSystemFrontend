import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router';

const ProtectedRoute = ({children, role}) => {
  const {user, loading}  = useAuth();
  if(loading) return <p>Loading......</p>
  if(!user) return <Navigate to="/login" />
    if(role && user.role !==role)
        return <Navigate to="/" />
    
    return children;
}

export default ProtectedRoute