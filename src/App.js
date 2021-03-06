//App.js
import React from 'react'
import { AuthProvider } from './AuthService'
import LoggedInRoute from './LoggedInRoute'
import styled from 'styled-components'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import Login from './pages/Login'
import Room from './pages/Room'
import SignUp from './pages/SignUp'

const ReactApp = styled.div`
    text-align: center;
    background-color: #00bfff;
    color: #fff;
    height: 100vh;
`;

const App = () => {
    return (
        <ReactApp>
            <appHeader>
                <h1>Chat App</h1>
            </appHeader>
            <AuthProvider>
                <Router>
                    <Switch>
                        <LoggedInRoute exact path='/' component={Room} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/Signup' component={SignUp} />
                    </Switch>
                </Router>
            </AuthProvider>
            <appFooter>

            </appFooter>
        </ReactApp>
    )
}

export default App
