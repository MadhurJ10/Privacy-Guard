import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

const ProtectedRoutes = ({ children }) => {
  const { isUserValid } = useContext(UserContext);

  if (!isUserValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
