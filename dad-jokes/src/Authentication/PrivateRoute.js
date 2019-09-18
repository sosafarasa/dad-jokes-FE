import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
        {...rest} 
        render={(props) => (
        localStorage.getItem('token') != null ?
        <Component {...props} /> :
        (alert('You must be logged in to do that'),
        <Redirect to='/' />)
    )}/>
)

export default PrivateRoute;