import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    //Get and define users token from Authenticator 
    const token = window.localStorage.getItem("token")
    return (
        <Route
            {...rest}
            render={(props) => {
                if (token) {
                    //if we have a token return the component
                    return <Component {...props} />
                } else {
                    //else redirect the user to /login
                    return <Redirect to="/login" />
                }
            }}
        />
    )
}
export default PrivateRoute