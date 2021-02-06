//App.js
import React from 'react'
import AuthProvider from './AuthService'
import LoggedInRoute from './LoggedInRoute'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import Login from './pages/Login'
import Room from './pages/Room'
import SignUp from './pages/SignUp'

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <LoggedInRoute exact path='/' component={Room} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/Signup' component={SignUp} />
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default App