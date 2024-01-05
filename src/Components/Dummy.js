import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';

const PrivateRoute = ({ element }) => {
  const token = sessionStorage.getItem('token');

  if (token) {
    return element;
  } else {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
