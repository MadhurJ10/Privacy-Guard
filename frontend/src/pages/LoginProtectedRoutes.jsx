import React from 'react'
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';


const LoginProtectedRoutes = ({children}) => {
    
  const { isUserValid } = useContext(UserContext);

  if(isUserValid) {
    return <Navigate to='/error' replace />;
  }

  if(!isUserValid) {
    return <Navigate to='/login' replace />;
  }
}

export default LoginProtectedRoutes

