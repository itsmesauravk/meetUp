import React from 'react';
import { useNavigate } from 'react-router-dom';


const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate()
  const user = localStorage.getItem('user-data');
//   console.log(element)
  
  return user ? element : navigate('/login');
};

export default ProtectedRoute;
