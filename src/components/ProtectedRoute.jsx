/* eslint-disable */

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  //   console.log(`ProtectedRoute: ${isAuthenticated}`);

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate('/login', { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
