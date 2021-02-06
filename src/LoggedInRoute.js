import React, { useContext } from 'react'
import { Router, Redirect, Route } from 'react-router-dom'
import { AuthContext } from './AuthService'

const LoggedInRoute = ({ component: Component, ...rest }) => {
    const user = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={'./login'} />
                    )
            }
        />
    )
}

export default LoggedInRoute